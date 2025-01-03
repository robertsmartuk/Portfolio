document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        message: document.getElementById('message')
    };
 
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
 
    const showError = (element, message) => {
        const errorDiv = element.parentElement.querySelector('.error-message') || 
            Object.assign(document.createElement('div'), {
                className: 'error-message'
            });
        errorDiv.textContent = message;
        if (!element.parentElement.querySelector('.error-message')) {
            element.parentElement.appendChild(errorDiv);
        }
        element.classList.add('invalid');
    };
 
    const removeError = (element) => {
        const errorDiv = element.parentElement.querySelector('.error-message');
        if (errorDiv) errorDiv.remove();
        element.classList.remove('invalid');
    };
 
    Object.entries(inputs).forEach(([key, input]) => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                if (key === 'email' && !validateEmail(input.value)) {
                    showError(input, 'Please enter a valid email address');
                } else {
                    removeError(input);
                }
            } else {
                showError(input, 'This field is required');
            }
        });
    });
 
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
 
        Object.entries(inputs).forEach(([key, input]) => {
            if (!input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (key === 'email' && !validateEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        });
 
        if (isValid) {
            form.submit();
        }
    });
 });