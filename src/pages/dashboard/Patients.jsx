import React, { useEffect, useState } from 'react';
import { userService } from '../../api';
import ConfirmModal from '../../components/ConfirmModal';
import Alert from '../../components/Alert';

function Patients() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);
  const [pagination, setPagination] = useState({});
  const [alert, setAlert] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', birth_date: '', gender: '', phone: '', address: '', blood_type: '', allergies: '', current_medications: '', insurance_number: '', emergency_contact_name: '', emergency_contact_phone: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', password_confirmation: '', birth_date: '', gender: '', phone: '', address: '', blood_type: '', allergies: '', current_medications: '', insurance_number: '', emergency_contact_name: '', emergency_contact_phone: '' });

  const [filters, setFilters] = useState({
    q: '',
    role: 'patient',
    per_page: 4,
    page: 1,
    sort_by: 'created_at',
    sort_dir: 'desc'
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value, page: name === 'page' ? value : 1 }));
  };

  const handleClearFilters = () => {
    setFilters({ q: '', role: 'patient', per_page: 4, page: 1, sort_by: 'created_at', sort_dir: 'desc' });
  };

  const showAlert = (type, title, message) => setAlert({ isOpen: true, type, title, message });
  const closeAlert = () => setAlert(prev => ({ ...prev, isOpen: false }));

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await userService.listUsers(filters);
      if (result.success) {
        setPatients(result.users || []);
        setPagination(result.pagination || {});
      } else {
        const msg = result.errors ? Object.values(result.errors).flat().join(' \n ') : result.message;
        setError(msg || 'Error al cargar pacientes');
      }
    } catch {
      setError('Error al cargar pacientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPatients(); }, [filters]);

  const askSoftDelete = (patient) => { setPatientToDelete(patient); setShowConfirm(true); };
  const cancelDelete = () => { setPatientToDelete(null); setShowConfirm(false); };
  const confirmSoftDelete = async () => {
    if (!patientToDelete) return;
    try {
      setLoading(true);
      const res = await userService.deleteUser(patientToDelete.id);
      showAlert('success', 'Paciente eliminado', res.message || `Paciente #${patientToDelete.id} eliminado`);
      await loadPatients();
    } catch {
      showAlert('error', 'Error', 'No se pudo eliminar el paciente');
    } finally {
      setLoading(false);
      cancelDelete();
    }
  };

  const restore = async (patient) => {
    setLoading(true);
    const res = await userService.restoreUser(patient.id);
    showAlert('success', 'Paciente restaurado', res.message || `Paciente #${patient.id} restaurado`);
    await loadPatients();
  };

  const openEdit = async (patient) => {
    setEditingPatient(patient);
    setEditForm({ name: patient.name || '', email: patient.email || '' });
    try {
      setLoading(true);
      const result = await userService.getUserById(patient.id);
      if (result.success) {
        const p = result.user || result.data?.data || {};
        setEditingPatient(prev => ({ ...prev, ...p }));
        setEditForm({
          name: p.name || patient.name || '',
          email: p.email || patient.email || '',
          birth_date: p.patient?.birth_date || '',
          gender: p.patient?.gender || '',
          phone: p.patient?.phone || '',
          address: p.patient?.address || '',
          blood_type: p.patient?.blood_type || '',
          allergies: p.patient?.allergies || '',
          current_medications: p.patient?.current_medications || '',
          insurance_number: p.patient?.insurance_number || '',
          emergency_contact_name: p.patient?.emergency_contact_name || '',
          emergency_contact_phone: p.patient?.emergency_contact_phone || ''
        });
      } else {
        const msg = result.errors ? Object.values(result.errors).flat().join(' \n ') : result.message;
        showAlert('error', 'Error al cargar', msg || 'No se pudo cargar el paciente');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async () => {
    if (!editingPatient) return;
    try {
      setLoading(true);
      const result = await userService.updatePatient(editingPatient.id, editForm);
      if (result.success) {
        showAlert('success', 'Paciente actualizado', 'Los datos se actualizaron correctamente');
        setEditingPatient(null);
        await loadPatients();
      } else {
        const msg = result.errors ? Object.values(result.errors).flat().join(' \n ') : result.message;
        showAlert('error', 'Error al actualizar', msg || 'Verifica los datos');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">❤️ Gestión de Pacientes</h1>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() => setShowCreate(true)}
          disabled={loading}
        >
          + Nuevo Paciente
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p>Cargando pacientes...</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Total de pacientes: {pagination.total || patients.length}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={filters.q}
                    onChange={(e) => handleFilterChange('q', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                  { (filters.q) && (
                    <button onClick={handleClearFilters} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm">✕ Limpiar</button>
                  )}
                </div>
                {pagination.total && (
                  <span className="text-sm text-gray-500">Página {pagination.current_page} de {pagination.last_page}</span>
                )}
              </div>
            </div>

            {patients.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">ID</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Nombre</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Email</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {patients.map(patient => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2"><span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">#{patient.id}</span></td>
                        <td className="px-3 py-2 text-gray-600">{patient.name}</td>
                        <td className="px-3 py-2 text-gray-600">{patient.email}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            {!patient.deleted_at && (
                              <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors" onClick={() => openEdit(patient)} disabled={loading}>Editar</button>
                            )}
                            {!patient.deleted_at ? (
                              <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors" onClick={() => askSoftDelete(patient)} disabled={loading}>Eliminar</button>
                            ) : (
                              <>
                                <button className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors" onClick={() => restore(patient)} disabled={loading}>Restaurar</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">No hay pacientes disponibles</p>
                <p className="text-sm mt-2">Aparecerán aquí una vez que se carguen desde el servidor</p>
              </div>
            )}

            {pagination.total && pagination.last_page > 1 && (
              <div className="flex justify-between items-center mt-4 px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-700">Mostrando {pagination.from || 0} a {pagination.to || 0} de {pagination.total || 0} pacientes</div>
                <div className="flex items-center gap-2">
                  {pagination.current_page > 3 && (<><button onClick={() => handleFilterChange('page', 1)} disabled={loading} className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">1</button>{pagination.current_page > 4 && (<span className="px-2 text-gray-500 font-medium">...</span>)}</>)}
                  <button onClick={() => handleFilterChange('page', Math.max(1, pagination.current_page - 1))} disabled={pagination.current_page === 1 || loading} className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">←</button>
                  {Array.from({ length: Math.min(3, pagination.last_page) }, (_, i) => { const startPage = Math.max(1, pagination.current_page - 1); const pageNum = startPage + i; if (pageNum > pagination.last_page) return null; return (<button key={pageNum} onClick={() => handleFilterChange('page', pageNum)} disabled={loading} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${pageNum === pagination.current_page ? 'bg-blue-600 text-white border border-blue-600 shadow-sm' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'}`}>{pageNum}</button>); })}
                  <button onClick={() => handleFilterChange('page', Math.min(pagination.last_page, pagination.current_page + 1))} disabled={pagination.current_page === pagination.last_page || loading} className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">→</button>
                  {pagination.current_page < pagination.last_page - 2 && (<><span className="px-2 text-gray-500 font-medium">...</span><button onClick={() => handleFilterChange('page', pagination.last_page)} disabled={loading} className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{pagination.last_page}</button></>)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmModal isOpen={showConfirm} onClose={cancelDelete} onConfirm={confirmSoftDelete} title="Eliminar Paciente" message={`¿Seguro que deseas eliminar al paciente #${patientToDelete?.id}? Esta acción es reversible.`} confirmText="Eliminar" cancelText="Cancelar" isLoading={loading} type="danger" />
      )}

      {editingPatient && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar paciente #{editingPatient.id}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.name} onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.email} onChange={(e) => setEditForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Fecha de nacimiento</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.birth_date} onChange={(e) => setEditForm(f => ({ ...f, birth_date: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Género</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.gender} onChange={(e) => setEditForm(f => ({ ...f, gender: e.target.value }))}>
                    <option value="">Selecciona...</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Teléfono</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.phone} onChange={(e) => setEditForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tipo de sangre</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.blood_type} onChange={(e) => setEditForm(f => ({ ...f, blood_type: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Dirección</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.address} onChange={(e) => setEditForm(f => ({ ...f, address: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Alergias</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.allergies} onChange={(e) => setEditForm(f => ({ ...f, allergies: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Medicamentos actuales</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.current_medications} onChange={(e) => setEditForm(f => ({ ...f, current_medications: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Seguro / póliza</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.insurance_number} onChange={(e) => setEditForm(f => ({ ...f, insurance_number: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Contacto de emergencia</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.emergency_contact_name} onChange={(e) => setEditForm(f => ({ ...f, emergency_contact_name: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Teléfono de emergencia</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.emergency_contact_phone} onChange={(e) => setEditForm(f => ({ ...f, emergency_contact_phone: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md" onClick={() => setEditingPatient(null)}>Cancelar</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50" disabled={loading} onClick={saveEdit}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuevo paciente</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.name} onChange={(e) => setCreateForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.email} onChange={(e) => setCreateForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Fecha de nacimiento</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.birth_date} onChange={(e) => setCreateForm(f => ({ ...f, birth_date: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Género</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.gender} onChange={(e) => setCreateForm(f => ({ ...f, gender: e.target.value }))}>
                  <option value="">Selecciona...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Teléfono</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.phone} onChange={(e) => setCreateForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tipo de sangre</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.blood_type} onChange={(e) => setCreateForm(f => ({ ...f, blood_type: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Dirección</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.address} onChange={(e) => setCreateForm(f => ({ ...f, address: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Alergias</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.allergies} onChange={(e) => setCreateForm(f => ({ ...f, allergies: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Medicamentos actuales</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.current_medications} onChange={(e) => setCreateForm(f => ({ ...f, current_medications: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Seguro / póliza</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.insurance_number} onChange={(e) => setCreateForm(f => ({ ...f, insurance_number: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Contacto de emergencia</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.emergency_contact_name} onChange={(e) => setCreateForm(f => ({ ...f, emergency_contact_name: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Teléfono de emergencia</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.emergency_contact_phone} onChange={(e) => setCreateForm(f => ({ ...f, emergency_contact_phone: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contraseña</label>
                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.password} onChange={(e) => setCreateForm(f => ({ ...f, password: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Confirmar contraseña</label>
                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.password_confirmation} onChange={(e) => setCreateForm(f => ({ ...f, password_confirmation: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md" onClick={() => setShowCreate(false)}>Cancelar</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50" disabled={loading} onClick={async () => {
                try {
                  setLoading(true);
                  const res = await userService.createPatient({
                    name: createForm.name,
                    email: createForm.email,
                    password: createForm.password,
                    password_confirmation: createForm.password_confirmation,
                    birth_date: createForm.birth_date,
                    gender: createForm.gender,
                    phone: createForm.phone,
                    address: createForm.address,
                    blood_type: createForm.blood_type,
                    allergies: createForm.allergies,
                    current_medications: createForm.current_medications,
                    insurance_number: createForm.insurance_number,
                    emergency_contact_name: createForm.emergency_contact_name,
                    emergency_contact_phone: createForm.emergency_contact_phone
                  });
                  if (res.success) {
                    showAlert('success', 'Paciente creado', 'El paciente se creó correctamente');
                    setShowCreate(false);
                    setCreateForm({ name: '', email: '', password: '', password_confirmation: '', birth_date: '', gender: '', phone: '', address: '', blood_type: '', allergies: '', current_medications: '', insurance_number: '', emergency_contact_name: '', emergency_contact_phone: '' });
                    await loadPatients();
                  } else {
                    const msg = res.errors ? Object.values(res.errors).flat().join(' \n ') : res.message;
                    showAlert('error', 'Error al crear', msg || 'Revisa los datos');
                  }
                } finally { setLoading(false); }
              }}>Crear</button>
            </div>
          </div>
        </div>
      )}

      <Alert isOpen={alert.isOpen} onClose={closeAlert} type={alert.type} title={alert.title} message={alert.message} duration={5000} />
    </div>
  );
}

export default Patients;




