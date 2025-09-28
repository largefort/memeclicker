// Define global gameState variable
let gameState = {
    memes: 0,
    memesPerClick: 1,
    memesPerSecond: 0,
    totalMemes: 0,
    clickedMemes: 0,
    generatedMemes: 0,
    achievements: {},
    gameStartTime: Date.now(),
    lastSaveTime: Date.now(),
    boostActive: false,
    boostEndTime: 0,
    boostMultiplier: 2,
    boostDuration: 30, // seconds
    boostCooldown: false,
    totalBuildings: 0,
    boostActivations: 0,
    minigamesPlayed: 0,
    minigamesTypes: new Set(),
    memoryGamesWon: 0,
    highestReactionScore: 0,
    perfectTriviaGames: 0,
    clickedDuringBoost: false,
    clicksWithoutBuying: 0,
    buildingClickBonus: 0, // Added to track click power bonus from buildings
    platform: 'browser', // Changed from 'android' to 'browser'
    hasSeenTitleScreen: false, // Track if user has seen title screen
    // Prestige system values
    heavenlyMemes: 0,
    ascensions: 0,
    lastAscensionTime: 0,
    lastFrameTime: 0, // For fps calculation
    fpsUpdateInterval: 1000, // Update FPS counter every second
    lastFpsUpdate: 0, // Last time FPS was updated
    frameCount: 0, // Count frames for FPS calculation
    fps: 60, // Store current FPS
    targetFps: 30, // Target 30fps for better mobile performance
    frameInterval: 1000 / 30, // ~33.33ms between frames
    lastMpsUpdate: 0, // Track when we last updated MPS
    vibrationEnabled: true, // New setting to control vibration
    smoothMode: false, // New setting for smooth mode
    notificationsEnabled: true,
    buildingMemesProduced: {} // Track memes produced by each building
};

// Meme generators configuration
const generators = [
    {
        id: 'doge',
        name: 'Doge',
        description: 'Much meme. Very wow.',
        baseCost: 10,
        costMultiplier: 1.15,
        output: 0.1,
        amount: 0,
        unlocked: true,
        icon: '🐶'
    },
    {
        id: 'cat',
        name: 'Grumpy Cat',
        description: 'NO.',
        baseCost: 100,
        costMultiplier: 1.15,
        output: 1,
        amount: 0,
        unlocked: true,
        icon: '😾'
    },
    {
        id: 'rickroll',
        name: 'Rickroll',
        description: 'Never gonna give you up!',
        baseCost: 1100,
        costMultiplier: 1.15,
        output: 8,
        amount: 0,
        unlocked: true,
        icon: '🎤'
    },
    {
        id: 'distracted',
        name: 'Distracted Boyfriend',
        description: 'Always looking at other memes',
        baseCost: 12000,
        costMultiplier: 1.15,
        output: 47,
        amount: 0,
        unlocked: true,
        icon: '👀'
    },
    {
        id: 'stonks',
        name: 'Stonks Guy',
        description: 'Meme economy go brrrr',
        baseCost: 130000,
        costMultiplier: 1.15,
        output: 260,
        amount: 0,
        unlocked: true,
        icon: '📈'
    },
    {
        id: 'pepe',
        name: 'Rare Pepe',
        description: 'Feels good man',
        baseCost: 1400000,
        costMultiplier: 1.15,
        output: 1400,
        amount: 0,
        unlocked: true,
        icon: '🐸'
    },
    {
        id: 'chad',
        name: 'Gigachad',
        description: 'Average meme enjoyer',
        baseCost: 20000000,
        costMultiplier: 1.15,
        output: 7800,
        amount: 0,
        unlocked: true,
        icon: '💪'
    },
    {
        id: 'gabe',
        name: 'Dancing Doge',
        description: 'What is love? Baby don\'t hurt me!',
        baseCost: 330000000,
        costMultiplier: 1.15,
        output: 44000,
        amount: 0,
        unlocked: true,
        icon: '💃'
    },
    // New meme buildings
    {
        id: 'kermit',
        name: 'Kermit Tea',
        description: "That's none of my business",
        baseCost: 5100000000,
        costMultiplier: 1.15,
        output: 260000,
        amount: 0,
        unlocked: true,
        icon: '🍵'
    },
    {
        id: 'disaster',
        name: 'Disaster Girl',
        description: "Setting fire to the meme world",
        baseCost: 75000000000,
        costMultiplier: 1.15,
        output: 1600000,
        amount: 0,
        unlocked: true,
        icon: '🔥'
    },
    {
        id: 'hide',
        name: 'Hide The Pain Harold',
        description: "Smiling through the pain",
        baseCost: 1000000000000,
        costMultiplier: 1.15,
        output: 10000000,
        amount: 0,
        unlocked: true,
        icon: '😬'
    },
    {
        id: 'moth',
        name: 'Moth Lamp',
        description: "Bröther may I have some lämp",
        baseCost: 14000000000000,
        costMultiplier: 1.15,
        output: 65000000,
        amount: 0,
        unlocked: true,
        icon: '🦋'
    },
    {
        id: 'beans',
        name: 'Thinking About Beans',
        description: "3AM looking for BEANS",
        baseCost: 170000000000000,
        costMultiplier: 1.15,
        output: 430000000,
        amount: 0,
        unlocked: true,
        icon: '🫘'
    },
    {
        id: 'coffin',
        name: 'Coffin Dance',
        description: "Astronomia intensifies",
        baseCost: 2100000000000000,
        costMultiplier: 1.15,
        output: 2900000000,
        amount: 0,
        unlocked: true,
        icon: '⚰️'
    },
    {
        id: 'wojak',
        name: 'Wojak Memes',
        description: "Feels bad man",
        baseCost: 26000000000000000,
        costMultiplier: 1.15,
        output: 21000000000,
        amount: 0,
        unlocked: true,
        icon: '🧠'
    },
    {
        id: 'galaxy',
        name: 'Galaxy Brain',
        description: "Expanding intellect to infinity",
        baseCost: 310000000000000000,
        costMultiplier: 1.15,
        output: 150000000000,
        amount: 0,
        unlocked: true,
        icon: '🌌'
    },
    // New buildings added here
    {
        id: 'vibecheck',
        name: 'Vibe Check',
        description: "Passing immaculate vibes to the masses",
        baseCost: 4200000000000000000,
        costMultiplier: 1.15,
        output: 900000000000,
        amount: 0,
        unlocked: true,
        icon: '✅'
    },
    {
        id: 'nyancat',
        name: 'Nyan Cat',
        description: "Rainbow trails across the internet since 2011",
        baseCost: 51000000000000000000,
        costMultiplier: 1.15,
        output: 7000000000000,
        amount: 0,
        unlocked: true,
        icon: '🌈'
    },
    {
        id: 'therock',
        name: 'The Rock Eyebrow',
        description: "Can you smell what The Rock is cookin'?",
        baseCost: 750000000000000000000,
        costMultiplier: 1.15,
        output: 50000000000000,
        amount: 0,
        unlocked: true,
        icon: '🤨'
    },
    {
        id: 'spiderman',
        name: 'Pointing Spidermen',
        description: "When two identical users meet in the comment section",
        baseCost: 10000000000000000000000,
        costMultiplier: 1.15,
        output: 375000000000000,
        amount: 0,
        unlocked: true,
        icon: '👉'
    },
    {
        id: 'bonk',
        name: 'Cheems Bonk',
        description: "Go to horny jail *bonk*",
        baseCost: 150000000000000000000000,
        costMultiplier: 1.15,
        output: 2800000000000000,
        amount: 0,
        unlocked: true,
        icon: '🔨'
    },
    {
        id: 'jafet',
        name: 'Jafet Was Here',
        description: "The legendary creator of Meme Clicker Tycoon, known for being everywhere at once",
        baseCost: 1000000000000000000000000,
        costMultiplier: 1.15,
        output: 21000000000000000,
        amount: 0,
        unlocked: true,
        icon: '👑'
    },
    {
        id: 'kratos',
        name: 'Kratos Boy!',
        description: "BOY! READ IT! BOY! DO NOT BE SORRY, BE BETTER!",
        baseCost: 1.5e25, 
        costMultiplier: 1.15,
        output: 150000000000000000,
        amount: 0,
        unlocked: true,
        icon: '⚔️'
    },
    {
        id: 'zeus',
        name: 'Zeus',
        description: "Your son has returned! I bring the destruction of Olympus!",
        baseCost: 2e26, 
        costMultiplier: 1.15,
        output: 1200000000000000000,
        amount: 0,
        unlocked: true,
        icon: '⚡'
    }
];

