import { useCart } from '../CartContext'
import { useNavigate } from 'react-router-dom';

export default function CartList() {
    const { cart, removeFromCart, addToCart, clearCart, totalItems, totalPrice } = useCart();
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            {cart.length === 0 ? (
                <div className="text-center py-5">
                    <h4 className="text-muted">Your cart is empty</h4>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                        Browse Books
                    </button>
                </div>
            ) : (
                <>
                    <table className="table table-striped table-hover shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Subtotal</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.book.bookId}>
                                    <td>{item.book.title}</td>
                                    <td>{item.book.author}</td>
                                    <td className="text-center">${item.book.price.toFixed(2)}</td>
                                    <td className="text-center">
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => removeFromCart(item.book.bookId)}
                                            >
                                                -
                                            </button>
                                            <span className="fw-bold">{item.quantity}</span>
                                            <button 
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => addToCart(item.book)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center text-success fw-medium">
                                        ${(item.book.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="text-center">
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => {
                                                for (let i = 0; i < item.quantity; i++) {
                                                    removeFromCart(item.book.bookId);
                                                }
                                            }}
                                        >
                                            Remove All
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="table-dark">
                                <td colSpan={3} className="text-end fw-bold">Total:</td>
                                <td className="text-center fw-bold">{totalItems} items</td>
                                <td className="text-center text-success fw-bold">${totalPrice?.toFixed(2) ?? '0.00'}</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="d-flex gap-3">
                        <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>Continue Shopping</button>
                    </div>
                </>
            )}
        </div>
    );
}