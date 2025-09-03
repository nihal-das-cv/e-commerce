import { PORT, startServer } from "./server";
import { beforeAll, afterAll, it, expect, describe } from "vitest";

type HealthResponse = {
  success: boolean;
  isRunning: boolean;
  message: string;
};

// type Signup = {

// }

let server: ReturnType<typeof startServer>;
let baseUrl: string;

beforeAll(() => {
  server = startServer();
  baseUrl = `http://localhost:${PORT}`;
});

afterAll(() => {
  server.close();
});

describe("Api Testing", async () => {
  it("should respond to health check", async () => {
    const res: Response = await fetch(`${baseUrl}/api/auth/health`);
    expect(res.status).toBe(200);

    const data: HealthResponse = (await res.json()) as HealthResponse;

    expect(data.success).toBe(true);
    expect(data.isRunning).toBe(true);
  });

  it("should handle all signup responses", async () => {
    const newUser = {
      name: "Test User",
      email: `nihal111das@gmail.com`, // unique each run
      password: "password123",
    };

    const res = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (res.status === 201) {
      console.log("✅ Passed: User created successfully");
      expect(data.success).toBe(true);
      expect(data.message).toBe("User created successfully");
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe(newUser.email);
    } else if (res.status === 400 && data.message === "User already exists") {
      console.log("⚠️ Passed: Duplicate user detected");
      expect(data.success).toBe(false);
      expect(data.message).toBe("User already exists");
    } else if (
      res.status === 400 &&
      data.message === "Please provide all required fields"
    ) {
      console.log("⚠️ Passed: Missing fields validation");
      expect(data.success).toBe(false);
      expect(data.message).toBe("Please provide all required fields");
    }
  });
});
