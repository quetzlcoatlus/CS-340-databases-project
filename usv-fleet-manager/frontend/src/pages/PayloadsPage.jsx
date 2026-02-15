// frontend/src/pages/PayloadsPage.jsx
import React, { useState, useEffect } from 'react';

function PayloadsPage() {
    const [payloads, setPayloads] = useState([]);
    const [usvs, setUSVs] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        serialNumber: '',
        condition: '',
        installedUSV: '',
        installationDate: ''
    });

    useEffect(() => {
        fetch('/api/payloads').then(res => res.json()).then(data => setPayloads(data));
        fetch('/api/usvs').then(res => res.json()).then(data => setUSVs(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/payloads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if(response.status === 201) window.location.reload();
    };

    return (
        <div>
            <h2>Payload Configurations</h2>
            
            <div className="form-container">
                <h3>Register New Payload</h3>
                <form onSubmit={handleSubmit}>
                    <label>Type: 
                        <input type="text" onChange={e => setFormData({...formData, type: e.target.value})} required />
                    </label>
                    <label>Serial #: 
                        <input type="text" onChange={e => setFormData({...formData, serialNumber: e.target.value})} required />
                    </label>
                    
                    {/* UPDATED: Dropdown for Condition */}
                    <label>Condition: 
                        <select 
                            onChange={e => setFormData({...formData, condition: e.target.value})} 
                            required
                        >
                            <option value="">Select Condition</option>
                            <option value="Operable">Operable</option>
                            <option value="Inoperable">Inoperable</option>
                        </select>
                    </label>
                    
                    <label>Installed On: 
                        <select onChange={e => setFormData({...formData, installedUSV: e.target.value})}>
                            <option value="">Storage (Uninstalled)</option>
                            {Array.isArray(usvs) && usvs.map(u => (
                                <option key={u.usvID} value={u.usvID}>{u.name}</option>
                            ))}
                        </select>
                    </label>
                    
                    <label>Date Installed: 
                        <input type="date" onChange={e => setFormData({...formData, installationDate: e.target.value})} />
                    </label>
                    
                    <button type="submit">Add Payload</button>
                </form>
            </div>

            <div className="table-container">
                <h3>Currently Owned Payloads</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th><th>Type</th><th>Serial</th><th>Condition</th><th>USV Name</th><th>Date Installed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(payloads) && payloads.map(p => (
                            <tr key={p.payloadID}>
                                <td>{p.payloadID}</td>
                                <td>{p.type}</td>
                                <td>{p.serialNumber}</td>
                                <td>{p.condition}</td>
                                <td>{p.usvName || "Uninstalled"}</td>
                                <td>{p.installationDate ? p.installationDate.split('T')[0] : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PayloadsPage;