import React from 'react'
import { Link } from 'react-router-dom'

const ArtistLineup = () => {
    return (
        <div className="bg-[url('/images/EDM.png')] after:bg-gradient-to-b after:from-white after:to-black bg-repeat-y  min-h-fit bg-center bg-cover ">
            <h3 className='text-center font-bold text-4xl pt-16'>PRONITES</h3>
            <div className="flex relative justify-center items-center py-20 flex-wrap lg:gap-10 md:gap-10 gap-16">

                <div className="card lg:scale-100 md:scale-100 scale-105">
                    <div className="wrapper">
                        <img src="images/unknown.png" className="cover-image" />
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" className="title" />
                    <img src="srk-f.png" className="character" />
                </div>

                <div className="card lg:scale-100 md:scale-100 scale-105">
                    <div className="wrapper">
                        <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" className="cover-image" />
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png" className="title" />
                    <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" className="character" />
                </div>

                <div className="card lg:scale-100 md:scale-100 scale-105">
                    <div className="wrapper">
                        <img src="https://images.squarespace-cdn.com/content/v1/5944f4962e69cf526589c939/1536753972962-U827SLCM64KSO92NQ9WK/Shahrukh+Khan+White+tee+%2821st+August+2018%2978853.jpg?format=1500w" className="cover-image" />
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" className="title" />
                    <img src="srk-f.png" className="character" />
                </div>

                {/* <a href="https://www.mythrillfiction.com/force-mage" alt="Mythrill" target="_blank">
                <div className="card">
                    <div className="wrapper">
                        <img src="https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg" className="cover-image" />
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" className="title" />
                    <img src="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp" className="character" />
                </div>
            </a> */}
            </div>

            <div className='flex items-center justify-center pb-20'>
                <Link to="/pronite">
                    <button className='m-auto transition-all delay-75 ease-in-out transform hover:bg-red-500 bg-red-600 hover:shadow-2xl hover:scale-105 shadow-lg text-white py-3.5 px-16 rounded-2xl'>
                        Explore
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ArtistLineup