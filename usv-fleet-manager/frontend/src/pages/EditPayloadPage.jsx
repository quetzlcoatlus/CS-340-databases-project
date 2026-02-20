import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPayloadPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ type: '', serialNumber: '', condition: '', installedUSV: '', installationDate: '' });
    const [usvs, setUsvs] = useState([]);

    useEffect(() => {
        // 1. Fetch USVs for dropdown
        fetch('/api/usvs')
            .then(res => res.json())
            .then(data => setUsvs(data))
            .catch(err => console.error("Error fetching USVs:", err));

        // 2. Fetch current payload data to pre-fill
        fetch('/api/payloads')
            .then(res => res.json())
            .then(data => {
                const currentPayload = data.find(p => p.payloadID === parseInt(id));
                if (currentPayload) {
                    // HTML date inputs require strictly 'YYYY-MM-DD' format.
                    // We slice the first 10 characters to ensure it fits perfectly if a timestamp is returned.
                    const formattedDate = currentPayload.installationDate ? currentPayload.installationDate.substring(0, 10) : '';

                    setFormData({
                        type: currentPayload.type,
                        serialNumber: currentPayload.serialNumber,
                        condition: currentPayload.condition,
                        installedUSV: currentPayload.installedUSV || '',
                        installationDate: formattedDate
                    });
                }
            })
            .catch(err => console.error("Error fetching Payload:", err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/payloads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                navigate('/payloads');
            } else {
                alert("Failed to update Payload.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Edit Payload</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Payload Type</label>
                        <input type="text" name="type" value={formData.type} onChange={handleChange} required />
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
                            <option value="Maintenance">Maintenance</option>
                            <option value="Damaged">Damaged</option>
                            <option value="Storage">Storage</option>
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
                        <button type="submit" className="btn-submit">Save Changes</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/payloads')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default EditPayloadPage;