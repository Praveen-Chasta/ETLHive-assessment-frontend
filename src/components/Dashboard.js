import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap'; 
import '../App.css';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('username');
    const [sortDirection, setSortDirection] = useState('asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUsername, setEditUsername] = useState('');
    const [editEmail, setEditEmail] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/get-users');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (field) => {
        setSortField(field);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditUsername(user.username);
        setEditEmail(user.email);
        setShowEditModal(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/update/${selectedUser._id}`, {
                username: editUsername,
                email: editEmail
            });
            // Refresh data after update
            const response = await axios.get('/get-users');
            setData(response.data);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/delete/${selectedUser._id}`);
            // Refresh data after deletion
            const response = await axios.get('/get-users');
            setData(response.data);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className='dashboard-container'>
            <h1 className='d-flex align-item-center justify-content-center mb-5'>Dashboard</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <table className="data-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSortChange('username')}>
                            Username {sortField === 'username' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th onClick={() => handleSortChange('email')}>
                            Email {sortField === 'email' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item._id}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td className="action-cell">
                                <FaEdit
                                    onClick={() => handleEdit(item)}
                                    className="action-icon edit-icon"
                                />
                                <FaTrash
                                    onClick={() => handleDelete(item)}
                                    className="action-icon delete-icon"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateUser}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={editUsername}
                                onChange={(e) => setEditUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {selectedUser?.username}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
