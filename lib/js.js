let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
const slideNumDisplay = document.getElementById('slide-num');

function showSlide(index, direction = "next") {
    slides.forEach(s => {
        s.classList.remove('active', 'slide-next', 'slide-back');
    });

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    const current = slides[currentSlide];
    current.classList.add('active');

    if (direction === "next") {
        current.classList.add('slide-next');
    } else {
        current.classList.add('slide-back');
    }

    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.width = progress + '%';
    slideNumDisplay.innerText = `${currentSlide + 1} / ${slides.length}` + " (" + progress + "%)";
}

function changeSlide(step) {
    if (step > 0) {
        showSlide(currentSlide + step, "next");
    } else {
        showSlide(currentSlide + step, "back");
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") changeSlide(1);
    if (e.key === "ArrowLeft") changeSlide(-1);
});

// Initialize first slide
showSlide(0, "next");



const header = document.querySelector('.header-container');
const root = document.documentElement;

function adjustSlideMargin() {
    if (header) {
        // header.offsetHeight gets the header height
        // + 10 accounts for your 'top: 10px' styling
        const totalOffset = header.offsetHeight + 2;

        // This injects the exact pixel value into the CSS variable
        root.style.setProperty('--header-offset', `${totalOffset}px`);
    }
}

// Run when the page loads
window.addEventListener('DOMContentLoaded', adjustSlideMargin);
// Run whenever the window resizes (handles mobile rotation/screen shrinking)
window.addEventListener('resize', adjustSlideMargin);





// timer ******************
const ring = document.getElementById('clock-ring');
const display = document.getElementById('display');

let totalSeconds = 0;
let timerInterval = null;

ring.addEventListener('click', () => {
    if (timerInterval) {
        // 1. STOP THE TIMER
        clearInterval(timerInterval);
        timerInterval = null;
    } else {
        // 2. START THE TIMER
        timerInterval = setInterval(() => {
            totalSeconds++;

            // Clock Math: Split seconds into Hours, Minutes, and remaining Seconds
            let hrs = Math.floor(totalSeconds / 3600);
            let mins = Math.floor((totalSeconds % 3600) / 60);
            let secs = totalSeconds % 60;

            // Pad with leading zeros (e.g., '5' becomes '05')
            let formattedTime =
                String(hrs).padStart(2, '0') + ':' +
                String(mins).padStart(2, '0') + ':' +
                String(secs).padStart(2, '0');

            display.textContent = formattedTime;
        }, 1000);
    }
});