import React, { useState } from 'react';

const AppointmentForm = ({ 
  appointment = null, 
  onSave, 
  onCancel, 
  patients = [], 
  doctors = [], 
  specialties = [],
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    patient_id: appointment?.patient_id || '',
    medical_staff_id: appointment?.medical_staff_id || '',
    specialty_id: appointment?.specialty_id || '',
    start_date: appointment?.start_date ? new Date(appointment.start_date).toISOString().slice(0, 16) : '',
    end_date: appointment?.end_date ? new Date(appointment.end_date).toISOString().slice(0, 16) : '',
    type: appointment?.type || 'presencial',
    status: appointment?.status || 'programada',
    reason: appointment?.reason || '',
    urgent: appointment?.urgent || false,
    priority: appointment?.priority || 1,
    notes: appointment?.notes || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    const newErrors = {};
    
    if (!formData.patient_id) newErrors.patient_id = 'Seleccione un paciente';
    if (!formData.specialty_id) newErrors.specialty_id = 'Seleccione una especialidad';
    if (!formData.start_date) newErrors.start_date = 'Seleccione fecha y hora de inicio';
    if (!formData.end_date) newErrors.end_date = 'Seleccione fecha y hora de fin';
    if (!formData.reason) newErrors.reason = 'Ingrese el motivo de la cita';
    
    if (new Date(formData.start_date) >= new Date(formData.end_date)) {
      newErrors.end_date = 'La fecha de fin debe ser posterior a la de inicio';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  const statusOptions = [
    { value: 'programada', label: 'Programada', color: 'blue' },
    { value: 'confirmada', label: 'Confirmada', color: 'green' },
    { value: 'en_curso', label: 'En Curso', color: 'orange' },
    { value: 'completada', label: 'Completada', color: 'purple' },
    { value: 'cancelada', label: 'Cancelada', color: 'red' },
    { value: 'no_asistio', label: 'No Asistió', color: 'gray' }
  ];

  const typeOptions = [
    { value: 'presencial', label: 'Presencial' },
    { value: 'virtual', label: 'Virtual' }
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/75 flex justify-center items-center z-50 p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">{appointment ? 'Editar Cita' : 'Nueva Cita'}</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={onCancel}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="patient_id" className="block text-sm font-semibold text-gray-900">Paciente *</label>
              <select
                id="patient_id"
                name="patient_id"
                value={formData.patient_id}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 ${
                  errors.patient_id ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="" className="text-gray-500">Seleccionar paciente</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id} className="text-gray-900">
                    {patient.name} - {patient.email}
                  </option>
                ))}
              </select>
              {errors.patient_id && <span className="text-red-500 text-sm">{errors.patient_id}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="specialty_id" className="block text-sm font-semibold text-gray-900">Especialidad *</label>
              <select
                id="specialty_id"
                name="specialty_id"
                value={formData.specialty_id}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 ${
                  errors.specialty_id ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="" className="text-gray-500">Seleccionar especialidad</option>
                {specialties.map(specialty => (
                  <option key={specialty.id} value={specialty.id} className="text-gray-900">
                    {specialty.name}
                  </option>
                ))}
              </select>
              {errors.specialty_id && <span className="text-red-500 text-sm">{errors.specialty_id}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="medical_staff_id" className="block text-sm font-semibold text-gray-900">Doctor</label>
              <select
                id="medical_staff_id"
                name="medical_staff_id"
                value={formData.medical_staff_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <option value="" className="text-gray-500">Asignación automática</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id} className="text-gray-900">
                    Dr. {doctor.name} - {doctor.specialty?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-semibold text-gray-900">Tipo de Cita</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value} className="text-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="start_date" className="block text-sm font-semibold text-gray-900">Fecha y Hora de Inicio *</label>
              <input
                type="datetime-local"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 ${
                  errors.start_date ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.start_date && <span className="text-red-500 text-sm">{errors.start_date}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="end_date" className="block text-sm font-semibold text-gray-900">Fecha y Hora de Fin *</label>
              <input
                type="datetime-local"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 ${
                  errors.end_date ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.end_date && <span className="text-red-500 text-sm">{errors.end_date}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-semibold text-gray-900">Estado</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value} className="text-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm font-semibold text-gray-900">Prioridad</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                <option value={1} className="text-gray-900">1 - Muy Baja</option>
                <option value={2} className="text-gray-900">2 - Baja</option>
                <option value={3} className="text-gray-900">3 - Media</option>
                <option value={4} className="text-gray-900">4 - Alta</option>
                <option value={5} className="text-gray-900">5 - Muy Alta</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label htmlFor="reason" className="block text-sm font-semibold text-gray-900">Motivo de la Cita *</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Describa el motivo de la consulta..."
              disabled={isLoading}
            />
            {errors.reason && <span className="text-red-500 text-sm">{errors.reason}</span>}
          </div>

          <div className="space-y-2 mb-6">
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-900">Notas Adicionales</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
              rows={2}
              placeholder="Notas adicionales..."
              disabled={isLoading}
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="urgent"
                checked={formData.urgent}
                onChange={handleChange}
                disabled={isLoading}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span className="text-sm font-medium text-gray-700">Cita Urgente</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : (appointment ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
