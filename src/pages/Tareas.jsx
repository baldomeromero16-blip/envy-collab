import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useApp } from '../context/AppContext';

const columns = [
  { id: 'pendiente', title: 'Pendientes', color: 'var(--info)' },
  { id: 'aceptada', title: 'Aceptadas', color: 'var(--warning)' },
  { id: 'en_proceso', title: 'En Proceso', color: '#ff6b6b' },
  { id: 'terminada', title: 'Terminadas', color: 'var(--success)' },
];

export default function Tareas() {
  const { tareas, empresas, updateTarea, addTarea } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingTarea, setEditingTarea] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '', descripcion: '', empresa_id: '', prioridad: 'media', fecha_limite: ''
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    updateTarea(draggableId, { estado: destination.droppableId });
  };

  const openModal = (tarea = null) => {
    if (tarea) {
      setEditingTarea(tarea);
      setFormData({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion || '',
        empresa_id: tarea.empresa_id || '',
        prioridad: tarea.prioridad,
        fecha_limite: tarea.fecha_limite || ''
      });
    } else {
      setEditingTarea(null);
      setFormData({ titulo: '', descripcion: '', empresa_id: '', prioridad: 'media', fecha_limite: '' });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTarea) {
      updateTarea(editingTarea.id, formData);
    } else {
      addTarea({ ...formData, estado: 'pendiente' });
    }
    setShowModal(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Tareas</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>+ Nueva Tarea</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {columns.map(col => (
            <div key={col.id} className="kanban-column">
              <div className="column-header">
                <div className="column-dot" style={{ background: col.color }}></div>
                <span className="column-title">{col.title}</span>
                <span className="column-count">{tareas.filter(t => t.estado === col.id).length}</span>
              </div>
              <Droppable droppableId={col.id}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="tasks-container">
                    {tareas.filter(t => t.estado === col.id).map((tarea, index) => {
                      const empresa = empresas.find(e => e.id === tarea.empresa_id);
                      return (
                        <Draggable key={tarea.id} draggableId={tarea.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="task-card"
                              onClick={() => openModal(tarea)}
                            >
                              <div className="task-title">{tarea.titulo}</div>
                              <div className="task-meta">
                                <span className={`task-priority ${tarea.prioridad}`}>{tarea.prioridad}</span>
                                {empresa && <span>{empresa.nombre}</span>}
                                {tarea.fecha_limite && <span>{tarea.fecha_limite}</span>}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showModal && (
        <div className="modal-overlay active" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editingTarea ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título</label>
                <input type="text" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Empresa</label>
                <select value={formData.empresa_id} onChange={e => setFormData({...formData, empresa_id: e.target.value})}>
                  <option value="">Sin empresa asignada</option>
                  {empresas.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Prioridad</label>
                <select value={formData.prioridad} onChange={e => setFormData({...formData, prioridad: e.target.value})}>
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fecha Límite</label>
                <input type="date" value={formData.fecha_limite} onChange={e => setFormData({...formData, fecha_limite: e.target.value})} />
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