// Achievements
const achievements = [
    { id: 'first_meme', name: 'Baby Memer', requirement: () => gameState.totalMemes >= 1, message: 'You created your first meme!' },
    { id: 'meme_10', name: 'Meme Apprentice', requirement: () => gameState.totalMemes >= 10, message: 'You created 10 memes!' },
    { id: 'meme_100', name: 'Meme Enthusiast', requirement: () => gameState.totalMemes >= 100, message: 'You created 100 memes!' },
    { id: 'meme_1000', name: 'Meme Lord', requirement: () => gameState.totalMemes >= 1000, message: 'You created 1,000 memes!' },
    { id: 'meme_10000', name: 'Meme God', requirement: () => gameState.totalMemes >= 10000, message: 'You created 10,000 memes!' },
    { id: 'meme_100000', name: 'Meme Legend', requirement: () => gameState.totalMemes >= 100000, message: 'You created 100,000 memes!' },
    { id: 'meme_1000000', name: 'Meme Deity', requirement: () => gameState.totalMemes >= 1000000, message: 'You created 1,000,000 memes!' },
    { id: 'first_generator', name: 'Meme Factory', requirement: () => generators.some(g => g.amount > 0), message: 'You bought your first meme generator!' },
    { id: 'five_generators', name: 'Meme Empire', requirement: () => generators.filter(g => g.amount > 0).length >= 5, message: 'You have 5 different types of meme generators!' },
    { id: 'click_100', name: 'Click Master', requirement: () => gameState.clickedMemes >= 100, message: 'You clicked 100 times!' },
    { id: 'click_1000', name: 'Click Wizard', requirement: () => gameState.clickedMemes >= 1000, message: 'You clicked 1,000 times!' },
    { id: 'all_buildings', name: 'Meme Collector', requirement: () => generators.every(g => g.amount > 0), message: 'You have at least one of each generator!' },
    { id: 'total_buildings_50', name: 'Building Tycoon', requirement: () => gameState.totalBuildings >= 50, message: 'You own 50 total buildings!' },
    { id: 'click_10000', name: 'Click Champion', requirement: () => gameState.clickedMemes >= 10000, message: 'You clicked 10,000 times!' },
    { id: 'click_100000', name: 'Click Emperor', requirement: () => gameState.clickedMemes >= 100000, message: 'You clicked 100,000 times! Your finger must hurt.' },
    { id: 'mps_100', name: 'Meme Factory', requirement: () => gameState.memesPerSecond >= 100, message: 'Reach 100 memes per second!' },
    { id: 'mps_1000', name: 'Meme Monopoly', requirement: () => gameState.memesPerSecond >= 1000, message: 'Reach 1,000 memes per second!' },
    { id: 'mps_10000', name: 'Meme Corporation', requirement: () => gameState.memesPerSecond >= 10000, message: 'Reach 10,000 memes per second!' },
    { id: 'mps_100000', name: 'Meme Conglomerate', requirement: () => gameState.memesPerSecond >= 100000, message: 'Reach 100,000 memes per second!' },
    { id: 'boost_first', name: 'Power Boost', requirement: () => gameState.boostActive, message: 'Activate your first boost!' },
    { id: 'boost_10', name: 'Speed Demon', requirement: () => gameState.boostActivations >= 10, message: 'Activate boost 10 times!' },
    { id: 'minigame_first', name: 'Game Within A Game', requirement: () => gameState.minigamesPlayed >= 1, message: 'Play your first mini-game!' },
    { id: 'minigame_10', name: 'Mini-Game Maniac', requirement: () => gameState.minigamesPlayed >= 10, message: 'Play 10 mini-games!' },
    { id: 'minigame_all', name: 'Jack of All Games', requirement: () => gameState.minigamesTypes?.size >= 3, message: 'Play all types of mini-games!' },
    { id: 'memory_win', name: 'Memory Master', requirement: () => gameState.memoryGamesWon >= 1, message: 'Win a Memory mini-game!' },
    { id: 'reaction_10', name: 'Quick Fingers', requirement: () => gameState.highestReactionScore >= 10, message: 'Score 10+ in the Fast Clicker mini-game!' },
    { id: 'reaction_20', name: 'Lightning Reflexes', requirement: () => gameState.highestReactionScore >= 20, message: 'Score 20+ in the Fast Clicker mini-game!' },
    { id: 'trivia_perfect', name: 'Meme Scholar', requirement: () => gameState.perfectTriviaGames >= 1, message: 'Get all answers correct in Meme Trivia!' },
    { id: 'doge_10', name: 'Doge Fan', requirement: () => generators.find(g => g.id === 'doge')?.amount >= 10, message: 'Own 10 Doge generators!' },
    { id: 'stonks_5', name: 'Stonks Rising', requirement: () => generators.find(g => g.id === 'stonks')?.amount >= 5, message: 'Own 5 Stonks Guy generators!' },
    { id: 'building_100', name: 'Real Estate Tycoon', requirement: () => gameState.totalBuildings >= 100, message: 'Own 100 total buildings!' },
    { id: 'building_500', name: 'Meme Empire Builder', requirement: () => gameState.totalBuildings >= 500, message: 'Own 500 total buildings!' },
    { id: 'click_boost', name: 'Boosted Clicker', requirement: () => gameState.clickedDuringBoost, message: 'Click while boost is active!' },
    { id: 'meme_10000000', name: 'Meme Universe', requirement: () => gameState.totalMemes >= 10000000, message: 'You created 10,000,000 memes!' },
    { id: 'meme_100000000', name: 'Meme Multiverse', requirement: () => gameState.totalMemes >= 100000000, message: 'You created 100,000,000 memes!' },
    { id: 'meme_1000000000', name: 'Meme Infinity', requirement: () => gameState.totalMemes >= 1000000000, message: 'You created 1,000,000,000 memes! TO INFINITY!' },
    { id: 'building_1000', name: 'Meme City', requirement: () => gameState.totalBuildings >= 1000, message: 'Own 1,000 total buildings!' },
    { id: 'building_5000', name: 'Meme Metropolis', requirement: () => gameState.totalBuildings >= 5000, message: 'Own 5,000 total buildings!' },
    { id: 'click_1000000', name: 'Click Immortal', requirement: () => gameState.clickedMemes >= 1000000, message: 'You clicked 1,000,000 times! Your finger is legendary.' },
    { id: 'minigame_50', name: 'Game Addict', requirement: () => gameState.minigamesPlayed >= 50, message: 'Play 50 mini-games!' },
    { id: 'minigame_100', name: 'Mini-Game Legend', requirement: () => gameState.minigamesPlayed >= 100, message: 'Play 100 mini-games!' },
    { id: 'memory_win_5', name: 'Memory Prodigy', requirement: () => gameState.memoryGamesWon >= 5, message: 'Win 5 Memory mini-games!' },
    { id: 'memory_win_20', name: 'Memory Savant', requirement: () => gameState.memoryGamesWon >= 20, message: 'Win 20 Memory mini-games!' },
    { id: 'reaction_30', name: 'Speed Clicker', requirement: () => gameState.highestReactionScore >= 30, message: 'Score 30+ in the Fast Clicker mini-game!' },
    { id: 'reaction_50', name: 'Click Superhuman', requirement: () => gameState.highestReactionScore >= 50, message: 'Score 50+ in the Fast Clicker mini-game!' },
    { id: 'trivia_perfect_5', name: 'Meme Professor', requirement: () => gameState.perfectTriviaGames >= 5, message: 'Get 5 perfect scores in Meme Trivia!' },
    { id: 'trivia_perfect_10', name: 'Meme Historian', requirement: () => gameState.perfectTriviaGames >= 10, message: 'Get 10 perfect scores in Meme Trivia!' },
    { id: 'boost_25', name: 'Boost Addict', requirement: () => gameState.boostActivations >= 25, message: 'Activate boost 25 times!' },
    { id: 'boost_50', name: 'Boost Junkie', requirement: () => gameState.boostActivations >= 50, message: 'Activate boost 50 times!' },
    { id: 'boost_100', name: 'Boost Master', requirement: () => gameState.boostActivations >= 100, message: 'Activate boost 100 times!' },
    { id: 'doge_25', name: 'Doge Enthusiast', requirement: () => generators.find(g => g.id === 'doge')?.amount >= 25, message: 'Own 25 Doge generators!' },
    { id: 'doge_50', name: 'Doge Collector', requirement: () => generators.find(g => g.id === 'doge')?.amount >= 50, message: 'Own 50 Doge generators!' },
    { id: 'doge_100', name: 'Doge Army', requirement: () => generators.find(g => g.id === 'doge')?.amount >= 100, message: 'Own 100 Doge generators!' },
    { id: 'cat_10', name: 'Cat Person', requirement: () => generators.find(g => g.id === 'cat')?.amount >= 10, message: 'Own 10 Grumpy Cat generators!' },
    { id: 'cat_50', name: 'Cat Hoarder', requirement: () => generators.find(g => g.id === 'cat')?.amount >= 50, message: 'Own 50 Grumpy Cat generators!' },
    { id: 'rickroll_10', name: 'Never Gonna Give You Up', requirement: () => generators.find(g => g.id === 'rickroll')?.amount >= 10, message: 'Own 10 Rickroll generators!' },
    { id: 'rickroll_50', name: 'Rick Astley Fan Club', requirement: () => generators.find(g => g.id === 'rickroll')?.amount >= 50, message: 'Own 50 Rickroll generators!' },
    { id: 'distracted_10', name: 'Distraction Master', requirement: () => generators.find(g => g.id === 'distracted')?.amount >= 10, message: 'Own 10 Distracted Boyfriend generators!' },
    { id: 'stonks_25', name: 'Stonks Investor', requirement: () => generators.find(g => g.id === 'stonks')?.amount >= 25, message: 'Own 25 Stonks Guy generators!' },
    { id: 'stonks_50', name: 'Wall Street Memer', requirement: () => generators.find(g => g.id === 'stonks')?.amount >= 50, message: 'Own 50 Stonks Guy generators!' },
    { id: 'pepe_10', name: 'Pepe Collector', requirement: () => generators.find(g => g.id === 'pepe')?.amount >= 10, message: 'Own 10 Rare Pepe generators!' },
    { id: 'pepe_25', name: 'Rare Pepe Hunter', requirement: () => generators.find(g => g.id === 'pepe')?.amount >= 25, message: 'Own 25 Rare Pepe generators!' },
    { id: 'chad_10', name: 'Chad Energy', requirement: () => generators.find(g => g.id === 'chad')?.amount >= 10, message: 'Own 10 Gigachad generators!' },
    { id: 'chad_25', name: 'Sigma Grindset', requirement: () => generators.find(g => g.id === 'chad')?.amount >= 25, message: 'Own 25 Gigachad generators!' },
    { id: 'gabe_10', name: 'Dancing Champion', requirement: () => generators.find(g => g.id === 'gabe')?.amount >= 10, message: 'Own 10 Dancing Doge generators!' },
    { id: 'mps_1000000', name: 'Meme Empire', requirement: () => gameState.memesPerSecond >= 1000000, message: 'Reach 1,000,000 memes per second!' },
    { id: 'each_generator_10', name: 'Diversified Portfolio', requirement: () => generators.every(g => g.amount >= 10), message: 'Have at least 10 of each generator type!' },
    { id: 'each_generator_50', name: 'Meme Collection Complete', requirement: () => generators.every(g => g.amount >= 50), message: 'Have at least 50 of each generator type!' },
    { id: 'each_generator_100', name: 'Meme Completionist', requirement: () => generators.every(g => g.amount >= 100), message: 'Have at least 100 of each generator type!' },
    { id: 'meme_per_day', name: 'Daily Memer', requirement: () => (Date.now() - gameState.gameStartTime) >= 86400000, message: 'Play for at least 24 hours (total time)!' },
    { id: 'meme_per_week', name: 'Weekly Memer', requirement: () => (Date.now() - gameState.gameStartTime) >= 604800000, message: 'Play for at least 7 days (total time)!' },
    { id: 'speed_run_1000', name: 'Speedrunner', requirement: () => gameState.totalMemes >= 1000 && (Date.now() - gameState.gameStartTime) <= 300000, message: 'Reach 1,000 memes within 5 minutes of starting!' },
    { id: 'speed_run_1000000', name: 'Any% Meme Champion', requirement: () => gameState.totalMemes >= 1000000 && (Date.now() - gameState.gameStartTime) <= 3600000, message: 'Reach 1,000,000 memes within 1 hour of starting!' },
    { id: 'clicking_spree', name: 'Clicking Spree', requirement: () => gameState.clicksWithoutBuying >= 100, message: 'Click 100 times without buying any generators!' },
    { id: 'ultimate_memer', name: 'Ultimate Memer', requirement: () => Object.keys(gameState.achievements).length >= 50, message: 'Unlock 50 Memechievements!' },
    { id: 'meme_lord_supreme', name: 'Meme Lord Supreme', requirement: () => Object.keys(gameState.achievements).length >= 75, message: 'Unlock 75 Memechievements!' },
    // New prestige achievements
    { id: 'first_ascension', name: 'Heavenly Memer', requirement: () => gameState.ascensions >= 1, message: 'Ascend to Meme Haven for the first time!' },
    { id: 'ascension_5', name: 'Repeat Ascender', requirement: () => gameState.ascensions >= 5, message: 'Ascend to Meme Haven 5 times!' },
    { id: 'ascension_10', name: 'Meme Angel', requirement: () => gameState.ascensions >= 10, message: 'Ascend to Meme Haven 10 times!' },
    { id: 'ascension_25', name: 'Meme Archangel', requirement: () => gameState.ascensions >= 25, message: 'Ascend to Meme Haven 25 times!' },
    { id: 'heavenly_100', name: 'Blessed Memes', requirement: () => gameState.heavenlyMemes >= 100, message: 'Collect 100 Heavenly Memes!' },
    { id: 'heavenly_1000', name: 'Divine Memer', requirement: () => gameState.heavenlyMemes >= 1000, message: 'Collect 1,000 Heavenly Memes!' },
    { id: 'heavenly_10000', name: 'Meme Deity', requirement: () => gameState.heavenlyMemes >= 10000, message: 'Collect 10,000 Heavenly Memes!' },
    { id: 'quick_ascension', name: 'Speed Ascender', requirement: () => gameState.ascensions >= 1 && ((gameState.lastAscensionTime - gameState.gameStartTime) / 3600000) < 24, message: 'Ascend within 24 hours of starting the game!' },
    { id: 'kermit_10', name: 'Tea Sipper', requirement: () => generators.find(g => g.id === 'kermit')?.amount >= 10, message: 'Own 10 Kermit Tea generators!' },
    { id: 'disaster_10', name: 'Disaster Master', requirement: () => generators.find(g => g.id === 'disaster')?.amount >= 10, message: 'Own 10 Disaster Girl generators!' },
    { id: 'wojak_10', name: 'Feel Guy', requirement: () => generators.find(g => g.id === 'wojak')?.amount >= 10, message: 'Own 10 Wojak Memes generators!' },
    { id: 'galaxy_10', name: 'Cosmic Brain', requirement: () => generators.find(g => g.id === 'galaxy')?.amount >= 10, message: 'Own 10 Galaxy Brain generators!' },
    // 30 NEW ACHIEVEMENTS BEGIN HERE
    { id: 'click_streak_50', name: 'Combo Clicker', requirement: () => gameState.clicksWithoutBuying >= 50, message: 'Click 50 times without buying any generators!' },
    { id: 'click_streak_200', name: 'Clicking Machine', requirement: () => gameState.clicksWithoutBuying >= 200, message: 'Click 200 times without buying any generators!' },
    { id: 'meme_world_domination', name: 'Meme World Domination', requirement: () => gameState.totalMemes >= 10000000000, message: 'You created 10 billion memes! The world is yours!' },
    { id: 'ascension_50', name: 'Ascension Master', requirement: () => gameState.ascensions >= 50, message: 'Ascend to Meme Haven 50 times!' },
    { id: 'ascension_100', name: 'Transcended Being', requirement: () => gameState.ascensions >= 100, message: 'Ascend to Meme Haven 100 times!' },
    { id: 'heavenly_100000', name: 'Meme God Emperor', requirement: () => gameState.heavenlyMemes >= 100000, message: 'Collect 100,000 Heavenly Memes!' },
    { id: 'mps_10000000', name: 'Meme Galaxy', requirement: () => gameState.memesPerSecond >= 10000000, message: 'Reach 10,000,000 memes per second!' },
    { id: 'mps_100000000', name: 'Meme Universe Creator', requirement: () => gameState.memesPerSecond >= 100000000, message: 'Reach 100,000,000 memes per second!' },
    { id: 'trivia_perfect_25', name: 'Meme Encyclopedia', requirement: () => gameState.perfectTriviaGames >= 25, message: 'Get 25 perfect scores in Meme Trivia!' },
    { id: 'trivia_perfect_50', name: 'Meme Omniscient', requirement: () => gameState.perfectTriviaGames >= 50, message: 'Get 50 perfect scores in Meme Trivia!' },
    { id: 'reaction_100', name: 'Click God', requirement: () => gameState.highestReactionScore >= 100, message: 'Score 100+ in the Fast Clicker mini-game!' },
    { id: 'memory_win_50', name: 'Memory Grandmaster', requirement: () => gameState.memoryGamesWon >= 50, message: 'Win 50 Memory mini-games!' },
    { id: 'memory_win_100', name: 'Memory Legend', requirement: () => gameState.memoryGamesWon >= 100, message: 'Win 100 Memory mini-games!' },
    { id: 'minigame_250', name: 'Minigame Virtuoso', requirement: () => gameState.minigamesPlayed >= 250, message: 'Play 250 mini-games!' },
    { id: 'minigame_500', name: 'Minigame Master of Masters', requirement: () => gameState.minigamesPlayed >= 500, message: 'Play 500 mini-games!' },
    { id: 'all_achievements_half', name: 'Achievement Hunter', requirement: () => Object.keys(gameState.achievements).length >= achievements.length * 0.5, message: 'Unlock half of all achievements!' },
    { id: 'all_achievements', name: 'Completionist', requirement: () => Object.keys(gameState.achievements).length >= achievements.length * 0.9, message: 'Unlock 90% of all achievements!' },
    { id: 'distracted_50', name: 'Always Distracted', requirement: () => generators.find(g => g.id === 'distracted')?.amount >= 50, message: 'Own 50 Distracted Boyfriend generators!' },
    { id: 'distracted_100', name: 'Distraction Overlord', requirement: () => generators.find(g => g.id === 'distracted')?.amount >= 100, message: 'Own 100 Distracted Boyfriend generators!' },
    { id: 'pepe_100', name: 'Pepe Collection Complete', requirement: () => generators.find(g => g.id === 'pepe')?.amount >= 100, message: 'Own 100 Rare Pepe generators!' },
    { id: 'chad_100', name: 'Giga Brain', requirement: () => generators.find(g => g.id === 'chad')?.amount >= 100, message: 'Own 100 Gigachad generators!' },
    { id: 'gabe_50', name: 'Dancing King', requirement: () => generators.find(g => g.id === 'gabe')?.amount >= 50, message: 'Own 50 Dancing Doge generators!' },
    { id: 'gabe_100', name: 'Dance Floor Legend', requirement: () => generators.find(g => g.id === 'gabe')?.amount >= 100, message: 'Own 100 Dancing Doge generators!' },
    { id: 'kermit_50', name: 'Tea Master', requirement: () => generators.find(g => g.id === 'kermit')?.amount >= 50, message: 'Own 50 Kermit Tea generators!' },
    { id: 'kermit_100', name: 'Tea Connoisseur', requirement: () => generators.find(g => g.id === 'kermit')?.amount >= 100, message: 'Own 100 Kermit Tea generators!' },
    { id: 'disaster_50', name: 'Chaos Creator', requirement: () => generators.find(g => g.id === 'disaster')?.amount >= 50, message: 'Own 50 Disaster Girl generators!' },
    { id: 'disaster_100', name: 'Apocalypse Bringer', requirement: () => generators.find(g => g.id === 'disaster')?.amount >= 100, message: 'Own 100 Disaster Girl generators!' },
    { id: 'hide_50', name: 'Pain Masker', requirement: () => generators.find(g => g.id === 'hide')?.amount >= 50, message: 'Own 50 Hide The Pain Harold generators!' },
    { id: 'moth_50', name: 'Lamp Enthusiast', requirement: () => generators.find(g => g.id === 'moth')?.amount >= 50, message: 'Own 50 Moth Lamp generators!' },
    { id: 'meme_per_month', name: 'Dedicated Memer', requirement: () => (Date.now() - gameState.gameStartTime) >= 2592000000, message: 'Play for at least 30 days (total time)!' },
    // 33 NEW ACHIEVEMENTS BEGIN HERE
    { id: 'vibecheck_10', name: 'Vibe Master', requirement: () => generators.find(g => g.id === 'vibecheck')?.amount >= 10, message: 'Own 10 Vibe Check generators!' },
    { id: 'vibecheck_50', name: 'Chief Vibes Officer', requirement: () => generators.find(g => g.id === 'vibecheck')?.amount >= 50, message: 'Own 50 Vibe Check generators!' },
    { id: 'vibecheck_100', name: 'Immaculate Vibes', requirement: () => generators.find(g => g.id === 'vibecheck')?.amount >= 100, message: 'Own 100 Vibe Check generators!' },
    { id: 'nyancat_10', name: 'Rainbow Rider', requirement: () => generators.find(g => g.id === 'nyancat')?.amount >= 10, message: 'Own 10 Nyan Cat generators!' },
    { id: 'nyancat_50', name: 'Space Traveler', requirement: () => generators.find(g => g.id === 'nyancat')?.amount >= 50, message: 'Own 50 Nyan Cat generators!' },
    { id: 'nyancat_100', name: 'Pop-Tart Pioneer', requirement: () => generators.find(g => g.id === 'nyancat')?.amount >= 100, message: 'Own 100 Nyan Cat generators!' },
    { id: 'building_10000', name: 'Meme Planet', requirement: () => gameState.totalBuildings >= 10000, message: 'Own 10,000 total buildings!' },
    { id: 'building_50000', name: 'Meme Galaxy', requirement: () => gameState.totalBuildings >= 50000, message: 'Own 50,000 total buildings!' },
    { id: 'building_100000', name: 'Meme Universe', requirement: () => gameState.totalBuildings >= 100000, message: 'Own 100,000 total buildings!' },
    { id: 'click_10000000', name: 'Click Divinity', requirement: () => gameState.clickedMemes >= 10000000, message: 'You clicked 10,000,000 times! Your finger transcends humanity.' },
    { id: 'click_100000000', name: 'Click Infinity', requirement: () => gameState.clickedMemes >= 100000000, message: 'You clicked 100,000,000 times! The universe trembles at your finger power.' },
    { id: 'meme_trillion', name: 'Trillion Memes', requirement: () => gameState.totalMemes >= 1000000000000, message: 'You created 1,000,000,000,000 memes! A trillion memes!' },
    { id: 'meme_quadrillion', name: 'Quadrillion Memes', requirement: () => gameState.totalMemes >= 1000000000000000, message: 'You created 1,000,000,000,000,000 memes! A quadrillion memes!' },
    { id: 'meme_quintillion', name: 'Quintillion Memes', requirement: () => gameState.totalMemes >= 1000000000000000000, message: 'You created 1,000,000,000,000,000,000 memes! A quintillion memes!' },
    { id: 'reaction_150', name: 'Click Deity', requirement: () => gameState.highestReactionScore >= 150, message: 'Score 150+ in the Fast Clicker mini-game!' },
    { id: 'reaction_200', name: 'Click Beyond Light', requirement: () => gameState.highestReactionScore >= 200, message: 'Score 200+ in the Fast Clicker mini-game!' },
    { id: 'memory_win_200', name: 'Memory Immortal', requirement: () => gameState.memoryGamesWon >= 200, message: 'Win 200 Memory mini-games!' },
    { id: 'memory_win_500', name: 'Memory God', requirement: () => gameState.memoryGamesWon >= 500, message: 'Win 500 Memory mini-games!' },
    { id: 'trivia_perfect_100', name: 'Meme Oracle', requirement: () => gameState.perfectTriviaGames >= 100, message: 'Get 100 perfect scores in Meme Trivia!' },
    { id: 'minigame_1000', name: 'Minigame Immortal', requirement: () => gameState.minigamesPlayed >= 1000, message: 'Play 1,000 mini-games!' },
    { id: 'boost_500', name: 'Boost Immortal', requirement: () => gameState.boostActivations >= 500, message: 'Activate boost 500 times!' },
    { id: 'boost_1000', name: 'Boost God', requirement: () => gameState.boostActivations >= 1000, message: 'Activate boost 1,000 times!' },
    { id: 'heavenly_1000000', name: 'Meme Celestial', requirement: () => gameState.heavenlyMemes >= 1000000, message: 'Collect 1,000,000 Heavenly Memes!' },
    { id: 'heavenly_10000000', name: 'Meme Cosmic Entity', requirement: () => gameState.heavenlyMemes >= 10000000, message: 'Collect 10,000,000 Heavenly Memes!' },
    { id: 'ascension_500', name: 'Reincarnation Master', requirement: () => gameState.ascensions >= 500, message: 'Ascend to Meme Haven 500 times!' },
    { id: 'ascension_1000', name: 'Soul Jumper', requirement: () => gameState.ascensions >= 1000, message: 'Ascend to Meme Haven 1,000 times!' },
    { id: 'mps_billion', name: 'Meme Industrialist', requirement: () => gameState.memesPerSecond >= 1000000000, message: 'Reach 1 billion memes per second!' },
    { id: 'mps_trillion', name: 'Meme Overlord', requirement: () => gameState.memesPerSecond >= 1000000000000, message: 'Reach 1 trillion memes per second!' },
    { id: 'beans_50', name: 'Bean Counter', requirement: () => generators.find(g => g.id === 'beans')?.amount >= 50, message: 'Own 50 Thinking About Beans generators!' },
    { id: 'beans_100', name: 'Bean Connoisseur', requirement: () => generators.find(g => g.id === 'beans')?.amount >= 100, message: 'Own 100 Thinking About Beans generators!' },
    { id: 'coffin_50', name: 'Funeral Director', requirement: () => generators.find(g => g.id === 'coffin')?.amount >= 50, message: 'Own 50 Coffin Dance generators!' },
    { id: 'coffin_100', name: 'Ghana Says Goodbye', requirement: () => generators.find(g => g.id === 'coffin')?.amount >= 100, message: 'Own 100 Coffin Dance generators!' },
    { id: 'click_streak_500', name: 'Click Marathon', requirement: () => gameState.clicksWithoutBuying >= 500, message: 'Click 500 times without buying any generators!' },
    { id: 'therock_10', name: 'Eyebrow Raiser', requirement: () => generators.find(g => g.id === 'therock')?.amount >= 10, message: 'Own 10 The Rock Eyebrow generators!' },
    { id: 'therock_50', name: 'Jabroni Beater', requirement: () => generators.find(g => g.id === 'therock')?.amount >= 50, message: 'Own 50 The Rock Eyebrow generators!' },
    { id: 'therock_100', name: 'Electrifying People', requirement: () => generators.find(g => g.id === 'therock')?.amount >= 100, message: 'Own 100 The Rock Eyebrow generators!' },
    { id: 'spiderman_10', name: 'Web Slinger', requirement: () => generators.find(g => g.id === 'spiderman')?.amount >= 10, message: 'Own 10 Pointing Spidermen generators!' },
    { id: 'spiderman_50', name: 'Spider Sense', requirement: () => generators.find(g => g.id === 'spiderman')?.amount >= 50, message: 'Own 50 Pointing Spidermen generators!' },
    { id: 'spiderman_100', name: 'Into the Spider-Verse', requirement: () => generators.find(g => g.id === 'spiderman')?.amount >= 100, message: 'Own 100 Pointing Spidermen generators!' },
    { id: 'bonk_10', name: 'Bonk Master', requirement: () => generators.find(g => g.id === 'bonk')?.amount >= 10, message: 'Own 10 Cheems Bonk generators!' },
    { id: 'bonk_50', name: 'Horny Jail Warden', requirement: () => generators.find(g => g.id === 'bonk')?.amount >= 50, message: 'Own 50 Cheems Bonk generators!' },
    { id: 'bonk_100', name: 'Supreme Bonker', requirement: () => generators.find(g => g.id === 'bonk')?.amount >= 100, message: 'Own 100 Cheems Bonk generators!' },
    { id: 'all_buildings_200', name: 'Meme Collector Extraordinaire', requirement: () => generators.every(g => g.amount >= 200), message: 'Have at least 200 of each generator type!' },
    { id: 'meme_septillion', name: 'Septillion Memes', requirement: () => gameState.totalMemes >= 1e24, message: 'You created 1 septillion memes! Breaking the meme economy!' },
    { id: 'meme_octillion', name: 'Octillion Memes', requirement: () => gameState.totalMemes >= 1e27, message: 'You created 1 octillion memes! Beyond comprehension!' },
    { id: 'mps_quadrillion', name: 'Meme Hyperinflation', requirement: () => gameState.memesPerSecond >= 1e15, message: 'Reach 1 quadrillion memes per second!' },
    { id: 'reaction_250', name: 'Click Transcendence', requirement: () => gameState.highestReactionScore >= 250, message: 'Score 250+ in the Fast Clicker mini-game!' },
    { id: 'memory_win_1000', name: 'Memory Singularity', requirement: () => gameState.memoryGamesWon >= 1000, message: 'Win 1,000 Memory mini-games!' },
    { id: 'heavenly_100000000', name: 'Meme Multiverse Director', requirement: () => gameState.heavenlyMemes >= 100000000, message: 'Collect 100,000,000 Heavenly Memes!' },
    { id: 'building_1000000', name: 'Meme Universal Conqueror', requirement: () => gameState.totalBuildings >= 1000000, message: 'Own 1,000,000 total buildings!' },
    { id: 'click_billion', name: 'Click Omnipotence', requirement: () => gameState.clickedMemes >= 1000000000, message: 'You clicked 1 billion times! Your finger now controls reality.' },
    { id: 'mps_quintillion', name: 'Reality Memebender', requirement: () => gameState.memesPerSecond >= 1e18, message: 'Reach 1 quintillion memes per second!' },
    { id: 'smooth_mode_user', name: 'Smooth Operator', requirement: () => gameState.smoothMode, message: 'Activate Smooth Mode for a more optimized experience!' },
    { id: 'jafet_10', name: 'Jafet Apprentice', requirement: () => generators.find(g => g.id === 'jafet')?.amount >= 10, message: 'Own 10 Jafet Was Here generators!' },
    { id: 'jafet_50', name: 'Jafet Disciple', requirement: () => generators.find(g => g.id === 'jafet')?.amount >= 50, message: 'Own 50 Jafet Was Here generators!' },
    { id: 'jafet_100', name: 'Jafet Legend', requirement: () => generators.find(g => g.id === 'jafet')?.amount >= 100, message: 'Own 100 Jafet Was Here generators, truly legendary!' },
    { id: 'kratos_10', name: 'Boy! Collector', requirement: () => generators.find(g => g.id === 'kratos')?.amount >= 10, message: 'Own 10 Kratos Boy! generators!' },
    { id: 'kratos_50', name: 'Spartan General', requirement: () => generators.find(g => g.id === 'kratos')?.amount >= 50, message: 'Own 50 Kratos Boy! generators!' },
    { id: 'kratos_100', name: 'Ghost of Sparta', requirement: () => generators.find(g => g.id === 'kratos')?.amount >= 100, message: 'Own 100 Kratos Boy! generators!' },
    { id: 'zeus_10', name: 'Olympian', requirement: () => generators.find(g => g.id === 'zeus')?.amount >= 10, message: 'Own 10 Zeus generators!' },
    { id: 'zeus_50', name: 'Thunder Lord', requirement: () => generators.find(g => g.id === 'zeus')?.amount >= 50, message: 'Own 50 Zeus generators!' },
    { id: 'zeus_100', name: 'King of Gods', requirement: () => generators.find(g => g.id === 'zeus')?.amount >= 100, message: 'Own 100 Zeus generators!' },
    { id: 'meme_sextillion', name: 'Sextillion Memes', requirement: () => gameState.totalMemes >= 1e21, message: 'You created 1 sextillion memes! Beyond the stars!' },
    { id: 'meme_nonillion', name: 'Nonillion Memes', requirement: () => gameState.totalMemes >= 1e30, message: 'You created 1 nonillion memes! Universe shattering!' },
    { id: 'meme_decillion', name: 'Decillion Memes', requirement: () => gameState.totalMemes >= 1e33, message: 'You created 1 decillion memes! Reality bending!' },
    { id: 'meme_googol', name: 'Googol Memes', requirement: () => gameState.totalMemes >= 1e100, message: 'You created 1 googol memes! Mathematical impossibility!' },
    { id: 'building_million', name: 'Meme Galactic Empire', requirement: () => gameState.totalBuildings >= 1000000, message: 'Own 1,000,000 total buildings!' },
    { id: 'building_billion', name: 'Meme Interdimensional Conglomerate', requirement: () => gameState.totalBuildings >= 1000000000, message: 'Own 1 billion total buildings!' },
    { id: 'click_quadrillion', name: 'Click Time Lord', requirement: () => gameState.clickedMemes >= 1e15, message: 'You clicked 1 quadrillion times! Time bends to your finger!' },
    { id: 'click_quintillion', name: 'Click Universe Creator', requirement: () => gameState.clickedMemes >= 1e18, message: 'You clicked 1 quintillion times! Universes form at your click!' },
    { id: 'click_streak_10000', name: 'Click Eternity', requirement: () => gameState.clicksWithoutBuying >= 10000, message: 'Click 10,000 times without buying any generators!' },
    { id: 'click_streak_100000', name: 'Click Infinity Loop', requirement: () => gameState.clicksWithoutBuying >= 100000, message: 'Click 100,000 times without buying any generators!' },
    { id: 'heavenly_quadrillion', name: 'Meme Cosmic Overseer', requirement: () => gameState.heavenlyMemes >= 1e15, message: 'Collect 1 quadrillion Heavenly Memes!' },
    { id: 'heavenly_quintillion', name: 'Meme Divine Architect', requirement: () => gameState.heavenlyMemes >= 1e18, message: 'Collect 1 quintillion Heavenly Memes!' },
    { id: 'ascension_million', name: 'Boundary Breaker', requirement: () => gameState.ascensions >= 1000000, message: 'Ascend to Meme Haven 1,000,000 times!' },
    { id: 'ascension_billion', name: 'Eternal Cycle Master', requirement: () => gameState.ascensions >= 1000000000, message: 'Ascend to Meme Haven 1 billion times!' },
    { id: 'trivia_perfect_10000', name: 'Meme Consciousness', requirement: () => gameState.perfectTriviaGames >= 10000, message: 'Get 10,000 perfect scores in Meme Trivia!' },
    { id: 'memory_win_million', name: 'Memory Cosmic Consciousness', requirement: () => gameState.memoryGamesWon >= 1000000, message: 'Win 1 million Memory mini-games!' },
    { id: 'reaction_10000', name: 'Click Beyond Dimensions', requirement: () => gameState.highestReactionScore >= 10000, message: 'Score 10,000+ in the Fast Clicker mini-game!' },
    { id: 'boost_million', name: 'Boost Eternal', requirement: () => gameState.boostActivations >= 1000000, message: 'Activate boost 1,000,000 times!' },
    { id: 'minigame_million', name: 'Minigame God Emperor', requirement: () => gameState.minigamesPlayed >= 1000000, message: 'Play 1,000,000 mini-games!' },
    { id: 'all_buildings_10000', name: 'Meme Collection Omnipotence', requirement: () => generators.every(g => g.amount >= 10000), message: 'Have at least 10,000 of each generator type!' }
];

