Sure! Here’s the full **README.md** content formatted properly as a markdown file that you can directly put into your repo:

````markdown
# Modern To-Do App

A modern, feature-rich To-Do mobile application built with **React Native** and **Expo**, designed for managing tasks efficiently with priority, status, recurrence, categories, and due dates.

[GitHub Repository](https://github.com/palhrsh09/modern-todo-app)

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [Components & Hooks](#components--hooks)  
- [API & State Management](#api--state-management)  
- [Known Issues](#known-issues)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## About

This app is a **To-Do task manager** that allows users to create, edit, and track tasks. Each task has multiple attributes such as:

- Title & Description  
- Due Date & Time  
- Priority (Low, Medium, High)  
- Status (Pending, Completed, etc.)  
- Recurrence (None, Daily, Weekly, Monthly)  
- Category (General, Work, Personal, etc.)

Users can add new tasks, select dates using a native date-time picker, and filter or sort tasks based on different criteria.

---

## Features

- Add/Edit/Delete tasks  
- Native Date & Time picker integration  
- Task prioritization  
- Status management  
- Recurrence setup for repeating tasks  
- Categorization of tasks  
- UUID based unique task IDs  
- Responsive UI with buttons highlighting active states  
- Navigation between screens using `expo-router`  
- Local state management with custom hooks  
- Error handling and input validation  

---

## Tech Stack

- **React Native** (Expo managed workflow)  
- **Expo Router** for navigation  
- **UUID** for unique task IDs (`react-native-get-random-values` + `uuid`)  
- **@react-native-community/datetimepicker** for native date/time selection  
- JavaScript (React Hooks & Functional Components)  
- React Native core components (SafeAreaView, ScrollView, Button, etc.)

---

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)  
- Expo CLI (`npm install -g expo-cli`)  
- Android/iOS Simulator or physical device with Expo Go app

---

## Installation

1. Clone the repository:  
```bash
git clone https://github.com/palhrsh09/modern-todo-app.git
cd modern-todo-app
````

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
# or
expo start
```

4. Open the app in an emulator or scan the QR code with Expo Go on your phone.

---

## Usage

* Tap **Add Task** to open the form.
* Enter title and description.
* Select due date/time using the date picker.
* Choose priority, status, recurrence, and category.
* Save the task to add it to your list.
* Navigate back to Dashboard to see all tasks.

---

## Folder Structure

```
modern-todo-app/
│
├── app/                  # Main screens and routing
│   ├── dashboard.tsx     # Task list dashboard
│   ├── edittask/         # Edit task screen
│   └── addtask.tsx       # Add task screen (TasksAdd component)
│
├── components/           # Reusable UI components
│
├── hooks/                # Custom React hooks (e.g. useTasks)
│
├── constants.ts          # App constants (PriorityOptions, StatusOptions, etc.)
│
├── types.ts              # TypeScript type definitions (if used)
│
└── package.json
```

---

## Components & Hooks

* **TasksAdd**: Form for adding a new task with validation and state management.
* **useTasks**: Custom hook to manage tasks (add, update, fetch).
* **DateTimePicker**: Native date/time selection integrated with error handling.
* Priority, Status, Recurrence, Category buttons with active state styles.

---

## API & State Management

* State managed locally using React `useState` and `useEffect`.
* UUID v4 used to generate unique task IDs.
* Navigation handled by `expo-router`.
* Tasks are added to the task list via the custom hook `useTasks`.

---

## Known Issues

* Android date picker dismiss warning sometimes appears due to native module behavior — addressed with conditional logic.
* Text color on buttons is explicitly set for better visibility on selected state.
* No backend or persistent storage implemented (future enhancement).

---

```

---

If you want, I can also create a ready-to-upload file and save it for you. Just say the word!
```
