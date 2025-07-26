// import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {

  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <Navigate to="/home" replace />
          }
        />
      </Route>

      <Route
        path="home"
        element={
          <HomePage />
        }
      />

      {/* <Route path="login" element={<LoginPage />} /> */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
