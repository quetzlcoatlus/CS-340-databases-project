import React, { useState, useEffect } from 'react';

function PrioritiesPage() {
    const [priorities, setPriorities] = useState([]);

    useEffect(() => {
        fetch('/api/priorities')
            .then(res => res.json())
            .then(data => setPriorities(data))
            .catch(err => console.error("Error fetching priorities:", err));
    }, []);

    return (
        <div className="page-container">
            <div className="table-container">
                
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <h2 style={{ margin: 0, color: '#1a252f' }}>Priority Levels</h2>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Level ID</th>
                            <th>Priority Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {priorities.map(p => (
                            <tr key={p.priorityLevel}>
                                <td>{p.priorityLevel}</td>
                                <td>{p.title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PrioritiesPage;