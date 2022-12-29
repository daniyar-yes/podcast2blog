import RSS from './RssUrl'
import sampleAudio from './sampleAudio'
import { useState, useEffect } from 'react'

function App() {

  const [rssFile, setRssFile] = useState('');
  const [audioURL, setAudioURL] = useState('')
  const podTitle = document.querySelector('p')
  

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
            setRssFile(xhr.responseXML);
            podTitle.innerText = rssFile.querySelector('item title').innerHTML;
            console.log(rssFile.querySelector('item title'));
            setAudioURL(rssFile.querySelector('item link').innerHTML);
            console.log(audioURL);
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
