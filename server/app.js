import express from "express";
import routes from "./routes";
import logger from "morgan";
import CookieParser from "cookie-parser";
import BodyParser from "body-parser";
import Api from "./utils/api";

let app = express();

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
  let status = err.status || 500;
  res.status(status);
  res.send(Api.response(status, {
      message: err.message,
      error: (app.get('env') === 'dev') ? err : {}
  }));
});

export default app;
