# Portfolio

A modern, full-stack portfolio website built with Next.js, showcasing frontend, backend, and AI skills.

## Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI
- **AI-Powered Chat**: LangGraph-based chatbot - "Talk to Jalaj AI"
- **Interactive Timeline**: Visual journey from birth to present
- **Project Showcase**: Detailed project cards with live demos and GitHub links
- **Resume Download**: One-click resume download functionality
- **Database Integration**: Neon DB with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Neon DB (PostgreSQL)
- **ORM**: Prisma
- **AI/ML**: LangGraph, LangChain
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/nijks777/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Then fill in your environment variables in `.env.local`

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
├── app/                  # Next.js app directory
├── src/
│   ├── components/      # React components
│   │   ├── Header/     # Navigation header
│   │   ├── Footer/     # Footer component
│   │   ├── UI/         # Reusable UI components
│   │   ├── Chat/       # AI chat components
│   │   ├── Timeline/   # Life cycle timeline
│   │   ├── Projects/   # Project showcase
│   │   ├── About/      # About me section
│   │   └── Contact/    # Contact form
│   ├── lib/            # Utility functions
│   │   ├── db/         # Database utilities
│   │   ├── utils/      # Helper functions
│   │   └── agents/     # LangGraph agents
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types
│   └── styles/         # Global styles
└── public/             # Static assets
    └── assets/
        ├── images/     # Image files
        ├── resume/     # Resume PDF
        └── icons/      # Icon files
```

## Development Phases

See [Steps.md](Steps.md) for detailed development roadmap (20 phases, 200 steps).

## License

All rights reserved.
