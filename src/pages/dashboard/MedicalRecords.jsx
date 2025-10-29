import React, { useState, useEffect } from 'react';
import { medicalRecordService } from '../../api';
import { Plus } from 'lucide-react';
import MedicalRecordForm from '../../components/MedicalRecordForm';

function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [alert, setAlert] = useState({ isOpen: false, type: '', title: '', message: '' });

  // Filtros
  const [filters, setFilters] = useState({
    q: '',
    per_page: 4,
    page: 1,
    sort_by: 'created_at',
    sort_dir: 'desc'
  });

  // Cargar historiales clínicos
  const loadMedicalRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await medicalRecordService.getAllMedicalRecords(filters);

      if (result.success) {
        setMedicalRecords(result.medicalRecords || []);
        setPagination(result.pagination || {});
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error al cargar los historiales clínicos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicalRecords();
  }, [filters]);

  // Manejar cambios en filtros
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: name === 'page' ? value : 1 // Solo resetear si no es cambio de página
    }));
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({
      q: '',
      per_page: 4,
      page: 1,
      sort_by: 'created_at',
      sort_dir: 'desc'
    });
  };

  // Crear nuevo historial
  const handleNewRecord = () => {
    setEditingRecord(null);
    setShowForm(true);
  };

  // Editar historial
  const handleEditRecord = async (record) => {
    try {
      const result = await medicalRecordService.getMedicalRecordById(record.id);
      
      if (result.success) {
        setEditingRecord(result.medicalRecord);
        setShowForm(true);
      } else {
        showAlert('error', 'Error al Cargar', result.message || 'No se pudieron cargar los detalles del historial.');
      }
    } catch (error) {
      showAlert('error', 'Error al Cargar', 'Ocurrió un error inesperado al cargar el historial.');
    }
  };

  // Eliminar historial
  const handleDeleteRecord = (record) => {
    setRecordToDelete(record);
    setShowConfirmModal(true);
  };

  const confirmDeleteRecord = async () => {
    try {
      setLoading(true);
      const result = await medicalRecordService.deleteMedicalRecord(recordToDelete.id);
      
      if (result.success) {
        await loadMedicalRecords();
        showAlert('success', 'Historial Eliminado', `El historial #${recordToDelete.id} ha sido eliminado exitosamente.`);
      } else {
        showAlert('error', 'Error al Eliminar', result.message || 'No se pudo eliminar el historial. Por favor, inténtalo de nuevo.');
      }
    } catch {
      showAlert('error', 'Error al Eliminar', 'Ocurrió un error inesperado al eliminar el historial. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
      setShowConfirmModal(false);
      setRecordToDelete(null);
    }
  };

  const cancelDeleteRecord = () => {
    setShowConfirmModal(false);
    setRecordToDelete(null);
  };

  // Guardar historial
  const handleSaveRecord = async (recordData) => {
    try {
      setLoading(true);
      setError(null);
      
      let result;
      if (editingRecord) {
        result = await medicalRecordService.updateMedicalRecord(editingRecord.id, recordData);
      } else {
        result = await medicalRecordService.createMedicalRecord(recordData);
      }
      
      if (result.success) {
        handleCloseForm();
        await loadMedicalRecords();
        const action = editingRecord ? 'actualizado' : 'creado';
        const title = editingRecord ? 'Historial Actualizado' : 'Historial Creado';
        showAlert('success', title, `El historial clínico ha sido ${action} exitosamente.`);
      } else {
        setError(result.message);
        const action = editingRecord ? 'actualizar' : 'crear';
        const title = editingRecord ? 'Error al Actualizar' : 'Error al Crear';
        showAlert('error', title, result.message || `No se pudo ${action} el historial. Por favor, inténtalo de nuevo.`);
      }
    } catch (error) {
      setError('Error al guardar el historial');
      const action = editingRecord ? 'actualizar' : 'crear';
      const title = editingRecord ? 'Error al Actualizar' : 'Error al Crear';
      showAlert('error', title, `Ocurrió un error inesperado al ${action} el historial. Por favor, inténtalo de nuevo.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingRecord(null);
  };

  // Sistema de alertas
  const showAlert = (type, title, message) => {
    setAlert({ isOpen: true, type, title, message });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = filters.q;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">📝 Historiales Clínicos</h1>
            <p className="text-gray-600">Gestiona los historiales médicos de los pacientes</p>
          </div>
          <button
            onClick={handleNewRecord}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Historial
          </button>
        </div>

        {/* Filtros integrados */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Total de historiales: {pagination.total || 0}
            </span>
            {pagination.from && pagination.to && (
              <span className="text-sm text-gray-500">
                (Mostrando {pagination.from} a {pagination.to})
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <input
              type="text"
              placeholder="Buscar..."
              value={filters.q}
              onChange={(e) => handleFilterChange('q', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                title="Limpiar filtros"
              >
                ✕ Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabla de historiales */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-700">ID</th>
                <th className="px-3 py-2 text-left font-medium text-gray-700">Fecha</th>
                <th className="px-3 py-2 text-left font-medium text-gray-700">Diagnóstico</th>
                <th className="px-3 py-2 text-left font-medium text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-3 py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      Cargando historiales...
                    </div>
                  </td>
                </tr>
              ) : medicalRecords.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-3 py-8 text-center text-gray-500">
                    No se encontraron historiales clínicos
                  </td>
                </tr>
              ) : (
                medicalRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        #{record.id}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-600">
                      {record.created_at ? new Date(record.created_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </td>
                    <td className="px-3 py-2">
                      {record.assessment ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {record.assessment.length > 30 ? `${record.assessment.substring(0, 30)}...` : record.assessment}
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Sin diagnóstico
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button 
                          className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                          onClick={() => handleEditRecord(record)}
                          disabled={loading}
                        >
                          Editar
                        </button>
                        <button 
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          onClick={() => handleDeleteRecord(record)}
                          disabled={loading}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {pagination.last_page > 1 && (
          <div className="px-3 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Mostrando {pagination.from} a {pagination.to} de {pagination.total} historiales
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFilterChange('page', pagination.current_page - 1)}
                  disabled={pagination.current_page <= 1}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ←
                </button>
                
                {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handleFilterChange('page', page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        page === pagination.current_page
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handleFilterChange('page', pagination.current_page + 1)}
                  disabled={pagination.current_page >= pagination.last_page}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación para eliminar */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">⚠</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Eliminar Historial</h3>
                <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que quieres eliminar el historial #{recordToDelete?.id} del paciente {recordToDelete?.patient?.user?.name || `Paciente #${recordToDelete?.patient_id}`}?
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDeleteRecord}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteRecord}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sistema de alertas */}
      {alert.isOpen && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`p-4 rounded-lg shadow-lg max-w-sm ${
            alert.type === 'success' ? 'bg-green-50 border border-green-200' :
            alert.type === 'error' ? 'bg-red-50 border border-red-200' :
            alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                alert.type === 'success' ? 'bg-green-100 text-green-600' :
                alert.type === 'error' ? 'bg-red-100 text-red-600' :
                alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {alert.type === 'success' ? '✓' : 
                 alert.type === 'error' ? '✕' : 
                 alert.type === 'warning' ? '⚠' : 'ℹ'}
              </div>
              <div className="flex-1">
                <h4 className={`font-semibold ${
                  alert.type === 'success' ? 'text-green-800' :
                  alert.type === 'error' ? 'text-red-800' :
                  alert.type === 'warning' ? 'text-yellow-800' :
                  'text-blue-800'
                }`}>
                  {alert.title}
                </h4>
                <p className={`text-sm mt-1 ${
                  alert.type === 'success' ? 'text-green-700' :
                  alert.type === 'error' ? 'text-red-700' :
                  alert.type === 'warning' ? 'text-yellow-700' :
                  'text-blue-700'
                }`}>
                  {alert.message}
                </p>
              </div>
              <button
                onClick={closeAlert}
                className={`text-gray-400 hover:text-gray-600 transition-colors ${
                  alert.type === 'success' ? 'hover:text-green-600' :
                  alert.type === 'error' ? 'hover:text-red-600' :
                  alert.type === 'warning' ? 'hover:text-yellow-600' :
                  'hover:text-blue-600'
                }`}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de historial clínico */}
      <MedicalRecordForm
        isOpen={showForm}
        onClose={handleCloseForm}
        onSave={handleSaveRecord}
        editingRecord={editingRecord}
        loading={loading}
      />
    </div>
  );
}

export default MedicalRecords;
