import RSS from './RssUrl'
import sampleAudio from './sampleAudio'
import { useState, useEffect } from 'react'

function App() {

  let rssVar

  const [rssFile, setRssFile] = useState();
  const [audioURL, setAudioURL] = useState('')
  let podTitle = document.querySelector('p')
  

  useEffect(() => {
    // put XML fetch logic here
    console.log(RSS)
    const xhr = new XMLHttpRequest;
    xhr.open('GET', RSS);
    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');

    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            console.log(xhr.response, xhr.responseXML);
            rssVar = xhr.responseXML;
            podTitle = rssVar.querySelector('item title').innerHTML;
            console.log(rssVar.querySelector('item title'));
            setAudioURL(rssVar.querySelector('item link').innerHTML);
            console.log(rssVar.querySelectorAll('item link')[0].textContent);
        }
    };

  xhr.send()
  }, [])

  return (
    <div className="App">
      <form>
        <input label='rss' type='text' placeholder={`${RSS}`}></input>
        <button type='submit'>Get RSS</button>
      </form>
      <audio controls src={sampleAudio}></audio>
      <p>#3 - IELTS Reading - советы по подготовке к секции ридинг и не только</p>
    </div>
  );
}

export default App;
