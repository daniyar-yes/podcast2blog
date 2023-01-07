import RSS from './RssUrl'
import sampleAudio from './sampleAudio'
import { useState, useEffect } from 'react'

function App() {

  let rssVar
  const regex = /url="(.*?)"/;

  const [titles, setTitles] = useState([]);
  const [audioURLS, setAudioURLS] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  let podTitle = document.querySelector('p')
  

  useEffect(() => {
    // put XML fetch logic here
    const xhr = new XMLHttpRequest;
    xhr.open('GET', RSS);
    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');
    let links = []

    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            rssVar = xhr.responseXML;
            console.log(rssVar)
            setTitles(rssVar.querySelectorAll('item title')[0].textContent);
            console.log(rssVar.querySelector('item title'));
            setAudioURLS(rssVar.querySelector('item link').innerHTML);
            console.log(rssVar.querySelectorAll('item link')[0].textContent);
            console.log(rssVar.querySelectorAll('item link'))
            rssVar.querySelectorAll('item enclosure').forEach((link) => links.push(link.outerHTML))
            setAudioURLS(links)
            const matches = rssVar.querySelectorAll('item enclosure')[0].outerHTML.match(regex)
            setAudioURLS(matches[1])
            console.log(rssVar.querySelector('image url').innerHTML)
        }
    };

  xhr.send()
  }, [])

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
      <audio controls src={audioURLS}></audio>
      <audio controls src={sampleAudio}></audio>
      <p>#3 - IELTS Reading - советы по подготовке к секции ридинг и не только</p>
      <h3>{titles} </h3>
    </div>
  );
}

export default App;
