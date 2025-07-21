document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('signup-form');

  function validatePassword(pw) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(pw);
  }

  const fields = [
    {
      input: document.getElementById('fname'),
      error: document.getElementById('fname-error'),
      label: 'First Name',
      validator: v => /^[A-Za-z\s]{2,}$/.test(v),
      message: 'Invalid First Name'
    },
    {
      input: document.getElementById('lname'),
      error: document.getElementById('lname-error'),
      label: 'Last Name',
      validator: v => /^[A-Za-z\s]{2,}$/.test(v),
      message: 'Invalid Last Name'
    },
    {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      label: 'Email ID',
      validator: v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
      message: 'Invalid Email ID'
    },
    {
      input: document.getElementById('pno'),
      error: document.getElementById('pno-error'),
      label: 'Phone Number',
      validator: v => /^[0-9]{10}$/.test(v),
      message: 'Invalid Phone Number'
    },
    {
      input: document.getElementById('password'),
      error: document.getElementById('password-error'),
      label: 'Password',
      validator: v => validatePassword(v),
      message: 'Password must be at least 8 characters, include letters and numbers'
    }
  ];

  const confirmPassword = document.getElementById('confirm-password');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  function validateField({ input, error, validator, message }) {
    const value = input.value.trim();
    if (!value) {
      input.style.border = '1px solid red';
      error.textContent = '*Required field';
      return false;
    }
    if (!validator(value)) {
      input.style.border = '1px solid red';
      error.textContent = message;
      return false;
    }
    input.style.border = '1px solid green';
    error.textContent = '';
    return true;
  }

  function validateConfirmPassword() {
    const pass = document.getElementById('password').value.trim();
    const confirm = confirmPassword.value.trim();

    if (!confirm) {
      confirmPassword.style.border = '1px solid red';
      confirmPasswordError.textContent = '*Required field';
      return false;
    }

    if (confirm !== pass) {
      confirmPassword.style.border = '1px solid red';
      confirmPasswordError.textContent = 'Passwords do not match';
      return false;
    }

    confirmPassword.style.border = '1px solid green';
    confirmPasswordError.textContent = '';
    return true;
  }

  fields.forEach(({ input, error, validator, message }) => {
    input.addEventListener('input', () => {
      const value = input.value.trim();
      if (!value) {
        error.textContent = '*Required field';
        input.style.border = '1px solid red';
      } else if (!validator(value)) {
        error.textContent = message;
        input.style.border = '1px solid red';
      } else {
        error.textContent = '';
        input.style.border = '1px solid green';
      }
    });
  });

  confirmPassword.addEventListener('input', validateConfirmPassword);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const allValid = fields.every(f => validateField(f)) && validateConfirmPassword();

    if (allValid) {
      alert('Form submitted successfully!');
      form.reset();
      fields.forEach(({ input, error }) => {
        input.style.border = '';
        error.textContent = '';
      });
      confirmPassword.style.border = '';
    }
  });
});
