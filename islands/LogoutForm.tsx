/** @jsx h */
import { h } from "preact"; 
import { ILoginState } from "../interfaces/mod.ts";

 
export default function (props: ILoginState) {
  const { isLogin } = props;
  addEventListener("load", () => {
    if (!isLogin) {
      location.assign(`${location.protocol}//${location.host}/login`);
    }
  });
  return (
    <form method="POST">
      <input type="submit" value="logout" />
    </form>
  );
}
