import api from './axios';

export const authService = {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return {
        success: true,
        data: response.data,
        message: 'Usuario registrado con éxito'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token || response.data.access_token;
      
      if (!token) {
        throw new Error('No se recibió el token del servidor');
      }

      localStorage.setItem('token', token);
      
      return {
        success: true,
        data: response.data,
        token: token,
        message: 'Inicio de sesión exitoso'
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return {
        success: true,
        data: response.data,
        user: response.data.user
      };
    } catch (error) {
      return this.handleError(error);
    }
  },

  logout() {
    localStorage.removeItem(    'token');
    return {
      success: true,
      message: 'Sesión cerrada exitosamente'
    };
  },

  handleError(error) {
    console.error('Error en authService:', error);
    
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

export default authService;
