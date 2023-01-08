import RSS from './RssUrl'
import { useState, useEffect } from 'react'
import Feed from './Feed';

function App() {

  let id = 0;
  

  const [titles, setTitles] = useState([]);
  const [audioURLS, setAudioURLS] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [shortDesc, setShortDesc] = useState([]);
  const [imgSrc, setImgSrc] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // fetching XML is specific in this, code below follows MDN recommendations for XML
    const xhr = new XMLHttpRequest;
    xhr.open('GET', RSS);
    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');
    // of XML is fetched OK, we need to get arrays of Titles, Descriptions, AudioURLS in the order they appear in the feed
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = xhr.responseXML;
            const titles = getTitles(response);
            console.log(titles);
            const shortenedDesc = getDescriptons(response);
            console.log(shortenedDesc)
            const links = getAudioLinks(response);
            console.log(links)
            const mainImage = response.querySelector('image url').innerHTML;
            setImgSrc(mainImage)

            const combined = titles.map((title, index) => {
              return {
                id: index,
                title,
                description: shortenedDesc[index],
                audioURL: links[index]
              };
            });
            setEpisodes(combined);
            console.log(combined);
            setIsLoading(false);
        }
    };

  xhr.send()
  
  }, [])

  const getTitles = (resXML) => {
    let titles = [];
    resXML.querySelectorAll('item title')
      .forEach((title) => titles.push(title.textContent));
    // setTitles(titles);
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
    // setDescriptions(descriptions);
    // setShortDesc(shortenedDesc);
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
    // setAudioURLS(links);
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
        <div><img style={{width: '100', height: '200px'}}  src={imgSrc}></img>
            <Feed
              episodes={episodes}
            />
        </div>
      }
    </div>
  );
}

export default App;
