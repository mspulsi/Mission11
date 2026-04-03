import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { book } from "../types/Book";

export default function AdminBooks() {
    const [books, setBooks] = useState<book[]>([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            const response = await fetch(`https://localhost:5000/Books?count=${count}&page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: { books: book[], total_books: number } = await response.json();
            setBooks(data.books);
            setTotalPages(Math.ceil(data.total_books / count));
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const deleteBook = async (bookId: number) => {
        if (!confirm('Are you sure you want to delete this book?')) return;
        
        try {
            const response = await fetch(`https://localhost:5000/Books/${bookId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchBooks();
            } else {
                alert('Failed to delete book');
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Error deleting book');
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [page, count]);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Admin - Manage Books</h1>
                <button 
                    className="btn btn-success"
                    onClick={() => navigate('/admin/add')}
                >
                    + Add New Book
                </button>
            </div>

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
                                <span className="badge bg-secondary mb-2">{book.category}</span>
                                <p className="card-text mb-1">
                                    <small className="text-muted">ISBN: {book.isbn}</small>
                                </p>
                                <p className="card-text mb-1">
                                    <small className="text-muted">{book.pageCount} pages</small>
                                </p>
                                <p className="card-text text-success fw-bold fs-5 mt-auto">
                                    ${(book.price ?? 0).toFixed(2)}
                                </p>
                            </div>
                            <div className="card-footer bg-transparent border-0">
                                <div className="d-flex gap-2">
                                    <button 
                                        className="btn btn-primary flex-grow-1" 
                                        onClick={() => navigate(`/admin/edit/${book.bookId}`)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger flex-grow-1" 
                                        onClick={() => deleteBook(book.bookId)}
                                    >
                                        Delete
                                    </button>
                                </div>
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
    );
}
