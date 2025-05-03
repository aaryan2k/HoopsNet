# 🏀 HoopsNet 🏀

**HoopsNet** is a comprehensive NBA statistics and prediction platform that provides real-time NBA standings, player statistics, and an AI-powered championship prediction.

---

## Features

### 🏆 NBA Standings

- View complete league standings
- League-wide standings
- Conference-specific standings (Eastern and Western)
- Team records, win percentages, and home/away records

### 📊 Player Statistics

- Interactive visualization of top NBA player stats
- Stats include points, rebounds, assists, steals, blocks, and more
- Customizable stat selection
- Visual representation using interactive charts

### 🤖 AI Prediction

- AI-powered predictions on each NBA team's chance of winning the championship
- Model trained on historical NBA data including team performance, player metrics, and playoff outcomes
- Predicts probabilities and displays a ranked list of contenders
- Continuously updated as new data becomes available throughout the season

---

## 👥 Team Contributions

- **Dhruv Anurag** ([https://github.com/dhruvanurag1](https://github.com/dhruvanurag1)): Built and trained one of the AI prediction models using historical NBA data. Focused on model training, testing, and evaluation.
- **Aaryan Singh** ([https://github.com/aaryan2k](https://github.com/aaryan2k)): Led core development of the website. Built the Standings and Stats pages and connected frontend components to backend APIs.
- **Keshav Subramonian** ([https://github.com/KeshavS05](https://github.com/KeshavS05)): Developed the Home page and significantly enhanced the visual design and user experience across the entire site. Contributed to both frontend and backend.
- **Kartik Vasudeva** ([https://github.com/kvasudeva24](https://github.com/kvasudeva24)): Created an additional AI prediction model and designed the AI Prediction page UI. Trained and tested with CSV datasets from past NBA seasons.

---

## 🛠 Tech Stack

### Frontend

- **React** with **TypeScript**
- **Vite** for fast development and building
- **React Router** for navigation
- **Bootstrap** and **Chakra** for responsive UI
- **Recharts** for data visualization
- **Axios** for API requests

### Backend

- **FastAPI** for high-performance API
- **NBA API** for official NBA data
- **Pandas** for data processing
- **Uvicorn** ASGI server

### Prediction Model

- **TensorFlow** for machine learning model construction and training
- **Keras** for high-level neural network API

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Python 3.10+
- npm or yarn

---

## ⚙️ Setup

### Backend Setup

Navigate to the backend directory:

`cd backend`

Create and activate a virtual environment:

`python -m venv .venv`

On MacOS: `source .venv/bin/activate`

On Windows: `.venv\Scripts\activate`

Install dependencies:

`pip install -r requirements.txt`

Run the server:

`python runserver.py`

The API will be available at:
[http://localhost:8000](http://localhost:8000)

### Frontend Setup

Navigate to the frontend directory:

`cd frontend`

Install dependencies:

`npm install`

Start the development server:

`npm run dev`

The application will be available at:
[http://localhost:5173](http://localhost:5173)

## 🖥️ Usage

Home page: Overview of the application with quick navigation

Standings: View current NBA standings (League, East, West)

Stats: Explore player statistics with interactive visualizations

AI Prediction: Get our AI prediction for this years champion

## 🙏 Reference

NBA API: [https://github.com/swar/nba_api](https://github.com/swar/nba_api)

## Slides 

Slideshow : https://docs.google.com/presentation/d/1GmrlkiGjLExndhj34bWukSY3hZsJHOv1ZrRao54e1LY/edit?usp=sharing
