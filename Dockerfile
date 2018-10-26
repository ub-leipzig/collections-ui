FROM node:latest

MAINTAINER Christopher Johnson <chjohnson39@gmail.com>
LABEL description = "Collections UI Web Application"

WORKDIR /srv/collections-ui

# Download and Install collections-ui (master)
RUN git clone https://github.com/ub-leipzig/collections-ui.git ./
COPY packages/collections-ui-app/.env packages/collections-ui-app/.env
##Install
RUN npm i npm@latest -g
RUN npm install --global lerna
WORKDIR /srv/collections-ui/packages/manifest-viewer
RUN yarn
WORKDIR /srv/collections-ui/packages/collections-ui-common
RUN yarn
WORKDIR /srv/collections-ui/packages/manifest-uuid
RUN yarn
WORKDIR /srv/collections-ui/packages/collections-ui-app
RUN npm install
# WORKDIR /srv/collections-ui/packages/annotations-viewer
# RUN npm install
WORKDIR /srv/collections-ui
RUN lerna run build --ignore=annotations-viewer
WORKDIR /srv/collections-ui/packages/collections-ui-app
RUN yarn global add serve

COPY entrypoint.sh /entrypoint.sh
RUN chmod 700 /entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "-s", "build" ]
