import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './layout.module.css';

export default function PageLayout({ children }) {
  return (
        <div className={styles.container}>
          <Navbar />
          {children}
          <Footer />
        </div>
  )
}