import { useMemo, useState, useEffect } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = () => {
    const [selectedDate, setSelectedDate] = useState("May, 5, 2023");
    const parsedDeadline = useMemo(
        () => Date.parse(selectedDate),
        [selectedDate]
    );
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000
        );

        return () => clearInterval(interval);
    }, [parsedDeadline, selectedDate]);

    return (
        <div className="bg-[url('/images/ship1.png')] bg-repeat-y  min-h-fit bg-center bg-cover flex relative justify-center items-center">
            <div className="flex bg-gray-800 bg-opacity-30 backdrop-blur-md m-auto gap-12 rounded-3xl lg:p-14 md:p-10 p-5 lg:my-32 md:my-26 my-24">
                <img src="/images/kaizen1.png" alt="ship" className="lg:h-[16rem] md:h-[13rem] lg:block md:block hidden" />
                <div className="flex flex-col items-center justify-center lg:gap-10 md:gap-9 gap-">
                    <h3 className="font-semibold lg:text-4xl md:text-3xl text-2xl text-pink-600">THE SHIP SETS SAIL IN</h3>
                    <div className="timer flex lg:gap-7 md:gap-6 gap-0">
                        {Object.entries({
                            DAYS: time / DAY < 0 ? 0 : time / DAY,
                            HOURS: (time / HOUR) % 24 < 0 ? 0 : (time / HOUR) % 24,
                            MINUTES: (time / MINUTE) % 60 < 0 ? 0 : (time / MINUTE) % 60,
                            SECONDS: (time / SECOND) % 60 < 0 ? 0 : (time / SECOND) % 60,
                        }).map(([label, value]) => (
                            <div key={label} className="">
                                <div className="rounded-full bg-gray-800 bg-opacity-30 backdrop-blur-sm border h-20 w-20 lg:scale-100 md:scale-100 scale-90 flex justify-center items-center flex-col border-gray-500">
                                    <p className="text-xl font-medium">{`${Math.floor(value)}`.padStart(2, "0")}</p>
                                    <span className="text-xs font-thin">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 className="font-md  md:text-3xl text-2xl lg:text-4xl">
                        <span className="text-orange-500">STATUS : </span>
                        <span className="text-green-300">DEPARTED</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Timer;
