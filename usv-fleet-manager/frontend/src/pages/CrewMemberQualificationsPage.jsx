import React, { useState, useEffect } from 'react';

function CrewMemberQualificationsPage() {
    const [assignments, setAssignments] = useState([]);
    const [crew, setCrew] = useState([]);
    const [quals, setQuals] = useState([]);
    
    const [formData, setFormData] = useState({ 
        crewMemberID: '', 
        qualificationID: '', 
        earnedDate: '' 
    });

    useEffect(() => {
        // Fetch the Intersection Table Data
        fetch('/api/crew-qualifications')
            .then(res => res.json())
            .then(data => setAssignments(data))
            .catch(err => console.error("Error fetching assignments:", err));

        // Fetch Crew for Dropdown
        fetch('/api/crew')
            .then(res => res.json())
            .then(data => setCrew(data))
            .catch(err => console.error(err));

        // Fetch Qualifications for Dropdown
        fetch('/api/qualifications')
            .then(res => res.json())
            .then(data => setQuals(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/crew-qualifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                window.location.reload();
            } else {
                alert("Failed to assign qualification.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Remove this certification from the crew member?")) {
            await fetch(`/api/crew-qualifications/${id}`, { method: 'DELETE' });
            setAssignments(assignments.filter(a => a.crewMemberQualificationID !== id));
        }
    };

    return (
        <div>
            <h2>Crew Qualifications (M:M)</h2>
            
            <div className="form-container">
                <h3>Assign Qualification</h3>
                <form onSubmit={handleSubmit}>
                    
                    {/* Crew Dropdown */}
                    <label>Crew Member: 
                        <select 
                            onChange={e => setFormData({...formData, crewMemberID: e.target.value})} 
                            value={formData.crewMemberID}
                            required
                        >
                            <option value="">Select Crew Member</option>
                            {Array.isArray(crew) && crew.map(c => (
                                <option key={c.crewMemberID} value={c.crewMemberID}>
                                    {c.firstName} {c.lastName}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Qualification Dropdown */}
                    <label>Qualification: 
                        <select 
                            onChange={e => setFormData({...formData, qualificationID: e.target.value})} 
                            value={formData.qualificationID}
                            required
                        >
                            <option value="">Select Qualification</option>
                            {Array.isArray(quals) && quals.map(q => (
                                <option key={q.qualificationID} value={q.qualificationID}>
                                    {/* DDL uses 'name' for the qualification title */}
                                    {q.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Date Input */}
                    <label>Date Earned: 
                        <input 
                            type="date" 
                            onChange={e => setFormData({...formData, earnedDate: e.target.value})} 
                            value={formData.earnedDate}
                            required 
                        />
                    </label>
                    
                    <button type="submit">Assign Certification</button>
                </form>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Crew Member</th>
                            <th>Qualification</th>
                            <th>Date Earned</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(assignments) && assignments.map(a => (
                            <tr key={a.crewMemberQualificationID}>
                                <td>{a.crewMemberQualificationID}</td>
                                <td>{a.firstName} {a.lastName}</td>
                                <td>{a.qualificationName}</td>
                                <td>{a.earnedDate ? a.earnedDate.split('T')[0] : "N/A"}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(a.crewMemberQualificationID)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CrewMemberQualificationsPage;