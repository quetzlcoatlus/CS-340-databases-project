import React, { useState } from 'react';

function MissionsPage() {
    const [missions] = useState([
        { missionID: 1, title: 'Silent Aegis', location: 'South China Sea', priorityLevel: 3 },
        { missionID: 2, title: 'Swift Talon', location: 'Red Sea', priorityLevel: 1 },
        { missionID: 3, title: 'Pacific Watch', location: 'Hawaiian Islands', priorityLevel: 2 }
    ]);
    const [formData, setFormData] = useState({ title: '', location: '', priorityLevel: '' });

    return (
        <div>
            <h2>Active Missions</h2>
            <div className="form-container">
                <h3>Create New Mission</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>Title: <input type="text" onChange={e => setFormData({...formData, title: e.target.value})} /></label>
                    <label>Location: <input type="text" onChange={e => setFormData({...formData, location: e.target.value})} /></label>
                    <label>Priority: 
                        <select onChange={e => setFormData({...formData, priorityLevel: e.target.value})}>
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
                <h3>Mission Log</h3>
                <table>
                    <thead>
                        <tr><th>ID</th><th>Title</th><th>Location</th><th>Priority</th></tr>
                    </thead>
                    <tbody>
                        {missions.map(m => (
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