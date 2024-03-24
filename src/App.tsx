import { useState, useEffect } from "react";

const App = () => {
	const [breakTime, SetBreakTime] = useState(300);
	const [workTime, SetWorkTime] = useState(1500);
	const [remainingTime, setRemainingTime] = useState(workTime);
	const [isWorkTime, SetIsWorkTime] = useState(true);
	const [intervalId, SetIntervalId] = useState<any>(null);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (time % 60).toString().padStart(2, "0");
		return `${minutes}:${seconds}`;
	};

	const handleStartStop = () => {
		if (intervalId === null) {
			const interval = setInterval(() => {
				if (remainingTime > 0) {
					setRemainingTime((prevTime) => {
						if (prevTime <= 0) {
							return 0;
						} else {
							return prevTime - 1;
						}
					});
				}
			}, 1000);
			return SetIntervalId(interval);
		} else {
			clearInterval(intervalId);
			SetIntervalId(null);
		}
	};

	const resetTimer = () => {
		clearInterval(intervalId);
		SetIntervalId(null);
		let getAudioId = document.getElementById("beep") as HTMLAudioElement;
		getAudioId.pause();
		getAudioId.currentTime = 0;
		SetIsWorkTime(true);
		setRemainingTime(1500);
		SetWorkTime(1500);
		SetBreakTime(300);
	};

	useEffect(() => {
		if (remainingTime === 0) {
			setTimeout(() => {
				let beep = document.getElementById("beep") as HTMLAudioElement;
				beep.play();
				if (isWorkTime) setRemainingTime(breakTime);
				else setRemainingTime(workTime);
				SetIsWorkTime(!isWorkTime);
			}, 1000);
		}
	}, [remainingTime]);

	return (
		<div
			className={`transition-colors h-screen grid place-items-center ${
				isWorkTime ? "bg-orange-400" : "bg-zinc-700"
			}`}>
			<audio
				id="beep"
				preload="auto"
				src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
			<div className="flex flex-col items-center relative">
				<p
					className={` -top-10 text-lg absolute font-comfortaa font-bold ${
						isWorkTime ? "" : "text-slate-200"
					}`}>
					Pomodoro Clock
				</p>
				<div
					className={`flex flex-col items-center  border border-4 ${
						isWorkTime
							? "border-orange-800 bg-orange-600 bg-opacity-50"
							: "border-zinc-800 bg-zinc-500 bg-opacity-50"
					} rounded-lg p-2`}>
					<div className="flex justify-between relative gap-2">
						<div
							className={`flex flex-col gap-2 w-full ${
								intervalId ? "pointer-events-none" : ""
							}`}>
							<p
								id="break-label"
								className={`font-semibold text-2xl transition-colors ${
									isWorkTime ? "" : "text-slate-200"
								}`}>
								Break Time
							</p>
							<div className="flex bg-white rounded-md justify-between items-center">
								<button
									id="break-increment"
									onClick={() => {
										if (breakTime < 3600) SetBreakTime(breakTime + 60);
										if (!isWorkTime && breakTime < 3600)
											setRemainingTime(breakTime + 60);
									}}
									className="border bg-orange-600 px-2 text-3xl rounded-l-md hover:bg-orange-700">
									+
								</button>
								<p
									id="break-length"
									className="font-semibold w-[70px] px-2 text-2xl text-center">
									{breakTime / 60}
								</p>
								<button
									id="break-decrement"
									onClick={() => {
										if (breakTime > 60) SetBreakTime(breakTime - 60);
										if (!isWorkTime && breakTime > 60)
											setRemainingTime(breakTime - 60);
									}}
									className="border bg-orange-600 px-2 text-3xl rounded-r-md hover:bg-orange-700">
									-
								</button>
							</div>
						</div>
						<div
							className={`flex flex-col gap-2 w-full ${
								intervalId ? "pointer-events-none" : ""
							}`}>
							<p
								id="session-label"
								className={`text-end font-semibold text-2xl transition-colors ${
									isWorkTime ? "" : "text-slate-200"
								}`}>
								Work Time
							</p>
							<div className="flex bg-white rounded-md justify-between items-center">
								<button
									id="session-increment"
									onClick={() => {
										if (workTime < 3600) SetWorkTime(workTime + 60);
										if (isWorkTime && workTime < 3600)
											setRemainingTime(workTime + 60);
									}}
									className="border bg-orange-600 px-2 text-3xl rounded-l-md hover:bg-orange-700">
									+
								</button>
								<p
									id="session-length"
									className="font-semibold w-[70px] px-2 text-2xl text-center">
									{workTime / 60}
								</p>
								<button
									id="session-decrement"
									onClick={() => {
										if (workTime > 60) SetWorkTime(workTime - 60);
										if (isWorkTime && workTime > 60)
											setRemainingTime(workTime - 60);
									}}
									className="border bg-orange-600 px-2 text-3xl rounded-r-md hover:bg-orange-700">
									-
								</button>
							</div>
						</div>
					</div>
					<div className="grid place-items-center w-60 m-[4vh] relative">
						<img
							src="tomato.png"
							alt=""
							className="shadow-md rounded-full brightness-75"
						/>
						<div className="absolute  w-full text-center">
							<p
								id="timer-label"
								className="mb-2 font-semibold text-3xl text-white">
								{isWorkTime ? "Work" : "Break"}
							</p>
							<p
								id="time-left"
								className=" font-comfortaa font-bold text-slate-100 text-5xl">
								{formatTime(remainingTime)}
							</p>
						</div>
					</div>
					<div className="flex gap-x-4">
						<button
							id="start_stop"
							onClick={handleStartStop}
							className={`${
								intervalId
									? "bg-neutral-500 active:bg-slate-500 px-8  text-violet-100 border-neutral-400"
									: "bg-red-700 active:bg-rose-500 px-10  text-violet-200 border-red-400"
							} shadow-md 
            border-b-4 rounded font-semibold cursor-pointer grid place-items-center 
            py-2 active:translate-y-1 active:border-b-0 active:mb-1 text-2xl`}>
							{intervalId ? "Pause" : "Start"}
						</button>
						<button
							id="reset"
							onClick={resetTimer}
							className="bg-green-700 shadow-md text-violet-200 border-b-4 border-green-400
                      rounded font-semibold cursor-pointer grid place-items-center px-9 py-2
                      active:bg-emerald-500 active:translate-y-1 active:border-b-0 active:mb-1 text-2xl">
							Reset
						</button>
					</div>
				</div>
				<p
					className={` font-semibold text-md mt-2 transition-colors ${
						isWorkTime ? "" : "text-slate-200"
					}`}>
					Designed by Fakhrie
				</p>
			</div>
		</div>
	);
};

export default App;
