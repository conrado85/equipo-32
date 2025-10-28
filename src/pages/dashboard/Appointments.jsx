import React, { useState, useEffect } from 'react';
import { appointmentService } from '../../api/appointmentService';
import AppointmentForm from '../../components/AppointmentForm';

const Appointments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [pagination, setPagination] = useState({});
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [filters, setFilters] = useState({
    q: '',
    patient_id: '',
    doctor_id: '',
    specialty_id: '',
    type: '',
    status: '',
    urgent: null,
    priority: '',
    date_from: '',
    date_to: '',
    per_page: 4,
    page: 1,
    sort_by: 'start_date',
    sort_dir: 'asc'
  });

  useEffect(() => {
    loadAppointments();
    loadReferenceData();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await appointmentService.getAllAppointments(filters);
      
      if (result.success) {
        setAppointments(result.appointments || []);
        setPagination(result.pagination || {});
      } else {
        setError(result.message);
      }
    } catch {
      setError('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: name === 'page' ? value : 1 // Solo resetear a página 1 si no es cambio de página
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      q: '',
      patient_id: '',
      doctor_id: '',
      specialty_id: '',
      type: '',
      status: '',
      urgent: null,
      priority: '',
      date_from: '',
      date_to: '',
      per_page: 4,
      page: 1,
      sort_by: 'start_date',
      sort_dir: 'asc'
    });
  };

  const loadReferenceData = async () => {
    // En una implementación real, estos datos vendrían de endpoints específicos
    // Por ahora usamos datos mock
    setPatients([
      { id: 1, name: 'Juan Pérez', email: 'juan@email.com' },
      { id: 2, name: 'María García', email: 'maria@email.com' },
      { id: 3, name: 'Carlos López', email: 'carlos@email.com' }
    ]);

    setDoctors([
      { id: 1, name: 'Ana Martínez', specialty: { name: 'Cardiología' } },
      { id: 2, name: 'Luis Rodríguez', specialty: { name: 'Neurología' } },
      { id: 3, name: 'Elena Sánchez', specialty: { name: 'Pediatría' } }
    ]);

    setSpecialties([
      { id: 1, name: 'Cardiología' },
      { id: 2, name: 'Neurología' },
      { id: 3, name: 'Pediatría' },
      { id: 4, name: 'Dermatología' },
      { id: 5, name: 'Oftalmología' }
    ]);
  };

  const handleCreateAppointment = () => {
    setShowForm(true);
  };

  const handleSaveAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await appointmentService.createAppointment(appointmentData);
      
      if (result.success) {
        setShowForm(false);
        loadAppointments();
      } else {
        setError(result.message);
      }
    } catch {
      setError('Error al guardar la cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">📅 Gestión de Citas</h1>
        <button 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          onClick={handleCreateAppointment}
          disabled={loading}
        >
          <span className="text-xl">+</span> Nueva Cita
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p>Cargando citas...</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Total de citas: {pagination.total || appointments.length}
              </h3>
              <div className="flex items-center gap-4">
                {/* Filtros sutiles */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={filters.q || ''}
                    onChange={(e) => handleFilterChange('q', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                  <select
                    value={filters.status || ''}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="">Todos los estados</option>
                    <option value="programada">Programada</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                  <select
                    value={filters.type || ''}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="presencial">Presencial</option>
                    <option value="virtual">Virtual</option>
                  </select>
                  {(filters.q || filters.status || filters.type) && (
                    <button
                      onClick={handleClearFilters}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
                      title="Limpiar filtros"
                    >
                      ✕ Limpiar
                    </button>
                  )}
                </div>
                {pagination.total && (
                  <span className="text-sm text-gray-500">
                    Página {pagination.current_page} de {pagination.last_page}
                  </span>
                )}
              </div>
            </div>
            
            {appointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">ID</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Paciente</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Doctor</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Especialidad</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Tipo</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Estado</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {appointments.map(appointment => (
                      <tr key={appointment.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            #{appointment.id}
                          </span>
                        </td>
                        <td className="px-3 py-2 font-medium text-gray-900">
                          {appointment.patient?.user?.name || 'N/A'}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {appointment.medical_staff?.user?.name ? `Dr. ${appointment.medical_staff.user.name}` : 'Por asignar'}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {appointment.specialty?.name || 'N/A'}
                        </td>
                        <td className="px-3 py-2 text-gray-600">
                          {appointment.start_date ? new Date(appointment.start_date).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </td>
                        <td className="px-3 py-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            appointment.type === 'presencial' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {appointment.type === 'presencial' ? 'Presencial' : 'Virtual'}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              appointment.status === 'programada' ? 'bg-yellow-100 text-yellow-800' :
                              appointment.status === 'confirmada' ? 'bg-green-100 text-green-800' :
                              appointment.status === 'completada' ? 'bg-purple-100 text-purple-800' :
                              appointment.status === 'cancelada' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {appointment.status}
                            </span>
                            {appointment.urgent && (
                              <span className="text-red-500 text-xs" title="Urgente">🚨</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">
                              Editar
                            </button>
                            <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors">
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No hay citas disponibles</p>
                <p className="text-sm mt-2">Las citas aparecerán aquí una vez que se carguen desde el servidor</p>
              </div>
            )}
            
            {/* Paginación */}
            {pagination.total && pagination.last_page > 1 && (
              <div className="flex justify-between items-center mt-4 px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Mostrando {pagination.from || 0} a {pagination.to || 0} de {pagination.total || 0} citas
                </div>
                <div className="flex items-center gap-2">
                  {/* Botón Primera página */}
                  {pagination.current_page > 3 && (
                    <>
                      <button
                        onClick={() => handleFilterChange('page', 1)}
                        disabled={loading}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        1
                      </button>
                      {pagination.current_page > 4 && (
                        <span className="px-2 text-gray-500 font-medium">...</span>
                      )}
                    </>
                  )}
                  
                  {/* Botón Anterior */}
                  <button
                    onClick={() => handleFilterChange('page', Math.max(1, pagination.current_page - 1))}
                    disabled={pagination.current_page === 1 || loading}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ←
                  </button>
                  
                  {/* Números de página alrededor de la actual */}
                  {Array.from({ length: Math.min(3, pagination.last_page) }, (_, i) => {
                    const startPage = Math.max(1, pagination.current_page - 1);
                    const pageNum = startPage + i;
                    if (pageNum > pagination.last_page) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handleFilterChange('page', pageNum)}
                        disabled={loading}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          pageNum === pagination.current_page
                            ? 'bg-blue-600 text-white border border-blue-600 shadow-sm'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {/* Botón Siguiente */}
                  <button
                    onClick={() => handleFilterChange('page', Math.min(pagination.last_page, pagination.current_page + 1))}
                    disabled={pagination.current_page === pagination.last_page || loading}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    →
                  </button>
                  
                  {/* Botón Última página */}
                  {pagination.current_page < pagination.last_page - 2 && (
                    <>
                      {pagination.current_page < pagination.last_page - 3 && (
                        <span className="px-2 text-gray-500 font-medium">...</span>
                      )}
                      <button
                        onClick={() => handleFilterChange('page', pagination.last_page)}
                        disabled={loading}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {pagination.last_page}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <AppointmentForm
          onSave={handleSaveAppointment}
          onCancel={() => setShowForm(false)}
          patients={patients}
          doctors={doctors}
          specialties={specialties}
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default Appointments;
