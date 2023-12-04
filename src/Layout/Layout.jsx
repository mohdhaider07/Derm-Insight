import React, { useEffect } from "react";
import Navbar from "./Navbar";

import { MdDarkMode } from "react-icons/md";
import { RiSunFill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode } from "../store/reducers/ui.Reducer";
import { twMerge } from "tailwind-merge";

const Layout = (props) => {
	const dispatch = useDispatch();
	const isDarkMode = useSelector((state) => state.ui.isDarkMode);

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [isDarkMode]);

	const darkModeChangeHandler = () => {
		dispatch(setIsDarkMode(!isDarkMode));
	};

	return (
		<React.Fragment>
			<Navbar />
			<div className="">
				<main className="items-center justify-center ">
					{props.children}
				</main>
			</div>
		</React.Fragment>
	);
};

export default Layout;