// Mini-games configuration
const miniGames = {
    memory: {
        name: "Meme Memory",
        description: "Match pairs of meme cards to win memes!",
        reward: () => Math.floor(gameState.memesPerSecond * 60) // 1 minute worth of production
    },
    reaction: {
        name: "Fast Clicker",
        description: "Click as many meme faces as you can in 10 seconds!",
        reward: (score) => score * gameState.memesPerClick * 5
    },
    trivia: {
        name: "Meme Trivia",
        description: "Test your meme knowledge!",
        reward: () => Math.floor(gameState.memesPerSecond * 120) // 2 minutes worth of production
    }
};

// DOM Elements
const memeCounter = document.getElementById('meme-counter');
const mpsCounter = document.getElementById('mps-counter');
const memeButton = document.getElementById('meme-button');
const clickEffect = document.getElementById('click-effect');
const upgradesList = document.getElementById('buildings-grid'); 
const achievementPopup = document.getElementById('achievement-popup');
const achievementText = document.getElementById('achievement-text');
const totalBuildingsElement = document.getElementById('total-buildings');
const memesProducedElement = document.getElementById('memes-produced');
const boostButton = document.getElementById('boost-button');
const boostTimer = document.getElementById('boost-timer');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const minigameButtons = document.querySelectorAll('.minigame-button');
const minigameArea = document.getElementById('minigame-area');
const resetButton = document.getElementById('reset-button');
const resetConfirm = document.getElementById('reset-confirm');
const resetYes = document.getElementById('reset-yes');
const resetNo = document.getElementById('reset-no');
const titleScreen = document.getElementById('title-screen');
const startGameBtn = document.getElementById('start-game-btn');
const loadingScreen = document.getElementById('loading-screen');

