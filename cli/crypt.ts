import { Aes } from "https://deno.land/x/crypto@v0.10.0/aes.ts";
import {
  Cbc,
  Padding,
} from "https://deno.land/x/crypto@v0.10.0/block-modes.ts";
import { encode } from "https://deno.land/std@0.150.0/encoding/base64.ts";

const te = new TextEncoder();

const key = te.encode("SuperDuperSecret");
const data = te.encode("DataToBeEncrypted");
const iv = new Uint8Array(16);

// Ciphers have an internal state, you should therefore create
// separate ciphers for encryption and decryption
const cipher = new Cbc(Aes, key, iv, Padding.PKCS7);
const decipher = new Cbc(Aes, key, iv, Padding.PKCS7);
//
const textDecoder = new TextDecoder();

const encrypted = cipher.encrypt(data);
//console.log(encrypted )
console.log(encode(encrypted));
//Deno.writeFileSync("crypt3.txt",encrypted)
const decrypted = decipher.decrypt(encrypted);

//console.log({decrypted})
const r = textDecoder.decode(decrypted);
console.log({ r });

// deno run --allow-write cli/crypt3.ts
