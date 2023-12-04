import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { setIsLoading } from "../../store/reducers/ui.Reducer";
import Button from "../Button/Button.component";
import Input from "../Inputs/Input.component";
import LoadingSpinner from "../UI/LoadingSpinner.component";

const DiseaseDetector = ({}) => {
	const isDarkMode = useSelector((state) => state.ui.isDarkMode);
	const isLoading = useSelector((state) => state.ui.isLoading);
	const [imageType, setImageType] = useState("COLOURED");
	const [isFormValid, setIsFormValid] = useState(false);
	const [file, setFile] = useState("");
	const [detectData, setDetectData] = useState(null);

	const dispatch = useDispatch();

	const [isInputValid, setIsInputValid] = useState({
		file: false,
	});

	useEffect(() => {
		if (isInputValid.file) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [isInputValid]);

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		if (!file) {
			toast.warning("Please select an image!");
			return;
		}
		dispatch(setIsLoading(true));
		const formData = new FormData();
		formData.append("file", file);
		const res = await axios({
			method: "post",
			data: formData,
			url: `/predict?image_type=${imageType}`,
		});
		if (res.status === 200) {
			toast.success("Successfully Detected!");
			dispatch(setIsLoading(false));
			setDetectData({
				plant: res.data.class.split("___")[0],
				label: res.data.class.split("___")[1],
				confidence: res.data.confidence,
			});
		} else {
			toast.error("Something went wrong!");
			console.log(res);
		}
	};

	const resetForm = () => {
		setFile("");
		setImageType("coloured");
		setIsFormValid(false);
		setIsInputValid({
			file: false,
		});
		setDetectData(null);
	};

	return (
		<div className="mt-6 bg-[color:var(--main-color)] flex-col shadow-[2px_4px_12px_rgba(0,0,0,0.2)] max-w-[780px] md:mx-auto shadow-[color:var(--shadow-color)] rounded-xl p-4  flex ">
			<div
				className={twMerge(
					" p-4  flex items-center flex-col w-[35rem] h-[17rem] rounded-xl border-4 border-dashed justify-between",
					isDarkMode ? "text-black" : "text-white"
				)}
			>
				<div className="flex items-center justify-center h-full w-fit">
					{file && (
						<img
							src={window.URL.createObjectURL(file)}
							className="w-full h-full rounded-xl"
						/>
					)}
				</div>
			</div>
			<div className="flex justify-start p-8 basis-1/2 flex-column">
				{!detectData ? (
					<form
						action=""
						className="m-auto"
						onSubmit={onSubmitHandler}
						//   enctype="multipart/form-data"
					>
						<div className="flex flex-col gap-8 body"></div>
						<Input
							data={file}
							accept="image/*"
							setData={setFile}
							inputFieldName="file"
							setIsInputValid={setIsInputValid}
							isInputValid={isInputValid}
							type="file"
						/>

						<div className="flex justify-around mt-8 footer">
							{isLoading && <LoadingSpinner />}
							{!isLoading && (
								<Button
									type="submit"
									className="px-4 py-2 btn-base "
									disabled={!isFormValid || isLoading}
								>
									Send
								</Button>
							)}
						</div>
					</form>
				) : (
					<div className="flex flex-col items-center justify-center flex-1">
						<div
							className={twMerge(
								`flex items-center w-full ${
									isDarkMode ? "" : "bg-gray-100"
								} px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
							)}
						>
							<h3 className="text-[color:var(--tertiary-text-color)] text-lg font-semibold  text-center ">
								Skin Disease - &nbsp;
							</h3>{" "}
							<h3 className="text-[color:var(--color-primary)] text-xl font-semibold  text-center ">
								{detectData?.label}
							</h3>
						</div>
						<div
							className={twMerge(
								`flex items-center w-full ${
									isDarkMode ? "" : "bg-gray-100"
								} px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
							)}
						>
							<h3 className="text-[color:var(--tertiary-text-color)] text-lg font-semibold  text-center ">
								Label - &nbsp;
							</h3>{" "}
							<h3 className="text-[color:var(--color-primary)] text-xl font-semibold  text-center ">
								{detectData?.plant}
							</h3>
						</div>
						<div
							className={twMerge(
								`flex items-center w-full ${
									isDarkMode ? "" : "bg-gray-100"
								} px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
							)}
						>
							<h3 className="text-[color:var(--tertiary-text-color)] text-lg font-semibold  text-center ">
								Confidence - &nbsp;
							</h3>{" "}
							<h3 className="text-[color:var(--color-primary)] text-xl font-semibold  text-center ">
								{Math.round(
									(detectData?.confidence + Number.EPSILON) * 10000
								) / 100}
								%
							</h3>
						</div>
						<div className="flex gap-4">
							<Button
								type="submit"
								className="px-4 py-2 mt-5 btn-inverted"
								onClick={() => setDetectData(null)}
							>
								BACK
							</Button>
							<Button
								type="submit"
								className="px-4 py-2 mt-5 btn-base"
								onClick={resetForm}
							>
								CLEAR
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DiseaseDetector;
