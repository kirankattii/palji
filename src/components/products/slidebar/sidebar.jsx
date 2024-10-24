
// import React, { useEffect, useState } from "react";
// import "../../../pages/CSS/product/sidebar.css";
// import Allproduct from "../allproduct";
// import styles from "../../../pages/CSS/product/sidebar.module.css";
// import { makeApi } from "../../../api/callApi";
// import { IoSearch } from "react-icons/io5";
// import FilterDropdown from "./FilterPopup";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { useLocation } from "react-router-dom";


// const ProductSidebar = () => {
// 	const location = useLocation();
// 	const queryParams = new URLSearchParams(location.search);
// 	const Dstatus = queryParams.get("category") || " ";
// 	const [parmstatus, setParmstatus] = useState();

// 	const [categories, setCategories] = useState([]);
// 	const [search, setSearch] = useState("");
// 	const [selectedCategory, setSelectedCategory] = useState();
// 	const [categoryName, setCategoryName] = useState("");
// 	const [selectedPriceRange, setSelectedPriceRange] = useState({ min: 0, max: 1000000 }); // No filter by default

// 	const [showDropdown, setShowDropdown] = useState(false);

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET");
// 				if (response.status === 200) {
// 					setCategories(response.data.categories);
// 				}
// 				const ParcategoryName = queryParams.get("category");
// 				if(ParcategoryName === null){
// 					setSelectedCategory("");
// 				}
// 				if (ParcategoryName || ParcategoryName !== undefined || ParcategoryName !== "" || ParcategoryName !== " " || ParcategoryName !== null) {
// 					const matchedCategory = await response.data.categories.find(category => category.name === ParcategoryName);
// 					if (matchedCategory) {
// 						setSelectedCategory(matchedCategory._id);
// 						setCategoryName(matchedCategory.name);
// 					}
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error);
// 			}
// 		}
// 		fetchCategories();
// 	}, []);

// 	const handleCategoryChange = (categoryId, name) => {
// 		setSelectedCategory(categoryId);
// 		setCategoryName(name);
// 	};

// 	const handleFilterApply = (categoryId, minPrice, maxPrice) => {
// 		setSelectedCategory(categoryId);
// 		setSelectedPriceRange({ min: minPrice, max: maxPrice });
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
// 		{ label: "₹3000 and ABOVE", min: 3000, max: 1000000 },
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
// 									onClick={() => handleCategoryChange("", "")} // Empty string for "All Categories"
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
// 										onChange={() => handleFilterApply(selectedCategory, range.min, range.max)}
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
// 			{/* Pass handleFilterApply to onApply prop */}
// 			<FilterDropdown
// 				show={showDropdown}
// 				onClose={() => setShowDropdown(false)}
// 				onApply={handleFilterApply} // Now passes both category and price range
// 			/>
// 		</>
// 	);
// };

// export default ProductSidebar;





import React, { useEffect, useState } from "react";
import "../../../pages/CSS/product/sidebar.css";
import Allproduct from "../allproduct";
import styles from "../../../pages/CSS/product/sidebar.module.css";
import { makeApi } from "../../../api/callApi";
import { IoSearch } from "react-icons/io5";
import FilterDropdown from "./FilterPopup";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";


const ProductSidebar = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const Dstatus = queryParams.get("category") || " ";
	const [parmstatus, setParmstatus] = useState();
	const [selectedSubcategory, setSelectedSubcategory] = useState("");

	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedCategory, setSelectedCategory] = useState();
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
				const ParcategoryName = queryParams.get("category");
				if (ParcategoryName === null) {
					setSelectedCategory("");
				}
				if (ParcategoryName) {
					const matchedCategory = response.data.categories.find(
						(category) => category.name === ParcategoryName
					);
					if (matchedCategory) {
						setSelectedCategory(matchedCategory._id);
						setCategoryName(matchedCategory.name);
					}
				}
			} catch (error) {
				console.log("Error fetching categories:", error);
			}
		}
		fetchCategories();
	}, []);

	const handleCategoryChange = (categoryId, name) => {
		setSelectedCategory(categoryId);
		setSelectedSubcategory(""); // Reset subcategory when changing category
		setCategoryName(name);
	};

	const handleSubcategoryChange = (subcategoryId) => {
		setSelectedSubcategory(subcategoryId);
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
		{ label: "₹3000 and ABOVE", min: 3000, max: 1000000 },
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
									onClick={() => handleCategoryChange("", "")}
									className={selectedCategory === "" ? styles.active : ""}
								>
									All
								</p>
								{categories.map((category) => (
									<div key={category._id}>
										<p
											onClick={() => handleCategoryChange(category._id, category.name)}
											className={selectedCategory === category._id ? styles.activeCategory : ""}
										>
											{category.name}
										</p>
										{category.subcategories && category.subcategories.length > 0 && selectedCategory === category._id && (
											<div className={styles.subcategories}>
												{category.subcategories.map((subcategory) => (
													<p
														key={subcategory._id}
														onClick={() => handleSubcategoryChange(subcategory._id)}
														className={selectedSubcategory === subcategory._id ? styles.activeSubcategory : ""}
													>
														{subcategory.name}
													</p>
												))}
											</div>
										)}
									</div>
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
						subcategory={selectedSubcategory}
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
