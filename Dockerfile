# Installing Dependencies
FROM node:alpine AS BUILD
WORKDIR /home/node/app
# package.json and package-lock.json copied to start the installation
COPY package*.json ./
# Do not install DevDependencies
RUN npm install --omit=dev --omit=optional
# Remove test and other non production files/dependencies in the node_modules
RUN npm prune --production
# Remove unused files/dependencies across the image
RUN wget -q https://gobinaries.com/tj/node-prune | sh

# Building the Actual Image
FROM node:alpine AS deps
WORKDIR /home/node/app
COPY . .
COPY --from=BUILD /home/node/app/node_modules node_modules
RUN npm exec prisma generate
CMD [ "npm", "start" ]