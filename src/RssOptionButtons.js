import styles from './RssOptionButtons.module.css'

const RssOptionButtons = ({ setRss, RSS }) => {

  const handleRequest = (rssOption) => {
    setRss(rssOption)
  }
  return (
    <>
    <p className={styles.mainText}>Or try rendering these sample Podcasts by their RSS Feeds:</p>
      <div className={styles.buttonsContainer}>
        <button 
          type='submit'
          onClick={() => handleRequest(RSS.Sample1)}>Podcast of the Day
        </button>
        <button 
          type='submit'
          onClick={() => handleRequest(RSS.Sample2)}>Today's guest at JRE
        </button>
        <button 
          type='submit'
          onClick={() => handleRequest(RSS.Sample3)}>Tennis Freakonomics
        </button>
      </div>
      </>
  )
}

export default RssOptionButtons