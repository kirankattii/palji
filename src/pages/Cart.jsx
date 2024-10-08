// import React, { useContext, useEffect, useState } from "react"
// import "./CSS/cart.css"
// // import all_product from "../assets/all_products"
// import { ShopContext } from "../context/ShopContext"
// import { assets } from "../assets/assets"
// import { useNavigate } from "react-router"
// import { makeApi } from "../api/callApi"
// import Orderbar from "../components/orderbar/orderbar"
// import { ToastContainer } from "react-toastify"
// import Primaryloader from "../components/loaders/primaryloader"
// import { Link } from "react-router-dom"

// const Cart = () => {
// 	const {
// 		cartItems,
// 		getTotalCartDiscountAmount,
// 		all_product,

// 		// removeFromCart,
// 		getTotalCartAmount,
// 	} = useContext(ShopContext)

// 	// const totalDiscount = getTotalCartAmount() - getTotalCartDiscountAmount()
// 	const totalDiscount = (
// 		getTotalCartAmount() - getTotalCartDiscountAmount()
// 	).toFixed(2)

// 	// console.log("this is cart", all_product)

// 	console.log(cartItems)
// 	const navigate = useNavigate()

// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [cartItem, setCartItem] = useState([])
// 	const [cartPoductList, setCartProductList] = useState([])
// 	const [coupanCode, setCoupanCode] = useState(null)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [IscartEmpty, setIsCartEmpty] = useState(false)
// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	const fetchCartItem = async () => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi("/api/my-cart", "GET")
// 			console.log("Cart Items Response:", response.data) // Log the response data
// 			// Update state with cart items
// 			setCartItem(response.data)
// 			if (response.data.orderItems.length === 0) {
// 				setIsCartEmpty(true)
// 			}
// 			setCartProductList(response.data.orderItems)
// 		} catch (error) {
// 			console.log(error)
// 			if (error.response.data.message === "Cart not found") {
// 				setIsCartEmpty(true)
// 			}
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	// action
// 	console.log("coupanCode", coupanCode)
// 	const SubmitCoupan = async (e) => {
// 		e.preventDefault()
// 		try {
// 			const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
// 				coupanCode: coupanCode,
// 			})
// 			console.log(applyCoupan.data.message)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}

// 	// calling getting data
// 	useEffect(() => {
// 		fetchShippingAddresses()
// 	}, [])

// 	const removeFromCart = async (productId) => {
// 		try {
// 			setProductLoaders((prevState) => ({
// 				...prevState,
// 				[productId]: true,
// 			}))
// 			const method = "POST"
// 			const endpoint = "/api/remove-from-cart"
// 			const data = await makeApi(endpoint, method, { productId })
// 			// setCartItems(prevState => prevState.filter(item => item.productId !== productId));
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			fetchCartItem()
// 			setProductLoaders((prevState) => ({
// 				...prevState,
// 				[productId]: false,
// 			}))
// 		}
// 	}

// 	useEffect(() => {
// 		fetchCartItem()
// 	}, [])

// 	return (
// 		<>
// 			<ToastContainer />
// 			{AllProductLoader ? (
// 				<div className="All_Product_loader">
// 					<div className="All_Product_loadera">
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div className="cart-container">
// 					{IscartEmpty && (
// 						<div className="empty_cart_div">
// 							<img
// 								src={assets.empty_cart}
// 								alt="No cart "
// 								className="NO_cart_image"
// 							/>
// 							<Link to="/product/all-products">
// 								<h2>Explore products</h2>
// 							</Link>
// 						</div>
// 					)}
// 					{!IscartEmpty && (
// 						<div>
// 							<div className="cart-item">
// 								<div className="cart-items-title cart-items-title2">
// 									<p>Items</p>
// 									<p>Name</p>
// 									<p>Price</p>
// 									<p>Qty</p>
// 									<p>Total:</p>
// 									<p>Remove</p>
// 								</div>
// 								<br />
// 								<hr />
// 								{cartPoductList &&
// 									cartPoductList.map((item, index) => (
// 										<div key={index}>
// 											<div className="cart-items-title cart-items-item">
// 												<img
// 													src={item.productId.thumbnail}
// 													alt=""
// 												/>
// 												<p>{item.productId.name}</p>
// 												<p>₹{item.productId.price}</p>
// 												<div>
// 													<p>{item.quantity}</p>
// 												</div>
// 												<p>₹{item.totalPrice}</p>
// 												<p
// 													className="cross"
// 													onClick={() => removeFromCart(item.productId._id)}
// 												>
// 													<img
// 														className="remove-cart"
// 														src={assets.cart_remove}
// 														alt=""
// 													/>
// 												</p>
// 											</div>
// 											{/* <hr /> */}
// 										</div>
// 									))}
// 							</div>
// 							<div className="cart-bottomm">
// 								<div className="cart-address">
// 									{/* <h2>ADDRESS</h2> */}
// 									<div className="cart-shipping-address">
// 										{/* {!loading && shippingAddresses.map((address, index) => (
// 							<div key={index} className="address-item">
// 								<input
// 									type="radio"
// 									id={`address-${index}`}
// 									name="shipping-address"
// 									value={address._id}
// 									checked={selectedAddress === address}
// 									onChange={() => handleAddressSelect(address)}
// 									className='address-radio'
// 								/>
// 								<label htmlFor={`address-${index}`} className="address-label" >
// 									{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
// 								</label>
// 							</div>
// 						))} */}
// 									</div>
// 								</div>
// 								<div className="cart-billing">
// 									<div className="cart-order-summary">
// 										<h2>order summary</h2>
// 										<div className="cart-billing-charges">
// 											<div className="cart-billing-subtotal">
// 												<p>SUBTOTAL</p>
// 												<p>
// 													₹
// 													{cartItem.totalPrice
// 														? cartItem.totalPrice.toFixed(2)
// 														: "0.00"}
// 												</p>
// 											</div>{" "}
// 											<div className="cart-billing-discount">
// 												<p>DISCOUNT</p>
// 												<p>₹{totalDiscount}</p>
// 											</div>{" "}
// 											<div className="cart-billing-tax">
// 												<p>TAX</p>
// 												<p>₹{cartItem.taxPrice}</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<p>SHIPPING</p>
// 												<p>{cartItem.shippingPrice}</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<b>TOTAL</b>
// 												<b>₹{cartItem.TotalProductPrice}</b>
// 											</div>
// 										</div>
// 										<button onClick={() => navigate("./checkout")}>
// 											proceed to checkout
// 										</button>
// 										<hr />
// 										<p className="cart-delivery-day">
// 											estimated delivery by <span>29 february, 24</span>
// 										</p>
// 									</div>
// 									{/* <div className="cart-promocode">
// 						<h2>HAVE A COUPON ?</h2>
// 						<div className="cart-promocode-input">
// 							<input
// 								type="text"
// 								placeholder="COUPON CODE"
// 								value={coupanCode}
// 								onChange={(e) => setCoupanCode(e.target.value)}
// 							/>
// 							<button onClick={(e) => SubmitCoupan(e)}>APPLY</button>
// 						</div>
// 					</div> */}
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Cart

