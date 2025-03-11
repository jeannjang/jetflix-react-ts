# Jetflix🎬

[Visit Jetflix web service on this link](https://jetflix-react-ts.pages.dev)  
This Jetflix web service allows users to browse trending movies and TV series while providing the ability to save favorites or future watchlist items.  
The app is inspired by Netflix, and offers a responsive interface.

## Quick Overview
![jetflix_recording](https://github.com/user-attachments/assets/fd3306aa-678a-4f51-9046-915ec913d853)


## Features

- **Movie & TV Show Listings**: Browse the latest and popular movies and TV series fetched from an external API.
- **Conent filtering**: Filtering by category
- **Content details modal**: View descriptions, ratings, and release dates
- **Search Functionality**: Find content by title
- **My List feature**: Save favorite movies and shows for later viewing  
  (device-specific, not shared across devices)

## Tech Stack

### Frontend

- **React18(with TypeScript), React Router DOM v6, React Hook Form, React Query** (createBrowserRouter, From validation and handling, data fetching, caching)
- **Recoil, Recoil Persist**  
  (UI state management with atoms, Local storage persistence for user preferences)
- **Styling** (Styled Components, Global Styles, Theme Support)
- **Animations(motion)** (animation library for smooth transitions)

### API

- **TMDB**: For fetching movie and TV series data

## How to start

### Requirement

- Node.js
- npm or yarn
- an external content API

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create .env file with:

   ```
   REACT_APP_TMDB_BEARER_TOKEN=your_bearer_token_here
   ```

   You can obtain your Bearer Token by creating an account on TMDB, going to your account settings, and generating an API Read Access Token.

4. Start the dev server:
   ```
   npm start
   ```

- The app runs on http://localhost:3000

## Deployment

This project is set up for automatic deployment via Cloudflare Pages. Each commit to the main branch triggers a new build and deployment, and the updated site is sent to Cloudflare's global network.
