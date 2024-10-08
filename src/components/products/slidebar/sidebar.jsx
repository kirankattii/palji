
// import React, { useEffect, useState } from "react"
// import "../../../pages/CSS/product/sidebar.css"
// import Allproduct from "../allproduct"

// import { useNavigate } from "react-router-dom"
// import { makeApi } from "../../../api/callApi"
// import { IoSearch } from "react-icons/io5"
// import FilterDropdown from "./FilterPopup"
// import { RiArrowDropDownLine } from "react-icons/ri"

// const ProductSidebar = () => {
// 	const history = useNavigate()

// 	const [minPrice, setMinPrice] = useState(0)
// 	const [maxPrice, setMaxPrice] = useState(5000)
// 	const [categories, setCategories] = useState([])
// 	const [search, setSearch] = useState("")
// 	const [category, setCategory] = useState("")
// 	const [showDropdown, setShowDropdown] = useState(false)

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET")
// 				if (response.status === 200) {
// 					setCategories(response.data.categories)
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error)
// 			}
// 		}
// 		fetchCategories()
// 	}, [])

// 	const handleApplyFilter = (filterData) => {
// 		setMinPrice(Number(filterData.minPrice))
// 		setMaxPrice(Number(filterData.maxPrice))
// 		setCategory(filterData.selectedCategory)
// 	}

// 	const handleLogout = () => {
// 		localStorage.removeItem("token")
// 		history("/auth/login")
// 	}

// 	const handleMinPriceChange = (e) => {
// 		const value = Number(e.target.value)
// 		if (value <= maxPrice) {
// 			setMinPrice(value)
// 		}
// 	}

// 	const handleMaxPriceChange = (e) => {
// 		const value = Number(e.target.value)
// 		if (value >= minPrice) {
// 			setMaxPrice(value)
// 		}
// 	}

// 	return (
// 		<>
// 			<div className="main_product_sidebar_top_parent_div">
// 				<div className="main_product_sidebar_div">
// 					{/* search */}
// 					<div className="product_sliderbar_options">
// 						<div className="proudct_sidebar_heading product-heading1">
// 							Product Search:
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								placeholder="Search"
// 								value={search}
// 								onChange={(e) => setSearch(e.target.value)}
// 								className="input_for_search_sidebar"
// 							/>
// 						</div>
// 					</div>
// 					{/* product category */}
// 					<div className="product_sliderbar_options a_product_sliderbar_options">
// 						<div className="proudct_sidebar_heading"> Product Category:</div>
// 						{/* drop down */}
// 						<div>
// 							<select
// 								name="category"
// 								id="category"
// 								value={category}
// 								onChange={(e) => setCategory(e.target.value)}
// 								className="input_for_category_sidebar a_input_for_category_sidebar "
// 							>
// 								<option
// 									value=""
// 									disabled={true}
// 								>
// 									Select Category
// 								</option>
// 								<option value="">All</option>
// 								{categories.map((category) => (
// 									<option
// 										key={category._id}
// 										value={category._id}
// 										className="sidebar_options"
// 									>
// 										{category.name}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>
// 					{/* filter by price */}
// 					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
// 						<div className="proudct_sidebar_heading">Filter By Price:</div>
// 						<div className="main_price_range_product_sidebar">
// 							<div>
// 								<span>Min Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={minPrice}
// 									className="input-ranges input_for_min_price"
// 									onChange={handleMinPriceChange}
// 								/>
// 								<div>₹{minPrice}</div>
// 							</div>
// 							<div className="SidebarMAXPRICE">
// 								<span>Max Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={maxPrice}
// 									className="input-ranges input_for_max_price"
// 									onChange={handleMaxPriceChange}
// 								/>
// 								<div className="text-end">₹{maxPrice}</div>
// 							</div>
// 						</div>
// 					</div>
// 					{/* more */}
// 					<div className="product_sliderbar_options more_icon_sidebar">
// 						<div className="proudct_sidebar_heading"> More:</div>
// 						{/* drop down */}
// 						<div
// 							className="more_icon_sidebar_div"
// 							onClick={() => setShowDropdown(!showDropdown)}
// 							style={{ cursor: "pointer" }}
// 						>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								width="20"
// 								height="20"
// 								fill="currentColor"
// 								className="bi bi-three-dots-vertical"
// 								viewBox="0 0 16 16"
// 							>
// 								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
// 							</svg>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="media_product_sidebar">
// 					<div className="media_all_product_search">
// 						<input
// 							type="text"
// 							placeholder="Search"
// 							value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 						/>
// 						<div>
// 							<IoSearch />
// 						</div>
// 					</div>
// 					<div
// 						className="media_filter"
// 						onClick={() => setShowDropdown(!showDropdown)}
// 					>
// 						Filter{" "}
// 						<span>
// 							<RiArrowDropDownLine />
// 						</span>
// 					</div>
// 				</div>
// 				<hr className="line_btn_sidebar_products" />
// 				<div
// 					className="w-100"
// 					style={{ zIndex: 1 }}
// 				>
// 					<Allproduct
// 						search={search}
// 						category={category}
// 						minPrice={minPrice}
// 						maxPrice={maxPrice}
// 					/>
// 				</div>
// 			</div>
// 			<FilterDropdown
// 				show={showDropdown}
// 				onClose={() => setShowDropdown(false)}
// 				onApply={handleApplyFilter}
// 			/>
// 		</>
// 	)
// }

