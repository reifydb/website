let S, u, A;
let __tla = (async () => {
  const O = "/assets/reifydb_webassembly_bg-cM7pITps.wasm", P = async (t = {}, e) => {
    let _;
    if (e.startsWith("data:")) {
      const s = e.replace(/^data:.*?base64,/, "");
      let n;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") n = Buffer.from(s, "base64");
      else if (typeof atob == "function") {
        const a = atob(s);
        n = new Uint8Array(a.length);
        for (let i = 0; i < a.length; i++) n[i] = a.charCodeAt(i);
      } else throw new Error("Cannot decode base64-encoded data URL");
      _ = await WebAssembly.instantiate(n, t);
    } else {
      const s = await fetch(e), n = s.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && n.startsWith("application/wasm")) _ = await WebAssembly.instantiateStreaming(s, t);
      else {
        const a = await s.arrayBuffer();
        _ = await WebAssembly.instantiate(a, t);
      }
    }
    return _.instance.exports;
  };
  S = class {
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, le.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      r.__wbg_jserror_free(e, 0);
    }
    get message() {
      let e, _;
      try {
        const s = r.jserror_message(this.__wbg_ptr);
        return e = s[0], _ = s[1], f(s[0], s[1]);
      } finally {
        r.__wbindgen_free(e, _, 1);
      }
    }
  };
  Symbol.dispose && (S.prototype[Symbol.dispose] = S.prototype.free);
  u = class {
    static __wrap(e) {
      e = e >>> 0;
      const _ = Object.create(u.prototype);
      return _.__wbg_ptr = e, k.register(_, _.__wbg_ptr, _), _;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, k.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      r.__wbg_loginresult_free(e, 0);
    }
    get identity() {
      let e, _;
      try {
        const s = r.loginresult_identity(this.__wbg_ptr);
        return e = s[0], _ = s[1], f(s[0], s[1]);
      } finally {
        r.__wbindgen_free(e, _, 1);
      }
    }
    get token() {
      let e, _;
      try {
        const s = r.loginresult_token(this.__wbg_ptr);
        return e = s[0], _ = s[1], f(s[0], s[1]);
      } finally {
        r.__wbindgen_free(e, _, 1);
      }
    }
  };
  Symbol.dispose && (u.prototype[Symbol.dispose] = u.prototype.free);
  A = class {
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, I.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      r.__wbg_wasmdb_free(e, 0);
    }
    admin(e) {
      const _ = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = l, n = r.wasmdb_admin(this.__wbg_ptr, _, s);
      if (n[2]) throw b(n[1]);
      return b(n[0]);
    }
    adminText(e) {
      let _, s;
      try {
        const i = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), c = l, d = r.wasmdb_adminText(this.__wbg_ptr, i, c);
        var n = d[0], a = d[1];
        if (d[3]) throw n = 0, a = 0, b(d[2]);
        return _ = n, s = a, f(n, a);
      } finally {
        r.__wbindgen_free(_, s, 1);
      }
    }
    adminWithParams(e, _) {
      const s = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = l, a = r.wasmdb_adminWithParams(this.__wbg_ptr, s, n, _);
      if (a[2]) throw b(a[1]);
      return b(a[0]);
    }
    command(e) {
      const _ = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = l, n = r.wasmdb_command(this.__wbg_ptr, _, s);
      if (n[2]) throw b(n[1]);
      return b(n[0]);
    }
    commandText(e) {
      let _, s;
      try {
        const i = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), c = l, d = r.wasmdb_commandText(this.__wbg_ptr, i, c);
        var n = d[0], a = d[1];
        if (d[3]) throw n = 0, a = 0, b(d[2]);
        return _ = n, s = a, f(n, a);
      } finally {
        r.__wbindgen_free(_, s, 1);
      }
    }
    commandWithParams(e, _) {
      const s = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = l, a = r.wasmdb_commandWithParams(this.__wbg_ptr, s, n, _);
      if (a[2]) throw b(a[1]);
      return b(a[0]);
    }
    loginWithPassword(e, _) {
      const s = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = l, a = w(_, r.__wbindgen_malloc, r.__wbindgen_realloc), i = l, c = r.wasmdb_loginWithPassword(this.__wbg_ptr, s, n, a, i);
      if (c[2]) throw b(c[1]);
      return u.__wrap(c[0]);
    }
    loginWithToken(e) {
      const _ = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = l, n = r.wasmdb_loginWithToken(this.__wbg_ptr, _, s);
      if (n[2]) throw b(n[1]);
      return u.__wrap(n[0]);
    }
    logout() {
      const e = r.wasmdb_logout(this.__wbg_ptr);
      if (e[1]) throw b(e[0]);
    }
    constructor() {
      const e = r.wasmdb_new();
      if (e[2]) throw b(e[1]);
      return this.__wbg_ptr = e[0] >>> 0, I.register(this, this.__wbg_ptr, this), this;
    }
    query(e) {
      const _ = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), s = l, n = r.wasmdb_query(this.__wbg_ptr, _, s);
      if (n[2]) throw b(n[1]);
      return b(n[0]);
    }
    queryText(e) {
      let _, s;
      try {
        const i = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), c = l, d = r.wasmdb_queryText(this.__wbg_ptr, i, c);
        var n = d[0], a = d[1];
        if (d[3]) throw n = 0, a = 0, b(d[2]);
        return _ = n, s = a, f(n, a);
      } finally {
        r.__wbindgen_free(_, s, 1);
      }
    }
    queryWithParams(e, _) {
      const s = w(e, r.__wbindgen_malloc, r.__wbindgen_realloc), n = l, a = r.wasmdb_queryWithParams(this.__wbg_ptr, s, n, _);
      if (a[2]) throw b(a[1]);
      return b(a[0]);
    }
  };
  Symbol.dispose && (A.prototype[Symbol.dispose] = A.prototype.free);
  function D(t) {
    return t === null;
  }
  function j(t) {
    return t === void 0;
  }
  function B(t, e) {
    const _ = e, s = typeof _ == "string" ? _ : void 0;
    var n = y(s) ? 0 : w(s, r.__wbindgen_malloc, r.__wbindgen_realloc), a = l;
    v().setInt32(t + 4, a, true), v().setInt32(t + 0, n, true);
  }
  function q(t, e) {
    throw new Error(f(t, e));
  }
  function z(t) {
    clearInterval(t);
  }
  function M(t, e) {
    let _, s;
    try {
      _ = t, s = e, console.error(f(t, e));
    } finally {
      r.__wbindgen_free(_, s, 1);
    }
  }
  function U() {
    return x(function(t, e) {
      globalThis.crypto.getRandomValues(F(t, e));
    }, arguments);
  }
  function V() {
    return x(function(t, e) {
      globalThis.crypto.getRandomValues(F(t, e));
    }, arguments);
  }
  function C(t) {
    let e;
    try {
      e = t instanceof Window;
    } catch {
      e = false;
    }
    return e;
  }
  function N(t) {
    console.log(t);
  }
  function G() {
    return new Error();
  }
  function J() {
    return new Array();
  }
  function H() {
    return new Object();
  }
  function $() {
    return Date.now();
  }
  function X() {
    return x(function() {
      return Date.now();
    }, arguments);
  }
  function Y(t) {
    return t.now();
  }
  function K(t) {
    const e = t.performance;
    return y(e) ? 0 : m(e);
  }
  function Q(t, e) {
    return t.push(e);
  }
  function Z(t, e) {
    return setInterval(t, e);
  }
  function ee(t, e) {
    return setTimeout(t, e);
  }
  function te() {
    return x(function(t, e, _) {
      return Reflect.set(t, e, _);
    }, arguments);
  }
  function _e(t, e) {
    const _ = e.stack, s = w(_, r.__wbindgen_malloc, r.__wbindgen_realloc), n = l;
    v().setInt32(t + 4, n, true), v().setInt32(t + 0, s, true);
  }
  function ne() {
    const t = typeof global > "u" ? null : global;
    return y(t) ? 0 : m(t);
  }
  function re() {
    const t = typeof globalThis > "u" ? null : globalThis;
    return y(t) ? 0 : m(t);
  }
  function se() {
    const t = typeof self > "u" ? null : self;
    return y(t) ? 0 : m(t);
  }
  function oe() {
    const t = typeof window > "u" ? null : window;
    return y(t) ? 0 : m(t);
  }
  function ae() {
    return x(function(t) {
      return JSON.stringify(t);
    }, arguments);
  }
  function ie(t, e) {
    return we(t, e, r.wasm_bindgen__closure__destroy__h652e47497a14761d, be);
  }
  function ce(t, e) {
    return f(t, e);
  }
  function de() {
    const t = r.__wbindgen_externrefs, e = t.grow(4);
    t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, true), t.set(e + 3, false);
  }
  function be(t, e) {
    r.wasm_bindgen__convert__closures_____invoke__h6b8a5348cddf590a(t, e);
  }
  const le = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => r.__wbg_jserror_free(t >>> 0, 1)), k = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => r.__wbg_loginresult_free(t >>> 0, 1)), I = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => r.__wbg_wasmdb_free(t >>> 0, 1));
  function m(t) {
    const e = r.__externref_table_alloc();
    return r.__wbindgen_externrefs.set(e, t), e;
  }
  const E = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => t.dtor(t.a, t.b));
  function F(t, e) {
    return t = t >>> 0, h().subarray(t / 1, t / 1 + e);
  }
  let g = null;
  function v() {
    return (g === null || g.buffer.detached === true || g.buffer.detached === void 0 && g.buffer !== r.memory.buffer) && (g = new DataView(r.memory.buffer)), g;
  }
  function f(t, e) {
    return t = t >>> 0, ge(t, e);
  }
  let T = null;
  function h() {
    return (T === null || T.byteLength === 0) && (T = new Uint8Array(r.memory.buffer)), T;
  }
  function x(t, e) {
    try {
      return t.apply(this, e);
    } catch (_) {
      const s = m(_);
      r.__wbindgen_exn_store(s);
    }
  }
  function y(t) {
    return t == null;
  }
  function we(t, e, _, s) {
    const n = {
      a: t,
      b: e,
      cnt: 1,
      dtor: _
    }, a = (...i) => {
      n.cnt++;
      const c = n.a;
      n.a = 0;
      try {
        return s(c, n.b, ...i);
      } finally {
        n.a = c, a._wbg_cb_unref();
      }
    };
    return a._wbg_cb_unref = () => {
      --n.cnt === 0 && (n.dtor(n.a, n.b), n.a = 0, E.unregister(n));
    }, E.register(a, n, n), a;
  }
  function w(t, e, _) {
    if (_ === void 0) {
      const c = p.encode(t), d = e(c.length, 1) >>> 0;
      return h().subarray(d, d + c.length).set(c), l = c.length, d;
    }
    let s = t.length, n = e(s, 1) >>> 0;
    const a = h();
    let i = 0;
    for (; i < s; i++) {
      const c = t.charCodeAt(i);
      if (c > 127) break;
      a[n + i] = c;
    }
    if (i !== s) {
      i !== 0 && (t = t.slice(i)), n = _(n, s, s = i + t.length * 3, 1) >>> 0;
      const c = h().subarray(n + i, n + s), d = p.encodeInto(t, c);
      i += d.written, n = _(n, s, i, 1) >>> 0;
    }
    return l = i, n;
  }
  function b(t) {
    const e = r.__wbindgen_externrefs.get(t);
    return r.__externref_table_dealloc(t), e;
  }
  let W = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  W.decode();
  const fe = 2146435072;
  let R = 0;
  function ge(t, e) {
    return R += e, R >= fe && (W = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), W.decode(), R = e), W.decode(h().subarray(t, t + e));
  }
  const p = new TextEncoder();
  "encodeInto" in p || (p.encodeInto = function(t, e) {
    const _ = p.encode(t);
    return e.set(_), {
      read: t.length,
      written: _.length
    };
  });
  let l = 0, r;
  function ue(t) {
    r = t;
  }
  URL = globalThis.URL;
  const o = await P({
    "./reifydb_webassembly_bg.js": {
      __wbg_push_e87b0e732085a946: Q,
      __wbg_new_227d7c05414eb861: G,
      __wbg_stack_3b0d974bbf31e44f: _e,
      __wbg_error_a6fa202b58aa1cd3: M,
      __wbg_setTimeout_c45d8e1e5b13a85f: ee,
      __wbg_setInterval_0645e815fba80da6: Z,
      __wbg_clearInterval_3d579ee16e7f4bcb: z,
      __wbg_getRandomValues_76dfc69825c9c552: U,
      __wbg_instanceof_Window_23e677d2c6843922: C,
      __wbg_performance_28be169151161678: K,
      __wbg_log_524eedafa26daa59: N,
      __wbg_now_c6d7a7d35f74f6f1: Y,
      __wbg_new_a70fbab9066b301f: J,
      __wbg_new_ab79df5bd7c26067: H,
      __wbg_now_16f0c993d5dd6c27: $,
      __wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: re,
      __wbg_static_accessor_SELF_f207c857566db248: se,
      __wbg_static_accessor_GLOBAL_8adb955bd33fac2f: ne,
      __wbg_static_accessor_WINDOW_bb9f1ba69d61b386: oe,
      __wbg_stringify_5ae93966a84901ac: ae,
      __wbg_set_7eaa4f96924fd6b3: te,
      __wbg_getRandomValues_a1cf2e70b003a59d: V,
      __wbg_now_ad1121946ba97ea0: X,
      __wbg___wbindgen_string_get_395e606bd0ee4427: B,
      __wbg___wbindgen_throw_6ddd609b62940d55: q,
      __wbg___wbindgen_is_null_0b605fc6b167c56f: D,
      __wbg___wbindgen_is_undefined_52709e72fb9f179c: j,
      __wbindgen_init_externref_table: de,
      __wbindgen_cast_0000000000000001: ie,
      __wbindgen_cast_0000000000000002: ce
    }
  }, O), me = o.memory, ye = o.__wbg_loginresult_free, he = o.__wbg_wasmdb_free, pe = o.loginresult_identity, xe = o.loginresult_token, Te = o.wasmdb_admin, We = o.wasmdb_adminText, ve = o.wasmdb_adminWithParams, Re = o.wasmdb_command, Se = o.wasmdb_commandText, Ae = o.wasmdb_commandWithParams, ke = o.wasmdb_loginWithPassword, Ie = o.wasmdb_loginWithToken, Ee = o.wasmdb_logout, Fe = o.wasmdb_new, Le = o.wasmdb_query, Oe = o.wasmdb_queryText, Pe = o.wasmdb_queryWithParams, De = o.__wbg_jserror_free, je = o.jserror_message, Be = o.host_log_message, qe = o.host_alloc, ze = o.host_free, Me = o.host_realloc, Ue = o.test_alloc, Ve = o.test_free, Ce = o.test_log_message, Ne = o.test_realloc, Ge = o.test_state_clear, Je = o.test_state_get, He = o.test_state_iterator_free, $e = o.test_state_iterator_next, Xe = o.test_state_prefix, Ye = o.test_state_range, Ke = o.test_state_remove, Qe = o.test_state_set, Ze = o.wasm_bindgen__closure__destroy__h652e47497a14761d, et = o.wasm_bindgen__convert__closures_____invoke__h6b8a5348cddf590a, tt = o.__wbindgen_malloc, _t = o.__wbindgen_realloc, nt = o.__wbindgen_free, rt = o.__wbindgen_exn_store, st = o.__externref_table_alloc, ot = o.__wbindgen_externrefs, at = o.__externref_table_dealloc, L = o.__wbindgen_start, it = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_table_alloc: st,
    __externref_table_dealloc: at,
    __wbg_jserror_free: De,
    __wbg_loginresult_free: ye,
    __wbg_wasmdb_free: he,
    __wbindgen_exn_store: rt,
    __wbindgen_externrefs: ot,
    __wbindgen_free: nt,
    __wbindgen_malloc: tt,
    __wbindgen_realloc: _t,
    __wbindgen_start: L,
    host_alloc: qe,
    host_free: ze,
    host_log_message: Be,
    host_realloc: Me,
    jserror_message: je,
    loginresult_identity: pe,
    loginresult_token: xe,
    memory: me,
    test_alloc: Ue,
    test_free: Ve,
    test_log_message: Ce,
    test_realloc: Ne,
    test_state_clear: Ge,
    test_state_get: Je,
    test_state_iterator_free: He,
    test_state_iterator_next: $e,
    test_state_prefix: Xe,
    test_state_range: Ye,
    test_state_remove: Ke,
    test_state_set: Qe,
    wasm_bindgen__closure__destroy__h652e47497a14761d: Ze,
    wasm_bindgen__convert__closures_____invoke__h6b8a5348cddf590a: et,
    wasmdb_admin: Te,
    wasmdb_adminText: We,
    wasmdb_adminWithParams: ve,
    wasmdb_command: Re,
    wasmdb_commandText: Se,
    wasmdb_commandWithParams: Ae,
    wasmdb_loginWithPassword: ke,
    wasmdb_loginWithToken: Ie,
    wasmdb_logout: Ee,
    wasmdb_new: Fe,
    wasmdb_query: Le,
    wasmdb_queryText: Oe,
    wasmdb_queryWithParams: Pe
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ue(it);
  L();
})();
export {
  S as JsError,
  u as LoginResult,
  A as WasmDB,
  __tla
};
