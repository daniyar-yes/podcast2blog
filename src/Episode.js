const Episode = ( {episode}) => {
  return (
    <li>
        <h3>{episode.title} </h3>
        <p>{episode.description}</p>
        <p>Date Published: {episode.date}</p>
        <audio controls src={episode.audioURL}></audio>
        
    </li>
  )
}

export default Episode