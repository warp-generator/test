
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
    }
};

document.getElementById('promoButton').onclick = function() {
    window.location.href = 'https://chatter-bike-3df.notion.site/Amnezia-Premium-1f72684dab0d8013a057ed6562c8bdca';
}

// Добавляем библиотеку QR code
const qrcodeScript = document.createElement('script');
qrcodeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
document.head.appendChild(qrcodeScript);


// Массив для хранения всех карточек
let allCards = [];

// Функция для преобразования даты в формате DD.MM.YY в объект Date
function parseCustomDate(dateString) {
    const parts = dateString.split('.');
    if (parts.length !== 3) return new Date(0); // Возвращаем минимальную дату при ошибке
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Месяцы в JS: 0-11
    const year = parseInt(parts[2], 10) + 2000; // Предполагаем, что 25 = 2025
    
    return new Date(year, month, day);
}

// Функция для извлечения числового значения сервера
function getServerNumber(server) {
    // Обработка значений с "к+" (например, "10к+" = 10000)
    if (server.includes('к+')) {
        const numberPart = server.split('к+')[0].trim();
        const number = parseInt(numberPart, 10);
        return isNaN(number) ? 0 : number * 1000;
    }
    
    // Обработка обычных числовых значений
    return parseInt(server, 10) || 0;
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
        
        // Очищаем массив карточек
        allCards = [];
        
        // Разбиваем файл на строки
        const lines = data.split('\n').filter(line => line.trim() !== '');
        
        lines.forEach(line => {
            // Извлекаем данные из строки с помощью регулярного выражения
            const matches = line.match(/\[([^\]]+)\]/g);
            if (!matches || matches.length < 4) return;
            
            const date = matches[0].replace(/[\[\]]/g, '');
            const server = matches[1].replace(/[\[\]]/g, '');
            const name = matches[2].replace(/[\[\]]/g, '');
            const link = matches[3].replace(/[\[\]]/g, '');
            
            // Создаем новую карточку
            const card = document.createElement('div');
            card.className = 'ant-card ant-card-bordered ant-card-small css-1tf2gzb';
            card.innerHTML = `
                <div class="ant-card-head">
                    <div class="ant-card-head-wrapper">
                        <div class="ant-card-head-title">
                            <div style="display: flex; align-items: center;">
                                <span style="font-size: 30px;"></span>
                                <span style="margin-left: 5px; font-size: 15px;" class="name">${name}</span>
                            </div>
                        </div>
                        <div class="ant-card-extra server" style="margin-left: 5px">
                            <div>${server}</div>
                        </div>
                        <div class="ant-card-extra date" style="margin-left: 5px">
                            <div>${formatDate(date)}</div>
                        </div>
                    </div>
                </div>
                <div class="ant-card-body">
                    <div style="display: grid; grid-template-columns: auto 32px 32px; column-gap: 5px;">
                        <input class="ant-input css-1tf2gzb ant-input-outlined link" type="text" value="${link}">
                        <button type="button" class="ant-btn css-1tf2gzb ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-icon-only copy-btn">
                            <span class="ant-btn-icon">
                                <span role="img" aria-label="copy" class="anticon anticon-copy">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                    </svg>
                                </span>
                            </span>
                        </button>
                        <button type="button" class="ant-btn css-1tf2gzb ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-icon-only qr-btn">
                            <span class="ant-btn-icon">
                                <span role="img" aria-label="qrcode" class="anticon anticon-qrcode">
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="qrcode" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                        <path d="M468 128H160c-17.7 0-32 14.3-32 32v308c0 4.4 3.6 8 8 8h332c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8zm-56 284H192V192h220v220zm-138-74h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm194 210H136c-4.4 0-8 3.6-8 8v308c0 17.7 14.3 32 32 32h308c4.4 0 8-3.6 8-8V556c0-4.4-3.6-8-8-8zm-56 284H192V612h220v220zm-138-74h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm590-630H556c-4.4 0-8 3.6-8 8v332c0 4.4 3.6 8 8 8h332c4.4 0 8-3.6 8-8V160c0-17.7-14.3-32-32-32zm-32 284H612V192h220v220zm-138-74h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm194 210h-48c-4.4 0-8 3.6-8 8v134h-78V556c0-4.4-3.6-8-8-8H556c-4.4 0-8 3.6-8 8v332c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h78v102c0 4.4 3.6 8 8 8h190c4.4 0 8-3.6 8-8V556c0-4.4-3.6-8-8-8zM746 832h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm142 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            `;
            
            // Добавляем обработчики событий
            const copyBtn = card.querySelector('.copy-btn');
            const qrBtn = card.querySelector('.qr-btn');
            const linkInput = card.querySelector('.link');
            
            copyBtn.addEventListener('click', () => {
                linkInput.select();
                document.execCommand('copy');
                showPopup('Ссылка скопирована!');
            });
            
            qrBtn.addEventListener('click', () => {
    generateQRCode(linkInput.value);
});
            
            // Сохраняем данные карточки для сортировки
            card.dataset.date = date;
            card.dataset.server = server;
            card.dataset.serverNumber = getServerNumber(server); // Числовое значение сервера
            
            // Добавляем карточку в массив
            allCards.push(card);
        });
        
        // Сортируем карточки по умолчанию (по дате)
        sortCards('date');
        
    } catch (error) {
        console.error('Error loading data:', error);
        showPopup('Ошибка загрузки данных', 'error');
    }
}

