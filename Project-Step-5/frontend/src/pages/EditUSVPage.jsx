import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditUSVPage() {
    const { id } = useParams(); // Grabs the USV ID from the URL
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ name: '', class: '', status: '', missionID: '' });
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        // 1. Fetch missions for the dropdown
        fetch('/api/missions')
            .then(res => res.json())
            .then(data => setMissions(data))
            .catch(err => console.error("Error fetching missions:", err));

        // 2. Fetch the current USV data to pre-fill the form
        fetch('/api/usvs')
            .then(res => res.json())
            .then(data => {
                // Find the specific USV from the list
                const currentUSV = data.find(u => u.usvID === parseInt(id));
                if (currentUSV) {
                    setFormData({
                        name: currentUSV.name,
                        class: currentUSV.class,
                        status: currentUSV.status,
                        missionID: currentUSV.missionID || '' // Convert null to empty string for the select menu
                    });
                }
            })
            .catch(err => console.error("Error fetching USV:", err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use PUT instead of POST, and append the ID to the URL
            const response = await fetch(`/api/usvs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                navigate('/usvs'); // Send them back to the table
            } else {
                alert("Failed to update USV.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Edit USV</h2>
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
                        <button type="submit" className="btn-submit">Save Changes</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/usvs')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default EditUSVPage;