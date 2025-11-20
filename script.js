// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Параллакс эффект для героя
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Данные для проектов
const projectsData = {
    soldier: {
        screenshots: [
            'images/ПС кадр1.jpg',
            'images/ПС кадр2.jpg', 
            'images/ПС кадр3.jpg'
        ],
        title: 'Позывной «Соловей»'
    }
};

// Модальное окно для галереи
const modal = document.getElementById('modal');
const modalImage = document.querySelector('.modal-image');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');

let currentGallery = [];
let currentIndex = 0;

// Открытие модального окна
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.dataset.project) {
            e.preventDefault();
            const project = link.dataset.project;
            if (projectsData[project]) {
                currentGallery = projectsData[project].screenshots;
                currentIndex = 0;
                showImage(currentIndex);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    });
});

// Закрытие модального окна
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Навигация по галерее
function showImage(index) {
    if (currentGallery.length > 0) {
        modalImage.src = currentGallery[index];
    }
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    showImage(currentIndex);
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками проектов и стихами
document.querySelectorAll('.project-card, .poem-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Анимация прогресса
function animateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        let width = 0;
        const targetWidth = 45; // Ваш реальный процент
        
        const animation = setInterval(() => {
            if (width >= targetWidth) {
                clearInterval(animation);
            } else {
                width++;
                progressFill.style.width = width + '%';
            }
        }, 30);
    }
}

// Интерактивность для персонажей
function initCharacterInteractions() {
    const characters = document.querySelectorAll('.character-card');
    
    characters.forEach(character => {
        character.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        character.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Загрузка стихов
function loadPoems() {
    // Здесь можно загружать стихи из JSON файла или оставить как есть
    const poems = [
        {
            title: "Первый стих",
            content: `Здесь будет текст вашего первого стихотворения...
                     Разделяйте строки таким образом...`
        },
        {
            title: "Второй стих", 
            content: `Текст второго стихотворения...`
        }
    ];
    
    const poetryGrid = document.querySelector('.poetry-grid');
    if (poetryGrid) {
        poetryGrid.innerHTML = poems.map(poem => `
            <div class="poem-card">
                <div class="poem-content">
                    <h3 class="poem-title">${poem.title}</h3>
                    <div class="poem-text">
                        ${poem.content.split('\n').map(line => `<p>${line}</p>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadPoems();
    animateProgress();
    initCharacterInteractions();
    
    // Прелоадер (опционально)
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Закрытие модального окна по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
