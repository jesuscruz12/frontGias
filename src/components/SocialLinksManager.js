import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialLinksManager = () => {
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState({ platform: '', url: '', status: 'active' });

    // Fetch all social links on component mount
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/social-links'); // Asegúrate de usar la URL correcta
                setLinks(response.data);
            } catch (error) {
                console.error('Error fetching social links:', error);
            }
        };

        fetchLinks();
    }, []);

    // Add a new social link
    const addLink = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/social-links', newLink); // URL correcta
            setLinks([...links, response.data]);
            setNewLink({ platform: '', url: '', status: 'active' }); // Reset form after adding
        } catch (error) {
            console.error('Error adding social link:', error);
        }
    };

    // Edit an existing social link
    const editLink = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/social-links/${id}`, newLink); // URL correcta
            setLinks(links.map(link => link._id === id ? response.data : link));
        } catch (error) {
            console.error('Error editing social link:', error);
        }
    };

    // Delete a social link
    const deleteLink = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/social-links/${id}`); // URL correcta
            setLinks(links.filter(link => link._id !== id));
        } catch (error) {
            console.error('Error deleting social link:', error);
        }
    };

    return (
        <div>
            <h2>Manage Social Media Links</h2>
            <div>
                {/* Form to add a new link */}
                <input
                    type="text"
                    placeholder="Platform"
                    value={newLink.platform}
                    onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                />
                <select
                    value={newLink.status}
                    onChange={(e) => setNewLink({ ...newLink, status: e.target.value })}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button onClick={addLink}>Add New Link</button>
            </div>

            {/* List of social links */}
            <ul>
                {links.map(link => (
                    <li key={link._id}>
                        <span>{link.platform}: {link.url} ({link.status})</span>
                        <button onClick={() => editLink(link._id)}>Edit</button>
                        <button onClick={() => deleteLink(link._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocialLinksManager;
