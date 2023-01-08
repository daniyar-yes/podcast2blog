import Episode from './Episode'

const Feed = ({ episodes }) => {
  return (
    <ul>
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