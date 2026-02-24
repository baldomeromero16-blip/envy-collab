import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { tareas, empresas } = useApp();

  const stats = {
    total: tareas.length,
    pendientes: tareas.filter(t => t.estado === 'pendiente').length,
    enProceso: tareas.filter(t => t.estado === 'en_proceso').length,
    terminadas: tareas.filter(t => t.estado === 'terminada').length,
    empresasActivas: empresas.filter(e => e.estado === 'activa').length,
  };

  return (
    <div className="page active">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Tareas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--info)' }}>{stats.pendientes}</div>
          <div className="stat-label">Pendientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#ff6b6b' }}>{stats.enProceso}</div>
          <div className="stat-label">En Proceso</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{stats.terminadas}</div>
          <div className="stat-label">Terminadas</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.empresasActivas}</div>
          <div className="stat-label">Empresas Activas</div>
        </div>
      </div>
    </div>
  );
}
