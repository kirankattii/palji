// import React, { useState, useEffect } from "react"
// import { makeApi } from "../../../api/callApi"
// import Slider from "rc-slider"
// import "rc-slider/assets/index.css"
// import "./filterPopup.css"

// const FilterDropdown = ({ show, onClose, onApply }) => {
// 	const [categories, setCategories] = useState([])
// 	const [selectedCategory, setSelectedCategory] = useState("")
// 	const [priceRange, setPriceRange] = useState([50, 5000])

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

// 	if (!show) {
// 		return null
// 	}

// 	const handleApply = () => {
// 		onApply({
// 			selectedCategory,
// 			minPrice: priceRange[0],
// 			maxPrice: priceRange[1],
// 		})
// 		onClose()
// 	}

// 	const handlePriceRangeChange = (range) => {
// 		setPriceRange(range)
// 	}

// 	return (
// 		<div className="filter_dropdown_container">
// 			<div className="filter-dropdown">
// 				<div className="filter-dropdown-header">
// 					<h3>Filter</h3>
// 					<button
// 						onClick={onClose}
// 						className="close-button"
// 					>
// 						X
// 					</button>
// 				</div>
// 				<div className="filter-dropdown-body">
// 					<div className="filter-section">
// 						<h4>Categories</h4>

// 						{categories.map((category) => (
// 							<div
// 								key={category._id}
// 								className="filter-category"
// 							>
// 								<input
// 									type="radio"
// 									id={category._id}
// 									name="category"
// 									value={category._id}
// 									checked={selectedCategory === category._id}
// 									onChange={(e) => setSelectedCategory(e.target.value)}
// 								/>

// 								<label htmlFor={category._id}>{category.name}</label>
// 							</div>
// 						))}
// 					</div>
// 					<h4>Filter By Price</h4>
// 					<div className="filter-section filterSection2">
// 						<div className="price-slider">
// 							<label>₹{priceRange[0]}</label>
// 							<Slider
// 								range
// 								min={50}
// 								max={5000}
// 								value={priceRange}
// 								onChange={handlePriceRangeChange}
// 							/>
// 							<label>₹{priceRange[1]}</label>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="filter-dropdown-footer">
// 					<button
// 						onClick={handleApply}
// 						className="apply-button"
// 					>
// 						Apply
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default FilterDropdown

// import React, { useState, useEffect } from "react"
// import { makeApi } from "../../../api/callApi"
// import Slider from "rc-slider"
// import "rc-slider/assets/index.css"
// import "./filterPopup.css"
// import "rc-slider/assets/index.css"
// const FilterDropdown = ({ show, onClose, onApply }) => {
// 	const [categories, setCategories] = useState([])
// 	const [selectedCategory, setSelectedCategory] = useState("")
// 	const [priceRange, setPriceRange] = useState([50, 5000])

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

// 	if (!show) {
// 		return null
// 	}

// 	const handleApply = () => {
// 		console.log({
// 			selectedCategory,
// 			minPrice: priceRange[0],
// 			maxPrice: priceRange[1],
// 		});
// 		onApply({
// 			selectedCategory,
// 			minPrice: priceRange[0],
// 			maxPrice: priceRange[1],
// 		})
// 		onClose()
// 	}

// 	const handlePriceRangeChange = (range) => {
// 		setPriceRange(range)
// 	}

// 	return (
// 		<div className="filter_dropdown_container">
// 			<div className="filter-dropdown">
// 				<div className="filter-dropdown-header">
// 					{/* <h3>Filter</h3> */}
// 					<button
// 						onClick={onClose}
// 						className="close-button"
// 					>
// 						{/* X */}
// 					</button>
// 				</div>
// 				<div className="filter-dropdown-body">
// 					<div className="filter-section">
// 						<h4>Categories</h4>
// 						<div className="filter-category">
// 							<input
// 								type="radio"
// 								id="all"
// 								name="category"
// 								value=""
// 								checked={selectedCategory === ""}
// 								onChange={(e) => setSelectedCategory(e.target.value)}
// 							/>
// 							<label htmlFor="all">All</label>
// 						</div>
// 						{categories.map((category) => (
// 							<div
// 								key={category._id}
// 								className="filter-category"
// 							>
// 								<input
// 									type="radio"
// 									id={category._id}
// 									name="category"
// 									value={category._id}
// 									checked={selectedCategory === category._id}
// 									onChange={(e) => setSelectedCategory(e.target.value)}
// 								/>
// 								<label htmlFor={category._id}>{category.name}</label>
// 							</div>
// 						))}
// 					</div>
// 					<h4>Filter By Price</h4>
// 					<div className="filter-section filterSection2">
// 						<div className="price-slider">
// 							<label>₹{priceRange[0]}</label>
// 							<Slider
// 								range
// 								min={50}
// 								max={5000}
// 								value={priceRange}
// 								onChange={handlePriceRangeChange}
// 							/>
// 							<label>₹{priceRange[1]}</label>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="filter-dropdown-footer">
// 					<button
// 						onClick={handleApply}
// 						className="apply-button"
// 					>
// 						Apply
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default FilterDropdown




// import React, { useState, useEffect } from "react";
// import { makeApi } from "../../../api/callApi";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import "./filterPopup.css";

