import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { book } from "../types/Book";
import { API_URL } from "../config";

export default function EditBook() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<book | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`${API_URL}/Books/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data);
                } else {
                    setError('Book not found');
                }
            } catch (error) {
                console.error('Error fetching book:', error);
                setError('Error loading book');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? {
            ...prev,
            [name]: name === 'pageCount' || name === 'price' ? Number(value) : value
        } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${API_URL}/Books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/admin');
            } else {
                setError('Failed to update book. Please check your input.');
            }
        } catch (error) {
            console.error('Error updating book:', error);
            setError('Error connecting to server.');
        }
    };

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error || 'Book not found'}</div>
                <button className="btn btn-primary" onClick={() => navigate('/admin')}>
                    Back to Admin
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h3 className="mb-0">Edit Book</h3>
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="publisher" className="form-label">Publisher</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="publisher"
                                        name="publisher"
                                        value={formData.publisher}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="isbn" className="form-label">ISBN</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="isbn"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="classification" className="form-label">Classification</label>
                                        <select
                                            className="form-select"
                                            id="classification"
                                            name="classification"
                                            value={formData.classification}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select...</option>
                                            <option value="Fiction">Fiction</option>
                                            <option value="Non-Fiction">Non-Fiction</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select
                                            className="form-select"
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select...</option>
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

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="pageCount" className="form-label">Page Count</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="pageCount"
                                            name="pageCount"
                                            value={formData.pageCount}
                                            onChange={handleChange}
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="price" className="form-label">Price ($)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/admin')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
