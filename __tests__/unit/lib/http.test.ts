import { fetchData, HttpError } from "@/lib/http";

describe("lib/http fetchData", () => {
  test("returns json on success", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hello: "world" }),
    });
    global.fetch = mockFetch as unknown as typeof fetch;

    await expect(fetchData("https://example.com")).resolves.toEqual({
      hello: "world",
    });
  });

  test("throws HttpError on non-ok response", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "oops",
    });
    global.fetch = mockFetch as unknown as typeof fetch;

    await expect(fetchData("https://example.com")).rejects.toBeInstanceOf(
      HttpError
    );
  });

  test("wraps unknown errors", async () => {
    const err = new Error("network down");
    const mockFetch = jest.fn().mockRejectedValue(err);
    global.fetch = mockFetch as unknown as typeof fetch;

    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    await expect(fetchData("https://example.com")).rejects.toThrow(
      "network down"
    );
    spy.mockRestore();
  });
});
