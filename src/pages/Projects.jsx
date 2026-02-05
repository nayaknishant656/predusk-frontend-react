import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../api/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [skill, setSkill] = useState('');
    const [loading, setLoading] = useState(false);

    const getProjects = async (searchSkill = '') => {
        setLoading(true);
        try {
            const { data } = await fetchProjects(searchSkill);
            setProjects(data);
        } catch (err) {
            console.error("Error fetching projects", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        getProjects(skill);
    };

    return (
        <div className="container">
            <h2>Browse Projects</h2>

            <form onSubmit={handleSearch} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Filter by Skill (e.g. Python, React)"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    style={{ marginBottom: 0 }}
                />
                <button type="submit" className="btn-primary">Search</button>
            </form>

            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <div className="grid">
                    {projects.map((item, index) => (
                        <div key={index} className="card glass">
                            <h3>{item.project.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {item.project.description}
                            </p>
                            <div style={{ marginBottom: '1rem' }}>
                                {item.skills?.map((s, idx) => (
                                    <span key={idx} className="tag">{s}</span>
                                ))}
                            </div>
                            {item.project.links && (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {Object.entries(item.project.links).map(([name, url]) => (
                                        <a key={name} href={url} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.8rem' }}>
                                            {name.toUpperCase()}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {projects.length === 0 && <p>No projects found for this skill.</p>}
                </div>
            )}
        </div>
    );
};

export default Projects;
