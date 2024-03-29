import { useMemo, useState, useEffect } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = () => {
    const [selectedDate, setSelectedDate] = useState("May, 10, 2024");
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
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/static-images%2Fship1.webp?alt=media&token=c7c8ff3b-42ed-432b-9710-98acb8e18174')] bg-repeat-y  min-h-fit bg-center bg-cover flex relative justify-center items-center">
            <div data-aos="zoom-in-up" className="flex bg-gray-800 bg-opacity-30 backdrop-blur-md m-auto gap-12 rounded-3xl lg:p-14 md:p-10 p-5 lg:my-32 md:my-26 my-24 border border-gray-500">
                <img src="/images/kaizen1.png" alt="ship" className="lg:h-[16rem] md:h-[13rem] lg:block md:block hidden" />
                <div className="flex flex-col items-center justify-center lg:gap-10 md:gap-9 gap-8">
                    <h3 className="font-semibold lg:text-4xl md:text-3xl text-2xl text-pink-600">KAIZEN RETURNS IN</h3>
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
                    <h2 className="font-semibold  md:text-3xl text-2xl lg:text-4xl">
                        <span className="text-rose-500">STATUS : </span>
                        <span className="text-lime-500">ENDED</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Timer;
