import React, { useState } from 'react';

function CrewMemberQualificationsPage() {
    const [assignments] = useState([
        { crewMemberQualificationID: 1, firstName: 'Marcus', lastName: 'Thorne', qualificationName: 'USV Craft Master', earnedDate: '2024-10-01' },
        { crewMemberQualificationID: 2, firstName: 'Marcus', lastName: 'Thorne', qualificationName: 'USV Supervisor', earnedDate: '2024-06-01' },
        { crewMemberQualificationID: 3, firstName: 'Marcus', lastName: 'Thorne', qualificationName: 'USV Operator', earnedDate: '2024-03-01' },
        { crewMemberQualificationID: 4, firstName: 'Sarah', lastName: 'Jenkins', qualificationName: 'USV Supervisor', earnedDate: '2024-12-01' },
        { crewMemberQualificationID: 5, firstName: 'Sarah', lastName: 'Jenkins', qualificationName: 'USV Operator', earnedDate: '2024-08-01' },
        { crewMemberQualificationID: 6, firstName: 'Felipe', lastName: 'Torres', qualificationName: 'USV Operator', earnedDate: '2025-08-20' },
        { crewMemberQualificationID: 7, firstName: 'Davis', lastName: 'Miller', qualificationName: 'USV Craft Master', earnedDate: '2024-10-01' },
        { crewMemberQualificationID: 8, firstName: 'Davis', lastName: 'Miller', qualificationName: 'USV Supervisor', earnedDate: '2024-06-01' },
        { crewMemberQualificationID: 9, firstName: 'Davis', lastName: 'Miller', qualificationName: 'USV Operator', earnedDate: '2024-03-01' },
        { crewMemberQualificationID: 10, firstName: 'James', lastName: 'Shaw', qualificationName: 'USV Supervisor', earnedDate: '2024-12-01' },
        { crewMemberQualificationID: 11, firstName: 'James', lastName: 'Shaw', qualificationName: 'USV Operator', earnedDate: '2024-08-01' },
        { crewMemberQualificationID: 12, firstName: 'Christopher', lastName: 'Evans', qualificationName: 'USV Craft Master', earnedDate: '2024-10-01' },
        { crewMemberQualificationID: 13, firstName: 'Christopher', lastName: 'Evans', qualificationName: 'USV Supervisor', earnedDate: '2024-06-01' },
        { crewMemberQualificationID: 14, firstName: 'Christopher', lastName: 'Evans', qualificationName: 'USV Operator', earnedDate: '2024-03-01' },
        { crewMemberQualificationID: 15, firstName: 'Liam', lastName: 'Foster', qualificationName: 'USV Supervisor', earnedDate: '2024-12-01' },
        { crewMemberQualificationID: 16, firstName: 'Liam', lastName: 'Foster', qualificationName: 'USV Operator', earnedDate: '2024-08-01' },
        { crewMemberQualificationID: 17, firstName: 'Samantha', lastName: 'Reed', qualificationName: 'USV Operator', earnedDate: '2025-08-20' },
        { crewMemberQualificationID: 18, firstName: 'Hannah', lastName: 'White', qualificationName: 'USV Craft Master', earnedDate: '2024-10-01' },
        { crewMemberQualificationID: 19, firstName: 'Hannah', lastName: 'White', qualificationName: 'USV Supervisor', earnedDate: '2024-06-01' },
        { crewMemberQualificationID: 20, firstName: 'Hannah', lastName: 'White', qualificationName: 'USV Operator', earnedDate: '2024-03-01' },
        { crewMemberQualificationID: 21, firstName: 'Caleb', lastName: 'Wright', qualificationName: 'USV Supervisor', earnedDate: '2024-12-01' },
        { crewMemberQualificationID: 22, firstName: 'Caleb', lastName: 'Wright', qualificationName: 'USV Operator', earnedDate: '2024-08-01' },
        { crewMemberQualificationID: 23, firstName: 'Michael', lastName: 'Sterling', qualificationName: 'USV Craft Master', earnedDate: '2024-10-01' },
        { crewMemberQualificationID: 24, firstName: 'Michael', lastName: 'Sterling', qualificationName: 'USV Supervisor', earnedDate: '2024-06-01' },
        { crewMemberQualificationID: 25, firstName: 'Michael', lastName: 'Sterling', qualificationName: 'USV Operator', earnedDate: '2024-03-01' },
        { crewMemberQualificationID: 26, firstName: 'Aaron', lastName: 'Choi', qualificationName: 'USV Supervisor', earnedDate: '2024-12-01' },
        { crewMemberQualificationID: 27, firstName: 'Aaron', lastName: 'Choi', qualificationName: 'USV Operator', earnedDate: '2024-08-01' }
    ]);
    const [crew] = useState([
        { id: 1, name: 'Marcus Thorne' }, 
        { id: 2, name: 'Sarah Jenkins' }, 
        { id: 3, name: 'Felipe Torres' }, 
        { id: 4, name: 'Davis Miller' },
        { id: 5, name: 'James Shaw' }, 
        { id: 6, name: 'Maya Rodriguez' },
        { id: 7, name: 'Christopher Evans' }, 
        { id: 8, name: 'Liam Foster' },
        { id: 9, name: 'Samantha Reed' }, 
        { id: 10, name: 'Hannah White' },
        { id: 11, name: 'Caleb Wright' }, 
        { id: 12, name: 'Sophia Morales' },
        { id: 13, name: 'Michael Sterling' }, 
        { id: 14, name: 'Aaron Choi' },
        { id: 15, name: 'Ryan Bennett' }
    ]);
    const [quals] = useState([
        { id: 1, name: 'USV Craft Master' },
        { id: 2, name: 'USV Supervisor' },
        { id: 3, name: 'USV Operator' }
    ]);
    const [formData, setFormData] = useState({ crewID: '', qualificationID: '', earnedDate: '' });

    return (
        <div>
            <h2>Crew Certifications (M:M)</h2>
            <div className="form-container">
                <h3>Assign Qualification</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>Crew Member: 
                        <select onChange={e => setFormData({...formData, crewID: e.target.value})}>
                            <option>Select Crew Member</option>
                            {crew.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </label>
                    <label>Qualification: 
                        <select onChange={e => setFormData({...formData, qualificationID: e.target.value})}>
                            <option>Select Qualification</option>
                            {quals.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
                        </select>
                    </label>
                    <label>Date Earned: <input type="date" onChange={e => setFormData({...formData, earnedDate: e.target.value})} /></label>
                    <button type="submit">Assign Certification</button>
                </form>
            </div>

            <div className="table-container">
                <h3>Current Assignments</h3>
                <table>
                    <thead>
                        <tr><th>ID</th><th>Crew Member</th><th>Qualification</th><th>Date Earned</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {assignments.map(a => (
                            <tr key={a.crewMemberQualificationID}>
                                <td>{a.crewMemberQualificationID}</td>
                                <td>{a.firstName} {a.lastName}</td>
                                <td>{a.qualificationName}</td>
                                <td>{a.earnedDate}</td>
                                <td><button className="delete-btn">Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CrewMemberQualificationsPage;