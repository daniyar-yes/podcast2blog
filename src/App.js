import RSS from './RssUrl'
import { useState, useEffect } from 'react'
import Feed from './Feed';

function App() {
 
  const [isLoading, setIsLoading] = useState(true);
  const [rss, setRss] = useState(RSS.WillOfD);
  const [episodes, setEpisodes] = useState([]);
  const [showName, setShowName] = useState('');
  const [showDescription, setShowDescription] = useState('');
  const [showLength, setShowLength] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    // fetching XML is specific for Anchor FM, code below follows MDN recommendations for XML
    const xhr = new XMLHttpRequest;
    xhr.open('GET', rss);
    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');
    // if XML is fetched OK, we need to get arrays of Titles, Descriptions, AudioURLS in the order they appear in the feed
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = xhr.responseXML;
            // we extract Podcast image, titles, descriptions (short) and audio links from RSS XML doc
            const image = getImage(response);
            const name = getShowName(response);
            const mainDescription = getShowDescription(response);
            const titles = getTitles(response);
            const shortenedDesc = getDescriptons(response);
            const links = getAudioLinks(response);
            const dates = getPubDate(response);
            // then we set image as imgSrc state, and combine episodes features from 3 arrays into 1 obj of arrays
            // and set the combined array as the episodes state
            const combined = titles.map((title, index) => {
              return {
                id: index,
                title,
                description: shortenedDesc[index],
                audioURL: links[index],
                date: dates[index]
              };
            });

            setImgSrc(image);
            setShowName(name);
            setShowDescription(mainDescription);
            setEpisodes(combined);
            setShowLength(combined.length)
            setIsLoading(false);
            console.log(combined)
        }
    };

    xhr.send()
  }, [rss])

  const getImage = (resXML) => {
    const image = resXML.querySelector('image url').innerHTML;
    return image;
  }

  const getShowName = (resXML) => {
    const name = resXML.querySelector('channel title').textContent;
    return name;
  }

  const getShowDescription = (resXML) => {
    const showDescription = resXML.querySelector('channel description').textContent;
    return showDescription;
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
        shortenedDesc.push(shortened);
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

  const getPubDate = (resXML) => {
    let dates = [];
    resXML.querySelectorAll('item pubDate')
      .forEach((date) => {
        dates.push(date.textContent);
      })
    return dates;
  }

  const onRssChange = (e) => {
    setCurrentValue(e.target.value);
  }

  const handleRssSubmit = (e) => {
    e.preventDefault();
    const value = currentValue;
    const anchorRegex = /^https:\/\/anchor\.fm\/s\/.+\/podcast\/rss$/i;
    if (anchorRegex.test(value)) {
      setRss(value);
    } else {
      alert('Please put valid Anchor FM RSS link including `https://`')
    }
  }

  const handleRssRequest = (rssOption) => {
    setRss(rssOption)
  }

  return (
    <div className="App">
      <form 
        onSubmit={handleRssSubmit}
        style={{
          display: 'flex', 
          justifyContent: 'center', 
          paddingTop: '10px'
          }}>
        <input 
          label='rss' 
          type='text' 
          placeholder={`Put Anchor FM RSS link`}
          onChange={onRssChange}
        >
        </input>
        <button 
          type='submit'
          
          >Podcast ➡️ Blog
        </button>
      </form>
      <p style={{textAlign: 'center'}}>Or try rendering other Podcasts by their RSS Feeds:</p>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>
        <button 
          type='submit'
          onClick={() => handleRssRequest(RSS.Sample1)}>Podcast of the Day
        </button>
        <button 
          type='submit'
          onClick={() => handleRssRequest(RSS.Sample2)}>Today's guest at JRE
        </button>
        <button 
          type='submit'
          onClick={() => handleRssRequest(RSS.Sample3)}>Tennis Freakonomics
        </button>
      </div>
      {isLoading ? <p>Loading...</p> :
        <div>
          <div 
            style={{
              display: 'flex', 
              justifyContent: 'left', 
              paddingTop: '10px', 
              paddingLeft: '10vw'
              }}>
            <img style={{width: '100', height: '200px'}}  src={imgSrc} alt='Podcast logo'></img>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '20px'}}>
              <p>{showName}</p>
              <p>Description: {showDescription}</p>
              <p>{showLength} episodes</p>
            </div>
          </div>
            <Feed
              episodes={episodes}
            />
        </div>
      }
    </div>
  );
}

export default App;
