import React, { useEffect, useState } from 'react';
import { userService, specialtyService } from '../../api';
import ConfirmModal from '../../components/ConfirmModal';
import Alert from '../../components/Alert';

function Doctors() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [pagination, setPagination] = useState({});
  const [alert, setAlert] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [showConfirm, setShowConfirm] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', password_confirmation: '', professional_license: '', specialty_id: '' });
  const [specialties, setSpecialties] = useState([]);

  const [filters, setFilters] = useState({
    q: '',
    role: 'doctor', // fijo a doctores
    per_page: 4,
    page: 1,
    sort_by: 'created_at',
    sort_dir: 'desc'
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value, page: name === 'page' ? value : 1 }));
  };

  const handleClearFilters = () => {
    setFilters({ q: '', role: 'doctor', per_page: 4, page: 1, sort_by: 'created_at', sort_dir: 'desc' });
  };

  const showAlert = (type, title, message) => setAlert({ isOpen: true, type, title, message });
  const closeAlert = () => setAlert(prev => ({ ...prev, isOpen: false }));

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await userService.listUsers(filters);
      if (result.success) {
        setDoctors(result.users || []);
        setPagination(result.pagination || {});
      } else {
        const msg = result.errors ? Object.values(result.errors).flat().join(' \n ') : result.message;
        setError(msg || 'Error al cargar doctores');
      }
    } catch {
      setError('Error al cargar doctores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDoctors(); }, [filters]);
  useEffect(() => { (async () => { const res = await specialtyService.listSpecialties(); if (res.success) setSpecialties(res.specialties); })(); }, []);

  const askSoftDelete = (doctor) => { setDoctorToDelete(doctor); setShowConfirm(true); };
  const cancelDelete = () => { setDoctorToDelete(null); setShowConfirm(false); };
  const confirmSoftDelete = async () => {
    if (!doctorToDelete) return;
    try {
      setLoading(true);
      const res = await userService.deleteUser(doctorToDelete.id);
      showAlert('success', 'Doctor eliminado', res.message || `Doctor #${doctorToDelete.id} eliminado`);
      await loadDoctors();
    } catch {
      showAlert('error', 'Error', 'No se pudo eliminar el doctor');
    } finally {
      setLoading(false);
      cancelDelete();
    }
  };

  const restore = async (doctor) => {
    setLoading(true);
    const res = await userService.restoreUser(doctor.id);
    showAlert('success', 'Doctor restaurado', res.message || `Doctor #${doctor.id} restaurado`);
    await loadDoctors();
  };

  const openEdit = async (doctor) => {
    // Prefill inmediato
    setEditingDoctor(doctor);
    setEditForm({ name: doctor.name || '', email: doctor.email || '' });
    try {
      setLoading(true);
      const result = await userService.getUserById(doctor.id);
      if (result.success) {
        const d = result.user || result.data?.data || {};
        setEditingDoctor(prev => ({ ...prev, ...d }));
        setEditForm({ name: d.name || doctor.name || '', email: d.email || doctor.email || '' });
      } else {
        const msg = result.errors ? Object.values(result.errors).flat().join(' \n ') : result.message;
        showAlert('error', 'Error al cargar', msg || 'No se pudo cargar el doctor');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async () => {
    if (!editingDoctor) return;
    try {
      setLoading(true);
      const result = await userService.updateDoctor(editingDoctor.id, editForm);
      if (result.success) {
        showAlert('success', 'Doctor actualizado', 'Los datos se actualizaron correctamente');
        setEditingDoctor(null);
        await loadDoctors();
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
        <h1 className="text-3xl font-bold text-gray-800">👨‍⚕️ Gestión de Doctores</h1>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() => setShowCreate(true)}
          disabled={loading}
        >
          + Nuevo Doctor
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p>Cargando doctores...</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Total de doctores: {pagination.total || doctors.length}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={filters.q}
                    onChange={(e) => handleFilterChange('q', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>
                {pagination.total && (
                  <span className="text-sm text-gray-500">Página {pagination.current_page} de {pagination.last_page}</span>
                )}
              </div>
            </div>

            {doctors.length > 0 ? (
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
                    {doctors.map(doctor => (
                      <tr key={doctor.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2"><span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">#{doctor.id}</span></td>
                        <td className="px-3 py-2 text-gray-600">{doctor.name}</td>
                        <td className="px-3 py-2 text-gray-600">{doctor.email}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-1">
                            {!doctor.deleted_at && (
                              <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors" onClick={() => openEdit(doctor)} disabled={loading}>Editar</button>
                            )}
                            {!doctor.deleted_at ? (
                              <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors" onClick={() => askSoftDelete(doctor)} disabled={loading}>Eliminar</button>
                            ) : (
                              <>
                                <button className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors" onClick={() => restore(doctor)} disabled={loading}>Restaurar</button>
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
                <p className="text-lg">No hay doctores disponibles</p>
                <p className="text-sm mt-2">Aparecerán aquí una vez que se carguen desde el servidor</p>
              </div>
            )}

            {pagination.total && pagination.last_page > 1 && (
              <div className="flex justify-between items-center mt-4 px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-700">Mostrando {pagination.from || 0} a {pagination.to || 0} de {pagination.total || 0} doctores</div>
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
        <ConfirmModal
          isOpen={showConfirm}
          onClose={cancelDelete}
          onConfirm={confirmSoftDelete}
          title="Eliminar Doctor"
          message={`¿Seguro que deseas eliminar al doctor #${doctorToDelete?.id}? Esta acción es reversible.`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          isLoading={loading}
          type="danger"
        />
      )}

      {editingDoctor && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar doctor #{editingDoctor.id}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.name} onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={editForm.email} onChange={(e) => setEditForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md" onClick={() => setEditingDoctor(null)}>Cancelar</button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50" disabled={loading} onClick={saveEdit}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      <Alert isOpen={alert.isOpen} onClose={closeAlert} type={alert.type} title={alert.title} message={alert.message} duration={5000} />
      {showCreate && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuevo doctor</h3>
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
                <label className="block text-sm text-gray-700 mb-1">Licencia profesional</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.professional_license} onChange={(e) => setCreateForm(f => ({ ...f, professional_license: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Especialidad</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900" value={createForm.specialty_id} onChange={(e) => setCreateForm(f => ({ ...f, specialty_id: e.target.value }))}>
                  <option value="">Selecciona especialidad...</option>
                  {specialties.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
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
                  const res = await userService.createDoctor({ name: createForm.name, email: createForm.email, password: createForm.password, password_confirmation: createForm.password_confirmation, professional_license: createForm.professional_license, specialty_id: parseInt(createForm.specialty_id, 10) });
                  if (res.success) {
                    showAlert('success', 'Doctor creado', 'El doctor se creó correctamente');
                    setShowCreate(false);
                    setCreateForm({ name: '', email: '', password: '', password_confirmation: '', professional_license: '', specialty_id: '' });
                    await loadDoctors();
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
    </div>
  );
}

export default Doctors;




