import React, { useEffect, useState } from 'react';
import { fetchProfiles } from '../api/api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const { data } = await fetchProfiles();
                setProfiles(data);
            } catch (err) {
                console.error("Error fetching profiles", err);
            } finally {
                setLoading(false);
            }
        };
        getProfiles();
    }, []);

    if (loading) return <div className="container">Loading profiles...</div>;

    return (
        <div className="container">
            <h2>Talent Profiles</h2>
            <div className="grid">
                {profiles.map(profile => (
                    <div key={profile._id} className="card glass">
                        <h3>{profile.name || 'Anonymous'}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                            {profile.bio || 'No bio available'}
                        </p>
                        <div style={{ marginBottom: '1rem' }}>
                            {profile.skills?.map((skill, idx) => (
                                <span key={idx} className="tag">{skill}</span>
                            ))}
                        </div>
                        <Link to={`/profile/${profile._id}`}>
                            <button className="btn-primary">View Full Profile</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
