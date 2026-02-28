import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCrewMemberQualificationPage() {
    const [formData, setFormData] = useState({ crewMemberID: '', qualificationID: '', earnedDate: '' });
    const [crew, setCrew] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/crew')
            .then(res => res.json())
            .then(data => setCrew(data))
            .catch(err => console.error("Error fetching crew:", err));

        fetch('/api/qualifications')
            .then(res => res.json())
            .then(data => setQualifications(data))
            .catch(err => console.error("Error fetching qualifications:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/crew-qualifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                navigate('/crew-qualifications'); 
            } else {
                alert("Failed to assign Qualification.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <h2>Assign Qualification</h2>
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Crew Member</label>
                        <select name="crewMemberID" value={formData.crewMemberID} onChange={handleChange} required>
                            <option value="">Select Crew Member</option>
                            {crew.map(c => (
                                <option key={c.crewMemberID} value={c.crewMemberID}>
                                    {c.firstName} {c.lastName} ({c.rank})
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Qualification</label>
                        <select name="qualificationID" value={formData.qualificationID} onChange={handleChange} required>
                            <option value="">Select Qualification</option>
                            {qualifications.map(q => (
                                <option key={q.qualificationID} value={q.qualificationID}>
                                    {q.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* New Earned Date Input */}
                    <div className="form-group">
                        <label>Date Earned</label>
                        <input 
                            type="date" 
                            name="earnedDate" 
                            value={formData.earnedDate} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/crew-qualifications')}>Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default AddCrewMemberQualificationPage;