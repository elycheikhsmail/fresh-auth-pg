/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  deleteCookie,
  getCookies,
} from "https://deno.land/std@0.149.0/http/cookie.ts";
import { removeToken } from "../db_services/tokens/remove.ts";
import { IMessage } from "../interfaces/mod.ts";
 
import Nav from "../islands/Nav.tsx";
import Logout from "../islands/LogoutForm.tsx";

export const handler:Handlers<IMessage> = {
  async GET(_req, ctx) {
    const resp = await ctx.render({ message: "", isLogin: true});
    return resp;
  },
  async POST(req, ctx) {
    const resp = await ctx.render({ message: "", isLogin: false });
    const cookies = getCookies(req.headers);
    const token = cookies["token"];
    if (token) {
      // I must verify token is valid v4/uuid befor trying to remove it from db
      await removeToken(token);
      deleteCookie(resp.headers, "token");
      return resp;
    }

    return resp;
  },
};

export default function Login(ctx: PageProps<IMessage>) {
  return (
    <div>
      <Nav isLogin={ctx.data.isLogin} />
      <div>
        <h1>logout</h1>
      </div>
      <Logout isLogin={ctx.data.isLogin}/>
    </div>
  );
}
