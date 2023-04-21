import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <h2>Welcome to Podcast2Blog!</h2>
      <div className={styles.appDescription}>
        <p>This App dynamically renders ad-free Podcast feeds from any valid Spotify for Podcasters RSS feeds (ex-Anchor FM), without the need for API keys and subscription.</p>
        <p>By default, it renders my own podcast for example, but you can render any podcast by putting a valid RSS link in the form below.</p>
        <p>Refer to this <a href="https://github.com/daniyar-yes/podcast2blog" target="_blank">react code</a> to implement the same approach for your Podcast's website.</p>
      </div>
    </header>
  )
}

export default Header