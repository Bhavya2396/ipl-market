# IPL Market

A prediction platform for IPL 2025 matches where users can make predictions and compete on the leaderboard.

## Features

- User authentication with Google
- Match management
- Prediction markets
- User predictions
- Leaderboard system
- Real-time updates

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth.js
- Cypress for testing

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- Google OAuth credentials

### Local Development

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
   cp .env.example .env.local
   ```
   Edit `.env.local` with your credentials.

4. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:push
   npm run prisma:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment

1. Push your code to GitHub

2. Connect your repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Configure environment variables from `.env.example`
   - Deploy!

3. Set up the database:
   - Create a PostgreSQL database on Vercel
   - Update the `DATABASE_URL` in Vercel environment variables
   - Run database migrations:
     ```bash
     npm run prisma:push
     npm run prisma:seed
     ```

## Testing

### Component Tests

```bash
npm run cypress:component
```

### E2E Tests

```bash
npm run cypress:e2e
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