// // add address api

// import React, { useContext, useEffect, useState } from "react"
// import "./CSS/cart.css"
// // import all_product from "../assets/all_products"
// import { ShopContext } from "../context/ShopContext"
// import { assets } from "../assets/assets"
// import { useNavigate } from "react-router"
// import { makeApi } from "../api/callApi"
// import Orderbar from "../components/orderbar/orderbar"
// import { ToastContainer } from "react-toastify"
// import Primaryloader from "../components/loaders/primaryloader"
// import { Link } from "react-router-dom"
// import {
// 	cartItemFetchCart,
// 	cartItemAddToCart,
// 	cartItemRemoveFromCart,
// 	// } from '../../../api/productFunction';
// } from "../utils/productFunction"

// const Cart = () => {
// 	const {
// 		cartItems,
// 		getTotalCartDiscountAmount,
// 		all_product,

// 		// removeFromCart,
// 		getTotalCartAmount,
// 	} = useContext(ShopContext)

// 	// const totalDiscount = getTotalCartAmount() - getTotalCartDiscountAmount()
// 	const totalDiscount = (
// 		getTotalCartAmount() - getTotalCartDiscountAmount()
// 	).toFixed(2)

// 	// console.log("this is cart", all_product)

// 	console.log(cartItems)
// 	const navigate = useNavigate()

// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [cartItem, setCartItem] = useState([])
// 	const [cartPoductList, setCartProductList] = useState([])
// 	const [coupanCode, setCoupanCode] = useState(null)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [IscartEmpty, setIsCartEmpty] = useState(false)
// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	// const fetchCartItem = async () => {
// 	// 	try {
// 	// 		setAllProductLoader(true)
// 	// 		const response = await makeApi("/api/my-cart", "GET")
// 	// 		console.log("Cart Items Response:", response.data) // Log the response data
// 	// 		// Update state with cart items
// 	// 		setCartItem(response.data)
// 	// 		if (response.data.orderItems.length === 0) {
// 	// 			setIsCartEmpty(true)
// 	// 		}
// 	// 		setCartProductList(response.data.orderItems)
// 	// 	} catch (error) {
// 	// 		console.log(error)
// 	// 		if (error.response.data.message === "Cart not found") {
// 	// 			setIsCartEmpty(true)
// 	// 		}
// 	// 	} finally {
// 	// 		setAllProductLoader(false)
// 	// 	}
// 	// }

// 	// action
// 	console.log("coupanCode", coupanCode)
// 	const SubmitCoupan = async (e) => {
// 		e.preventDefault()
// 		try {
// 			const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
// 				coupanCode: coupanCode,
// 			})
// 			console.log(applyCoupan.data.message)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}

// 	// calling getting data
// 	useEffect(() => {
// 		fetchShippingAddresses()
// 	}, [])

// 	const fetchCartItem = async () => {
// 		await cartItemFetchCart(
// 			setCartItem,
// 			setCartProductList,
// 			setAllProductLoader,
// 			setIsCartEmpty
// 		)
// 	}

// 	const removeFromCart = async (productId) => {
// 		await cartItemRemoveFromCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const addToCart = async (productId) => {
// 		await cartItemAddToCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(productId)
// 		} else {
// 			toast("Cannot add more than available quantity.", { type: "error" })
// 		}
// 	}

// 	useEffect(() => {
// 		fetchCartItem()
// 	}, [])

