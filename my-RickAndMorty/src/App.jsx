import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetail';
import CharacterSearch from './components/CharacterSearch';
import './styles.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CharacterList />} />
                <Route path="/character/:id" element={<CharacterDetails />} />
                <Route path="/search" element={<CharacterSearch />} />
            </Routes>
        </Router>
    );
};

export default App;
