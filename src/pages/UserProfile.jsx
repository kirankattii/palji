import React, { useEffect, useState } from "react"
import "./CSS/userProfile.css"
import { assets } from "../assets/assets"
import { Outlet, useNavigate } from "react-router-dom"
import { TbLogout2 } from "react-icons/tb"

import { makeApi } from "../api/callApi"
import { homeImg } from "../assets/home/home"

const UserProfile = () => {
	const navigate = useNavigate()
	const [extended, setExtended] = useState(window.innerWidth > 800)
	const [userDatails, setUserDetails] = useState()
	const [isLoading, setIsLoading] = useState(true);


	const handleResize = () => {
		setExtended(window.innerWidth > 800)
	}

	useEffect(() => {
		fetchUserDetail()
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const fetchUserDetail = async () => {
		try {
			setIsLoading(true);
			const responce = await makeApi("/api/my-profile", "GET")
			setUserDetails(responce.data.user)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false);
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("token")
		window.location.replace("/")
	}

	return (
		<div className="userProfile">
			<hr className="userprofile-hr" />
			<div className="user-sidebar-info">
				<div className="userProfile-sidebar">
					<div className="userprofile-h1">
						<img
							src={assets.userprofile_menu}
							alt=""
							className={extended ? "userprofiele-menu" : "userprofiele-menu-close"}
							onClick={() => setExtended((prev) => !prev)}
						/>
						<h1>PROFILE</h1>
					</div>
					<div
						className="userprofile-name user-flexcol"
						onClick={() => navigate("/userprofile")}
					>
						{userDatails?.userImage ?
							<img
								className="myuser-profile-icon"
								// src={assets.userprofile_icon}
								src={userDatails?.userImage}
								alt=""
							/> : <img src={homeImg.blackUserProfile} className="blackUserProfile" />}
						{extended ? (
							<div className="user-name">
								<span>HELLO</span>

								{/* <p>{`${userDatails?.firstName} ${userDatails?.lastName}`}</p> */}
								{isLoading ? (
									<p className="loading-name"></p>
								) : (
									<p>{`${userDatails?.firstName || ''} ${userDatails?.lastName || ''}`}</p>
								)}
							</div>
						) : null}
					</div>
					<div
						className="user-account user-flexcol"
						onClick={() => navigate("/userprofile")}
					>
						<img
							src={homeImg.blackPasswordImg}
							alt="user_account"
						/>
						{extended ? <p>MY ACCOUNT</p> : null}
					</div>
					<div
						className="user-orders user-flexcol"
						onClick={() => navigate("/userprofile/myorders")}
					>
						<img
							src={homeImg.blackShoppingCart}
							alt="user-orders"
						/>
						{extended ? <p>MY ORDERS</p> : null}
					</div>
					<div
						className="user-address user-flexcol"
						onClick={() => navigate("/userprofile/myaddress")}
					>
						<img
							src={homeImg.blackHomeImg}
							alt="user_address"
						/>
						{extended ? <p>MY ADDRESS</p> : null}
					</div>
					{/* <div
						className="user-watchlist user-flexcol"
						onClick={() => navigate("/userprofile/mywatchlist")}
					>
						<img
							src={assets.user_watchlist}
							alt="user_watchlist"
						/>
						{extended ? <p>WISHLIST</p> : null}
					</div> */}
					<div
						className="logouy_btn user-flexcol"
						// onClick={() => navigate("/userprofile/mywatchlist")}
						onClick={() => {
							localStorage.removeItem("token")
							window.location.replace("/")
						}}
					>
						<div className="tb_logout">
							<TbLogout2 />
						</div>
						{extended ? <p>LOGOUT</p> : null}
					</div>
				</div>
				<div className="userProfile-info">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserProfile
