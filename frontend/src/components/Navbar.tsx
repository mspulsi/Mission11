import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../CartContext';

export default function Navbar() {
    const { totalItems, totalPrice } = useCart();
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Book Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {location.pathname === '/cart' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Books</Link>
                            </li>
                        )}
                        {location.pathname === '/' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    Cart ({totalItems ?? 0} - ${(totalPrice ?? 0).toFixed(2)})
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}