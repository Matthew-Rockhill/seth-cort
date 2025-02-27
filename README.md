# Seth Cort - Folk Singer-Songwriter Website

This is a modern, responsive website for folk singer-songwriter Seth Cort built with Nuxt 3 and Vue.js.

## Features

- Responsive design with mobile-first approach
- Smooth animations and transitions
- Dynamic components for album discovery, videos, and more
- Contact form with validation
- Custom-designed UI elements

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/seth-cort-music.git
cd seth-cort-music
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

- `/assets` - Contains static assets like images, fonts, and CSS
- `/components` - Reusable Vue components
- `/pages` - Top-level pages and routes
- `/plugins` - Nuxt plugins
- `/public` - Public files that don't need processing

## Key Components

### Header
The header includes a custom animated hamburger menu that works on all screen sizes.

### Hero Section
The hero section displays the artist's name with a portrait image overlay technique, where the image appears above "SETH" but behind "CORT".

### Album Discovery
Interactive component to showcase albums with playable tracks and streaming links.

### Video Player
Custom video player for showcasing performances.

### Contact Form
Form with validation for booking inquiries.

## Icon Libraries

The project uses two icon libraries:

- **Heroicons** - For general UI icons
- **Lucide** - For social media and specialty icons

## Image Requirements

For the hero section to work properly:
- Place your portrait image in `/public/images/portrait.png`
- The image should have a transparent background for the overlay effect

For the logo:
- Place your logo in `/public/images/logo.png`

## Building for Production

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.