// Statistics elements
const statTotalMemes = document.getElementById('stat-total-memes');
const statClickedMemes = document.getElementById('stat-clicked-memes');
const statGeneratedMemes = document.getElementById('stat-generated-memes');
const statTimePlayed = document.getElementById('stat-time-played');
const statMemesPerClick = document.getElementById('stat-memes-per-click');
const buildingStats = document.getElementById('building-stats');
const achievementStats = document.getElementById('achievement-stats');

// Initialize the game
function init() {
    loadGame();
    
    // Ensure all required properties exist after loading
    if (!gameState.boostActivations) gameState.boostActivations = 0;
    if (!gameState.minigamesPlayed) gameState.minigamesPlayed = 0;
    if (!gameState.minigamesTypes) gameState.minigamesTypes = new Set();
    if (!gameState.memoryGamesWon) gameState.memoryGamesWon = 0;
    if (!gameState.highestReactionScore) gameState.highestReactionScore = 0;
    if (!gameState.perfectTriviaGames) gameState.perfectTriviaGames = 0;
    if (!gameState.clickedDuringBoost) gameState.clickedDuringBoost = false;
    if (!gameState.buildingClickBonus) gameState.buildingClickBonus = 0;
    if (!gameState.heavenlyMemes) gameState.heavenlyMemes = 0;
    if (!gameState.ascensions) gameState.ascensions = 0;
    if (!gameState.lastAscensionTime) gameState.lastAscensionTime = 0;
    if (!gameState.lastFrameTime) gameState.lastFrameTime = 0;
    if (!gameState.fpsUpdateInterval) gameState.fpsUpdateInterval = 1000;
    if (!gameState.lastFpsUpdate) gameState.lastFpsUpdate = 0;
    if (!gameState.frameCount) gameState.frameCount = 0;
    if (!gameState.fps) gameState.fps = 60;
    if (gameState.vibrationEnabled === undefined) gameState.vibrationEnabled = true;
    if (gameState.smoothMode === undefined) gameState.smoothMode = false;
    if (gameState.notificationsEnabled === undefined) gameState.notificationsEnabled = true;
    if (!gameState.buildingMemesProduced) gameState.buildingMemesProduced = {};
    
    // Initialize building memes produced for any missing buildings
    generators.forEach(gen => {
        if (!gameState.buildingMemesProduced[gen.id]) {
            gameState.buildingMemesProduced[gen.id] = 0;
        }
    });
    
    // Check if returning from encyclopedia
    const returningToGame = localStorage.getItem('returningToGame') === 'true';
    
    // Check if this is the first time visiting or if title screen not seen
    if (!gameState.hasSeenTitleScreen) {
        titleScreen.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update game version for browser edition
        const gameVersionElement = document.querySelector('.game-version');
        if (gameVersionElement) {
            gameVersionElement.textContent = `v2.0 Browser Edition - Tap to make memes!`;
        }
    } else if (returningToGame) {
        showReturnLoadingScreen();
        localStorage.removeItem('returningToGame');
    } else {
        titleScreen.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    startGameBtn.addEventListener('click', () => {
        titleScreen.classList.remove('active');
        
        // Show loading screen
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('active');
        
        // Random loading tips
        const loadingTips = [
            "Tip: The more buildings you buy, the more memes you make!",
            "Tip: Click fast during boosts to maximize your memes!",
            "Tip: Complete achievements to show off your meme skills!",
            "Tip: Play mini-games for bonus memes!",
            "Tip: Build a diverse meme empire for maximum production!",
            "Tip: Don't forget to activate your boost for 2x memes!"
        ];
        
        const tipElement = document.querySelector('.loading-tip');
        tipElement.textContent = loadingTips[Math.floor(Math.random() * loadingTips.length)];
        
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.classList.remove('active');
            document.body.style.overflow = '';
            gameState.hasSeenTitleScreen = true;
            saveGame();
        }, 3500); // Show loading screen for 3.5 seconds
    });
    
    updateCounters();
    updateBuildingInfo();
    updateStatistics();
    renderBuildingsTab(); 
    updateHeavenlyMemes();
    
    memeButton.addEventListener('click', clickMeme);
    boostButton.addEventListener('click', activateBoost);
    
    resetButton.addEventListener('click', showResetConfirmation);
    resetYes.addEventListener('click', resetGame);
    resetNo.addEventListener('click', hideResetConfirmation);
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            const currentTab = document.querySelector('.tab-content.active');
            const targetTab = document.getElementById(tabId);
            const currentIndex = Array.from(tabContents).indexOf(currentTab);
            const targetIndex = Array.from(tabContents).indexOf(targetTab);
            
            // Determine animation direction
            if (currentTab) {
                if (targetIndex > currentIndex) {
                    currentTab.classList.add('slide-left');
                } else {
                    currentTab.classList.add('slide-right');
                }
                
                // Wait for animation to complete before hiding the current tab
                setTimeout(() => {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => {
                        content.classList.remove('active', 'slide-left', 'slide-right');
                    });
                    
                    button.classList.add('active');
                    targetTab.classList.add('active');
                    
                    if (tabId === 'statistics') {
                        updateStatistics();
                    }
                    
                    if (tabId === 'buildings') {
                        renderBuildingsTab();
                    }
                }, 300);
            } else {
                button.classList.add('active');
                targetTab.classList.add('active');
            }
        });
    });
    
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            const currentTab = document.querySelector('.tab-content.active');
            const targetTab = document.getElementById(tabId);
            const currentIndex = Array.from(tabContents).indexOf(currentTab);
            const targetIndex = Array.from(tabContents).indexOf(targetTab);
            
            // Determine animation direction
            if (currentTab) {
                if (targetIndex > currentIndex) {
                    currentTab.classList.add('slide-left');
                } else {
                    currentTab.classList.add('slide-right');
                }
                
                // Wait for animation to complete before hiding the current tab
                setTimeout(() => {
                    mobileNavItems.forEach(navItem => navItem.classList.remove('active'));
                    tabContents.forEach(content => {
                        content.classList.remove('active', 'slide-left', 'slide-right');
                    });
                    
                    item.classList.add('active');
                    targetTab.classList.add('active');
                    
                    if (tabId === 'statistics') {
                        updateStatistics();
                    }
                    
                    if (tabId === 'buildings') {
                        renderBuildingsTab();
                    }
                }, 300);
            } else {
                item.classList.add('active');
                targetTab.classList.add('active');
            }
        });
    });
    
    minigameButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gameType = button.getAttribute('data-game');
            startMiniGame(gameType);
        });
    });
    
    // Meme Haven prestige system event listeners
    const ascendButton = document.getElementById('ascend-button');
    const confirmAscend = document.getElementById('confirm-ascend');
    const cancelAscend = document.getElementById('cancel-ascend');
    
    if (ascendButton) {
        ascendButton.addEventListener('click', showAscensionWarning);
    }
    
    if (confirmAscend) {
        confirmAscend.addEventListener('click', performAscension);
    }
    
    if (cancelAscend) {
        cancelAscend.addEventListener('click', hideAscensionWarning);
    }
    
    startGameLoop();
    
    // Set up autosave interval - save every 10 seconds
    setInterval(() => {
        saveGame();
    }, 10000);
    
    // Set up achievement check interval
    setInterval(checkAchievements, 5000);
    
    // Save game when page is about to be closed/refreshed
    window.addEventListener('beforeunload', () => {
        saveGame();
    });
    
    // Save game when page becomes hidden (mobile/tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            saveGame();
        }
    });
    
    // Add vibration setting to settings tab
    const settingsBox = document.createElement('div');
    settingsBox.className = 'settings-box';
    settingsBox.innerHTML = `
        <h3>Browser Settings</h3>
        <p>Control haptic feedback and other browser features.</p>
        <div class="setting-option">
            <label for="vibration-toggle">Vibration (if supported):</label>
            <label class="switch">
                <input type="checkbox" id="vibration-toggle" ${gameState.vibrationEnabled ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        </div>
        <div class="setting-option">
            <label for="smooth-mode-toggle">Smooth Mode:</label>
            <label class="switch">
                <input type="checkbox" id="smooth-mode-toggle" ${gameState.smoothMode ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        </div>
        <div class="setting-option">
            <label for="notifications-toggle">Notifications (if supported):</label>
            <label class="switch">
                <input type="checkbox" id="notifications-toggle" ${gameState.notificationsEnabled ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        </div>
        <p class="setting-description">Smooth Mode reduces animations and optimizes performance.</p>
        <p class="setting-description">Some features may not be available in all browsers.</p>
    `;
    document.querySelector('.settings-container').appendChild(settingsBox);
    
    // Add event listener for vibration toggle
    document.getElementById('vibration-toggle').addEventListener('change', function(e) {
        gameState.vibrationEnabled = e.target.checked;
        saveGame();
        if (gameState.vibrationEnabled) {
            vibrate(50); // Short vibration to indicate it's on
        }
    });
    
    // Add event listener for smooth mode toggle
    document.getElementById('smooth-mode-toggle').addEventListener('change', function(e) {
        gameState.smoothMode = e.target.checked;
        saveGame();
        applyPerformanceMode();
        
        // Check for achievement
        if (gameState.smoothMode && !gameState.achievements['smooth_mode_user']) {
            gameState.achievements['smooth_mode_user'] = true;
            showAchievementPopup('Smooth Operator: You activated Smooth Mode!');
        }
    });
    
    // Add event listener for notifications toggle
    document.getElementById('notifications-toggle').addEventListener('change', function(e) {
        gameState.notificationsEnabled = e.target.checked;
        saveGame();
        
        if (gameState.notificationsEnabled) {
            // Request permission inside user event handler
            if ('Notification' in window) {
                Notification.requestPermission().then(function (permission) {
                    if (permission === 'granted') {
                        scheduleNotifications();
                        showAchievementPopup('Notifications enabled! Expect daily meme updates!');
                    } else if (permission === 'denied') {
                        showAchievementPopup('Notifications permission denied. You can enable them in browser settings.');
                        // Reset the toggle if permission was denied
                        e.target.checked = false;
                        gameState.notificationsEnabled = false;
                        saveGame();
                    }
                });
            } else {
                showAchievementPopup('Notifications not supported in this browser.');
                // Reset the toggle if not supported
                e.target.checked = false;
                gameState.notificationsEnabled = false;
                saveGame();
            }
        }
    });
    
    // Browser notification setup
    setupNotifications();
    
    // Add encyclopedia button to mobile navigation
    const settingsBoxMobile = document.querySelector('.settings-box:nth-child(2)');
    if (settingsBoxMobile && !document.querySelector('.encyclopedia-link-mobile')) {
        const encyclopediaMobileLink = document.createElement('div');
        encyclopediaMobileLink.className = 'encyclopedia-link-mobile';
        encyclopediaMobileLink.innerHTML = `
            <button class="encyclopedia-mobile-button">View Meme Encyclopedia</button>
        `;
        settingsBoxMobile.appendChild(encyclopediaMobileLink);
        
        document.querySelector('.encyclopedia-mobile-button').addEventListener('click', function() {
            window.open('encyclopedia.html', '_blank');
        });
    }
}

