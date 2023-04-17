import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventPage from './pages/EventPage/EventPage'
import EventDetails from './pages/EventPage/EventDetails'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Layout from './components/Layout'
import Footer from './components/Footer'
import Legals from './pages/Legals/Legals'
import ScrollToTop from './hooks/useScrollToTop'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParallaxProvider } from 'react-scroll-parallax'
import AOS from 'aos';
import "aos/dist/aos.css";
import Pronite from './pages/Proshow/Pronite'
import NavBar from './components/HomePage/NavBar'
import CartPage from './pages/Cart/CartPage'
import Error from './pages/Error'
import CAPortal from './pages/CAPortal/CAPortal'
import CompleteProfile from './pages/CompleteProfile'
import Payment from './pages/Payment/Payment'
import GetPass from './pages/GetPasses/GetPass'

function App() {

  // fonction to load razorpay script in the head
  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement('script');
  //     script.src = src;

  //     script.onload = () => {
  //       resolve(true);
  //     }

  //     script.onerror = () => {
  //       resolve(false);
  //     }

  //     document.body.appendChild(script);
  //   })
  // }

  // load razorpay script
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    // loadScript('https://checkout.razorpay.com/v1/checkout.js')
  }, [])

  return (
    <ParallaxProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path='/' element={
            <>
              {/* <NavBar /> */}
              <Home />
              <Footer />
            </>
          } />

          <Route path='/pronite' element={
            <>
              <NavBar />
              <Pronite />
              <Footer />
            </>
          } />

          <Route path='/campus-ambassdor' element={<PrivateRoute />}>
          <Route path='/campus-ambassdor' element={
            <>
              <NavBar />
              <CAPortal />
              <Footer />
            </>
          } />
          </Route>


          <Route path='/events' element={
            <Layout>
              <EventPage />
            </Layout>
          } />

          <Route path='/events/:eventSlug' element={
            <Layout>
              <EventDetails />
            </Layout>
          } />

          <Route path='/legals/:pageName' element={
            <Layout>
              <Legals />
            </Layout>
          } />


          <Route path='/cart' element={<PrivateRoute />}>
            <Route path='/cart' element={
              <Layout>
                <CartPage />
              </Layout>
            } />
          </Route>

          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={
              <Layout>
                <Profile />
              </Layout>
            } />
          </Route>

          <Route path='/getpass' element={
              <Layout>
                <GetPass />
              </Layout>
            } />

          <Route path='/complete-profile' element={<PrivateRoute />}>
            <Route path='/complete-profile' element={
              <CompleteProfile />
            } />
          </Route>

          <Route path='/checkout' element={<PrivateRoute />}>
            <Route path='/checkout' element={
              <Layout>
                <Payment />
              </Layout>
            } />
          </Route>


          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='*' element={<>
            <NavBar />
            <Error />
            <Footer />
          </>} />
        </Routes>
      </Router>
    </ParallaxProvider>
  )
}

export default App
