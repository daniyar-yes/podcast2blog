import Episode from './Episode'

const Feed = ({ episodes }) => {
  return (
    <ul style={{
      listStyleType: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      margin: '0px',
      paddingLeft: '5px'
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