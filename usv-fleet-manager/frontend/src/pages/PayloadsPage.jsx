import React, { useState } from 'react';

function PayloadsPage() {
    const [payloads] = useState([]);
    const [usvs] = useState([]);
    const [formData, setFormData] = useState({
        type: '', serialNumber: '', condition: '', installedUSV: '', installationDate: ''
    });

    return (
        <div>
            <h2>Payload Configurations</h2>
            <div className="form-container">
                <h3>Register New Payload</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>Type: <input type="text" onChange={e => setFormData({...formData, type: e.target.value})} /></label>
                    <label>Serial #: <input type="text" onChange={e => setFormData({...formData, serialNumber: e.target.value})} /></label>
                    <label>Condition: 
                        <select onChange={e => setFormData({...formData, condition: e.target.value})}>
                            <option value="">Select Condition</option>
                            <option value="Operable">Operable</option>
                            <option value="Inoperable">Inoperable</option>
                        </select>
                    </label>
                    <label>Installed On: 
                        <select onChange={e => setFormData({...formData, installedUSV: e.target.value})}>
                            <option value="">Storage</option>
                            {usvs.map(u => <option key={u.usvID} value={u.usvID}>{u.name}</option>)}
                        </select>
                    </label>
                    <label>Date Installed: <input type="date" onChange={e => setFormData({...formData, installationDate: e.target.value})} /></label>
                    <button type="submit">Add Payload</button>
                </form>
            </div>

            <div className="table-container">
                <h3>Equipment List</h3>
                <table>
                    <thead>
                        <tr><th>ID</th><th>Type</th><th>Serial</th><th>Condition</th><th>USV</th><th>Date Installed</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {payloads.map(p => (
                            <tr key={p.payloadID}>
                                <td>{p.payloadID}</td>
                                <td>{p.type}</td>
                                <td>{p.serialNumber}</td>
                                <td>{p.condition}</td>
                                <td>{p.usvName}</td>
                                <td>{p.installationDate}</td>
                                <td><button className="edit-btn">Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PayloadsPage;