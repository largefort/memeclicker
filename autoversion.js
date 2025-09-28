// Auto Version management for Meme Clicker Tycoon
(function() {
    const versionInfo = {
        major: 2,
        minor: 1,
        patch: 0,
        build: "202307B",
        updateDate: "2023-07-25",
        changes: [
            "Complete browser compatibility overhaul",
            "Removed Cordova dependencies for web deployment",
            "Enhanced browser notification support",
            "Web-optimized vibration API integration",
            "Updated branding to 'Browser Edition'",
            "Improved cross-browser performance optimization"
        ]
    };

    // Format the version string
    const versionString = `v${versionInfo.major}.${versionInfo.minor}.${versionInfo.patch}`;
    
    // Check if the version has been updated since last visit
    function checkForUpdates() {
        const lastVersion = localStorage.getItem('memeClickerVersion');
        const currentVersion = `${versionInfo.major}.${versionInfo.minor}.${versionInfo.patch}`;
        
        if (lastVersion && lastVersion !== currentVersion) {
            console.log(`Game updated from ${lastVersion} to ${currentVersion}`);
            // Show update notification
            setTimeout(() => {
                showUpdateNotification(lastVersion, currentVersion);
            }, 2000);
        }
        
        // Save current version to localStorage
        localStorage.setItem('memeClickerVersion', currentVersion);
    }
    
    function showUpdateNotification(oldVersion, newVersion) {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        
        notification.innerHTML = `
            <div class="update-content">
                <h3>Game Updated! </h3>
                <p>Meme Clicker Tycoon has been updated from v${oldVersion} to v${newVersion}</p>
                <div class="update-changes">
                    <p>What's new:</p>
                    <ul>
                        ${versionInfo.changes.map(change => `<li>${change}</li>`).join('')}
                    </ul>
                </div>
                <button class="update-close">Got it!</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add animation to make it appear
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Add event listener to close button
        const closeButton = notification.querySelector('.update-close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Update version number in the game when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Update version in title screen
        const gameVersionElement = document.querySelector('.game-version');
        if (gameVersionElement) {
            gameVersionElement.textContent = `${versionString} Browser Edition - Click to make memes!`;
        }
        
        // Update version in settings
        const settingsInfoElement = document.querySelector('.settings-box:nth-child(2) p:first-of-type');
        if (settingsInfoElement) {
            settingsInfoElement.textContent = `Meme Clicker Tycoon ${versionString} Browser Edition`;
        }
        
        // Create version history if it doesn't exist
        const settingsContainer = document.querySelector('.settings-container');
        if (settingsContainer && !document.getElementById('version-history')) {
            const versionBox = document.createElement('div');
            versionBox.className = 'settings-box';
            versionBox.id = 'version-history';
            
            let changesHTML = '';
            versionInfo.changes.forEach(change => {
                changesHTML += `<li>${change}</li>`;
            });
            
            versionBox.innerHTML = `
                <h3>Version History</h3>
                <p>Current: ${versionString} (${versionInfo.updateDate})</p>
                <div class="version-changes">
                    <p>Latest changes:</p>
                    <ul>${changesHTML}</ul>
                </div>
            `;
            
            settingsContainer.appendChild(versionBox);
        }
        
        // Check for updates
        checkForUpdates();
    });
    
    // Expose version info globally
    window.gameVersion = versionInfo;
})();