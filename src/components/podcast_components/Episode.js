import styles from './Episode.module.css';
import React, { useRef, useEffect } from 'react';

const Episode = ( {episode}) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const handlePlay = () => {
      const allAudioElements = document.querySelectorAll('audio');
      allAudioElements.forEach((audioEl) => {
        if (audioEl !== audioRef.current) {
          audioEl.pause();
        }
      });
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener('play', handlePlay);

    return () => {
      audioElement.removeEventListener('play', handlePlay)
    };
  }, []);
  
  return (
    <li className={styles.episode}>
        <h3>{episode.title} </h3>
        <p>{episode.description}</p>
        <p>Date Published: {episode.date}</p>
        <audio ref={audioRef} controls src={episode.audioURL}></audio>
        
    </li>
  )
}

export default Episode