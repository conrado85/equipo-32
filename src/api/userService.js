import api from './axios';

export const userService = {
  async listUsers(filters = {}) {
    try {
      const params = new URLSearchParams();
      // Elegir endpoint y adaptar parámetros según especificación
      const isTrashedEndpoint = filters.only_trashed === true;
      // No enviar booleanos en false; castear enteros
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        if ((key === 'with_trashed' || key === 'only_trashed') && value !== true) return;
        // El endpoint de 'trashed' usa sort_order en lugar de sort_dir
        if (isTrashedEndpoint && key === 'sort_dir') {
          params.append('sort_order', value);
          return;
        }
        if (key === 'per_page' || key === 'page') params.append(key, parseInt(value, 10));
        else params.append(key, value);
      });
      const endpoint = isTrashedEndpoint ? '/admin/users/trashed' : '/admin/users';
      const response = await api.get(`${endpoint}?${params.toString()}`);
      const payload = response.data?.data || {};
      return {
        success: true,
        data: response.data,
        users: payload.data || [],
        pagination: {
          current_page: payload.current_page,
          last_page: payload.last_page,
          per_page: payload.per_page,
          total: payload.total,
          from: payload.from,
          to: payload.to,
        },
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  async getUserById(id) {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return { success: true, data: response.data, user: response.data?.data };
    } catch (error) {
      return this.handleError(error);
    }
  },

  async deleteUser(id) {
    try {
      const response = await api.delete(`/admin/users/${id}`);
      return { success: true, message: response.data?.message || 'Usuario eliminado' };
    } catch (error) {
      return this.handleError(error);
    }
  },

  async restoreUser(id) {
    try {
      const response = await api.post(`/admin/users/${id}/restore`);
      return { success: true, message: response.data?.message || 'Usuario restaurado' };
    } catch (error) {
      return this.handleError(error);
    }
  },

  async forceDeleteUser(id) {
    try {
      const response = await api.delete(`/admin/users/${id}/force`);
      return { success: true, message: response.data?.message || 'Usuario eliminado permanentemente' };
    } catch (error) {
      return this.handleError(error);
    }
  },

  async createAdmin(data) {
    try {
      const response = await api.post('/admin/users/admin', data);
      return { success: true, data: response.data, user: response.data?.data };
    } catch (error) { return this.handleError(error); }
  },

  async createPatient(data) {
    try {
      const response = await api.post('/admin/users/patient', data);
      return { success: true, data: response.data, user: response.data?.data };
    } catch (error) { return this.handleError(error); }
  },

  async createDoctor(data) {
    try {
      const response = await api.post('/admin/users/doctor', data);
      return { success: true, data: response.data, user: response.data?.data };
    } catch (error) { return this.handleError(error); }
  },

  async updateAdmin(id, data) {
    try {
      const response = await api.put(`/admin/users/${id}/admin`, data);
      return { success: true, data: response.data, user: response.data?.data };
    } catch (error) { return this.handleError(error); }
  },

  async updatePatient(id, data) {
    try {
      const response = await api.put(`/admin/users/${id}/patient`, data);
      return { success: true, data: response.data, user: response.data?.data };
    } catch (error) { return this.handleError(error); }
  },

  async updateDoctor(id, data) {
    try {
      const response = await api.put(`/admin/users/${id}/doctor`, data);
      return { success: true, data: response.data, user: response.data?.data };
    } catch (error) { return this.handleError(error); }
  },

  handleError(error) {
    console.error('Error en userService:', error);
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422 && data?.errors) {
        return { success: false, errors: data.errors, message: 'Errores de validación' };
      }
      if (status === 401) {
        localStorage.removeItem('token');
        return { success: false, message: 'Sesión expirada', redirectToLogin: true };
      }
      if (status === 404) {
        return { success: false, message: 'Usuario no encontrado' };
      }
      return { success: false, message: data?.message || 'Error del servidor', status };
    }
    if (error.request) return { success: false, message: 'Error de conexión con el servidor' };
    return { success: false, message: error.message || 'Error inesperado' };
  }
};

export default userService;

