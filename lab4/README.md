# Running Application on VM (GCP)

The client application is a TypeScript react app. Running the build script within the client directory will generate a "build" folder.

The "build" folder for the client application is served by the server in production.

The server is written in TypeScript and must be transpiled to JavaScript before executing the program with NodeJS. To build the server, run: `yarn build` in the server directory or run `yarn build-server` in the top-level directory. This will produce a `dist` folder in the server directory.

To run the server, execute `node dist/src/index.js` from the `/server` directory. The script must be executed from the `/server` directory as a environment file `.env` is located there that defines the listening port.
