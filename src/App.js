import RSS from './utils/RssUrl'
import { useState, useEffect } from 'react';
import Feed from './components/containers/Feed';
import PodcastSummary from './components/podcast_components/PodcastSummary';
import RssOptionButtons from './components/containers/RssOptionButtons';
import RssInputForm from './components/form_components/RssInputForm';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
 
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [rss, setRss] = useState(RSS.WillOfD);
  const [episodes, setEpisodes] = useState([]);
  const [numberOfEpisodes, setNumberOfEpisodes] = useState(0);
  const [podcastDetails, setPodcastDetails] = useState({})
  

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
            saveResponseAsStates(response);
            setIsLoading(false);
        } else {
          setIsLoading(false);
          setErrorLoading(`Error Loading, Code: ${xhr.status}`)
        }
    };
    xhr.send()
  }, [rss])

  const saveResponseAsStates = (response) => {
      setPodcastDetails(getPodcastDetails(response));
      setEpisodes(getEpisodeDetails(response));
      setNumberOfEpisodes(getEpisodeDetails(response).length);
      setIsLoading(false);
  }
  const getPodcastDetails = (resXML) => {
    return {
      image: getImage(resXML),
      name: getPodcastName(resXML),
      description: getPodcastDescription(resXML)
    };
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
        let shortened = cleanText.substring(0, 140) + '...';
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

  return (
    <div className="App">
      <Header />
      <RssInputForm setRss={setRss}/>
      <RssOptionButtons setRss={setRss} RSS={RSS}/>
      {errorLoading && <p>{errorLoading}</p>}
      {isLoading ? <p>Loading...</p> :
        <div className='podcast'>
          <PodcastSummary details={podcastDetails} number={numberOfEpisodes}/>
          <Feed episodes={episodes}/>
          <Footer />
        </div>
      }
    </div>
  );
}

export default App;