// export default ProductSidebar





// import React, { useEffect, useState } from "react"
// import "../../../pages/CSS/product/sidebar.css"
// import Allproduct from "../allproduct"
// import styles from "../../../pages/CSS/product/sidebar.module.css"
// import { useNavigate } from "react-router-dom"
// import { makeApi } from "../../../api/callApi"
// import { IoSearch } from "react-icons/io5"
// import FilterDropdown from "./FilterPopup"
// import { RiArrowDropDownLine } from "react-icons/ri"

// const ProductSidebar = () => {
// 	const history = useNavigate()

// 	const [minPrice, setMinPrice] = useState(0)
// 	const [maxPrice, setMaxPrice] = useState(5000)
// 	const [categories, setCategories] = useState([])
// 	const [search, setSearch] = useState("")
// 	const [category, setCategory] = useState("")
// 	const [selectedCategory, setSelectedCategory] = useState('');

// 	const [showDropdown, setShowDropdown] = useState(false)

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET")
// 				if (response.status === 200) {
// 					setCategories(response.data.categories)
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error)
// 			}
// 		}
// 		fetchCategories()
// 	}, [])



// 	const handleApplyFilter = (filterData) => {
// 		setMinPrice(Number(filterData.minPrice))
// 		setMaxPrice(Number(filterData.maxPrice))
// 		setCategory(filterData.selectedCategory)
// 	}

// 	const handleLogout = () => {
// 		localStorage.removeItem("token")
// 		history("/auth/login")
// 	}

// 	const handleMinPriceChange = (e) => {
// 		const value = Number(e.target.value)
// 		if (value <= maxPrice) {
// 			setMinPrice(value)
// 		}
// 	}

// 	const handleMaxPriceChange = (e) => {
// 		const value = Number(e.target.value)
// 		if (value >= minPrice) {
// 			setMaxPrice(value)
// 		}
// 	}

// 	return (
// 		<>
// 			<div className="main_product_sidebar_top_parent_div">
// 				<div className="main_product_sidebar_div">
// 					{/* search */}
// 					<div className="product_sliderbar_options">
// 						<div className="proudct_sidebar_heading product-heading1">
// 							Product Search:
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								placeholder="Search"
// 								value={search}
// 								onChange={(e) => setSearch(e.target.value)}
// 								className="input_for_search_sidebar"
// 							/>
// 						</div>
// 					</div>
// 					{/* product category */}
// 					<div className="product_sliderbar_options a_product_sliderbar_options">
// 						<div className="proudct_sidebar_heading"> Product Category:</div>
// 						{/* drop down */}



// 						<div className={styles.categories}>
// 							{/* <h2>Product Categories</h2> */}
// 							<div>
// 								{categories.map((category) => (
// 									<p
// 										key={category.id}
// 										onClick={() => handleCategoryChange(category.name)}
// 										className={selectedCategory === category.name ? styles.active : ''}
// 										value={category._id}
// 										onChange={(e) => setCategory(e.target.value)}
// 									>
// 										{category.name}
// 									</p>
// 								))}
// 							</div>
// 						</div>

