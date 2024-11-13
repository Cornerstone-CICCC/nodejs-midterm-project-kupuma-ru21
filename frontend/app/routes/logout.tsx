import { redirect } from "@remix-run/react";
import { tokenCookie } from "../cookies.server";

export async function action() {
  return redirect("/login", {
    // REF: https://sergiodxa.com/tutorials/delete-a-cookie-using-remix-cookie-helpers
    headers: { "Set-Cookie": await tokenCookie.serialize("", { maxAge: 1 }) },
  });
}
