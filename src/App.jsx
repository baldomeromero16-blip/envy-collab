import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tareas from './pages/Tareas';
import Calendario from './pages/Calendario';
import Empresas from './pages/Empresas';
import './App.css';

function AppContent() {
  const { user } = useApp();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!user) return <Login />;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'tareas': return <Tareas />;
      case 'calendario': return <Calendario />;
      case 'empresas': return <Empresas />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container active">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
