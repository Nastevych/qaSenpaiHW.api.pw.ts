import { APIRequestContext } from "@playwright/test";
import { Article } from "./ArticleType";

export class ArticlesController {
  private request: APIRequestContext;
  static baseUrl = "https://conduit-api.learnwebdriverio.com";

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  static printBaseUrl() {
    console.log(this.baseUrl);
  }

  async getArticles(offset: number, limit: number) {
    const response = await this.request.get(
      `/api/articles?offset=${offset}&limit=${limit}`
    );

    return response;
  }

  async getArticle(slug: string) {
    const response = await this.request.get(`/api/articles/${slug}`);

    return response;
  }

  async createArticle(articleBody: Article) {
    const requestBody = {
      article: articleBody,
    };

    const response = await this.request.post("/api/articles", {
      data: requestBody,
    });

    return response;
  }
}
