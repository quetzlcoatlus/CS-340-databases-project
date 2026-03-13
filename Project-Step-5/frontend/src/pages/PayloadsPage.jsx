import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PayloadsPage() {
    const [payloads, setPayloads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/payloads', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                // Formatting dates nicely for the table view
                const formattedData = data.map(p => ({
                    ...p,
                    installationDate: p.installationDate ? p.installationDate.substring(0, 10) : 'N/A'
                }));
                setPayloads(formattedData);
            })
            .catch(err => console.error("Error fetching payloads:", err));
    }, []);

    return (
        <div className="page-container">
            <div className="table-container">
                
                <div style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginTop: 0, marginBottom: '15px', color: '#1a252f' }}>Payloads</h2>
                    <button 
                        onClick={() => navigate('/payloads/add')} 
                        className="btn-submit" 
                        style={{ width: 'max-content', padding: '10px 20px' }}
                    >
                        + Add New Payload
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Serial Number</th>
                            <th>Condition</th>
                            <th>USV</th>
                            <th>Installed Date</th>
                            <th>Actions</th>
                        </tr>
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
                                <td>
                                    <button 
                                        className="btn-edit" 
                                        onClick={() => navigate(`/payloads/edit/${p.payloadID}`)}
                                        style={{ margin: 0 }}
                                    >
                                        Edit
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

export default PayloadsPage;