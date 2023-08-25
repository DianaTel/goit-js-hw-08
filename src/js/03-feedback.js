const _ = require('lodash');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.feedback-form');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // Перевірка наявності збереженого стану у локальному сховищі
    const savedStateJSON = localStorage.getItem('feedback-form-state');
    if (savedStateJSON !== null) {
        const savedState = JSON.parse(savedStateJSON);
        emailInput.value = savedState.email;
        messageInput.value = savedState.message;
    }

    // Відстежування події input на полях форми
    form.addEventListener('input', _.throttle (function() {
        const feedbackState = {
            email: emailInput.value,
            message: messageInput.value,
        };

        // Зберігання об'єкта feedbackState у локальному сховищі
        localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
    },500));

    // Відправка форми
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        
        // Виведення об'єкта з поточними значеннями у консоль
        const formData = {
            email: emailInput.value,
            message: messageInput.value,
        };
        console.log(formData);

        // Очищення локального сховища та полів форми
        localStorage.removeItem('feedback-form-state');
        emailInput.value = '';
        messageInput.value = '';
        
        // Ваш код для відправки даних форми
    });
});