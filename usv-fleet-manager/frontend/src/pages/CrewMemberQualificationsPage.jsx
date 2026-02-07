import React, { useState } from 'react';

function CrewMemberQualificationsPage() {
    const [assignments] = useState([]);
    const [crew] = useState([]);
    const [quals] = useState([]);
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