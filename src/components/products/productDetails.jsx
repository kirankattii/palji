
// import React, { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import "../../pages/CSS/product/productDetails.css"
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import BackButton from "./backButton.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import styles from '../../pages/CSS/product/productDetails.module.css'
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// } from "../../utils/productFunction.js"

// function ProductDetails() {
// 	const navigate = useNavigate()
// 	const { productId } = useParams()
// 	const [product, setProduct] = useState()
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [includes, setIncludes] = useState()
// 	const [selectedImage, setSelectedImage] = useState("")
// 	const [loading, setLoading] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState(false)
// 	const [checkIncludes, setCheckIncludes] = useState()
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [isInCart, setIsInCart] = useState(false)
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [countLoader, setCountLoader] = useState({}) // State to track count loader

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")

// 		if (token) {
// 			setIsLogin(true)
// 		} else {
// 			setIsLogin(false)
// 		}
// 	}, [])

// 	const fetchProduct = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi(
// 				`/api/get-single-product/${productId}`,
// 				"GET"
// 			)
// 			setProduct(response.data.product)
// 			setIncludes(response.data.include)
// 			setSelectedImage(response.data.product.thumbnail)
// 			setCheckIncludes(response.data)
// 		} catch (error) {
// 			console.error("Error fetching product details:", error)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const fetchWishlist = async () => {
// 		try {
// 			setAddToWishlistLoader(true)
// 			const response = await makeApi("/api/get-my-wishlist", "GET")
// 			const wishlistIds = response.data.wishlist
// 				.filter((item) => item.products !== null)
// 				.map((item) => item.products._id)
// 			setWishlistItems(wishlistIds)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAddToWishlistLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		const checkCart = async () => {
// 			const isInCart = cartItems.some((item) => item.productId === productId)
// 			setIsInCart(isInCart)
// 		}
// 		checkCart()
// 	}, [cartItems, productId])

// 	const handleImageClick = (imageUrl) => {
// 		setSelectedImage(imageUrl)
// 	}

// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const handleBuyNow = async () => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				if (!isInCart) {
// 					await addToCart(
// 						productId,
// 						setIsLogin,
// 						setShowPopup,
// 						fetchCart,
// 						setCartItems,
// 						setProductLoaders
// 					)
// 					navigate("/cart")
// 				} else {
// 					navigate("/cart")
// 				}
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				// Remove loader state after adding to cart or navigating
// 				setAddTocartLoader(false)
// 				setProductLoaders((prevLoaders) => ({
// 					...prevLoaders,
// 					[productId]: false,
// 				}))
// 			}
// 		}
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			setCountLoader((prevState) => ({ ...prevState, [productId]: true })) // Start loader
// 			addToCart(
// 				productId,
// 				setIsLogin,
// 				setShowPopup,
// 				fetchCart,
// 				setCartItems,
// 				setProductLoaders
// 			).finally(() => {
// 				setCountLoader((prevState) => ({ ...prevState, [productId]: false })) // Stop loader
// 			})
// 		} else {
// 			toast("Cannot add more than available quantity.", { type: "error" })
// 		}
// 	}

// 	const handleRemoveFromCart = (productId) => {
// 		setCountLoader((prevState) => ({ ...prevState, [productId]: true })) // Start loader
// 		removeFromCart(productId, setProductLoaders, setCartItems, fetchCart).finally(() => {
// 			setCountLoader((prevState) => ({ ...prevState, [productId]: false })) // Stop loader
// 		})
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart(setCartItems)
// 		fetchWishlist()
// 	}, [productId])
// 	console.log("Product include", checkIncludes)

// 	console.log("Product details", product);

// 	return (
// 		<>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			<ToastContainer />
// 			{loading ? (
// 				<div className={styles.productLoader}>
// 					<div
// 						className="d-flex justify-content-center align-items-center"
// 						style={{ height: "100vh" }}
// 					>
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div>
// 					{product && (
// 						<div>
// 							<div className="product_display_back_btn">
// 								<BackButton pageLocation="/product/all-products" />
// 							</div>

