const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

function confirmLogout(event) {
  event.preventDefault();
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "logout.php";
  }
}

async function fetchUserSessions() {
  try {
    const response = await fetch('fetch_user_sessions.php');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user sessions:', error);
    return [];
  }
}

async function updateDashboard() {
  const userSessions = await fetchUserSessions();
  const onlineUsers = userSessions.filter(session => session.status === 'online').length;
  const loggedInUsers = userSessions.length;

  document.getElementById('online-users').innerText = onlineUsers;
  document.getElementById('logged-in-users').innerText = loggedInUsers;

  const userLoginDatesTable = document.getElementById('user-login-dates');
  userLoginDatesTable.innerHTML = '';
  userSessions.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${user.username}</td><td>${user.login_time}</td>`;
    userLoginDatesTable.appendChild(row);
  });
}

updateDashboard();

    document.getElementById('refresh-button').addEventListener('click', function() {
      alert('Refreshing data...');

      onlineUsers = Math.floor(Math.random() * 10);
      loggedInUsers = Math.floor(Math.random() * 10);
      updateDashboard();
    });

    updateDashboard();

    function saveNote() {
      const note = document.getElementById('eventNote').value;
      if (note) {

        document.getElementById('confirmationMessage').innerText = 'Note saved.';
      } else {
        alert('Please fill in all the fields.');
      }
    }

    function confirmLogout(event) {
      event.preventDefault();
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "logout.php";
      }
    }
    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get the time slot value
      const timeSlot = document.getElementById('timeSlot').value;
      
      // Check if time slot is empty
      if (!timeSlot) {
          alert('Please select a time slot for your reservation!');
          document.getElementById('timeSlot').focus();
          return false;
      }
      
      // Check other required fields
      const required = ['idNumber', 'lastName', 'firstName', 'reservationDate', 'campus', 'equipment', 'cable_type', 'connection_type'];
      let isValid = true;
      let emptyFields = [];
      
      required.forEach(field => {
          if (!document.getElementById(field).value) {
              isValid = false;
              document.getElementById(field).classList.add('error');
              emptyFields.push(field.replace(/([A-Z])/g, ' $1').toLowerCase());
          } else {
              document.getElementById(field).classList.remove('error');
          }
      });
      
      if (!isValid) {
          alert('Please fill in all required fields:\n' + emptyFields.join('\n'));
          return false;
      }
      
      // If all validations pass, submit the form
      this.submit();
  });
  
  // Add visual feedback when selecting time slot
  document.getElementById('timeSlot').addEventListener('change', function() {
      if (this.value) {
          this.classList.remove('error');
      } else {
          this.classList.add('error');
      }
  });
  
  // Optional: Add CSS for error highlighting
  const style = document.createElement('style');
  style.textContent = `
      .error {
          border: 2px solid red !important;
          background-color: #fff0f0 !important;
      }
      .reservation-input.error::placeholder {
          color: #ff0000;
      }
  `;
  document.head.appendChild(style);
  
  // Check URL parameters for status messages
  window.onload = function() {
      const urlParams = new URLSearchParams(window.location.search);
      const status = urlParams.get('status');
      
      if (status === 'success') {
          alert('Reservation submitted successfully!');
      } else if (status === 'error') {
          alert('Error submitting reservation: ' + urlParams.get('message'));
      }
  }