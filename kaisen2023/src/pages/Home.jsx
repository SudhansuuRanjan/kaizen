import EventCategory from '../components/HomePage/EventCategory'
import EventSwiper from '../components/HomePage/EventSwiper'
import Footer from '../components/HomePage/Footer'
import ParallaxComponent from '../components/HomePage/ParallaxComponent'
import Timer from '../components/HomePage/Timer'


const Home = () => {
  document.title = 'Kaisen 2023'
  return (
    <div>
      <ParallaxComponent />
      <Timer/>
      <EventCategory/>
      {/* <EventSwiper/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default Home