import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.get("/project/:projectId", (c) => {
  return c.json({ message: `Project ID: ${c.req.param("projectId")}` });
});

app.get

export const GET = handle(app);