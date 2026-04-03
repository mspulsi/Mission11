import './App.css'
import Navbar from './components/Navbar'
import { CartProvider } from './CartContext'
import { Route, Routes } from 'react-router-dom'
import Books from './pages/Books'
import Cart from './pages/Cart'
import AdminBooks from './pages/AdminBooks'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminBooks />} />
            <Route path="/admin/add" element={<AddBook />} />
            <Route path="/admin/edit/:id" element={<EditBook />} />
          </Routes>
        </main>
      </CartProvider>
    </>
  )
}

export default App
