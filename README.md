# 🌙 Selene AI — Your Celestial Chat Companion

Selene AI is a sleek, modern web-based chatbot built with Next.js, React, Tailwind CSS, and OpenAI (or DeepSeek) API integration. Styled with a cosmic theme, Selene is designed to offer thoughtful and intuitive interactions in a celestial UI.

⚠️ Deepseek API is not configured by default. This project currently works only with OpenAI out of the box.

![{810391EA-0C17-4658-854A-A3E658894CAF}](https://github.com/user-attachments/assets/8327e7d4-8a30-4b8a-b1c6-b7ed2f29b77a) <!-- Optional: Replace with a real screenshot -->

---

## 🚀 Features

- 🧠 AI-powered responses using OpenAI (or DeepSeek)
- 🌌 Elegant dark gradient UI 
- 🎨 Smooth fade/slide animations with Tailwind CSS
- 💬 Chat history interface
- ⚙️ Easily customizable backend model

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/) or [DeepSeek](https://platform.deepseek.com/) (Currently Only supports OpenAI)
- Deployed Locally or using [Vercel](https://vercel.com)

---

## 🔧 Setup Instructions (For Local machines)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/selene-ai.git
cd selene-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

```bash
# For OpenAI:
OPENAI_API_KEY=your_openai_api_key_here
```
```bash
# Or for DeepSeek:
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```
(Note: Currently Only Supports OpenAI, But if needed, it can be midified at your own will to support either one.)

### 4. Start the development Server

```bash
npm run dev
```

Visit http://localhost:3000 in your browser to use Selene locally.
