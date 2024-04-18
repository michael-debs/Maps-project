## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/michael-debs/Maps-project.git
   ```
2. Install dependencies for both frontend and backend:

   ```bash
   cd project-name
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```
3. Set up environment variables:
   ```bash
   PORT=3001
   JWT_SECRET=your_secret_key
   DATABASE_URL=your_database_url
   ```
   Copy the content from .env.example into a .env file in the server directory. Replace "your_secret_key" with a secure key for JWT token encryption and "your_database_url" with the URL for your PostgreSQL database.

4. Set up the database
   ```bash
      cd server && npx prisma migrate dev
   ```

   ```bash
      npx prisma generate
   ```

5. Set up environment variables and start the development servers:

   - Open one terminal for the server:
     ```bash
     cd server && npm run dev
     ```

   - Open another terminal for the client:
     ```bash
     cd ../client && npm run dev
     ```

