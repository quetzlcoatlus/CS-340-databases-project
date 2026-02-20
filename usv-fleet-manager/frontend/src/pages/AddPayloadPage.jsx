import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPayloadPage() {
    const [formData, setFormData] = useState({ type: '', serialNumber: '', condition: '', installedUSV: '', installationDate: '' });
    const [usvs, setUsvs] = useState([]);
    const navigate = useNavigate();

    // Fetch USVs to populate the "Installed On" dropdown
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
            const response = await fetch('/api/payloads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                navigate('/payloads');
            } else {
                alert("Failed to add Payload.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Add New Payload</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Payload Type</label>
                        <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="e.g., Sonar, Radar, Camera" required />
                    </div>
                    
                    <div className="form-group">
                        <label>Serial Number</label>
                        <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Condition</label>
                        <select name="condition" value={formData.condition} onChange={handleChange} required>
                            <option value="">Select Condition</option>
                            <option value="Operational">Operational</option>
                            <option value="Inoperable">Inoperable</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Installed USV</label>
                        <select name="installedUSV" value={formData.installedUSV} onChange={handleChange}>
                            <option value="">None (Storage)</option>
                            {usvs.map(u => (
                                <option key={u.usvID} value={u.usvID}>{u.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Installation Date</label>
                        <input type="date" name="installationDate" value={formData.installationDate} onChange={handleChange} />
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/payloads')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default AddPayloadPage;