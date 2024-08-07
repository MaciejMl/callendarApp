import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import NotFound404 from './components/views/NotFound404/NotFound404';

function App() {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Container>
  );
}

export default App;
