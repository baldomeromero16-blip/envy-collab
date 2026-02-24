import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Empresas() {
  const { empresas, addEmpresa, updateEmpresa, deleteEmpresa } = useApp();
  const [filter, setFilter] = useState('todas');
  const [showModal, setShowModal] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '', tipo: 'potencial', contacto: '', email: '', telefono: '', notas: ''
  });

  const filtered = filter === 'todas' ? empresas : empresas.filter(e => e.tipo === filter);

  const openModal = (empresa = null) => {
    if (empresa) {
      setEditingEmpresa(empresa);
      setFormData({
        nombre: empresa.nombre,
        tipo: empresa.tipo,
        contacto: empresa.contacto || '',
        email: empresa.email || '',
        telefono: empresa.telefono || '',
        notas: empresa.notas || ''
      });
    } else {
      setEditingEmpresa(null);
      setFormData({ nombre: '', tipo: 'potencial', contacto: '', email: '', telefono: '', notas: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmpresa) {
      updateEmpresa(editingEmpresa.id, { ...formData, estado: 'activa' });
    } else {
      addEmpresa({ ...formData, estado: 'activa' });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar empresa?')) deleteEmpresa(id);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Empresas</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>+ Nueva Empresa</button>
      </div>
      <div className="table-container">
        <div className="table-filters">
          {['todas', 'actual', 'potencial'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'todas' ? 'Todas' : f === 'actual' ? 'Actuales' : 'Potenciales'}
            </button>
          ))}
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Contacto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(empresa => (
              <tr key={empresa.id}>
                <td>{empresa.nombre}</td>
                <td><span className={`empresa-badge ${empresa.tipo}`}>{empresa.tipo === 'actual' ? 'Actual' : 'Potencial'}</span></td>
                <td>{empresa.contacto || '-'}</td>
                <td><span className={`empresa-badge ${empresa.estado}`}>{empresa.estado === 'activa' ? 'Activa' : 'Inactiva'}</span></td>
                <td className="actions">
                  <button className="btn-icon" onClick={() => openModal(empresa)}>✏️</button>
                  <button className="btn-icon" onClick={() => handleDelete(empresa.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay active" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingEmpresa ? 'Editar Empresa' : 'Nueva Empresa'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <select value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                  <option value="potencial">Potencial</option>
                  <option value="actual">Actual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Contacto</label>
                <input type="text" value={formData.contacto} onChange={e => setFormData({...formData, contacto: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Notas</label>
                <textarea rows="3" value={formData.notas} onChange={e => setFormData({...formData, notas: e.target.value})} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
