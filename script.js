document.addEventListener('DOMContentLoaded', () => {
    // Hero секция - ТОЛЬКО один раз устанавливаем min-height, без динамических изменений
    const setHeroHeight = () => {
        const hero = document.getElementById('hero');
        if (hero) {
            // Убираем фиксированную высоту, оставляем только min-height
            hero.style.minHeight = '100vh';
            hero.style.minHeight = '100svh';
            hero.style.height = 'auto';
        }
    };

    setHeroHeight();

    // Убираем resize-обработчик, который вызывает дерганье
    // Оставляем только для ленивой загрузки изображения
    const heroImg = document.querySelector('.hero-image');
    if (heroImg && !heroImg.complete) {
        heroImg.addEventListener('load', () => {
            setHeroHeight();
        });
    }
});

// Музыка
const musicButton = document.getElementById('musicButton');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

const enableMusic = () => {
    if (!isMusicPlaying) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicButton.textContent = 'выключить музыку';
        }).catch(err => {
            console.log('Автовоспроизведение заблокировано:', err);
        });
    }
    document.removeEventListener('click', enableMusic);
    document.removeEventListener('touchstart', enableMusic);
};

document.addEventListener('click', enableMusic);
document.addEventListener('touchstart', enableMusic);

musicButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicButton.textContent = 'включить музыку';
    } else {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicButton.textContent = 'выключить музыку';
        }).catch(err => {
            console.log('Ошибка воспроизведения:', err);
        });
    }
});

// ========== МОДАЛЬНОЕ ОКНО ==========
const modal = document.getElementById('modal');
const sendButton = document.querySelector('.send-button');

// Открыть окно
sendButton.addEventListener('click', function() {
    modal.style.display = 'flex';
    // Показать первый слайд
    document.querySelectorAll('.slide').forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
});

// Закрыть по клику на фон
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Кнопки "Далее"
document.querySelectorAll('.slide-next').forEach(button => {
    button.addEventListener('click', function() {
        let currentSlide = null;
        let currentIndex = 0;
        
        // Найти активный слайд
        const slides = document.querySelectorAll('.slide');
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('active')) {
                currentSlide = slides[i];
                currentIndex = i;
                break;
            }
        }
        
        // Показать следующий
        if (currentSlide && currentIndex < slides.length - 1) {
            currentSlide.classList.remove('active');
            slides[currentIndex + 1].classList.add('active');
        }
    });
});

// Кнопки "Назад"
document.querySelectorAll('.slide-prev').forEach(button => {
    button.addEventListener('click', function() {
        let currentSlide = null;
        let currentIndex = 0;
        
        // Найти активный слайд
        const slides = document.querySelectorAll('.slide');
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('active')) {
                currentSlide = slides[i];
                currentIndex = i;
                break;
            }
        }
        
        // Показать предыдущий
        if (currentSlide && currentIndex > 0) {
            currentSlide.classList.remove('active');
            slides[currentIndex - 1].classList.add('active');
        }
    });
});

// Кнопка "Отправить"
document.querySelector('.slide-submit').addEventListener('click', function() {
    const name = document.getElementById('guestName').value;
    
    if (!name) {
        alert('Пожалуйста, укажите ваше имя');
        return;
    }
    
    // Собрать алкоголь
    const alcohol = [];
    document.querySelectorAll('.alcohol-options input:checked').forEach(cb => {
        alcohol.push(cb.value);
    });
    
    const music = document.getElementById('musicPreferences').value;
    
    console.log('Анкета:', { name, alcohol, music });
    alert(`Спасибо, ${name}! Ваш ответ принят.`);
    
    // Закрыть окно
    modal.style.display = 'none';
    
    // Очистить форму
    document.getElementById('guestName').value = '';
    document.querySelectorAll('.alcohol-options input').forEach(cb => cb.checked = false);
    document.getElementById('musicPreferences').value = '';
    
    // Сбросить на первый слайд
    document.querySelectorAll('.slide').forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
});

// Эффект нажатия для кнопок на мобильных
const allButtons = document.querySelectorAll('button, .send-button, .music-button, .slide-next, .slide-prev, .slide-submit');

allButtons.forEach(btn => {
    btn.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    
    btn.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    });
    
    btn.addEventListener('touchcancel', function() {
        this.classList.remove('touch-active');
    });
});
