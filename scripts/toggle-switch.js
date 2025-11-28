
(function() {
    // Create the toggle switch element
    const toggleButton = document.createElement('button');
    toggleButton.id = 'dark-mode-toggle';

    // Create the change pattern button
    const changePatternBtn = document.createElement('button');
    changePatternBtn.id = 'change-pattern';
    changePatternBtn.textContent = 'change pattern';


    // Inject the CSS for the toggle switch
    const style = document.createElement('style');
    style.textContent = `
        #dark-mode-toggle {
            appearance: none;
            width: 62px;
            height: 32px;
            background: #e0e0e0;
            border-radius: 50px;
            position: relative;
            cursor: pointer;
            outline: none;
            transition: background 0.3s ease;
            margin-top: 1rem;
        }

        #dark-mode-toggle::before {
            content: '';
            width: 28px;
            height: 28px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform 0.3s ease;
        }

        body.dark-mode #dark-mode-toggle {
            background: #555;
        }

        body.dark-mode #dark-mode-toggle::before {
            transform: translateX(30px);
        }

        #change-pattern {
            margin-top: 1rem;
            background-color: #fff;
            color: #000;
            border: 1px solid #000;
            cursor: pointer;
            padding: 10px;
        }

        body.dark-mode #change-pattern {
            background-color: #333;
            color: #fff;
            border: 1px solid #fff;
        }
    `;
    document.head.appendChild(style);

    // Add the toggle button to the nav
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.appendChild(toggleButton);
        nav.appendChild(changePatternBtn);
    }

    // Dark mode logic
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function setDarkMode(enabled) {
        if (enabled) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
        // Handle VR page specifics and pattern change
        handleVRPage(enabled);
        setPattern();
    }

    toggleButton.addEventListener('click', () => {
        setDarkMode(!body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('darkMode')) {
        setDarkMode(localStorage.getItem('darkMode') === 'enabled');
    } else if (prefersDarkScheme.matches) {
        setDarkMode(true);
    }

    // Pattern changer logic
    const lightPatterns = [
        'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
        'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f0f0f0\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h20v20H0\'/%3E%3C/g%3E%3C/svg%3E")'
    ];

    const darkPatterns = [
        'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23333333\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23333333\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
        'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23333333\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 0h20v20H0\'/%3E%3C/g%3E%3C/svg%3E")'
    ];

    let currentPattern = 0;

    function setPattern() {
        const patterns = body.classList.contains('dark-mode') ? darkPatterns : lightPatterns;
        body.style.backgroundImage = patterns[currentPattern];
    }

    if (changePatternBtn) {
        changePatternBtn.addEventListener('click', () => {
            currentPattern = (currentPattern + 1) % lightPatterns.length;
            setPattern();
        });
    }

    setPattern();

    // Special handling for the VR page
    const DISCLAIMER_TEXT = "disclaimer: the images used in this scene are sourced from the internet and may be subject to copyright.";
    function handleVRPage(isDarkMode) {
        const sky = document.getElementById('sky');
        const objectCountText = document.getElementById('object-count');
        const disclaimerContainer = document.querySelector('.disclaimer');

        if (sky) {
            sky.setAttribute('color', isDarkMode ? '#333333' : '#ECECEC');
        }
        if (objectCountText) {
            objectCountText.setAttribute('color', isDarkMode ? 'white' : 'black');
        }
        if (disclaimerContainer) {
            disclaimerContainer.innerHTML = `<p>${DISCLAIMER_TEXT}</p>`;
        }
    }

})();
