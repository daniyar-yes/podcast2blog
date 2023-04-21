import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <h2>Welcome to Podcast2Blog!</h2>
      <div className={styles.appDescription}>
        <p>This App dynamically renders Podcast feeds from any valid Spotify for Podcasters RSS feeds (ex-Anchor FM)</p>
        <p>By default, it renders my own podcast for example, but you can render your own podcast by putting a link in the form below</p>
      </div>
    </header>
  )
}

export default Header