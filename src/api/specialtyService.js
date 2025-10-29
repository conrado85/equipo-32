import api from './axios';

export const specialtyService = {
  async listSpecialties(params = {}) {
    try {
      const query = new URLSearchParams();
      const merged = { per_page: 100, sort_by: 'name', sort_dir: 'asc', ...params };
      Object.entries(merged).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') query.append(k, v);
      });
      const res = await api.get(`/specialties?${query.toString()}`);
      return { success: true, data: res.data, specialties: res.data?.data || [] };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error al cargar especialidades' };
    }
  }
};

export default specialtyService;

