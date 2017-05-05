import express from "express";
import routes from "./routes";
import logger from "morgan";
import CookieParser from "cookie-parser";
import BodyParser from "body-parser";
import Api from "./utils/api";

let app = express();

// set view template engine
app.set('view engine', 'pug');
app.set('views', './views');

// other settings
app.use(logger('dev'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use(CookieParser());

for (var route in routes) {
  app.use(route, routes[route]);
}

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  let status = err.status || Api.Codes.SERVER_ERROR;
  res.status(status);
  res.send(Api.toResponse(status, {
      message: err.message,
      error: (app.get('env') === 'dev') ? err : {}
  }));
});

export default app;
