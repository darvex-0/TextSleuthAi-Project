# TextSleuth AI

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Genkit](https://img.shields.io/badge/Google_Genkit-1.20.0-EA4335?style=for-the-badge&logo=google)](https://genkit.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Version](https://img.shields.io/badge/Version-0.1.0-blue?style=for-the-badge)](package.json)

Your intelligent partner for analyzing text. **TextSleuth AI** is a cutting-edge web application that detects AI-generated content and checks for plagiarism using advanced AI-powered tools.

[Live Demo](#) • [Report Bug](https://github.com/yourusername/TextSleuthAi/issues) • [Request Feature](https://github.com/yourusername/TextSleuthAi/issues)

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
- **Google Genkit** API credentials ([Get Started](https://genkit.dev/docs/getstarted))
- **Firebase** configuration ([Setup Guide](https://firebase.google.com/docs/web/setup))

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/darvex-0/TextSleuthAi-Project.git
cd TextSleuthAi

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev

# In another terminal, start Genkit
npm run genkit:dev
```

Navigate to `http://localhost:9002` and start analyzing text!

## ⚙️ Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/TextSleuthAi.git
cd TextSleuthAi
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory with your configuration:

```env
# Google Genkit
NEXT_PUBLIC_GENKIT_API_KEY=your_genkit_api_key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Step 4: Configure Google Genkit

Follow the [Google Genkit setup guide](https://genkit.dev/docs/getstarted) to:
1. Create a Google Cloud project
2. Enable the Generative AI API
3. Create API credentials
4. Add credentials to your `.env.local`

## 🏃 Running the Project

### Development Mode

```bash
# Terminal 1: Start Next.js development server (port 9002 with Turbopack)
npm run dev

# Terminal 2: Start Genkit development server
npm run genkit:dev
```

Visit `http://localhost:9002` to access the application.

### Watch Mode for Active Development

```bash
# Auto-reload on file changes
npm run genkit:watch
```

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
| `npm run genkit:dev` | Start Genkit development server | 4000 |
| `npm run genkit:watch` | Start Genkit with auto-reload | 4000 |
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
| `NEXT_PUBLIC_GENKIT_API_KEY` | Google Genkit API key | ✅ |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | ❌ |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | ❌ |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | ✅ |

### Next.js Configuration

The project uses:
- **next.config.ts** - Custom Next.js configuration
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS customization
- **postcss.config.js** - PostCSS plugins

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
- ✅ **Environment Variables** - Sensitive data protected via `.env.local`
- ✅ **Firebase Security** - Firebase rules and authentication
- ⚠️ **Note** - This is a public instance. Implement additional authentication for production use.

## 🐛 Troubleshooting

### Port Already in Use

```bash
# If port 9002 is already in use, specify a different port
npm run dev -- -p 3000
```

### Genkit Connection Issues

```bash
# Ensure Genkit is running in a separate terminal
npm run genkit:dev

# Check if port 4000 is accessible
netstat -an | findstr :4000
```

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

### Firebase Connection Errors

- Verify your Firebase project credentials in `.env.local`
- Check Firebase console for API key restrictions
- Ensure Firebase services are enabled in your project

For more help, check the [troubleshooting guide](./docs/TROUBLESHOOTING.md) or open an issue.

## 🤝 Contributing

We welcome contributions to TextSleuth AI! Here's how to get started:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/TextSleuthAi.git
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

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this software for any purpose.

## 💬 Support

Need help? Here are your options:

- 📧 **Email** - [support@textsleuthAi.com](mailto:support@textsleuthAi.com)
- 🐛 **Bug Reports** - [Open an issue](https://github.com/yourusername/TextSleuthAi/issues)
- 💡 **Feature Requests** - [Request a feature](https://github.com/yourusername/TextSleuthAi/issues)
- 💬 **Discussions** - [GitHub Discussions](https://github.com/yourusername/TextSleuthAi/discussions)
- 📖 **Documentation** - [Wiki](https://github.com/yourusername/TextSleuthAi/wiki)

## 🎉 Acknowledgments

This project was built with amazing open-source technologies:

- [**Next.js**](https://nextjs.org/) - React framework for production
- [**Google Genkit**](https://genkit.dev/) - Generative AI framework
- [**shadcn/ui**](https://ui.shadcn.com/) - High-quality UI components
- [**Tailwind CSS**](https://tailwindcss.com/) - Utility-first CSS framework
- [**TypeScript**](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [**Lucide Icons**](https://lucide.dev/) - Beautiful icon library
- [**Firebase**](https://firebase.google.com/) - Backend as a service
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
