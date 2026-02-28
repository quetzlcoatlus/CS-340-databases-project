import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddQualificationPage() {
    const [formData, setFormData] = useState({ name: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/qualifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                navigate('/qualifications'); // Redirect back to the table
            } else {
                alert("Failed to add Qualification.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Add New Qualification</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Qualification Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="e.g., Sonar Operator, Helmsman" 
                            required 
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/qualifications')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default AddQualificationPage;