// 					</div>
// 					{/* filter by price */}
// 					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
// 						<div className="proudct_sidebar_heading">Filter By Price:</div>
// 						<div className="main_price_range_product_sidebar">
// 							<div>
// 								<span>Min Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={minPrice}
// 									className="input-ranges input_for_min_price"
// 									onChange={handleMinPriceChange}
// 								/>
// 								<div>₹{minPrice}</div>
// 							</div>
// 							<div className="SidebarMAXPRICE">
// 								<span>Max Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={maxPrice}
// 									className="input-ranges input_for_max_price"
// 									onChange={handleMaxPriceChange}
// 								/>
// 								<div className="text-end">₹{maxPrice}</div>
// 							</div>
// 						</div>
// 					</div>
// 					{/* more */}
// 					<div className="product_sliderbar_options more_icon_sidebar">
// 						<div className="proudct_sidebar_heading"> More:</div>
// 						{/* drop down */}
// 						<div
// 							className="more_icon_sidebar_div"
// 							onClick={() => setShowDropdown(!showDropdown)}
// 							style={{ cursor: "pointer" }}
// 						>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								width="20"
// 								height="20"
// 								fill="currentColor"
// 								className="bi bi-three-dots-vertical"
// 								viewBox="0 0 16 16"
// 							>
// 								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
// 							</svg>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="media_product_sidebar">
// 					<div className="media_all_product_search">
// 						<input
// 							type="text"
// 							placeholder="Search"
// 							value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 						/>
// 						<div>
// 							<IoSearch />
// 						</div>
// 					</div>
// 					<div
// 						className="media_filter"
// 						onClick={() => setShowDropdown(!showDropdown)}
// 					>
// 						Filter{" "}
// 						<span>
// 							<RiArrowDropDownLine />
// 						</span>
// 					</div>
// 				</div>
// 				<hr className="line_btn_sidebar_products" />
// 				<div
// 					className="w-100"
// 					style={{ zIndex: 1 }}
// 				>
// 					<Allproduct
// 						search={search}
// 						category={category}
// 						minPrice={minPrice}
// 						maxPrice={maxPrice}
// 					/>
// 				</div>
// 			</div>
// 			<FilterDropdown
// 				show={showDropdown}
// 				onClose={() => setShowDropdown(false)}
// 				onApply={handleApplyFilter}
// 			/>
// 		</>
// 	)
// }

// export default ProductSidebar





// import React, { useEffect, useState } from "react";
// import "../../../pages/CSS/product/sidebar.css";
// import Allproduct from "../allproduct";
// import styles from "../../../pages/CSS/product/sidebar.module.css";
// import { useNavigate } from "react-router-dom";
// import { makeApi } from "../../../api/callApi";
// import { IoSearch } from "react-icons/io5";
// import FilterDropdown from "./FilterPopup";
// import { RiArrowDropDownLine } from "react-icons/ri";

// const ProductSidebar = () => {
// 	const history = useNavigate();

// 	const [minPrice, setMinPrice] = useState(0);
// 	const [maxPrice, setMaxPrice] = useState(5000);
// 	const [categories, setCategories] = useState([]);
// 	const [search, setSearch] = useState("");
// 	const [selectedCategory, setSelectedCategory] = useState(""); // Use only one state for category selection

// 	const [showDropdown, setShowDropdown] = useState(false);

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET");
// 				if (response.status === 200) {
// 					setCategories(response.data.categories);
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error);
// 			}
// 		}
// 		fetchCategories();
// 	}, []);

// 	const handleApplyFilter = (filterData) => {
// 		setMinPrice(Number(filterData.minPrice));
// 		setMaxPrice(Number(filterData.maxPrice));
// 		setSelectedCategory(filterData.selectedCategory);
// 	};

// 	const handleCategoryChange = (categoryId) => {
// 		setSelectedCategory(categoryId);
// 	};

// 	const handleLogout = () => {
// 		localStorage.removeItem("token");
// 		history("/auth/login");
// 	};

// 	const handleMinPriceChange = (e) => {
// 		const value = Number(e.target.value);
// 		if (value <= maxPrice) {
// 			setMinPrice(value);
// 		}
// 	};

