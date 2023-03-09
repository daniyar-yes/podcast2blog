import Episode from './Episode'
import styles from './Feed.module.css'

const Feed = ({ episodes }) => {
  return (
    <ul className={styles.feedList}>
        {episodes.map((episode) => (
            <Episode 
                key={episode.id}
                episode={episode}
            
            />
        ))}
    </ul>
  )
}

export default Feed