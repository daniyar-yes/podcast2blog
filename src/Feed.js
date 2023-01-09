import Episode from './Episode'

const Feed = ({ episodes }) => {
  return (
    <ul style={{
      listStyleType: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '5vw'
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