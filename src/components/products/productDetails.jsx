

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
import PrimaryLoader from "../loaders/primaryloader.jsx";
import BackButton from "./backButton.jsx";
import { makeApi } from "../../api/callApi.tsx";
import styles from "../../pages/CSS/product/productDetails.module.css";
import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";
import AddIcon from "../../assets/add_icon_green.png";
import RemoveIcon from "../../assets/remove_icon_red.png";
import "../../pages/CSS/product/productDetails.css";
import { GoArrowLeft } from "react-icons/go";

function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [completeCart, setCompleteCart] = useState([]);
  const [load, setLoad] = useState(false)
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [includes, setIncludes] = useState();
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [productNuturitions, setProductNuturitions] = useState([]);
  const [productLoaders, setProductLoaders] = useState({});
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
    fetchProduct();
    fetchCartItems();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${productId}`, "GET");

      setProduct(response.data.product);
      setSizes(response.data.sizes);
      setIncludes(response.data.include)
      setSelectedImage(response.data.product.thumbnail)
      setProductNuturitions(response.data.productNuturitions)
      if (response.data.sizes.length > 0) {
        const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
        setSelectedSize(availableSize || null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const fetchCartItems = async () => {
    try {
      //   await fetchCart(setCartItems);
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const checkCart = () => {
      const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
      setIsInCart(!!cartItem);
      setCartQuantity(cartItem ? cartItem.quantity : 0);
    };
    checkCart();
  }, [cartItems, productId, selectedSize]);

  const handleSizeChange = size => setSelectedSize(size);

  const handleAddToCart = async () => {
    if (!isLogin) {
      setShowPopup(true);
      return;
    }
    if (!selectedSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }
    try {
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
      navigate('/cart');
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleIncreaseQuantity = async () => {
    if (!isLogin) {
      setShowPopup(true);
      return;
    }
    if (!selectedSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }
    if (selectedSize.quantity === cartQuantity) {
      toast('Cannot add more than available quantity.', { type: 'error' });
      return;
    }
    try {
      setQuantityLoading(true);
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
    finally {
      setQuantityLoading(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (cartQuantity > 0) {
      try {
        await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize._id);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const handleBuyNow = () => {
    if (!isLogin) {
      setShowPopup(true);
    } else {
      handleAddToCart();
      fetchCartItems();
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  if (loading) {
    return (
      <div className={styles.productLoader}>
        <PrimaryLoader />
      </div>
    );
  }

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  console.log("productNuturitions", productNuturitions);

  return (
    <>
      {showPopup && <LoginPopup onClose={closePopup} />}
      <ToastContainer position="top-center" />
      <div>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          {/* <BackButton pageLocation="/product/all-products" /> */}
          <GoArrowLeft />
        </div>
        <div className={styles.productContainer}>
          <div className={styles.imgContainer}>
            <div className={styles.innerImgContainer}>
              {/* Selected Image */}
              <div className={styles.mainImg}>
                <img src={selectedImage} alt="Selected" />
              </div>

              {/* Thumbnails */}
              <div className={styles.subImg}>
                <div
                  className={`${styles.subImg1} ${selectedImage === product.thumbnail ? styles.activeImage : ""}`}
                  onClick={() => handleImageClick(product.thumbnail)}
                >
                  <img src={product.thumbnail} alt="Thumbnail" />
                </div>
                {product.image.slice(0, 3).map((imgUrl, index) => (
                  <div
                    key={index}
                    className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
                    onClick={() => handleImageClick(imgUrl)}
                  >
                    <img src={imgUrl} alt={`Product Image ${index + 1}`} />
                  </div>
                ))}

              </div>
            </div>
          </div>
          <div className={styles.productContant}>
            <div className={styles.title}>
              <div className={styles.productPriceName}>
                <h1>{product?.name}</h1>
                <div>
                  <h2>₹{selectedSize?.FinalPrice} {selectedSize?.price > selectedSize?.FinalPrice && <span span >₹{selectedSize?.price}</span>}</h2>

                  {/* <div className={styles.sizeOptions}>
                    <h3>Select Size:</h3>
                    <div className="d-flex gap-2 flex-wrap">

                     

                      {sizes.map(size => (
                        size.size !== 'null' && ( // Conditional check to exclude 'text'
                          <button
                            key={size._id}
                            className="btn"
                            style={{
                              backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
                              color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
                            }}
                            onClick={() => handleSizeChange(size)}
                          >
                            {size.size} {size.sizetype} - ₹{size.FinalPrice}
                          </button>
                        )
                      ))}
                    </div>
                  </div> */}
                  {/* {sizes.some(size => size.size !== null && size.size !== 'null') && ( 
                    <div className={styles.sizeOptions}>
                      <h3>Select Size:</h3>
                      <div className="d-flex gap-2 flex-wrap">
                        {sizes.map(size => (
                          size.size !== null && size.size !== 'null' && ( // Conditional check to exclude null and 'null'
                            <button
                              key={size._id}
                              className="btn"
                              style={{
                                backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
                                color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
                              }}
                              onClick={() => handleSizeChange(size)}
                            >
                              {size.size} {size.sizetype} - ₹{size.FinalPrice}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  )} */}

                  {sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
                    <div className={styles.sizeOptions}>
                      <h3>Select Size:</h3>
                      <div className="d-flex gap-2 flex-wrap">
                        {sizes.map(size => (
                          size.size && size.size.toLowerCase() !== 'null' && ( // Conditional check to exclude null and 'null'
                            <button
                              key={size._id}
                              className="btn"
                              style={{
                                backgroundColor: selectedSize?._id === size._id ? '#ff6b6b' : '', // custom color logic
                                color: selectedSize?._id === size._id ? '#fff' : '#000', // text color logic
                              }}
                              onClick={() => handleSizeChange(size)}
                            >
                              {size.size} {size.sizetype} - ₹{size.FinalPrice}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  )}


                </div>
              </div>
              <div className={styles.actions}>
                {isInCart ? (
                  <div className={styles.cartIncDec}>
                    <img
                      src={RemoveIcon}
                      alt=""
                      onClick={handleDecreaseQuantity} />
                    {quantityLoading ? (
                      <div className={styles.countLoaderss}>
                        {/* <PrimaryLoader /> */}
                      </div>
                    ) : (
                      <p>{cartQuantity}</p>
                    )}
                    {/* <p>{cartQuantity}</p> */}
                    <img src={AddIcon} alt="" onClick={handleIncreaseQuantity} />
                    {/* <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button> */}
                  </div>
                ) : (
                  fetchCartLoader ? (
                    <PrimaryLoader />
                  ) : (
                    <>
                      <div
                        className={styles.addTocart}

                        onClick={handleIncreaseQuantity}>Add to Cart</div>
                      {/* <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button> */}
                    </>)
                )}
              </div>
            </div>
            <div className={styles.description}>
              <h2>Description</h2>
              <p>{product?.description}</p>
            </div>
            {includes && includes.length > 0 && (
              <div className={styles.includes}>
                <h2>INCLUDES</h2>
                <ul>
                  {includes.map((item, id) => (
                    <li key={id}>{item?.include}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* product nutritions */}
            {
              productNuturitions && productNuturitions.length > 1 && (
                <div className={styles.nutritionContainer}>
                  <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
                    <span>Approximate Composition</span></h2>
                  <hr />
                  <div className={styles.nutritionGrid}>
                    <div className={styles.header}>
                      <span>Nutritional Facts</span>
                      <span>Values</span>
                    </div>
                    {productNuturitions.map((item) => (
                      <div key={item._id} className={styles.nutritionRow}>
                        <span className={styles.nutritionName}>{item.nutrition}</span>
                        <span className={styles.nutritionValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