// Browser-compatible vibration utility function
function vibrate(duration) {
    if (!gameState.vibrationEnabled) return;
    
    // Use browser vibration API if available
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

// Main game loop using requestAnimationFrame for consistent fps
function startGameLoop() {
    gameState.lastFrameTime = performance.now();
    gameState.lastFpsUpdate = performance.now();
    gameState.frameCount = 0;
    gameState.lastMpsUpdate = performance.now(); // Track when we last updated MPS
    gameState.targetFps = 30; // Target 30fps for better mobile performance
    gameState.frameInterval = 1000 / gameState.targetFps; // ~33.33ms between frames
    
    requestAnimationFrame(gameLoop);
}

// New game loop with time-based updates
function gameLoop(timestamp) {
    // Safety check: ensure gameState exists
    if (!gameState) {
        console.error('gameState is undefined in gameLoop');
        return;
    }

    // Ensure required properties exist
    if (typeof gameState.lastFrameTime === 'undefined') gameState.lastFrameTime = timestamp;
    if (typeof gameState.lastFpsUpdate === 'undefined') gameState.lastFpsUpdate = timestamp;
    if (typeof gameState.frameCount === 'undefined') gameState.frameCount = 0;
    if (typeof gameState.lastMpsUpdate === 'undefined') gameState.lastMpsUpdate = timestamp;
    if (typeof gameState.targetFps === 'undefined') gameState.targetFps = 30;
    if (typeof gameState.frameInterval === 'undefined') gameState.frameInterval = 1000 / gameState.targetFps;
    if (typeof gameState.memesPerSecond === 'undefined') gameState.memesPerSecond = 0;

    // Calculate delta time
    const deltaTime = timestamp - gameState.lastFrameTime;
    
    // Limit to target FPS (~30fps)
    if (deltaTime < gameState.frameInterval) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
    gameState.lastFrameTime = timestamp - (deltaTime % gameState.frameInterval);
    
    // FPS calculation
    gameState.frameCount++;
    if (timestamp - gameState.lastFpsUpdate >= gameState.fpsUpdateInterval) {
        gameState.fps = Math.round((gameState.frameCount * 1000) / (timestamp - gameState.lastFpsUpdate));
        gameState.frameCount = 0;
        gameState.lastFpsUpdate = timestamp;
        
        // Add FPS counter to the UI if you want to display it
        // const fpsDisplay = document.getElementById('fps-counter');
        // if (fpsDisplay) fpsDisplay.textContent = gameState.fps;
    }
    
    // MPS calculation - process every 100ms for more frequent updates
    const mpsElapsed = timestamp - (gameState.lastMpsUpdate || 0);
    if (mpsElapsed >= 100) { // Changed from 1000ms to 100ms
        // Add exactly 0.1 seconds worth of memes (1/10th of a second)
        let memesToAdd = gameState.memesPerSecond * 0.1;
        
        if (gameState.boostActive) {
            memesToAdd *= gameState.boostMultiplier;
        }
        
        addMemes(memesToAdd, false);
        gameState.generatedMemes += memesToAdd;
        
        // Update memes produced by each building
        generators.forEach(generator => {
            if (generator.amount > 0) {
                const buildingContribution = generator.output * generator.amount * 0.1;
                if (!gameState.buildingMemesProduced[generator.id]) {
                    gameState.buildingMemesProduced[generator.id] = 0;
                }
                gameState.buildingMemesProduced[generator.id] += buildingContribution;
            }
        });
        
        gameState.lastMpsUpdate = timestamp - (mpsElapsed % 100); // Adjust for 100ms intervals
    }
    
    // Update UI every frame for smooth animations
    updateCounters();
    updateBoostStatus();
    
    // Update less frequently for performance
    if (timestamp % 250 < gameState.frameInterval) { // Update about 4 times per second
        updateBuildingInfo();
    }
    
    if (timestamp % 1000 < gameState.frameInterval) { // Update once per second
        updateHeavenlyMemes();
    }
    
    if (timestamp % 5000 < gameState.frameInterval) { // Update every 5 seconds
        renderBuildingsTab();
    }
    
    if (timestamp % 10000 < gameState.frameInterval) { // Update every 10 seconds
        updateStatistics();
    }
    
    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Click handler for the meme button
function clickMeme() {
    let clickValue = gameState.memesPerClick;
    if (gameState.boostActive) {
        clickValue *= gameState.boostMultiplier;
        gameState.clickedDuringBoost = true;
    }
    
    addMemes(clickValue, true);
    gameState.clickedMemes += clickValue;
    gameState.clicksWithoutBuying = (gameState.clicksWithoutBuying || 0) + 1;
    
    // Add clicked class for sunglasses effect
    memeButton.classList.add('clicked');
    setTimeout(() => {
        memeButton.classList.remove('clicked');
    }, 500);
    
    // Keep full effects regardless of smooth mode
    createClickAnimation(clickValue);
    createClickTextParticles(clickValue);
    
    // Vibrate on click
    vibrate(10);
    
    memeCounter.style.transform = 'scale(1.2)';
    setTimeout(() => {
        memeCounter.style.transform = 'scale(1)';
    }, 200);
}

// Create a fun click animation
function createClickAnimation(value) {
    const randomPhrases = [
        `+${value}`, 'Much wow!', 'Such meme!', 'LOL!', 'ROFL!', 
        'Noice!', 'Stonks!', 'Epic!', 'Dank!', '🔥', '💯',
        'Lit!', 'Yasss!', 'Poggers!', 'Based!', 'Kek!',
        '🤣', '👌', 'Big Brain!', 'Derp!'
    ];
    
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    
    if (Math.random() < 0.7) {
        effect.textContent = `+${value}`;
    } else {
        effect.textContent = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
    }
    
    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = (Math.random() - 0.5) * 100;
    
    effect.style.left = `calc(50% + ${offsetX}px)`;
    effect.style.top = `calc(50% + ${offsetY}px)`;
    effect.style.transform = 'translate(-50%, -50%) scale(0.5)';
    effect.style.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
    
    memeButton.appendChild(effect);
    
    setTimeout(() => {
        effect.style.opacity = '1';
        effect.style.transform = 'translate(-50%, -120px) scale(1.2)';
    }, 10);
    
    setTimeout(() => {
        effect.style.opacity = '0';
        effect.style.transform = 'translate(-50%, -150px) scale(0.8)';
    }, 700);
    
    setTimeout(() => {
        effect.remove();
    }, 1200);
    
    memeButton.style.animation = 'none';
    memeButton.offsetHeight; 
    memeButton.style.animation = 'float 3s ease-in-out infinite';
}

// Create text particles when clicking
function createClickTextParticles(value) {
    // Always create full particles, regardless of smooth mode
    const particleCount = Math.floor(Math.random() * 3) + 3;
    
    // Create 3-5 particles with random phrases
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Randomly decide between number or emoji effect
        const isNumberEffect = Math.random() < 0.7;
        particle.className = `text-particle ${isNumberEffect ? 'number-effect' : 'emoji-effect'}`;
        
        // 70% chance to show value, 30% chance to show an emoji
        if (isNumberEffect) {
            particle.textContent = `+${value}`;
        } else {
            // Array of emoji options
            const emojis = ['👍', '🔥', '💯', '🚀', '⭐', '✨', '🎯', '🤣', '👌'];
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        }
        
        // Random position within button area with offset
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 70;
        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        
        // Random colors for number effect
        if (isNumberEffect) {
            const hue = Math.floor(Math.random() * 360);
            particle.style.color = `hsl(${hue}, 80%, 60%)`;
            particle.style.textShadow = `2px 2px 0 hsl(${hue}, 80%, 30%), -1px -1px 0 hsl(${hue}, 80%, 40%)`;
        }
        
        // Random size variation
        const size = 0.8 + Math.random() * 0.7;
        particle.style.fontSize = `${isNumberEffect ? size * 1.8 : size * 2}rem`;
        
        // Position and initial state
        particle.style.left = `calc(50% + ${offsetX}px)`;
        particle.style.top = `calc(50% + ${offsetY}px)`;
        particle.style.transform = 'translate(-50%, -50%) scale(0.5)';
        particle.style.opacity = '0';
        
        memeButton.appendChild(particle);
        
        // Animate particle appearance with slight delay
        setTimeout(() => {
            particle.style.opacity = '1';
            particle.style.transform = `translate(-50%, ${-100 - Math.random() * 50}px) scale(1)`;
        }, i * 50);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.style.opacity = '0';
        }, 700 + i * 50);
        
        setTimeout(() => {
            particle.remove();
        }, 1200 + i * 50);
        
        // Small chance (5%) to create MLG style particle
        if (Math.random() < 0.05 && isNumberEffect) {
            createMLGParticle(value);
        }
    }
}

// Add new MLG style particle function
function createMLGParticle(value) {
    const mlgParticle = document.createElement('div');
    mlgParticle.className = 'text-particle mlg-text-particle';
    mlgParticle.textContent = `+${value}`;
    
    // Random position with less offset for more central appearance
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 40;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;
    
    mlgParticle.style.left = `calc(50% + ${offsetX}px)`;
    mlgParticle.style.top = `calc(50% + ${offsetY}px)`;
    
    memeButton.appendChild(mlgParticle);
    
    // Trigger brief screen flash effect
    const flash = document.createElement('div');
    flash.className = 'mlg-flash';
    flash.style.background = `linear-gradient(${Math.random() * 360}deg, 
                             rgba(255,0,0,0.3), 
                             rgba(0,255,0,0.3), 
                             rgba(0,0,255,0.3))`;
    document.body.appendChild(flash);
    
    // Add shake effect to meme button
    memeButton.classList.add('mlg-shake');
    
    // Remove effects
    setTimeout(() => {
        flash.remove();
        memeButton.classList.remove('mlg-shake');
        mlgParticle.remove();
    }, 500);
}

// Update the counter displays
function updateCounters() {
    memeCounter.textContent = formatNumber(gameState.memes);
    
    let displayMPS = gameState.memesPerSecond;
    if (gameState.boostActive) {
        displayMPS *= gameState.boostMultiplier;
        mpsCounter.textContent = `${formatNumber(displayMPS)} (Boosted!)`;
    } else {
        mpsCounter.textContent = formatNumber(displayMPS);
    }
    
    document.querySelectorAll('.buy-button').forEach(button => {
        const generatorId = button.dataset.id;
        const generator = generators.find(g => g.id === generatorId);
        const cost = calculateCost(generator);
        
        button.disabled = gameState.memes < cost;
    });
}

// Format large numbers for display
function formatNumber(num) {
    if (num < 1000) return num.toFixed(1).replace(/\.0$/, '');
    
    const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc'];
    const unit = Math.floor(Math.log10(num) / 3);
    const value = num / Math.pow(10, unit * 3);
    
    return value.toFixed(2).replace(/\.00$/, '') + units[unit];
}

// Calculate cost for next generator
function calculateCost(generator) {
    return Math.floor(generator.baseCost * Math.pow(generator.costMultiplier, generator.amount));
}

// Recalculate memes per second based on owned generators
function recalculateMemesPerSecond() {
    // Apply the 0.1 bonus per heavenly meme
    const heavenlyBonus = 1 + (gameState.heavenlyMemes * 0.1); 
    
    gameState.memesPerSecond = generators.reduce((total, generator) => {
        return total + (generator.output * generator.amount * heavenlyBonus);
    }, 0); // Calculate based on owned generators and bonus
}

// Render Buildings Tab
function renderBuildingsTab() {
    const buildingsGrid = document.getElementById('buildings-grid');
    const buildingsTotal = document.getElementById('buildings-total');
    const buildingsMps = document.getElementById('buildings-mps');
    
    if (!buildingsGrid) return;
    
    buildingsTotal.textContent = gameState.totalBuildings;
    buildingsMps.textContent = formatNumber(gameState.memesPerSecond);
    
    // Add a decorative divider after the info section
    if (!document.querySelector('.buildings-divider')) {
        const divider = document.createElement('div');
        divider.className = 'divider buildings-divider';
        buildingsGrid.parentNode.insertBefore(divider, buildingsGrid);
    }
    
    buildingsGrid.innerHTML = '';
    
    generators.forEach(generator => {
        if (!generator.unlocked && generator.amount === 0) return;
        
        // Apply heavenly meme bonus to base output
        const heavenlyBonus = 1 + (gameState.heavenlyMemes * 0.1);
        const baseOutputWithBonus = generator.output * heavenlyBonus;
        const totalOutput = baseOutputWithBonus * generator.amount;
        const percentage = gameState.memesPerSecond > 0 ? 
            Math.round((totalOutput / gameState.memesPerSecond) * 100) : 0;
        
        const nextCost = calculateCost(generator);
        
        const buildingCard = document.createElement('div');
        buildingCard.className = `building-card ${generator.amount > 0 ? 'owned' : ''}`;
        
        buildingCard.innerHTML = `
            <div class="building-icon">${generator.icon || generator.name.charAt(0)}</div>
            <div class="building-details">
                <h3>${generator.name}</h3>
                <p>${generator.description}</p>
                <div class="building-stats">
                    <div class="building-owned">Owned: <span>${generator.amount}</span></div>
                    <div class="building-output">Output: <span>${formatNumber(totalOutput)}</span>/sec (${percentage}%) 
                        <span class="bonus-tooltip" title="Includes ${Math.round((heavenlyBonus - 1) * 100)}% heavenly bonus">ℹ️</span>
                    </div>
                    <div class="building-cost">Next: <span>${formatNumber(nextCost)}</span> memes</div>
                </div>
                <button class="building-buy-button" data-id="${generator.id}" ${gameState.memes >= nextCost ? '' : 'disabled'}>
                    Buy
                </button>
            </div>
            <button class="info-button" data-id="${generator.id}">i</button>
        `;
        
        const buyButton = buildingCard.querySelector('.building-buy-button');
        buyButton.addEventListener('click', () => buyGenerator(generator.id));
        
        const infoButton = buildingCard.querySelector('.info-button');
        infoButton.addEventListener('click', () => showBuildingInfoModal(generator));
        
        buildingsGrid.appendChild(buildingCard);
    });
}

