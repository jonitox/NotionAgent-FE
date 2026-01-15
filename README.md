# Notion Agent

An AI-powered conversational agent that reads and retrieves information from user's Notion workspace. Chat with your Notion data through a modern web interface.

## Features

- 🔐 **User Authentication**: Secure signup and login with cookie-based sessions
- 💬 **Chat Interface**: Conversational UI to query your Notion workspace
- 📝 **Chat History**: Persistent conversation threads across sessions
- ⚙️ **Settings Management**: Configure OpenAI and Notion API keys
- 🎨 **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

## Screenshots

<div align="center">
  <img width="600" alt="Login Page" src="https://github.com/user-attachments/assets/610db64a-1cff-4760-9b7b-75a13ba4a72b" />
  <p><em>Login Page</em></p>
  
  <img width="600" alt="Chat Interface" src="https://github.com/user-attachments/assets/f05a8fc6-4329-43b6-a1dc-ccf34afe5e4c" />
  <p><em>Chat Interface with Message History</em></p>
  
  <img width="400" alt="Settings Modal" src="https://github.com/user-attachments/assets/52bd3fe9-9abc-4866-bb3d-53da05e569ed" />
  <p><em>Settings Configuration</em></p>
</div>

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Cookie-based sessions
- **Backend**: FastAPI (requires separate backend service)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend service running (see backend repository: https://github.com/jonitox/NotionAgent/tree/main)

### Local setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd notion-agent-fe
   npm install
   ```

2. **Configure environment variables**
   
   Edit `.env.local` with the following content:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

This frontend requires the Notion Agent backend service to be running. 
Ensure the backend is Running on `http://localhost:8000`

## Usage

1. **Sign Up**: Create a new account at `/login`
2. **Configure Settings**: Add your OpenAI, Notion API keys and Notion Page Id in the settings modal
3. **Start Chatting**: Ask questions about your Notion workspace in the chat interface
4. **View History**: Previous conversations are automatically loaded when you return

## Project Structure

```
notion-agent-fe/
├── app/                    # Next.js app directory
│   ├── chat/              # Chat page
│   ├── login/             # Login page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ChatBox.tsx        # Main chat interface
│   ├── LoginForm.tsx      # Login form
│   ├── SignupForm.tsx     # Signup form
│   └── SettingsModal.tsx  # Settings configuration
├── lib/                   # Utilities and types
│   ├── api.ts            # API client
│   └── types.ts          # TypeScript types
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint