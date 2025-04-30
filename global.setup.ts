import { FullConfig } from "@playwright/test";
import { UserController } from "./controllers/Users/UserController";
import { request, expect } from "@playwright/test";
import { usersData } from "./credentials";

export default async function globalSetup(config: FullConfig) {
  const apiContext = await request.newContext();

  const userController = new UserController(apiContext);

  try {
    const requestBody = {
      email: usersData.admin.email,
      password: usersData.admin.password,
      username: usersData.admin.username,
    };

    const response = await userController.registerUser(requestBody);

    expect(response.status()).toBe(200);
  } catch (e) {
    console.log("User already exist");
  }
}
