import { Store } from './state.js';

export const Pages = {
    // 1. Головна сторінка — Каталог техніки
    home() {
        return `
            <div class="shop-header">
                <h1>Каталог товарів Easy click</h1>
                <p>Купуйте улюблені гаджети в один клік!</p>
            </div>
            
            <div class="products-grid">
                <div class="product-card">
                    <div class="product-badge">Хіт</div>
                    <h3>Ноутбук Apple MacBook Air M2</h3>
                    <p class="product-desc">Екран 13.6" IPS / RAM 8 ГБ / SSD 256 ГБ / Колір Space Gray</p>
                    <div class="product-price">43 999 ₴</div>
                    <button class="buy-btn">Купити</button>
                </div>

                <div class="product-card">
                    <div class="product-badge">Новинка</div>
                    <h3>Смартфон Samsung Galaxy S24</h3>
                    <p class="product-desc">Екран 6.2" Dynamic AMOLED / RAM 8 ГБ / 128 ГБ / Onyx Black</p>
                    <div class="product-price">31 499 ₴</div>
                    <button class="buy-btn">Купити</button>
                </div>

                <div class="product-card">
                    <div class="product-badge">Акція</div>
                    <h3>Годинник Amazfit GTR 4</h3>
                    <p class="product-desc">Екран 1.43" AMOLED / Автономність до 14 днів / Чорний</p>
                    <div class="product-price">6 499 ₴</div>
                    <button class="buy-btn">Купити</button>
                </div>
            </div>
        `;
    },

    // 2. Сторінка "Про нас" (Про магазин)
    about() {
        return `
            <h1>Про магазин Easy click</h1>
            <p><strong>Easy click</strong> — це сучасний омніканальний ритейлер найяскравішої техніки та гаджетів. Ми робимо процес покупки максимально простим, швидким та технологічним.</p>
            
            <h3>Наші переваги:</h3>
            <ul>
                <li><strong>Швидкість SPA:</strong> Наш сайт працює миттєво, щоб ви не втрачали ні секунди під час вибору техніки.</li>
                <li><strong>Тільки офіційна продукція:</strong> Усі ноутбуки, смартфони та смарт-годинники мають 100% гарантію від виробника.</li>
                <li><strong>Клієнтська підтримка:</strong> Готові допомогти підібрати девайс вашої мрії 24/7.</li>
            </ul>
            <p>Easy click — яскравий гаджет у твій один клік!</p>
        `;
    },

    // 3. Контактна форма (Оформлення звернення / Клієнтська підтримка)
    contact() {
        const state = Store.getState();
        
        if (state.isSubmitted) {
            return `
                <h1>Зворотній зв'язок</h1>
                <p class="success-msg">Дякуємо, ${state.formData.name}! Наш менеджер магазину Easy click зв'яжеться з вами за адресою ${state.formData.email} найближчим часом для вирішення вашого питання.</p>
                <button id="reset-form-btn">Написати ще одне питання</button>
            `;
        }

        return `
            <h1>Зв'язатися з Easy click</h1>
            <p>Маєте запитання щодо наявності ноутбука чи характеристик смартфона? Напишіть нам!</p>
            <form id="contact-form">
                <label>Ваше ім'я:</label>
                <input type="text" id="form-name" value="${state.formData.name}" required placeholder="Введіть ім'я">
                
                <label>Ваш Email:</label>
                <input type="email" id="form-email" value="${state.formData.email}" required placeholder="example@gmail.com">
                
                <label>Що вас цікавить (модель техніки, доставка, гарантія):</label>
                <textarea id="form-message" rows="4" required placeholder="Який годинник краще обрати для бігу...">${state.formData.message}</textarea>
                
                <button type="submit">Надіслати запит</button>
            </form>
        `;
    },

    // Навішування обробників подій (залишається без змін, забезпечує логіку форми)
    initEventListeners(path) {
        if (path === '/contact') {
            const form = document.getElementById('contact-form');
            const resetBtn = document.getElementById('reset-form-btn');

            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = document.getElementById('form-name').value;
                    const email = document.getElementById('form-email').value;
                    const message = document.getElementById('form-message').value;

                    Store.setState({
                        formData: { name, email, message },
                        isSubmitted: true
                    });
                });
            }

            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    Store.setState({
                        formData: { name: '', email: '', message: '' },
                        isSubmitted: false
                    });
                });
            }
        }
    }
};
