import debug from "debug";

let log = debug('server');

export function printProps(obj) {
  let names = [];
  for (var name in obj) {
    names.push(name);
  }
  log(obj + ': [' + names.join(',') + ']');
}


export default log;