// 	const handleMaxPriceChange = (e) => {
// 		const value = Number(e.target.value);
// 		if (value >= minPrice) {
// 			setMaxPrice(value);
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="main_product_sidebar_top_parent_div">
// 				<div className="main_product_sidebar_div">
// 					{/* search */}
// 					<div className="product_sliderbar_options">
// 						<div className="proudct_sidebar_heading product-heading1">
// 							Product Search:
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								placeholder="Search"
// 								value={search}
// 								onChange={(e) => setSearch(e.target.value)}
// 								className="input_for_search_sidebar"
// 							/>
// 						</div>
// 					</div>
// 					{/* product category */}
// 					<div className="product_sliderbar_options a_product_sliderbar_options">
// 						<div className="proudct_sidebar_heading"> Product Category:</div>
// 						{/* drop down */}

// 						<div className={styles.categories}>
// 							<div>
// 								{categories.map((category) => (
// 									<p
// 										key={category._id} // Use _id as key
// 										onClick={() => handleCategoryChange(category._id)} // Use _id for filtering
// 										className={selectedCategory === category._id ? styles.active : ""} // Use _id for comparison
// 									>
// 										{category.name}
// 									</p>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 					{/* filter by price */}
// 					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
// 						<div className="proudct_sidebar_heading">Filter By Price:</div>
// 						<div className="main_price_range_product_sidebar">
// 							<div>
// 								<span>Min Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={minPrice}
// 									className="input-ranges input_for_min_price"
// 									onChange={handleMinPriceChange}
// 								/>
// 								<div>₹{minPrice}</div>
// 							</div>
// 							<div className="SidebarMAXPRICE">
// 								<span>Max Price</span>
// 								<input
// 									type="range"
// 									min={0}
// 									max={1000}
// 									value={maxPrice}
// 									className="input-ranges input_for_max_price"
// 									onChange={handleMaxPriceChange}
// 								/>
// 								<div className="text-end">₹{maxPrice}</div>
// 							</div>
// 						</div>
// 					</div>
// 					{/* more */}
// 					<div className="product_sliderbar_options more_icon_sidebar">
// 						<div className="proudct_sidebar_heading"> More:</div>
// 						{/* drop down */}
// 						<div
// 							className="more_icon_sidebar_div"
// 							onClick={() => setShowDropdown(!showDropdown)}
// 							style={{ cursor: "pointer" }}
// 						>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								width="20"
// 								height="20"
// 								fill="currentColor"
// 								className="bi bi-three-dots-vertical"
// 								viewBox="0 0 16 16"
// 							>
// 								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
// 							</svg>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="media_product_sidebar">
// 					<div className="media_all_product_search">
// 						<input
// 							type="text"
// 							placeholder="Search"
// 							value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 						/>
// 						<div>
// 							<IoSearch />
// 						</div>
// 					</div>
// 					<div className="media_filter" onClick={() => setShowDropdown(!showDropdown)}>
// 						Filter{" "}
// 						<span>
// 							<RiArrowDropDownLine />
// 						</span>
// 					</div>
// 				</div>
// 				<hr className="line_btn_sidebar_products" />
// 				<div className="w-100" style={{ zIndex: 1 }}>
// 					<Allproduct
// 						search={search}
// 						category={selectedCategory} // Send selectedCategory to Allproduct
// 						minPrice={minPrice}
// 						maxPrice={maxPrice}
// 					/>
// 				</div>
// 			</div>
// 			<FilterDropdown
// 				show={showDropdown}
// 				onClose={() => setShowDropdown(false)}
// 				onApply={handleApplyFilter}
// 			/>
// 		</>
// 	);
// };

// export default ProductSidebar;












// import React, { useEffect, useState } from "react";
// import "../../../pages/CSS/product/sidebar.css";
// import Allproduct from "../allproduct";
// import styles from "../../../pages/CSS/product/sidebar.module.css";
// import { useNavigate } from "react-router-dom";
// import { makeApi } from "../../../api/callApi";
// import { IoSearch } from "react-icons/io5";
// import FilterDropdown from "./FilterPopup";
// import { RiArrowDropDownLine } from "react-icons/ri";

// const ProductSidebar = () => {
// 	const history = useNavigate();

// 	const [categories, setCategories] = useState([]);
// 	const [search, setSearch] = useState("");
// 	const [selectedCategory, setSelectedCategory] = useState("");
// 	const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 499 });

