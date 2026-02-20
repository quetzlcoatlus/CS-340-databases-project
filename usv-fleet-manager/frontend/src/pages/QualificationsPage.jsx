import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QualificationsPage() {
    const [qualifications, setQualifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/qualifications')
            .then(res => res.json())
            .then(data => setQualifications(data))
            .catch(err => console.error("Error fetching qualifications:", err));
    }, []);

    const handleDelete = async (qualificationID) => {
        if (!window.confirm("Are you sure you want to delete this Qualification?")) {
            return;
        }

        try {
            const response = await fetch(`/api/qualifications/${qualificationID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the deleted qualification from the table instantly
                setQualifications(qualifications.filter(q => q.qualificationID !== qualificationID));
            } else {
                alert("Failed to delete the Qualification.");
            }
        } catch (error) {
            console.error("Error deleting qualification:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="table-container">
                
                <div style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '15px', color: '#1a252f' }}>Qualifications</h2>
                    <button 
                        onClick={() => navigate('/qualifications/add')} 
                        className="btn-submit" 
                        style={{ width: 'max-content', padding: '10px 20px' }}
                    >
                        + Add New Qualification
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Qualification Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {qualifications.map(q => (
                            <tr key={q.qualificationID}>
                                <td>{q.qualificationID}</td>
                                <td>{q.name}</td>
                                <td>
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDelete(q.qualificationID)}
                                        style={{ margin: 0 }} /* Removed margin since it's the only button */
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

export default QualificationsPage;