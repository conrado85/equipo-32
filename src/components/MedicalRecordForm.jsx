import React, { useState, useEffect } from 'react';
import { X, User, Stethoscope, Calendar, FileText, Pill, Lightbulb } from 'lucide-react';

function MedicalRecordForm({ isOpen, onClose, onSave, editingRecord, loading }) {
  const [formData, setFormData] = useState({
    appointment_id: '',
    patient_id: '',
    medical_staff_id: '',
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
    prescriptions: '',
    recommendations: ''
  });

  const [errors, setErrors] = useState({});

  // Datos de referencia (mock - en producción vendrían de la API)
  const [patients, setPatients] = useState([
    { id: 1, name: 'María González Rodríguez' },
    { id: 2, name: 'Carlos López Martínez' },
    { id: 3, name: 'Ana Lucía Fernández' }
  ]);

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Juan Carlos Pérez' },
    { id: 2, name: 'Dra. María Elena García' },
    { id: 3, name: 'Dr. Roberto Silva' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patient_name: 'María González Rodríguez', date: '2025-11-06 15:00' },
    { id: 2, patient_name: 'Carlos López Martínez', date: '2025-11-07 10:30' },
    { id: 3, patient_name: 'Ana Lucía Fernández', date: '2025-11-08 14:15' }
  ]);

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (editingRecord) {
        setFormData({
          appointment_id: editingRecord.appointment_id || '',
          patient_id: editingRecord.patient_id || '',
          medical_staff_id: editingRecord.medical_staff_id || '',
          subjective: editingRecord.subjective || '',
          objective: editingRecord.objective || '',
          assessment: editingRecord.assessment || '',
          plan: editingRecord.plan || '',
          prescriptions: editingRecord.prescriptions || '',
          recommendations: editingRecord.recommendations || ''
        });
      } else {
        setFormData({
          appointment_id: '',
          patient_id: '',
          medical_staff_id: '',
          subjective: '',
          objective: '',
          assessment: '',
          plan: '',
          prescriptions: '',
          recommendations: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, editingRecord]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.appointment_id) newErrors.appointment_id = 'Seleccione una cita';
    if (!formData.patient_id) newErrors.patient_id = 'Seleccione un paciente';
    if (!formData.medical_staff_id) newErrors.medical_staff_id = 'Seleccione un doctor';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingRecord ? 'Editar Historial Clínico' : 'Nuevo Historial Clínico'}
              </h2>
              <p className="text-sm text-gray-600">
                {editingRecord ? 'Modifica la información del historial médico' : 'Completa la información del historial médico'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda */}
            <div className="space-y-4">
              {/* Cita */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Cita Asociada *
                </label>
                <select
                  value={formData.appointment_id}
                  onChange={(e) => handleInputChange('appointment_id', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.appointment_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" className="text-gray-500">Seleccionar cita</option>
                  {appointments.map(appointment => (
                    <option key={appointment.id} value={appointment.id} className="text-gray-900">
                      #{appointment.id} - {appointment.patient_name} - {appointment.date}
                    </option>
                  ))}
                </select>
                {errors.appointment_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.appointment_id}</p>
                )}
              </div>

              {/* Paciente */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Paciente *
                </label>
                <select
                  value={formData.patient_id}
                  onChange={(e) => handleInputChange('patient_id', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.patient_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" className="text-gray-500">Seleccionar paciente</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id} className="text-gray-900">
                      {patient.name}
                    </option>
                  ))}
                </select>
                {errors.patient_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.patient_id}</p>
                )}
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Stethoscope className="w-4 h-4 inline mr-1" />
                  Doctor Responsable *
                </label>
                <select
                  value={formData.medical_staff_id}
                  onChange={(e) => handleInputChange('medical_staff_id', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.medical_staff_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" className="text-gray-500">Seleccionar doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id} className="text-gray-900">
                      {doctor.name}
                    </option>
                  ))}
                </select>
                {errors.medical_staff_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.medical_staff_id}</p>
                )}
              </div>

              {/* Síntomas Subjetivos */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Síntomas Subjetivos
                </label>
                <textarea
                  value={formData.subjective}
                  onChange={(e) => handleInputChange('subjective', e.target.value)}
                  placeholder="Describa los síntomas que reporta el paciente..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Máximo 2000 caracteres
                </p>
              </div>

              {/* Examen Objetivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Examen Objetivo
                </label>
                <textarea
                  value={formData.objective}
                  onChange={(e) => handleInputChange('objective', e.target.value)}
                  placeholder="Describa los hallazgos del examen físico..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Máximo 2000 caracteres
                </p>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-4">
              {/* Evaluación/Diagnóstico */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Evaluación/Diagnóstico
                </label>
                <textarea
                  value={formData.assessment}
                  onChange={(e) => handleInputChange('assessment', e.target.value)}
                  placeholder="Diagnóstico médico y evaluación..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Máximo 2000 caracteres
                </p>
              </div>

              {/* Plan de Tratamiento */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Plan de Tratamiento
                </label>
                <textarea
                  value={formData.plan}
                  onChange={(e) => handleInputChange('plan', e.target.value)}
                  placeholder="Plan de tratamiento y seguimiento..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Máximo 2000 caracteres
                </p>
              </div>

              {/* Recetas */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Pill className="w-4 h-4 inline mr-1" />
                  Recetas Médicas
                </label>
                <textarea
                  value={formData.prescriptions}
                  onChange={(e) => handleInputChange('prescriptions', e.target.value)}
                  placeholder="Medicamentos recetados y dosis..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Máximo 2000 caracteres
                </p>
              </div>

              {/* Recomendaciones */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Lightbulb className="w-4 h-4 inline mr-1" />
                  Recomendaciones
                </label>
                <textarea
                  value={formData.recommendations}
                  onChange={(e) => handleInputChange('recommendations', e.target.value)}
                  placeholder="Recomendaciones adicionales para el paciente..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Máximo 2000 caracteres
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : (editingRecord ? 'Actualizar Historial' : 'Crear Historial')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MedicalRecordForm;
