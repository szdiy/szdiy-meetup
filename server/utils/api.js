

let Api = new class {
  Codes = {
    OK: 200,
    AUTH_NEEDED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,

    FIELD_INVALID: 601, // error while validate parameters
    SAVE_ERROR: 605, // error while saving to db
        
  };

  toResponse(status, data) {
    return JSON.stringify({
      status,
      data,
    });
  }

};

export default Api;
