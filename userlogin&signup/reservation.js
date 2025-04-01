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

  document.getElementById('reservation-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Get the form data

    fetch('/userlogin&signup/api/user/reservations.php', { // Ensure the path is correct
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            alert('Reservation submitted successfully!');
            // Optionally, refresh the dashboard or clear the form
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error submitting reservation:', error);
        alert('Error submitting reservation');
    });
  });

function fetchPendingReservations() {
    console.log('Fetching pending reservations...');
    fetch('/api/user/reservations')
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            populatePendingReservations(data.pending);
        })
        .catch(error => console.error('Error fetching pending reservations:', error));
}