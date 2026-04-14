// SimpleTodoApp core logic
// Data Model
class Task {
  /**
   * @param {string} id - Unique identifier for the task
   * @param {string} title - Title of the task
   * @param {string} [description=''] - Optional description
   * @param {boolean} [completed=false] - Completion status
   * @param {number} [createdAt=Date.now()] - Timestamp of creation
   */
  constructor(id, title, description = '', completed = false, createdAt = Date.now()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}

// Business Logic & Persistence
class TaskManager {
  /**
   * @param {string} [storageKey='simpleTodoTasks']
   */
  constructor(storageKey = 'simpleTodoTasks') {
    this.storageKey = storageKey;
    this.tasks = this.loadFromStorage();
  }

  loadFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      // Re‑hydrate plain objects into Task instances
      return parsed.map(t => Object.assign(new Task(), t));
    } catch (e) {
      console.error('Failed to parse tasks from localStorage', e);
      return [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  addTask(title, description = '') {
    const id = Date.now().toString();
    const task = new Task(id, title, description);
    this.tasks.push(task);
    this.saveToStorage();
    return task;
  }

  editTask(id, newTitle, newDesc) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      task.description = newDesc;
      this.saveToStorage();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveToStorage();
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveToStorage();
    }
  }

  /**
   * @param {'all'|'active'|'completed'} filter
   * @returns {Task[]}
   */
  getFilteredTasks(filter) {
    switch (filter) {
      case 'active':
        return this.tasks.filter(t => !t.completed);
      case 'completed':
        return this.tasks.filter(t => t.completed);
      default:
        return this.tasks;
    }
  }
}

// UI Rendering Helpers
/**
 * Creates a DOM element for a given task using the <template>.
 * @param {Task} task
 * @returns {HTMLElement}
 */
function createTaskElement(task) {
  const template = document.getElementById('task-template');
  if (!template) {
    console.error('Task template not found');
    return document.createElement('li');
  }
  const clone = template.content.cloneNode(true);
  const el = /** @type {HTMLElement} */ (clone.firstElementChild);
  el.dataset.id = task.id;

  const checkbox = el.querySelector('.toggle');
  if (checkbox) checkbox.checked = task.completed;

  const titleEl = el.querySelector('.title');
  if (titleEl) titleEl.textContent = task.title;

  const descEl = el.querySelector('.desc');
  if (descEl) descEl.textContent = task.description;

  if (task.completed) el.classList.add('completed');

  return el;
}

/**
 * Renders the task list according to the supplied filter.
 * @param {string} [filter='all']
 */
function renderTasks(filter = 'all') {
  const list = document.getElementById('task-list');
  if (!list) return;
  list.innerHTML = '';
  const tasks = taskManager.getFilteredTasks(filter);
  tasks.forEach(task => list.appendChild(createTaskElement(task)));
  updateActiveFilterButton(filter);
}

/**
 * Highlights the active filter button.
 * @param {string} active
 */
function updateActiveFilterButton(active) {
  document.querySelectorAll('.filter').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === active);
  });
}

// Event Binding
function bindEventListeners() {
  // Add task via button click
  const addBtn = document.getElementById('add-btn');
  const titleInput = document.getElementById('new-title');
  const descInput = document.getElementById('new-desc');

  if (addBtn && titleInput && descInput) {
    addBtn.addEventListener('click', () => {
      const title = titleInput.value.trim();
      const desc = descInput.value.trim();
      if (!title) return; // simple validation
      taskManager.addTask(title, desc);
      titleInput.value = '';
      descInput.value = '';
      renderTasks(currentFilter);
    });
  }

  // Enter key on title input triggers add
  if (titleInput) {
    titleInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addBtn?.click();
      }
    });
  }

  // Delegated task list actions
  const taskList = document.getElementById('task-list');
  if (taskList) {
    taskList.addEventListener('click', e => {
      const target = /** @type {HTMLElement} */ (e.target);
      const item = target.closest('.task-item');
      if (!item) return;
      const id = item.dataset.id;
      if (!id) return;

      if (target.classList.contains('delete')) {
        taskManager.deleteTask(id);
        renderTasks(currentFilter);
      } else if (target.classList.contains('edit')) {
        // Simple edit using prompt dialogs
        const task = taskManager.tasks.find(t => t.id === id);
        if (!task) return;
        const newTitle = prompt('Edit title', task.title);
        if (newTitle === null) return; // cancelled
        const newDesc = prompt('Edit description', task.description);
        if (newDesc === null) return;
        taskManager.editTask(id, newTitle.trim(), newDesc.trim());
        renderTasks(currentFilter);
      }
    });

    // Toggle completion via checkbox change
    taskList.addEventListener('change', e => {
      const target = /** @type {HTMLInputElement} */ (e.target);
      if (!target.classList.contains('toggle')) return;
      const item = target.closest('.task-item');
      if (!item) return;
      const id = item.dataset.id;
      if (!id) return;
      taskManager.toggleComplete(id);
      renderTasks(currentFilter);
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter) {
        currentFilter = filter;
        renderTasks(currentFilter);
      }
    });
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', e => {
    // Ctrl+E -> focus first edit button if present
    if (e.ctrlKey && (e.key === 'e' || e.key === 'E')) {
      const firstEdit = document.querySelector('.task-item .edit');
      if (firstEdit) {
        e.preventDefault();
        /** @type {HTMLElement} */ (firstEdit).focus();
      }
    }
  });
}

// Initialization
const taskManager = new TaskManager();
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  bindEventListeners();
  renderTasks(currentFilter);
});
