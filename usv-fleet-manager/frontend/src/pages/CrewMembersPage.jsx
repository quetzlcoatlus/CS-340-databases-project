// frontend/src/pages/CrewMembersPage.jsx
import React, { useState, useEffect } from 'react';

function CrewMembersPage() {
    const [crew, setCrew] = useState([]);
    const [usvs, setUSVs] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        rank: '',
        usvID: ''
    });

    useEffect(() => {
        fetch('/api/crew')
            .then(res => res.json())
            .then(data => setCrew(data))
            .catch(err => console.error(err));
        
        fetch('/api/usvs')
            .then(res => res.json())
            .then(data => setUSVs(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/crew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.status === 201) window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Delete this crew member?")) {
            await fetch(`/api/crew/${id}`, { method: 'DELETE' });
            setCrew(crew.filter(c => c.crewMemberID !== id));
        }
    };

    return (
        <div>
            <h2>Manage Crew Members</h2>
            
            <div className="form-container">
                <h3>Add New Crew Member</h3>
                <form onSubmit={handleSubmit}>
                    <label>First Name: 
                        <input type="text" onChange={e => setFormData({...formData, firstName: e.target.value})} required />
                    </label>
                    <label>Last Name: 
                        <input type="text" onChange={e => setFormData({...formData, lastName: e.target.value})} required />
                    </label>
                    <label>Rank: 
                        <input type="text" onChange={e => setFormData({...formData, rank: e.target.value})} required />
                    </label>
                    <label>Assigned USV: 
                        <select onChange={e => setFormData({...formData, usvID: e.target.value})}>
                            <option value="">Unassigned</option>
                            {Array.isArray(usvs) && usvs.map(usv => (
                                <option key={usv.usvID} value={usv.usvID}>
                                    {usv.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Add Crew Member</button>
                </form>
            </div>

            <div className="table-container">
                <h3>Current Roster</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Rank</th>
                            <th>Assigned USV</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(crew) && crew.map(member => (
                            <tr key={member.crewMemberID}>
                                <td>{member.crewMemberID}</td>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.rank}</td>
                                <td>{member.usvName || "None"}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(member.crewMemberID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CrewMembersPage;