document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('reservationDate');
    const calendar = document.getElementById('calendar');
    const calendarDates = document.querySelector('.calendar-dates');
    const calendarTitle = document.querySelector('.calendar-title');
    const prevMonth = document.querySelector('.prev-month');
    const nextMonth = document.querySelector('.next-month');
    
    let currentDate = new Date();
    let selectedDate = null;

    dateInput.addEventListener('click', function() {
      calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
      renderCalendar();
    });

    function renderCalendar() {
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      calendarTitle.textContent = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      calendarDates.innerHTML = '';

      for(let i = 0; i < firstDay.getDay(); i++) {
        calendarDates.appendChild(document.createElement('div'));
      }

      for(let day = 1; day <= lastDay.getDate(); day++) {
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('calendar-date');
        dateDiv.textContent = day;
        
        const dateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        if(dateObj < new Date().setHours(0,0,0,0)) {
          dateDiv.classList.add('disabled');
        } else {
          dateDiv.addEventListener('click', () => selectDate(dateObj));
        }

        calendarDates.appendChild(dateDiv);
      }
    }

    function selectDate(date) {
      selectedDate = date;
      dateInput.value = date.toLocaleDateString();
      calendar.style.display = 'none';
      
      document.querySelectorAll('.calendar-date').forEach(div => {
        div.classList.remove('selected');
      });
      
      event.target.classList.add('selected');
    }

    prevMonth.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

    nextMonth.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    document.addEventListener('click', function(e) {
      if (!calendar.contains(e.target) && e.target !== dateInput) {
        calendar.style.display = 'none';
      }
    });
  });
