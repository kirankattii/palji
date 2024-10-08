import React, { useContext, useEffect, useState } from "react"
// import { makeApi } from "../api/callApi"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router"
import Orderbar from "../components/orderbar/orderbar"
import { ToastContainer } from "react-toastify"
import Primaryloader from "../components/loaders/primaryloader"
import { fetchCart } from "../utils/productFunction";

// import {
// 	cartItemFetchCart,
// 	cartItemAddToCart,
// 	cartItemRemoveFromCart,
// 	removeAllProductsFromCart,
// } from "../utils/productFunction"
import useCoupon from "../hook/coupanHook"
import { ShopContext } from "../context/ShopContext"
import { makeApi } from "../api/callApi"
import CartCalculation from "../components/CartCalculation/cartCalculation"

const CouponFunctions = () => {
	const {
		// cartItems,
		getTotalCartDiscountAmount,
		all_product,
		getTotalCartAmount,
	} = useContext(ShopContext)

	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon()

	const totalDiscount = (
		getTotalCartAmount() - getTotalCartDiscountAmount()
	).toFixed(2)

	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [cartItem, setCartItem] = useState([])

	const [cartItems, setCartItems] = useState([]);
	const [completeCart, setCompleteCart] = useState([]);

	const [fetchCartLoader, setFetchCartLoader] = useState(false);




	const fetchCartItem = async () => {
		// await cartItemFetchCart(
		// 	setCartItem,
		// 	setCartProductList,
		// 	setAllProductLoader,
		// 	setIsCartEmpty
		// )
		await fetchCart(setCartItems,setCompleteCart,setFetchCartLoader);

	}
console.log("completeCart",completeCart)


	useEffect(() => {
		fetchCartItem()
	}, [])
	return (
		<div>
			<div className="cart-bottomm">
				<div className="cart-address">
					<div className="cart-shipping-address"></div>
				</div>

				<div className="cart-billing">
					<CartCalculation
						tax={0}
						shipping={0}
						CoupanApplied={appliedCoupon ? couponDiscount : completeCart?.totalPriceWithoutDiscount}
						Final={completeCart?.totalPrice}
						total={completeCart?.totalPriceWithoutDiscount}
						// total={100}
						ButtonName="PROCEED TO CHECKOUT"
						disabled={false}
					/>
				</div>
			</div>
		</div>
	)
}

export default CouponFunctions
