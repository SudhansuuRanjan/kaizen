import EventSwiper from '../components/HomePage/EventSwiper'
import ParallaxComponent from '../components/HomePage/ParallaxComponent'


const Home = () => {
  document.title = 'Kaisen 2023'
  return (
    <div>
      <ParallaxComponent />
      <EventSwiper/>
    </div>
  )
}

export default Home