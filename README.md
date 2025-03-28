# IPL Market - IPL 2025 Prediction Platform

A Next.js-based prediction platform for IPL 2025 matches where users can make predictions on various aspects of matches and earn points based on their accuracy.

## Features

- 🏏 Real-time match predictions
- 📊 Multiple prediction markets (Match Winner, Highest Run Scorer, etc.)
- 🏆 Points-based leaderboard system
- 👤 Wallet-based authentication
- 📱 Responsive design with modern UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Testing**: Jest + Cypress
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ipl-market.git
cd ipl-market
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Update .env with your values
```

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:seed` - Seed the database

## Testing

- Run unit tests: `npm test`
- Run Cypress component tests: `npm run test:component`
- Run Cypress E2E tests: `npm run test:e2e`

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── page.tsx           # Home page
├── components/            # Reusable components
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
└── types/               # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
