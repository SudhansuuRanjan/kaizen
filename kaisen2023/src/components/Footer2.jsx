const Footer2 = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <div className="text-base  bg-black">
            <div className="w-[90%] m-[auto] h-[2px] border-t-[1px] border-gray-900"></div>
            <div className="m-[auto] py-8 text-gray-500 flex flex-col md:flex-row lg:flex-row justify-between items-center w-[90%] text-base gap-2">
                <p>© {year} Kaizen. All Rights Reserved.</p>
                <p className="flex lg:flex-row md:flex-row flex-col items-center gap-[5px]">
                   <span> Designed & Developed by {" "}</span>
                    <a className="font-medium text-rose-500" href="https://www.sudhanshuranjan.live">
                        Sudhanshu Ranjan
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default Footer2;