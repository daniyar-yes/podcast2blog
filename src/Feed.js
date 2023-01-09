import Episode from './Episode'

const Feed = ({ episodes }) => {
  return (
    <ul style={{
      listStyleType: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
      }}>
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