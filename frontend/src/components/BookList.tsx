import { useEffect, useState } from "react";
import type { book } from "../types/Book";

export default function BookList() {
    const [books, setBooks] = useState<book[]>([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

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
    }

    useEffect(() => {
        fetchBooks();
    }, [page, count]);

    return (
        <div className="container mt-4">
            <div>
                <select name="count" id="count" value={count} onChange={(e) => {
                    setCount(Number(e.target.value));
                    setPage(1);
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div className="container mt-4">
                <table className="table table-striped table-hover shadow-sm table-fixed w-100">
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '20%' }}>Title</th>
                            <th style={{ width: '20%' }}>Author</th>
                            <th style={{ width: '20%' }}>Publisher</th>
                            <th style={{ width: '20%' }}>Genre</th>
                            <th style={{ width: '20%' }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookId}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.classification}</td>
                                <td className="text-success fw-medium">
                                    ${book.price.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-primary" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button className="btn btn-primary" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    )
}