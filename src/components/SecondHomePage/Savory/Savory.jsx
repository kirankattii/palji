import { useNavigate } from 'react-router';
import { assets } from '../../../assets/assets'
import styles from './Savory.module.css'
import { useEffect, useRef, useState } from 'react';
import { makeApi } from '../../../api/callApi';

const Savory = () => {

  const [AllProductLoader, setAllProductLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);


  const fetchProduct = async () => {
    try {
      setAllProductLoader(true);
      const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET");
      const categories = categoriesResponse.data.categories;

      if (categories.length > 0) {
        const categoryId = categories[2]._id;
        const response = await makeApi(
          `/api/get-all-products-by-category/${categoryId}`,
          "GET"
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAllProductLoader(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  function handleNavigate(id) {
    navigate(`product/product-details/${id}`)
  }


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>SOVORY</h2>
        <h2>VIEW ALL <img src={assets.brownArrow} alt="" />
        </h2>
      </div>
      <div className={styles.content}>
        {products.map(item => (
          <div onClick={() => handleNavigate(item._id)} style={{ cursor: "pointer" }}>
            <div className={styles.productContent}>
              <div className={styles.productImage}>
                <img src={item.thumbnail} alt="" />
              </div>
            </div>
            <div className={styles.name}>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Savory