// Buy a generator
function buyGenerator(generatorId) {
    const generator = generators.find(g => g.id === generatorId);
    const cost = calculateCost(generator);
    
    if (gameState.memes >= cost) {
        gameState.memes -= cost;
        generator.amount++;
        gameState.totalBuildings++;
        gameState.clicksWithoutBuying = 0; 
        
        gameState.buildingClickBonus += 0.1; 
        gameState.memesPerClick = parseFloat((1 + gameState.buildingClickBonus).toFixed(1));
        
        // Medium vibration when buying a building
        vibrate(30);
        
        recalculateMemesPerSecond();
        
        renderBuildingsTab();
        updateCounters();
        updateBuildingInfo();
        
        // Wrap the updateHeavenlyMemes call in a try-catch to prevent game freezing
        try {
            updateHeavenlyMemes(); // Update prestige info after buying
        } catch (err) {
            console.log('Error updating heavenly memes, will retry on next game loop:', err);
        }
    }
}

// Update building information display
function updateBuildingInfo() {
    const totalBuildingsElement = document.getElementById('buildings-total');
    const buildingsMpsElement = document.getElementById('buildings-mps');
    
    if (totalBuildingsElement) {
        totalBuildingsElement.textContent = gameState.totalBuildings;
    }
    
    if (buildingsMpsElement) {
        buildingsMpsElement.textContent = formatNumber(gameState.memesPerSecond);
    }
}

// Activate 2x boost
function activateBoost() {
    if (gameState.boostCooldown) return;
    
    gameState.boostActive = true;
    gameState.boostEndTime = Date.now() + (gameState.boostDuration * 1000);
    gameState.boostActivations = (gameState.boostActivations || 0) + 1;
    boostButton.disabled = true;
    
    // Stronger vibration for boost activation
    vibrate(100);
    
    updateBoostStatus();
}

// Update boost status
function updateBoostStatus() {
    if (gameState.boostActive) {
        const remainingTime = Math.max(0, Math.floor((gameState.boostEndTime - Date.now()) / 1000));
        
        if (remainingTime <= 0) {
            gameState.boostActive = false;
            gameState.boostCooldown = true;
            boostTimer.textContent = "Cooling down (60s)...";
            
            setTimeout(() => {
                gameState.boostCooldown = false;
                boostButton.disabled = false;
                boostTimer.textContent = "";
            }, 60000); 
            
            // Removed unnecessary code
        } else {
            boostTimer.textContent = `Boost active: ${remainingTime}s`;
        }
    } else if (gameState.boostCooldown) {
        const cooldownEndTime = gameState.boostEndTime + 60000; // 60 seconds after boost ends
        const cooldownRemaining = Math.max(0, Math.floor((cooldownEndTime - Date.now()) / 1000));
        
        if (cooldownRemaining <= 0) {
            gameState.boostCooldown = false;
            boostButton.disabled = false;
            boostTimer.textContent = "";
        } else {
            boostTimer.textContent = `Cooling down (${cooldownRemaining}s)...`;
            boostButton.disabled = true;
        }
    } else {
        boostButton.disabled = false;
        boostTimer.textContent = "";
    }
}

// Update statistics tab
function updateStatistics() {
    statTotalMemes.textContent = formatNumber(gameState.totalMemes);
    statClickedMemes.textContent = formatNumber(gameState.clickedMemes);
    statGeneratedMemes.textContent = formatNumber(gameState.generatedMemes);
    statMemesPerClick.textContent = gameState.memesPerClick.toFixed(1);
    
    const timePlayed = Math.floor((Date.now() - gameState.gameStartTime) / 1000);
    const hours = Math.floor(timePlayed / 3600);
    const minutes = Math.floor((timePlayed % 3600) / 60);
    const seconds = timePlayed % 60;
    statTimePlayed.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    buildingStats.innerHTML = "";
    generators.forEach(generator => {
        if (generator.amount > 0) {
            const buildingStatItem = document.createElement('p');
            buildingStatItem.innerHTML = `${generator.icon} ${generator.name} <span>${generator.amount}</span>`;
            buildingStats.appendChild(buildingStatItem);
        }
    });
    
    achievementStats.innerHTML = "";
    let unlockedCount = 0;
    
    achievements.forEach(achievement => {
        if (gameState.achievements[achievement.id]) {
            unlockedCount++;
            const achievementItem = document.createElement('p');
            achievementItem.className = "unlocked-achievement";
            achievementItem.textContent = `${achievement.name}: ✓`;
            achievementStats.appendChild(achievementItem);
        }
    });
    
    const progress = document.createElement('p');
    progress.className = "achievement-progress";
    progress.textContent = `Progress: ${unlockedCount}/${achievements.length} memechievements`;
    achievementStats.appendChild(progress);
    
    // Add prestige statistics
    const statsContainer = document.getElementById('stat-box');
    if (statsContainer && document.getElementById('prestige-stats') === null) {
        const prestigeStats = document.createElement('div');
        prestigeStats.id = 'prestige-stats';
        prestigeStats.innerHTML = `
            <p>Heavenly Memes: <span>${gameState.heavenlyMemes}</span></p>
            <p>Ascensions: <span>${gameState.ascensions}</span></p>
            <p>Production Multiplier: <span>×${(1 + (gameState.heavenlyMemes * 0.1)).toFixed(2)}</span></p>
        `;
        if (document.querySelector('.stat-box')) {
            document.querySelector('.stat-box').appendChild(prestigeStats);
        }
    }
    
    // Add decorative dividers to statistics sections
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach(box => {
        if (!box.querySelector('.stat-divider')) {
            const divider = document.createElement('div');
            divider.className = 'divider stat-divider';
            box.appendChild(divider);
        }
    });
}

// Start a mini-game
function startMiniGame(gameType) {
    minigameArea.innerHTML = '';
    minigameArea.classList.add('active');
    
    gameState.minigamesPlayed = (gameState.minigamesPlayed || 0) + 1;
    if (!gameState.minigamesTypes) gameState.minigamesTypes = new Set();
    gameState.minigamesTypes.add(gameType);
    
    switch(gameType) {
        case 'memory':
            startMemoryGame();
            break;
        case 'reaction':
            startReactionGame();
            break;
        case 'trivia':
            startTriviaGame();
            break;
    }
}

