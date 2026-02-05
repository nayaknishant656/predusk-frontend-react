import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5001/api/profiles',
});

// GET /api/profiles
export const fetchProfiles = () => API.get('/');

// GET /api/profiles/:id
export const fetchProfileById = (id) => API.get(`/${id}`);

// POST /api/profiles
export const addProfile = (profileData) => API.post('/', profileData);

// GET /api/profiles/projects?Skills=...
export const fetchProjects = (skills) => API.get('/projects', { params: { Skills: skills } });
