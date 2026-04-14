# SimpleTodoApp

A lightweight, client‑side Todo application built with **HTML**, **CSS**, and **JavaScript**.  It demonstrates a clean separation between data (Task, TaskManager), UI rendering, and event handling, while persisting data in the browser's `localStorage`.

---

## Tech Stack
- **HTML5** – markup and template for task items
- **CSS3** – styling and responsive layout (see `styles.css`)
- **JavaScript (ES6)** – core logic (`app.js`) using classes, modules and DOM APIs

---

## Features
- **Add tasks** with a title and optional description
- **Edit** existing tasks (title & description) via a simple prompt dialog
- **Delete** tasks
- **Toggle completion** status with a checkbox
- **Filter** view: All, Active, Completed
- **Persist** tasks across sessions using `localStorage`
- **Keyboard shortcuts**
  - `Enter` while the title input is focused → add task
  - `Ctrl+E` → focus the first visible *Edit* button
- **Responsive UI** – works on desktop and mobile browsers

---

## Installation / Running
1. Clone the repository:
   ```bash
   git clone https://github.com/your‑username/simple-todo-app.git
   cd simple-todo-app
   ```
2. Open `index.html` in any modern web browser (no server required):
   ```bash
   open index.html   # macOS
   # or double‑click the file in Explorer/Finder
   ```
   The app will load and automatically read any saved tasks from `localStorage`.

---

## Usage Guide
| Action | How to do it |
|--------|--------------|
| **Add a task** | Type a title (required) and optionally a description, then click **Add** or press **Enter** while the title field is focused. |
| **Edit a task** | Click the **Edit** button on a task. A prompt will appear for the new title, followed by another for the description. |
| **Delete a task** | Click the **Delete** button on the task you wish to remove. |
| **Toggle completion** | Click the checkbox next to a task. Completed tasks receive a visual style (`.completed`). |
| **Filter tasks** | Use the **All / Active / Completed** buttons in the footer. |
| **Keyboard shortcuts** | • `Enter` – add task (when title input is focused)  
• `Ctrl+E` – move focus to the first *Edit* button (useful for quick editing). |

---

## Architecture Overview
The project follows a **three‑layer** structure:

1. **HTML Structure (`index.html`)**
   - Static markup for the header, input area, task list container, filter footer, and a `<template>` (`#task-template`) that defines a single task item.
   - The template is cloned by JavaScript to render each task.

2. **CSS Styling (`styles.css`)**
   - Provides layout, colors, and responsive behaviour.
   - Uses classes such as `.task-item`, `.completed`, `.filter`, and `.active` to reflect state.

3. **JavaScript Core (`app.js`)**
   - **Data Model** – `Task` class represents a single todo item.
   - **Business Logic** – `TaskManager` handles CRUD operations, filtering, and persistence (`localStorage`).
   - **UI Rendering** – Helper functions `createTaskElement`, `renderTasks`, and `updateActiveFilterButton` turn `Task` objects into DOM nodes and keep the view in sync.
   - **Event Binding** – `bindEventListeners` wires UI controls (add button, keyboard shortcuts, filter buttons, delegated clicks on the task list) to the `TaskManager` methods.
   - **Application Flow**
     1. On `DOMContentLoaded`, instantiate `TaskManager`, bind events, and render the current task list.
     2. User actions mutate the `TaskManager` state, which immediately triggers `saveToStorage` and a re‑render.
     3. The UI always reflects the source of truth – the `TaskManager` instance.

---

## Contributing
1. **Fork** the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, ensuring the existing code style is respected.
4. Test the app by opening `index.html` in a browser.
5. Commit and push your branch, then open a **Pull Request** against the `main` branch.
6. Include a clear description of the changes and reference any related issue.

---

## License
[Insert License Here] – e.g., MIT, Apache 2.0, etc.

---

*This README provides an overview for developers and users alike, linking directly to the core files (`index.html`, `styles.css`, `app.js`). Future contributors can extend the app by adding new features (e.g., drag‑and‑drop ordering, tag support) while keeping the same architectural pattern.*