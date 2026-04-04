import { useEffect, useState } from "react";
import type { book } from "../types/Book";
import { useCart } from "../CartContext";
import { API_URL } from "../config";

export default function BookList() {
    const [books, setBooks] = useState<book[]>([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("none");
    const [category, setCategory] = useState("all");
    const { addToCart } = useCart();

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${API_URL}/Books?count=${count}&page=${page}&sortBy=${sortBy}&category=${category}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: { books: book[], total_books: number } = await response.json();
            setBooks(data.books);
            setTotalPages(Math.ceil(data.total_books / count));
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, [page, count, sortBy, category]);

    return (
        <div className="container mt-4">
            <div className="row g-3 mb-4">
                <div className="col-auto">
                    <label htmlFor="count" className="form-label">Per Page</label>
                    <select className="form-select" name="count" id="count" value={count} onChange={(e) => {
                        setCount(Number(e.target.value));
                        setPage(1);
                    }}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="col-auto">
                    <label htmlFor="sortBy" className="form-label">Sort By Title</label>
                    <select className="form-select" name="sortBy" id="sortBy" value={sortBy} onChange={(e) => 
                        setSortBy(e.target.value)}>
                        <option value="none">None</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="col-auto">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-select" name="category" id="category" value={category} onChange={(e) => 
                        setCategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="Biography">Biography</option>
                        <option value="Classic">Classic</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Historical">Historical</option>
                        <option value="Business">Business</option>
                        <option value="Christian Books">Christian Books</option>
                        <option value="Thrillers">Thrillers</option>
                        <option value="Health">Health</option>
                        <option value="Action">Action</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4">
                {books.map((book) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={book.bookId}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{book.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                                <p className="card-text mb-1">
                                    <small className="text-muted">{book.publisher}</small>
                                </p>
                                <span className="badge bg-secondary mb-3">{book.category}</span>
                                <p className="card-text text-success fw-bold fs-5 mt-auto">
                                    ${book.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent border-0">
                                <button 
                                    className="btn btn-primary w-100" 
                                    onClick={() => addToCart(book)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4 mb-5 pb-4">
                <button className="btn btn-primary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <span className="text-muted">Page {page} of {totalPages}</span>
                <button className="btn btn-primary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    )
}