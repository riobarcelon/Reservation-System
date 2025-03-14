let currentDate = new Date();
        let selectedDate = null;
        let events = {};

        function initCalendar() {
            const monthDisplay = document.getElementById('monthDisplay');
            monthDisplay.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            renderCalendar();
        }

        function renderCalendar() {
            const calendarDays = document.getElementById('calendarDays');
            calendarDays.innerHTML = '';

            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            
            let currentRow = document.createElement('tr');
            
            for (let i = 0; i < firstDay.getDay(); i++) {
                const cell = document.createElement('td');
                cell.style.padding = '10px';
                cell.style.border = '1px solid #ccc';
                currentRow.appendChild(cell);
            }

            for (let day = 1; day <= lastDay.getDate(); day++) {
                if ((day + firstDay.getDay() - 1) % 7 === 0 && day !== 1) {
                    calendarDays.appendChild(currentRow);
                    currentRow = document.createElement('tr');
                }

                const cell = document.createElement('td');
                cell.textContent = day;
                cell.style.padding = '10px';
                cell.style.border = '1px solid #ccc';
                cell.style.cursor = 'pointer';
                cell.style.backgroundColor = '#ffffff';
                
                const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
                if (events[dateStr]) {
                    cell.style.backgroundColor = '#e6e6ff';
                }

                cell.onclick = () => selectDate(day);
                currentRow.appendChild(cell);
            }

            while (currentRow.children.length < 7) {
                const cell = document.createElement('td');
                cell.style.padding = '10px';
                cell.style.border = '1px solid #ccc';
                currentRow.appendChild(cell);
            }
            calendarDays.appendChild(currentRow);
        }

        function selectDate(day) {
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateStr = selectedDate.toISOString().split('T')[0];
            
            document.getElementById('selectedDate').textContent = selectedDate.toLocaleDateString();
            const eventDetails = document.getElementById('eventDetails');
            const eventsList = document.getElementById('eventsList');
            eventsList.innerHTML = '';

            if (events[dateStr]) {
                events[dateStr].forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.textContent = event;
                    eventDiv.style.padding = '5px';
                    eventDiv.style.marginBottom = '5px';
                    eventDiv.style.backgroundColor = '#ffffff';
                    eventDiv.style.borderRadius = '3px';
                    eventsList.appendChild(eventDiv);
                });
            } else {
                const noEvents = document.createElement('p');
                noEvents.textContent = 'No events scheduled for this date';
                eventsList.appendChild(noEvents);
            }
            
            eventDetails.style.display = 'block';
        }

        function prevMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            initCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            initCalendar();
        }
        window.onload = initCalendar;


        function toggleCalendar() {
            const calendarContainer = document.getElementById('calendarContainer');
            calendarContainer.style.display = calendarContainer.style.display === 'none' ? 'block' : 'none';
        }

        function generateCalendar() {
            const calendarBody = document.getElementById('calendarBody');
            calendarBody.innerHTML = '';

            const currentDate = new Date();
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            // Array ng mga petsa na dapat maging pula
            const redDates = [2, 9, 16, 23, 30, 31];

            let date = 1;
            for (let i = 0; i < 6; i++) {
                const row = document.createElement('tr');

                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
                    cell.style.padding = '10px';
                    cell.style.border = '1px solid #ccc';
                    cell.style.textAlign = 'center';
                    cell.style.cursor = 'pointer';

                    if (i === 0 && j < firstDay.getDay()) {
                        cell.innerHTML = '';
                    } else if (date > lastDay.getDate()) {
                        break;
                    } else {
                        cell.innerHTML = date;
                        // Check kung ang petsa ay nasa redDates array
                        if (redDates.includes(date)) {
                            cell.style.color = '#FF0000'; // Pula
                        } else {
                            cell.style.color = '#0000FF'; // Asul
                        }
                        cell.onclick = function() {
                            document.getElementById('eventDate').value = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${this.innerHTML}`;
                            toggleCalendar();
                        };
                        date++;
                    }
                    row.appendChild(cell);
                }
                calendarBody.appendChild(row);
            }
        }

        document.addEventListener('DOMContentLoaded', generateCalendar);

        function toggleEventInputs() {
            const inputs = document.getElementById('eventInputs');
            inputs.style.display = inputs.style.display === 'none' ? 'block' : 'none';
        }
        function saveEvent() {
            const eventName = document.getElementById('eventTitle').value;
            const eventDate = document.getElementById('eventDate').value;
            const eventNotes = document.getElementById('eventNotes').value;
            
            if (eventName && eventDate) {
                let message = "The event '" + eventName + "' has been saved to the date: " + eventDate;
                if (eventNotes) {
                    message += "\nNotes: " + eventNotes;
                }
                alert(message);
            } else {
                alert('Please fill in the event title and date.');
            }
        }