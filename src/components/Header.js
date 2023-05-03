import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <h2>Welcome to Podcast2Blog!</h2>
      <details>
        <summary>Info for Podcast Owners and Web Developers</summary>
        <div className={styles.appDescription}>
          <p>This App dynamically renders Podcasts from any valid Spotify for Podcasters RSS links (ex-Anchor FM), without the need for Spotify API keys and subscription.</p>
          <p>By default, it renders my podcast for example, but you can render any podcast by putting a valid RSS link in the form below.</p>
          <p>This App uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" target="_blank">XMLHttpRequest</a> to get XML Document containing podcast data. Then, it extracts the useful data using query selectors with specific regex to match the desired elements from XML.</p>
          <p>Refer to this <a href="https://github.com/daniyar-yes/podcast2blog" target="_blank">react code</a> to implement the same approach for your Podcast's website.</p>
      </div>
      </details>
      
    </header>
  )
}

export default Header