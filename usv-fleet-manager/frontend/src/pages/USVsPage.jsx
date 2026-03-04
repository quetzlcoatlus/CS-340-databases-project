import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function USVsPage() {
    const [usvs, setUSVs] = useState([]);
    const [missions, setMissions] = useState([]);
    const navigate = useNavigate();
    
    // State to track if we are editing a specific USV ID (null = creating new)
    const [editingUSV, setEditingUSV] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        class: '',
        status: '',
        missionID: ''
    });

    // Holds text user types into the search input for filtering the USV table
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/usvs', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => setUSVs(data))
            .catch(err => console.error("Error fetching USVs:", err));

        fetch('/api/missions', { cache: 'no-store' }) 
            .then(res => res.json())
            .then(data => setMissions(data))
            .catch(err => console.error("Error fetching Missions:", err));
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this USV? This action cannot be undone.")) {
            try {
                await fetch(`/api/usvs/${id}`, { method: 'DELETE' });
                setUSVs(usvs.filter(item => item.usvID !== id));
            } catch (error) {
                console.error("Error deleting USV:", error);
            }
        }
    };

    // Case-insensitive filter that ONLY looks at the Name field
    const filteredUSVs = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();
        if (!q) return usvs; // Handles empty search input by returning all USVs
        
        return usvs.filter((usv) => {
            const name = String(usv.name ?? '').toLowerCase();
            return name.includes(q);
        });
    }, [usvs, searchTerm]); // only re-compute when usvs or searchTerm changes

    return (
        <div className="page-container">
            <div className="table-container">
            
                <div style={{ textAlign: 'center', marginBottom: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2>USV Fleet</h2>

                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: 720,
                        marginBottom: 16,
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <label htmlFor="usv-name-search" className="visually-hidden">Search by Name</label>
                            
                            <input
                                id="usv-name-search"
                                type="text"
                                inputMode="text"
                                placeholder="Filter by Name…"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                padding: '8px 12px',
                                minWidth: 260,
                                borderRadius: 6,
                                border: '1px solid #bbb'
                                }}
                                aria-label="Filter USV table by Name"
                            />

                            {searchTerm && (
                                <button
                                type="button"
                                onClick={() => setSearchTerm('')}
                                className="btn-secondary"
                                aria-label="Clear name filter"
                                >
                                Clear
                                </button>
                            )}

                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/usvs/add')} 
                        className="btn-submit" 
                        style={{ width: 'max-content', padding: '10px 20px' }}
                    >
                        + Add New USV
                    </button>
                </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Status</th>
                        <th>Mission</th>
                        <th>Actions</th>
                    </tr>
                </thead>          
                <tbody>
                    {filteredUSVs.length === 0 ? (
                    <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: 16, color: '#666' }}>
                        {searchTerm
                            ? `No names matching "${searchTerm}".`
                            : 'No USVs to display.'}
                        </td>
                    </tr>
                    ) : (
                    filteredUSVs.map((usv) => (
                        <tr key={usv.usvID}>
                        <td>{usv.usvID}</td>
                        <td>{usv.name}</td>
                        <td>{usv.class}</td>
                        <td>{usv.status}</td>
                        <td>{usv.missionTitle}</td>
                        <td>
                            <button
                            className="btn-edit"
                            onClick={() => navigate(`/usvs/edit/${usv.usvID}`)}
                            >
                            Edit
                            </button>
                            <button
                            className="btn-delete"
                            onClick={() => handleDelete(usv.usvID)}
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default USVsPage;