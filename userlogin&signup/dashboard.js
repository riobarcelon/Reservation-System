// Binary Search algorithm para sa user search
function binarySearchUsers(users, searchTerm) {
    users.sort((a, b) => a.username.localeCompare(b.username));
    let start = 0;
    let end = users.length - 1;

    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (users[mid].username === searchTerm) {
            return mid;
        }
        if (users[mid].username < searchTerm) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return -1;
}

// Quick Sort algorithm para sa data sorting
function quickSortReservations(reservations, key) {
    if (reservations.length <= 1) return reservations;

    const pivot = reservations[Math.floor(reservations.length / 2)];
    const left = reservations.filter(r => r[key] < pivot[key]);
    const middle = reservations.filter(r => r[key] === pivot[key]);
    const right = reservations.filter(r => r[key] > pivot[key]);

    return [...quickSortReservations(left, key), ...middle, ...quickSortReservations(right, key)];
}

function updateScheduledUsers() {
    // Simulated data fetching
    const scheduledUsers = [
        { username: 'user1', date: '2025-05-01' },
        { username: 'user2', date: '2025-05-02' },
        // Add more users as needed
    ];

    document.getElementById('scheduled-users').innerText = scheduledUsers.length;

    const scheduleTableBody = document.getElementById('user-schedule-dates');
    scheduleTableBody.innerHTML = ''; // Clear existing rows

    scheduledUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td style="padding: 10px;">${user.username}</td><td style="padding: 10px;">${user.date}</td>`;
        scheduleTableBody.appendChild(row);
    });
}

// Call the function to update the scheduled users on page load
updateScheduledUsers(); 