// 	const [showDropdown, setShowDropdown] = useState(false);

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET");
// 				if (response.status === 200) {
// 					setCategories(response.data.categories);
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error);
// 			}
// 		}
// 		fetchCategories();
// 	}, []);

// 	const handleCategoryChange = (categoryId) => {
// 		setSelectedCategory(categoryId);
// 	};

// 	const handlePriceRangeChange = (min, max) => {
// 		setSelectedPriceRange({ min, max });
// 	};

// 	const priceRanges = [
// 		{ label: "₹0 to ₹499", min: 0, max: 499 },
// 		{ label: "₹500 to ₹999", min: 500, max: 999 },
// 		{ label: "₹1000 to ₹1499", min: 1000, max: 1499 },
// 		{ label: "₹1500 to ₹1999", min: 1500, max: 1999 },
// 		{ label: "₹2000 to ₹2499", min: 2000, max: 2499 },
// 		{ label: "₹2500 to ₹2999", min: 2500, max: 2999 },
// 		{ label: "₹3000 and ABOVE", min: 3000, max: 1000000 }, // Large max value for "and above"
// 	];

// 	return (
// 		<>
// 			<div className="main_product_sidebar_top_parent_div">
// 				<div className="main_product_sidebar_div">
// 					{/* search */}
// 					<div className="product_sliderbar_options">
// 						<div className="proudct_sidebar_heading product-heading1">
// 							Product Search:
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								placeholder="Search"
// 								value={search}
// 								onChange={(e) => setSearch(e.target.value)}
// 								className="input_for_search_sidebar"
// 							/>
// 						</div>
// 					</div>
// 					{/* product category */}
// 					<div className="product_sliderbar_options a_product_sliderbar_options">
// 						<div className="proudct_sidebar_heading"> Product Category:</div>
// 						{/* drop down */}
// 						<div className={styles.categories}>
// 							<div>
// 								{categories.map((category) => (
// 									<p
// 										key={category._id} // Use _id as key
// 										onClick={() => handleCategoryChange(category._id)} // Use _id for filtering
// 										className={selectedCategory === category._id ? styles.active : ""} // Use _id for comparison
// 									>
// 										{category.name}
// 									</p>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 					{/* filter by price */}
// 					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
// 						<div className="proudct_sidebar_heading">Filter By Price:</div>
// 						<div className="price-filter-options">
// 							{priceRanges.map((range, index) => (
// 								<div key={index} className="price-filter-option">
// 									<input
// 										type="radio"
// 										id={`price-${index}`}
// 										name="price-range"
// 										checked={
// 											selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
// 										}
// 										onChange={() => handlePriceRangeChange(range.min, range.max)}
// 									/>
// 									<label htmlFor={`price-${index}`}>{range.label}</label>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 					{/* more */}
// 					<div className="product_sliderbar_options more_icon_sidebar">
// 						<div className="proudct_sidebar_heading"> More:</div>
// 						{/* drop down */}
// 						<div
// 							className="more_icon_sidebar_div"
// 							onClick={() => setShowDropdown(!showDropdown)}
// 							style={{ cursor: "pointer" }}
// 						>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								width="20"
// 								height="20"
// 								fill="currentColor"
// 								className="bi bi-three-dots-vertical"
// 								viewBox="0 0 16 16"
// 							>
// 								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
// 							</svg>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="media_product_sidebar">
// 					<div className="media_all_product_search">
// 						<input
// 							type="text"
// 							placeholder="Search"
// 							value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 						/>
// 						<div>
// 							<IoSearch />
// 						</div>
// 					</div>
// 					<div className="media_filter" onClick={() => setShowDropdown(!showDropdown)}>
// 						Filter{" "}
// 						<span>
// 							<RiArrowDropDownLine />
// 						</span>
// 					</div>
// 				</div>
// 				<hr className="line_btn_sidebar_products" />
// 				<div className="w-100" style={{ zIndex: 1 }}>
// 					<Allproduct
// 						search={search}
// 						category={selectedCategory}
// 						minPrice={selectedPriceRange.min} // Use selected price range
// 						maxPrice={selectedPriceRange.max} // Use selected price range
// 					/>
// 				</div>
// 			</div>
// 			<FilterDropdown
// 				show={showDropdown}
// 				onClose={() => setShowDropdown(false)}
// 				onApply={handlePriceRangeChange}
// 			/>
// 		</>
// 	);
// };

