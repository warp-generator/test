
document.getElementById('telegramButton').onclick = function() {
    window.location.href = 'https://my-other-projects.vercel.app/';
}

document.getElementById('DonationAlertsButton').onclick = function() {
    window.location.href = 'https://pay.cloudtips.ru/p/209310e4';
}

document.getElementById('BoostyNewButton').onclick = function() {
    window.location.href = 'https://boosty.to/warphelp/donate';
}

document.getElementById('BoostyButton').onclick = function() {
    const newButtons = document.getElementById('newButtons');

    if (newButtons.classList.contains('show')) {
        // Если блок видим, скрываем его с анимацией
        newButtons.classList.remove('show');
        setTimeout(() => {
            this.style.display = 'block'; // Показываем кнопку BoostyButton
        }, 500); // Задержка должна соответствовать длительности анимации
    } else {
        // Если блок скрыт, показываем его с анимацией
        this.style.display = 'none';
        newButtons.classList.add('show');

        // Добавляем задержку перед прокруткой
        setTimeout(() => {
            // Прокручиваем страницу до самого низа
            window.scrollTo({
                top: document.body.scrollHeight, // Прокручиваем до конца страницы
                behavior: 'smooth' // Плавная прокрутка
            });
        }, 300); // Увеличиваем задержку до 500 мс
    }
};


document.getElementById('promoButton').onclick = function() {
    window.location.href = 'https://chatter-bike-3df.notion.site/Amnezia-Premium-1f72684dab0d8013a057ed6562c8bdca';
}

// Функция для загрузки и обработки данных из data.txt
async function loadAndProcessData() {
    try {
        const response = await fetch('data.txt');
        if (!response.ok) throw new Error('Failed to load data.txt');
        const data = await response.text();
        
        // Очищаем контейнер перед добавлением новых карточек
        const cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = '';
        
        // Получаем шаблон карточки
        const cardTemplate = document.getElementById('cardTemplate');
        
        // Разбиваем файл на строки
        const lines = data.split('\n').filter(line => line.trim() !== '');
        
        lines.forEach(line => {
            // Извлекаем данные из строки
            const dateMatch = line.match(/\[ДАТА\]\[([^\]]+)\]/);
            const serverMatch = line.match(/\[СЕРВЕРА\]\[([^\]]+)\]/);
            const nameMatch = line.match(/\]\[([^\]]+)\]/g);
            const linkMatch = line.match(/\]\[([^\]]+)\]$/);
            
            // Проверяем, что все данные есть
            if (dateMatch && serverMatch && nameMatch && linkMatch) {
                const date = dateMatch[1];
                const server = serverMatch[1];
                const name = nameMatch[1].replace(']', '').replace('[', '');
                const link = linkMatch[1];
                
                // Клонируем шаблон карточки
                const newCard = cardTemplate.cloneNode(true);
                newCard.style.display = 'block'; // Делаем видимой
                
                // Заполняем данные
                newCard.querySelector('#date div div').textContent = date;
                newCard.querySelector('#server div div').textContent = server;
                newCard.querySelector('#name').textContent = name;
                newCard.querySelector('#link').value = link;
                
                // Добавляем обработчики для кнопок копирования и QR-кода
                const copyButton = newCard.querySelector('.ant-btn-icon-only:first-child');
                const qrButton = newCard.querySelector('.ant-btn-icon-only:last-child');
                
                copyButton.addEventListener('click', () => {
                    const linkInput = newCard.querySelector('#link');
                    linkInput.select();
                    document.execCommand('copy');
                    showPopup('Ссылка скопирована!');
                });
                
                qrButton.addEventListener('click', () => {
                    // Здесь можно добавить генерацию QR-кода
                    showPopup('Функция QR-кода в разработке');
                });
                
                // Добавляем карточку в контейнер
                cardsContainer.appendChild(newCard);
            }
        });
    } catch (error) {
        console.error('Error loading data:', error);
        showPopup('Ошибка загрузки данных', 'error');
    }
}

// Вызываем функцию загрузки данных при загрузке страницы
document.addEventListener('DOMContentLoaded', loadAndProcessData);

// Остальной код из index.js остается без изменений

