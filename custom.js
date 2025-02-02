document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        disable: 'mobile', // Disable on mobile devices
        mirror: true,      // Animate elements out as they scroll out of view
        easing: 'ease-out-cubic'
    });
});


// Function to initiate the counter
function startCounter() {
    // Select all elements with the class 'counter'
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        let count = 0;
        
        // Calculate increment based on target value for smoother animation
        const duration = 2000; // Total animation duration in milliseconds
        const steps = 60; // Number of steps to reach target
        const increment = target / steps;
        const interval = duration / steps;
        
        // Use requestAnimationFrame for smoother animation
        const updateCounter = () => {
            count = Math.min(count + increment, target);
            counter.textContent = Math.round(count).toLocaleString();
            
            if (count < target) {
                setTimeout(() => requestAnimationFrame(updateCounter), interval);
            }
        };
        
        requestAnimationFrame(updateCounter);
    });
}

// Improved viewport detection with partial visibility
function isInViewport(element) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Consider element in view if it's at least 30% visible
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const elementHeight = rect.bottom - rect.top;
    const visibilityPercentage = (visibleHeight / elementHeight) * 100;
    
    return visibilityPercentage >= 30;
}

// Track whether counter has been initiated
let counterStarted = false;

// Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll event handler
const handleScroll = debounce(() => {
    if (counterStarted) return;
    
    const section = document.getElementById('mu-abtus-counter');
    if (isInViewport(section)) {
        counterStarted = true;
        startCounter();
        window.removeEventListener('scroll', handleScroll);
    }
}, 50);

// Add scroll event listener
window.addEventListener('scroll', handleScroll);

// Check initial viewport state
handleScroll();
   
  
// Apply Javascript
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Visit SHS page javascript
class Calendar {
    constructor() {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.availableDates = [11, 16, 23, 24, 30];
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        this.initializeCalendar();
        this.setupEventListeners();
    }

    initializeCalendar() {
        this.updateHeader();
        this.renderDays();
    }

    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.changeMonth(-1);
        });
        document.getElementById('nextMonth').addEventListener('click', () => {
            this.changeMonth(1);
        });
    }

    updateHeader() {
        document.getElementById('currentMonth').textContent = 
            `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
    }

    renderDays() {
        const grid = document.getElementById('calendarGrid');
        // Keep the day headers
        const headers = Array.from(grid.getElementsByClassName('calendar-day-header'));
        grid.innerHTML = '';
        headers.forEach(header => grid.appendChild(header));

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Add empty cells for days before the first of the month
        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }

        // Add the actual days
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            if (this.availableDates.includes(day)) {
                dayElement.classList.add('highlighted');
                dayElement.style.cursor = 'pointer';
                dayElement.addEventListener('click', () => this.selectDate(day));
            } else {
                dayElement.classList.add('disabled');
            }

            grid.appendChild(dayElement);
        }

        // Add empty cells at the end if needed
        const totalCells = grid.children.length;
        const neededEmptyCells = 42 - totalCells; // 6 rows × 7 days = 42 total cells
        for (let i = 0; i < neededEmptyCells; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            grid.appendChild(emptyDay);
        }
    }

    changeMonth(delta) {
        this.currentMonth += delta;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.initializeCalendar();
    }

    selectDate(day) {
        const activeDays = document.querySelectorAll('.calendar-day.active');
        activeDays.forEach(activeDay => activeDay.classList.remove('active'));
        
        const selectedDay = Array.from(document.getElementsByClassName('calendar-day'))
            .find(el => el.textContent === day.toString() && el.classList.contains('highlighted'));
        
        if (selectedDay) {
            selectedDay.classList.add('active');
        }
    }
}

// Initialize calendar when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});


document.addEventListener('DOMContentLoaded', function() {
            // Initialize like buttons
            const likeButtons = document.querySelectorAll('.like-btn');
            likeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const countSpan = this.querySelector('.like-count');
                    let count = parseInt(countSpan.textContent);
                    if (this.classList.contains('liked')) {
                        count--;
                        this.classList.remove('liked');
                        this.style.color = '#2c3e50';
                    } else {
                        count++;
                        this.classList.add('liked');
                        this.style.color = '#e74c3c';
                    }
                    countSpan.textContent = count;
                });
            });

            // Initialize filter buttons
            const filterButtons = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.col-md-4');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filter gallery items
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Initialize share buttons
            const shareButtons = document.querySelectorAll('.share-btn');
            shareButtons.forEach(button => {
                button.addEventListener('click', function() {
                    if (navigator.share) {
                        navigator.share({
                            title: 'School Gallery Image',
                            text: 'Check out this amazing image from our school gallery!',
                            url: window.location.href
                        });
                    } else {
                        alert('Sharing is not supported on this browser');
                    }
                });
            });
        });


