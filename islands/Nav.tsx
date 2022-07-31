/** @jsx h */
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { ILoginState } from "../interfaces/mod.ts";

export default function (props: ILoginState) {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="/protected">protected</a>
        </li>
        {!props.isLogin &&
          (
            <Fragment>
              <li>
                <a href="/login">login</a>
              </li>
              <li>
                <a href="/register">register</a>
              </li>
            </Fragment>
          )}

        {props.isLogin &&
          (
            <Fragment>
              <li>
                <a href="/logout">logout</a>
              </li>
            </Fragment>
          )}
      </ul>
    </nav>
  );
}
