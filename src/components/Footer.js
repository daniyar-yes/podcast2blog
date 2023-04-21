import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p>Daniyar Yeskaliyev © {currentYear}</p>
            <a 
                className={styles.link}
                href="https://www.linkedin.com/in/daniyar-yes/" 
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>
        </footer>
    );
};

export default Footer