import ArtistLineup from '../components/HomePage/ArtistLineup'
import EventCategory from '../components/HomePage/EventCategory'
import Footer from '../components/HomePage/Footer'
import ParallaxComponent from '../components/HomePage/ParallaxComponent'
import Timer from '../components/HomePage/Timer'


const Home = () => {
  document.title = 'Kaisen 2023'
  return (
    <div className="w-[100%] overflow-hidden">
      <ParallaxComponent />
      <Timer/>
      <EventCategory/>
      {/* <EventSwiper/> */}
      {/* <Footer/> */}
      <ArtistLineup/>
    </div>
  )
}

export default Home