// const FilterDropdown = ({ show, onClose, onApply }) => {
// 	const [categories, setCategories] = useState([]);
// 	const [selectedCategory, setSelectedCategory] = useState("");
// 	const [priceRange, setPriceRange] = useState([50, 5000]);

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

// 	if (!show) {
// 		return null;
// 	}

// 	const handleApply = () => {
// 		onApply(selectedCategory, priceRange[0], priceRange[1]); // Pass category and price range back to parent
// 		onClose(); // Close the dropdown
// 	};

// 	const handlePriceRangeChange = (range) => {
// 		setPriceRange(range);
// 	};

// 	return (
// 		<div className="filter_dropdown_container">
// 			<div className="filter-dropdown">
// 				<div className="filter-dropdown-header">
// 					<h3>Filter</h3>
// 					<button onClick={onClose} className="close-button">X</button>
// 				</div>
// 				<div className="filter-dropdown-body">
// 					{/* Category Filter */}
// 					<div className="filter-section">
// 						<h4>Categories</h4>
// 						<div className="filter-category">
// 							<input
// 								type="radio"
// 								id="all"
// 								name="category"
// 								value=""
// 								checked={selectedCategory === ""}
// 								onChange={(e) => setSelectedCategory(e.target.value)}
// 							/>
// 							<label htmlFor="all">All</label>
// 						</div>
// 						{categories.map((category) => (
// 							<div key={category._id} className="filter-category">
// 								<input
// 									type="radio"
// 									id={category._id}
// 									name="category"
// 									value={category._id}
// 									checked={selectedCategory === category._id}
// 									onChange={(e) => setSelectedCategory(e.target.value)}
// 								/>
// 								<label htmlFor={category._id}>{category.name}</label>
// 							</div>
// 						))}
// 					</div>
// 					{/* Price Filter */}
// 					<h4>Filter By Price</h4>
// 					<div className="filter-section">
// 						<div className="price-slider">
// 							<label>₹{priceRange[0]}</label>
// 							<Slider
// 								range
// 								min={50}
// 								max={5000}
// 								value={priceRange}
// 								onChange={handlePriceRangeChange}
// 							/>
// 							<label>₹{priceRange[1]}</label>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="filter-dropdown-footer">
// 					<button onClick={handleApply} className="apply-button">
// 						Apply
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default FilterDropdown;



import React, { useState, useEffect } from "react";
import { makeApi } from "../../../api/callApi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./filterPopup.css";

const FilterDropdown = ({ show, onClose, onApply }) => {
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedSubcategory, setSelectedSubcategory] = useState("");
	const [priceRange, setPriceRange] = useState([50, 5000]);

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

	if (!show) {
		return null;
	}

	const handleApply = () => {
		onApply(selectedCategory, selectedSubcategory, priceRange[0], priceRange[1]); // Pass category, subcategory, and price range back to parent
		onClose(); // Close the dropdown
	};

	const handlePriceRangeChange = (range) => {
		setPriceRange(range);
	};

	const handleCategoryChange = (categoryId) => {
		setSelectedCategory(categoryId);
		setSelectedSubcategory(""); // Reset subcategory when category changes
	};

	return (
		<div className="filter_dropdown_container">
			<div className="filter-dropdown">
				<div className="filter-dropdown-header">
					<h3>Filter</h3>
					<button onClick={onClose} className="close-button">X</button>
				</div>
				<div className="filter-dropdown-body">
					{/* Category Filter */}
					<div className="filter-section">
						<h4>Categories</h4>
						<div className="filter-category">
							<input
								type="radio"
								id="all"
								name="category"
								value=""
								checked={selectedCategory === ""}
								onChange={() => handleCategoryChange("")}
							/>
							<label htmlFor="all">All</label>
						</div>
						{categories.map((category) => (
							<div key={category._id}>
								<div className="filter-category">
									<input
										type="radio"
										id={category._id}
										name="category"
										value={category._id}
										checked={selectedCategory === category._id}
										onChange={() => handleCategoryChange(category._id)}
									/>
									<label htmlFor={category._id}>{category.name}</label>
								</div>
								{/* Subcategories */}
								{selectedCategory === category._id && category.subcategories && (
									<div className="filter-subcategories">
										{category.subcategories.map((subcategory) => (
											<div key={subcategory._id} className="filter-subcategory">
												<input
													type="radio"
													id={subcategory._id}
													name="subcategory"
													value={subcategory._id}
													checked={selectedSubcategory === subcategory._id}
													onChange={() => setSelectedSubcategory(subcategory._id)}
												/>
												<label htmlFor={subcategory._id}>{subcategory.name}</label>
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
					{/* Price Filter */}
					<h4>Filter By Price</h4>
					<div className="filter-section">
						<div className="price-slider">
							<label>₹{priceRange[0]}</label>
							<Slider
								range
								min={50}
								max={5000}
								value={priceRange}
								onChange={handlePriceRangeChange}
							/>
							<label>₹{priceRange[1]}</label>
						</div>
					</div>
				</div>
				<div className="filter-dropdown-footer">
					<button onClick={handleApply} className="apply-button">
						Apply
					</button>
				</div>
			</div>
		</div>
	);
};

export default FilterDropdown;
