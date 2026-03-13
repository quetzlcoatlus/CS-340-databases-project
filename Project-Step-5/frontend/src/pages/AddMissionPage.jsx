import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMissionPage() {
    const [formData, setFormData] = useState({ title: '', location: '', priorityLevel: '' });
    const [priorities, setPriorities] = useState([]);
    const navigate = useNavigate();

    // Fetch Priority Levels to populate the dropdown
    useEffect(() => {
        fetch('/api/priorities')
            .then(res => res.json())
            .then(data => setPriorities(data))
            .catch(err => console.error("Error fetching priorities:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/missions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                navigate('/missions'); // Redirect back to the table
            } else {
                alert("Failed to add Mission.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Add New Mission</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Mission Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Priority Level</label>
                        <select name="priorityLevel" value={formData.priorityLevel} onChange={handleChange} required>
                            <option value="">Select Priority</option>
                            {priorities.map(p => (
                                <option key={p.priorityLevel} value={p.priorityLevel}>{p.title}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/missions')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default AddMissionPage;