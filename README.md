```markdown
# 🧠 KashaPy

**KashaPy** is a modern Python project portfolio site designed to showcase your work with style and functionality. Built with **Next.js**, **Sanity.io**, and **Tailwind CSS**, it features dynamic routing, a dark tech-themed UI, and an integrated Python code playground.

![KashaPy Screenshot](https://okashadev.vercel.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fyr2mb272%2Fproduction%2F19c3a4903139178ea02fb477b82f98ec9dd3db4f-1120x1120.jpg&w=1920&q=75)

## 🌐 Live Demo

🔗 [https://kasha-py.vercel.app](https://kasha-py.vercel.app)

---

## 🚀 Features

- ⚡ **Next.js App Router** with dynamic routing
- 🎨 **Modern UI** built with Tailwind CSS and Google Fonts
- 🧩 **Sanity CMS** integration for managing project data
- 🧠 **Python Playground** with real-time code execution via Piston API
- 💻 **Syntax-highlighted code viewer**
- 🔗 Optional **Live Demo links** for each project
- 📱 Fully **responsive design**

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Code Execution**: [Piston API](https://github.com/engineer-man/piston)

---

## 📁 Folder Structure

```

app/
│
├── page.tsx               # Home page showing project list
├── playground/            # Python playground with code editor & output
├── projects/\[slug]/       # Dynamic route for each project detail
├── myComponents/          # Reusable components like CodeBlock
├── globals.css            # Tailwind and custom styles
└── layout.tsx             # Root layout and header

````

---

## 🔧 Local Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/yourusername/kashapy.git
   cd kashapy
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Sanity**:

   * Create a new project at [sanity.io](https://www.sanity.io/).
   * Set up schemas for `project` with fields like `title`, `description`, `code`, `slug`, and `demoUrl`.

4. **Add Environment Variables**:
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

5. **Run the dev server**:

   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

* **Project Accordion View**
* **Project Detail with CodeBlock**
* **Python Playground**

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Author

Made with ❤️ by [Okasha Khan](https://github.com/Okashanadeem)

