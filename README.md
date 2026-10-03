# ZeeTeach - Interactive Presentation Platform

## 📚 About ZeeTeach

ZeeTeach is an interactive web-based presentation platform designed for educational content delivery. This instance focuses on **Indian Economic Development** for Class XI Economics curriculum.

### 🎯 Features

- **Interactive Slideshow**: Navigate through 19 comprehensive slides using keyboard, mouse, or touch controls
- **Eye-Comfortable Design**: Soft green and blue color scheme designed to reduce eye strain
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Embedded Visuals**: SVG illustrations for agriculture, industry, services, rural, and urban development
- **Accessibility**: Full keyboard navigation, skip links, and semantic HTML
- **Touch Support**: Swipe gestures on mobile devices
- **Fullscreen Mode**: Press 'F' to toggle fullscreen presentation mode

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the zeeteach directory:
```bash
cd zeeteach
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and go to:
```
http://localhost:3000
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` Arrow Right | Next Slide |
| `←` Arrow Left | Previous Slide |
| `Space` | Next Slide |
| `Home` | First Slide |
| `End` | Last Slide |
| `F` | Toggle Fullscreen |

## 🖱️ Mouse Controls

- **Left/Right Buttons**: Navigate between slides
- **Indicator Dots**: Click to jump to a specific slide
- **Mobile Swipe**: Swipe left/right to navigate

## 🎨 Color Scheme

The website uses an eye-comfortable color palette:

- **Primary Green**: #2D5016 (Deep Forest Green)
- **Secondary Blue**: #4A7C9E (Calm Blue)
- **Accent Gold**: #D4A574 (Warm Gold)
- **Background**: #F5F7F0 (Off-white)
- **Text**: #2C3E50 (Dark Charcoal)

## 📊 Presentation Content

### 19 Slides Covering:

1. **Title Slide** - Course introduction
2. **Course Overview** - Key topics
3. **Unit 1** - Introduction to Economic Development
4. **Unit 2** - Historical Economic Context
5. **Unit 3** - Economic Reforms (1991 Onwards)
6. **Unit 4** - Major Economic Sectors Overview
7. **Agriculture Sector** - With visual diagram
8. **Industrial Sector** - With visual diagram
9. **Services Sector** - With visual diagram
10. **Development Challenges** - Key issues
11. **Government Programs** - Major initiatives
12. **Rural Development** - With visual diagram
13. **Urban Development** - With visual diagram
14. **Sustainable Development** - Environmental focus
15. **International Economic Relations** - Trade and FDI
16. **Learning Outcomes** - Course goals
17. **Assessment Methods** - Evaluation approaches
18. **Learning Resources** - References and materials
19. **Thank You Slide** - Conclusion

## 📁 File Structure

```
zeeteach/
├── index.html          # Main HTML file
├── styles.css          # Eye-comfortable styling
├── app.js              # Slideshow functionality
├── slides-data.js      # Presentation content
├── server.js           # Express server
├── package.json        # Project dependencies
└── README.md           # This file
```

## 🌐 Deployment Options

### Local Development
```bash
npm start
```

### Production Deployment

#### Using Vercel
1. Push to GitHub
2. Connect to Vercel
3. Deploy with one click

#### Using Netlify
1. Build: `npm start` (or static files)
2. Deploy folder: `.` (root directory)

#### Using Heroku
```bash
heroku create your-app-name
git push heroku main
```

#### Using GitHub Pages
Convert to static site and push to gh-pages branch

## 📱 Responsive Design

- **Desktop** (1200px+): Full layout with all features
- **Tablet** (768px - 1199px): Optimized touch controls
- **Mobile** (< 768px): Simplified layout, swipe navigation

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast color ratios
- Skip to content link
- Touch-friendly controls on mobile

## 🔧 Customization

### Changing Content
Edit `slides-data.js` to modify presentation content

### Changing Colors
Update CSS variables in `styles.css`:
```css
--primary-green: #2D5016;
--secondary-blue: #4A7C9E;
--accent-gold: #D4A574;
```

### Adding Images
Replace SVG data URIs in `slides-data.js` with image URLs

## 🐛 Troubleshooting

### Server won't start
- Check if port 3000 is available
- Try: `npm start -- --port 3001`

### Styles not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Restart the server

### Slides not appearing
- Ensure `slides-data.js` is loaded
- Check browser console for errors (F12)

## 📝 License

MIT License - Feel free to use and modify

## 🤝 Contributing

To contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.

## 🎓 Educational Use

This platform is designed for educational purposes. Teachers and students can:
- Use it for classroom presentations
- Share slides with students
- Create similar presentations for other subjects
- Customize content for specific curricula

---

**Made with ❤️ for Education | ZeeTeach © 2024**
