## Installation

1. Cloning the repository:

```bash
git clone https://github.com/michael-debs/Maps-project.git
```
2. Install Dependencies:
After cloning the repository, navigate to the `Client` directory and install the dependencies by running:
```bash
cd client
npm install
 ```
Then, navigate to the `Server` directory and install the dependencies by running:
```bash
cd ../server
npm install
```

4. Configure Environment Variables:
Duplicate the `.env.example` file in both the client and server directories. Rename the duplicated file in the server directory to `.env` and the one in the client directory to `.env.local.`
Configure your environment variables by editing the .env files according to the instructions provided for each variable.

6. Set up the Database:
In the `server` directory, run the following command to create and apply migrations:
```bash
 npx prisma migrate dev
```
Then, generate Prisma client by running:
```bash
 npx prisma generate 
```

8. Start the Development Servers:
Run the following command in the `Client` directory to start the client-side development server:
```bash
npm run dev
```
Similarly, start the server-side development server by running the following command in the server directory:
```bash
npm run dev
```

9. You can seed the database by running ``` npm run seed ``` in the `Server` directory

