import { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Events from './pages/Events'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Layout from './components/Layout'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Legals from './pages/Legals'
import ScrollToTop from './hooks/useScrollToTop'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParallaxProvider } from 'react-scroll-parallax'


function App() {

  // fonction to load razorpay script in the head
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        resolve(true);
      }

      script.onerror = () => {
        resolve(false);
      }

      document.body.appendChild(script);
    })
  }


  // load razorpay script
  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js')
  }, [])

  return (
    <ParallaxProvider>
      <Router>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path='/' element={
            <>
              <NavBar />
              <Home />
              <Footer />
            </>
          } />


          <Route path='/events' element={
            <Layout>
              <Events />
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
                <Cart />
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


          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </ParallaxProvider>
  )
}

export default App
