import { Router } from './router.js';
import { Store } from './state.js';

// Важливо: підписуємось на зміни стану.
// Як тільки користувач перейде на іншу сторінку або відправить форму —
// цей код миттєво спрацює і оновить відображення сайту.
Store.subscribe((state) => {
    console.log('Стан Easy click оновився:', state);
    Router.handleRouting();
});

// Запускаємо додаток після того, як весь HTML завантажився у браузер
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
