import { useState } from 'react'
import styles from './RssInputForm.module.css'

const RssInputForm = ({ setRss }) => {
    const [rssCurrentInput, setRssCurrentInput] = useState('');

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
    
    const handleRssChange = (e) => {
        setRssCurrentInput(e.target.value);
      }

  return (
    <div>
        <form className={styles.form} onSubmit={handleRssSubmit}>
            <input
                label='rss' 
                type='text' 
                placeholder={`Put Anchor FM RSS link`}
                onChange={handleRssChange}>
            </input>          
            <button type='submit'>Turn Podcast Feed into a Blog</button>
        </form>
    </div>
  )
}

export default RssInputForm