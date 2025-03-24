// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  themeToggle.innerHTML = body.classList.contains('dark-mode') 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter projects
    const filter = button.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Form Validation
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  // Validate Name
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Validate Email
  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, 'Please enter a valid email');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Validate Message
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'Message is required');
    isValid = false;
  } else {
    clearError(messageInput);
  }

  // Submit if valid
  if (isValid) {
    successMessage.textContent = 'Message sent successfully!';
    successMessage.style.display = 'block';
    contactForm.reset();
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  }
});

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.textContent = message;
  errorMsg.style.display = 'block';
  input.style.borderColor = '#e74c3c';
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.style.display = 'none';
  input.style.borderColor = '#ddd';
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
