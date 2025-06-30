export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";
export const createBackendRoute = (routes: string[] | string): string => {
  if (typeof routes === "string") {
    return [BACKEND_URL, routes].join("/");
  } else if (Array.isArray(routes)) {
    return [BACKEND_URL, ...routes].join("/");
  }

  throw new TypeError(
    "createBackendRoute only accepts a string or an array of strings.",
  );
};