// 	return (
// 		<>
// 			<ToastContainer />
// 			{AllProductLoader ? (
// 				<div className="All_Product_loader">
// 					<div className="All_Product_loadera">
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div className="cart-container">
// 					{IscartEmpty && (
// 						<div className="empty_cart_div">
// 							<img
// 								src={assets.empty_cart}
// 								alt="No cart "
// 								className="NO_cart_image"
// 							/>
// 							<Link to="/product/all-products">
// 								<h2>Explore products</h2>
// 							</Link>
// 						</div>
// 					)}
// 					{!IscartEmpty && (
// 						<div>
// 							<div className="cart-item">
// 								<div className="cart-items-title cart-items-title2">
// 									<p>Items</p>
// 									<p>Name</p>
// 									<p>Price</p>
// 									<p>Qty</p>
// 									<p>Total:</p>
// 									{/* <p>Remove</p> */}
// 								</div>
// 								<br />
// 								<hr />
// 								{cartPoductList &&
// 									cartPoductList.map((item, index) => (
// 										<div key={index}>
// 											<div className="cart-items-title cart-items-item">
// 												<img
// 													src={item.productId.thumbnail}
// 													alt=""
// 												/>
// 												<p>{item.productId.name}</p>
// 												<p>₹{item.productId.price}</p>
// 												<div className="cartPageButton">
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_red}
// 														alt="RemoveIcon"
// 														className="Icon_add_to_cart_main_cart_page cart_increase"
// 														onClick={() => removeFromCart(item.productId._id)}
// 													/>
// 													<p>{item.quantity}</p>
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_green}
// 														alt="AddIcon"
// 														className="Icon_add_to_cart_main_cart_page"
// 														onClick={() =>
// 															handleAddToCart(
// 																item.productId._id,
// 																item.quantity,
// 																item.productId.quantity
// 															)
// 														}
// 													/>
// 												</div>
// 												<p>₹{item.totalPrice}</p>
// 												{/* <p
// 													className="cross"
// 													onClick={() => removeFromCart(item.productId._id)}
// 												>
// 													<img
// 														className="remove-cart"
// 														src={assets.cart_remove}
// 														alt=""
// 													/>
// 												</p> */}
// 											</div>
// 											{/* <hr /> */}
// 										</div>
// 									))}
// 							</div>
// 							<div className="cart-bottomm">
// 								<div className="cart-address">
// 									{/* <h2>ADDRESS</h2> */}
// 									<div className="cart-shipping-address">
// 										{/* {!loading && shippingAddresses.map((address, index) => (
// 							<div key={index} className="address-item">
// 								<input
// 									type="radio"
// 									id={`address-${index}`}
// 									name="shipping-address"
// 									value={address._id}
// 									checked={selectedAddress === address}
// 									onChange={() => handleAddressSelect(address)}
// 									className='address-radio'
// 								/>
// 								<label htmlFor={`address-${index}`} className="address-label" >
// 									{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
// 								</label>
// 							</div>
// 						))} */}
// 									</div>
// 								</div>

// 								<div className="cart-billing">
// 									<div className="cart-promocode">
// 										<h2>HAVE A COUPON ?</h2>
// 										<div className="cart-promocode-input">
// 											<input
// 												type="text"
// 												placeholder="COUPON CODE"
// 												value={coupanCode}
// 												onChange={(e) => setCoupanCode(e.target.value)}
// 											/>
// 											<button onClick={(e) => SubmitCoupan(e)}>APPLY</button>
// 										</div>
// 									</div>
// 									<div className="cart-order-summary">
// 										<h2>order summary</h2>
// 										<div className="cart-billing-charges">
// 											<div className="cart-billing-subtotal">
// 												<p>SUBTOTAL</p>
// 												<p>
// 													₹
// 													{cartItem.totalPrice
// 														? cartItem.totalPrice.toFixed(2)
// 														: "0.00"}
// 												</p>
// 											</div>{" "}
// 											<div className="cart-billing-discount">
// 												<p>DISCOUNT</p>
// 												<p>₹{totalDiscount}</p>
// 											</div>{" "}
// 											<div className="cart-billing-tax">
// 												<p>TAX</p>
// 												{/* <p>₹{cartItem.taxPrice}</p> */}
// 												<p>{18}%</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<p>SHIPPING</p>
// 												<p>{cartItem.shippingPrice}</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<b>TOTAL</b>
// 												<b>₹{cartItem.TotalProductPrice}</b>
// 											</div>
// 										</div>
// 										<button onClick={() => navigate("./checkout")}>
// 											proceed to checkout
// 										</button>
// 										<hr />
// 										<p className="cart-delivery-day">
// 											Estimated delivery in <span>3 to 5</span> Days
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Cart

// // add address api

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import React, { useContext, useEffect, useState } from "react"
// import "./CSS/cart.css"
// import { ShopContext } from "../context/ShopContext"
// import { assets } from "../assets/assets"
// import { useNavigate } from "react-router"
// import { makeApi } from "../api/callApi"
// import Orderbar from "../components/orderbar/orderbar"
// import { ToastContainer } from "react-toastify"
// import Primaryloader from "../components/loaders/primaryloader"
// import { Link } from "react-router-dom"
// import {
// 	cartItemFetchCart,
// 	cartItemAddToCart,
// 	cartItemRemoveFromCart,
// } from "../utils/productFunction"

// const Cart = () => {
// 	const {
// 		cartItems,
// 		getTotalCartDiscountAmount,
// 		all_product,

// 		getTotalCartAmount,
// 	} = useContext(ShopContext)

// 	const totalDiscount = (
// 		getTotalCartAmount() - getTotalCartDiscountAmount()
// 	).toFixed(2)

// 	console.log(cartItems)
// 	const navigate = useNavigate()

// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [cartItem, setCartItem] = useState([])
// 	const [cartPoductList, setCartProductList] = useState([])
// 	const [coupanCode, setCoupanCode] = useState(null)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [IscartEmpty, setIsCartEmpty] = useState(false)
// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	// action
// 	console.log("coupanCode", coupanCode)
// 	const SubmitCoupan = async (e) => {
// 		e.preventDefault()
// 		try {
// 			const applyCoupan = await makeApi("/api/apply-coupon", "POST", {
// 				coupanCode: coupanCode,
// 			})
// 			console.log(applyCoupan.data.message)
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}

