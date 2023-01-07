import RSS from './RssUrl'
import { useState, useEffect } from 'react'

function App() {

  let id = 6;
  

  const [titles, setTitles] = useState([]);
  const [audioURLS, setAudioURLS] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [shortDesc, setShortDesc] = useState([]);

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
    let shortenedDesc = [];
    resXML.querySelectorAll('item description')
      .forEach((description) => {
        let cleanText = description.textContent.replace(/<\/?p>/g, '').replace(/--- .*/, '');
        let shortened = cleanText.substring(0, 140) + '... Read More';
        descriptions.push(cleanText);
        shortenedDesc.push(shortened)
    });
    setDescriptions(descriptions);
    setShortDesc(shortenedDesc)
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
      <h3>{titles[id]} </h3>
      <p>{shortDesc[id]}</p>
      <audio controls src={audioURLS[id]}></audio>
      <h3>{titles[id+1]} </h3>
      <p>{shortDesc[id+1]}</p>
      <audio controls src={audioURLS[id+1]}></audio>
    </div>
  );
}

export default App;
