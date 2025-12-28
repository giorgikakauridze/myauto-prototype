export class HttpError extends Error {
  status: number;
  body: string;

  constructor(status: number, body: string) {
    super(`HTTP ${status}: ${body.slice(0, 200)}`);
    this.status = status;
    this.body = body;
  }
}

export async function fetchData<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers || {}),
      },
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new HttpError(res.status, text || res.statusText);
    }
    return res.json() as Promise<T>;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    console.error(error);
    throw new Error((error as Error)?.message ?? "Something went wrong");
  }
}
