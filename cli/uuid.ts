//import { v4 } from "https://deno.land/std@$STD_VERSION/uuid/mod.ts";

//import * as mod from "https://deno.land/std@0.144.0/uuid/mod.ts";

import { v4 } from "https://deno.land/std@0.144.0/uuid/mod.ts";

// Generate a v4 UUID. For this we use the browser standard `crypto.randomUUID`
// function.
const myUUID = crypto.randomUUID();
console.log(myUUID);

// Validate the v4 UUID.
const isValid = v4.validate(myUUID);
console.log({ isValid });

// deno run cli/uuid.ts
