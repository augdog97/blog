FROM node:12.18.3
# make the starting directory the current one
WORKDIR /
# COPY Package.json 
COPY package*.json / 
# install the dependencines within the app
RUN npm install
# Copy Source Code 
COPY . .


# Have docker container use port 3000, that is the port that the node app is set to
EXPOSE 3000
# Start the node app 
CMD ["node", "index.js"]
