import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function USVsPage() {
    const [usvs, setUSVs] = useState([]);
    const [missions, setMissions] = useState([]);
    const navigate = useNavigate();
    
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

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this USV? This action cannot be undone.")) {
            try {
                await fetch(`/api/usvs/${id}`, { method: 'DELETE' });
                setUSVs(usvs.filter(item => item.usvID !== id));
            } catch (error) {
                console.error("Error deleting USV:", error);
            }
        }
    };

    return (
        <div className="page-container">
            <div className="table-container">
            
                <div style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>USV Fleet</h2>
                    <button 
                        onClick={() => navigate('/usvs/add')} 
                        className="btn-submit" 
                        style={{ width: 'max-content', padding: '10px 20px' }}
                    >
                        + Add New USV
                    </button>
                </div>

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
                    {usvs.map(usv => (
                        <tr key={usv.usvID}>
                            <td>{usv.usvID}</td>
                            <td>{usv.name}</td>
                            <td>{usv.class}</td>
                            <td>{usv.status}</td>
                            <td>{usv.missionTitle}</td>
                            <td>
                                <button 
                                    className="btn-edit"
                                    onClick={() => navigate(`/usvs/edit/${usv.usvID}`)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn-delete" 
                                    onClick={() => handleDelete(usv.usvID)}
                                >
                                    Delete
                                </button>
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