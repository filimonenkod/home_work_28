// Базовий конструктор слайдера
function Slider(containerId, config) {
    this.container = document.getElementById(containerId);
    this.config = Object.assign({
        autoPlay: true,
        interval: 3000,
        indicators: true,
        navigation: true
    }, config);

    this.currentIndex = 0;
    this.slides = [];
    this.intervalId = null;

    this.init();
}

// Прототипи методів
Slider.prototype.init = function () {
    this.createSlides();
    if (this.config.navigation) this.createNavigation();
    if (this.config.indicators) this.createIndicators();
    if (this.config.autoPlay) this.startAutoPlay();
};

Slider.prototype.createSlides = function () {
    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('slides');
    this.config.images.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const img = document.createElement('img');
        img.src = src;
        slide.appendChild(img);
        slidesContainer.appendChild(slide);
    });
    this.container.appendChild(slidesContainer);
    this.slides = slidesContainer.children;
    this.updateSlides();
};

Slider.prototype.createNavigation = function () {
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('nav-btn', 'prev');
    prevBtn.textContent = 'Prev';
    prevBtn.style.left = '10px';

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('nav-btn', 'next');
    nextBtn.textContent = 'Next';
    nextBtn.style.right = '10px';

    prevBtn.addEventListener('click', () => this.showSlide(this.currentIndex - 1));
    nextBtn.addEventListener('click', () => this.showSlide(this.currentIndex + 1));

    this.container.appendChild(prevBtn);
    this.container.appendChild(nextBtn);
};

Slider.prototype.createIndicators = function () {
    const indicators = document.createElement('div');
    indicators.classList.add('indicators');

    Array.from(this.slides).forEach((_, index) => {
        const btn = document.createElement('button');
        btn.classList.add('indicator-btn');
        if (index === this.currentIndex) btn.classList.add('active');
        btn.addEventListener('click', () => this.showSlide(index));
        indicators.appendChild(btn);
    });

    this.container.appendChild(indicators);
};

Slider.prototype.updateSlides = function () {
    const offset = -this.currentIndex * 100;
    this.container.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    const indicators = this.container.querySelectorAll('.indicator-btn');
    indicators.forEach((btn, index) => {
        btn.classList.toggle('active', index === this.currentIndex);
    });
};

Slider.prototype.showSlide = function (index) {
    this.currentIndex = (index + this.slides.length) % this.slides.length;
    this.updateSlides();
};

Slider.prototype.startAutoPlay = function () {
    this.intervalId = setInterval(() => this.showSlide(this.currentIndex + 1), this.config.interval);
};

Slider.prototype.stopAutoPlay = function () {
    clearInterval(this.intervalId);
};

// Ініціалізація слайдера
const slider1 = new Slider('slider-container', {
    images: [
        'imgs/monkey1.jpeg',
        'imgs/monkey2.jpeg',
        'imgs/monkey3.jpeg'
    ]
});
