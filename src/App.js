import RSS from './RssUrl'
import { useState, useEffect } from 'react'

function App() {

  
  

  const [titles, setTitles] = useState([]);
  const [audioURLS, setAudioURLS] = useState([]);
  const [descriptions, setDescriptions] = useState([]);  

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
            getTitles(response);
            getDescriptons(response);
            getAudioLinks(response);
            console.log(response)
            console.log(response.querySelector('image url').innerHTML);
        }
    };

  xhr.send()
  }, [])

  const getTitles = (resXML) => {
    let titles = [];
    resXML.querySelectorAll('item title')
      .forEach((title) => titles.push(title.textContent));
    setTitles(titles);
  }

  const getDescriptons = (resXML) => {
    let descriptions = [];
    resXML.querySelectorAll('item description')
      .forEach((description) => {
        let cleanText = description.textContent.replace(/<\/?p>/g, '').replace(/--- .*/, '');
        console.log(cleanText)
        descriptions.push(cleanText)
    });
    setDescriptions(descriptions)
  }

  const getAudioLinks = (resXML) => {
    let links = [];
    const regex = /url="(.*?)"/;
    resXML.querySelectorAll('item enclosure')
      .forEach((link) => {
        const matches = link.outerHTML.match(regex);
        links.push(matches[1]);
    })
    setAudioURLS(links);
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
      <h3>{titles[4]} </h3>
      <p>{descriptions[4].substring(0, 140) + '... '}
        <span
          onClick={() => console.log(descriptions[4])}>Read More</span>
      </p>
      <audio controls src={audioURLS[4]}></audio>
    </div>
  );
}

export default App;
