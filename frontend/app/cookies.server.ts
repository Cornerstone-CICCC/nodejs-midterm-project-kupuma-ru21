import { createCookie } from "@remix-run/node";

export const tokenCookie = createCookie("token", { maxAge: 60 * 60 * 24 * 7 });