// Memory Game
function startMemoryGame() {
    const memoryGame = document.createElement('div');
    memoryGame.className = 'memory-game';
    
    memoryGame.innerHTML = `
        <h3>Meme Memory</h3>
        <p>Match pairs of meme cards to win ${formatNumber(miniGames.memory.reward())} memes!</p>
        <div class="memory-grid" id="memory-grid"></div>
        <button id="exit-minigame" class="exit-minigame">Exit Game</button>
    `;
    
    minigameArea.appendChild(memoryGame);
    
    const memoryGrid = document.getElementById('memory-grid');
    const memeTypes = ['doge', 'cat', 'rickroll', 'distracted', 'stonks', 'pepe'];
    const cards = [...memeTypes, ...memeTypes]; 
    
    cards.sort(() => Math.random() - 0.5);
    
    cards.forEach((meme, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.meme = meme;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-back">?</div>
            <div class="card-front">${meme}</div>
        `;
        
        memoryGrid.appendChild(card);
    });
    
    let flippedCards = [];
    let matchedPairs = 0;
    
    memoryGrid.addEventListener('click', e => {
        const card = e.target.closest('.memory-card');
        if (!card || card.classList.contains('flipped') || flippedCards.length >= 2) return;
        
        card.classList.add('flipped');
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.meme === flippedCards[1].dataset.meme) {
                flippedCards = [];
                matchedPairs++;
                
                if (matchedPairs === memeTypes.length) {
                    const reward = miniGames.memory.reward();
                    addMemes(reward, false);
                    gameState.memoryGamesWon = (gameState.memoryGamesWon || 0) + 1;
                    
                    setTimeout(() => {
                        showAchievementPopup(`You won ${formatNumber(reward)} memes!`);
                        minigameArea.classList.remove('active');
                    }, 1000);
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(c => c.classList.remove('flipped'));
                    flippedCards = [];
                }, 1000);
            }
        }
    });
    
    document.getElementById('exit-minigame').addEventListener('click', () => {
        minigameArea.classList.remove('active');
    });
}

// Reaction Game
function startReactionGame() {
    const reactionGame = document.createElement('div');
    reactionGame.className = 'reaction-game';
    
    reactionGame.innerHTML = `
        <h3>Fast Clicker</h3>
        <p>Click as many meme faces as you can in 10 seconds!</p>
        <div class="reaction-area">
            <div id="reaction-timer">10</div>
            <div id="reaction-score">Score: 0</div>
            <div id="reaction-target-area"></div>
        </div>
        <button id="start-reaction" class="start-minigame">Start Game</button>
        <button id="exit-minigame" class="exit-minigame">Exit Game</button>
    `;
    
    minigameArea.appendChild(reactionGame);
    
    const reactionTimer = document.getElementById('reaction-timer');
    const reactionScore = document.getElementById('reaction-score');
    const targetArea = document.getElementById('reaction-target-area');
    const startButton = document.getElementById('start-reaction');
    
    let timeLeft = 10;
    let score = 0;
    let gameInterval;
    
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        score = 0;
        timeLeft = 10;
        reactionScore.textContent = `Score: ${score}`;
        reactionTimer.textContent = timeLeft;
        
        createTarget();
        
        gameInterval = setInterval(() => {
            timeLeft--;
            reactionTimer.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                targetArea.innerHTML = '';
                
                if (score > (gameState.highestReactionScore || 0)) {
                    gameState.highestReactionScore = score;
                }
                
                const reward = miniGames.reaction.reward(score);
                addMemes(reward, false);
                
                showAchievementPopup(`You scored ${score} and won ${formatNumber(reward)} memes!`);
                startButton.style.display = 'block';
                startButton.textContent = 'Play Again';
            }
        }, 1000);
    });
    
    function createTarget() {
        targetArea.innerHTML = '';
        const target = document.createElement('div');
        target.className = 'reaction-target';
        
        const left = Math.random() * 80 + 10;
        const top = Math.random() * 80 + 10;
        
        target.style.left = `${left}%`;
        target.style.top = `${top}%`;
        
        target.innerHTML = `
            <svg viewBox="0 0 100 100" class="target-meme">
                <circle cx="50" cy="50" r="45" fill="#FFDE00" />
                <ellipse cx="35" cy="40" rx="8" ry="9" fill="#FFFFFF" />
                <ellipse cx="35" cy="40" rx="4" ry="5" fill="#000" />
                <ellipse cx="65" cy="40" rx="8" ry="9" fill="#FFFFFF" />
                <ellipse cx="65" cy="40" rx="4" ry="5" fill="#000" />
                <path d="M30 65 Q50 85 70 65" stroke="#000" stroke-width="4" fill="none" />
            </svg>
        `;
        
        target.addEventListener('click', () => {
            score++;
            reactionScore.textContent = `Score: ${score}`;
            createTarget();
        });
        
        targetArea.appendChild(target);
    }
    
    document.getElementById('exit-minigame').addEventListener('click', () => {
        clearInterval(gameInterval);
        minigameArea.classList.remove('active');
    });
}

// Trivia Game
function startTriviaGame() {
    const triviaGame = document.createElement('div');
    triviaGame.className = 'trivia-game';
    
    triviaGame.innerHTML = `
        <h3>Meme Trivia</h3>
        <p>Test your meme knowledge!</p>
        <div class="trivia-container">
            <div id="trivia-question"></div>
            <div id="trivia-options"></div>
            <div id="trivia-result"></div>
        </div>
        <button id="start-trivia" class="start-minigame">Start Game</button>
        <button id="exit-minigame" class="exit-minigame">Exit Game</button>
    `;
    
    minigameArea.appendChild(triviaGame);
    
    const questionElement = document.getElementById('trivia-question');
    const optionsElement = document.getElementById('trivia-options');
    const resultElement = document.getElementById('trivia-result');
    const startButton = document.getElementById('start-trivia');
    
    const triviaQuestions = [
        {
            question: "Which meme features a skeptical dog with raised eyebrows?",
            options: ["Doge", "Grumpy Cat", "Surprised Pikachu", "Side-eyeing Chloe"],
            answer: 0
        },
        {
            question: "What year did the 'Distracted Boyfriend' meme become popular?",
            options: ["2015", "2016", "2017", "2018"],
            answer: 2
        },
        {
            question: "Which meme involves a character pointing to his head suggesting intelligence?",
            options: ["Expanding Brain", "Roll Safe", "Thinking Dinosaur", "Big Brain Time"],
            answer: 1
        },
        {
            question: "Which animal is featured in the 'I Can Has Cheezburger?' meme?",
            options: ["Dog", "Cat", "Hamster", "Bird"],
            answer: 1
        },
        {
            question: "What is the name of the meme featuring a man in a stock photo with text about investing?",
            options: ["Money Man", "Wall Street Bro", "Stonks", "Investment Guy"],
            answer: 2
        }
    ];
    
    let currentQuestion = 0;
    let correctAnswers = 0;
    
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        currentQuestion = 0;
        correctAnswers = 0;
        resultElement.textContent = '';
        
        showQuestion(currentQuestion);
    });
    
    function showQuestion(index) {
        if (index >= triviaQuestions.length) {
            const reward = Math.floor(miniGames.trivia.reward() * (correctAnswers / triviaQuestions.length));
            addMemes(reward, false);
            
            if (correctAnswers === triviaQuestions.length) {
                gameState.perfectTriviaGames = (gameState.perfectTriviaGames || 0) + 1;
            }
            
            resultElement.innerHTML = `
                <h4>Game Complete!</h4>
                <p>You got ${correctAnswers} out of ${triviaQuestions.length} correct!</p>
                <p>Reward: ${formatNumber(reward)} memes</p>
            `;
            
            showAchievementPopup(`You won ${formatNumber(reward)} memes in Trivia!`);
            startButton.style.display = 'block';
            startButton.textContent = 'Play Again';
            return;
        }
        
        const question = triviaQuestions[index];
        
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        
        question.options.forEach((option, i) => {
            const button = document.createElement('button');
            button.className = 'trivia-option';
            button.textContent = option;
            
            button.addEventListener('click', () => {
                if (i === question.answer) {
                    correctAnswers++;
                    resultElement.textContent = "Correct!";
                    resultElement.className = "correct-answer";
                } else {
                    resultElement.textContent = "Wrong! The correct answer was: " + question.options[question.answer];
                    resultElement.className = "wrong-answer";
                }
                
                document.querySelectorAll('.trivia-option').forEach(btn => {
                    btn.disabled = true;
                    if (btn.textContent === question.options[question.answer]) {
                        btn.classList.add('correct-option');
                    }
                });
                
                setTimeout(() => {
                    showQuestion(currentQuestion + 1);
                }, 2000);
            });
            
            optionsElement.appendChild(button);
        });
        
        currentQuestion = index;
    }
    
    document.getElementById('exit-minigame').addEventListener('click', () => {
        minigameArea.classList.remove('active');
    });
}

// Check for achievements
function checkAchievements() {
    achievements.forEach(achievement => {
        if (!gameState.achievements[achievement.id] && achievement.requirement()) {
            gameState.achievements[achievement.id] = true;
            
            showAchievementPopup(achievement.message);
        }
    });
    
    if (document.getElementById('statistics').classList.contains('active')) {
        updateStatistics();
    }
}

// Show achievement popup
function showAchievementPopup(message) {
    if (achievementPopup.classList.contains('show')) {
        setTimeout(() => showAchievementPopup(message), 3000);
        return;
    }
    
    achievementText.textContent = message;
    achievementPopup.classList.add('show');
    
    // Vibrate when achievement unlocked
    vibrate(200);
    
    const timeoutId = setTimeout(() => {
        achievementPopup.classList.remove('show');
    }, 3000);
    
    achievementPopup.dataset.timeoutId = timeoutId;
}

// Meme Haven functions
function calculateHeavenlyMemes() {
    // Formula: square root of (total memes / 1e6)
    if (gameState.totalMemes < 1000000) return 0;
    
    return Math.floor(Math.sqrt(gameState.totalMemes / 1000000));
}

function updateHeavenlyMemes() {
    const heavenlyMemes = document.getElementById('heavenly-memes');
    const potentialMemes = document.getElementById('potential-heavenly-memes');
    const multiplier = document.getElementById('heavenly-multiplier');
    const ascendButton = document.getElementById('ascend-button');
    const progressBar = document.getElementById('ascension-progress');
    
    if (!heavenlyMemes || !potentialMemes || !multiplier || !ascendButton || !progressBar) return;
    
    // Update current heavenly memes
    heavenlyMemes.textContent = gameState.heavenlyMemes;
    
    // Calculate potential new heavenly memes
    const potentialAmount = calculateHeavenlyMemes();
    potentialMemes.textContent = potentialAmount;
    
    // Update current multiplier
    const bonusPercent = (gameState.heavenlyMemes * 10).toFixed(0);
    multiplier.textContent = `+${bonusPercent}%`;
    
    // Update ascend button and progress
    if (gameState.totalMemes >= 1000000 && potentialAmount > 0) {
        ascendButton.disabled = false;
        
        // Calculate progress percentage (capped at 100%)
        const progressPercent = Math.min(100, (gameState.totalMemes / 1000000) * 100);
        progressBar.style.width = `${progressPercent}%`;
    } else {
        ascendButton.disabled = true;
        
        // Calculate partial progress
        const progressPercent = Math.min(100, (gameState.totalMemes / 1000000) * 100);
        progressBar.style.width = `${progressPercent}%`;
    }
}

function showAscensionWarning() {
    const warning = document.getElementById('ascension-warning');
    if (warning) {
        warning.style.display = 'block';
    }
}

function hideAscensionWarning() {
    const warning = document.getElementById('ascension-warning');
    if (warning) {
        warning.style.display = 'none';
    }
}

function performAscension() {
    // Calculate heavenly memes to add
    const newHeavenlyMemes = calculateHeavenlyMemes();
    
    if (newHeavenlyMemes <= 0) {
        hideAscensionWarning();
        return;
    }
    
    // Add to total heavenly memes
    gameState.heavenlyMemes += newHeavenlyMemes;
    
    // Increment ascension counter
    gameState.ascensions++;
    
    // Record ascension time
    gameState.lastAscensionTime = Date.now();
    
    // Special long vibration pattern for ascension (important event)
    vibrate([100, 50, 100, 50, 200]);
    
    // Reset game state but keep certain values
    const preservedState = {
        achievements: {...gameState.achievements},
        heavenlyMemes: gameState.heavenlyMemes,
        ascensions: gameState.ascensions,
        gameStartTime: gameState.gameStartTime,
        hasSeenTitleScreen: true,
        lastAscensionTime: gameState.lastAscensionTime,
        platform: gameState.platform,
        notificationsEnabled: gameState.notificationsEnabled,
        vibrationEnabled: gameState.vibrationEnabled,
        smoothMode: gameState.smoothMode
    };
    
    // Reset game state
    gameState = {
        memes: 0,
        memesPerClick: 1,
        memesPerSecond: 0,
        totalMemes: 0,
        clickedMemes: 0,
        generatedMemes: 0,
        achievements: preservedState.achievements,
        gameStartTime: preservedState.gameStartTime,
        totalBuildings: 0,
        boostActivations: 0,
        minigamesPlayed: 0,
        minigamesTypes: new Set(),
        memoryGamesWon: 0,
        highestReactionScore: 0,
        perfectTriviaGames: 0,
        clickedDuringBoost: false,
        clicksWithoutBuying: 0,
        buildingClickBonus: 0,
        hasSeenTitleScreen: preservedState.hasSeenTitleScreen,
        heavenlyMemes: preservedState.heavenlyMemes,
        ascensions: preservedState.ascensions,
        lastAscensionTime: preservedState.lastAscensionTime,
        vibrationEnabled: preservedState.vibrationEnabled,
        smoothMode: preservedState.smoothMode,
        notificationsEnabled: preservedState.notificationsEnabled,
        buildingMemesProduced: {}
    };
    
    // Initialize building memes produced after ascension
    generators.forEach(gen => {
        if (!gameState.buildingMemesProduced[gen.id]) {
            gameState.buildingMemesProduced[gen.id] = 0;
        }
    });
    
    updateCounters();
    updateBuildingInfo();
    updateStatistics();
    renderGenerators();
    renderBuildingsTab();
    
    // Safely update heaven info
    try {
        updateHeavenlyMemes(); // Update prestige info after buying
    } catch (err) {
        console.log('Error updating heavenly memes after ascension:', err);
    }
    
    hideAscensionWarning();
    
    // Save the game after ascension
    saveGame();
}

// Add memes to the game state
function addMemes(amount, fromClick) {
    gameState.memes += amount;
    gameState.totalMemes += amount;
    
    if (fromClick) {
        gameState.clickedMemes += amount;
    } else {
        gameState.generatedMemes += amount;
    }
}

// Save game to localStorage
function saveGame() {
    const saveData = {
        memes: gameState.memes,
        memesPerClick: gameState.memesPerClick,
        memesPerSecond: gameState.memesPerSecond,
        totalMemes: gameState.totalMemes,
        clickedMemes: gameState.clickedMemes,
        generatedMemes: gameState.generatedMemes,
        generators: generators.map(g => ({ id: g.id, amount: g.amount })),
        achievements: gameState.achievements,
        gameStartTime: gameState.gameStartTime,
        totalBuildings: gameState.totalBuildings,
        boostActivations: gameState.boostActivations,
        minigamesPlayed: gameState.minigamesPlayed,
        minigamesTypes: Array.from(gameState.minigamesTypes || []),
        memoryGamesWon: gameState.memoryGamesWon,
        highestReactionScore: gameState.highestReactionScore,
        perfectTriviaGames: gameState.perfectTriviaGames,
        clickedDuringBoost: gameState.clickedDuringBoost,
        clicksWithoutBuying: gameState.clicksWithoutBuying,
        buildingClickBonus: gameState.buildingClickBonus,
        hasSeenTitleScreen: gameState.hasSeenTitleScreen,
        heavenlyMemes: gameState.heavenlyMemes,
        ascensions: gameState.ascensions,
        lastAscensionTime: gameState.lastAscensionTime,
        vibrationEnabled: gameState.vibrationEnabled,
        smoothMode: gameState.smoothMode,
        notificationsEnabled: gameState.notificationsEnabled,
        buildingMemesProduced: gameState.buildingMemesProduced,
        lastSaved: Date.now() // Add timestamp for offline progress
    };
    
    try {
        localStorage.setItem('memeClickerSave', JSON.stringify(saveData));
        showAutosaveIndicator();
    } catch (error) {
        console.error('Error saving game:', error);
    }
}

// Show autosave indicator function
function showAutosaveIndicator() {
    const indicator = document.getElementById('autosave-indicator');
    if (!indicator) return;
    
    indicator.classList.add('show');
    
    // Hide after 2 seconds
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// Reset game progress
function resetGame() {
    localStorage.removeItem('memeClickerSave');
    
    gameState = {
        memes: 0,
        memesPerClick: 1,
        memesPerSecond: 0,
        totalMemes: 0,
        clickedMemes: 0,
        generatedMemes: 0,
        achievements: {},
        gameStartTime: Date.now(),
        lastSaveTime: Date.now(),
        boostActive: false,
        boostEndTime: 0,
        boostMultiplier: 2,
        boostDuration: 30,
        boostCooldown: false,
        totalBuildings: 0,
        boostActivations: 0,
        minigamesPlayed: 0,
        minigamesTypes: new Set(),
        memoryGamesWon: 0,
        highestReactionScore: 0,
        perfectTriviaGames: 0,
        clickedDuringBoost: false,
        clicksWithoutBuying: 0,
        buildingClickBonus: 0,
        platform: 'browser',
        hasSeenTitleScreen: false,
        heavenlyMemes: 0,
        ascensions: 0,
        lastAscensionTime: 0,
        vibrationEnabled: true,
        smoothMode: false,
        notificationsEnabled: true,
        buildingMemesProduced: {}
    };
    
    // Reset all generators
    generators.forEach(generator => {
        generator.amount = 0;
    });
    
    updateCounters();
    updateBuildingInfo();
    updateStatistics();
    renderGenerators();
    renderBuildingsTab();
    updateHeavenlyMemes();
    saveGame();
}

// Show Building Info Modal
function showBuildingInfoModal(generator) {
    // Safety check: ensure generator exists
    if (!generator) {
        console.error('Attempted to show modal for undefined generator');
        return;
    }
    
    // Calculate base output with heavenly bonus
    const heavenlyBonus = 1 + (gameState.heavenlyMemes * 0.1);
    const baseOutput = generator.output * heavenlyBonus;
    
    const generatorId = generator.id || 'unknown';
    const generatorName = generator.name || 'Unknown Generator';
    const generatorDescription = generator.description || 'No description available';
    const generatorIcon = generator.icon || '❓';
    const generatorAmount = generator.amount || 0;
    
    // Get total memes produced by this building, with fallback
    const memesProduced = (gameState.buildingMemesProduced && gameState.buildingMemesProduced[generatorId]) || 0;
    
    const modalOverlay = document.getElementById('modal-overlay');
    
    modalOverlay.innerHTML = `
        <div class="building-info-modal">
            <button class="close-modal">✕</button>
            <div class="building-info-header">
                <div class="modal-building-icon">${generatorIcon}</div>
                <div class="modal-building-title">
                    <h3>${generatorName}</h3>
                    <p>${generatorDescription}</p>
                </div>
            </div>
            
            <div class="info-stat">
                <div class="info-label">Base output:</div>
                <div class="info-value" id="base-output-value">${baseOutput.toFixed(generator.output % 1 === 0 ? 0 : 1)} memes/sec 
                    <span class="bonus-tooltip" title="Heavenly Memes bonus: ${Math.round((heavenlyBonus - 1) * 100)}%">ℹ️</span>
                </div>
            </div>
            <div class="info-stat">
                <div class="info-label">Owned:</div>
                <div class="info-value">${generatorAmount}</div>
            </div>
            <div class="info-stat">
                <div class="info-label">Total output:</div>
                <div class="info-value" id="total-output-value">${formatNumber(baseOutput * generatorAmount)} memes/sec</div>
            </div>
            <div class="info-stat">
                <div class="info-label">Cost of next:</div>
                <div class="info-value">${formatNumber(calculateCost(generator))} memes</div>
            </div>
            
            <div class="info-produced-container">
                <div class="info-produced-title">Total memes produced:</div>
                <div class="info-produced-value" id="produced-value-${generatorId}">${formatNumber(memesProduced)}</div>
            </div>
            
            <div class="meme-haven-bonus-info">
                <div class="info-label">Meme Haven Bonus:</div>
                <div class="info-value">
                    +${Math.round((heavenlyBonus - 1) * 100)}% (${gameState.heavenlyMemes} Heavenly Memes)
                </div>
            </div>
        </div>
    `;
    
    // Real-time updates for produced memes and bonus
    if (generator.amount > 0 && gameState && gameState.buildingMemesProduced) {
        const producedValue = modalOverlay.querySelector(`#produced-value-${generatorId}`);
        const baseOutputValue = modalOverlay.querySelector('#base-output-value');
        const totalOutputValue = modalOverlay.querySelector('#total-output-value');
        
        let lastHeavenlyMemes = gameState.heavenlyMemes;
        
        const updateProduction = () => {
            if (modalOverlay.classList.contains('active')) {
                // Check if heavenly memes changed
                const currentHeavenlyBonus = 1 + (gameState.heavenlyMemes * 0.1);
                
                // Recalculate if heavenly memes changed
                if (lastHeavenlyMemes !== gameState.heavenlyMemes) {
                    const currentBaseOutput = generator.output * currentHeavenlyBonus;
                    
                    // Update base output with bonus
                    if (baseOutputValue) {
                        baseOutputValue.innerHTML = `${currentBaseOutput.toFixed(generator.output % 1 === 0 ? 0 : 1)} memes/sec 
                            <span class="bonus-tooltip" title="Heavenly Memes bonus: ${Math.round((currentHeavenlyBonus - 1) * 100)}%">ℹ️</span>`;
                    }
                    
                    // Update total output
                    if (totalOutputValue) {
                        totalOutputValue.textContent = `${formatNumber(currentBaseOutput * generatorAmount)} memes/sec`;
                    }
                    
                    // Update last tracked heavenly memes
                    lastHeavenlyMemes = gameState.heavenlyMemes;
                }
                
                // Update production values
                const currentProduction = gameState.buildingMemesProduced[generatorId] || 0;
                if (producedValue) {
                    producedValue.textContent = formatNumber(currentProduction);
                }
                
                requestAnimationFrame(updateProduction);
            }
        };
        requestAnimationFrame(updateProduction);
    }
    
    modalOverlay.classList.add('active');
    
    const closeButton = modalOverlay.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }
}

