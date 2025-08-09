/**
 * School Management System - Main JavaScript File
 * Bhatia High School
 */

(function() {
    'use strict';

    // Global School App Object
    window.schoolApp = {
        // Configuration
        config: {
            apiBaseUrl: '/api',
            defaultLanguage: 'bn',
            animationDuration: 300,
            notificationDuration: 5000
        },

        // Initialize the application
        init: function() {
            this.setupEventListeners();
            this.initializeLanguage();
            this.setupNavigation();
            this.setupAnimations();
            this.setupFormValidation();
            this.setupNotifications();
            console.log('School App initialized successfully');
        },

        // Setup all event listeners
        setupEventListeners: function() {
            // Language selector
            const languageSelector = document.getElementById('languageSelector');
            if (languageSelector) {
                languageSelector.addEventListener('change', this.handleLanguageChange.bind(this));
            }

            // Mobile menu toggle
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenuToggle) {
                mobileMenuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
            }

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', this.handleSmoothScroll.bind(this));
            });

            // Form submissions
            document.querySelectorAll('form').forEach(form => {
                form.addEventListener('submit', this.handleFormSubmission.bind(this));
            });

            // Search functionality
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.addEventListener('input', this.handleSearch.bind(this));
            }
        },

        // Initialize language settings
        initializeLanguage: function() {
            const savedLanguage = localStorage.getItem('schoolLanguage') || this.config.defaultLanguage;
            document.body.classList.add(savedLanguage === 'en' ? 'english' : 'bengali');
            
            const languageSelector = document.getElementById('languageSelector');
            if (languageSelector) {
                languageSelector.value = savedLanguage;
            }
        },

        // Handle language change
        handleLanguageChange: function(event) {
            const selectedLanguage = event.target.value;
            localStorage.setItem('schoolLanguage', selectedLanguage);
            
            if (selectedLanguage === 'en') {
                document.body.classList.add('english');
                document.body.classList.remove('bengali');
            } else {
                document.body.classList.add('bengali');
                document.body.classList.remove('english');
            }

            this.showNotification('ভাষা পরিবর্তন করা হয়েছে', 'success');
        },

        // Setup navigation functionality
        setupNavigation: function() {
            // Active navigation highlighting
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section[id]');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        },

        // Setup animations
        setupAnimations: function() {
            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });

            // Counter animations
            this.setupCounterAnimations();
        },

        // Setup counter animations
        setupCounterAnimations: function() {
            const counters = document.querySelectorAll('.stat-number');
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        },

        // Animate counter
        animateCounter: function(counter) {
            const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        },

        // Setup form validation
        setupFormValidation: function() {
            const forms = document.querySelectorAll('form[data-validate]');
            
            forms.forEach(form => {
                const inputs = form.querySelectorAll('input, select, textarea');
                
                inputs.forEach(input => {
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });
                    
                    input.addEventListener('input', () => {
                        if (input.classList.contains('is-invalid')) {
                            this.validateField(input);
                        }
                    });
                });
            });
        },

        // Validate form field
        validateField: function(field) {
            const value = field.value.trim();
            const type = field.type;
            const required = field.hasAttribute('required');
            
            // Remove existing validation classes
            field.classList.remove('is-valid', 'is-invalid');
            
            // Check if required field is empty
            if (required && !value) {
                field.classList.add('is-invalid');
                this.showFieldError(field, 'এই ক্ষেত্রটি প্রয়োজনীয়');
                return false;
            }
            
            // Email validation
            if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    field.classList.add('is-invalid');
                    this.showFieldError(field, 'সঠিক ইমেইল ঠিকানা দিন');
                    return false;
                }
            }
            
            // Phone validation
            if (field.name === 'phone' && value) {
                const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
                if (!phoneRegex.test(value)) {
                    field.classList.add('is-invalid');
                    this.showFieldError(field, 'সঠিক ফোন নম্বর দিন');
                    return false;
                }
            }
            
            // If all validations pass
            if (value) {
                field.classList.add('is-valid');
                this.removeFieldError(field);
            }
            
            return true;
        },

        // Enhanced notification system
        showNotification: function(message, type = 'info', duration = 5000) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="notification-message">
                        <i class="fas ${this.getNotificationIcon(type)}"></i>
                        <span>${message}</span>
                    </div>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

            // Add to container
            let container = document.querySelector('.notification-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'notification-container';
                document.body.appendChild(container);
            }
            container.appendChild(notification);

            // Show animation
            setTimeout(() => notification.classList.add('show'), 100);

            // Auto remove
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);

            // Manual close
            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            });
        },

        // Get notification icon based on type
        getNotificationIcon: function(type) {
            const icons = {
                'success': 'fa-check-circle',
                'error': 'fa-exclamation-circle',
                'warning': 'fa-exclamation-triangle',
                'info': 'fa-info-circle'
            };
            return icons[type] || icons.info;
        },

        // Show loading spinner
        showLoading: function(container, message = 'লোড হচ্ছে...') {
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.innerHTML = `
                <div class="spinner-overlay">
                    <div class="spinner">
                        <div class="spinner-border"></div>
                    </div>
                    <p class="spinner-text">${message}</p>
                </div>
            `;
            container.appendChild(spinner);
            return spinner;
        },

        // Hide loading spinner
        hideLoading: function(spinner) {
            if (spinner && spinner.parentNode) {
                spinner.parentNode.removeChild(spinner);
            }
        },

        // Enhanced form validation
        validateForm: function(form) {
            const inputs = form.querySelectorAll('input, select, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    this.showFieldError(input, 'এই ফিল্ডটি প্রয়োজনীয়');
                    isValid = false;
                } else if (input.type === 'email' && input.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        this.showFieldError(input, 'সঠিক ইমেইল ঠিকানা দিন');
                        isValid = false;
                    }
                } else if (input.type === 'tel' && input.value) {
                    const phoneRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
                    if (!phoneRegex.test(input.value.replace(/\s/g, ''))) {
                        this.showFieldError(input, 'সঠিক ফোন নম্বর দিন');
                        isValid = false;
                    }
                } else {
                    this.clearFieldError(input);
                }
            });

            return isValid;
        },

        // Show field error
        showFieldError: function(field, message) {
            field.classList.add('is-invalid');
            let errorElement = field.parentNode.querySelector('.field-error');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                field.parentNode.appendChild(errorElement);
            }
            errorElement.textContent = message;
        },

        // Clear field error
        clearFieldError: function(field) {
            field.classList.remove('is-invalid');
            const errorElement = field.parentNode.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        },

        // Handle form submission
        handleFormSubmission: function(event) {
            const form = event.target;
            const formData = new FormData(form);
            
            // Validate all fields
            const inputs = form.querySelectorAll('input, select, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                event.preventDefault();
                this.showNotification('অনুগ্রহ করে সব ক্ষেত্র সঠিকভাবে পূরণ করুন', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="spinner"></span> পাঠানো হচ্ছে...';
                submitButton.disabled = true;
                
                // Reset button after a delay (simulate API call)
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    this.showNotification('ফর্ম সফলভাবে জমা হয়েছে', 'success');
                }, 2000);
            }
        },

        // Setup notifications
        setupNotifications: function() {
            // Create notification container
            if (!document.querySelector('.notification-container')) {
                const container = document.createElement('div');
                container.className = 'notification-container';
                document.body.appendChild(container);
            }
        },

        // Remove notification
        removeNotification: function(notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        },

        // Handle smooth scrolling
        handleSmoothScroll: function(event) {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        },

        // Toggle mobile menu
        toggleMobileMenu: function() {
            const navMenu = document.querySelector('.nav-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && toggle) {
                navMenu.classList.toggle('active');
                toggle.classList.toggle('active');
            }
        },

        // Handle search
        handleSearch: function(event) {
            const query = event.target.value.toLowerCase();
            const searchableElements = document.querySelectorAll('[data-search]');
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query)) {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
            });
        },

        // Utility functions
        utils: {
            // Format date
            formatDate: function(date) {
                return new Intl.DateTimeFormat('bn-BD', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(date);
            },

            // Format currency
            formatCurrency: function(amount) {
                return new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT'
                }).format(amount);
            },

            // Debounce function
            debounce: function(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },

            // Throttle function
            throttle: function(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                };
            }
        },

        // Enhanced error handling
        handleError: function(error, context = '') {
            console.error(`Error in ${context}:`, error);
            
            let userMessage = 'কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।';
            
            if (error.name === 'NetworkError') {
                userMessage = 'নেটওয়ার্ক সমস্যা। ইন্টারনেট সংযোগ চেক করুন।';
            } else if (error.name === 'ValidationError') {
                userMessage = 'অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন।';
            } else if (error.name === 'AuthenticationError') {
                userMessage = 'লগইন প্রয়োজন। আবার লগইন করুন।';
            } else if (error.name === 'PermissionError') {
                userMessage = 'এই কাজটি করার অনুমতি নেই।';
            }
            
            this.showNotification(userMessage, 'error');
        },

        // Global error handler
        setupGlobalErrorHandler: function() {
            window.addEventListener('error', (event) => {
                this.handleError(event.error, 'Global');
            });

            window.addEventListener('unhandledrejection', (event) => {
                this.handleError(event.reason, 'Promise');
            });
        },

        // API request wrapper
        apiRequest: async function(url, options = {}) {
            const defaultOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 10000
            };

            const finalOptions = { ...defaultOptions, ...options };

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), finalOptions.timeout);

                const response = await fetch(url, {
                    ...finalOptions,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                return await response.json();
            } catch (error) {
                if (error.name === 'AbortError') {
                    throw new Error('অনুরোধ সময় শেষ হয়ে গেছে।');
                }
                throw error;
            }
        },

        // Data validation
        validateData: function(data, schema) {
            const errors = [];
            
            for (const [field, rules] of Object.entries(schema)) {
                const value = data[field];
                
                if (rules.required && !value) {
                    errors.push(`${field} প্রয়োজনীয়`);
                }
                
                if (value && rules.type && typeof value !== rules.type) {
                    errors.push(`${field} সঠিক ধরনের নয়`);
                }
                
                if (value && rules.minLength && value.length < rules.minLength) {
                    errors.push(`${field} কমপক্ষে ${rules.minLength} অক্ষর হতে হবে`);
                }
                
                if (value && rules.maxLength && value.length > rules.maxLength) {
                    errors.push(`${field} সর্বোচ্চ ${rules.maxLength} অক্ষর হতে পারে`);
                }
                
                if (value && rules.pattern && !rules.pattern.test(value)) {
                    errors.push(`${field} সঠিক ফরম্যাট নয়`);
                }
            }
            
            if (errors.length > 0) {
                const error = new Error(errors.join(', '));
                error.name = 'ValidationError';
                throw error;
            }
            
            return true;
        },

        // Local storage wrapper
        storage: {
            set: function(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (error) {
                    console.error('Storage set error:', error);
                    return false;
                }
            },
            
            get: function(key, defaultValue = null) {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue;
                } catch (error) {
                    console.error('Storage get error:', error);
                    return defaultValue;
                }
            },
            
            remove: function(key) {
                try {
                    localStorage.removeItem(key);
                    return true;
                } catch (error) {
                    console.error('Storage remove error:', error);
                    return false;
                }
            },
            
            clear: function() {
                try {
                    localStorage.clear();
                    return true;
                } catch (error) {
                    console.error('Storage clear error:', error);
                    return false;
                }
            }
        },

        // API functions
        api: {
            // Make API request
            request: function(endpoint, options = {}) {
                const url = schoolApp.config.apiBaseUrl + endpoint;
                const defaultOptions = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                
                return fetch(url, { ...defaultOptions, ...options })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        console.error('API Error:', error);
                        schoolApp.showNotification('সার্ভার ত্রুটি হয়েছে', 'error');
                        throw error;
                    });
            },

            // Get data
            get: function(endpoint) {
                return this.request(endpoint);
            },

            // Post data
            post: function(endpoint, data) {
                return this.request(endpoint, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
            },

            // Update data
            put: function(endpoint, data) {
                return this.request(endpoint, {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
            },

            // Delete data
            delete: function(endpoint) {
                return this.request(endpoint, {
                    method: 'DELETE'
                });
            }
        }
    };

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        schoolApp.init();
    });

    // Export for global access
    window.schoolApp = schoolApp;

})();
