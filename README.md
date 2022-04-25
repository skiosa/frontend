# Skiosa-Frontend
The Skiosa Frontend Application build with the Angular Framework.

## Requirements
- npm / node.js 16
- chrome-bin / chromium-bin
- skiosa core-service

## Development
We would recommend to use the Devcontainer to start developing. All necessary dependencies are installed and you don´t have to install specific tools.
### Devcontainer
This repository has a Dockerfile and a Docker Compose file. These are Visual Studio Devcontainers.
With the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension you can connect to the Docker Containers.

### First Steps
After your cloned the repo and started the Devcontainer you should run ``npm install`` to install all npm dependencies.

### Local Build
To build the project locally just run ``ng serve`` to start a webserver which serves the frontend.

### Run Tests
To run all unit-tests use ``npm run test``. If you want code coverage you can use the ci-pipeline command which also works locally ``npm run test:ci``. Keep in mind to run the unit-tests you will need a google-chrome/chromium binary in your environment. Which is currently not provided in the Devcontainer.

### Linting
This repository has a [.eslintrc](.eslintrc) file. Run eslint with ``npm run lint``. To Fix Formatting Issues use ``npm run lint:fix``.

### Building Production Containers
If you want your changes on production you have to create a pull-request. After a merge to master the pipeline will build a new docker-image based on the [Dockerfile](Dockerfile).
But if you want to build the image your self for local testing purposes run ``docker build -t skiosa-frontend .`` to build the container and ``docker run -p 80:80 skiosa-frontend`` to start the container locally.

## Service Lead
The frontend ``Service-Lead`` is [Simon Morgenstern](https://github.com/simonmorgenstern).
