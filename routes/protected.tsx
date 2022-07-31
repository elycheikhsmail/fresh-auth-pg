/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.149.0/http/cookie.ts";
import { v4 } from "https://deno.land/std@0.144.0/uuid/mod.ts";
import { getTokens } from "../db_services/tokens/getOne.ts";
import Nav from "../islands/Nav.tsx";

export const handler: Handlers<boolean> = {
  async GET(req, ctx) {
    let resp = await ctx.render(false);
    const cookies = getCookies(req.headers);
    const token = cookies["token"];
    // resp = await ctx.render(false);

    if (token && v4.validate(token)) {
      // I must verify token is in db
      const tokens = await getTokens(token);
      if (tokens && tokens.length == 1) {
        resp = await ctx.render(true);
      }
    }

    return resp;
  },
};

export default function Login(data: PageProps) {
  if (data.data) {
    return (
      <div>
        <Nav isLogin={true} />
        <div>
          <h1>
            congratulation
          </h1>
          now you can read protected ressouces
        </div>
      </div>
    );
  }
  return (
    <div>
      <Nav isLogin={false} />
      <div>
        <h1>you not auth</h1>
      </div>
    </div>
  );
}
