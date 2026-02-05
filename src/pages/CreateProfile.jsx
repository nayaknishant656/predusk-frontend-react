import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProfile } from '../api/api';

const CreateProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        skills: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const skillsArray = formData.skills.split(',').map(s => s.trim());
            await addProfile({ ...formData, skills: skillsArray });
            navigate('/');
        } catch (err) {
            console.error("Error creating profile", err);
            alert("Failed to create profile. Check if server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                <h2>Create Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Bio</label>
                        <textarea
                            rows="4"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Skills (comma separated)</label>
                        <input
                            type="text"
                            placeholder="React, Node, CSS"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
                        {loading ? 'Creating...' : 'Create Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfile;
