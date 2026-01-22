let I;
let __tla = (async () => {
  const R = "/assets/reifydb_webassembly_bg-9JX_IpmE.wasm", D = async (e = {}, t) => {
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
  I = class {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, O.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      s.__wbg_wasmdb_free(t, 0);
    }
    command(t) {
      const _ = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, n = s.wasmdb_command(this.__wbg_ptr, _, r);
      if (n[2]) throw b(n[1]);
      return b(n[0]);
    }
    commandWithParams(t, _) {
      const r = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f, c = s.wasmdb_commandWithParams(this.__wbg_ptr, r, n, _);
      if (c[2]) throw b(c[1]);
      return b(c[0]);
    }
    constructor() {
      const t = s.wasmdb_new();
      if (t[2]) throw b(t[1]);
      return this.__wbg_ptr = t[0] >>> 0, O.register(this, this.__wbg_ptr, this), this;
    }
    query(t) {
      const _ = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, n = s.wasmdb_query(this.__wbg_ptr, _, r);
      if (n[2]) throw b(n[1]);
      return b(n[0]);
    }
    queryWithParams(t, _) {
      const r = d(t, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f, c = s.wasmdb_queryWithParams(this.__wbg_ptr, r, n, _);
      if (c[2]) throw b(c[1]);
      return b(c[0]);
    }
  };
  Symbol.dispose && (I.prototype[Symbol.dispose] = I.prototype.free);
  function j(e, t) {
    const _ = A(t), r = d(_, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f;
    g().setInt32(e + 4, n, true), g().setInt32(e + 0, r, true);
  }
  function B(e) {
    return e === null;
  }
  function k(e) {
    return e === void 0;
  }
  function M(e, t) {
    const _ = t, r = typeof _ == "string" ? _ : void 0;
    var n = p(r) ? 0 : d(r, s.__wbindgen_malloc, s.__wbindgen_realloc), c = f;
    g().setInt32(e + 4, c, true), g().setInt32(e + 0, n, true);
  }
  function U(e, t) {
    throw new Error(S(e, t));
  }
  function C() {
    return u(function(e, t) {
      return e.call(t);
    }, arguments);
  }
  function P(e, t) {
    e.clearInterval(t);
  }
  function $(e, t) {
    let _, r;
    try {
      _ = e, r = t, console.error(S(e, t));
    } finally {
      s.__wbindgen_free(_, r, 1);
    }
  }
  function q() {
    return u(function(e, t) {
      globalThis.crypto.getRandomValues(F(e, t));
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
  function z(e) {
    return e.length;
  }
  function N(e) {
    console.log(e);
  }
  function V() {
    return new Object();
  }
  function G() {
    return new Array();
  }
  function J() {
    return new Error();
  }
  function H(e, t) {
    return new Function(S(e, t));
  }
  function X(e) {
    return new Uint8Array(e >>> 0);
  }
  function Y() {
    return u(function() {
      return Date.now();
    }, arguments);
  }
  function K() {
    return Date.now();
  }
  function Q(e, t) {
    return e.push(t);
  }
  function Z() {
    return u(function(e, t, _) {
      return e.setInterval(t, _);
    }, arguments);
  }
  function ee() {
    return u(function(e, t, _) {
      return e.setTimeout(t, _);
    }, arguments);
  }
  function te() {
    return u(function(e, t, _) {
      return Reflect.set(e, t, _);
    }, arguments);
  }
  function ne(e, t, _) {
    e.set(F(t, _));
  }
  function _e(e, t) {
    const _ = t.stack, r = d(_, s.__wbindgen_malloc, s.__wbindgen_realloc), n = f;
    g().setInt32(e + 4, n, true), g().setInt32(e + 0, r, true);
  }
  function re() {
    const e = typeof global > "u" ? null : global;
    return p(e) ? 0 : h(e);
  }
  function se() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return p(e) ? 0 : h(e);
  }
  function oe() {
    const e = typeof self > "u" ? null : self;
    return p(e) ? 0 : h(e);
  }
  function ce() {
    const e = typeof window > "u" ? null : window;
    return p(e) ? 0 : h(e);
  }
  function ae() {
    return u(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function ie(e, t) {
    return we(e, t, s.wasm_bindgen__closure__destroy__hc292d355262a9450, ue);
  }
  function be(e) {
    return e;
  }
  function fe(e, t) {
    return S(e, t);
  }
  function de() {
    const e = s.__wbindgen_externrefs, t = e.grow(4);
    e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
  }
  function ue(e, t) {
    s.wasm_bindgen__convert__closures_____invoke__h7187ad73b4efaec3(e, t);
  }
  typeof FinalizationRegistry > "u" || new FinalizationRegistry((e) => s.__wbg_jserror_free(e >>> 0, 1));
  const O = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_wasmdb_free(e >>> 0, 1));
  function h(e) {
    const t = s.__externref_table_alloc();
    return s.__wbindgen_externrefs.set(t, e), t;
  }
  const E = typeof FinalizationRegistry > "u" ? {
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
  function F(e, t) {
    return e = e >>> 0, m().subarray(e / 1, e / 1 + t);
  }
  let w = null;
  function g() {
    return (w === null || w.buffer.detached === true || w.buffer.detached === void 0 && w.buffer !== s.memory.buffer) && (w = new DataView(s.memory.buffer)), w;
  }
  function S(e, t) {
    return e = e >>> 0, le(e, t);
  }
  let x = null;
  function m() {
    return (x === null || x.byteLength === 0) && (x = new Uint8Array(s.memory.buffer)), x;
  }
  function u(e, t) {
    try {
      return e.apply(this, t);
    } catch (_) {
      const r = h(_);
      s.__wbindgen_exn_store(r);
    }
  }
  function p(e) {
    return e == null;
  }
  function we(e, t, _, r) {
    const n = {
      a: e,
      b: t,
      cnt: 1,
      dtor: _
    }, c = (...a) => {
      n.cnt++;
      const i = n.a;
      n.a = 0;
      try {
        return r(i, n.b, ...a);
      } finally {
        n.a = i, c._wbg_cb_unref();
      }
    };
    return c._wbg_cb_unref = () => {
      --n.cnt === 0 && (n.dtor(n.a, n.b), n.a = 0, E.unregister(n));
    }, E.register(c, n, n), c;
  }
  function d(e, t, _) {
    if (_ === void 0) {
      const i = y.encode(e), l = t(i.length, 1) >>> 0;
      return m().subarray(l, l + i.length).set(i), f = i.length, l;
    }
    let r = e.length, n = t(r, 1) >>> 0;
    const c = m();
    let a = 0;
    for (; a < r; a++) {
      const i = e.charCodeAt(a);
      if (i > 127) break;
      c[n + a] = i;
    }
    if (a !== r) {
      a !== 0 && (e = e.slice(a)), n = _(n, r, r = a + e.length * 3, 1) >>> 0;
      const i = m().subarray(n + a, n + r), l = y.encodeInto(e, i);
      a += l.written, n = _(n, r, a, 1) >>> 0;
    }
    return f = a, n;
  }
  function b(e) {
    const t = s.__wbindgen_externrefs.get(e);
    return s.__externref_table_dealloc(e), t;
  }
  let W = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  W.decode();
  const ge = 2146435072;
  let T = 0;
  function le(e, t) {
    return T += t, T >= ge && (W = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), W.decode(), T = t), W.decode(m().subarray(e, e + t));
  }
  const y = new TextEncoder();
  "encodeInto" in y || (y.encodeInto = function(e, t) {
    const _ = y.encode(e);
    return t.set(_), {
      read: e.length,
      written: _.length
    };
  });
  let f = 0, s;
  function me(e) {
    s = e;
  }
  URL = globalThis.URL;
  const o = await D({
    "./reifydb_webassembly_bg.js": {
      __wbg_new_8a6f238a6ece86ea: J,
      __wbg_stack_0ed75d68575b0f3c: _e,
      __wbg_error_7534b8e9a36f1ab4: $,
      __wbg_instanceof_Window_ed49b2db8df90359: v,
      __wbg_clearInterval_c75df0651e74fbb8: P,
      __wbg_setTimeout_eff32631ea138533: ee,
      __wbg_setInterval_612728cce80dfecf: Z,
      __wbg_log_6b5ca2e6124b2808: N,
      __wbg_new_3eb36ae241fe6f44: G,
      __wbg_new_361308b2356cecd0: V,
      __wbg_new_no_args_1c7c842f08d00ebb: H,
      __wbg_length_32ed9a279acd054c: z,
      __wbg_new_with_length_a2c39cbe88fd8ff1: X,
      __wbg_set_cc56eefd2dd91957: ne,
      __wbg_now_a3af9a2f4bbaa4d1: K,
      __wbg_push_8ffdcb2063340ba5: Q,
      __wbg_static_accessor_GLOBAL_THIS_e628e89ab3b1c95f: se,
      __wbg_call_389efe28435a9388: C,
      __wbg_static_accessor_SELF_a621d3dfbb60d0ce: oe,
      __wbg_static_accessor_GLOBAL_12837167ad935116: re,
      __wbg_static_accessor_WINDOW_f8727f0cf888e0bd: ce,
      __wbg_stringify_8d1cc6ff383e8bae: ae,
      __wbg_set_6cb8631f80447a67: te,
      __wbg_getRandomValues_9b655bdd369112f2: q,
      __wbg_now_37839916ec63896b: Y,
      __wbg___wbindgen_throw_be289d5034ed271b: U,
      __wbg___wbindgen_is_null_ac34f5003991759a: B,
      __wbg___wbindgen_string_get_72fb696202c56729: M,
      __wbg___wbindgen_is_undefined_9e4d92534c42d778: k,
      __wbg___wbindgen_debug_string_0bc8482c6e3508ae: j,
      __wbindgen_init_externref_table: de,
      __wbindgen_cast_0000000000000001: ie,
      __wbindgen_cast_0000000000000002: be,
      __wbindgen_cast_0000000000000003: fe
    }
  }, R), ye = o.memory, he = o.__wbg_wasmdb_free, pe = o.wasmdb_command, xe = o.wasmdb_commandWithParams, We = o.wasmdb_new, Se = o.wasmdb_query, Te = o.wasmdb_queryWithParams, Ae = o.__wbg_jserror_free, Ie = o.jserror_message, Oe = o.test_alloc, Ee = o.test_free, Fe = o.test_log_message, Le = o.test_realloc, Re = o.test_state_clear, De = o.test_state_get, je = o.test_state_iterator_free, Be = o.test_state_iterator_next, ke = o.test_state_prefix, Me = o.test_state_range, Ue = o.test_state_remove, Ce = o.test_state_set, Pe = o.wasm_bindgen__closure__destroy__hc292d355262a9450, $e = o.wasm_bindgen__convert__closures_____invoke__h7187ad73b4efaec3, qe = o.__wbindgen_malloc, ve = o.__wbindgen_realloc, ze = o.__wbindgen_exn_store, Ne = o.__externref_table_alloc, Ve = o.__wbindgen_externrefs, Ge = o.__wbindgen_free, Je = o.__externref_table_dealloc, L = o.__wbindgen_start, He = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_table_alloc: Ne,
    __externref_table_dealloc: Je,
    __wbg_jserror_free: Ae,
    __wbg_wasmdb_free: he,
    __wbindgen_exn_store: ze,
    __wbindgen_externrefs: Ve,
    __wbindgen_free: Ge,
    __wbindgen_malloc: qe,
    __wbindgen_realloc: ve,
    __wbindgen_start: L,
    jserror_message: Ie,
    memory: ye,
    test_alloc: Oe,
    test_free: Ee,
    test_log_message: Fe,
    test_realloc: Le,
    test_state_clear: Re,
    test_state_get: De,
    test_state_iterator_free: je,
    test_state_iterator_next: Be,
    test_state_prefix: ke,
    test_state_range: Me,
    test_state_remove: Ue,
    test_state_set: Ce,
    wasm_bindgen__closure__destroy__hc292d355262a9450: Pe,
    wasm_bindgen__convert__closures_____invoke__h7187ad73b4efaec3: $e,
    wasmdb_command: pe,
    wasmdb_commandWithParams: xe,
    wasmdb_new: We,
    wasmdb_query: Se,
    wasmdb_queryWithParams: Te
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  me(He);
  L();
})();
export {
  I as WasmDB,
  __tla
};
