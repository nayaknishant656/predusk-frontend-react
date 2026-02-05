import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProfileView from './pages/ProfileView';
import Projects from './pages/Projects';
import CreateProfile from './pages/CreateProfile';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ paddingTop: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<ProfileView />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/create" element={<CreateProfile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
