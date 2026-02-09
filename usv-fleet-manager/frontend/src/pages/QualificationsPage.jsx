import React, { useState } from 'react';

function QualificationsPage() {
    const [quals] = useState([
        { qualificationID: 1, name: 'USV Craft Master' },
        { qualificationID: 2, name: 'USV Supervisor' },
        { qualificationID: 3, name: 'USV Operator' }
    ]);
    const [formData, setFormData] = useState({ name: '' });

    return (
        <div>
            <h2>Manage Qualifications</h2>
            <div className="form-container">
                <h3>Add New Qualification</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>Qualification Name: <input type="text" onChange={e => setFormData({...formData, name: e.target.value})} /></label>
                    <button type="submit">Add Qualification</button>
                </form>
            </div>

            <div className="table-container">
                <h3>Available Certifications</h3>
                <table>
                    <thead>
                        <tr><th>ID</th><th>Qualification Name</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {quals.map(q => (
                            <tr key={q.qualificationID}>
                                <td>{q.qualificationID}</td>
                                <td>{q.name}</td>
                                <td><button className="delete-btn">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QualificationsPage;