// export default ProductSidebar;




{/* <div className="price-filter-options">
							<div className="price-filter-option">
								<input
									type="radio"
									id="no-filter"
									name="price-range"
									checked={selectedPriceRange.min === 0 && selectedPriceRange.max === 1000000}
									onChange={handleResetPriceFilter}
								/>
								<label htmlFor="no-filter">No Filter</label>
							</div>
							{priceRanges.map((range, index) => (
								<div key={index} className="price-filter-option">
									<input
										type="radio"
										id={`price-${index}`}
										name="price-range"
										checked={
											selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
										}
										onChange={() => handlePriceRangeChange(range.min, range.max)}
									/>
									<label htmlFor={`price-${index}`}>{range.label}</label>
								</div>
							))}
						</div> */}


// import React, { useEffect, useState } from "react";
// import "../../../pages/CSS/product/sidebar.css";
// import Allproduct from "../allproduct";
// import styles from "../../../pages/CSS/product/sidebar.module.css";
// import { useNavigate } from "react-router-dom";
// import { makeApi } from "../../../api/callApi";
// import { IoSearch } from "react-icons/io5";
// import FilterDropdown from "./FilterPopup";
// import { RiArrowDropDownLine } from "react-icons/ri";

// const ProductSidebar = () => {
// 	const history = useNavigate();

// 	const [categories, setCategories] = useState([]);
// 	const [search, setSearch] = useState("");
// 	const [selectedCategory, setSelectedCategory] = useState("");
// 	const [categoryName, setCategoryName] = useState("")
// 	const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 1000000 }); // No filter by default

// 	const [showDropdown, setShowDropdown] = useState(false);

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET");
// 				if (response.status === 200) {
// 					setCategories(response.data.categories);
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error);
// 			}
// 		}
// 		fetchCategories();
// 	}, []);

// 	const handleCategoryChange = (categoryId, name) => {
// 		setSelectedCategory(categoryId);
// 		setCategoryName(name)
// 	};

// 	const handlePriceRangeChange = (min, max) => {
// 		setSelectedPriceRange({ min, max });
// 	};

// 	const handleResetPriceFilter = () => {
// 		setSelectedPriceRange({ min: 0, max: 1000000 });
// 	};

// 	const priceRanges = [
// 		{ label: "₹0 to ₹499", min: 0, max: 499 },
// 		{ label: "₹500 to ₹999", min: 500, max: 999 },
// 		{ label: "₹1000 to ₹1499", min: 1000, max: 1499 },
// 		{ label: "₹1500 to ₹1999", min: 1500, max: 1999 },
// 		{ label: "₹2000 to ₹2499", min: 2000, max: 2499 },
// 		{ label: "₹2500 to ₹2999", min: 2500, max: 2999 },
// 		{ label: "₹3000 and ABOVE", min: 3000, max: 1000000 }, // Large max value for "and above"
// 	];

// 	return (
// 		<>
// 			<div className="main_product_sidebar_top_parent_div">
// 				<div className="main_product_sidebar_div">
// 					{/* search */}
// 					<div className="product_sliderbar_options">
// 						<div className="proudct_sidebar_heading product-heading1">
// 							Product Search:
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								placeholder="Search"
// 								value={search}
// 								onChange={(e) => setSearch(e.target.value)}
// 								className="input_for_search_sidebar"
// 							/>
// 						</div>
// 					</div>
// 					{/* product category */}
// 					<div className="product_sliderbar_options a_product_sliderbar_options">
// 						<div className="proudct_sidebar_heading"> Product Category:</div>
// 						{/* drop down */}
// 						<div className={styles.categories}>
// 							<div>
// 								<p
// 									onClick={() => handleCategoryChange("")} // Empty string for "All Categories"
// 									className={selectedCategory === "" ? styles.active : ""}
// 								>
// 									All
// 								</p>
// 								{categories.map((category) => (
// 									<p
// 										key={category._id} // Use _id as key
// 										onClick={() => handleCategoryChange(category._id, category.name)} // Use _id for filtering
// 										className={selectedCategory === category._id ? styles.activeCategory : ""}
// 									>
// 										{category.name}
// 									</p>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 					{/* filter by price */}
// 					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
// 						<div className="proudct_sidebar_heading">Filter By Price:</div>

