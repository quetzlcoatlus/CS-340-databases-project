import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUSVPage() {
    const [formData, setFormData] = useState({ name: '', class: '', status: '', missionID: '' });
    const [missions, setMissions] = useState([]);
    const navigate = useNavigate(); // This lets us redirect the user

    // Fetch missions for the dropdown
    useEffect(() => {
        fetch('/api/missions')
            .then(res => res.json())
            .then(data => setMissions(data))
            .catch(err => console.error("Error fetching missions:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/usvs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Success! Send the user back to the main USVs table
                navigate('/usvs'); 
            } else {
                alert("Failed to add USV.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

   return (
        <div className="page-container">
            <div className="form-card">
                <h2>Add New USV</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Class</label>
                        <input type="text" name="class" value={formData.class} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} required>
                            <option value="">Select Status</option>
                            <option value="Deployed">Deployed</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Training">Training</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Assigned Mission</label>
                        <select name="missionID" value={formData.missionID} onChange={handleChange}>
                            <option value="">None (Unassigned)</option>
                            {missions.map(m => (
                                <option key={m.missionID} value={m.missionID}>{m.title}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/usvs')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default AddUSVPage;