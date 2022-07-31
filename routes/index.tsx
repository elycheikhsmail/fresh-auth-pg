/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import {
  deleteCookie,
  setCookie,
} from "https://deno.land/std@0.149.0/http/cookie.ts";

import { hashPassword } from "../utiles/hash_passord.ts";
//
import { getUserByName } from "../db_services/users/getone.ts";
import Nav from "../islands/Nav.tsx";
import { IToken } from "../db_services/tokens/interface.ts";
import { createToken } from "../db_services/tokens/add.ts";

interface IMessage {
  message: string;
  isLogin: boolean;
}

export default function Home() {
  return (
    <div>
      <Nav isLogin={false} />
      <div>
        <h1>home page</h1>
      </div>
      <div>
        this is demo/example for how authentificate fresh web site users, I use
        postgresql as database and I use cookies stategie for authentificate to
        read and set user state(in http request and response objects) instead of
        using jwt, the user state is managed server side first.<br />

        for more details you visite 
         <a href="https://github.com/elycheikhsmail/fresh-auth-pg" target="_blank">
          https://github.com/elycheikhsmail/fresh-auth-pg</a> <br />

        for getting quick idea about this demo just test this site ...link to
        the site <a href="https://elycheikhsmail-fresh1.deno.dev/" target="_blank">
        https://elycheikhsmail-fresh1.deno.dev/
          </a> ( register, access protected ressources,login, home ) <br />
        I made it without any style to let you focus on login and not the ui
      </div>
    </div>
  );
}
