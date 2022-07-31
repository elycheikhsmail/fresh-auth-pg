/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  deleteCookie,
  setCookie,
} from "https://deno.land/std@0.149.0/http/cookie.ts";

import { hashPassword } from "../utiles/hash_passord.ts";
//
import LoginForm from "../islands/LoginForm.tsx";
import { getUserByName } from "../db_services/users/getone.ts";
import Nav from "../islands/Nav.tsx";
import { IToken } from "../db_services/tokens/interface.ts";
import { createToken } from "../db_services/tokens/add.ts";
import { IMessage } from "../interfaces/mod.ts";



export const handler: Handlers<IMessage> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const resp = await ctx.render({ message: "", isLogin: false });
    return resp;
  },
  async POST(req, ctx) {
    const url = new URL(req.url);
    let resp = await ctx.render({ message: "", isLogin: false });
    const data = await req.formData();
    const username = String(data.get("username"));
    const password = String(data.get("password"));
    const users = await getUserByName(username);
    if (!users) {
      console.log(" db connexion failed or other pb");
      resp = await ctx.render({ message: "", isLogin: false });
      deleteCookie(resp.headers, "token");
    }
    if (users && users.length != 1) {
      console.log("invalide username ");
      resp = await ctx.render({ message: "", isLogin: false });
      deleteCookie(resp.headers, "token");
    }

    if (users && users.length == 1) {
      const passwordInDb = users[0]["password"];
      const passwordHashed = hashPassword(password);
      if (passwordHashed == passwordInDb) {
        const tokenStr = crypto.randomUUID();
        const tokenObj: IToken = {
          userId: users[0].id,
          token: tokenStr,
          expire_date: 1,
          isActive: 1,
        };
        await createToken(tokenObj);
        resp = await ctx.render({ message: "", isLogin: true });
        setCookie(resp.headers, { name: "token", value: tokenStr });
        //http://localhost:3000/login
        //return Response.redirect(`${url.protocol}//${url.host}/protected`,{})
      } else {
        console.log("invalid password");
      }
    }

    return resp;
  },
};

export default function Login(ctx: PageProps<IMessage>) {
  //const loginState : ILoginState = {isLogin:false}
  return (
    <div>
      <Nav isLogin={ctx.data.isLogin} />
      <div>
        <h1>login</h1>
      </div>
      <LoginForm isLogin={ctx.data.isLogin} />
    </div>
  );
}
