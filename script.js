document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Mobile Menu
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close Mobile Menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links (optional, as CSS scroll-behavior handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Character Counter
    const notesInput = document.getElementById('notes');
    const charCount = document.getElementById('char-count');

    if (notesInput && charCount) {
        notesInput.addEventListener('input', function () {
            charCount.textContent = this.value.length;
        });
    }

    // WhatsApp Form Submission
    const whatsappForm = document.getElementById('whatsapp-form');

    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const notes = document.getElementById('notes').value;

            // Format date to DD.MM.YYYY
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('tr-TR');

            const message = `*Yeni Randevu Talebi*%0A%0A` +
                `*Ad Soyad:* ${fullname}%0A` +
                `*Telefon:* ${phone}%0A` +
                `*E-posta:* ${email}%0A` +
                `*Hizmet:* ${service}%0A` +
                `*Tarih:* ${formattedDate}%0A` +
                `*Saat:* ${time}%0A` +
                `*Notlar:* ${notes}`;

            const whatsappNumber = "905060547070";
            const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;

            window.open(whatsappURL, '_blank');
        });
    }

    // Hero Background Slider
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        const images = [];
        for (let i = 1; i <= 18; i++) {
            images.push(`assets/ofis/ofis (${i}).jpeg`);
        }

        // Create slides
        images.forEach((imgSrc, index) => {
            const slide = document.createElement('div');
            slide.classList.add('hero-slide');
            if (index === 0) slide.classList.add('active');
            slide.style.backgroundImage = `url('${imgSrc}')`;
            heroSlider.appendChild(slide);
        });

        // Rotate slides
        let currentSlide = 0;
        const slides = document.querySelectorAll('.hero-slide');

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change every 5 seconds
    }
    // Certificates Slider
    const certificatesTrack = document.getElementById('certificatesTrack');
    if (certificatesTrack) {
        const certificateImages = [
            'sertifika (1).jpeg', 'sertifika (2).jpeg', 'sertifika (3).jpeg',
            'sertifika (4).jpeg', 'sertifika (5).jpeg', 'sertifika (6).jpeg',
            'sertifika (7).jpeg', 'sertifika (8).jpeg', 'sertifika (9).jpeg',
            'sertifika (10).jpeg', 'sertifika (11).jpeg', 'sertifika (12).jpeg',
            'sertifika (13).jpeg', 'sertifika (14).jpeg', 'sertifika (15).jpeg',
            'sertifika (16).jpeg', 'sertifika (17).jpeg'
        ];

        const sliderDots = document.getElementById('sliderDots');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.modal-close');

        let currentIndex = 0;
        let itemsPerSlide = 3;

        // Determine items per slide based on screen width
        function updateItemsPerSlide() {
            if (window.innerWidth <= 576) {
                itemsPerSlide = 1;
            } else if (window.innerWidth <= 992) {
                itemsPerSlide = 2;
            } else {
                itemsPerSlide = 3;
            }
            updateSliderPosition();
            createDots();
        }

        // Initialize Slider
        function initSlider() {
            certificatesTrack.innerHTML = '';
            certificateImages.forEach((img, index) => {
                const slide = document.createElement('div');
                slide.classList.add('certificate-slide');
                slide.innerHTML = `<img src="assets/sertifikalar/${img}" alt="Sertifika ${index + 1}">`;
                slide.addEventListener('click', () => openModal(`assets/sertifikalar/${img}`));
                certificatesTrack.appendChild(slide);
            });
            updateItemsPerSlide();
        }

        // Create Dots
        function createDots() {
            if (!sliderDots) return;
            sliderDots.innerHTML = '';
            const totalSlides = Math.ceil(certificateImages.length / itemsPerSlide);

            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === Math.floor(currentIndex / itemsPerSlide)) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i * itemsPerSlide;
                    updateSliderPosition();
                });
                sliderDots.appendChild(dot);
            }
        }

        // Update Slider Position
        function updateSliderPosition() {
            const slideWidth = certificatesTrack.children[0].offsetWidth;
            const gap = 20; // Gap between slides
            const moveAmount = (slideWidth + gap) * currentIndex;
            // certificatesTrack.style.transform = `translateX(-${moveAmount}px)`;

            // Better approach using percentage for responsiveness
            const percentage = (currentIndex * (100 / itemsPerSlide));
            // Adjust for gap is tricky with percentage, let's stick to calculating based on item width
            // Actually, we can just shift by item index

            // Re-calculating move amount based on current item width including gap
            // The gap is handled by flex gap, so we need to move by (width + gap)
            // But width is dynamic.

            // Let's use the slide width from DOM
            const itemWidth = certificatesTrack.querySelector('.certificate-slide').getBoundingClientRect().width;
            const totalMove = (itemWidth + 20) * currentIndex;
            certificatesTrack.style.transform = `translateX(-${totalMove}px)`;

            // Update dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (index === Math.floor(currentIndex / itemsPerSlide)) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Event Listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSliderPosition();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < certificateImages.length - itemsPerSlide) {
                    currentIndex++;
                    updateSliderPosition();
                } else {
                    // Loop back to start
                    currentIndex = 0;
                    updateSliderPosition();
                }
            });
        }

        window.addEventListener('resize', updateItemsPerSlide);

        // Modal Functions
        function openModal(src) {
            if (modal && modalImg) {
                modal.style.display = "block";
                modalImg.src = src;
                document.body.style.overflow = "hidden"; // Disable scrolling
            }
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            });
        }

        initSlider();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Services Page Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                const content = document.getElementById(tabId);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }
});
