import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MissionsPage() {
    const [missions, setMissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/missions')
            .then(res => res.json())
            .then(data => setMissions(data))
            .catch(err => console.error("Error fetching missions:", err));
    }, []);

    return (
        <div className="page-container">
            <div className="table-container">
                
                <div style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '15px', color: '#1a252f' }}>Active Missions</h2>
                    <button 
                        onClick={() => navigate('/missions/add')} 
                        className="btn-submit" 
                        style={{ width: 'max-content', padding: '10px 20px' }}
                    >
                        + Add New Mission
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missions.map(m => (
                            <tr key={m.missionID}>
                                <td>{m.missionID}</td>
                                <td>{m.title}</td>
                                <td>{m.location}</td>
                                <td>{m.priorityTitle}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MissionsPage;