// Функция сортировки карточек
function sortCards(sortBy) {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';
    
    if (sortBy === 'date') {
        // Сортировка по дате (новые сверху) и дополнительно по серверам при одинаковой дате
        allCards.sort((a, b) => {
            const dateA = parseCustomDate(a.dataset.date);
            const dateB = parseCustomDate(b.dataset.date);
            
            // Сначала сравниваем даты
            if (dateB - dateA !== 0) {
                return dateB - dateA; // Новые даты сначала
            }
            
            // Если даты одинаковые, сортируем по серверам (большее количество сначала)
            return getServerNumber(a.dataset.server) - getServerNumber(b.dataset.server);
        });
    } else if (sortBy === 'server') {
        // Сортировка по серверам (числовой порядок)
        allCards.sort((a, b) => {
            return getServerNumber(a.dataset.server) - getServerNumber(b.dataset.server);
        });
    }
    
    // Добавляем отсортированные карточки в контейнер
    allCards.forEach(card => {
        cardsContainer.appendChild(card);
    });
}

// Обработчики для переключателя сортировки
document.getElementById('option1').addEventListener('change', function() {
    if (this.checked) {
        sortCards('date');
    }
});

document.getElementById('option2').addEventListener('change', function() {
    if (this.checked) {
        sortCards('server');
    }
});

// Вызываем функцию загрузки данных при загрузке страницы
document.addEventListener('DOMContentLoaded', loadAndProcessData);

// Show popup notification
const showPopup = (message, type = 'success') => {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;
    
    if (type === 'error') {
        popup.style.backgroundColor = '#d32f2f';
    }
    
    document.body.appendChild(popup);
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 2500);
};

function formatDate(dateString) {
    if (dateString.includes('.')) {
        const parts = dateString.split('.');
        if (parts.length >= 2) {
            const currentYear = new Date().getFullYear().toString().slice(-2); // Текущий год в формате ГГ
            const currentYearFull = new Date().getFullYear(); // Текущий год полный
            
            if (parts.length === 3) {
                // Если есть год в данных
                let yearPart = parts[2];
                // Преобразуем ГГ в ГГГГ (если год двузначный)
                if (yearPart.length === 2) {
                    yearPart = '20' + yearPart; // Предполагаем 20xx
                }
                
                const year = parseInt(yearPart, 10);
                if (year !== currentYearFull) {
                    return `${parts[0]}.${parts[1]}.${yearPart.slice(-2)}`; // ДД.ММ.ГГ если год не текущий
                }
            }
            return `${parts[0]}.${parts[1]}`; // ДД.ММ если год текущий или не указан
        }
    }
    return dateString;
}

// Функция генерации QR кода
function generateQRCode(url) {
    // Проверяем, загружена ли библиотека
    if (typeof QRCode === 'undefined') {
        showPopup('Библиотека QR кодов загружается...', 'error');
        return;
    }

    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Создаем контейнер для QR кода
    const qrContainer = document.createElement('div');
    qrContainer.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    // Создаем заголовок
    const title = document.createElement('h3');
    title.textContent = 'QR код для подключения';
    title.style.marginBottom = '15px';
	title.style.marginTop = '0px';

    // Создаем контейнер для QR кода
    const qrCodeDiv = document.createElement('div');
    qrCodeDiv.id = 'qrcode';
	qrCodeDiv.style.display = 'inline-block';


    // Добавляем элементы в контейнер
    qrContainer.appendChild(title);
    qrContainer.appendChild(qrCodeDiv);
    modal.appendChild(qrContainer);
    document.body.appendChild(modal);

    // Генерируем QR код
    try {
        new QRCode(qrCodeDiv, {
            text: url,
            width: 230,
            height: 230,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (error) {
        console.error('QR code generation error:', error);
        showPopup('Ошибка генерации QR кода', 'error');
        document.body.removeChild(modal);
    }

    // Закрытие по клику вне области
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Закрытие по ESC
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}
