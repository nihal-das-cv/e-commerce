import { startServer } from "./server";
import { beforeAll, afterAll, it, expect } from "vitest";

let server: any;
let baseUrl: string;

beforeAll(() => {
  server = startServer();

  baseUrl = `http://localhost:3000`;
});

afterAll(() => {
  server.close();
});

it("should respond to health check", async () => {
  const res = await fetch(`${baseUrl}/api/auth/`);
  expect(res.status).toBe(200);
});
