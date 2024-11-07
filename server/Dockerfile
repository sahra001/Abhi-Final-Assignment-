# Step 1: Use an official Node image as the base
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the backend code
COPY . .

# Step 6: Expose the port your server listens on
EXPOSE 3000

# Step 7: Run the server
CMD ["npm", "run", "start"]
