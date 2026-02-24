import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Calendario() {
  const { tareas } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const changeMonth = (delta) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    setCurrentMonth(newDate);
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayTasks = tareas.filter(t => t.fecha_limite === dateStr);
      const isOtherMonth = date.getMonth() !== currentMonth.getMonth();
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <div key={i} className={`calendar-day ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}>
          <div className="day-number">{date.getDate()}</div>
          {dayTasks.slice(0, 3).map(t => (
            <div key={t.id} className="day-task">{t.titulo}</div>
          ))}
          {dayTasks.length > 3 && <div className="day-task">+{dayTasks.length - 3}</div>}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Calendario</h1>
        <div>
          <button className="btn btn-secondary" onClick={() => changeMonth(-1)}>&lt;</button>
          <span style={{ margin: '0 16px', fontWeight: 600 }}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button className="btn btn-secondary" onClick={() => changeMonth(1)}>&gt;</button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
            <div key={d} className="calendar-weekday">{d}</div>
          ))}
        </div>
        <div className="calendar-days">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}
