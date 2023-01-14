import styles from './PodcastSummary.module.css';

const PodcastSummary = ({ details, number}) => {
  return (
    <div className={styles.podcastSummary}>
            <img 
              className={styles.mainImage} 
              src={details.image} 
              alt='Podcast logo'>
            </img>
            <div className={styles.podcastDescription}>
              <span>{details.name}</span>
              <p>Description: {details.description}</p>
              <span>{number} episodes</span>
            </div>
    </div>
  )
}

export default PodcastSummary