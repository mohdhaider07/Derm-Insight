import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
// import logo from "../assets/logo/logo2-final.png";
import logo from "../assets/logo/logo3.png";
import "./navbar.css";

const Navbar = () => {
	const [dropMenu, setDropMenu] = useState(false);
	const dropMenuHandler = () => {
		setDropMenu((dropMenu) => !dropMenu);
	};

	const isDarkMode = useSelector((state) => state.ui.isDarkMode);

	return (
		<React.Fragment>
			<nav
				className={twMerge(
					" p-4 md:p-3 bg-transparent   fixed top-0 left-0 w-full z-50"
				)}
			>
				<div className="w-11/12 md:w-[85%]  lg:w-4/5 mx-auto max-w-[1440px] flex justify-between items-center">
					<div className="logo">
						<h1 className="flex items-center gap-3 text-2xl font-semibold">
							<Link to="/">
								<img src={logo} className="h-16 scale-125 " alt="" />
							</Link>
						</h1>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
