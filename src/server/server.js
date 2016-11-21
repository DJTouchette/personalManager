
    // ============= Making Server ============= //
    // ========================================= //

    import express from 'express';

    // ======= Applying all middleware ========== //
    // ========================================= //
    import applyMiddleware from './middleware.js';

    // ======= Enviroment variables ============= //
    // ========================================= //
    import env from 'node-env-file';

    // import process from 'process';

    // ======= All configs live here ============ //
    // ========================================= //
    import config from '../config/index.js';

    // ============== Routes ==================== //
    // ========================================= //
    import testRoute from '../routes/index.js';

    const enviroment = env('./.env');

    const app = express();
    const port = process.env.PORT || 8080;

    // ======= Applies all imports ============== //
    // ========================================= //
    export default function makeServer() {
      applyMiddleware(app);
      config(enviroment, app);
      testRoute(app, port);
      app.listen(port, () => {
        console.log('Listening on port: ' + port);
      });

      return app;
    }