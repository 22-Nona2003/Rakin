document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentIndex = 0;
    let slideInterval;

    // إنشاء النقاط السفلى
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlides();
        resetTimer();
    }

    function resetTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // تغيير كل 5 ثواني
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // تشغيل التبديل التلقائي
    slideInterval = setInterval(nextSlide, 5000);
});