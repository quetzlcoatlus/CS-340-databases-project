import React, { useState } from 'react';

function PrioritiesPage() {
    const [priorities] = useState([
        { priorityLevel: 1, title: 'Low' },
        { priorityLevel: 2, title: 'Medium' },
        { priorityLevel: 3, title: 'High' }
    ]);

    return (
        <div>
            <h2>Manage Priority Levels</h2>
            <p>Reference Table: These values are standard and cannot be modified.</p>
            <div className="table-container">
                <h3>Existing Priorities</h3>
                <table>
                    <thead>
                        <tr><th>ID</th><th>Title</th></tr>
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