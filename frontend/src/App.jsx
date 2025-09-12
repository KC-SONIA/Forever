import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import About from './pages/about'
import Cart from './pages/Cart'
import Collections from './pages/collections'
import Contact from './pages/contact'
import Home from './pages/Home'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Placeorder from './pages/Placeorder'
import Product from './pages/Product'
import Verify from './pages/Verify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collections' element={<Collections/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/placeorder' element={<Placeorder/>}></Route>
        <Route path='/product/:productId' element={<Product/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/verify' element={<Verify/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
