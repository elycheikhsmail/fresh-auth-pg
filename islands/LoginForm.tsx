/** @jsx h */
import { h } from "preact"; 
import { ILoginState } from "../interfaces/mod.ts";

 
export default function (props: ILoginState) {
  const { isLogin } = props;

  addEventListener("load", () => {
    if (isLogin) {
      location.assign(`${location.protocol}//${location.host}/protected`);
    }
  });

  return (
    <form method="POST">
      <label htmlFor="">username</label> <br />
      <input type="text" name="username" /> <br />

      <label htmlFor="">
        password
      </label>
      <br />
      <input type="password" name="password" /> <br />

      <br />

      <input type="submit" value="login" />
    </form>
  );
}
