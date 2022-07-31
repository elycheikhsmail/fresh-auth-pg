/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  deleteCookie,
  setCookie,
} from "https://deno.land/std@0.149.0/http/cookie.ts";
import { IToken } from "../db_services/tokens/interface.ts";
import { createToken } from "../db_services/tokens/add.ts";
import { hashPassword } from "../utiles/hash_passord.ts";

//
import Nav from "../islands/Nav.tsx";
import ResgisterForm from "../islands/LoginForm.tsx";
import { createUser } from "../db_services/users/add.ts";
import { getUserByName } from "../db_services/users/getone.ts";

import { ILoginState } from "../interfaces/mod.ts";
interface IMessage {
  message: string;
  isLogin: boolean;
}

export const handler: Handlers<IMessage> = {
  async GET(_req, ctx) {
    const resp = await ctx.render({ message: "", isLogin: false });
    return resp;
  },
  async POST(req, ctx) {
    let resp: Response;
    let userId = -1;
    let tokenStr = "";
    const data = await req.formData();
    const username = String(data.get("username"));
    const password = String(data.get("password"));
    const passwordHashed = hashPassword(password);
    let isSaved = false;
    // save in db
    try {
      await createUser({ username, password: passwordHashed });
      console.log("create user");
      const users = await getUserByName(username);
      if (users) {
        userId = users[0].id;
      }

      tokenStr = crypto.randomUUID();
      const tokenObj: IToken = {
        userId,
        token: tokenStr,
        expire_date: 1,
        isActive: 1,
      };

      await createToken(tokenObj);
      isSaved = true;
    } catch (error) {
      console.log(error);
    }

    if (isSaved) {
      resp = await ctx.render({ message: "", isLogin: true });
      setCookie(resp.headers, { name: "token", value: tokenStr });
    } else {
      resp = await ctx.render({ message: "useralready exist", isLogin: false });
      deleteCookie(resp.headers, "token");
    }

    return resp;
  },
};

export default function Register(ctx: PageProps<IMessage>) {
  return (
    <div>
      <Nav isLogin={ctx.data.isLogin} />
      <div>
        <h1>register</h1>
      </div>
      <ResgisterForm isLogin={ctx.data.isLogin} />
    </div>
  );
}