// 						<div className={styles.priceFilterOptions}>
// 							<div className={styles.priceFilterOption}>
// 								<input
// 									type="radio"
// 									id="no-filter"
// 									name="price-range"
// 									checked={selectedPriceRange.min === 0 && selectedPriceRange.max === 1000000}
// 									onChange={handleResetPriceFilter}
// 								/>
// 								<label htmlFor="no-filter">No Filter</label>
// 							</div>
// 							{priceRanges.map((range, index) => (
// 								<div key={index} className={styles.priceFilterOption}>
// 									<input
// 										type="radio"
// 										id={`price-${index}`}
// 										name="price-range"
// 										checked={
// 											selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
// 										}
// 										onChange={() => handlePriceRangeChange(range.min, range.max)}
// 									/>
// 									<label htmlFor={`price-${index}`}>{range.label}</label>
// 								</div>
// 							))}
// 						</div>

// 					</div>
// 					{/* more */}
// 					<div className="product_sliderbar_options more_icon_sidebar">
// 						<div className="proudct_sidebar_heading"> More:</div>
// 						{/* drop down */}
// 						<div
// 							className="more_icon_sidebar_div"
// 							onClick={() => setShowDropdown(!showDropdown)}
// 							style={{ cursor: "pointer" }}
// 						>
// 							<svg
// 								xmlns="http://www.w3.org/2000/svg"
// 								width="20"
// 								height="20"
// 								fill="currentColor"
// 								className="bi bi-three-dots-vertical"
// 								viewBox="0 0 16 16"
// 							>
// 								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
// 							</svg>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="media_product_sidebar">
// 					<div className="media_all_product_search">
// 						<input
// 							type="text"
// 							placeholder="Search"
// 							value={search}
// 							onChange={(e) => setSearch(e.target.value)}
// 						/>
// 						<div>
// 							<IoSearch />
// 						</div>
// 					</div>
// 					<div className="media_filter" onClick={() => setShowDropdown(!showDropdown)}>
// 						Filter{" "}
// 						<span>
// 							<RiArrowDropDownLine />
// 						</span>
// 					</div>
// 				</div>
// 				<hr className="line_btn_sidebar_products" />
// 				<div className={styles.allproducts} style={{ zIndex: 1 }}>
// 					<Allproduct
// 						search={search}
// 						category={selectedCategory}
// 						minPrice={selectedPriceRange.min} // Use selected price range
// 						maxPrice={selectedPriceRange.max} // Use selected price range
// 						categoryName={categoryName}
// 					/>
// 				</div>
// 			</div>
// 			<FilterDropdown
// 				show={showDropdown}
// 				onClose={() => setShowDropdown(false)}
// 				onApply={handlePriceRangeChange}
// 			/>
// 		</>
// 	);
// };

// export default ProductSidebar;




import React, { useEffect, useState } from "react";
import "../../../pages/CSS/product/sidebar.css";
import Allproduct from "../allproduct";
import styles from "../../../pages/CSS/product/sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { makeApi } from "../../../api/callApi";
import { IoSearch } from "react-icons/io5";
import FilterDropdown from "./FilterPopup";
import { RiArrowDropDownLine } from "react-icons/ri";

