# 🚀 Rakshith's Interactive Portfolio

A modern, interactive portfolio website inspired by macOS design principles. Built with React, TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

## ✨ Features

- **macOS-inspired UI**: Desktop environment with dock, windows, and file system
- **Interactive Components**: Drag-and-drop windows, animated transitions
- **3D Photo Gallery**: WebGL-powered circular photo gallery using OGL
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Smooth Animations**: Framer Motion for fluid user interactions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animations**: Framer Motion
- **3D Graphics**: OGL (WebGL library)
- **Build Tool**: Vite
- **UI Components**: Radix UI, Shadcn/ui
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rakshithgowda01/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Desktop/          # Desktop environment components
│   │   ├── ContactCard.tsx
│   │   ├── PhotoViewerWindow.tsx
│   │   ├── Project1Window.tsx
│   │   └── ...
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── pages/                # Page components
└── lib/                  # Utility functions
```

## 🎨 Components

### Desktop Environment
- **Desktop Grid**: Main desktop layout with icons
- **Mac Dock**: Bottom dock with app icons
- **Windows**: Draggable, resizable windows
- **Contact Card**: Interactive contact information

### Special Features
- **3D Photo Gallery**: Circular WebGL gallery
- **Project Showcases**: Interactive project windows
- **Series & Anime**: Expandable content cards
- **Spotify Player**: Music player integration

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

2. **Deploy**
   - Vercel will automatically build and deploy
   - Your site will be available at `https://your-project.vercel.app`

### Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Deploy**: Connect your GitHub repository to Netlify

### GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full macOS experience
- **Tablet**: Adapted layout with touch interactions
- **Mobile**: Simplified interface with mobile-friendly navigation

## 🎨 Customization

### Adding New Projects
1. Create a new component in `src/components/Desktop/`
2. Add the project to `src/pages/Desktop.tsx`
3. Update the desktop icons array

### Styling
- Uses Tailwind CSS for styling
- Custom CSS in `src/index.css`
- Component-specific styles in individual files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Rakshith R**
- Email: myselfzorojuro@gmail.com
- GitHub: [@rakshithgowda01](https://github.com/rakshithgowda01)

---

⭐ **Star this repository if you found it helpful!**