
    import bodyParser from 'body-parser';
    import cookieParser from 'cookie-parser';
    import morgan from 'morgan';
    import expressValidator from 'express-validator';

    export default function applyMiddleware(app) {
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
      app.use(expressValidator());
      app.use(cookieParser());

      if (process.env.DEV) {
        app.use(morgan('dev'));
      }
    }