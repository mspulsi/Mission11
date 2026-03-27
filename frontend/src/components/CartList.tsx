import { useCart } from '../CartContext'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    return (
        <div className="container mt-4">
            <table className="table table-striped table-hover shadow-sm table-fixed w-100">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Genre</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((book) => (
                        <tr key={book.bookId}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.classification}</td>
                            <td className="text-success fw-medium">
                                ${book.price.toFixed(2)}
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => removeFromCart(book.bookId)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
    );
}