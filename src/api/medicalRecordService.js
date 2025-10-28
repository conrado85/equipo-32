import api from './axios';

export const medicalRecordService = {
  // Obtener todos los historiales clínicos con filtros avanzados
  async getAllMedicalRecords(filters = {}) {
    try {
      const params = new URLSearchParams();
      
      // Agregar filtros si están presentes
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const url = `/admin/medical-records?${params.toString()}`;
      const response = await api.get(url);
      
      return {
        success: true,
        data: response.data.data, // Respuesta completa de Laravel con paginación
        medicalRecords: response.data.data.data || [], // Array de historiales (response.data.data.data)
        pagination: {
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
          per_page: response.data.data.per_page,
          total: response.data.data.total,
          from: response.data.data.from,
          to: response.data.data.to
        }
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Obtener un historial clínico específico por ID
  async getMedicalRecordById(id) {
    try {
      const response = await api.get(`/admin/medical-records/${id}`);
      
      return {
        success: true,
        data: response.data.data,
        medicalRecord: response.data.data
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Crear un nuevo historial clínico
  async createMedicalRecord(medicalRecordData) {
    try {
      // Replicar exactamente el comportamiento del curl
      const dataToSend = {
        appointment_id: parseInt(medicalRecordData.appointment_id),
        patient_id: parseInt(medicalRecordData.patient_id),
        medical_staff_id: parseInt(medicalRecordData.medical_staff_id),
        subjective: medicalRecordData.subjective || null,
        objective: medicalRecordData.objective || null,
        assessment: medicalRecordData.assessment || null,
        plan: medicalRecordData.plan || null,
        prescriptions: medicalRecordData.prescriptions || null,
        recommendations: medicalRecordData.recommendations || null
      };
      
      const response = await api.post('/admin/medical-records', dataToSend);
      
      return {
        success: true,
        data: response.data,
        medicalRecord: response.data.data,
        message: response.data.message || 'Historial clínico creado exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Actualizar un historial clínico existente
  async updateMedicalRecord(id, medicalRecordData) {
    try {
      const response = await api.put(`/admin/medical-records/${id}`, medicalRecordData);
      
      return {
        success: true,
        data: response.data,
        medicalRecord: response.data.data,
        message: response.data.message || 'Historial clínico actualizado exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Eliminar un historial clínico
  async deleteMedicalRecord(id) {
    try {
      const response = await api.delete(`/admin/medical-records/${id}`);
      
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Historial clínico eliminado exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Obtener log de auditoría de un historial clínico
  async getMedicalRecordAudit(id) {
    try {
      const response = await api.get(`/admin/medical-records/${id}/audit`);
      
      return {
        success: true,
        data: response.data.data,
        auditLog: response.data.data
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Manejo de errores
  handleError(error) {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 422 && data?.errors) {
        return {
          success: false,
          errors: data.errors,
          message: 'Errores de validación'
        };
      } else if (status === 401) {
        localStorage.removeItem('token');
        return {
          success: false,
          message: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
          redirectToLogin: true
        };
      } else {
        return {
          success: false,
          message: data?.message || 'Error del servidor',
          status: status
        };
      }
    } else if (error.request) {
      return {
        success: false,
        message: 'Error de conexión con el servidor'
      };
    } else {
      return {
        success: false,
        message: error.message || 'Error inesperado'
      };
    }
  }
};

export default medicalRecordService;
