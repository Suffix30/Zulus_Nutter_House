# ZULU's Nutter House 🎲

An interactive party game built with React and TypeScript that combines Truth, Dare, Would You Rather, and Mystery challenges with a sleek cyberpunk aesthetic.

## Features

- 🎮 Interactive spinning wheel with smooth animations
- 🎵 Dynamic sound effects and audio feedback
- 🔄 Dual game modes (PG and R-rated content)
- 🎯 Multiple challenge types:
  - Truth questions
  - Dare challenges
  - Would You Rather choices
  - Mystery challenges
  - Drinking games
- ⚡ Chain reaction system
- 👥 Support for multiple players
- 🌟 Modern neon-cyberpunk UI design
- 🔊 Immersive sound effects
- 🎨 Responsive and animated interface

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Game Rules

### Basic Rules
- Minimum 2 players required to start
- Players take turns spinning the wheel
- When selected, players choose between:
  - Truth
  - Dare
  - Would You Rather
  - Drink
  - Mystery challenges

### Special Features
- **Chain Reactions**: Players can pass challenges to others
- **Mystery Slot**:    Special surprise challenges
- **Game Modes**:      Switch between PG and R-rated content
- **Pass System**:     Option to pass challenges with consequences

## Tech Stack

- **Frontend Framework**: React 18
- **Language**:           TypeScript
- **Build Tool**:         Vite
- **State Management**:   Zustand
- **Animations**:         Framer Motion
- **Audio**:              Howler.js
- **UI Components**:      Hero Icons
- **Styling**:            CSS Modules

## Project Structure

```
Zulus_Nutter_House/
│   ├── .eslintrc.cjs
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   │   ├── sounds/
│   │   │   ├── dare.mp3
│   │   │   ├── drink.mp3
│   │   │   ├── pg_mode.mp3
│   │   │   ├── r_mode.mp3
│   │   │   ├── spin.mp3
│   │   │   ├── truth.mp3
│   │   │   ├── win.mp3
│   │   │   ├── would_you_rather.mp3
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   ├── components/
│   │   │   ├── ChainReactionIndicator/
│   │   │   │   ├── ChainReactionIndicator.css
│   │   │   │   ├── ChainReactionIndicator.tsx
│   │   │   ├── GameContainer/
│   │   │   │   ├── GameContainer.css
│   │   │   │   ├── GameContainer.tsx
│   │   │   ├── GameModeToggle/
│   │   │   │   ├── GameModeToggle.css
│   │   │   │   ├── GameModeToggle.tsx
│   │   │   ├── PlayerInput/
│   │   │   │   ├── PlayerInput.css
│   │   │   │   ├── PlayerInput.tsx
│   │   │   ├── PlayerList/
│   │   │   │   ├── PlayerList.css
│   │   │   │   ├── PlayerList.tsx
│   │   │   ├── ResultContainer/
│   │   │   │   ├── ChoiceButtons.tsx
│   │   │   │   ├── PassButtons.tsx
│   │   │   │   ├── PassToPlayerButtons.tsx
│   │   │   │   ├── ResultContainer.css
│   │   │   │   ├── ResultContainer.tsx
│   │   │   │   ├── WouldYouRather.tsx
│   │   │   ├── Rules/
│   │   │   │   ├── Rules.css
│   │   │   │   ├── Rules.tsx
│   │   │   ├── SpinButton/
│   │   │   │   ├── SpinButton.css
│   │   │   │   ├── SpinButton.tsx
│   │   │   ├── ToggleButton/
│   │   │   │   ├── ToggleButton.css
│   │   │   │   ├── ToggleButton.tsx
│   │   │   ├── Wheel/
│   │   │   │   ├── Wheel.css
│   │   │   │   ├── Wheel.tsx
│   │   ├── data/
│   │   │   ├── gameQuestions.ts
│   │   │   ├── questions/
│   │   │   │   ├── dareQuestions.ts
│   │   │   │   ├── doubleDareQuestions.ts
│   │   │   │   ├── drinkQuestions.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── mysteryQuestions.ts
│   │   │   │   ├── truthQuestions.ts
│   │   │   │   ├── wouldYouRatherQuestions.ts
│   │   ├── hooks/
│   │   │   ├── useWheel.ts
│   │   ├── services/
│   │   │   ├── audioService.ts
│   │   ├── store/
│   │   │   ├── gameStore.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   ├── utils/
│   │   │   ├── audio.ts
│   │   │   ├── constants.ts
│   │   │   ├── wheelAnimation.ts
```

## Development

### Available Scripts

- `npm run dev`     - Start development server
- `npm run build`   - Build for production
- `npm run lint`    - Run ESLint <-- you will love this little shit
- `npm run preview` - Preview production build

### Code Style

The project uses ESLint and TypeScript for code quality and consistency. Configuration can be found in:
- `.eslintrc.cjs`
- `tsconfig.json`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/feature-branch`)
3. Commit your changes (`git commit -m 'Add the new feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Sound effects powered by Howler.js
- Icons provided by Hero Icons
- Animations powered by Framer Motion