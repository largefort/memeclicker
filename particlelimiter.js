(function() {
    const ParticleLimiter = {
        MAX_PARTICLES: 50,
        PARTICLE_LIFETIME: 1000,
        LOW_PERFORMANCE_THRESHOLD: 30,
        activeParticles: [],

        createClickParticle(text, container, options = {}) {
            // Performance check
            if (this.activeParticles.length >= this.MAX_PARTICLES) {
                const oldestParticle = this.activeParticles.shift();
                if (oldestParticle && oldestParticle.element) {
                    oldestParticle.element.remove();
                }
            }

            const particle = document.createElement('div');
            
            // Determine particle type
            const isNumber = !isNaN(parseFloat(text));
            particle.className = `text-particle ${isNumber ? 'number-effect' : 'emoji-effect'}`;
            
            // Random color for numbers
            if (isNumber) {
                const hue = Math.floor(Math.random() * 360);
                particle.style.color = `hsl(${hue}, 80%, 60%)`;
            }

            particle.textContent = text;

            // Random positioning
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 70;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            particle.style.left = `calc(50% + ${offsetX}px)`;
            particle.style.top = `calc(50% + ${offsetY}px)`;
            particle.style.transform = 'translate(-50%, -50%) scale(0.5)';
            particle.style.opacity = '0';

            container.appendChild(particle);

            // Track particle
            const particleData = {
                element: particle,
                createdAt: Date.now()
            };
            this.activeParticles.push(particleData);

            // 20% chance for MLG effect
            if (Math.random() < 0.2 && isNumber) {
                this.createMLGParticle(text, container);
            }

            // Animate particle
            requestAnimationFrame(() => {
                particle.style.opacity = '1';
                particle.style.transform = `translate(-50%, ${-100 - Math.random() * 50}px) scale(1)`;
            });

            // Remove particle
            setTimeout(() => {
                particle.style.opacity = '0';
                this.removeParticle(particleData);
            }, this.PARTICLE_LIFETIME);
        },

        createMLGParticle(text, container) {
            const mlgParticle = document.createElement('div');
            mlgParticle.className = 'text-particle mlg-text-particle';
            mlgParticle.textContent = text;

            // Random positioning similar to regular particle
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 70;
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            mlgParticle.style.left = `calc(50% + ${offsetX}px)`;
            mlgParticle.style.top = `calc(50% + ${offsetY}px)`;
            mlgParticle.style.transform = 'translate(-50%, -50%) scale(0.5)';
            mlgParticle.style.opacity = '0';

            container.appendChild(mlgParticle);

            requestAnimationFrame(() => {
                mlgParticle.style.opacity = '1';
                mlgParticle.style.transform = `translate(-50%, ${-150 - Math.random() * 50}px) scale(1.2)`;
            });

            // Remove MLG particle
            setTimeout(() => {
                mlgParticle.style.opacity = '0';
                setTimeout(() => mlgParticle.remove(), 300);
            }, this.PARTICLE_LIFETIME);
        },

        removeParticle(particleData) {
            setTimeout(() => {
                if (particleData.element) {
                    particleData.element.remove();
                }
                
                const index = this.activeParticles.indexOf(particleData);
                if (index > -1) {
                    this.activeParticles.splice(index, 1);
                }
            }, 300);
        },

        init(gameState) {
            // Modify click handler to use new particle system
            const originalClickMeme = window.clickMeme;
            window.clickMeme = () => {
                originalClickMeme();
                
                const memeButton = document.getElementById('meme-button');
                
                // Create a container for particles if it doesn't exist
                let particleContainer = memeButton.querySelector('.click-particle-container');
                if (!particleContainer) {
                    particleContainer = document.createElement('div');
                    particleContainer.className = 'click-particle-container';
                    memeButton.appendChild(particleContainer);
                }
                
                // Limit particle creation based on performance
                if (gameState.fps > this.LOW_PERFORMANCE_THRESHOLD) {
                    const particleCount = Math.floor(Math.random() * 3) + 1;
                    for (let i = 0; i < particleCount; i++) {
                        // Alternate between number and emoji particles
                        const text = Math.random() < 0.7 ? 
                            `+${gameState.memesPerClick}` : 
                            ['👍', '🔥', '💯', '🚀'][Math.floor(Math.random() * 4)];
                        
                        this.createClickParticle(text, particleContainer);
                    }
                }
            };
        }
    };
    
    window.ParticleLimiter = ParticleLimiter;
})();