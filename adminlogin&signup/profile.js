document.addEventListener('DOMContentLoaded', function() {
    // Load saved profile photo immediately
    const savedPhoto = localStorage.getItem('profilePhoto');
    const headerProfilePic = document.getElementById('headerProfilePic');
    
    if (savedPhoto && headerProfilePic) {
        headerProfilePic.src = savedPhoto;
    }
    
    // Load saved profile data
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    const headerUserName = document.getElementById('headerUserName');
    
    if (savedProfile && headerUserName) {
        const fullName = `${savedProfile.firstName || ''} ${savedProfile.lastName || ''}`.trim();
        headerUserName.textContent = fullName || 'User';
    }
});

// Handle profile photo change
const profilePic = document.getElementById('profilePic');
const photoInput = document.getElementById('photoInput');
let tempPhotoData = null; // Variable to store temporary photo data

photoInput?.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            // Only update the main profile picture preview
            const profilePic = document.getElementById('profilePic');
            if (profilePic) {
                profilePic.src = e.target.result;
            }
            
            // Store the photo data temporarily
            tempPhotoData = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle form data
const profileForm = document.querySelector('.profile-form');
const userNameDisplay = document.querySelector('.user-info .user-name');
const profileCardName = document.querySelector('.profile-card h4');
const profileCardLocation = document.querySelector('.profile-card p');
const profileCardEmail = document.querySelector('.profile-card .email');

// Add function to update header profile
function updateHeaderProfile(profileData, photoSrc) {
    const headerProfilePic = document.getElementById('headerProfilePic');
    const headerUserName = document.getElementById('headerUserName');
    
    if (photoSrc) {
        headerProfilePic.src = photoSrc;
    }
    
    if (profileData && profileData.firstName && profileData.lastName) {
        headerUserName.textContent = `${profileData.firstName} ${profileData.lastName}`;
    }
}

// Function to load profile data on any page
function loadProfileData() {
    const headerProfilePic = document.getElementById('headerProfilePic');
    const headerUserName = document.getElementById('headerUserName');
    
    // Load profile photo
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        // Update header profile picture
        if (headerProfilePic) {
            headerProfilePic.src = savedPhoto;
        }
        
        // Update profile page picture if on profile page
        const profilePic = document.getElementById('profilePic');
        if (profilePic) {
            profilePic.src = savedPhoto;
        }
    }

    // Load profile data
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    if (savedProfile && headerUserName) {
        const fullName = `${savedProfile.firstName || ''} ${savedProfile.lastName || ''}`.trim();
        headerUserName.textContent = fullName || 'User';
    }

    // If we're on the profile page, load the full profile data
    if (window.location.pathname.includes('profile.html')) {
        if (savedProfile) {
            document.querySelector('input[placeholder="Enter first name"]').value = savedProfile.firstName || '';
            document.querySelector('input[placeholder="Enter last name"]').value = savedProfile.lastName || '';
            document.querySelector('input[placeholder="Enter email"]').value = savedProfile.email || '';
            document.querySelector('input[placeholder="Enter contact number"]').value = savedProfile.contactNumber || '';
            document.querySelector('input[placeholder="Enter city"]').value = savedProfile.city || '';

            // Update display elements
            updateDisplayElements(savedProfile);
        }
    }
}

// Call loadProfileData when the DOM is loaded on any page
document.addEventListener('DOMContentLoaded', loadProfileData);

// Update the save button click handler
document.querySelector('.save-btn')?.addEventListener('click', function() {
    const firstName = document.querySelector('input[placeholder="Enter first name"]').value;
    const lastName = document.querySelector('input[placeholder="Enter last name"]').value;
    const email = document.querySelector('input[placeholder="Enter email"]').value;
    const contactNumber = document.querySelector('input[placeholder="Enter contact number"]').value;
    const city = document.querySelector('input[placeholder="Enter city"]').value;

    // Basic validation
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields');
        return;
    }

    // Email validation
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Add confirmation dialog
    if (confirm('Are you sure you want to save?')) {
        const profileData = {
            firstName,
            lastName,
            email,
            contactNumber,
            city
        };

        // Save to localStorage
        localStorage.setItem('profileData', JSON.stringify(profileData));

        // Save the new photo if one was selected
        if (tempPhotoData) {
            localStorage.setItem('profilePhoto', tempPhotoData);
            // Update header profile picture only after saving
            const headerProfilePic = document.getElementById('headerProfilePic');
            if (headerProfilePic) {
                headerProfilePic.src = tempPhotoData;
            }
            tempPhotoData = null; // Clear the temporary photo data
        }

        // Update header on current page
        const headerUserName = document.getElementById('headerUserName');
        if (headerUserName) {
            headerUserName.textContent = `${firstName} ${lastName}`;
        }

        // Show notification
        showNotification('Profile saved successfully!');
    }
});

function updateDisplayElements(profileData) {
    const fullName = `${profileData.firstName} ${profileData.lastName}`;
    userNameDisplay.textContent = fullName;
    profileCardName.textContent = fullName;
    profileCardLocation.textContent = `${profileData.city}, ${profileData.contactNumber}`;
    profileCardEmail.textContent = profileData.email;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Update the notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Updated styles for top-center notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        text-align: center;
        min-width: 200px;
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
