import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CrewMembersPage() {
    const [crew, setCrew] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/crew', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => setCrew(data))
            .catch(err => console.error("Error fetching crew:", err));
    }, []);

    const handleDelete = async (crewMemberID) => {
        if (!window.confirm("Are you sure you want to delete this Crew Member?")) {
            return;
        }

        try {
            const response = await fetch(`/api/crew/${crewMemberID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Remove the deleted member from the table instantly
                setCrew(crew.filter(c => c.crewMemberID !== crewMemberID));
            } else {
                alert("Failed to delete the Crew Member.");
            }
        } catch (error) {
            console.error("Error deleting crew member:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="table-container">
                
                <div style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '15px', color: '#1a252f' }}>Crew Members</h2>
                    <button 
                        onClick={() => navigate('/crew/add')} 
                        className="btn-submit" 
                        style={{ width: 'max-content', padding: '10px 20px' }}
                    >
                        + Add Crew Member
                    </button>
                </div>

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
                        {crew.map(c => (
                            <tr key={c.crewMemberID}>
                                <td>{c.crewMemberID}</td>
                                <td>{c.firstName}</td>
                                <td>{c.lastName}</td>
                                <td>{c.rank}</td>
                                <td>{c.usvName}</td>
                                <td>
                                    {/* Edit Button can go here we you decide to add a PUT route later! */}
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => handleDelete(c.crewMemberID)}
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

export default CrewMembersPage;