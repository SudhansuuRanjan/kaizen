import React from 'react'

const ArtistLineup = () => {
    return (
        <div className="bg-[url('/images/painting.png')] bg-repeat-y  min-h-fit bg-center bg-cover flex relative justify-center items-center py-20 flex-wrap gap-10">

            <div class="card lg:scale-100 md:scale-100 scale-110">
                <div class="wrapper">
                    <img src="https://images.squarespace-cdn.com/content/v1/5944f4962e69cf526589c939/1536753972962-U827SLCM64KSO92NQ9WK/Shahrukh+Khan+White+tee+%2821st+August+2018%2978853.jpg?format=1500w" class="cover-image" />
                </div>
                <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" class="title" />
                <img src="srk-f.png" class="character" />
            </div>

            <div class="card lg:scale-100 md:scale-100 scale-110">
                <div class="wrapper">
                    <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" class="cover-image" />
                </div>
                <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png" class="title" />
                <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" class="character" />
            </div>

            <div class="card lg:scale-100 md:scale-100 scale-110">
                <div class="wrapper">
                    <img src="https://images.squarespace-cdn.com/content/v1/5944f4962e69cf526589c939/1536753972962-U827SLCM64KSO92NQ9WK/Shahrukh+Khan+White+tee+%2821st+August+2018%2978853.jpg?format=1500w" class="cover-image" />
                </div>
                <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" class="title" />
                <img src="srk-f.png" class="character" />
            </div>

            {/* <a href="https://www.mythrillfiction.com/force-mage" alt="Mythrill" target="_blank">
                <div class="card">
                    <div class="wrapper">
                        <img src="https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg" class="cover-image" />
                    </div>
                    <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" class="title" />
                    <img src="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp" class="character" />
                </div>
            </a> */}
        </div>
    )
}

export default ArtistLineup