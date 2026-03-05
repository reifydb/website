let O, R;
let __tla = (async () => {
  const L = "/assets/reifydb_webassembly_bg-4qj8gf46.wasm", D = async (e = {}, t) => {
    let _;
    if (t.startsWith("data:")) {
      const r = t.replace(/^data:.*?base64,/, "");
      let n;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") n = Buffer.from(r, "base64");
      else if (typeof atob == "function") {
        const c = atob(r);
        n = new Uint8Array(c.length);
        for (let a = 0; a < c.length; a++) n[a] = c.charCodeAt(a);
      } else throw new Error("Cannot decode base64-encoded data URL");
      _ = await WebAssembly.instantiate(n, e);
    } else {
      const r = await fetch(t), n = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && n.startsWith("application/wasm")) _ = await WebAssembly.instantiateStreaming(r, e);
      else {
        const c = await r.arrayBuffer();
        _ = await WebAssembly.instantiate(c, e);
      }
    }
    return _.instance.exports;
  };
  O = class {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, we.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      s.__wbg_jserror_free(t, 0);
    }
    get message() {
      let t, _;
      try {
        const r = s.jserror_message(this.__wbg_ptr);
        return t = r[0], _ = r[1], p(r[0], r[1]);
      } finally {
        s.__wbindgen_free(t, _, 1);
      }
    }
  };
  Symbol.dispose && (O.prototype[Symbol.dispose] = O.prototype.free);
  R = class {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, E.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      s.__wbg_wasmdb_free(t, 0);
    }
    admin(t) {
      const _ = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, n = s.wasmdb_admin(this.__wbg_ptr, _, r);
      if (n[2]) throw i(n[1]);
      return i(n[0]);
    }
    adminWithParams(t, _) {
      const r = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f, c = s.wasmdb_adminWithParams(this.__wbg_ptr, r, n, _);
      if (c[2]) throw i(c[1]);
      return i(c[0]);
    }
    command(t) {
      const _ = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, n = s.wasmdb_command(this.__wbg_ptr, _, r);
      if (n[2]) throw i(n[1]);
      return i(n[0]);
    }
    commandWithParams(t, _) {
      const r = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f, c = s.wasmdb_commandWithParams(this.__wbg_ptr, r, n, _);
      if (c[2]) throw i(c[1]);
      return i(c[0]);
    }
    constructor() {
      const t = s.wasmdb_new();
      if (t[2]) throw i(t[1]);
      return this.__wbg_ptr = t[0] >>> 0, E.register(this, this.__wbg_ptr, this), this;
    }
    query(t) {
      const _ = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, n = s.wasmdb_query(this.__wbg_ptr, _, r);
      if (n[2]) throw i(n[1]);
      return i(n[0]);
    }
    queryWithParams(t, _) {
      const r = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f, c = s.wasmdb_queryWithParams(this.__wbg_ptr, r, n, _);
      if (c[2]) throw i(c[1]);
      return i(c[0]);
    }
  };
  Symbol.dispose && (R.prototype[Symbol.dispose] = R.prototype.free);
  function B(e, t) {
    const _ = A(t), r = d(_, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f;
    g().setInt32(e + 4, n, true), g().setInt32(e + 0, r, true);
  }
  function P(e) {
    return e === null;
  }
  function k(e) {
    return e === void 0;
  }
  function M(e, t) {
    const _ = t, r = typeof _ == "string" ? _ : void 0;
    var n = x(r) ? 0 : d(r, s.__wbindgen_malloc, s.__wbindgen_realloc), c = f;
    g().setInt32(e + 4, c, true), g().setInt32(e + 0, n, true);
  }
  function U(e, t) {
    throw new Error(p(e, t));
  }
  function V() {
    return l(function(e, t) {
      return e.call(t);
    }, arguments);
  }
  function q(e, t) {
    e.clearInterval(t);
  }
  function z(e, t) {
    let _, r;
    try {
      _ = e, r = t, console.error(p(e, t));
    } finally {
      s.__wbindgen_free(_, r, 1);
    }
  }
  function C() {
    return l(function(e, t) {
      globalThis.crypto.getRandomValues(I(e, t));
    }, arguments);
  }
  function $() {
    return l(function(e, t) {
      globalThis.crypto.getRandomValues(I(e, t));
    }, arguments);
  }
  function v(e) {
    let t;
    try {
      t = e instanceof Window;
    } catch {
      t = false;
    }
    return t;
  }
  function N(e) {
    return e.length;
  }
  function G(e) {
    console.log(e);
  }
  function J() {
    return new Object();
  }
  function H() {
    return new Array();
  }
  function X() {
    return new Error();
  }
  function Y(e, t) {
    return new Function(p(e, t));
  }
  function K(e) {
    return new Uint8Array(e >>> 0);
  }
  function Q() {
    return l(function() {
      return Date.now();
    }, arguments);
  }
  function Z() {
    return Date.now();
  }
  function ee(e, t) {
    return e.push(t);
  }
  function te() {
    return l(function(e, t, _) {
      return e.setInterval(t, _);
    }, arguments);
  }
  function ne() {
    return l(function(e, t, _) {
      return e.setTimeout(t, _);
    }, arguments);
  }
  function _e() {
    return l(function(e, t, _) {
      return Reflect.set(e, t, _);
    }, arguments);
  }
  function re(e, t, _) {
    e.set(I(t, _));
  }
  function se(e, t) {
    const _ = t.stack, r = d(_, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f;
    g().setInt32(e + 4, n, true), g().setInt32(e + 0, r, true);
  }
  function oe() {
    const e = typeof global > "u" ? null : global;
    return x(e) ? 0 : y(e);
  }
  function ce() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return x(e) ? 0 : y(e);
  }
  function ae() {
    const e = typeof self > "u" ? null : self;
    return x(e) ? 0 : y(e);
  }
  function ie() {
    const e = typeof window > "u" ? null : window;
    return x(e) ? 0 : y(e);
  }
  function be() {
    return l(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function fe(e, t) {
    return me(e, t, s.wasm_bindgen__closure__destroy__hb496c74d4b5d2fe7, ge);
  }
  function de(e) {
    return e;
  }
  function le(e, t) {
    return p(e, t);
  }
  function ue() {
    const e = s.__wbindgen_externrefs, t = e.grow(4);
    e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
  }
  function ge(e, t) {
    s.wasm_bindgen__convert__closures_____invoke__hb278d5bbbfdc8d45(e, t);
  }
  const we = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_jserror_free(e >>> 0, 1)), E = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_wasmdb_free(e >>> 0, 1));
  function y(e) {
    const t = s.__externref_table_alloc();
    return s.__wbindgen_externrefs.set(t, e), t;
  }
  const F = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => e.dtor(e.a, e.b));
  function A(e) {
    const t = typeof e;
    if (t == "number" || t == "boolean" || e == null) return `${e}`;
    if (t == "string") return `"${e}"`;
    if (t == "symbol") {
      const n = e.description;
      return n == null ? "Symbol" : `Symbol(${n})`;
    }
    if (t == "function") {
      const n = e.name;
      return typeof n == "string" && n.length > 0 ? `Function(${n})` : "Function";
    }
    if (Array.isArray(e)) {
      const n = e.length;
      let c = "[";
      n > 0 && (c += A(e[0]));
      for (let a = 1; a < n; a++) c += ", " + A(e[a]);
      return c += "]", c;
    }
    const _ = /\[object ([^\]]+)\]/.exec(toString.call(e));
    let r;
    if (_ && _.length > 1) r = _[1];
    else return toString.call(e);
    if (r == "Object") try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
    return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : r;
  }
  function I(e, t) {
    return e = e >>> 0, m().subarray(e / 1, e / 1 + t);
  }
  let u = null;
  function g() {
    return (u === null || u.buffer.detached === true || u.buffer.detached === void 0 && u.buffer !== s.memory.buffer) && (u = new DataView(s.memory.buffer)), u;
  }
  function p(e, t) {
    return e = e >>> 0, ye(e, t);
  }
  let W = null;
  function m() {
    return (W === null || W.byteLength === 0) && (W = new Uint8Array(s.memory.buffer)), W;
  }
  function l(e, t) {
    try {
      return e.apply(this, t);
    } catch (_) {
      const r = y(_);
      s.__wbindgen_exn_store(r);
    }
  }
  function x(e) {
    return e == null;
  }
  function me(e, t, _, r) {
    const n = {
      a: e,
      b: t,
      cnt: 1,
      dtor: _
    }, c = (...a) => {
      n.cnt++;
      const b = n.a;
      n.a = 0;
      try {
        return r(b, n.b, ...a);
      } finally {
        n.a = b, c._wbg_cb_unref();
      }
    };
    return c._wbg_cb_unref = () => {
      --n.cnt === 0 && (n.dtor(n.a, n.b), n.a = 0, F.unregister(n));
    }, F.register(c, n, n), c;
  }
  function d(e, t, _) {
    if (_ === void 0) {
      const b = h.encode(e), w = t(b.length, 1) >>> 0;
      return m().subarray(w, w + b.length).set(b), f = b.length, w;
    }
    let r = e.length, n = t(r, 1) >>> 0;
    const c = m();
    let a = 0;
    for (; a < r; a++) {
      const b = e.charCodeAt(a);
      if (b > 127) break;
      c[n + a] = b;
    }
    if (a !== r) {
      a !== 0 && (e = e.slice(a)), n = _(n, r, r = a + e.length * 3, 1) >>> 0;
      const b = m().subarray(n + a, n + r), w = h.encodeInto(e, b);
      a += w.written, n = _(n, r, a, 1) >>> 0;
    }
    return f = a, n;
  }
  function i(e) {
    const t = s.__wbindgen_externrefs.get(e);
    return s.__externref_table_dealloc(e), t;
  }
  let S = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  S.decode();
  const he = 2146435072;
  let T = 0;
  function ye(e, t) {
    return T += t, T >= he && (S = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), S.decode(), T = t), S.decode(m().subarray(e, e + t));
  }
  const h = new TextEncoder();
  "encodeInto" in h || (h.encodeInto = function(e, t) {
    const _ = h.encode(e);
    return t.set(_), {
      read: e.length,
      written: _.length
    };
  });
  let f = 0, s;
  function pe(e) {
    s = e;
  }
  URL = globalThis.URL;
  const o = await D({
    "./reifydb_webassembly_bg.js": {
      __wbg_new_8a6f238a6ece86ea: X,
      __wbg_stack_0ed75d68575b0f3c: se,
      __wbg_error_7534b8e9a36f1ab4: z,
      __wbg_getRandomValues_2a91986308c74a93: C,
      __wbg_instanceof_Window_ed49b2db8df90359: v,
      __wbg_clearInterval_c75df0651e74fbb8: q,
      __wbg_setTimeout_eff32631ea138533: ne,
      __wbg_setInterval_612728cce80dfecf: te,
      __wbg_log_6b5ca2e6124b2808: G,
      __wbg_new_3eb36ae241fe6f44: H,
      __wbg_new_361308b2356cecd0: J,
      __wbg_new_no_args_1c7c842f08d00ebb: Y,
      __wbg_length_32ed9a279acd054c: N,
      __wbg_new_with_length_a2c39cbe88fd8ff1: K,
      __wbg_set_cc56eefd2dd91957: re,
      __wbg_now_a3af9a2f4bbaa4d1: Z,
      __wbg_push_8ffdcb2063340ba5: ee,
      __wbg_static_accessor_GLOBAL_THIS_e628e89ab3b1c95f: ce,
      __wbg_call_389efe28435a9388: V,
      __wbg_static_accessor_SELF_a621d3dfbb60d0ce: ae,
      __wbg_static_accessor_GLOBAL_12837167ad935116: oe,
      __wbg_static_accessor_WINDOW_f8727f0cf888e0bd: ie,
      __wbg_stringify_8d1cc6ff383e8bae: be,
      __wbg_set_6cb8631f80447a67: _e,
      __wbg_getRandomValues_9b655bdd369112f2: $,
      __wbg_now_37839916ec63896b: Q,
      __wbg___wbindgen_throw_be289d5034ed271b: U,
      __wbg___wbindgen_is_null_ac34f5003991759a: P,
      __wbg___wbindgen_string_get_72fb696202c56729: M,
      __wbg___wbindgen_is_undefined_9e4d92534c42d778: k,
      __wbg___wbindgen_debug_string_0bc8482c6e3508ae: B,
      __wbindgen_init_externref_table: ue,
      __wbindgen_cast_0000000000000001: fe,
      __wbindgen_cast_0000000000000002: de,
      __wbindgen_cast_0000000000000003: le
    }
  }, L), xe = o.memory, We = o.__wbg_wasmdb_free, Se = o.wasmdb_admin, Te = o.wasmdb_adminWithParams, Ae = o.wasmdb_command, Ie = o.wasmdb_commandWithParams, Oe = o.wasmdb_new, Re = o.wasmdb_query, Ee = o.wasmdb_queryWithParams, Fe = o.__wbg_jserror_free, je = o.jserror_message, Le = o.host_log_message, De = o.host_alloc, Be = o.host_free, Pe = o.host_realloc, ke = o.test_alloc, Me = o.test_free, Ue = o.test_log_message, Ve = o.test_realloc, qe = o.test_state_clear, ze = o.test_state_get, Ce = o.test_state_iterator_free, $e = o.test_state_iterator_next, ve = o.test_state_prefix, Ne = o.test_state_range, Ge = o.test_state_remove, Je = o.test_state_set, He = o.wasm_bindgen__closure__destroy__hb496c74d4b5d2fe7, Xe = o.wasm_bindgen__convert__closures_____invoke__hb278d5bbbfdc8d45, Ye = o.__wbindgen_malloc, Ke = o.__wbindgen_realloc, Qe = o.__wbindgen_exn_store, Ze = o.__externref_table_alloc, et = o.__wbindgen_externrefs, tt = o.__wbindgen_free, nt = o.__externref_table_dealloc, j = o.__wbindgen_start, _t = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_table_alloc: Ze,
    __externref_table_dealloc: nt,
    __wbg_jserror_free: Fe,
    __wbg_wasmdb_free: We,
    __wbindgen_exn_store: Qe,
    __wbindgen_externrefs: et,
    __wbindgen_free: tt,
    __wbindgen_malloc: Ye,
    __wbindgen_realloc: Ke,
    __wbindgen_start: j,
    host_alloc: De,
    host_free: Be,
    host_log_message: Le,
    host_realloc: Pe,
    jserror_message: je,
    memory: xe,
    test_alloc: ke,
    test_free: Me,
    test_log_message: Ue,
    test_realloc: Ve,
    test_state_clear: qe,
    test_state_get: ze,
    test_state_iterator_free: Ce,
    test_state_iterator_next: $e,
    test_state_prefix: ve,
    test_state_range: Ne,
    test_state_remove: Ge,
    test_state_set: Je,
    wasm_bindgen__closure__destroy__hb496c74d4b5d2fe7: He,
    wasm_bindgen__convert__closures_____invoke__hb278d5bbbfdc8d45: Xe,
    wasmdb_admin: Se,
    wasmdb_adminWithParams: Te,
    wasmdb_command: Ae,
    wasmdb_commandWithParams: Ie,
    wasmdb_new: Oe,
    wasmdb_query: Re,
    wasmdb_queryWithParams: Ee
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  pe(_t);
  j();
})();
export {
  O as JsError,
  R as WasmDB,
  __tla
};
