# GitHired: Resume as Code 🚀

> **Stop fighting formatting. Start configuring your career.**

**GitHired** is a developer-first resume builder that treats your professional profile as a JSON configuration. Built with modern web technologies, it offers a real-time, type-safe, and privacy-focused way to craft perfect resumes.

![GitHired Preview](/public/preview.png)

## ✨ Features

- **📄 Resume as Code**: Define your entire resume in a simple, validated JSON schema. No more wrestling with Word document formatting.
- **⚡ Real-Time Preview**: See changes instantly as you type. What you configure is exactly what you get.
- **🎨 Premium Themes**: Comes with "Glassmorphism" and "Dark Mode" aesthetics out of the box.
- **🔒 Privacy First**: Your data lives in your browser (and optionally your own MongoDB). We don't harvest your personal info.
- **📦 PDF Export**: One-click export to a clean, ATS-friendly PDF.
- **💎 Glassmorphic Editor**: A stunning, Monaco-powered JSON editor with transparent backgrounds and syntax highlighting.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for full type safety.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables for theming.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth interactions.
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (VS Code's core) for the JSON editing experience.
- **Database**: [Prisma](https://www.prisma.io/) + [MongoDB](https://www.mongodb.com/) (Optional, for saving profiles).
- **PDF Generation**: `html2pdf.js` for client-side rendering.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A MongoDB instance (optional, for persistent storage)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/piyush1102kec/git-hired.git
    cd git-hired
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Environment Variables:**
    Copy `.env.example` to `.env` and add your database URL (if using database features).
    ```bash
    cp env.example .env
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) to start building!

## 📂 Project Structure

- `src/app`: Next.js App Router pages (Landing, Dashboard, Editor).
- `src/components`: Reusable UI components (LivePreview, JsonEditor).
- `src/templates`: Registry of resume templates (React components).
- `src/lib`: Utilities, validation logic (Zod), and default data.
- `prisma`: Database schema.

## 🤝 Contributing

Contributions are welcome! Whether it's adding a new template, fixing a bug, or improving the documentation:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request


---

*Built with ❤️ by Developer, for Developers.*
