

const Episode = ( episode ) => {
  return (
    <h3>{titles[id]} </h3>
      <p>{shortDesc[id]}</p>
      <audio controls src={audioURLS[id]}></audio>
  )
}

export default Episode