# 🦀 Crabtastrophe - Beach Runner Game

A Chrome Dino runner clone featuring a crab running on the beach! Avoid seaweed, shells, and rocks while collecting points in this endless beach adventure.

## 🏖️ Game Features

- **Beach Theme**: Beautiful gradient backgrounds with clouds and waves
- **Crab Runner**: Animated crab character with claws and legs
- **Beach Obstacles**: Seaweed, shells, and rocks to jump over
- **Progressive Difficulty**: Game speed increases as you score higher
- **Responsive Controls**: Use SPACE key or click to jump
- **Score System**: Track your high score as you survive longer

## 🎮 How to Play

1. Press **SPACE** or **click** to start the game
2. Use **SPACE** or **click** to make the crab jump
3. Avoid obstacles (seaweed, shells, rocks) by jumping over them
4. Survive as long as possible to get a high score
5. When you hit an obstacle, press **SPACE** or **click** to restart

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Local Development

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Development with Auto-Reload

For development with automatic server restart:
```bash
npm run dev
```

## 🐳 Docker Deployment

### Build and Run with Docker

1. Build the Docker image:
   ```bash
   docker build -t crabtastrophe .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 crabtastrophe
   ```

3. Access the game at `http://localhost:3000`

### Docker Compose (Optional)

Create a `docker-compose.yml` file:
```yaml
version: '3.8'
services:
  crabtastrophe:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

## 📁 Project Structure

```
crabtastrophe/
├── index.html          # Main game HTML file
├── js/
│   └── game.js         # Game logic and rendering
├── server.js           # Express web server
├── package.json        # Node.js dependencies and scripts
├── Dockerfile          # Docker container configuration
├── .dockerignore       # Docker ignore file
├── .gitignore          # Git ignore file
└── README.md           # This file
```

## 🎨 Game Components

### Crab Character
- Orange-red body with shell pattern
- Black eyes on stalks
- Animated claws and legs
- Jumping physics with gravity

### Beach Obstacles
- **Seaweed**: Green kelp growing from the sand
- **Shells**: Circular shells with ridge patterns
- **Rocks**: Gray rocky obstacles of varying sizes

### Beach Environment
- Sky-to-sand gradient background
- Floating clouds that move across the sky
- Animated waves at the bottom
- Sandy ground with clear horizon line

## 🔧 Customization

### Modifying Game Speed
Edit the `gameSpeed` and difficulty progression in `js/game.js`:
```javascript
this.gameSpeed = 3; // Starting speed
// Speed increases every 500 points
if (this.score % 500 === 0) {
    this.gameSpeed += 0.5;
}
```

### Adding New Obstacles
Add new obstacle types in the `spawnObstacle()` method:
```javascript
const obstacles = ['seaweed', 'shell', 'rock', 'newObstacle'];
```

### Changing Colors
Modify the CSS variables in `index.html` or the drawing colors in `game.js`.

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

## 📦 Dependencies

- **express**: Web server framework
- **nodemon**: Development auto-reload (dev dependency)

## 🐛 Troubleshooting

### Game Not Loading
- Check that the server is running on port 3000
- Ensure all files are in the correct directory structure
- Check browser console for JavaScript errors

### Docker Issues
- Make sure Docker is installed and running
- Check that port 3000 is not already in use
- Verify Dockerfile syntax if build fails

## 🤝 Contributing

Feel free to contribute to Crabtastrophe! Some ideas for improvements:
- Add sound effects and music
- Implement power-ups (speed boost, invincibility)
- Add different crab characters to choose from
- Create multiple beach environments
- Add particle effects for sand and water
- Implement local high score storage

## 📜 License

This project is licensed under the MIT License - see the package.json file for details.

## 🏆 Credits

Inspired by the classic Chrome Dinosaur game, reimagined with a fun beach theme featuring our heroic crab runner!

---

Enjoy playing Crabtastrophe! 🦀🏖️
