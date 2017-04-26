

let Api = new class {
  response(status, data) {
    return JSON.stringify({
      status,
      data,
    });
  }

};

export default Api;
