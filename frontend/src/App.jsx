import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddClient from './pages/AddClient';
import EditClient from './pages/EditClient';
import ClientDetails from './pages/ClientDetails';

function App() {
  

  return (
    <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/AddClient' element={<AddClient />} />
      <Route path='/edit-client/:id' element={<EditClient />} />
      <Route path='/client/:id' element={<ClientDetails />} />
    </Routes>
    </Router>
  )
}

export default App