const ProductSidebar = () => {
	const history = useNavigate();

	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [categoryName, setCategoryName] = useState("");
	const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 1000000 }); // No filter by default

	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await makeApi("/api/get-all-categories", "GET");
				if (response.status === 200) {
					setCategories(response.data.categories);
				}
			} catch (error) {
				console.log("Error fetching categories:", error);
			}
		}
		fetchCategories();
	}, []);

	const handleCategoryChange = (categoryId, name) => {
		setSelectedCategory(categoryId);
		setCategoryName(name);
	};

	const handleFilterApply = (categoryId, minPrice, maxPrice) => {
		setSelectedCategory(categoryId);
		setSelectedPriceRange({ min: minPrice, max: maxPrice });
	};

	const handleResetPriceFilter = () => {
		setSelectedPriceRange({ min: 0, max: 1000000 });
	};

	const priceRanges = [
		{ label: "₹0 to ₹499", min: 0, max: 499 },
		{ label: "₹500 to ₹999", min: 500, max: 999 },
		{ label: "₹1000 to ₹1499", min: 1000, max: 1499 },
		{ label: "₹1500 to ₹1999", min: 1500, max: 1999 },
		{ label: "₹2000 to ₹2499", min: 2000, max: 2499 },
		{ label: "₹2500 to ₹2999", min: 2500, max: 2999 },
		{ label: "₹3000 and ABOVE", min: 3000, max: 1000000 }, // Large max value for "and above"
	];

	return (
		<>
			<div className="main_product_sidebar_top_parent_div">
				<div className="main_product_sidebar_div">
					{/* search */}
					<div className="product_sliderbar_options">
						<div className="proudct_sidebar_heading product-heading1">
							Product Search:
						</div>
						<div>
							<input
								type="text"
								placeholder="Search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="input_for_search_sidebar"
							/>
						</div>
					</div>
					{/* product category */}
					<div className="product_sliderbar_options a_product_sliderbar_options">
						<div className="proudct_sidebar_heading"> Product Category:</div>
						{/* drop down */}
						<div className={styles.categories}>
							<div>
								<p
									onClick={() => handleCategoryChange("", "")} // Empty string for "All Categories"
									className={selectedCategory === "" ? styles.active : ""}
								>
									All
								</p>
								{categories.map((category) => (
									<p
										key={category._id} // Use _id as key
										onClick={() => handleCategoryChange(category._id, category.name)} // Use _id for filtering
										className={selectedCategory === category._id ? styles.activeCategory : ""}
									>
										{category.name}
									</p>
								))}
							</div>
						</div>
					</div>
					{/* filter by price */}
					<div className="product_sliderbar_options price_filter_sidebar_pc_sidebar">
						<div className="proudct_sidebar_heading">Filter By Price:</div>

						<div className={styles.priceFilterOptions}>
							<div className={styles.priceFilterOption}>
								<input
									type="radio"
									id="no-filter"
									name="price-range"
									checked={selectedPriceRange.min === 0 && selectedPriceRange.max === 1000000}
									onChange={handleResetPriceFilter}
								/>
								<label htmlFor="no-filter">No Filter</label>
							</div>
							{priceRanges.map((range, index) => (
								<div key={index} className={styles.priceFilterOption}>
									<input
										type="radio"
										id={`price-${index}`}
										name="price-range"
										checked={
											selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
										}
										onChange={() => handleFilterApply(selectedCategory, range.min, range.max)}
									/>
									<label htmlFor={`price-${index}`}>{range.label}</label>
								</div>
							))}
						</div>

					</div>
					{/* more */}
					<div className="product_sliderbar_options more_icon_sidebar">
						<div className="proudct_sidebar_heading"> More:</div>
						{/* drop down */}
						<div
							className="more_icon_sidebar_div"
							onClick={() => setShowDropdown(!showDropdown)}
							style={{ cursor: "pointer" }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								className="bi bi-three-dots-vertical"
								viewBox="0 0 16 16"
							>
								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
							</svg>
						</div>
					</div>
				</div>
				<div className="media_product_sidebar">
					<div className="media_all_product_search">
						<input
							type="text"
							placeholder="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div>
							<IoSearch />
						</div>
					</div>
					<div className="media_filter" onClick={() => setShowDropdown(!showDropdown)}>
						Filter{" "}
						<span>
							<RiArrowDropDownLine />
						</span>
					</div>
				</div>
				<hr className="line_btn_sidebar_products" />
				<div className={styles.allproducts} style={{ zIndex: 1 }}>
					<Allproduct
						search={search}
						category={selectedCategory}
						minPrice={selectedPriceRange.min} // Use selected price range
						maxPrice={selectedPriceRange.max} // Use selected price range
						categoryName={categoryName}
					/>
				</div>
			</div>
			{/* Pass handleFilterApply to onApply prop */}
			<FilterDropdown
				show={showDropdown}
				onClose={() => setShowDropdown(false)}
				onApply={handleFilterApply} // Now passes both category and price range
			/>
		</>
	);
};

export default ProductSidebar;
