
document.addEventListener('DOMContentLoaded', () => {
    // Rotating banner
    const slides = document.querySelector('.slides');
    const slideCount = document.querySelectorAll('.slide').length;
    let currentIndex = 0;

    const updateSlide = () => {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlide();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlide();
    };

    document.querySelectorAll('.next').forEach(btn => btn.addEventListener('click', nextSlide));
    document.querySelectorAll('.prev').forEach(btn => btn.addEventListener('click', prevSlide));
    setInterval(nextSlide, 7000);


    const calendarGrid = document.getElementById('calendar-grid');
    const calendarTitle = document.getElementById('calendar-title');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('close-popup');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Events object with dates as keys
    const events = {
        '2024-11-20': { venue: 'City Hall', time: '10:00 AM - 4:00 PM', location: '123 Main St', contact: '555-1234' },
        '2024-11-30': { venue: 'Community Center', time: '9:00 AM - 3:00 PM', location: '456 Elm St', contact: '555-5678' },
        '2024-12-05': { venue: 'Blood Center', time: '11:00 AM - 2:00 PM', location: '456 Elmer St', contact: '555-5678' },
        '2024-12-15': { venue: 'Blood Bank', time: '9:00 AM - 2:00 PM', location: '456 solElmn St', contact: '555-5678' },
        '2024-12-22': { venue: 'Harsh Blood Bank', time: '11:00 AM - 5:00 PM', location: 'nomnom St', contact: '555-5678' },
        '2024-12-28': { venue: 'Community Center', time: '10:00 AM - 2:00 PM', location: '456 rEalm St', contact: '555-5678' },
        '2025-01-06': { venue: 'Community Center', time: '10:00 AM - 5:00 PM', location: '456 Elm St', contact: '555-5678' },
        '2025-01-24': { venue: 'Community Center', time: '11:00 AM - 2:00 PM', location: '456 rElm St', contact: '555-5678' }
    };

    const populateCalendar = () => {
        calendarGrid.innerHTML = '';
        calendarTitle.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day;
            calendarGrid.appendChild(dayDiv);
        });

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Fill in empty spaces before the first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendarGrid.appendChild(emptyDiv);
        }

        // Add dates
        for (let i = 1; i <= daysInMonth; i++) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'date';
            dateDiv.textContent = i;

            // Format the date as YYYY-MM-DD
            const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            // Add event-specific styling if the date has an event
            if (events[dateKey]) {
                dateDiv.classList.add('event-date');
                dateDiv.addEventListener('click', () => {
                    document.getElementById('event-date').textContent = dateKey;
                    document.getElementById('event-venue').textContent = events[dateKey].venue;
                    document.getElementById('event-time').textContent = events[dateKey].time;
                    document.getElementById('event-location').textContent = events[dateKey].location;
                    document.getElementById('event-contact').textContent = events[dateKey].contact;
                    popup.classList.remove('hidden');
                });
            }

            calendarGrid.appendChild(dateDiv);
        }
    };

    // Navigation between months
    prevMonth.addEventListener('click', () => {
        currentMonth = (currentMonth - 1 + 12) % 12;
        if (currentMonth === 11) currentYear--;
        populateCalendar();
    });

    nextMonth.addEventListener('click', () => {
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) currentYear++;
        populateCalendar();
    });

    // Close the popup
    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // Initial population of the calendar
    populateCalendar();
});
