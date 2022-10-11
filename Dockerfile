#  Dockerfile for Node Express Backend

FROM node:latest

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

ENV NODE_ENV='production'
ENV PORT=5000
ENV MDB_URI=mongodb+srv://profileCluster:papi02082@portfoliocluster.exfhbig.mongodb.net/blogCluster
ENV JWT_SECRETE=myBlog224

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]