import styles from './styles.module.css'

const RssOptionButtons = ({ handleRequest, RSS }) => {
  return (
    <>
    <p style={{textAlign: 'center'}}>Or try rendering these sample Podcasts by their RSS Feeds:</p>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>
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