# Base image
# --------------------------------

# base docker image with node 14
FROM node:22-alpine AS base

# development environment image
# ------------------------------
FROM base AS development
WORKDIR /home/node/app

# install app dependencies (without building code to speedup docker)
ENV PATH="/home/node/app/node_modules/.bin:$PATH"
COPY package*.json ./
COPY *.tgz ./
RUN npm install --no-scripts

# Copy Workspace to Container
COPY ts*.json ./
COPY *.config.* ./
COPY env.d.ts ./
COPY .env.production ./.env
COPY index.html ./
COPY src ./src
COPY public ./public
COPY locales ./locales

# build
RUN npm run build

# run application
EXPOSE 4200
CMD ["npm", "run", "preview"]

# production environment image
#-----------------------------

FROM nginx:1.28.0-alpine AS production

# copy app from development image
COPY --from=development /home/node/app/dist/ /usr/share/nginx/html
COPY --from=development /home/node/app/public/ /usr/share/nginx/html
# copy nginx conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
