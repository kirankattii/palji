import { assets } from '../../../assets/assets'
import styles from './Category.module.css'

const categories = [
  {
    img: assets.category1,
    name: "Cookies",
    color: "#C89A69"
  },
  {
    img: assets.category2,
    name: "Savory",
    color: "#BA99E3"
  },
  {
    img: assets.category3,
    name: "Gift Hampers",
    color: "#FFCE98"
  },
  {
    img: assets.category4,
    name: "Cakes",
    color: "#F08690"
  },
]

const Category = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>SHOP BY CATEGORY</h2>
        <h2>
          VIEW ALL <img src={assets.brownArrow} alt="" />
        </h2>
      </div>
      <div className={styles.cards}>{
        categories.map(item => (
          <div className={styles.cardContainer}>
            <div className={styles.innerContent} style={{ background: item.color }}>
              <img className={styles.categoryImg} src={item.img} alt={item.name} />
            </div>
            <div className={styles.name}>
              <p>{item.name}</p>
              <img src={assets.blackArrow} alt="" />
            </div>
          </div>
        ))
      }</div>
    </div>
  )
}

export default Category