// 							<div className={styles.productContainer}>
// 								<div className={styles.imgContainer}>
// 									<div className={styles.innerImgContainer}>
// 										<div className={styles.mainImg}>
// 											<img src={product.thumbnail} alt="" />
// 										</div>
// 										<div className={styles.subImg}>
// 											<div className={styles.subImg1}>
// 												<img src={product.image[0]} alt="" />
// 											</div>
// 											<div className={styles.subImg1}>
// 												<img src={product.image[1]} alt="" />
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 								<div className={styles.title}>
// 									<div className={styles.productPriceName}>
// 										<h1>{product.name}</h1>
// 										<h2> ₹{Math.round(product.PriceAfterDiscount)}
// 											{product.discountPercentage !== 0 && <span>₹{product.price}</span>}</h2>
// 									</div>
// 									<div className={styles.addToCartContainer}>
// 										<div className={styles.counts}>

// 											<>
// 												<span onClick={() => handleRemoveFromCart(product._id)}>-</span>
// 												{countLoader[product._id] ? (<div className={styles.countLoader}>
// 													<Primaryloader />
// 												</div>
// 												) : (
// 													<p>{getProductQuantity(productId)}</p>
// 												)}
// 												<span onClick={() =>
// 													handleAddToCart(
// 														product._id,
// 														getProductQuantity(product._id),
// 														product.quantity
// 													)
// 												}>+</span>
// 											</>

// 										</div>
// 										<button onClick={() =>
// 											handleAddToCart(
// 												product._id,
// 												getProductQuantity(product._id),
// 												product.quantity
// 											)
// 										}>Add To Cart</button>
// 									</div>
// 								</div>
// 								<div className={styles.description}>
// 									<h2>DESCRIPTION</h2>
// 									<p>{product.description}</p>
// 								</div>
// 								{includes && includes.length > 0 && (
// 									<div className={styles.includes}>
// 										<h2>INCLUDES</h2>
// 										<ul>
// 											{includes.map((item, id) => (
// 												<li key={id}>{item?.include}</li>
// 											))}
// 										</ul>
// 									</div>
// 								)}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default ProductDetails

// import React, { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import "../../pages/CSS/product/productDetails.css"
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import BackButton from "./backButton.jsx"
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify"
// import styles from '../../pages/CSS/product/productDetails.module.css'
// import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js"

// function ProductDetails() {
//     const navigate = useNavigate()
//     const { productId } = useParams()
//     const [product, setProduct] = useState()
//     const [sizes, setSizes] = useState([])
//     const [selectedSize, setSelectedSize] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [cartItems, setCartItems] = useState([])

//     useEffect(() => {
//         fetchProduct()
//         fetchCart(setCartItems)
//     }, [productId])

//     const fetchProduct = async () => {
//         try {
//             setLoading(true)
//             const response = await makeApi(`/api/get-single-product/${productId}`, "GET")
//             setProduct(response.data.product)
//             setSizes(response.data.sizes)
//             setSelectedSize(response.data.sizes[0]) // Set default selected size to the first one
//         } catch (error) {
//             console.error("Error fetching product details:", error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleSizeChange = (size) => {
//         setSelectedSize(size) // Update the selected size
//     }

//     const handleAddToCart = (productId, sizeId) => {
//         const availableQuantity = selectedSize?.quantity
//         if (availableQuantity > 0) {
//             addToCart(productId, sizeId, fetchCart, setCartItems)
//         } else {
//             toast("This size is out of stock", { type: "error" })
//         }
//     }

