# Pokédex Next

## Table of Contents
- [About](#about)
- [Usage](#usage)


## About

A Pokédex style web app that presents a list containing all of the Pokémon from Generations I trough IV (Kanto, Johto, Hoenn and Sinnoh). Users can select each Pokémon to obtain more info about their base stats, types, abilities and evolutions.

### Screenshots

#### Desktop web UI

<div style="display: flex; gap: 1rem;">
  <img src="./resources/screenshots/pokedex-list-view.png" alt="Pokédex list view" height=250 />
  <img src="./resources/screenshots/pokemon-info-view.png" alt="Pokémon info card view" height=250 />
</div>

#### Mobile web UI

<div style="display: flex; gap: 1rem;">
  <img src="./resources/screenshots/mobile-pokedex-list-view.png" alt="Pokédex list view on mobile" height=400 />
  <img src="./resources/screenshots/mobile-pokemon-info-view.png" alt="Pokémon info card view on mobile" height=400 />
</div>

## Usage

Install dependencies
```bash
cd ./pokedex-next && npm install
```

### Production mode

Build the app
```bash
npm run build
```

Start the app
```bash
npm run start
```

### Development mode

Start the Next dev server (supports hot-reloading)
```bash
npm run dev
```
