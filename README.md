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

## GQL Development Guides

### Schema change

1. Edit GQL schema (*.graphql)
2. Open a terminal and run the backend app

    ```bash
    cd siras-manager-be/
    JWT_SECRET="XXX" yarn dev
    ```

3. Open another terminal and run the following command to generate typescript definitions based on gql schema

    ```bash
    cd siras-manager-be/
    yarn gen
    ```

4. Commit the schema changes

    ```bash
    cd siras-manager-be/
    git add src/typeDefs/ src/generated/
    git commit -sm "feat: impl gql schema for xxx"
    ```

5. Implement the corresponding resolvers (under `siras-manager-be/src/resolvers/`) and commit changes

6. Run the following command to update typescript definitions for the front end project (note that the backend server should be running in another terminal)

    ```bash
    cd siras-manager-fe/
    yarn gen
    ```

7. Commit the frontend type definition changes

    ```bash
    cd siras-manager-fe/
    git add src/types.ts
    git commit -sm "chore: update fe type defs"
    ```
