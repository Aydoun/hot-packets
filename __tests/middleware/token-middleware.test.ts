import { Request } from "jest-express/lib/request";
import tokenMiddleware from "../../src/middleware/token-middleware";

let next: any;
const res: any = {
  send: jest.fn(),
};

describe("Request Token Middleware", () => {
  beforeEach(() => {
    next = jest.fn();
  });

  afterEach(() => {
    next.mockClear();
  });

  test("It Should Forward an Error when the token is not provided", () => {
    const request: any = new Request("/packets");

    expect(next).not.toBeCalled();
    tokenMiddleware(request, res, next);

    expect(next).toBeCalled();
    expect(next).toHaveBeenCalledWith(new Error("No Token Provided"));
  });

  test("It Should Forward an Error when the token is not valid", () => {
    const request: any = new Request("/packets?sort=desc", {
      headers: {
        "x-api-key": "12345",
      },
    });

    expect(next).not.toBeCalled();
    tokenMiddleware(request, res, next);

    expect(next).toBeCalled();
    expect(next).toHaveBeenCalledWith(new Error("Invalid Token"));
  });

  test("It Should Continue the middleware chain when token is valid", async () => {
    const request: any = new Request("/packets", {
      headers: {
        "x-api-key": process.env.FAKE_TOKEN,
      },
    });

    await tokenMiddleware(request, res, next);

    expect(next).toBeCalled();
    expect(next).toHaveBeenCalledWith();
  });
});
