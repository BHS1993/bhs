// Admin Authentication System
class AdminAuth {
    constructor() {
        this.apiBaseUrl = window.location.origin;
        this.tokenKey = 'adminToken';
        this.userKey = 'adminUser';
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupAuthRefresh();
    }

    async checkAuth() {
        try {
            // Check if user is logged in
            const token = this.getToken();
            const user = this.getUser();

            if (!token || !user) {
                this.redirectToLogin();
                return;
            }

            // Validate token with backend
            const isValid = await this.validateToken(token);
            if (!isValid) {
                this.clearAuth();
                this.redirectToLogin();
                return;
            }

            // Update user info in UI
            this.updateUserInfo(user);
            
            // Setup logout functionality
            this.setupLogout();

        } catch (error) {
            console.error('Auth check error:', error);
            this.redirectToLogin();
        }
    }

    async validateToken(token) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = await response.json();
                // Update user data if needed
                this.setUser(userData);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    }

    getToken() {
        return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
    }

    getUser() {
        const userData = localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
        return userData ? JSON.parse(userData) : null;
    }

    setToken(token, remember = false) {
        if (remember) {
            localStorage.setItem(this.tokenKey, token);
        } else {
            sessionStorage.setItem(this.tokenKey, token);
        }
    }

    setUser(user, remember = false) {
        const userData = JSON.stringify(user);
        if (remember) {
            localStorage.setItem(this.userKey, userData);
        } else {
            sessionStorage.setItem(this.userKey, userData);
        }
    }

    clearAuth() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        sessionStorage.removeItem(this.tokenKey);
        sessionStorage.removeItem(this.userKey);
    }

    redirectToLogin() {
        window.location.href = '../login.html';
    }

    updateUserInfo(user) {
        const userAvatar = document.querySelector('.user-avatar');
        const userName = document.querySelector('.user-menu div div');
        
        if (userAvatar) {
            userAvatar.textContent = user.name ? user.name.charAt(0).toUpperCase() : 'A';
        }
        
        if (userName) {
            userName.innerHTML = `
                <div style="font-weight: 500; font-size: 14px;">${user.name || 'Admin'}</div>
                <div style="font-size: 12px; color: var(--gray);">প্রশাসক</div>
            `;
        }
    }

    setupLogout() {
        const logoutBtns = document.querySelectorAll('.logout-btn');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        });
    }

    async logout() {
        try {
            const token = this.getToken();
            if (token) {
                // Call logout API
                await fetch(`${this.apiBaseUrl}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            this.clearAuth();
            this.redirectToLogin();
        }
    }

    setupAuthRefresh() {
        // Refresh token every 10 minutes
        setInterval(async () => {
            const token = this.getToken();
            if (token) {
                try {
                    const response = await fetch(`${this.apiBaseUrl}/api/auth/refresh`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        this.setToken(data.token);
                    } else {
                        this.clearAuth();
                        this.redirectToLogin();
                    }
                } catch (error) {
                    console.error('Token refresh error:', error);
                }
            }
        }, 10 * 60 * 1000); // 10 minutes
    }

    // Static method to check if user is authenticated
    static isAuthenticated() {
        const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
        const user = localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser');
        return !!(token && user);
    }

    // Static method to get current user
    static getCurrentUser() {
        const userData = localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser');
        return userData ? JSON.parse(userData) : null;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminAuth;
}
