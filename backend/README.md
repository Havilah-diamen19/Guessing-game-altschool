# 🎮 Guessing Game (Game Master Driven)

## 📌 Overview

This project is an interactive **Guessing Game** where a **Game Master creates questions**, and players attempt to guess the correct answers within a limited number of attempts.

Unlike traditional guessing games that rely on random number generation, this system introduces a **controlled game flow**, where questions are dynamically provided and managed.

---

## 🚀 Features Implemented

* 🧠 Game Master creates and manages questions
* ❓ Players submit answers to active questions
* 📊 Attempt tracking per player/session
* 📢 Feedback system (Correct / Incorrect)
* 🔁 Game session handling
* 🌐 Backend-driven game logic (real-time capable architecture)

---

## 🛠️ Tech Stack

* **Backend:** Node.js / NestJS
* **Realtime (if applicable):** WebSockets
* **Frontend:**  React / HTML / CSS
* **Deployment:** Render
* **Version Control:** Git & GitHub

---


---


---

## ⚙️ How It Works

1. A **Game Master** creates a question.
2. The system stores and manages the active game session.
3. Players submit answers through the API or client.
4. The system evaluates each answer:

   * ✅ Correct → Player wins / progresses
   
5. The game ends when:

   * The correct answer is given, or
   * Attempt limit is reached.

---

## 🧪 Running Locally

```bash id="y4s8pl"
# Clone the repository
git clone https://github.com/Havilah-diamen19/Guessing-game-altschool

# Navigate into the project
cd altschool-game

# Install dependencies
npm install

# Start development server
npm run start:dev
```

---

## ⚠️ Current Limitations

Due to time constraints, some features are still in progress:

* Full validation for Game Master inputs
* Persistent storage (database integration)
* Advanced session management
* UI improvements 


---

## 🔄 Future Improvements

* Multiplayer support with multiple players per session
* Role-based system (Game Master vs Player)
* Leaderboard and scoring system
* Question categories and difficulty levels
* Full real-time gameplay experience
* Improved error handling and logging

---

## 📖 Lessons Learned

This project helped reinforce:

* Designing structured backend systems
* Separating responsibilities (Game Master vs Player logic)
* Managing state in a game environment
* Building scalable APIs for interactive applications

---

## 🧠 Author

**Havilah Iyinbor**

Backend Engineer in training, focused on building scalable, real-time, and interactive systems.

---

## 📌 Notes for Assessors

This project demonstrates a working foundation of a **Game Master–controlled guessing system**.

Core backend logic and interaction flows have been implemented.
Additional features and refinements are actively in progress and will be pushed incrementally.

Thank you for your time and consideration 🙏
