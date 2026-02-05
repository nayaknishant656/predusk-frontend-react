import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProfileById } from '../api/api';

const ProfileView = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await fetchProfileById(id);
                setProfile(data);
            } catch (err) {
                console.error("Error fetching profile", err);
            } finally {
                setLoading(false);
            }
        };
        getProfile();
    }, [id]);

    if (loading) return <div className="container">Loading profile details...</div>;
    if (!profile) return <div className="container">Profile not found.</div>;

    return (
        <div className="container">
            <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
                &larr; Back to Profiles
            </Link>

            <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>{profile.name}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>{profile.bio}</p>

                <div style={{ marginBottom: '2rem' }}>
                    <h4>Skills</h4>
                    <div style={{ marginTop: '0.5rem' }}>
                        {profile.skills?.map((skill, idx) => (
                            <span key={idx} className="tag">{skill}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4>Education</h4>
                    {profile.education?.map((edu, idx) => (
                        <div key={idx} style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                            <strong>{edu.institution}</strong> - {edu.degree} ({edu.year})
                        </div>
                    ))}
                </div>
            </div>

            <h2>Projects</h2>
            <div className="grid">
                {profile.projects?.map((project) => (
                    <div key={project._id} className="card glass">
                        <h3>{project.title}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{project.description}</p>
                        {project.links && (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <a href={project.links.github} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>GitHub</a>
                                <a href={project.links.live} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Live Demo</a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileView;
