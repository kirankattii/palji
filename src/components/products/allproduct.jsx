



// import React, { useEffect, useState } from "react"
// import styles from "../../pages/CSS/product/allProduct.module.css"
// import { IoIosHeart } from "react-icons/io"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { Link } from "react-router-dom"
// import LoginPopup from "../LoginPopup/LoginPopup.jsx"
// import { makeApi } from "../../api/callApi"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// 	fetchWishlist,
// } from "../../utils/productFunction.js"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import { toast } from "react-toastify"

// function Allproduct({ search, category, minPrice, maxPrice, categoryName }) {
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(50)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [toalProduct, setToalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsLogin(!!token)
// 	}, [localStorage.getItem("token")])

// 	const fetchProduct = async (page = currentPage) => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(
// 				// `/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				`/api/get-all-products`, //vaibhav-rathore
// 				"GET"
// 			)
// 			console.log("ress", response.data)

// 			setProducts(response.data.products)
// 			setToalProduct(response.data.totalProducts)
// 			const a = Math.ceil(response.data.totalProducts / ResultPerPage)
// 			setTotalPages(a)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	const fetchProducts = async () => {
// 		try {
// 			setAllProductLoader(true);
// 			const response = await makeApi("/api/get-all-products", "GET");
// 			console.log(response);  // Log the response
// 			setProducts(response.data.products); // Simplified without filters
// 			setToalProduct(response.data.totalProducts);
// 		} catch (error) {
// 			console.log(error);
// 		} finally {
// 			setAllProductLoader(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchProduct() // Reset to the first page when filters change
// 		// setCurrentPage(1) // Reset the current page to 1
// 		fetchProducts()
// 		// fetchCart(setCartItems)
// 	}, [search, category, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	useEffect(() => {
// 		const fetchWishlist = async () => {
// 			try {
// 				setAddToWishlistLoader(true)
// 				const response = await makeApi("/api/get-my-wishlist", "GET")
// 				const wishlistIds = response.data.wishlist
// 					.filter((item) => item.products !== null)
// 					.map((item) => item.products._id)
// 				setWishlistItems(wishlistIds)
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				setAddToWishlistLoader(false)
// 			}
// 		}

// 		fetchWishlist()
// 	}, [])

// 	const isInCart = (productId) => {
// 		return cartItems.some((item) => item.productId === productId)
// 	}

// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const toggleWishlist = async (id) => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				setAddToWishlistLoader((prevState) => ({
// 					...prevState,
// 					[id]: true,
// 				}))
// 				const method = "POST"
// 				const endpoint = `/api/create-wishlist/${id}`
// 				const data = await makeApi(endpoint, method)
// 				setWishlistItems((prevState) => {
// 					if (prevState.includes(id)) {
// 						return prevState.filter((itemId) => itemId !== id)
// 					} else {
// 						return [...prevState, id]
// 					}
// 				})
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				setAddToWishlistLoader((prevState) => ({
// 					...prevState,
// 					[id]: false,
// 				}))
// 			}
// 		}
// 	}

// 	const handlePageClick = (pageNumber) => {
// 		setCurrentPage(pageNumber)
// 		window.scrollTo(0, 0) // Scrolls to the top of the page
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(
// 				productId,
// 				setIsLogin,
// 				setShowPopup,
// 				fetchCart,
// 				setCartItems,
// 				setProductLoaders
// 			)
// 		} else {
// 			toast("Cannot add more than available quantity.", { type: "error" })
// 		}
// 	}

// 	return (
// 		<div className={styles.mainContainer}>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			{AllProductLoader ? (

// 				<div className={styles.AllProductLoader}>
// 					<div>
// 						<Primaryloader />
// 					</div>
// 				</div>

// 			) : (


// 				<div className={styles.container}>
// 					{products.length === 0 ? (
// 						<div className={styles.NoProductsFound}>No Products Found</div>
// 					) : (
// 						<div>
// 							<div className={styles.productsContainer}>
// 								<h2>{categoryName}</h2>
// 								<div className={styles.allProductsList}>
// 									{products.map(item => (
// 										<div key={item._id} className={styles.products}>
// 											<Link to={`/product/product-details/${item._id}`}>
// 												<div className={styles.productImg}>
// 													<img src={item.thumbnail} alt={item.name} />
// 												</div>
// 											</Link>
// 											<div className={styles.productContent}>
// 												<p className={styles.name}>{item.name}</p>
// 												<p className={styles.productPrice}>₹{item.PriceAfterDiscount}
// 													{item.discountPercentage > 0 && (
// 														<span>{item?.price} </span>
// 													)}
// 												</p>
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 							<div className={styles.pagination}>
// 								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 									(pageNumber) => (
// 										<button
// 											key={pageNumber}
// 											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
// 											onClick={() => handlePageClick(pageNumber)}
// 										>
// 											{pageNumber}
// 										</button>
// 									)
// 								)}
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}

// 		</div>
// 	)
// }

// export default Allproduct












import React, { useEffect, useState } from "react"
import styles from "../../pages/CSS/product/allProduct.module.css"
import { IoIosHeart } from "react-icons/io"
import AddIcon from "../../assets/add_icon_green.png"
import RemoveIcon from "../../assets/remove_icon_red.png"
import Primaryloader from "../loaders/primaryloader.jsx"
import Heartloader from "../loaders/hearloader.jsx"
import HorizotalLoader from "../loaders/horizotalLoader.jsx"
import { Link } from "react-router-dom"
import LoginPopup from "../LoginPopup/LoginPopup.jsx"
import { makeApi } from "../../api/callApi"
import {
	addToCart,
	removeFromCart,
	fetchCart,
	fetchWishlist,
} from "../../utils/productFunction.js"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { toast } from "react-toastify"

function Allproduct({ search, category, minPrice, maxPrice, categoryName }) {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [wishlistItems, setWishlistItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [ResultPerPage, setResultPerPage] = useState(50)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [toalProduct, setToalProduct] = useState(0)
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [AddTocartLoader, setAddTocartLoader] = useState({})
	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})

	useEffect(() => {
		const token = localStorage.getItem("token")
		setIsLogin(!!token)
	}, [localStorage.getItem("token")])

	const fetchProduct = async (page = currentPage) => {
		try {
			setAllProductLoader(true)
			const response = await makeApi(
				`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
				"GET"
			)
			setProducts(response.data.products)
			setToalProduct(response.data.totalProducts)
			const a = Math.ceil(response.data.totalProducts / ResultPerPage)
			setTotalPages(a)
		} catch (error) {
			console.log(error)
		} finally {
			setAllProductLoader(false)
		}
	}

	useEffect(() => {
		fetchProduct(1) // Reset to the first page when filters change
		setCurrentPage(1) // Reset the current page to 1
		fetchCart(setCartItems)
	}, [search, category, minPrice, maxPrice, ResultPerPage])

	useEffect(() => {
		fetchProduct() // Fetch products whenever the current page changes
	}, [currentPage])

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				setAddToWishlistLoader(true)
				const response = await makeApi("/api/get-my-wishlist", "GET")
				const wishlistIds = response.data.wishlist
					.filter((item) => item.products !== null)
					.map((item) => item.products._id)
				setWishlistItems(wishlistIds)
			} catch (error) {
				console.log(error)
			} finally {
				setAddToWishlistLoader(false)
			}
		}

		fetchWishlist()
	}, [])

	const isInCart = (productId) => {
		return cartItems.some((item) => item.productId === productId)
	}

	const closePopup = () => {
		setShowPopup(false)
	}

	const toggleWishlist = async (id) => {
		if (!IsLogin) {
			setShowPopup(true)
		} else {
			try {
				setAddToWishlistLoader((prevState) => ({
					...prevState,
					[id]: true,
				}))
				const method = "POST"
				const endpoint = `/api/create-wishlist/${id}`
				const data = await makeApi(endpoint, method)
				setWishlistItems((prevState) => {
					if (prevState.includes(id)) {
						return prevState.filter((itemId) => itemId !== id)
					} else {
						return [...prevState, id]
					}
				})
			} catch (error) {
				console.log(error)
			} finally {
				setAddToWishlistLoader((prevState) => ({
					...prevState,
					[id]: false,
				}))
			}
		}
	}

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber)
		window.scrollTo(0, 0) // Scrolls to the top of the page
	}

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.productId === productId)
		return cartItem ? cartItem.quantity : 0
	}

	const handleAddToCart = (productId, quantity, availableQuantity) => {
		if (quantity < availableQuantity) {
			addToCart(
				productId,
				setIsLogin,
				setShowPopup,
				fetchCart,
				setCartItems,
				setProductLoaders
			)
		} else {
			toast("Cannot add more than available quantity.", { type: "error" })
		}
	}

	return (
		<div className={styles.mainContainer}>
			{showPopup && <LoginPopup onClose={closePopup} />}
			{AllProductLoader ? (

				<div className={styles.AllProductLoader}>
					<div>
						<Primaryloader />
					</div>
				</div>

			) : (


				<div className={styles.container}>
					{products.length === 0 ? (
						<div className={styles.NoProductsFound}>No Products Found</div>
					) : (
						<div>
							<div className={styles.productsContainer}>
								<h2>{categoryName}</h2>
								<div className={styles.allProductsList}>
									{products.map(item => (
										<div key={item._id} className={styles.products}>
											<Link to={`/product/product-details/${item._id}`}>
												<div className={styles.productImg}>
													<img src={item.thumbnail} alt={item.name} />
												</div>
											</Link>
											<div className={styles.productContent}>
												<p className={styles.name}>{item.name}</p>
												{item.size.length > 0 ? (
													<p className={styles.productPrice}>
														₹{item.size[0].FinalPrice} {/* Assuming you want to show the price of the first size */}
														{item.size[0].discountPercentage > 0 && (
															<span> ₹{item.size[0].price}</span>
														)}
													</p>
												) : (
													<p className={styles.productPrice}>Price not available</p>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
							<div className={styles.pagination}>
								{Array.from({ length: totalPages }, (_, index) => index + 1).map(
									(pageNumber) => (
										<button
											key={pageNumber}
											className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
											onClick={() => handlePageClick(pageNumber)}
										>
											{pageNumber}
										</button>
									)
								)}
							</div>
						</div>
					)}
				</div>
			)}

		</div>
	)
}

export default Allproduct























