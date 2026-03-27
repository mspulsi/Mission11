import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

export default function Navbar() {
    const { cart } = useCart();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Book Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart ({cart.length} - ${cart.reduce((total, book) => total + book.price, 0).toFixed(2)})</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}