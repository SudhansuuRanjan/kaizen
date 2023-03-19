import About from '../components/HomePage/About'
import ArtistLineup from '../components/HomePage/ArtistLineup'
import EventCategory from '../components/HomePage/EventCategory'
import FAQs from '../components/HomePage/FAQs'
import Highlights from '../components/HomePage/Highlights'
import ParallaxComponent from '../components/HomePage/ParallaxComponent'
import Timer from '../components/HomePage/Timer'
import Sponsors from '../components/HomePage/Sponsors'
import NavBar from '../components/HomePage/NavBar'


const Home = () => {
  document.title = 'Kaisen 2023'
  return (
    <div className="w-[100%] overflow-hidden">
      <NavBar />
      <ParallaxComponent />
      <Timer />
      <Highlights />
      <EventCategory />
      <ArtistLineup />
      <About />
      <Sponsors />
      <FAQs />
    </div>
  )
}

export default Home