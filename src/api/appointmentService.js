import api from './axios';

export const appointmentService = {
  // Obtener todas las citas con filtros avanzados
  async getAllAppointments(filters = {}) {
    try {
      
      const params = new URLSearchParams();
      
      // Agregar filtros si están presentes
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const url = `/admin/appointments?${params.toString()}`;

      const response = await api.get(url);
      
      
      return {
        success: true,
        data: response.data.data, // Respuesta completa de Laravel con paginación
        appointments: response.data.data.data || [], // Array de citas (response.data.data.data)
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

  // Obtener una cita específica por ID
  async getAppointmentById(id) {
    try {
      const response = await api.get(`/admin/appointments/${id}`);
      return {
        success: true,
        data: response.data.data, // Los datos de la cita están directamente en response.data.data
        appointment: response.data.data
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Crear una nueva cita
  async createAppointment(appointmentData) {
    try {
      
      // Replicar exactamente el comportamiento del curl
      const dataToSend = {
        patient_id: parseInt(appointmentData.patient_id),
        specialty_id: parseInt(appointmentData.specialty_id),
        start_date: appointmentData.start_date,
        end_date: appointmentData.end_date,
        type: appointmentData.type,
        status: appointmentData.status,
        reason: appointmentData.reason,
        urgent: appointmentData.urgent,
        priority: parseInt(appointmentData.priority)
      };
      
      
      const response = await api.post('/admin/appointments', dataToSend);
      
      
      return {
        success: true,
        data: response.data,
        appointment: response.data.data,
        message: response.data.message || 'Cita creada exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Actualizar una cita existente
  async updateAppointment(id, appointmentData) {
    try {
      const response = await api.put(`/admin/appointments/${id}`, appointmentData);
      return {
        success: true,
        data: response.data,
        appointment: response.data.data,
        message: response.data.message || 'Cita actualizada exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Eliminar una cita
  async deleteAppointment(id) {
    try {
      const response = await api.delete(`/admin/appointments/${id}`);
      return {
        success: true,
        message: response.data.message || 'Cita eliminada exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Cambiar estado de una cita
  async updateAppointmentStatus(id, status) {
    try {
      const response = await api.patch(`/admin/appointments/${id}/status`, { status });
      return {
        success: true,
        data: response.data,
        appointment: response.data.data,
        message: response.data.message || 'Estado de cita actualizado exitosamente'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Obtener estadísticas de citas
  async getAppointmentStats(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      });

      const response = await api.get(`/admin/appointments/stats?${params.toString()}`);
      return {
        success: true,
        data: response.data,
        stats: response.data.data
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Obtener doctores disponibles para una especialidad y fecha
  async getAvailableDoctors(specialtyId, date, type = 'presencial') {
    try {
      const response = await api.get(`/admin/appointments/available-doctors`, {
        params: { specialty_id: specialtyId, date, type }
      });
      return {
        success: true,
        data: response.data,
        doctors: response.data.data || []
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Obtener horarios disponibles para un doctor
  async getAvailableSlots(doctorId, date) {
    try {
      const response = await api.get(`/admin/appointments/available-slots`, {
        params: { doctor_id: doctorId, date }
      });
      return {
        success: true,
        data: response.data,
        slots: response.data.data || []
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  // Manejo de errores
  handleError(error) {
    console.error('Error en appointmentService:', error);
    
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
      } else if (status === 404) {
        return {
          success: false,
          message: 'Cita no encontrada'
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

export default appointmentService;
