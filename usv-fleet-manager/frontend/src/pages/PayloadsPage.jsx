import React, { useState } from 'react';

function PayloadsPage() {
    const [payloads] = useState([
        { payloadID: 1, type: 'EW', serialNumber: 'SA-EW-26-001', condition: 'Operable', installedUSV: 1, usvName: 'Sentinel', installationDate: '2025-05-31' },
        { payloadID: 2, type: 'EW', serialNumber: 'SA-EW-26-002', condition: 'Operable', installedUSV: 3, usvName: 'Wraith', installationDate: '2026-01-12' },
        { payloadID: 3, type: 'EW', serialNumber: 'SA-EW-26-003', condition: 'Operable', installedUSV: 4, usvName: 'Ghost', installationDate: '2025-12-20' },
        { payloadID: 4, type: 'SONAR', serialNumber: 'DL2-SN-26-101', condition: 'Operable', installedUSV: 1, usvName: 'Sentinel', installationDate: '2025-05-31' },
        { payloadID: 5, type: 'SONAR', serialNumber: 'DL2-SN-26-102', condition: 'Inoperable', installedUSV: 2, usvName: 'Striker', installationDate: '2025-10-15' },
        { payloadID: 6, type: 'SONAR', serialNumber: 'DL2-SN-26-103', condition: 'Operable', installedUSV: null, usvName: 'Storage', installationDate: null },
        { payloadID: 7, type: 'EO/IR', serialNumber: 'A7-HD-26-501', condition: 'Inoperable', installedUSV: null, usvName: 'Storage', installationDate: null },
        { payloadID: 8, type: 'EO/IR', serialNumber: 'A7-HD-26-502', condition: 'Operable', installedUSV: 1, usvName: 'Sentinel', installationDate: '2025-05-31' },
        { payloadID: 9, type: 'EO/IR', serialNumber: 'A7-HD-26-503', condition: 'Operable', installedUSV: 2, usvName: 'Striker', installationDate: '2025-10-15' }
    ]);
    const [usvs] = useState([
        { usvID: 1, name: 'Sentinel' }, 
        { usvID: 2, name: 'Striker' },
        { usvID: 3, name: 'Wraith' }, 
        { usvID: 4, name: 'Ghost' },
        { usvID: 5, name: 'Raider' }
    ]);
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