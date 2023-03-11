import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import NavBar2 from './components/NavBar2'
import Footer2 from './components/Footer2'
import Home from './pages/Home'
import Events from './pages/Events'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParallaxProvider } from 'react-scroll-parallax'


function App() {
  return (
    <ParallaxProvider>
      <Router>
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
            <>
              <NavBar2 />
              <Events />
              <Footer2 />
            </>
          } />


          <Route path='/cart' element={<PrivateRoute />}>
            <Route path='/cart' element={
              <>
                <NavBar2 />
                <Cart />
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={
              <>
                <NavBar2 />
                <Profile />
                <Footer2 />
              </>
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
