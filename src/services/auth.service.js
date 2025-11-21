/**
 * VITAL - Authentication Service (Simplified)
 * 
 * Sistema de autenticación simplificado con 2 roles:
 * - ADMIN: VITAL Empresarial (8 módulos administrativos)
 * - USER: VITAL Persona (6 módulos de usuario/paciente)
 */

// Define user roles
export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
};

// Mock users database
const MOCK_USERS = {
    // Admin - VITAL EMPRESARIAL (8 módulos admin)
    'admin': {
        id: 1,
        email: 'admin@vital.sv',
        password: 'admin',
        name: 'Administrador',
        role: ROLES.ADMIN,
        avatar: '👨‍💼',
        description: 'VITAL Empresarial - Acceso a módulos administrativos'
    },

    // User - VITAL PERSONA (6 módulos usuario)
    'user': {
        id: 2,
        email: 'user@vital.sv',
        password: 'user',
        name: 'Usuario Demo',
        role: ROLES.USER,
        avatar: '👤',
        description: 'VITAL Persona - Vista de paciente'
    }
};

class AuthService {
    constructor() {
        this.currentUser = null;
        this.token = null;
        this.loadFromStorage();
    }

    /**
     * Save auth state to localStorage
     */
    saveToStorage() {
        if (this.currentUser && this.token) {
            localStorage.setItem('vital_user', JSON.stringify(this.currentUser));
            localStorage.setItem('vital_token', this.token);
        }
    }

    /**
     * Load auth state from localStorage
     */
    loadFromStorage() {
        const savedUser = localStorage.getItem('vital_user');
        const savedToken = localStorage.getItem('vital_token');

        if (savedUser && savedToken) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.token = savedToken;
            } catch (e) {
                console.error('Error loading auth from storage:', e);
                this.clearStorage();
            }
        }
    }

    /**
     * Clear auth data from storage
     */
    clearStorage() {
        localStorage.removeItem('vital_user');
        localStorage.removeItem('vital_token');
        this.currentUser = null;
        this.token = null;
    }

    /**
     * Login with username and password
     */
    async login(username, password) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = MOCK_USERS[username.toLowerCase()];

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // If password is provided and does not match, throw error. If password is empty/undefined, skip check.
        if (password && user.password !== password) {
            throw new Error('Contraseña incorrecta');
        }

        // Create user session (without password)
        this.currentUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            description: user.description
        };

        // Generate mock JWT token
        this.token = `mock-jwt-${user.id}-${Date.now()}`;

        // Save to localStorage
        this.saveToStorage();

        return this.currentUser;
    }

    /**
     * Logout current user
     */
    logout() {
        this.clearStorage();
        window.location.hash = '/login';
        window.location.reload();
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!(this.currentUser && this.token);
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Get user role
     */
    getUserRole() {
        return this.currentUser?.role || null;
    }

    /**
     * Check if user is admin (VITAL Empresarial)
     */
    isAdmin() {
        return this.currentUser?.role === ROLES.ADMIN;
    }

    /**
     * Check if user is regular user (VITAL Persona)
     */
    isUser() {
        return this.currentUser?.role === ROLES.USER;
    }

    /**
     * Get demo credentials for login page
     */
    getDemoCredentials() {
        return [
            {
                username: 'admin',
                password: 'admin',
                title: '🏢 VITAL Empresarial',
                description: 'Acceso a módulos administrativos',
                modules: '8 módulos admin'
            },
            {
                username: 'user',
                password: 'user',
                title: '👤 VITAL Persona',
                description: 'Vista de usuario/paciente',
                modules: '6 módulos usuario'
            }
        ];
    }
}

// Create singleton instance
export const authService = new AuthService();
