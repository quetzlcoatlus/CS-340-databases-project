import React, { useState, useEffect } from 'react';

function USVsPage() {
    const [usvs, setUSVs] = useState([]);
    const [missions, setMissions] = useState([]); 
    
    // State to track if we are editing a specific USV ID (null = creating new)
    const [editingUSV, setEditingUSV] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        class: '',
        status: '',
        missionID: ''
    });

    useEffect(() => {
        fetch('/api/usvs')
            .then(res => res.json())
            .then(data => setUSVs(data))
            .catch(err => console.error("Error fetching USVs:", err));

        fetch('/api/missions') 
            .then(res => res.json())
            .then(data => setMissions(data))
            .catch(err => console.error("Error fetching Missions:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Decide URL and Method based on if we are editing
        const url = editingUSV ? `/api/usvs/${editingUSV}` : '/api/usvs';
        const method = editingUSV ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.status === 200 || response.status === 201) {
                window.location.reload();
            } else {
                alert("Failed to save USV.");
            }
        } catch (error) {
            console.error("Error saving USV:", error);
        }
    };

    const handleEdit = (usv) => {
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Set the ID we are editing
        setEditingUSV(usv.usvID);
        
        // Populate the form with this USV's data
        setFormData({
            name: usv.name,
            class: usv.class,
            status: usv.status,
            missionID: usv.missionID || '' // Handle nulls safely
        });
    };

    const handleCancelEdit = () => {
        setEditingUSV(null);
        setFormData({ name: '', class: '', status: '', missionID: '' });
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this USV?")) {
            try {
                await fetch(`/api/usvs/${id}`, { method: 'DELETE' });
                setUSVs(usvs.filter(item => item.usvID !== id));
            } catch (error) {
                console.error("Error deleting USV:", error);
            }
        }
    };

    return (
        <div>
            <h2>Manage USVs</h2>

            <div className="form-container">
                <h3>{editingUSV ? "Edit USV" : "Add New USV"}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Name: 
                        <input type="text" 
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                            value={formData.name} required />
                    </label>

                    <label>Class: 
                        <input type="text" 
                            onChange={e => setFormData({...formData, class: e.target.value})} 
                            value={formData.class} required />
                    </label>

                    <label>Status: 
                        <select onChange={e => setFormData({...formData, status: e.target.value})} value={formData.status} required>
                            <option value="">Select Status</option>
                            <option value="Deployed">Deployed</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Training">Training</option>
                        </select>
                    </label>

                    <label>Current Mission:
                        <select onChange={e => setFormData({...formData, missionID: e.target.value})} value={formData.missionID}>
                            <option value="">None / Unassigned</option>
                            {Array.isArray(missions) && missions.map(mission => (
                                <option key={mission.missionID} value={mission.missionID}>
                                    {mission.title}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">{editingUSV ? "Update USV" : "Add USV"}</button>
                    
                    {/* Show Cancel button only when editing */}
                    {editingUSV && (
                        <button type="button" onClick={handleCancelEdit} style={{backgroundColor: '#6c757d', marginTop: '10px'}}>
                            Cancel Edit
                        </button>
                    )}
                </form>
            </div>

            <div className="table-container">
                <h3>Current Fleet</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Status</th>
                            <th>Mission</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(usvs) && usvs.map(usv => (
                            <tr key={usv.usvID}>
                                <td>{usv.usvID}</td>
                                <td>{usv.name}</td>
                                <td>{usv.class}</td>
                                <td>{usv.status}</td>
                                <td>{usv.missionTitle || "None"}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(usv.usvID)}>Delete</button>
                                    <button onClick={() => handleEdit(usv)}>Edit</button> 
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