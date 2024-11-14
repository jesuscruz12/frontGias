import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SocialLinksManager.css';

const SocialLinksManager = () => {
    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState({ platform: '', url: '', status: 'active' });

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('https://backendgias.onrender.com/api/social-links');
                setLinks(response.data);
            } catch (error) {
                console.error('Error fetching social links:', error);
            }
        };

        fetchLinks();
    }, []);

    const addLink = async () => {
        try {
            const response = await axios.post('https://backendgias.onrender.com/api/social-links', newLink);
            setLinks([...links, response.data]);
            setNewLink({ platform: '', url: '', status: 'active' });
        } catch (error) {
            console.error('Error adding social link:', error);
        }
    };

    const editLink = async (id) => {
        try {
            const response = await axios.put(`https://backendgias.onrender.com/api/social-links/${id}`, newLink);
            setLinks(links.map(link => link._id === id ? response.data : link));
        } catch (error) {
            console.error('Error editing social link:', error);
        }
    };

    const deleteLink = async (id) => {
        try {
            await axios.delete(`https://backendgias.onrender.com/api/social-links/${id}`);
            setLinks(links.filter(link => link._id !== id));
        } catch (error) {
            console.error('Error deleting social link:', error);
        }
    };

    return (
        <div className="social-links-container">
            <h2>Redes Sociales</h2>
            <div className="social-form">
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

            <ul className="social-links-list">
                {links.map(link => (
                    <li key={link._id}>
                        <span>{link.platform}: {link.url} ({link.status})</span>
                        <div>
                            <button className="edit-button" onClick={() => editLink(link._id)}>Edit</button>
                            <button onClick={() => deleteLink(link._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocialLinksManager;
