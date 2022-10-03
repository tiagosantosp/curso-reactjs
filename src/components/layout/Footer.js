import {FaLinkedin, FaGithub} from 'react-icons/fa'
import styles from './css/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li><a target='_blank' href="https://www.linkedin.com/in/tiagosantosp/"><FaLinkedin/></a></li>
        <li><a target='_blank' href="https://github.com/tiagosantosp/"><FaGithub/></a></li>
      </ul>
      <p className={styles.copy_right}>
        <span>Tiagosantosp</span> &copy; 2022
      </p>
    </footer>
  );
}
 
export default Footer;