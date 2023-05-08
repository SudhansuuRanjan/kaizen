import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import NavBar2 from './components/NavBar2'
import Footer2 from './components/Footer2'
import Home from './pages/Home'
import EventPage from './pages/EventPage/EventPage'
import EventDetails from './pages/EventPage/EventDetails'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import EditEvent from './pages/EventPage/EditEvent'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ParallaxProvider } from 'react-scroll-parallax'
import Participant from './pages/participant/Participant'
import Verify from './pages/verify/Verify'
import CreatePass from './pages/CreatePass/CreatePass'
import Users from './pages/Users/Users'
import UsersDashboard from './pages/UsersDashboard/UsersDashboard'
import GetUsersByEvent from './pages/Users/GetUsersByEvent'
import VerifyUsers from './pages/Users/VerifyUsers'
import ScrollToTop from './hooks/useScrollToTop'
import VerifyPass from './pages/Users/VerifyPass'


function App() {
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

          <Route path='/events' element={<PrivateRoute />}>
            <Route path='/events' element={
              <>
                <NavBar2 />
                <EventPage />
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/events/:eventSlug' element={<PrivateRoute />}>
            <Route path='/events/:eventSlug' element={
              <>
                <NavBar2 />
                <EventDetails />
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/edit-event/:eventSlug' element={<PrivateRoute />}>
            <Route path='/edit-event/:eventSlug' element={
              <>
                <NavBar2 />
                <EditEvent />
                <Footer2 />
              </>
            } />
          </Route>


          <Route path='/new-event' element={<PrivateRoute />}>
            <Route path='/new-event' element={
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

          <Route path='/create-pass' element={<PrivateRoute />}>
            <Route path='/create-pass' element={
              <>
                <NavBar2 />
                <CreatePass />
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/users' element={<PrivateRoute />}>
            <Route path='/users' element={
              <>
                <NavBar2 />
                <Users />
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/get-user-by-eventid' element={<PrivateRoute />}>
            <Route path='/get-user-by-eventid' element={
              <>
                <NavBar2 />
                <GetUsersByEvent/>
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/verify-users' element={<PrivateRoute />}>
            <Route path='/verify-users' element={
              <>
                <NavBar2 />
                <VerifyUsers/>
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/verify-pass' element={<PrivateRoute />}>
            <Route path='/verify-pass' element={
              <>
                <NavBar2 />
                <VerifyPass/>
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='/dashboard' element={
              <>
                <NavBar2 />
                <UsersDashboard />
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/participant/:id' element={<PrivateRoute />}>
            <Route path='/participant/:id' element={
              <>
                <NavBar2 />
                <Participant />
                <Footer2 />
              </>
            } />
          </Route>

          <Route path='/verify' element={<Verify />}/>

          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </ParallaxProvider>
  )
}

export default App
