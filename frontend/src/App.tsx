import './App.css'
import Navbar from './components/Navbar'
import { CartProvider } from './CartContext'
import { Route, Routes } from 'react-router-dom'
import Books from './pages/Books'
import Cart from './pages/Cart'

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </CartProvider>
    </>
  )
}

export default App
