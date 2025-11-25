# Easton Urban Kapital Website - Full Recreation

A complete recreation of the Easton Urban Kapital website using **React vanilla** with smooth scroll animations, interactive elements, and modern design.

## 🚀 Features

- ✅ **Smooth Scrolling** - Lenis implementation for buttery-smooth scroll
- ✅ **Animated Hero Section** - Dynamic houses with parallax effects
- ✅ **Sticky Navigation** - Smart navigation with dropdown menus
- ✅ **Interactive Components** - Hover effects, transitions, and animations
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Performance Optimized** - Fast load times and smooth animations
- ✅ **Intersection Observer** - Scroll-triggered animations for sections

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Lenis** - Smooth scroll library
- **Swiper.js** - Carousel/slider functionality
- **CSS3** - Custom animations and styling
- **Intersection Observer API** - Scroll detection

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd easton-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - The app will automatically open at `http://localhost:3000`

## 📁 Project Structure

```
easton-website/
├── index.html              # Entry HTML file
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main App component
│   ├── components/         # All React components
│   │   ├── Navigation.jsx  # Header & navigation
│   │   ├── Hero.jsx        # Hero section with animations
│   │   ├── About.jsx       # Company info & stats
│   │   ├── LaunchProjects.jsx
│   │   ├── Benefits.jsx
│   │   ├── Projects.jsx
│   │   ├── Quiz.jsx
│   │   ├── Characters.jsx
│   │   ├── News.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   └── AllComponents.jsx
│   ├── styles/             # CSS files
│   │   ├── globals.css     # Global styles & utilities
│   │   ├── navigation.css  # Navigation styles
│   │   ├── hero.css        # Hero section styles
│   │   └── about.css       # About section styles
│   └── utils/
│       └── smoothScroll.js # Smooth scroll utility
```

## 🎨 Key Components

### Navigation
- Fixed header with scroll effect
- Dropdown menu with multi-column layout
- Mobile responsive hamburger menu
- Smooth transitions

### Hero Section
- Animated background with gradient sky
- Three animated houses that cycle
- Parallax tree elements
- Fade-in hero text
- Architect logos showcase

### About Section
- Intersection Observer for scroll animations
- Company description
- Animated statistics cards
- Responsive grid layout

### Other Sections
- Launch Projects
- Benefits (Easton Home & Facilities)
- All Projects with tabs
- Quiz CTA
- Characters showcase
- News section
- Contact CTA with Instagram feed
- Footer

## 🎯 Animations Implemented

1. **Smooth Scroll** - Lenis for butter-smooth scrolling
2. **Fade In** - Elements fade in on scroll
3. **Slide In** - Left/Right slide animations
4. **Float Effect** - Houses and trees floating
5. **Parallax** - Multi-layer movement
6. **Hover Effects** - Scale, lift, and color transitions
7. **Stagger Animations** - Sequential element reveals

## 🎨 CSS Architecture

### Utility Classes
- Spacing: `margin-*`, `padding-*`
- Colors: `background-color-*`, `text-color-*`
- Typography: `text-size-*`, `text-weight-*`
- Layout: `container-*`, `padding-global`
- Visibility: `hide`, `hide-tablet`, `hide-mobile`

### CSS Variables
```css
--color-cream: #FBF7F0;
--color-yellow: #F5D87F;
--color-brown: #483B32;
--color-green: #2F4538;
--spacing-*: /* Dynamic spacing */
```

## 📱 Responsive Breakpoints

- **Desktop**: 992px and above
- **Tablet**: 768px - 991px
- **Mobile Landscape**: 480px - 767px
- **Mobile**: 479px and below

## 🚀 Build for Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Preview production build:**
   ```bash
   npm run preview
   ```

3. **Deploy:**
   - The `dist/` folder contains production files
   - Deploy to Vercel, Netlify, or any static host

## 🔧 Customization

### Changing Colors
Edit `src/styles/globals.css`:
```css
:root {
  --color-cream: #YOUR_COLOR;
  --color-yellow: #YOUR_COLOR;
  /* ... */
}
```

### Adding New Sections
1. Create component in `src/components/`
2. Import in `App.jsx`
3. Create corresponding CSS file
4. Import CSS in component

### Modifying Animations
- Smooth scroll: `src/utils/smoothScroll.js`
- CSS animations: `src/styles/globals.css`
- Component animations: Individual component files

## 🐛 Troubleshooting

### Lenis not working
- Check if CDN is loaded in `index.html`
- Verify initialization in `smoothScroll.js`

### Images not loading
- Replace placeholder URLs with actual images
- Check CORS settings for external images

### Styles not applying
- Clear browser cache
- Check CSS import order in components
- Verify class names match CSS

## 📚 External Dependencies

### CDN Links (in index.html)
- **Lenis**: `@studio-freight/lenis@1.0.36`
- **Swiper**: `swiper@8`
- **Google Fonts**: Inter & DM Sans

## 🎯 Performance Tips

1. **Lazy Load Images** - Use `loading="lazy"` attribute
2. **Optimize Images** - Compress before upload
3. **Code Splitting** - Already handled by Vite
4. **Minimize Reflows** - Use `transform` for animations
5. **Debounce Scroll** - Already implemented

## 📝 Future Enhancements

- [ ] Add project carousel with Swiper
- [ ] Implement full news section
- [ ] Add contact form functionality
- [ ] Instagram feed integration
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] SEO optimization
- [ ] Analytics integration

## 🤝 Contributing

This is a recreation project. For the official Easton website, visit:
[https://www.eastonurbankapital.com](https://www.eastonurbankapital.com)

## 📄 License

This is a recreation for educational/portfolio purposes.
Original design © Easton Urban Kapital

## 👨‍💻 Developer Notes

### Key Implementation Details:

1. **Smooth Scroll**: Using Lenis with requestAnimationFrame
2. **Intersection Observer**: For scroll-triggered animations
3. **CSS Grid**: For responsive layouts
4. **Flexbox**: For component internal layouts
5. **CSS Custom Properties**: For theming
6. **BEM-like naming**: For maintainable CSS

### Performance Considerations:

- Animations use `transform` and `opacity` (GPU accelerated)
- Intersection Observer with threshold for better performance
- Debounced scroll events
- Lazy loading for images
- CSS-only animations where possible

---

**Built with ❤️ by Iwan - Frontend Engineer**

For questions or improvements, feel free to reach out!
