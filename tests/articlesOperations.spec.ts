import { test, expect } from "./request.fixture";
import { ArticlesController } from "../controllers/Articles/ArticlesController";
import { usersData } from "../credentials";
import { articleContentTestData } from "./articlesTest.data";

test.use({
  authData: {
    email: usersData.admin.email,
    password: usersData.admin.password,
  },
});

test("test static method", async ({}) => {
  ArticlesController.printBaseUrl();
  console.log(ArticlesController.baseUrl);
});

test("MQA-125151 create article - it should created", async ({ request }) => {
  const articlesController = new ArticlesController(request);

  const response = await articlesController.createArticle(
    articleContentTestData
  );

  expect(response.status()).toBe(200);
});

test("MQA-125151 get article - it should exist", async ({ request }) => {
  const articlesController = new ArticlesController(request);

  const response = await articlesController.getArticle("");

  expect(response.status()).toBe(200);
});

test("MQA-125151 get articles - it should return 10 article", async ({
  request,
}) => {
  const articlesController = new ArticlesController(request);

  const response = await articlesController.getArticles(0, 10);

  expect(response.status()).toBe(200);
});
