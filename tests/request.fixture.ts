import { test as base, expect } from "@playwright/test";

export { expect };

type MyFixture = {
  authData: { email?: string; password?: string };
};

export const test = base.extend<MyFixture>({
  authData: {},
  request: async ({ playwright, request, authData }, use) => {
    const authRequestBody = {
      user: { email: authData.email, password: process.env.PASSWORD! },
    };

    console.log(authRequestBody);

    const authResponse = await request.post("/api/users/login", {
      data: authRequestBody,
      failOnStatusCode: true,
    });

    const authResponseJson = await authResponse.json();
    const token = authResponseJson.user.token;

    const apiContext = await playwright.request.newContext({
      extraHTTPHeaders: {
        Authorization: "Token " + token,
      },
    });

    use(apiContext);
  },
});