// 	// calling getting data
// 	useEffect(() => {
// 		fetchShippingAddresses()
// 	}, [])

// 	const fetchCartItem = async () => {
// 		await cartItemFetchCart(
// 			setCartItem,
// 			setCartProductList,
// 			setAllProductLoader,
// 			setIsCartEmpty
// 		)
// 	}

// 	const removeFromCart = async (productId) => {
// 		await cartItemRemoveFromCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const addToCart = async (productId) => {
// 		await cartItemAddToCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(productId)
// 		} else {
// 			toast("Cannot add more than available quantity.", { type: "error" })
// 		}
// 	}

// 	useEffect(() => {
// 		fetchCartItem()
// 	}, [])

// 	return (
// 		<>
// 			<ToastContainer />
// 			{AllProductLoader ? (
// 				<div className="All_Product_loader">
// 					<div className="All_Product_loadera">
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div className="cart-container">
// 					{IscartEmpty && (
// 						<div className="empty_cart_div">
// 							<img
// 								src={assets.empty_cart}
// 								alt="No cart "
// 								className="NO_cart_image"
// 							/>
// 							<Link to="/product/all-products">
// 								<h2>Explore products</h2>
// 							</Link>
// 						</div>
// 					)}
// 					{!IscartEmpty && (
// 						<div>
// 							<div className="cart-item">
// 								<div className="cart-items-title cart-items-title2">
// 									<p>Items</p>
// 									<p>Name</p>
// 									<p>Price</p>
// 									<p>Qty</p>
// 									<p>Total:</p>
// 								</div>
// 								<br />
// 								<hr />
// 								{cartPoductList &&
// 									cartPoductList.map((item, index) => (
// 										<div key={index}>
// 											<div className="cart-items-title cart-items-item">
// 												<img
// 													src={item.productId.thumbnail}
// 													alt=""
// 												/>
// 												<p>{item.productId.name}</p>
// 												<p>₹{item.productId.price}</p>
// 												<div className="cartPageButton">
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_red}
// 														alt="RemoveIcon"
// 														className="Icon_add_to_cart_main_cart_page cart_increase"
// 														onClick={() => removeFromCart(item.productId._id)}
// 													/>
// 													<p>{item.quantity}</p>
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_green}
// 														alt="AddIcon"
// 														className="Icon_add_to_cart_main_cart_page"
// 														onClick={() =>
// 															handleAddToCart(
// 																item.productId._id,
// 																item.quantity,
// 																item.productId.quantity
// 															)
// 														}
// 													/>
// 												</div>
// 												<p>₹{item.totalPrice}</p>
// 											</div>
// 											{/* <hr /> */}
// 										</div>
// 									))}
// 							</div>
// 							<div className="cart-bottomm">
// 								<div className="cart-address">
// 									<div className="cart-shipping-address"></div>
// 								</div>

// 								<div className="cart-billing">
// 									<div className="cart-promocode">
// 										<h2>HAVE A COUPON ?</h2>
// 										<div className="cart-promocode-input">
// 											<input
// 												type="text"
// 												placeholder="COUPON CODE"
// 												value={coupanCode}
// 												onChange={(e) => setCoupanCode(e.target.value)}
// 											/>
// 											<button onClick={(e) => SubmitCoupan(e)}>APPLY</button>
// 										</div>
// 									</div>
// 									<div className="cart-order-summary">
// 										<h2>order summary</h2>
// 										<div className="cart-billing-charges">
// 											<div className="cart-billing-subtotal">
// 												<p>SUBTOTAL</p>
// 												<p>
// 													₹
// 													{cartItem.totalPrice
// 														? cartItem.totalPrice.toFixed(2)
// 														: "0.00"}
// 												</p>
// 											</div>{" "}
// 											<div className="cart-billing-discount">
// 												<p>DISCOUNT</p>
// 												<p>₹{totalDiscount}</p>
// 											</div>{" "}
// 											<div className="cart-billing-tax">
// 												<p>TAX</p>
// 												<p>{18}%</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<p>SHIPPING</p>
// 												<p>{cartItem.shippingPrice}</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<b>TOTAL</b>
// 												<b>₹{cartItem.TotalProductPrice}</b>
// 											</div>
// 										</div>
// 										<button onClick={() => navigate("./checkout")}>
// 											proceed to checkout
// 										</button>
// 										<hr />
// 										<p className="cart-delivery-day">
// 											Estimated delivery in <span>3 to 5</span> Days
// 										</p>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Cart

// import React, { useContext, useEffect, useState } from "react"
// import "./CSS/cart.css"
// import { ShopContext } from "../context/ShopContext"
// import { assets } from "../assets/assets"
// import { useNavigate } from "react-router"
// import { makeApi } from "../api/callApi"
// import Orderbar from "../components/orderbar/orderbar"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import Primaryloader from "../components/loaders/primaryloader"
// import { Link } from "react-router-dom"
// import {
// 	cartItemFetchCart,
// 	cartItemAddToCart,
// 	cartItemRemoveFromCart,
// 	removeAllProductsFromCart,
// } from "../utils/productFunction"

// const Cart = () => {
// 	const {
// 		cartItems,
// 		getTotalCartDiscountAmount,
// 		all_product,
// 		getTotalCartAmount,
// 	} = useContext(ShopContext)

// 	const totalDiscount = (
// 		getTotalCartAmount() - getTotalCartDiscountAmount()
// 	).toFixed(2)

// 	const navigate = useNavigate()

// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [cartItem, setCartItem] = useState([])
// 	const [cartPoductList, setCartProductList] = useState([])
// 	const [coupanCode, setCoupanCode] = useState("")
// 	const [appliedCoupan, setAppliedCoupan] = useState(null)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [IscartEmpty, setIsCartEmpty] = useState(false)
// 	const [coupanDiscount, setCoupanDiscount] = useState(0)

// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	const SubmitCoupan = async (e) => {
// 		e.preventDefault()
// 		try {
// 			const applyCoupan = await makeApi(
// 				`/api/get-coupan-by-coupancode/${coupanCode}`,
// 				"GET"
// 			)
// 			if (applyCoupan?.data?.coupan !== null) {
// 				setAppliedCoupan(applyCoupan.data.coupan)
// 				toast.success("Coupon applied successfully!")
// 				setCoupanDiscount(applyCoupan?.data?.coupan?.discountPercentage)
// 				fetchCartItem()
// 			} else {
// 				toast.error("Coupan Code is Invalid")
// 			}

// 			// Update cart data after applying coupon
// 		} catch (error) {
// 			console.error("Error applying coupon: ", error)
// 			toast.error("Failed to apply coupon")
// 		}
// 	}
// 	console.log("cujadn", coupanDiscount)

// 	const RemoveCoupan = async () => {
// 		try {
// 			const removeCoupan = await makeApi("/api/remove-coupon", "POST")
// 			setAppliedCoupan(null)
// 			setCoupanCode("")
// 			toast.success("Coupon removed successfully!")
// 			// Update cart data after removing coupon
// 			fetchCartItem()
// 		} catch (error) {
// 			console.error("Error removing coupon: ", error)
// 			toast.error("Failed to remove coupon")
// 		}
// 	}

// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}

// 	useEffect(() => {
// 		fetchShippingAddresses()
// 	}, [])

// 	const fetchCartItem = async () => {
// 		await cartItemFetchCart(
// 			setCartItem,
// 			setCartProductList,
// 			setAllProductLoader,
// 			setIsCartEmpty
// 		)
// 	}

// 	const removeFromCart = async (productId) => {
// 		await cartItemRemoveFromCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const addToCart = async (productId) => {
// 		await cartItemAddToCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(productId)
// 		} else {
// 			toast.error("Cannot add more than available quantity.")
// 		}
// 	}

// 	useEffect(() => {
// 		fetchCartItem()
// 	}, [])

// 	return (
// 		<>
// 			<ToastContainer />
// 			{AllProductLoader ? (
// 				<div className="All_Product_loader">
// 					<div className="All_Product_loadera">
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div className="cart-container">
// 					{IscartEmpty && (
// 						<div className="empty_cart_div">
// 							<img
// 								src={assets.empty_cart}
// 								alt="No cart "
// 								className="NO_cart_image"
// 							/>
// 							<Link to="/product/all-products">
// 								<h2>Explore products</h2>
// 							</Link>
// 						</div>
// 					)}
// 					{!IscartEmpty && (
// 						<div>
// 							<div className="cart-item">
// 								<div className="cart-items-title cart-items-title2">
// 									<p>Items</p>
// 									<p>Name</p>
// 									<p>Price</p>
// 									<p>Qty</p>
// 									<p>Total:</p>
// 									<p>Remove</p>
// 								</div>
// 								<br />
// 								<hr />
// 								{cartPoductList &&
// 									cartPoductList.map((item, index) => (
// 										<div key={index}>
// 											<div className="cart-items-title cart-items-item">
// 												<img
// 													src={item.productId.thumbnail}
// 													alt=""
// 												/>
// 												<p>{item.productId.name}</p>
// 												<p>₹{item.productId.price}</p>
// 												<div className="cartPageButton">
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_red}
// 														alt="RemoveIcon"
// 														className="Icon_add_to_cart_main_cart_page cart_increase"
// 														onClick={() => removeFromCart(item.productId._id)}
// 													/>
// 													<p>{item.quantity}</p>
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_green}
// 														alt="AddIcon"
// 														className="Icon_add_to_cart_main_cart_page"
// 														onClick={() =>
// 															handleAddToCart(
// 																item.productId._id,
// 																item.quantity,
// 																item.productId.quantity
// 															)
// 														}
// 													/>
// 												</div>
// 												<p>₹{item.totalPrice}</p>
// 												<p
// 													className="cross"
// 													onClick={() =>
// 														removeAllProductsFromCart(
// 															item.productId._id,
// 															setProductLoaders,
// 															fetchCartItem
// 														)
// 													}
// 												>
// 													<img
// 														className="remove-cart"
// 														src={assets.cart_remove}
// 														alt=""
// 													/>
// 												</p>
// 											</div>
// 											{/* <hr /> */}
// 										</div>
// 									))}
// 							</div>
// 							<div className="cart-bottomm">
// 								<div className="cart-address">
// 									<div className="cart-shipping-address"></div>
// 								</div>

// 								<div className="cart-billing">
// 									<div className="cart-promocode">
// 										<h2>HAVE A COUPON ?</h2>
// 										<div className="cart-promocode-input">
// 											<input
// 												type="text"
// 												placeholder="COUPON CODE"
// 												value={coupanCode}
// 												onChange={(e) => setCoupanCode(e.target.value)}
// 												disabled={appliedCoupan !== null}
// 											/>
// 											{appliedCoupan ? (
// 												<button onClick={RemoveCoupan}>REMOVE</button>
// 											) : (
// 												<button onClick={(e) => SubmitCoupan(e)}>APPLY</button>
// 											)}
// 										</div>
// 									</div>
// 									<div className="cart-order-summary">
// 										<h2>order summary</h2>
// 										<div className="cart-billing-charges">
// 											<div className="cart-billing-subtotal">
// 												<p>SUBTOTAL</p>
// 												<p>
// 													₹
// 													{cartItem.totalPrice
// 														? cartItem.totalPrice.toFixed(2)
// 														: "0.00"}
// 												</p>
// 											</div>{" "}
// 											<div className="cart-billing-discount">
// 												<p>DISCOUNT</p>
// 												<p>{appliedCoupan ? coupanDiscount : totalDiscount}%</p>
// 											</div>{" "}
// 											<div className="cart-billing-tax">
// 												<p>TAX</p>
// 												<p>{18}%</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<p>SHIPPING</p>
// 												<p>{cartItem.shippingPrice}</p>
// 											</div>{" "}
// 											<div className="cart-billing-shipping">
// 												<b>TOTAL</b>
// 												<b>
// 													₹
// 													{cartItem.TotalProductPrice -
// 														cartItem.TotalProductPrice * (coupanDiscount / 100)}
// 												</b>
// 											</div>
// 										</div>
// 										<button
// 											className="proceed_to_payment_button"
// 											onClick={() => navigate("./checkout")}
// 										>
// 											proceed to checkout
// 										</button>
// 										<hr />
// 										<p className="cart-delivery-day">
// 											Estimated delivery in <span>3 to 5</span> Days
// 										</p>
// 									</div>

// 									{/* </div> */}
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Cart

// import React, { useContext, useEffect, useState } from "react"
// import "./CSS/cart.css"
// import { ShopContext } from "../context/ShopContext"
// import { assets } from "../assets/assets"
// import { useNavigate } from "react-router"
// import Orderbar from "../components/orderbar/orderbar"
// import { ToastContainer } from "react-toastify"
// import Primaryloader from "../components/loaders/primaryloader"
// import { Link } from "react-router-dom"
// import {
// 	cartItemFetchCart,
// 	cartItemAddToCart,
// 	cartItemRemoveFromCart,
// 	removeAllProductsFromCart,
// 	deleteCartItemRemoveFromCart,
// } from "../utils/productFunction"
// import useCoupon from "../hook/coupanHook"
// import CouponFunctions from "../utils/couponFunctions"
// import { makeApi } from "../api/callApi"
// import CartCalculation from "../components/CartCalculation/cartCalculation"

// const Cart = () => {
// 	const {
// 		cartItems,
// 		getTotalCartDiscountAmount,
// 		all_product,
// 		getTotalCartAmount,
// 	} = useContext(ShopContext)

// 	const {
// 		couponCode,
// 		setCouponCode,
// 		appliedCoupon,
// 		couponDiscount,
// 		applyCoupon,
// 		removeCoupon,
// 	} = useCoupon()

// 	const totalDiscount = (
// 		getTotalCartAmount() - getTotalCartDiscountAmount()
// 	).toFixed(2)

// 	const navigate = useNavigate()

// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [cartItem, setCartItem] = useState([])
// 	const [cartPoductList, setCartProductList] = useState([])
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [IscartEmpty, setIsCartEmpty] = useState(false)

// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}

// 	useEffect(() => {
// 		fetchShippingAddresses()
// 	}, [])

// 	const fetchCartItem = async () => {
// 		await cartItemFetchCart(
// 			setCartItem,
// 			setCartProductList,
// 			setAllProductLoader,
// 			setIsCartEmpty
// 		)
// 	}

// 	const removeFromCart = async (productId) => {
// 		await cartItemRemoveFromCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const addToCart = async (productId) => {
// 		await cartItemAddToCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(productId)
// 		} else {
// 			toast.error("Cannot add more than available quantity.")
// 		}
// 	}

// 	// const removeAll = async(productId,quantity)

// 	const removeAll = async (productId, quantity) => {
// 		console.log("Remove all cart", productId, quantity)

// 		await deleteCartItemRemoveFromCart(
// 			productId,
// 			setProductLoaders,
// 			fetchCartItem,
// 			quantity
// 		)
// 	}

// 	useEffect(() => {
// 		fetchCartItem()
// 	}, [])

// 	return (
// 		<>
// 			<ToastContainer />
// 			{AllProductLoader ? (
// 				<div className="All_Product_loader">
// 					<div className="All_Product_loadera">
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div className="cart-container">
// 					{IscartEmpty && (
// 						<div className="empty_cart_div">
// 							<img
// 								src={assets.empty_cart}
// 								alt="No cart "
// 								className="NO_cart_image"
// 							/>
// 							<Link to="/product/all-products">
// 								<h2>Explore products</h2>
// 							</Link>
// 						</div>
// 					)}
// 					{!IscartEmpty && (
// 						<div>
// 							<div className="cart-item">
// 								<div className="cart-items-title cart-items-title2">
// 									<p>Items</p>
// 									<p>Name</p>
// 									<p>Price</p>
// 									<p>Qty</p>
// 									<p>Total:</p>
// 									<p>Remove</p>
// 								</div>
// 								<br />
// 								<hr />
// 								{cartPoductList &&
// 									cartPoductList.map((item, index) => (
// 										<div key={index}>
// 											<div className="cart-items-title cart-items-item">
// 												<img
// 													src={item.productId.thumbnail}
// 													alt=""
// 												/>
// 												<p>{item.productId.name}</p>
// 												<p>₹{item.productId.price}</p>
// 												<div className="cartPageButton">
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_red}
// 														alt="RemoveIcon"
// 														className="Icon_add_to_cart_main_cart_page cart_increase"
// 														onClick={() => removeFromCart(item.productId._id)}
// 													/>
// 													<p>{item.quantity}</p>
// 													<img
// 														loading="lazy"
// 														src={assets.add_icon_green}
// 														alt="AddIcon"
// 														className="Icon_add_to_cart_main_cart_page"
// 														onClick={() =>
// 															handleAddToCart(
// 																item.productId._id,
// 																item.quantity,
// 																item.productId.quantity
// 															)
// 														}
// 													/>
// 												</div>
// 												<p>₹{item.totalPrice}</p>
// 												<p
// 													className="cross"
// 													onClick={() =>
// 														removeAll(
// 															item.productId._id,