//     return (
//         <>
//             <ToastContainer />
//             {loading ? (
//                 <div className={styles.productLoader}>
//                     <Primaryloader />
//                 </div>
//             ) : (
//                 <div>
//                     {product && (
//                         <div>
//                             <BackButton pageLocation="/product/all-products" />
//                             <div className={styles.productContainer}>
//                                 <div className={styles.imgContainer}>
//                                     <img src={product.thumbnail} alt={product.name} />
//                                 </div>
//                                 <div className={styles.title}>
//                                     <h1>{product.name}</h1>
//                                     <h2>₹{selectedSize?.FinalPrice}</h2>
//                                     {sizes.length > 0 && (
//                                         <div className={styles.sizeOptions}>
//                                             <h3>Select Size:</h3>
//                                             <div className={styles.sizeList}>
//                                                 {sizes.map((size) => (
//                                                     <button
//                                                         key={size._id}
//                                                         className={selectedSize._id === size._id ? `${styles.activeSize} btn btn-primary` : 'btn btn-warning'} //vaibhav-rathore
//                                                         onClick={() => handleSizeChange(size)}
														
//                                                     >
//                                                         {size.size} {size.sizetype} - ₹{size.FinalPrice}
//                                                     </button>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                     <button
//                                         onClick={() => handleAddToCart(product._id, selectedSize._id)}
//                                         disabled={selectedSize?.quantity === 0}
// 										className="btn btn-danger"  //vaibhav-rathore
//                                     >
//                                         {selectedSize?.quantity === 0 ? "Out of Stock" : "Add to Cart"}
//                                     </button>
//                                 </div>
//                                 <div className={styles.description}>
//                                     <h2>Description</h2>
//                                     <p>{product.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </>
//     )
// }

// export default ProductDetails

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
import PrimaryLoader from "../loaders/primaryloader.jsx";
import BackButton from "./backButton.jsx";
import { makeApi } from "../../api/callApi.tsx";
import styles from "../../pages/CSS/product/productDetails.module.css";
import { addToCart, removeFromCart, fetchCart } from "../../utils/productFunction.js";

function ProductDetails() {
	const navigate = useNavigate();
	const { productId } = useParams();
	const [completeCart, setCompleteCart] = useState([]);
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [productLoaders, setProductLoaders] = useState({});
  const [fetchCartLoader, setFetchCartLoader] = useState(false);


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
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize._id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
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

  const closePopup = () => setShowPopup(false);

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

  return (
    <>
      {showPopup && <LoginPopup setLoginPopup={closePopup} />}
      <ToastContainer position="top-center" />
      <div>
        <BackButton pageLocation="/product/all-products" />
        <div className={styles.productContainer}>
          <div className={styles.imgContainer}>
            <img src={product?.thumbnail} alt={product?.name} />
          </div>
          <div className={styles.title}>
            <h1>{product?.name}</h1>
            <h2>₹{selectedSize?.FinalPrice || product?.PriceAfterDiscount}</h2>
            <div className={styles.sizeOptions}>
              <h3>Select Size:</h3>
              <div className="d-flex gap-2 flex-wrap">
                {sizes.map(size => (
                  <button
                    key={size._id}
                    className={`${selectedSize?._id === size._id ? 'btn btn-success' : ''} btn btn-secondary`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size.size} {size.sizetype} - ₹{size.FinalPrice}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              {fetchCartLoader ? (
                <PrimaryLoader />
              ) : isInCart ? (
                <div className={styles.cartControls}>
                  <button onClick={handleDecreaseQuantity}>-</button>
                  <span>{cartQuantity}</span>
                  <button onClick={handleIncreaseQuantity}>+</button>
                  <button className="btn btn-danger" onClick={() => navigate("/cart")}>Go to Cart</button>
                </div>
              ) : (
                <>
                  <button className="btn btn-danger" onClick={handleIncreaseQuantity}>Add to Cart</button>
                  <button className="btn btn-warning" onClick={handleBuyNow}>Buy Now</button>
                </>
              )}
            </div>
          </div>
          <div className={styles.description}>
            <h2>Description</h2>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