// Show return loading screen
function showReturnLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('active');
    
    // Update loading tips for returning from encyclopedia
    const loadingTips = [
        "Tip: Check the encyclopedia anytime to learn about meme history!",
        "Tip: Knowledge is power, meme knowledge is laughter!",
        "Tip: The more you know about memes, the better you can click!",
        "Tip: Returning to your meme empire, stand by!",
        "Tip: Loading your meme collection..."
    ];
    
    const tipElement = document.querySelector('.loading-tip');
    tipElement.textContent = loadingTips[Math.floor(Math.random() * loadingTips.length)];
    
    // Update loading text
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = "Returning to Game...";
    }
    
    // Simulate loading time (slightly shorter when returning)
    setTimeout(() => {
        loadingScreen.classList.remove('active');
        document.body.style.overflow = '';
    }, 2000); // Show loading screen for 2 seconds when returning
}

// Show reset confirmation dialog
function showResetConfirmation() {
    const resetConfirm = document.getElementById('reset-confirm');
    if (resetConfirm) {
        resetConfirm.style.display = 'block';
    }
}

// Hide reset confirmation dialog
function hideResetConfirmation() {
    const resetConfirm = document.getElementById('reset-confirm');
    if (resetConfirm) {
        resetConfirm.style.display = 'none';
    }
}

// Apply performance mode settings
function applyPerformanceMode() {
    if (gameState.smoothMode) {
        // Reduce animations and effects
        document.body.classList.add('smooth-mode');
        gameState.targetFps = 20; // Lower target FPS
        gameState.frameInterval = 1000 / gameState.targetFps;
        
        // Reduce particle effects
        const memeButton = document.querySelector('.meme-button');
        if (memeButton) {
            memeButton.setAttribute('data-reduced-effects', 'true');
        }
    } else {
        // Restore normal settings
        document.body.classList.remove('smooth-mode');
        gameState.targetFps = 30; // Normal target FPS
        gameState.frameInterval = 1000 / gameState.targetFps;
        
        // Restore normal effects
        const memeButton = document.querySelector('.meme-button');
        if (memeButton) {
            memeButton.removeAttribute('data-reduced-effects');
        }
    }
}

// Browser-compatible setup notifications function
function setupNotifications() {
    // Remove automatic permission request - only request when user toggles setting
    // Just check if notifications are already granted and schedule if so
    if ('Notification' in window && Notification.permission === 'granted' && gameState.notificationsEnabled) {
        scheduleNotifications();
    }
}

// Browser-compatible schedule notifications
function scheduleNotifications() {
    // Use browser notification API
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return;
    }
    
    // Funny notification titles and messages
    const memeNotifications = [
        { title: "Daily Meme: Doge Wants You Back", text: "Much miss. Very lonely. Wow. Come back to collect memes!" },
        { title: "Daily Meme: Distracted Boyfriend", text: "Your memes are looking at other players! Come back now!" },
        { title: "Daily Meme: Stonks Guy", text: "Your meme economy is experiencing inflation. Stonks!" },
        { title: "Daily Meme: Hide the Pain Harold", text: "Your buildings miss you! Harold is hiding the pain." },
        { title: "Daily Meme: Galaxy Brain", text: "Big brain time! Return to your meme empire!" },
        { title: "Daily Meme: Cheems Bonk", text: "*Bonk* Go to meme jail for not collecting your memes!" },
        { title: "Daily Meme: Success Kid", text: "You've got uncollected memes waiting for you!" },
        { title: "Daily Meme: Surprised Pikachu", text: "When you realize how many memes you've missed! :o" },
        { title: "Daily Meme: Jafet Was Here", text: "And now he's wondering where YOU are!" }
    ];
    
    // Schedule a reminder notification for later (browsers don't support scheduled notifications like mobile)
    // Instead, we'll use localStorage to track when to show notifications
    const lastNotification = localStorage.getItem('memeClickerLastNotification');
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    if (!lastNotification || (now - parseInt(lastNotification)) > oneDayMs) {
        // Set a timeout for showing notification after 30 minutes of inactivity
        setTimeout(() => {
            if (document.hidden) {
                const notification = memeNotifications[Math.floor(Math.random() * memeNotifications.length)];
                new Notification(notification.title, {
                    body: notification.text,
                    icon: '/favicon.ico' // Add favicon if available
                });
                localStorage.setItem('memeClickerLastNotification', now.toString());
            }
        }, 30 * 60 * 1000); // 30 minutes
    }
    
    // Set up visibility change listener for re-engagement notifications
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            // User returned to tab
            const lastActive = localStorage.getItem('memeClickerLastActive');
            if (lastActive) {
                const timeSinceActive = now - parseInt(lastActive);
                if (timeSinceActive > 60 * 60 * 1000) { // More than 1 hour
                    // Show welcome back notification
                    setTimeout(() => {
                        showAchievementPopup('Welcome back! Your memes missed you!');
                    }, 1000);
                }
            }
        } else {
            // User left tab
            localStorage.setItem('memeClickerLastActive', Date.now().toString());
        }
    });
}

// Load game from localStorage
function loadGame() {
    const saveData = localStorage.getItem('memeClickerSave');
    
    if (saveData) {
        try {
            const parsedData = JSON.parse(saveData);
            
            gameState.memes = parsedData.memes || 0;
            gameState.memesPerClick = parsedData.memesPerClick || 1;
            gameState.memesPerSecond = parsedData.memesPerSecond || 0;
            gameState.totalMemes = parsedData.totalMemes || 0;
            gameState.clickedMemes = parsedData.clickedMemes || 0;
            gameState.generatedMemes = parsedData.generatedMemes || 0;
            gameState.achievements = parsedData.achievements || {};
            gameState.gameStartTime = parsedData.gameStartTime || Date.now();
            gameState.totalBuildings = parsedData.totalBuildings || 0;
            gameState.boostActivations = parsedData.boostActivations || 0;
            gameState.minigamesPlayed = parsedData.minigamesPlayed || 0;
            gameState.minigamesTypes = new Set(parsedData.minigamesTypes || []);
            gameState.memoryGamesWon = parsedData.memoryGamesWon || 0;
            gameState.highestReactionScore = parsedData.highestReactionScore || 0;
            gameState.perfectTriviaGames = parsedData.perfectTriviaGames || 0;
            gameState.clickedDuringBoost = parsedData.clickedDuringBoost || false;
            gameState.clicksWithoutBuying = parsedData.clicksWithoutBuying || 0;
            gameState.buildingClickBonus = parsedData.buildingClickBonus || 0;
            gameState.hasSeenTitleScreen = parsedData.hasSeenTitleScreen || false;
            gameState.heavenlyMemes = parsedData.heavenlyMemes || 0;
            gameState.ascensions = parsedData.ascensions || 0;
            gameState.lastAscensionTime = parsedData.lastAscensionTime || 0;
            gameState.vibrationEnabled = parsedData.vibrationEnabled !== undefined ? parsedData.vibrationEnabled : true;
            gameState.smoothMode = parsedData.smoothMode || false;
            gameState.notificationsEnabled = parsedData.notificationsEnabled !== undefined ? parsedData.notificationsEnabled : true;
            gameState.buildingMemesProduced = parsedData.buildingMemesProduced || {};
            
            // Update generators based on saved data
            if (parsedData.generators && Array.isArray(parsedData.generators)) {
                parsedData.generators.forEach(savedGenerator => {
                    const generator = generators.find(g => g.id === savedGenerator.id);
                    if (generator) {
                        generator.amount = savedGenerator.amount || 0;
                    }
                });
            }
            
            // Recalculate memes per second after loading
            recalculateMemesPerSecond();
            
            // Calculate offline progress
            if (parsedData.lastSaved && gameState.memesPerSecond > 0) {
                const offlineTime = Date.now() - parsedData.lastSaved;
                if (offlineTime > 10000) { // Only process if at least 10 seconds passed
                    const offlineSeconds = Math.min(offlineTime / 1000, 43200); // Cap at 12 hours
                    const heavenlyBonus = 1 + (gameState.heavenlyMemes * 0.1);
                    const offlineProduction = gameState.memesPerSecond * heavenlyBonus * offlineSeconds;
                    
                    if (offlineProduction > 0) {
                        gameState.memes += offlineProduction;
                        gameState.totalMemes += offlineProduction;
                        gameState.generatedMemes += offlineProduction;
                        
                        // Update building production tracking
                        generators.forEach(generator => {
                            if (generator.amount > 0) {
                                const buildingContribution = generator.output * heavenlyBonus * generator.amount * offlineSeconds;
                                if (!gameState.buildingMemesProduced[generator.id]) {
                                    gameState.buildingMemesProduced[generator.id] = 0;
                                }
                                gameState.buildingMemesProduced[generator.id] += buildingContribution;
                            }
                        });
                        
                        // Show offline progress popup after a short delay
                        setTimeout(() => {
                            showOfflineProgressPopup(offlineSeconds / 3600, offlineProduction);
                        }, 1500);
                    }
                }
            }
            
            console.log('Game loaded successfully!');
        } catch (error) {
            console.error('Error loading game:', error);
            // Initialize with default values if load fails
            initializeDefaultGameState();
        }
    } else {
        // No save data found, initialize with defaults
        initializeDefaultGameState();
    }
}

// Initialize default game state
function initializeDefaultGameState() {
    gameState = {
        memes: 0,
        memesPerClick: 1,
        memesPerSecond: 0,
        totalMemes: 0,
        clickedMemes: 0,
        generatedMemes: 0,
        achievements: {},
        gameStartTime: Date.now(),
        lastSaveTime: Date.now(),
        boostActive: false,
        boostEndTime: 0,
        boostMultiplier: 2,
        boostDuration: 30,
        boostCooldown: false,
        totalBuildings: 0,
        boostActivations: 0,
        minigamesPlayed: 0,
        minigamesTypes: new Set(),
        memoryGamesWon: 0,
        highestReactionScore: 0,
        perfectTriviaGames: 0,
        clickedDuringBoost: false,
        clicksWithoutBuying: 0,
        buildingClickBonus: 0,
        platform: 'browser',
        hasSeenTitleScreen: false,
        heavenlyMemes: 0,
        ascensions: 0,
        lastAscensionTime: 0,
        lastFrameTime: 0,
        fpsUpdateInterval: 1000,
        lastFpsUpdate: 0,
        frameCount: 0,
        fps: 60,
        targetFps: 30,
        frameInterval: 1000 / 30,
        lastMpsUpdate: 0,
        vibrationEnabled: true,
        smoothMode: false,
        notificationsEnabled: true,
        buildingMemesProduced: {}
    };
    
    // Initialize building memes produced
    generators.forEach(gen => {
        if (!gameState.buildingMemesProduced[gen.id]) {
            gameState.buildingMemesProduced[gen.id] = 0;
        }
    });
}

// Function to show offline progress popup
function showOfflineProgressPopup(hours, memes) {
    // Create and add the popup element if it doesn't exist
    let offlinePopup = document.getElementById('offline-progress-popup');
    if (!offlinePopup) {
        offlinePopup = document.createElement('div');
        offlinePopup.id = 'offline-progress-popup';
        offlinePopup.className = 'offline-progress-popup';
        
        document.body.appendChild(offlinePopup);
    }
    
    // Format the time away
    const timeAway = hours < 1 ? 
        `${Math.floor(hours * 60)} minutes` : 
        `${hours.toFixed(1)} hours`;
    
    // Update popup content
    offlinePopup.innerHTML = `
        <div class="offline-content">
            <h3>Welcome Back!</h3>
            <p>You were away for ${timeAway}</p>
            <div class="offline-memes">
                <span>You earned:</span>
                <span class="meme-amount">${formatNumber(memes)} memes</span>
            </div>
            <button class="offline-close">Awesome!</button>
        </div>
    `;
    
    // Show the popup with animation
    setTimeout(() => {
        offlinePopup.classList.add('show');
        vibrate(200); // Vibrate to indicate return
    }, 500);
    
    // Add event listener to close button
    const closeButton = offlinePopup.querySelector('.offline-close');
    closeButton.addEventListener('click', () => {
        offlinePopup.classList.remove('show');
        setTimeout(() => {
            offlinePopup.remove();
        }, 300);
    });
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);