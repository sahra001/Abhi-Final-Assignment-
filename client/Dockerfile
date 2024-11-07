# Step 1: Use an official Node image as the base
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the React app
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Install serve to serve the static files
RUN npm install -g serve

# Step 8: Expose the port for the frontend
EXPOSE 3001

# Step 9: Run the app with serve
CMD ["serve", "-s", "build"]
