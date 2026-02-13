class Fetchify {
  config={
    headers = {
      'Content-Type':"application/json"
    }
  }
  constructor(config) {
    this.config = config;
  }
}

function create(config) {
  return new Fetchify(config);
}

export default {
  create,
};
