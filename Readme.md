# Fastify-React E-commerce Application

* This e-commerce application, built with Fastify and React, offers a robust platform similar to Flipkart. It includes features for administrators, users, workers, and delivery personnel.

# Features:

 - Authentication: Secure login for users, workers, and admins with role-based access control.

 - Admin Dashboard: Manage products, categories, users, and view analytics.

 - User Experience: Responsive design, product catalog, wishlist, and cart functionality.

 - Order Management: Process orders, track status, and integrate with payment gateways.

 - Worker & Delivery Management: Assign orders, update statuses, track deliveries.

 - Inventory Management: Track inventory, receive low stock alerts, integrate with suppliers.

 - Customer Support: Chat support, ticketing system, and FAQ section.

 - Security & Scalability: Implement best security practices, scalable architecture.

 - Feedback & Reviews: Rating and review system, feedback collection.


# Getting Started:

 - Clone the repository.
 - Install dependencies for both frontend and backend.
 - Configure environment variables.
 - Run the application.

# Steps need to follow

* Backend 
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

  


