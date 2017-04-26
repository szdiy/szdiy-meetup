import http from 'http';
import app from  "../app";
import debug from "../utils/debug";
import models from "../models";
import configuration from "../config/config";

let env = process.env.ENV || 'dev';
let config = configuration[env];

let port = (config.site && Number(config.site.port)) || 3000;
let server = http.createServer(app);
app.set('port', port);

models.sequelize.sync().then(()=> {

  server.listen(port, ()=> {
    debug('Express server start listening port', port);
  });

  server.on('error', onError);
  server.on('listening', onListening); 

});


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
