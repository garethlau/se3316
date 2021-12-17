# Lab 5

## Running the Server

### Development

To run the server locally in development, first create a `.env` file. An example environment file, `.env.example` has been provided.

Next, run `yarn start` or `npm run start`.

You should see the following output:

```
$ yarn start
yarn run v1.22.11
$ nodemon src/index.ts
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/index.ts`
Server Listening on port 5000
```

### Production

The server is written in TypeScript. To transpile to JavaScript, run `yarn build`. This will generate a `/dist` directory. Then run `node dist/src/index.js`. Ensure that the `index.js` script is executed from the top level directory to use the `.env`.

## Endpoints

### `/api/jobs?city={city}`

Retrieve all jobs that have the city in the title. Example: `/api/jobs?city=calgary`

### `/api/jobs/categories`

Retrieve list of all categories and the number of times each category is mentioned.

### `/api/jobs/categories/:categoryName`

Retrieve all the jobs with a given category. Example: `/api/jobs/categories/react`
