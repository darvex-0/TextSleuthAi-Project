# TextSleuth AI

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Genkit](https://img.shields.io/badge/Google_Genkit-1.20.0-EA4335?style=for-the-badge&logo=google)](https://genkit.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-0.1.0-blue?style=for-the-badge)](package.json)

Your intelligent partner for analyzing text. **TextSleuth AI** is a cutting-edge web application that detects AI-generated content and checks for plagiarism using advanced AI-powered tools.

[Live Demo](#) • [Report Bug](https://github.com/darvex-0/TextSleuthAi-Project/issues) • [Request Feature](https://github.com/darvex-0/TextSleuthAi-Project/issues)

</div>

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [AI Flows](#-ai-flows)
- [API Documentation](#-api-documentation)
- [UI Components](#-ui-components)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🎯 Features

- 🤖 **AI Content Detection** - Identify whether text is AI-generated or human-written with confidence scoring
- 🔍 **Plagiarism Checker** - Detect plagiarism by comparing text against online sources and get similarity percentages
- 📜 **History Tracking** - Keep a record of your previous analyses for easy reference
- 🎨 **Modern UI** - Clean, responsive interface built with Next.js and Tailwind CSS
- ⚡ **Real-time Analysis** - Get instant results using Google Genkit AI flows
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Type-Safe** - Built with TypeScript for maximum reliability
- 🚀 **Fast Performance** - Powered by Next.js with Turbopack for lightning-fast builds

## 🚀 Tech Stack

- **Frontend**: Next.js 15.3.3 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Engine**: Google Genkit with genai provider
- **State Management**: React Hooks
- **Form Handling**: React Hook Form with Zod validation
- **Backend**: Next.js Server Actions
- **Database**: Firebase
- **Icons**: Lucide React

## 📋 Prerequisites

Before running the project, ensure you have:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Google Gemini API** key ([Get Free API Key](https://aistudio.google.com/apikey))

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/darvex-0/TextSleuthAi-Project.git
cd TextSleuthAi-Project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev
```

Navigate to `http://localhost:9002` and start analyzing text!

## ⚙️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/darvex-0/TextSleuthAi-Project.git
cd TextSleuthAi-Project
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key (Get free from https://aistudio.google.com/apikey)
GENKIT_API_KEY=your_gemini_api_key_here
```

### Step 4: Configure Gemini API

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key" (Free tier available)
3. Copy your API key
4. Paste it in `.env.local` as shown above

## 🏃 Running the Project

### Development Mode

```bash
# Start Next.js development server (port 9002 with Turbopack)
npm run dev
```

Visit `http://localhost:9002` to access the application.

### Type Checking

```bash
# Verify TypeScript types without building
npm run typecheck
```

### Linting

```bash
# Run ESLint checks
npm run lint
```

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── ai/                                 # AI-related configurations
│   ├── genkit.ts                      # Genkit initialization
│   ├── dev.ts                         # Development setup
│   └── flows/                         # AI workflow definitions
│       ├── analyze-text-for-ai.ts     # AI detection flow
│       └── check-text-for-plagiarism.ts # Plagiarism check flow
├── app/                               # Next.js app directory
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Home page
│   ├── globals.css                    # Global styles
│   ├── ai-detector/                   # AI detection tool
│   │   ├── page.tsx
│   │   └── actions.ts                # Server actions
│   ├── plagiarism-checker/            # Plagiarism checker tool
│   │   ├── page.tsx
│   │   └── actions.ts                # Server actions
│   └── history/                       # User history
│       └── page.tsx
├── components/                        # Reusable React components
│   ├── ai-result-chart.tsx           # Visualization component
│   └── ui/                           # shadcn/ui components
├── hooks/                             # Custom React hooks
│   ├── use-mobile.tsx                # Mobile detection
│   └── use-toast.ts                  # Toast notifications
└── lib/                               # Utility functions
    ├── utils.ts
    ├── placeholder-images.json
    └── placeholder-images.ts
```

## 🛠️ Available Scripts

| Command | Description | Port |
|---------|-------------|------|
| `npm run dev` | Start Next.js dev server with Turbopack | 9002 |
| `npm run build` | Create optimized production build | — |
| `npm start` | Start production server | 3000 |
| `npm run lint` | Run ESLint checks | — |
| `npm run typecheck` | Run TypeScript type checking | — |

## 🔧 AI Flows

### Analyze Text for AI (AI Detection)

Detects whether text is AI-generated or human-written.

**Endpoint:** `POST /api/ai-detector`

**Input:**
```typescript
{
  text: string;  // The text to analyze
}
```

**Output:**
```typescript
{
  isAiGenerated: boolean;      // Whether text is AI-generated
  confidenceScore: number;     // Confidence score (0-1)
}
```

**Example:**
```bash
curl -X POST http://localhost:9002/api/ai-detector \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here..."}'
```

---

### Check Text for Plagiarism

Detects plagiarism by comparing text against online sources.

**Endpoint:** `POST /api/plagiarism-checker`

**Input:**
```typescript
{
  text: string;  // The text to check for plagiarism
}
```

**Output:**
```typescript
{
  similarityPercentage: number;  // Similarity percentage (0-100)
  sourceUrls: string[];          // URLs of matching sources
}
```

**Example:**
```bash
curl -X POST http://localhost:9002/api/plagiarism-checker \
  -H "Content-Type: application/json" \
  -d '{"text": "Your text here..."}'
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GENKIT_API_KEY` | Google Gemini API key | ✅ |

Get your free API key at: https://aistudio.google.com/apikey

### Next.js Configuration

The project uses:
- **next.config.ts** - Custom Next.js configuration
- **tsconfig.json** - TypeScript configuration with strict mode
- **tailwind.config.ts** - Tailwind CSS customization
- **postcss.config.js** - PostCSS plugins
- **components.json** - shadcn/ui component configuration

## 🎨 UI Components

The project leverages shadcn/ui, a high-quality component library built on Radix UI and Tailwind CSS:

**Data Display:** Accordion, Avatar, Badge, Card, Carousel, Chart, Progress, Skeleton, Table, Tabs

**Input:** Button, Checkbox, Dialog, Dropdown, Input, Label, Radio Group, Select, Slider, Switch, Textarea

**Feedback:** Alert, Alert Dialog, Toast, Tooltip

**Layout:** Collapsible, Menubar, Popover, Scroll Area, Separator, Sheet, Sidebar

For component documentation, visit [shadcn/ui docs](https://ui.shadcn.com/).

## 📱 Responsive Design

The application is fully responsive and optimized for:

| Device | Breakpoint | Status |
|--------|-----------|--------|
| Mobile | < 640px | ✅ Optimized |
| Tablet | 640px - 1024px | ✅ Optimized |
| Desktop | > 1024px | ✅ Optimized |

All components adapt seamlessly across screen sizes using Tailwind CSS responsive utilities.

## 🔐 Security

- ✅ **Type-Safe** - Full TypeScript coverage for type safety
- ✅ **Server Actions** - Secure server-side execution with Next.js
- ✅ **Form Validation** - Input validation using Zod schemas
- ✅ **Environment Variables** - API keys protected via `.env.local` (never committed to git)
- ✅ **API Key Protection** - Keys never exposed to client-side code

## 🐛 Troubleshooting

### Port Already in Use

```bash
# If port 9002 is already in use, specify a different port
npm run dev -- -p 3000
```

### Genkit Connection Issues

```bash
# Ensure your GEMINI_API_KEY is set correctly in .env.local
# The Genkit flows run automatically with npm run dev
```

- Verify your API key is valid: https://aistudio.google.com/apikey
- Check that Gemini API is enabled for your key
- Verify `.env.local` file is in the root directory with the correct API key
- Restart the development server after updating `.env.local`

### Environment Variables Not Loading

```bash
# Verify .env.local exists in the root directory
ls -la .env.local

# Restart the development server after updating .env.local
# Clear Next.js cache if needed
rm -rf .next
npm run dev
```

### TypeScript Errors

```bash
# Run type checking to identify issues
npm run typecheck

# Update dependencies if types are outdated
npm install --save-dev @types/node@latest
```

### Gemini API Connection Errors

```bash
# Verify API key is set correctly
echo $env:GENKIT_API_KEY  # PowerShell on Windows
echo $GENKIT_API_KEY      # Bash on Mac/Linux
```

- Ensure your API key is valid: https://aistudio.google.com/apikey
- Check that Gemini API is enabled for your key
- Verify `.env.local` file is in the root directory
- Restart the development server after updating `.env.local`

For more help, check the [troubleshooting guide](./docs/TROUBLESHOOTING.md) or open an issue.

## 🤝 Contributing

We welcome contributions to TextSleuth AI! Here's how to get started:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/darvex-0/TextSleuthAi-Project.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, well-documented code
   - Follow the existing code style
   - Add tests if applicable

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe the changes in detail
   - Reference related issues
   - Ensure all tests pass

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules: `npm run lint`
- Format code with Prettier (if configured)
- Write meaningful commit messages

### Reporting Issues

When reporting bugs, please include:
- OS and Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Error messages or screenshots

## 📄 License

You are free to use, modify, and distribute this software for any purpose.

## 💬 Support

Need help? Here are your options:

- 📧 **Email** - [rakeshpallamgod@gmail.com](mailto:rakeshpallamgod@gmail.com)
- 🐛 **Bug Reports** - [Open an issue](https://github.com/darvex-0/TextSleuthAi-Project/issues)
- 💡 **Feature Requests** - [Request a feature](https://github.com/darvex-0/TextSleuthAi-Project/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/darvex-0/TextSleuthAi-Project/discussions)
- 📖 **Documentation** - [Wiki](https://github.com/darvex-0/TextSleuthAi-Project/wiki)

## 🎉 Acknowledgments

This project was built with amazing open-source technologies:

- [**Next.js**](https://nextjs.org/) - React framework for production
- [**Google Genkit**](https://genkit.dev/) - Generative AI framework
- [**Google Gemini API**](https://ai.google.dev/) - Advanced AI models (Free tier available)
- [**shadcn/ui**](https://ui.shadcn.com/) - High-quality UI components
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [**Lucide Icons**](https://lucide.dev/) - Beautiful icon library
- [**React Hook Form**](https://react-hook-form.com/) - Performant forms
- [**Zod**](https://zod.dev/) - TypeScript-first schema validation

Special thanks to the community for contributions and feedback!

---

<div align="center">

### ⭐ Found this helpful? Consider giving us a star!

[⬆ back to top](#textsleuth-ai)

**Made with ❤️ by the TextSleuth AI Team**

**Version:** 0.1.0  |  **Last Updated:** December 2025

</div>
