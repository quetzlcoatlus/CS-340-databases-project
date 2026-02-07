import React, { useState } from 'react';

function USVsPage() {
    // Empty initial state
    const [usvs] = useState([]);
    const [missions] = useState([]); 
    
    // UI States
    const [editingUSV, setEditingUSV] = useState(null);
    const [formData, setFormData] = useState({ name: '', class: '', status: '', missionID: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form submitted (No action taken)");
    };

    return (
        <div>
            <h2>Manage USVs</h2>

            <div className="form-container">
                <h3>{editingUSV ? "Edit USV" : "Add New USV"}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Name: 
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </label>

                    <label>Class: 
                        <input type="text" value={formData.class} onChange={e => setFormData({...formData, class: e.target.value})} />
                    </label>

                    <label>Status: 
                        <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                            <option value="">Select Status</option>
                            <option value="Deployed">Deployed</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Training">Training</option>
                        </select>
                    </label>

                    <label>Current Mission:
                        <select value={formData.missionID} onChange={e => setFormData({...formData, missionID: e.target.value})}>
                            <option value="">None / Unassigned</option>
                            {missions.map(mission => (
                                <option key={mission.missionID} value={mission.missionID}>{mission.title}</option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">{editingUSV ? "Update USV" : "Add USV"}</button>
                    {editingUSV && <button type="button" onClick={() => setEditingUSV(null)} style={{marginTop: '10px', backgroundColor: '#666'}}>Cancel Edit</button>}
                </form>
            </div>

            <div className="table-container">
                <h3>Current Fleet</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Name</th><th>Class</th><th>Status</th><th>Mission</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Empty Table Body */}
                        {usvs.map(usv => (
                            <tr key={usv.usvID}>
                                <td>{usv.usvID}</td>
                                <td>{usv.name}</td>
                                <td>{usv.class}</td>
                                <td>{usv.status}</td>
                                <td>{usv.missionTitle}</td>
                                <td>
                                    <button className="delete-btn">Delete</button>
                                    <button className="edit-btn">Edit</button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default USVsPage;