import RSS from './RssUrl'
import { useState, useEffect } from 'react';
import Feed from './Feed';
import styles from './styles.module.css';
import PodcastSummary from './PodcastSummary';
import RssOptionButtons from './RssOptionButtons';

function App() {
 
  const [isLoading, setIsLoading] = useState(true);
  const [rss, setRss] = useState(RSS.WillOfD);
  const [episodes, setEpisodes] = useState([]);
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
  const [podcastDetails, setPodcastDetails] = useState({})
  const [rssCurrentInput, setRssCurrentInput] = useState('');

  useEffect(() => {
    // fetching XML following MDN recommendations for XML
    const xhr = new XMLHttpRequest;
    xhr.open('GET', rss);
    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const response = xhr.responseXML;
            // Then we extract Podcast and Episodes details from the XML doc and save as states
            setPodcastDetails(getPodcastDetails(response));
            setEpisodes(getEpisodeDetails(response));
            setNumberOfEpisodes(getEpisodeDetails(response).length);
            setIsLoading(false);
        }
    };
    xhr.send()
  }, [rss])

  const getPodcastDetails = (resXML) => {
    return {
      image: getImage(resXML),
      name: getPodcastName(resXML),
      description: getPodcastDescription(resXML)
    }
  }

  const getEpisodeDetails = (resXML) => {
    const titles = getTitles(resXML);
    const shortenedDescr = getDescriptons(resXML);
    const links = getAudioLinks(resXML);
    const dates = getPubDate(resXML);
    const combined = titles.map((title, index) => {
      return {
        id: index,
        title,
        description: shortenedDescr[index],
        audioURL: links[index],
        date: dates[index]
      };
    });
    return combined;
  }

  const getImage = (resXML) => {
    const image = resXML.querySelector('image url').innerHTML;
    return image;
  }

  const getPodcastName = (resXML) => {
    const name = resXML.querySelector('channel title').textContent;
    return name;
  }

  const getPodcastDescription = (resXML) => {
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
    setRssCurrentInput(e.target.value);
  }

  const handleRssSubmit = (e) => {
    e.preventDefault();
    const value = rssCurrentInput;
    const anchorRegex = /^https:\/\/anchor\.fm\/s\/.+\/podcast\/rss$/i;
    if (anchorRegex.test(value)) {
      setRss(value);
    } else {
      alert('Please put valid Anchor FM RSS link including `https://`')
    }
  }

  const handleRssSampleRequest = (rssOption) => {
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
          >Turn Podcast Feed into a Blog
        </button>
      </form>
        
      <RssOptionButtons 
        handleRequest={handleRssSampleRequest}
        RSS={RSS}
      />

      {isLoading ? <p>Loading...</p> :
        <div>
          <PodcastSummary 
            details={podcastDetails} 
            number={numberOfEpisodes}
          />
          <Feed episodes={episodes}/>
        </div>
      }
    </div>
  
  );
}

export default App;