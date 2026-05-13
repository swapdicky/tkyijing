# TK Yijing Website

A modern Next.js website exploring the intersection of ancient Yijing wisdom and contemporary art.

## Features

- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **GSAP** animations on homepage
- **TypeScript** for type safety
- **Responsive Design** with modern UI

## Pages

1. **Homepage** - Hero section with GSAP animations and featured works
2. **Exhibition** - Gallery of curated artworks
3. **Yijing** - Educational content about the I Ching philosophy
4. **About** - Project information and mission
5. **Creative Team** - Team member profiles

## Getting Started

### Prerequisites

Make sure you have Node.js installed (version 18 or higher recommended).

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage with GSAP animations
│   ├── exhibition/page.tsx   # Exhibition gallery
│   ├── yijing/page.tsx       # Yijing information
│   ├── about/page.tsx        # About page
│   ├── creative-team/page.tsx # Team page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── Navigation.tsx        # Navigation component
└── public/                   # Static assets
```

## Technologies

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Language**: TypeScript
- **Package Manager**: npm

## License

Private project for TK Yijing exhibition.
