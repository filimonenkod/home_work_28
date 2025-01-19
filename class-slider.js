class Slider {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.config = { autoPlay: true, interval: 3000, indicators: true, navigation: true, ...config };
        this.currentIndex = 0;
        this.slides = [];
        this.intervalId = null;

        this.init();
    }

    init() {
        this.createSlides();
        if (this.config.navigation) this.createNavigation();
        if (this.config.indicators) this.createIndicators();
        if (this.config.autoPlay) this.startAutoPlay();
    }

    createSlides() {
        const slidesContainer = document.createElement('div');
        slidesContainer.classList.add('slides');
        this.config.images.forEach((src) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            const img = document.createElement('img');
            img.src = src;
            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });
        this.container.appendChild(slidesContainer);
        this.slides = slidesContainer.children;
    }

    createNavigation() {
        const prevBtn = this.createButton('Prev', 'prev');
        const nextBtn = this.createButton('Next', 'next');
    
        // Додаємо стилі
        prevBtn.style.left = '10px';
        prevBtn.style.top = '50%';
        prevBtn.style.transform = 'translateY(-50%)';
    
        nextBtn.style.right = '10px';
        nextBtn.style.top = '50%';
        nextBtn.style.transform = 'translateY(-50%)';
    
        prevBtn.addEventListener('click', () => this.showSlide(this.currentIndex - 1));
        nextBtn.addEventListener('click', () => this.showSlide(this.currentIndex + 1));
    
        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);
    }
    

    createIndicators() {
        const indicators = document.createElement('div');
        indicators.classList.add('indicators');

        [...this.slides].forEach((_, index) => {
            const btn = this.createIndicatorButton(index);
            indicators.appendChild(btn);
        });

        this.container.appendChild(indicators);
    }

    createButton(text, className) {
        const btn = document.createElement('button');
        btn.classList.add('nav-btn', className);
        btn.textContent = text;
        return btn;
    }

    createIndicatorButton(index) {
        const btn = document.createElement('button');
        btn.classList.add('indicator-btn');
        if (index === this.currentIndex) btn.classList.add('active');
        btn.addEventListener('click', () => this.showSlide(index));
        return btn;
    }

    showSlide(index) {
        this.currentIndex = (index + this.slides.length) % this.slides.length;
        this.updateSlides();
    }

    updateSlides() {
        const offset = -this.currentIndex * 100;
        this.container.querySelector('.slides').style.transform = `translateX(${offset}%)`;
        const indicators = this.container.querySelectorAll('.indicator-btn');
        indicators.forEach((btn, index) => {
            btn.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoPlay() {
        this.intervalId = setInterval(() => this.showSlide(this.currentIndex + 1), this.config.interval);
    }

    stopAutoPlay() {
        clearInterval(this.intervalId);
    }
}

// Ініціалізація слайдера
const slider2 = new Slider('slider-container', {
    images: [
        'imgs/monkey1.jpeg',
        'imgs/monkey2.jpeg',
        'imgs/monkey3.jpeg'
    ]
});
