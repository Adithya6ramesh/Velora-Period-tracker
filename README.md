# Velora - Period Tracker

A beautiful and simple period tracking application built with React and TailwindCSS.

## Features

✨ **Simple & Beautiful Interface**
- Clean, modern design with a soothing pink gradient background
- Handwritten-style typography for a personal touch
- Decorative butterfly elements

📅 **Calendar View**
- Monthly calendar display
- Period days highlighted in bold pink
- Predicted next 7 days highlighted in light pink
- Easy navigation between months

➕ **One-Tap Logging**
- Simple "Log Your Period" button
- Automatic date logging with today's date
- Toast notifications for feedback

🔮 **Smart Predictions**
- Calculates average cycle length from your data
- Predicts next period start date
- Highlights predicted period days
- Cycle regularity tracking

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## How It Works

### Period Prediction Logic

The app uses a simple but effective prediction algorithm:

1. **Log Period Start Dates**: Every time you click "Log My Period," the current date is saved
2. **Calculate Cycle Lengths**: Computes the difference between consecutive period dates
3. **Get Average Cycle Length**: Calculates the mean of all cycle lengths
4. **Predict Next Period**: Adds the average cycle length to the most recent period date
5. **Highlight 7 Days**: Shows the predicted period as a 7-day span

### Features

- **Early/Late Detection**: Shows if your current cycle is early or late compared to your average
- **Regularity Tracking**: Indicates whether your cycles are regular or irregular
- **Data Persistence**: (Ready for localStorage or backend integration)

## Technology Stack

- **React 18**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework
- **React Toastify**: Toast notifications
- **Dancing Script Font**: Handwritten-style typography

## Project Structure

```
src/
├── components/
│   └── Calendar.js          # Main calendar component
├── utils/
│   └── periodTracker.js     # Period prediction logic
├── App.js                   # Main app component
├── index.js                 # React entry point
└── index.css                # Global styles with Tailwind
```

## Customization

### Colors
Modify the color theme in `tailwind.config.js`:

```javascript
colors: {
  'velora-pink': '#e879f9',
  'velora-light-pink': '#f3e8ff',
  'period-highlight': '#fb7185',
  'period-light': '#fce7f3'
}
```

### Fonts
The app uses Dancing Script for the handwritten feel. You can change this in the Tailwind config.

## Contributing

Feel free to contribute to make Velora even better! 

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Your cycle, your rhythm, your peace.* 💕 