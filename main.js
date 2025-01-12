(function () {
    const supportedSites = {
        "classroom.google.com": "Google Classroom",
        "forms.google.com": "Google Forms",
        "docs.google.com": "Google Docs",
    };

    const currentDomain = window.location.hostname;

    if (!supportedSites[currentDomain]) {
        console.warn("This site is not supported.");
        return;
    }

    const platformName = supportedSites[currentDomain];

    // Inject Google Fonts for Poppins
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap";
    document.head.appendChild(fontLink);

    // Create the floating button
    const floatingButton = document.createElement("div");
    floatingButton.id = "floatingButton";
    document.body.appendChild(floatingButton);

    const floatingContent = document.createElement("div");
    floatingContent.id = "floatingButtonContent";
    floatingButton.appendChild(floatingContent);

    const solveText = document.createElement("span");
    solveText.id = "solveText";
    solveText.textContent = "Solve Assignment";
    floatingContent.appendChild(solveText);

    const lineBreak = document.createElement("br");
    floatingContent.appendChild(lineBreak);

    const platformText = document.createElement("span");
    platformText.id = "platformText";
    platformText.textContent = platformName;
    floatingContent.appendChild(platformText);

    const closeButton = document.createElement("span");
    closeButton.id = "closeButton";
    closeButton.textContent = "×";
    floatingContent.appendChild(closeButton);

    // Add styles for the button
    const style = document.createElement("style");
    style.textContent = `
        #floatingButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: black;
            color: white;
            font-family: 'Poppins', sans-serif;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            padding: 10px 15px;
            cursor: move;
            z-index: 10000;
            width: 172px;
            user-select: none;
        }

        #floatingButtonContent {
            position: relative;
            text-align: center;
        }

        #solveText {
            font-size: 16px;
            font-weight: bold;
            line-height: 1.5;
            pointer-events: none;
        }

        #platformText {
            font-size: 12px;
            color: gray;
            pointer-events: none;
        }

        #closeButton {
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 14px;
            font-weight: bold;
            color: white;
            cursor: pointer;
            padding: 5px;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);

    // Make the button draggable
    let isDragging = false;
    let offsetX, offsetY;

    floatingButton.addEventListener("mousedown", (e) => {
        if (e.target === closeButton) return; // Prevent dragging when clicking close button
        isDragging = true;
        offsetX = e.clientX - floatingButton.offsetLeft;
        offsetY = e.clientY - floatingButton.offsetTop;
        floatingButton.style.transition = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonWidth = floatingButton.offsetWidth;
        const buttonHeight = floatingButton.offsetHeight;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Prevent button from going out of bounds
        newLeft = Math.max(0, Math.min(viewportWidth - buttonWidth, newLeft));
        newTop = Math.max(0, Math.min(viewportHeight - buttonHeight, newTop));

        floatingButton.style.right = 'auto'; // Remove right positioning
        floatingButton.style.bottom = 'auto'; // Remove bottom positioning
        floatingButton.style.left = `${newLeft}px`;
        floatingButton.style.top = `${newTop}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        floatingButton.style.transition = "all 0.2s ease";
    });

    // Close button functionality
    closeButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent event from bubbling to the floatingButton
        floatingButton.remove();
    });
})();
