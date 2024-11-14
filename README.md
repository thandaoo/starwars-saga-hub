# Star Wars Saga Hub

A responsive, React-based web application that lists Star Wars movies, provides detailed information, and allows sorting, filtering, and rating previews.

## Table of Contents

- [Star Wars Saga Hub](#star-wars-saga-hub)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Basic Criteria](#basic-criteria)
    - [Additional Features](#additional-features)
  - [Tech Stack](#tech-stack)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Project Structure](#project-structure)

## Features

### Basic Criteria

1. **Movie List Display**: Loads a list of Star Wars movies upon app startup.
2. **Detailed View**: Selecting a movie displays details on the right side of the screen.
3. **Default Text**: If no movie is selected, a default message is shown in the detail view.
4. **Sorting Options**: Movies can be sorted by:
   - Episode
   - Year
   - Title
5. **Search Filter**: Allows filtering movies by title using a search input.

### Additional Features

1. **Rating Previews**: In the detailed view, displays ratings from IMDb, Rotten Tomatoes, and Metacritic.
2. **Poster Image**: Shows a preview of the movie poster for a more visually engaging experience.
3. **Average Rating**: Calculates and displays the average rating based on the ratings from IMDb, Rotten Tomatoes, and Metacritic.

## Tech Stack

- **React**
- **TypeScript**
- **TailwindCSS**
- **PostCSS**

## Setup Instructions

### Prerequisites

- Node.js (v22.4.1)
- npm or yarn
- API key for movie details is required. see (.env.example) for sample. 

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thandaoo/starwars-saga-hub.git
   ```

2. **Navigate to Project directory**:

   ```bash
   cd starwars-saga-hub/starwars-saga-hub
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```
  
4. **Start the application**:

   ```bash
   npm start
   ```

5. **Build for production**:

   ```bash
   npm run build
   ```

## Project Structure

- **`/src`**: Contains the core application code.
  - **`components`**: Reusable React components.
    - **`layout`**: Common Layout components.
    - **`movies`**: Movie-specific components.
  - **`pages`**: Top-level or Page components responsible for rendering main sections.
  - **`utils`**: Utility functions.
  - **`index.tsx`**: Main entry component.
