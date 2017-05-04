import bcrypt from "bcrypt-nodejs";

export function generateHashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

export function validPassword(input, password) {
  return bcrypt.compareSync(input, password);
}
