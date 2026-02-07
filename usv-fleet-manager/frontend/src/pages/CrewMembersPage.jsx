import React, { useState } from 'react';

function CrewMembersPage() {
    const [crew] = useState([]);
    const [usvs] = useState([]);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', rank: '', usvID: '' });

    return (
        <div>
            <h2>Manage Crew Members</h2>
            
            <div className="form-container">
                <h3>Add New Crew Member</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>First Name: <input type="text" onChange={e => setFormData({...formData, firstName: e.target.value})} /></label>
                    <label>Last Name: <input type="text" onChange={e => setFormData({...formData, lastName: e.target.value})} /></label>
                    <label>Rank: <input type="text" onChange={e => setFormData({...formData, rank: e.target.value})} /></label>
                    <label>Assigned USV: 
                        <select onChange={e => setFormData({...formData, usvID: e.target.value})}>
                            <option value="">Unassigned</option>
                            {usvs.map(usv => <option key={usv.usvID} value={usv.usvID}>{usv.name}</option>)}
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
                            <th>ID</th><th>First Name</th><th>Last Name</th><th>Rank</th><th>Assigned USV</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crew.map(member => (
                            <tr key={member.crewMemberID}>
                                <td>{member.crewMemberID}</td>
                                <td>{member.firstName}</td>
                                <td>{member.lastName}</td>
                                <td>{member.rank}</td>
                                <td>{member.usvName}</td>
                                <td><button className="delete-btn">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CrewMembersPage;