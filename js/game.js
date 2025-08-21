class CrabtastropheGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.instructionsElement = document.getElementById('instructions');
        
        // Game state
        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.gameSpeed = 2;
        
        // Crab (player)
        this.crab = {
            x: 100,
            y: 300,
            width: 40,
            height: 30,
            jumping: false,
            jumpVelocity: 0,
            jumpPower: 15,
            gravity: 0.7,
            groundY: 300
        };
        
        // Obstacles
        this.obstacles = [];
        this.obstacleSpawnTimer = 0;
        this.obstacleSpawnRate = 120; // frames between spawns
        
        // Background elements
        this.clouds = [];
        this.waves = [];
        this.seagulls = [];
        
        this.initBackground();
        this.setupEventListeners();
        this.gameLoop();
    }
    
    initBackground() {
        // Initialize clouds
        for (let i = 0; i < 3; i++) {
            this.clouds.push({
                x: Math.random() * this.canvas.width,
                y: 20 + Math.random() * 60,
                size: 20 + Math.random() * 30,
                speed: 0.5 + Math.random() * 0.5
            });
        }
        
        // Initialize waves
        for (let i = 0; i < 5; i++) {
            this.waves.push({
                x: i * 200,
                amplitude: 5 + Math.random() * 10,
                frequency: 0.02 + Math.random() * 0.01,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleJump();
            }
        });
        
        this.canvas.addEventListener('click', () => {
            this.handleJump();
        });
    }
    
    handleJump() {
        if (!this.gameRunning && !this.gameOver) {
            this.startGame();
        } else if (this.gameRunning && !this.crab.jumping) {
            this.crab.jumping = true;
            this.crab.jumpVelocity = -this.crab.jumpPower;
        } else if (this.gameOver) {
            this.resetGame();
        }
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameOver = false;
        this.instructionsElement.innerHTML = '<div>Use SPACE to jump over obstacles</div>';
    }
    
    resetGame() {
        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.gameSpeed = 3;
        this.obstacles = [];
        this.obstacleSpawnTimer = 0;
        this.crab.y = this.crab.groundY;
        this.crab.jumping = false;
        this.crab.jumpVelocity = 0;
        this.instructionsElement.innerHTML = '<div class="start-message">Press SPACE or click to start!</div><div>Use SPACE to jump over obstacles</div>';
    }
    
    update() {
        if (!this.gameRunning || this.gameOver) return;
        
        // Update score
        this.score += 1;
        if (this.score % 500 === 0) {
            this.gameSpeed += 0.5; // Increase difficulty
        }
        
        // Update crab physics
        if (this.crab.jumping) {
            this.crab.jumpVelocity += this.crab.gravity;
            this.crab.y += this.crab.jumpVelocity;
            
            if (this.crab.y >= this.crab.groundY) {
                this.crab.y = this.crab.groundY;
                this.crab.jumping = false;
                this.crab.jumpVelocity = 0;
            }
        }
        
        // Spawn obstacles
        this.obstacleSpawnTimer++;
        if (this.obstacleSpawnTimer >= this.obstacleSpawnRate) {
            this.spawnObstacle();
            this.obstacleSpawnTimer = 0;
            this.obstacleSpawnRate = 80 + Math.random() * 80; // Random spawn rate
        }
        
        // Update obstacles
        this.obstacles.forEach((obstacle, index) => {
            obstacle.x -= this.gameSpeed;
            
            // Remove obstacles that are off-screen
            if (obstacle.x + obstacle.width < 0) {
                this.obstacles.splice(index, 1);
            }
            
            // Check collision
            if (this.checkCollision(this.crab, obstacle)) {
                this.gameOver = true;
                this.instructionsElement.innerHTML = '<div class="game-over">Game Over!</div><div class="start-message">Press SPACE or click to restart</div>';
            }
        });
        
        // Update background elements
        this.updateBackground();
    }
    
    updateBackground() {
        // Update clouds
        this.clouds.forEach(cloud => {
            cloud.x -= cloud.speed;
            if (cloud.x + cloud.size < 0) {
                cloud.x = this.canvas.width + cloud.size;
            }
        });
        
        // Update waves
        this.waves.forEach(wave => {
            wave.x -= 1;
            if (wave.x < -200) {
                wave.x = this.canvas.width;
            }
            wave.phase += 0.1;
        });
    }
    
    spawnObstacle() {
        const obstacles = ['seaweed', 'shell', 'rock'];
        const type = obstacles[Math.floor(Math.random() * obstacles.length)];
        
        let obstacle = {
            x: this.canvas.width,
            type: type,
            width: 30,
            height: 40
        };
        
        switch (type) {
            case 'seaweed':
                obstacle.y = 290;
                obstacle.width = 20;
                obstacle.height = 40;
                break;
            case 'shell':
                obstacle.y = 310;
                obstacle.width = 30;
                obstacle.height = 20;
                break;
            case 'rock':
                obstacle.y = 280;
                obstacle.width = 40;
                obstacle.height = 50;
                break;
        }
        
        this.obstacles.push(obstacle);
    }
    
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB'); // Sky blue
        gradient.addColorStop(0.7, '#F0E68C'); // Sandy yellow
        gradient.addColorStop(1, '#F4A460'); // Sandy brown
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background elements
        this.drawBackground();
        
        // Draw ground line
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 330);
        this.ctx.lineTo(this.canvas.width, 330);
        this.ctx.stroke();
        
        // Draw crab
        this.drawCrab();
        
        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.drawObstacle(obstacle);
        });
        
        // Update score display
        this.scoreElement.textContent = `Score: ${this.score}`;
    }
    
    drawBackground() {
        // Draw clouds
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.clouds.forEach(cloud => {
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.size * 0.5, cloud.y, cloud.size * 0.7, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.size, cloud.y, cloud.size * 0.8, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw waves at the bottom
        this.ctx.strokeStyle = 'rgba(30, 144, 255, 0.6)';
        this.ctx.lineWidth = 2;
        this.waves.forEach(wave => {
            this.ctx.beginPath();
            for (let x = wave.x; x < wave.x + 200; x += 5) {
                const y = 350 + Math.sin((x - wave.x) * wave.frequency + wave.phase) * wave.amplitude;
                if (x === wave.x) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        });
    }
    
    drawCrab() {
        const crab = this.crab;
        
        // Crab body (orange-red)
        this.ctx.fillStyle = '#FF6347';
        this.ctx.fillRect(crab.x, crab.y, crab.width, crab.height);
        
        // Crab shell pattern
        this.ctx.fillStyle = '#FF4500';
        this.ctx.fillRect(crab.x + 5, crab.y + 5, crab.width - 10, crab.height - 15);
        
        // Crab eyes
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(crab.x + 8, crab.y - 3, 4, 6);
        this.ctx.fillRect(crab.x + 28, crab.y - 3, 4, 6);
        
        // Crab claws
        this.ctx.fillStyle = '#FF6347';
        this.ctx.fillRect(crab.x - 8, crab.y + 10, 12, 8);
        this.ctx.fillRect(crab.x + crab.width - 4, crab.y + 10, 12, 8);
        
        // Crab legs
        this.ctx.strokeStyle = '#FF4500';
        this.ctx.lineWidth = 3;
        for (let i = 0; i < 3; i++) {
            const legX = crab.x + 10 + i * 8;
            this.ctx.beginPath();
            this.ctx.moveTo(legX, crab.y + crab.height);
            this.ctx.lineTo(legX + 5, crab.y + crab.height + 8);
            this.ctx.stroke();
        }
    }
    
    drawObstacle(obstacle) {
        switch (obstacle.type) {
            case 'seaweed':
                // Draw seaweed
                this.ctx.fillStyle = '#228B22';
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                this.ctx.fillStyle = '#32CD32';
                for (let i = 0; i < 3; i++) {
                    this.ctx.fillRect(obstacle.x + i * 6, obstacle.y + i * 10, 8, obstacle.height - i * 10);
                }
                break;
                
            case 'shell':
                // Draw shell
                this.ctx.fillStyle = '#F0E68C';
                this.ctx.beginPath();
                this.ctx.arc(obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2, obstacle.width/2, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Shell ridges
                this.ctx.strokeStyle = '#DAA520';
                this.ctx.lineWidth = 2;
                for (let i = 0; i < 5; i++) {
                    this.ctx.beginPath();
                    this.ctx.arc(obstacle.x + obstacle.width/2, obstacle.y + obstacle.height/2, (i + 1) * 3, 0, Math.PI * 2);
                    this.ctx.stroke();
                }
                break;
                
            case 'rock':
                // Draw rock
                this.ctx.fillStyle = '#696969';
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                
                // Rock texture
                this.ctx.fillStyle = '#778899';
                this.ctx.fillRect(obstacle.x + 5, obstacle.y + 5, obstacle.width - 10, obstacle.height - 20);
                this.ctx.fillRect(obstacle.x + 10, obstacle.y + 20, obstacle.width - 20, obstacle.height - 30);
                break;
        }
    }
    
    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new CrabtastropheGame();
});
