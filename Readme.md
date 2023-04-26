# Start with backend

- After cloning
  - npm install
  - create .env file and add following data
    - | DATABASE_URL |
    - | PORT |
    - | JWT_SECRET |
    - | USER_EMAIL |
    - | USER_EMAIL_PASSWORD |
  - Push db
    - npx prisma push db
  - Create client
    - npx prisma generate
  * ---------------------------- \*
  - Run Seeder
    - npm run seeder
  - Run sever
    - npm run devStart

* Frontend
  - cd frontend
  - yarn
  - yarn dev
