# Use the latest version of Node.js
#
# You may prefer the full image:
# FROM node
#
# or even an alpine image (a smaller, faster, less-feature-complete image):
# FROM node:alpine
#
# You can specify a version:
# FROM node:10-slim
FROM node:slim

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="createIssueByLables"
LABEL "com.github.actions.description"="根据lables创建问题,如过和lables相关的问题不存在的话,问题在json文件中"
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="rss"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="orange"

LABEL "repository"="http://github.com/JasonEtco/create-an-issue"
LABEL "homepage"="http://github.com/JasonEtco/create-an-issue"
LABEL "maintainer"="Jason Etcovitch <jasonetco@github.com>"

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your action's code
COPY . .

# Run `node /index.js`
ENTRYPOINT ["node", "/index.js"]