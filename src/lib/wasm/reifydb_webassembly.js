/* @ts-self-types="./reifydb_webassembly.d.ts" */

import * as wasm from "./reifydb_webassembly_bg.wasm";
import { __wbg_set_wasm } from "./reifydb_webassembly_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
export {
    JsError, WasmDB
} from "./reifydb_webassembly_bg.js";
