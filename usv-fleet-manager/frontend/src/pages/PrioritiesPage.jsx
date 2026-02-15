import React, { useState, useEffect } from 'react';

function PrioritiesPage() {
    const [priorities, setPriorities] = useState([]);

    // 1. Fetch Data Only
    useEffect(() => {
        fetch('/api/priorities')
            .then(res => res.json())
            .then(data => setPriorities(data))
            .catch(err => console.error("Error fetching priorities:", err));
    }, []);

    return (
        <div>
            <h2>Mission Priorities</h2>
            <p>Reference Table: These values are standard and cannot be modified.</p>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(priorities) && priorities.map(p => (
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