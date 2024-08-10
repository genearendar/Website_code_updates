
// Check if the popup has been shown this session
function hasPopupBeenShown() {
    return sessionStorage.getItem('popupShown') === 'true';
}

// Mark the popup as shown
function markPopupAsShown() {
    sessionStorage.setItem('popupShown', 'true');
}

// Function to add styles
function addStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #popup {
            display: none;
            position: fixed;
            left:50%;
            top:-200px;
            background-image: url('https://www.powershop.co.nz/public/Uploads/Games_Pop_Up.png');
            background-size: cover;
            background-repeat:no-repeat;
            padding: 20px;
            z-index: 1050;
            transform:translateX(-50%);
            width: 250px;
            height: 108px;
            border-radius: 13px;
            box-shadow: 1px 2px 7px 1px #9d747b5c;
            transition: top 0.5s ease-in-out;
        }
        #popup.shown {
            top:70px;
        }
        #popup .close-btn {
            display: block;
            position:absolute;
            top:8px;
            right: 8px;
            padding: 3px;
            background-color: #cfe9ff;
            border:none;
            border-radius:50%;
            font-size:15px;
            line-height:0.4;
            cursor: pointer;
        }
        #popup a {
            display:block;
            position: absolute;
            bottom:6px;
            left: 35px;
            transition: transform ease .3s;
            }

        #popup a:hover {
            transform:scale(105%);
        }
        #popup button.action {
            height: 2.2em;
            line-height: 2.4;
            font-size: .6em;
            padding: 0 1rem;
        }
        @media (min-width:1250px) {
            #popup {
                transform: translateX(-50%) scale(1.3);
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Function to create and add the popup element
function createPopup() {
    const popup = document.createElement('div');
    popup.id = 'popup';

    const cta = document.createElement('a');
    cta.href = "/bdaygames/";
    cta.setAttribute('aria-label', 'Play now'); // Assuming this is a game CTA

    const ctaButton = document.createElement('button');
    ctaButton.classList.add('button--filled', 'button--full', 'action')
    ctaButton.textContent = 'PLAY NOW!';

    cta.appendChild(ctaButton);
    popup.appendChild(cta);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-btn');
    closeButton.textContent = 'x';
    closeButton.onclick = closePopup;
    closeButton.setAttribute('aria-label', 'Close popup');

    popup.appendChild(closeButton);
    
    document.body.appendChild(popup);
    return popup;
}

// Function to show the popup
function showPopup() {
    if (hasPopupBeenShown()) {
        return;
    }

    let popup = document.getElementById('popup');
    if (!popup) {
        popup = createPopup();
    }
    if (!popup.classList.contains('shown')) {
        popup.style.display = 'block';
        // Trigger reflow
        popup.offsetHeight;
        popup.classList.add('shown');
        markPopupAsShown();
    }
}

// Function to handle scroll depth
function handleScroll() {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercentage >= 30) {
        showPopup();
        window.removeEventListener('scroll', handleScroll);
    }
}

// Function to handle exit intent
function handleExitIntent(event) {
    if (event.clientY <= 0) {
        showPopup();
        document.removeEventListener('mouseleave', handleExitIntent);
    }
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.classList.remove('shown');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    }
}

// Initialize
addStyles();

// Add event listeners
window.addEventListener('scroll', handleScroll);
document.addEventListener('mouseleave', handleExitIntent);