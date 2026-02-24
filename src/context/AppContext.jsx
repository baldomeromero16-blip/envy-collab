import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('envy_users') || '[]');
    const savedEmpresas = JSON.parse(localStorage.getItem('envy_empresas') || '[]');
    const savedTareas = JSON.parse(localStorage.getItem('envy_tareas') || '[]');
    const savedUser = JSON.parse(localStorage.getItem('envy_currentUser') || 'null');

    if (savedUsers.length === 0) {
      const defaultUsers = [
        { id: '1', email: 'aguilar@evolution.com', password: '123456', nombre: 'Aguilar', rol: 'admin' },
        { id: '2', email: 'paco@envymarketing.com', password: '123456', nombre: 'Paco', rol: 'collaborator' }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('envy_users', JSON.stringify(defaultUsers));
    } else {
      setUsers(savedUsers);
    }

    setEmpresas(savedEmpresas);
    setTareas(savedTareas);
    setUser(savedUser);
  }, []);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('envy_currentUser', JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('envy_currentUser');
  };

  const register = (userData) => {
    const newUsers = [...users, { ...userData, id: Date.now().toString() }];
    setUsers(newUsers);
    localStorage.setItem('envy_users', JSON.stringify(newUsers));
  };

  const addTarea = (tarea) => {
    const newTarea = { ...tarea, id: Date.now().toString() };
    const newTareas = [...tareas, newTarea];
    setTareas(newTareas);
    localStorage.setItem('envy_tareas', JSON.stringify(newTareas));
    return newTarea;
  };

  const updateTarea = (id, data) => {
    const newTareas = tareas.map(t => t.id === id ? { ...t, ...data } : t);
    setTareas(newTareas);
    localStorage.setItem('envy_tareas', JSON.stringify(newTareas));
  };

  const deleteTarea = (id) => {
    const newTareas = tareas.filter(t => t.id !== id);
    setTareas(newTareas);
    localStorage.setItem('envy_tareas', JSON.stringify(newTareas));
  };

  const addEmpresa = (empresa) => {
    const newEmpresa = { ...empresa, id: Date.now().toString() };
    const newEmpresas = [...empresas, newEmpresa];
    setEmpresas(newEmpresas);
    localStorage.setItem('envy_empresas', JSON.stringify(newEmpresas));
    return newEmpresa;
  };

  const updateEmpresa = (id, data) => {
    const newEmpresas = empresas.map(e => e.id === id ? { ...e, ...data } : e);
    setEmpresas(newEmpresas);
    localStorage.setItem('envy_empresas', JSON.stringify(newEmpresas));
  };

  const deleteEmpresa = (id) => {
    const newEmpresas = empresas.filter(e => e.id !== id);
    setEmpresas(newEmpresas);
    localStorage.setItem('envy_empresas', JSON.stringify(newEmpresas));
  };

  return (
    <AppContext.Provider value={{
      user, empresas, tareas, users,
      login, logout, register,
      addTarea, updateTarea, deleteTarea,
      addEmpresa, updateEmpresa, deleteEmpresa
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
