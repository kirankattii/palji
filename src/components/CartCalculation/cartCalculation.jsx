
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useCoupon from "../../hook/coupanHook";
// import styles from './CartCalculation.module.css';

// function CartCalculation({
// 	tax,
// 	shipping,
// 	CoupanApplied,
// 	total,
// 	Final,
// 	ButtonName,
// 	disabled,
// }) {

// 	const [loadingData, setLoadingData] = useState({
// 		final: false,
// 		discount: false,
// 		shipping: false
// 	});

// 	const formatNumber = (number) => {
// 		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
// 	};

// 	const {
// 		couponCode,
// 		setCouponCode,
// 		appliedCoupon,
// 		couponDiscount,
// 		applyCoupon,
// 		removeCoupon,
// 	} = useCoupon();
// 	const navigate = useNavigate();


// 	useEffect(() => {
// 		// Simulate data fetching
// 		if (Final !== undefined && Final !== null) {
// 			setLoadingData(prev => ({ ...prev, final: false }));
// 		}
// 		if (shipping !== undefined && shipping !== null) {
// 			setLoadingData(prev => ({ ...prev, shipping: false }));
// 		}
// 		// Add similar checks for other values as needed
// 	}, [Final, shipping]);



// 	return (
// 		<div className={styles.orderSummary}>
// 			<h2 className={styles.title}>Order Details</h2>

// 			<div className={styles.details}>
// 				<div className={styles.row}>
// 					<span>Order Amount:</span>
// 					{loadingData.final ? (
// 						<span className={styles.loading}></span>
// 					) : (
// 						<span>{total}</span>
// 					)}
// 				</div>
// 				<div className={styles.row}>
// 					<span>Discount:</span>
// 					<span className={styles.savings}>-₹{total - Final}</span>
// 				</div>

// 				<div className={styles.row}>
// 					<span>Delivery Fee:</span>
// 					{loadingData.shipping ? (
// 						<span className={styles.loading}></span>
// 					) : (
// 						<span>
// 							{shipping === 0 ? (
// 								<>Free</>
// 							) : (
// 								formatNumber(shipping)
// 							)}
// 						</span>
// 					)}
// 				</div>
// 			</div>

// 			<div className={styles.total}>
// 				<span>Order Total:</span>
// 				{loadingData.final ? (
// 					<span className={styles.loading}></span>
// 				) : (
// 					<span>₹{Final}</span>
// 				)}
// 			</div>

// 			<div className={styles.actions}>
// 				<button
// 					className={styles.signUp}
// 					disabled={disabled}
// 					style={{ opacity: disabled ? 0.5 : 1 }}
// 					onClick={() => navigate("/cart/checkout/")}
// 				>
// 					{ButtonName}
// 				</button>
// 			</div>
// 		</div>

// 	);
// }

// export default CartCalculation;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCoupon from "../../hook/coupanHook";
import styles from './CartCalculation.module.css';

function CartCalculation({
	tax,
	shipping,
	CoupanApplied,
	total,
	Final,
	ButtonName,
	disabled,
}) {
	const [loadingData, setLoadingData] = useState({
		final: false,
		discount: false,
		shipping: false,
	});

	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
	};

	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon();
	const navigate = useNavigate();

	useEffect(() => {
		// Simulate data fetching
		if (Final !== undefined && Final !== null) {
			setLoadingData(prev => ({ ...prev, final: false }));
		}
		if (shipping !== undefined && shipping !== null) {
			setLoadingData(prev => ({ ...prev, shipping: false }));
		}
	}, [Final, shipping]);

	const roundedDiscount = Math.round(total - Final);
	const roundedFinal = Math.round(Final);

	return (

		<div className={styles.orderSummary}>
			<h2 className={styles.title}>Order Details</h2>

			<div className={styles.details}>
				<div className={styles.row}>
					<span>Order Amount:</span>
					{loadingData.final ? (
						<span className={styles.loading}></span>
					) : (
						<span>{formatNumber(total)}</span>
					)}
				</div>
				<div className={styles.row}>
					<span>Discount:</span>
					<span className={styles.savings}>₹{roundedDiscount}</span>
				</div>

				<div className={styles.row}>
					<span>Delivery Fee:</span>
					{loadingData.shipping ? (
						<span className={styles.loading}></span>
					) : (
						<span>
							{shipping === 0 ? (
								<>Free</>
							) : (
								formatNumber(shipping)
							)}
						</span>
					)}
				</div>
			</div>

			<div className={styles.total}>
				<span>Order Total:</span>
				{loadingData.final ? (
					<span className={styles.loading}></span>
				) : (
					<span>₹{roundedFinal}</span>
				)}
			</div>

			<div className={styles.actions}>
				<button
					className={styles.signUp}
					disabled={disabled}
					style={{ opacity: disabled ? 0.5 : 1 }}
					onClick={() => navigate("/cart/checkout/")}
				>
					{ButtonName}
				</button>
			</div>
		</div>
	);
}

export default CartCalculation;
