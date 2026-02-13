import fetchify from "./fetchify.js";

const api = fetchify.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});