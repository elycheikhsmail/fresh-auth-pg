import { Aes } from "https://deno.land/x/crypto@v0.10.0/aes.ts";
import {
  Cbc,
  Padding,
} from "https://deno.land/x/crypto@v0.10.0/block-modes.ts";
import { encode } from "https://deno.land/std@0.150.0/encoding/base64.ts";

/*
take password plain text
hash it
and return hash
 */
export function hashPassword(password: string) {
  const secretKeyStr = Deno.env.get("SECRET_KEY") || "";
  const textEncoder = new TextEncoder();
  const key = textEncoder.encode(secretKeyStr);
  const data = textEncoder.encode(password);
  const iv = new Uint8Array(16);
  const cipher = new Cbc(Aes, key, iv, Padding.PKCS7);
  const encrypted = cipher.encrypt(data);
  return encode(encrypted);
}

// const r = hashPassword("ely");
// console.log(r)

// export SECRET_KEY=SuperDuperSecret
// deno run --allow-env utiles/hash_passord.ts
