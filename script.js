document.addEventListener('DOMContentLoaded', (event) => {
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;

    modeToggle.addEventListener('change', () => {
        if (modeToggle.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
        }
    });

    function countdownTimer() {
        const eventDate = new Date("2025-05-12");
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = 
            `<h3><b><u>Buddha's Birthday Countdown</u></b></h3>
            <div class="countdown-block"><span>${days}</span><p>Days</p></div>
            <div class="countdown-block"><span>${hours}</span><p>Hours</p></div>
            <div class="countdown-block"><span>${minutes}</span><p>Minutes</p></div>
            <div class="countdown-block"><span>${seconds}</span><p>Seconds</p></div>`;

        if (distance > 0) {
            setTimeout(countdownTimer, 1000);
        } else {
            document.getElementById("countdown").innerHTML = "<h3>Event Over!</h3>";
        }
    }

    countdownTimer();

    const quotes = [
        "The mind is everything. What you think you become.",
        "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
        "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
        "Three things cannot be long hidden: the sun, the moon, and the truth."
    ];

    function getRandomQuote() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    const cards = [
        {
            title: "Happy Birthday",
            subtitle: "Gautam Buddha",
            description: "The Light of Asia",
            wish:"May the teachings of Buddha guide us towards a path of peace and enlightenment. Wishing everyone a joyous and serene day",
            imgSrc: "http://pngimg.com/uploads/buddha/buddha_PNG13.png",
            showCountdown: true,
            showQuote: false,
            showAudio: false,
            showWish: true,
        },
        {
            title: "Quotes",
            subtitle: "",
            description: "",
            wish: "",
            imgSrc: "1200px-OM_MANI_PADME_HUM.svg.png",
            showCountdown: false,
            showQuote: true,
            showAudio: true,
            showWish: false,
        }
    ];

    const initSlider = () => {
        const imageList = document.querySelector(".slider-wrapper .image-list");
        const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
        const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
        const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        
        scrollbarThumb.addEventListener("mousedown", (e) => {
            const startX = e.clientX;
            const thumbPosition = scrollbarThumb.offsetLeft;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            
            const handleMouseMove = (e) => {
                const deltaX = e.clientX - startX;
                const newThumbPosition = thumbPosition + deltaX;
    
                const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
                const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
                
                scrollbarThumb.style.left = `${boundedPosition}px`;
                imageList.scrollLeft = scrollPosition;
            }
    
            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
    
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        });
    
        slideButtons.forEach(button => {
            button.addEventListener("click", () => {
                const direction = button.id === "prev-slide" ? -1 : 1;
                const scrollAmount = imageList.clientWidth * direction;
                imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            });
        });
        
        const handleSlideButtons = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
            slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
        }
    
        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft;
            const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
            scrollbarThumb.style.left = `${thumbPosition}px`;
        }
    
        imageList.addEventListener("scroll", () => {
            updateScrollThumbPosition();
            handleSlideButtons();
        });
    }
    
    window.addEventListener("resize", initSlider);
    initSlider();

    let currentIndex = 0;

    function renderCard(index) {
        const card = cards[index];
        document.querySelector('header h1').innerText = card.title;
        document.querySelector('header h2').innerText = card.subtitle;
        document.querySelector('header p').innerText = card.description;
        document.querySelector('.image-container img').src = card.imgSrc;
        document.getElementById('countdown').style.display = card.showCountdown ? 'block' : 'none';
        document.getElementById('quote').innerText = card.showQuote ? getRandomQuote() : '';
        document.getElementById('quote').style.display = card.showQuote ? 'block' : 'none';
        document.getElementById('audio').style.display = card.showAudio ? 'block' : 'none';
        document.getElementById('wish').style.display = card.showWish ? 'block' : 'none';
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        renderCard(currentIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        renderCard(currentIndex);
    });

    renderCard(currentIndex);
});
