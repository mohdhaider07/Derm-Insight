import React from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import DiseaseDetector from "../components/DiseaseDetector/DiseaseDetector";
// import SihLogo from "../assets/Images/SihLogo.png";

const Home = () => {
	const isDarkMode = useSelector((state) => state.ui.isDarkMode);
	return (
		<div className="flex items-center justify-center pt-8 bg-white w-[100vw] h-[100vh]">
			<div className="flex items-center justify-center w-4/5 rounded-2xl h-4/5 bg-sky-100">
				<div className="">
					<DiseaseDetector />
				</div>
			</div>
		</div>
	);
};

export default Home;
