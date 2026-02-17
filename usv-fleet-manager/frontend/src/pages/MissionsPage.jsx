import React, { useState, useEffect } from 'react';

function MissionsPage() {
    const [missions, setMissions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        priorityLevel: '' 
    });

    useEffect(() => {
        fetch('/api/missions')
            .then(res => res.json())
            .then(data => setMissions(data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/missions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if(response.status === 201) window.location.reload();
    };

    return (
        <div>
            <h2>Active Missions</h2>
            
            <div className="form-container">
                <h3>Create New Mission</h3>
                <form onSubmit={handleSubmit}>
                    <label>Title: 
                        <input type="text" onChange={e => setFormData({...formData, title: e.target.value})} required />
                    </label>
                    <label>Location: 
                        <input type="text" onChange={e => setFormData({...formData, location: e.target.value})} required />
                    </label>
                    
                    <label>Priority: 
                        <select onChange={e => setFormData({...formData, priorityLevel: e.target.value})} required>
                            <option value="">Select Priority</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </label>
                    
                    <button type="submit">Create Mission</button>
                </form>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Title</th><th>Location</th><th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(missions) && missions.map(m => (
                            <tr key={m.missionID}>
                                <td>{m.missionID}</td>
                                <td>{m.title}</td>
                                <td>{m.location}</td>
                                <td>{m.priorityLevel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MissionsPage;