// 															item.quantity
// 														)
// 													}
// 												>
// 													{/* {item.quantity} */}
// 													<img
// 														className="remove-cart"
// 														src={assets.cart_remove}
// 														alt=""
// 													/>
// 												</p>
// 											</div>
// 											{/* <hr /> */}
// 										</div>
// 									))}
// 							</div>

// 							<CouponFunctions />
// 							{/* <CartCalculation  /> */}
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Cart

// import React, { useContext, useEffect, useState } from "react"
// import "./CSS/cart.css"
// import { ShopContext } from "../context/ShopContext"
// import { assets } from "../assets/assets"
// import { useNavigate } from "react-router"
// import Orderbar from "../components/orderbar/orderbar"
// import { ToastContainer } from "react-toastify"
// import Primaryloader from "../components/loaders/primaryloader"
// import { Link } from "react-router-dom"
// import {
// 	cartItemFetchCart,
// 	cartItemAddToCart,
// 	cartItemRemoveFromCart,
// 	removeAllProductsFromCart,
// 	deleteCartItemRemoveFromCart,
// } from "../utils/productFunction"
// import useCoupon from "../hook/coupanHook"
// import CouponFunctions from "../utils/couponFunctions"
// import { makeApi } from "../api/callApi"
// import CartCalculation from "../components/CartCalculation/cartCalculation"
// import { homeImg } from "../assets/home/home"

// const Cart = () => {
// 	const {
// 		cartItems,
// 		getTotalCartDiscountAmount,
// 		all_product,
// 		getTotalCartAmount,
// 	} = useContext(ShopContext)

// 	const {
// 		couponCode,
// 		setCouponCode,
// 		appliedCoupon,
// 		couponDiscount,
// 		applyCoupon,
// 		removeCoupon,
// 	} = useCoupon()

// 	const totalDiscount = (
// 		getTotalCartAmount() - getTotalCartDiscountAmount()
// 	).toFixed(2)

// 	const navigate = useNavigate()

// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [cartItem, setCartItem] = useState([])
// 	const [cartPoductList, setCartProductList] = useState([])
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [IscartEmpty, setIsCartEmpty] = useState(false)

// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}

// 	useEffect(() => {
// 		fetchShippingAddresses()
// 	}, [])

// 	const fetchCartItem = async () => {
// 		await cartItemFetchCart(
// 			setCartItem,
// 			setCartProductList,
// 			setAllProductLoader,
// 			setIsCartEmpty
// 		)
// 	}

// 	const removeFromCart = async (productId) => {
// 		await cartItemRemoveFromCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const addToCart = async (productId) => {
// 		await cartItemAddToCart(productId, setProductLoaders, fetchCartItem)
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(productId)
// 		} else {
// 			toast.error("Cannot add more than available quantity.")
// 		}
// 	}

// 	// const removeAll = async(productId,quantity)

// 	const removeAll = async (productId, quantity) => {
// 		console.log("Remove all cart", productId, quantity)

// 		await deleteCartItemRemoveFromCart(
// 			productId,
// 			setProductLoaders,
// 			fetchCartItem,
// 			quantity
// 		)
// 	}

// 	useEffect(() => {
// 		fetchCartItem()
// 	}, [])

// 	console.log(cartPoductList);


// 	return (
// 		<>
// 			<ToastContainer />
// 			{AllProductLoader ? (
// 				<div className="All_Product_loader">
// 					<div className="All_Product_loadera">
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div className="cart-container">
// 					{IscartEmpty && (
// 						<div className="empty_cart_div">
// 							<img
// 								src={assets.cart_gif}
// 								alt="No cart "
// 								className="NO_cart_image"
// 							/>
// 							<Link to="/product/all-products">
// 								<p>Your Cart is Empty</p>
// 								<h2>Start Shopping</h2>
// 							</Link>
// 						</div>
// 					)}
// 					{!IscartEmpty && (
// 						<div>
// 							<div className="cart-item">
// 								<div className="cart-items-title cart-items-title2">
// 									<p>Items</p>
// 									<p className="productItemName2">Name</p>
// 									<p>Price</p>
// 									<p className="quantity_heading">Qty</p>
// 									<p className="cartItemTotal">Total:</p>
// 								</div>
// 								<br />
// 								<hr />
// 								{cartPoductList &&
// 									cartPoductList.map((item, index) => (
// 										<div className="all_added_cart_list">


// 											<p
// 												className="cross"
// 												onClick={() =>
// 													removeAll(
// 														item.productId._id,

