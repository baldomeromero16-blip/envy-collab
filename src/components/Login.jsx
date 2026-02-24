import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('collaborator');
  const { login, register } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      register({ email, password, nombre: name, rol: role });
      alert('Registrado. Por favor inicia sesión.');
      setIsRegister(false);
    } else {
      const user = login(email, password);
      if (!user) alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <h1>Envy<span>Collab</span></h1>
          <p style={{ color: 'var(--muted)', marginTop: 8 }}>Dashboard de Colaboración</p>
        </div>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="collaborator">Colaborador (Paco)</option>
                  <option value="admin">Administrador (Evolution)</option>
                </select>
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--muted)', fontSize: '0.875rem' }}>
          {isRegister ? '¿Ya tienes cuenta? ' : '¿No tienes cuenta? '}
          <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister); }} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </a>
        </p>
      </div>
    </div>
  );
}
