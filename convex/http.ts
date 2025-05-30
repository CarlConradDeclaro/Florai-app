import { httpRouter, HttpRouter } from "convex/server";
import { helloHandler } from "./api";

const http = httpRouter();

http.route({
  path: "/hello",
  method: "GET",
  handler: helloHandler,
});

export default http;
