# 🛠️ Coder Buddy

**Coder Buddy** is an AI-powered coding assistant built with [LangGraph](https://github.com/langchain-ai/langgraph).  
It works like a multi-agent development team that can take a natural language request and transform it into a complete, working project — file by file — using real developer workflows.

---

## 🏗️ Architecture

Coder Buddy is powered by a multi-agent system:

🧠 Planner Agent
Analyzes user input and generates a structured project plan.
🏛️ Architect Agent
Breaks down the plan into detailed engineering tasks with clear context for each file.
💻 Coder Agent
Implements tasks, writes code into files, and uses tools like a real developer.

<img width="1541" height="189" alt="d" src="https://github.com/user-attachments/assets/27b7ea0e-3422-4e41-9b4c-e58d59198288" />


---

## 🚀 Getting Started
### Prerequisites
📋 Prerequisites
Install uv (Python package manager):
https://docs.astral.sh/uv/getting-started/installation/
Create a Groq account and generate an API key:
https://console.groq.com/keys
### ⚙️ **Instsllstion and Startup**
Clone the repository

git clone https://github.com/your-username/coder-buddy.git
cd coder-buddy

Create a virtual environment

uv venv

Activate the environment

source .venv/bin/activate   # macOS/Linux
.venv\Scripts\activate      # Windows

Install dependencies

1.uv pip install -r pyproject.toml

2.Set up environment variables

3.Create a .env file in the root directory

4.Copy values from .sample_env

5.Add your actual credentials (e.g., GROQ_API_KEY)

▶️ Run the Application
cd coder-Buddy-AI

    python main.py

Features
1.Multi-agent AI system (Planner → Architect → Coder)

2.End-to-end project generation from natural language

3.File-by-file code generation

4.Modular and extensible architecture

5.Real developer-like workflow simulation

📌 Future Enhancements

1.Add UI dashboard for agent visualization

2.Support more LLM providers

3.Real-time collaboration features

4.Deployment pipeline automation

### 🧪 Example Prompts
- Create a to-do list application using html, css, and javascript.
- <img width="876" height="423" alt="Screenshot 2026-04-15 145931" src="https://github.com/user-attachments/assets/05867475-5f4a-414a-b989-b1b3b60d125a" />
- Create a simple calculator web application.
- <img width="347" height="546" alt="Screenshot 2026-04-15 145952" src="https://github.com/user-attachments/assets/77ff6194-4257-41b6-bb32-9a8625479bd7" />
- Create a simple blog API in FastAPI with a SQLite database.

---
⭐ If you found this project useful, consider giving it a star.....