// 														item.quantity
// 													)
// 												}
// 											>
// 												{/* {item.quantity} */}
// 												<img
// 													className="remove-cart"
// 													src={assets.cart_remove}
// 													alt=""
// 												/>
// 											</p>
// 											<div key={index}>
// 												<div className="cart-items-title cart-items-item">
// 													<div>
// 														<img
// 															src={item?.productId?.thumbnail}
// 															alt=""
// 														/>
// 														<p className="productItemName1">{item.productId?.name}</p>
// 													</div>
// 													<p className="productItemName2">{item.productId?.name}</p>
// 													<p>₹{item.productId?.PriceAfterDiscount}</p>
// 													<div className="cartPageButton">
// 														<img
// 															loading="lazy"
// 															src={assets.add_icon_red}
// 															alt="RemoveIcon"
// 															className="Icon_add_to_cart_main_cart_page cart_increase"
// 															onClick={() => removeFromCart(item.productId._id)}
// 														/>
// 														<p>{item.quantity}</p>
// 														<img
// 															loading="lazy"
// 															src={assets.add_icon_green}
// 															alt="AddIcon"
// 															className="Icon_add_to_cart_main_cart_page"
// 															onClick={() =>
// 																handleAddToCart(
// 																	item.productId._id,
// 																	item.quantity,
// 																	item.productId.quantity
// 																)
// 															}
// 														/>
// 													</div>
// 													<p className="cartItemTotal">₹{item.totalPrice}</p>
// 												</div>
// 												{/* <hr /> */}
// 											</div>
// 										</div>
// 									))}
// 							</div>
// 							<div className='cartcalulaction-comp'>
// 								<CouponFunctions />
// 							</div>
// 							{/* <CartCalculation  /> */}
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Cart



import React, { useEffect, useState } from "react";
import "./CSS/cart.css";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import PrimaryLoader from "../components/loaders/primaryloader";
import { Link } from "react-router-dom";
import { fetchCart,  addToCart, removeFromCart, deleteproductFromCart } from "../utils/productFunction";
import CartCalculation from "../components/CartCalculation/cartCalculation";
import CouponFunctions from "../utils/couponFunctions";

const Cart = () => {
  const navigate = useNavigate();

  // States to manage cart items, loading, and product deletion
  const [cartItems, setCartItems] = useState([]);
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [productLoaders, setProductLoaders] = useState({});
  const [IscartEmpty, setIsCartEmpty] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [completeCart, setCompleteCart] = useState({ orderItems: [] });
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch Cart Items
  const fetchCartItems = async () => {
    setFetchCartLoader(true);
    await fetchCart(setCartItems,setCompleteCart, setFetchCartLoader);
    setFetchCartLoader(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Handle removing a product from cart
  const handleRemoveFromCart = async (productId,selectedSize) => {
    // await removeFromCart(productId, setProductLoaders, fetchCartItems);
	await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, selectedSize);
  };

  // Handle adding a product to cart
  const handleAddToCart = async (productId,selectedSize) => {
    // await addToCart(productId, setProductLoaders, fetchCartItems);
	await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectedSize);

  };

  // Handle deleting all quantities of a product
  const handleDeleteClick = (productId,selectProductSize ,quantity) => {
    setProductToDelete({ productId,selectProductSize, quantity });
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      const { productId, selectProductSize,quantity } = productToDelete;
    //   await deleteproductFromCart(productId, setProductLoaders, fetchCartItems, quantity);
      await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);

      setProductToDelete(null);
      setShowConfirmDialog(false);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmDialog(false);
  };

  return (
    <>
      <ToastContainer />
      {fetchCartLoader ? (
        <div className="All_Product_loader">
          <PrimaryLoader />
        </div>
      ) : IscartEmpty ? (
        <div className="empty_cart_div">
          <img src={assets.cart_gif} alt="Empty Cart" className="NO_cart_image" />
          <Link to="/product/all-products">
            <p>Your Cart is Empty</p>
            <h2>Start Shopping</h2>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-item">
            <div className="cart-items-title cart-items-title2">
              <p>Items</p>
              <p className="productItemName2">Name</p>
              <p>Price</p>
              <p className="quantity_heading">Qty</p>
              <p className="cartItemTotal">Total:</p>
            </div>
            <br />
            <hr />
            {completeCart.orderItems.map((item, index) => (
              <div className="all_added_cart_list" key={index}>
                <p className="cross" onClick={() => handleDeleteClick(item.productId._id, item.size._id ,item.quantity)}>
                  <img className="remove-cart" src={assets.cart_remove} alt="Remove" />
                </p>
                <div>
                  <div className="cart-items-title cart-items-item">
                    <div>
                      <img src={item?.productId?.thumbnail} alt="" />
                      <p className="productItemName1">{item.productId?.name}  </p>
                    </div>
                    <p className="productItemName2">{item.productId?.name} <br /> {`${item.size.size} ${item.size.sizetype}`}</p>
                    {/* <p>₹{item.productId?.PriceAfterDiscount}</p> */}
                    <small>{` ₹${item.size.FinalPrice} x ${item.quantity} `}</small>

                    <div className="cartPageButton">
                      <img
                        src={assets.add_icon_red}
                        alt="RemoveIcon"
                        className="cart_increase"
                        onClick={() => handleRemoveFromCart(item.productId._id, item.size._id )}
                      />
                      <p>{item.quantity}</p>
                      <img
                        src={assets.add_icon_green}
                        alt="AddIcon"
                        className="Icon_add_to_cart_main_cart_page"
                        onClick={() => handleAddToCart(item.productId._id,item.size._id)}
                      />
                    </div>
                    {/* <p className="cartItemTotal">₹{item.totalPrice}</p> */}
                    <p className="cartItemTotal"> ₹{(item.size.FinalPrice * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cartcalulaction-comp">
            <CouponFunctions />
          </div>

          {/* Confirmation Dialog for product deletion */}
          {showConfirmDialog && (
            <div className="confirmation-dialog">
              <div className="dialog-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to remove this item from your cart?</p>
                <div className="dialog-buttons_both">
                  <button onClick={confirmDelete} className="confirm-button">Confirm</button>
                  <button onClick={cancelDelete} className="cancel-button">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
