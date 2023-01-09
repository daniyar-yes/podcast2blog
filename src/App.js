import RSS from './RssUrl'
import { useState, useEffect } from 'react'
import Feed from './Feed';

function App() {
 
  const [isLoading, setIsLoading] = useState(true)
  const [episodes, setEpisodes] = useState([]);
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    // fetching XML is specific for Anchor FM, code below follows MDN recommendations for XML
    const xhr = new XMLHttpRequest;
    xhr.open('GET', RSS);
    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');
    // if XML is fetched OK, we need to get arrays of Titles, Descriptions, AudioURLS in the order they appear in the feed
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = xhr.responseXML;
            // we extract Podcast image, titles, descriptions (short) and audio links from RSS XML doc
            const image = getImage(response);
            const titles = getTitles(response);
            const shortenedDesc = getDescriptons(response);
            const links = getAudioLinks(response);
            // then we set image as imgSrc state, and combine episodes features from 3 arrays into 1 obj of arrays
            // and set the combined array as the episodes state
            const combined = titles.map((title, index) => {
              return {
                id: index,
                title,
                description: shortenedDesc[index],
                audioURL: links[index]
              };
            });

            setImgSrc(image);
            setEpisodes(combined);
            setIsLoading(false);
        }
    };

    xhr.send()
  }, [])

  const getImage = (resXML) => {
    const image = resXML.querySelector('image url').innerHTML;
    return image;
  }

  const getTitles = (resXML) => {
    let titles = [];
    resXML.querySelectorAll('item title')
      .forEach((title) => titles.push(title.textContent));
    return titles;
  }

  const getDescriptons = (resXML) => {
    let descriptions = [];
    let shortenedDesc = [];
    resXML.querySelectorAll('item description')
      .forEach((description) => {
        let cleanText = description.textContent.replace(/<\/?p>/g, '').replace(/--- .*/, '');
        let shortened = cleanText.substring(0, 140) + '... Read More';
        descriptions.push(cleanText);
        shortenedDesc.push(shortened)
    });
    return shortenedDesc;
  }

  const getAudioLinks = (resXML) => {
    let links = [];
    const regex = /url="(.*?)"/;
    resXML.querySelectorAll('item enclosure')
      .forEach((link) => {
        const matches = link.outerHTML.match(regex);
        links.push(matches[1]);
    })
    return links;
  }

  return (
    <div className="App">
      <form>
        <input 
          label='rss' 
          type='text' 
          placeholder={`${RSS}`}
        >
        </input>
        <button type='submit'>Get RSS</button>
      </form>
      {isLoading ? <p>Loading...</p> :
        <div><img style={{width: '100', height: '200px'}}  src={imgSrc} alt='Podcast logo'></img>
            <Feed
              episodes={episodes}
            />
        </div>
      }
    </div>
  );
}

export default App;
