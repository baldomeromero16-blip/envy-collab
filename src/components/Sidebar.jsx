import { useApp } from '../context/AppContext';

export default function Sidebar({ currentPage, setCurrentPage }) {
  const { user, logout } = useApp();

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'tareas', icon: '✅', label: 'Tareas' },
    { id: 'calendario', icon: '📅', label: 'Calendario' },
    { id: 'empresas', icon: '🏢', label: 'Empresas' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Envy<span>Collab</span></div>
      <nav className="nav-items">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="user-info">
        <div className="user-name">{user?.nombre}</div>
        <div className="user-role">{user?.rol === 'admin' ? 'Administrador' : 'Colaborador'}</div>
        <button className="btn btn-logout" onClick={logout}>Cerrar Sesión</button>
      </div>
    </aside>
  );
}
