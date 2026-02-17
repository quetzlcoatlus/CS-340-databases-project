import React, { useState, useEffect } from 'react';

function QualificationsPage() {
    const [quals, setQuals] = useState([]);
    const [formData, setFormData] = useState({ qualificationName: '' });

    // 1. Fetch Data
    useEffect(() => {
        fetch('/api/qualifications')
            .then(res => res.json())
            .then(data => setQuals(data))
            .catch(err => console.error("Error fetching qualifications:", err));
    }, []);

    // 2. Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/qualifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) {
                window.location.reload();
            } else {
                alert("Failed to add qualification.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    // 3. Handle Delete
    const handleDelete = async (id) => {
        if (window.confirm("Delete this qualification?")) {
            await fetch(`/api/qualifications/${id}`, { method: 'DELETE' });
            setQuals(quals.filter(q => q.qualificationID !== id));
        }
    };

    return (
        <div>
            <h2>Manage Qualifications</h2>
            
            <div className="form-container">
                <h3>Add New Qualification</h3>
                <form onSubmit={handleSubmit}>
                    <label>Qualification Name: 
                        <input 
                            type="text" 
                            value={formData.qualificationName} 
                            onChange={e => setFormData({ qualificationName: e.target.value })} 
                            required 
                            placeholder="e.g. USV Operator"
                        />
                    </label>
                    <button type="submit">Add Qualification</button>
                </form>
            </div>

            <div className="table-container">
                <h3>Available Qualifications</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Qualification Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(quals) && quals.map(q => (
                            <tr key={q.qualificationID}>
                                <td>{q.qualificationID}</td>
                                <td>{q.name}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(q.qualificationID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QualificationsPage;