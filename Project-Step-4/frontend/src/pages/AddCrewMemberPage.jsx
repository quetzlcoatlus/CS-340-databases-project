import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCrewMemberPage() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', rank: '', usvID: '' });
    const [usvs, setUsvs] = useState([]);
    const navigate = useNavigate();

    // Fetch USVs to populate the assignment dropdown
    useEffect(() => {
        fetch('/api/usvs')
            .then(res => res.json())
            .then(data => setUsvs(data))
            .catch(err => console.error("Error fetching USVs:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/crew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                navigate('/crew'); // Redirect back to the table
            } else {
                alert("Failed to add Crew Member.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Add New Crew Member</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Rank / Rate</label>
                        <input type="text" name="rank" value={formData.rank} onChange={handleChange} placeholder="e.g., E6, STG2" required />
                    </div>
                    
                    <div className="form-group">
                        <label>Assigned USV</label>
                        <select name="usvID" value={formData.usvID} onChange={handleChange}>
                            <option value="">None (Unassigned)</option>
                            {usvs.map(u => (
                                <option key={u.usvID} value={u.usvID}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/crew')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default AddCrewMemberPage;