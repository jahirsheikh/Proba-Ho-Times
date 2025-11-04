// script.js

// Bengali date configuration
const bengaliMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const bengaliDays = [
    'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 
    'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
];

const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Convert English numbers to Bengali numerals
 * @param {number} num - Number to convert
 * @returns {string} Bengali numeral string
 */
function toBengaliNumber(num) {
    return num.toString()
        .split('')
        .map(digit => bengaliNumerals[parseInt(digit)])
        .join('');
}

/**
 * Display current date in Bengali
 */
function displayBengaliDate() {
    const dateEl = document.getElementById('currentDate');
    if (!dateEl) return;

    const now = new Date();
    const day = bengaliDays[now.getDay()];
    const date = toBengaliNumber(now.getDate());
    const month = bengaliMonths[now.getMonth()];
    const year = toBengaliNumber(now.getFullYear());

    dateEl.textContent = `${day}, ${date} ${month} ${year}`;
}

/**
 * Handle navigation link clicks
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // If it's a hash link, prevent default and scroll
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/**
 * Handle article card clicks
 */
function setupArticleClicks() {
    const articles = document.querySelectorAll('.article-card, .featured-article, .trending-item');
    
    articles.forEach(article => {
        article.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article-id');
            
            // In a real application, this would navigate to the article page
            // For demo purposes, we'll show an alert
            alert(`নিবন্ধ #${articleId} খোলা হচ্ছে...`);
            
            // Example: window.location.href = `article.html?id=${articleId}`;
        });
    });
}

/**
 * Handle newsletter subscription
 */
function setupNewsletterSubscription() {
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('newsletterEmail');
    
    if (!subscribeBtn || !emailInput) return;
    
    subscribeBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            alert('অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।');
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert('অনুগ্রহ করে একটি বৈধ ইমেইল ঠিকানা লিখুন।');
            return;
        }
        
        // In a real application, this would send data to a server
        alert('প্রবাহ টাইমসে সাবস্ক্রাইব করার জন্য ধন্যবাদ!');
        emailInput.value = '';
        
        // Example API call:
        // fetch('/api/subscribe', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email: email })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('সাবস্ক্রিপশন সফল হয়েছে!');
        //     emailInput.value = '';
        // })
        // .catch(error => {
        //     alert('দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        // });
    });
    
    // Allow Enter key to submit
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });
}

/**
 * Add smooth scroll for all anchor links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Add scroll-to-top functionality
 */
function setupScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #f42a41;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.background = '#d42335';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.background = '#f42a41';
        this.style.transform = 'scale(1)';
    });
}

/**
 * Add loading animation for images
 */
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Remove loading class when image is loaded
        img.addEventListener('load', function() {
            this.classList.remove('loading');
        });
        
        // Handle error
        img.addEventListener('error', function() {
            this.classList.remove('loading');
            this.alt = 'ছবি লোড করা যায়নি';
        });
    });
}

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    displayBengaliDate();
    setupNavigation();
    setupArticleClicks();
    setupNewsletterSubscription();
    setupSmoothScroll();
    setupScrollToTop();
    setupImageLoading();
    
    console.log('প্রবাহ টাইমস ওয়েবসাইট লোড হয়েছে!');
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential use in other scripts
window.ProbahoTimes = {
    toBengaliNumber,
    displayBengaliDate
};