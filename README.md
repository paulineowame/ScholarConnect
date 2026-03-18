# ScholarConnect Botswana — Prototype

A multi-page Node.js/Express web app prototype for the ScholarConnect tutoring marketplace.

---

## Quick Start

### 1. Install dependencies
```bash
cd ~/Documents/ScholarConnect
npm install
```

### 2. Run the server
```bash
npm start
```

### 3. Open in browser
```
http://localhost:3000
```

---

## Project Structure

```
ScholarConnect/
├── server.js                  # Express server + API routes
├── package.json
├── public/
│   ├── css/
│   │   └── style.css          # Shared styles for all pages
│   └── js/
│       └── utils.js           # Shared JS utilities
└── views/
    ├── index.html             # Home / Landing page
    ├── login.html             # Shared login page
    ├── register.html          # Registration choice (Student or Tutor)
    ├── register-student.html  # 3-step student registration
    ├── register-tutor.html    # 4-step tutor registration
    ├── find-tutor.html        # Browse & filter tutors
    ├── dashboard-student.html # Student dashboard (post-login)
    └── dashboard-tutor.html   # Tutor dashboard (post-login)
```

---

## Pages & Routes

| URL                   | Page                        |
|-----------------------|-----------------------------|
| `/`                   | Home / Landing              |
| `/login`              | Login (Student or Tutor)    |
| `/register`           | Choose: Student or Tutor    |
| `/register/student`   | Student sign-up (3 steps)   |
| `/register/tutor`     | Tutor sign-up (4 steps)     |
| `/find-tutor`         | Browse & filter tutors      |
| `/dashboard/student`  | Student dashboard           |
| `/dashboard/tutor`    | Tutor dashboard             |

---

## Prototype Notes

- **Login**: Any email/password works after registering (prototype mode)
- **Data**: Stored in memory — restarting the server clears registrations
- **Sessions**: Stored in `sessionStorage` — simulates login state
- **File uploads**: UI only — no files are actually stored

---

## Demo Flow for Presentation

### Student flow:
1. Home → **Get Started** → **Register as Student** → fill 3-step form → Student Dashboard
2. Or: Home → **Find a Tutor** → filter, click tutor → book session

### Tutor flow:
1. Home → **Get Started** → **Register as Tutor** → fill 4-step form → Tutor Dashboard
2. Tutor dashboard shows pending approval banner + incoming session requests

### Login flow:
1. Register first (creates account in memory)
2. Go to `/login` → enter same email → redirected to correct dashboard
