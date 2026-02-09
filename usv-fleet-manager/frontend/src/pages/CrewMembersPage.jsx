import React, { useState } from 'react';

function CrewMembersPage() {
    const [crew] = useState([
        { crewMemberID: 1, firstName: 'Marcus', lastName: 'Thorne', rank: 'O-3', usvID: 1, usvName: 'Sentinel' },
        { crewMemberID: 2, firstName: 'Sarah', lastName: 'Jenkins', rank: 'RW1', usvID: 1, usvName: 'Sentinel' },
        { crewMemberID: 3, firstName: 'Felipe', lastName: 'Torres', rank: 'ET2', usvID: 1, usvName: 'Sentinel' },
        { crewMemberID: 4, firstName: 'Davis', lastName: 'Miller', rank: 'O-3', usvID: 2, usvName: 'Striker' },
        { crewMemberID: 5, firstName: 'James', lastName: 'Shaw', rank: 'ET1', usvID: 2, usvName: 'Striker' },
        { crewMemberID: 6, firstName: 'Maya', lastName: 'Rodriguez', rank: 'RW2', usvID: 2, usvName: 'Striker' },
        { crewMemberID: 7, firstName: 'Christopher', lastName: 'Evans', rank: 'O-3', usvID: 3, usvName: 'Wraith' },
        { crewMemberID: 8, firstName: 'Liam', lastName: 'Foster', rank: 'RW1', usvID: 3, usvName: 'Wraith' },
        { crewMemberID: 9, firstName: 'Samantha', lastName: 'Reed', rank: 'RW2', usvID: 3, usvName: 'Wraith' },
        { crewMemberID: 10, firstName: 'Hannah', lastName: 'White', rank: 'O-3', usvID: 4, usvName: 'Ghost' },
        { crewMemberID: 11, firstName: 'Caleb', lastName: 'Wright', rank: 'ET1', usvID: 4, usvName: 'Ghost' },
        { crewMemberID: 12, firstName: 'Sophia', lastName: 'Morales', rank: 'ET2', usvID: 4, usvName: 'Ghost' },
        { crewMemberID: 13, firstName: 'Michael', lastName: 'Sterling', rank: 'O-3', usvID: 5, usvName: 'Raider' },
        { crewMemberID: 14, firstName: 'Aaron', lastName: 'Choi', rank: 'RW1', usvID: 5, usvName: 'Raider' },
        { crewMemberID: 15, firstName: 'Ryan', lastName: 'Bennett', rank: 'RW2', usvID: 5, usvName: 'Raider' }
    ]);
    const [usvs] = useState([
        { usvID: 1, name: 'Sentinel' }, 
        { usvID: 2, name: 'Striker' },
        { usvID: 3, name: 'Wraith' }, 
        { usvID: 4, name: 'Ghost' },
        { usvID: 5, name: 'Raider' }
    ]);
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