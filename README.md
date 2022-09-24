# IKW Edge Generic

A gallery of IKW edge services

## Installation

1. Download

    ```bash
    git clone git@github.com:tom6311tom6311/ikw-edge-generic.git
    ```

2. Install prerequisites

    - Latest [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com), and [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
    - Latest [Docker](https://www.docker.com/get-started/) & [Docker compose](https://docs.docker.com/compose/install/)

3. (First-time only) Create and configure .env file

    ```bash
    cp env.default .env
    ```

    - The config `INFLUX_TOKEN` will be set in the following steps
    - Please ask the team members for the config `JWT_SECRET`

## Dev Setup

### If you want to develop front-end only

1. Edit the frontend app configuration file (`siras-manager-fe/src/const/AppConfig.ts`) to point BACKEND URL to the ever-running server:

    - Please ask the team members for the backend server URL

2. Open a terminal and run the frontend app

    ```bash
    cd siras-manager-fe/
    yarn start
    ```

### If you want to develop both front-end and backend-end

1. Open a terminal and run the backend app

    ```bash
    cd siras-manager-be/
    JWT_SECRET="XXX" yarn dev
    ```

2. Open another terminal and run the frontend app

    ```bash
    cd siras-manager-fe/
    REACT_APP_BACKEND_PORT=4000 yarn start
    ```

## Deployment

1. Launch services

    ```bash
    docker-compose up
    ```

2. (First-time only) Configure InfluxDB

3. (After pulling new code) Re-build services

    ```bash
    docker-compose up --build -d
    ```
