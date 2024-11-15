import { assets } from '../../../assets/assets'
import styles from './Explore.module.css'
const Explore = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={assets.homeGiftHamper} alt="" />
      </div>
      <div className={styles.contant}>
        <h2>More Than a Gift, <br />
          It's a Memory!
        </h2>
        <p>Perfectly Packed for Every Occasion!</p>
        <button>EXPLORE <img src={assets.crossArrow} alt="" /></button>
      </div>
    </div>
  )
}

export default Explore
