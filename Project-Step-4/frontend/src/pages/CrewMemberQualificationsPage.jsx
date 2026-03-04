import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CrewMembersQualificationsPage() {
    const [crewQuals, setCrewQuals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/crew-qualifications', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                // Format the dates nicely for the table view
                const formattedData = data.map(cq => ({
                    ...cq,
                    earnedDate: cq.earnedDate ? cq.earnedDate.substring(0, 10) : 'N/A'
                }));
                setCrewQuals(formattedData);
            })
            .catch(err => console.error("Error fetching crew qualifications:", err));
    }, []);

    const handleDelete = async (crewMemberQualificationID) => {
        if (!window.confirm("Are you sure you want to remove this qualification from the crew member?")) {
            return;
        }

        try {
            const response = await fetch(`/api/crew-qualifications/${crewMemberQualificationID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setCrewQuals(crewQuals.filter(cq => cq.crewMemberQualificationID !== crewMemberQualificationID));
            } else {
                alert("Failed to remove Qualification.");
            }
        } catch (error) {
            console.error("Error removing qualification:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="table-container">
                
                <div style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '15px', color: '#1a252f' }}>Crew Member Qualifications</h2>
                    <button 
                        onClick={() => navigate('/crew-qualifications/add')} 
                        className="btn-submit" 
                        style={{ width: 'max-content', padding: '10px 20px' }}
                    >
                        + Assign Qualification
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Crew Member</th>
                            <th>Qualification Name</th>
                            <th>Date Earned</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crewQuals.map(cq => (
                            <tr key={cq.crewMemberQualificationID}>
                                <td>{cq.crewMemberQualificationID}</td>
                                <td>{cq.crewName}</td> 
                                <td>{cq.qualName}</td>
                                <td>{cq.earnedDate}</td>
                                <td>
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDelete(cq.crewMemberQualificationID)}
                                        style={{ margin: 0 }}
                                    >
                                        Remove
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

export default CrewMembersQualificationsPage;