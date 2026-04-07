let F, x, P;
let __tla = (async () => {
  const q = "/assets/reifydb_webassembly_bg-DaSBxi5p.wasm", z = async (t = {}, e) => {
    let n;
    if (e.startsWith("data:")) {
      const o = e.replace(/^data:.*?base64,/, "");
      let r;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") r = Buffer.from(o, "base64");
      else if (typeof atob == "function") {
        const s = atob(o);
        r = new Uint8Array(s.length);
        for (let a = 0; a < s.length; a++) r[a] = s.charCodeAt(a);
      } else throw new Error("Cannot decode base64-encoded data URL");
      n = await WebAssembly.instantiate(r, t);
    } else {
      const o = await fetch(e), r = o.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && r.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(o, t);
      else {
        const s = await o.arrayBuffer();
        n = await WebAssembly.instantiate(s, t);
      }
    }
    return n.instance.exports;
  };
  F = class {
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, lt.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      _.__wbg_jserror_free(e, 0);
    }
    get message() {
      let e, n;
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.jserror_message(s, this.__wbg_ptr);
        var o = i().getInt32(s + 0, true), r = i().getInt32(s + 4, true);
        return e = o, n = r, h(o, r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
      }
    }
  };
  Symbol.dispose && (F.prototype[Symbol.dispose] = F.prototype.free);
  x = class {
    static __wrap(e) {
      e = e >>> 0;
      const n = Object.create(x.prototype);
      return n.__wbg_ptr = e, D.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, D.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      _.__wbg_loginresult_free(e, 0);
    }
    get identity() {
      let e, n;
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.loginresult_identity(s, this.__wbg_ptr);
        var o = i().getInt32(s + 0, true), r = i().getInt32(s + 4, true);
        return e = o, n = r, h(o, r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
      }
    }
    get token() {
      let e, n;
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.loginresult_token(s, this.__wbg_ptr);
        var o = i().getInt32(s + 0, true), r = i().getInt32(s + 4, true);
        return e = o, n = r, h(o, r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
      }
    }
  };
  Symbol.dispose && (x.prototype[Symbol.dispose] = x.prototype.free);
  P = class {
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, E.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      _.__wbg_wasmdb_free(e, 0);
    }
    admin(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), a = p(e, _.__wbindgen_export, _.__wbindgen_export2), c = l;
        _.wasmdb_admin(s, this.__wbg_ptr, a, c);
        var n = i().getInt32(s + 0, true), o = i().getInt32(s + 4, true), r = i().getInt32(s + 8, true);
        if (r) throw g(o);
        return g(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    adminText(e) {
      let n, o;
      try {
        const w = _.__wbindgen_add_to_stack_pointer(-16), k = p(e, _.__wbindgen_export, _.__wbindgen_export2), W = l;
        _.wasmdb_adminText(w, this.__wbg_ptr, k, W);
        var r = i().getInt32(w + 0, true), s = i().getInt32(w + 4, true), a = i().getInt32(w + 8, true), c = i().getInt32(w + 12, true), b = r, m = s;
        if (c) throw b = 0, m = 0, g(a);
        return n = b, o = m, h(b, m);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(n, o, 1);
      }
    }
    adminWithParams(e, n) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16), c = p(e, _.__wbindgen_export, _.__wbindgen_export2), b = l;
        _.wasmdb_adminWithParams(a, this.__wbg_ptr, c, b, u(n));
        var o = i().getInt32(a + 0, true), r = i().getInt32(a + 4, true), s = i().getInt32(a + 8, true);
        if (s) throw g(r);
        return g(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    command(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), a = p(e, _.__wbindgen_export, _.__wbindgen_export2), c = l;
        _.wasmdb_command(s, this.__wbg_ptr, a, c);
        var n = i().getInt32(s + 0, true), o = i().getInt32(s + 4, true), r = i().getInt32(s + 8, true);
        if (r) throw g(o);
        return g(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    commandText(e) {
      let n, o;
      try {
        const w = _.__wbindgen_add_to_stack_pointer(-16), k = p(e, _.__wbindgen_export, _.__wbindgen_export2), W = l;
        _.wasmdb_commandText(w, this.__wbg_ptr, k, W);
        var r = i().getInt32(w + 0, true), s = i().getInt32(w + 4, true), a = i().getInt32(w + 8, true), c = i().getInt32(w + 12, true), b = r, m = s;
        if (c) throw b = 0, m = 0, g(a);
        return n = b, o = m, h(b, m);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(n, o, 1);
      }
    }
    commandWithParams(e, n) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16), c = p(e, _.__wbindgen_export, _.__wbindgen_export2), b = l;
        _.wasmdb_commandWithParams(a, this.__wbg_ptr, c, b, u(n));
        var o = i().getInt32(a + 0, true), r = i().getInt32(a + 4, true), s = i().getInt32(a + 8, true);
        if (s) throw g(r);
        return g(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    loginWithPassword(e, n) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16), c = p(e, _.__wbindgen_export, _.__wbindgen_export2), b = l, m = p(n, _.__wbindgen_export, _.__wbindgen_export2), w = l;
        _.wasmdb_loginWithPassword(a, this.__wbg_ptr, c, b, m, w);
        var o = i().getInt32(a + 0, true), r = i().getInt32(a + 4, true), s = i().getInt32(a + 8, true);
        if (s) throw g(r);
        return x.__wrap(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    loginWithToken(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), a = p(e, _.__wbindgen_export, _.__wbindgen_export2), c = l;
        _.wasmdb_loginWithToken(s, this.__wbg_ptr, a, c);
        var n = i().getInt32(s + 0, true), o = i().getInt32(s + 4, true), r = i().getInt32(s + 8, true);
        if (r) throw g(o);
        return x.__wrap(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    logout() {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.wasmdb_logout(o, this.__wbg_ptr);
        var e = i().getInt32(o + 0, true), n = i().getInt32(o + 4, true);
        if (n) throw g(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    constructor() {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.wasmdb_new(r);
        var e = i().getInt32(r + 0, true), n = i().getInt32(r + 4, true), o = i().getInt32(r + 8, true);
        if (o) throw g(n);
        return this.__wbg_ptr = e >>> 0, E.register(this, this.__wbg_ptr, this), this;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    query(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), a = p(e, _.__wbindgen_export, _.__wbindgen_export2), c = l;
        _.wasmdb_query(s, this.__wbg_ptr, a, c);
        var n = i().getInt32(s + 0, true), o = i().getInt32(s + 4, true), r = i().getInt32(s + 8, true);
        if (r) throw g(o);
        return g(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    queryText(e) {
      let n, o;
      try {
        const w = _.__wbindgen_add_to_stack_pointer(-16), k = p(e, _.__wbindgen_export, _.__wbindgen_export2), W = l;
        _.wasmdb_queryText(w, this.__wbg_ptr, k, W);
        var r = i().getInt32(w + 0, true), s = i().getInt32(w + 4, true), a = i().getInt32(w + 8, true), c = i().getInt32(w + 12, true), b = r, m = s;
        if (c) throw b = 0, m = 0, g(a);
        return n = b, o = m, h(b, m);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(n, o, 1);
      }
    }
    queryWithParams(e, n) {
      try {
        const a = _.__wbindgen_add_to_stack_pointer(-16), c = p(e, _.__wbindgen_export, _.__wbindgen_export2), b = l;
        _.wasmdb_queryWithParams(a, this.__wbg_ptr, c, b, u(n));
        var o = i().getInt32(a + 0, true), r = i().getInt32(a + 4, true), s = i().getInt32(a + 8, true);
        if (s) throw g(r);
        return g(o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  Symbol.dispose && (P.prototype[Symbol.dispose] = P.prototype.free);
  function M(t) {
    return f(t) === null;
  }
  function U(t) {
    return f(t) === void 0;
  }
  function C(t, e) {
    const n = f(e), o = typeof n == "string" ? n : void 0;
    var r = I(o) ? 0 : p(o, _.__wbindgen_export, _.__wbindgen_export2), s = l;
    i().setInt32(t + 4, s, true), i().setInt32(t + 0, r, true);
  }
  function V(t, e) {
    throw new Error(h(t, e));
  }
  function N(t) {
    clearInterval(f(t));
  }
  function G(t, e) {
    let n, o;
    try {
      n = t, o = e, console.error(h(t, e));
    } finally {
      _.__wbindgen_export3(n, o, 1);
    }
  }
  function H() {
    return L(function(t, e) {
      globalThis.crypto.getRandomValues(mt(t, e));
    }, arguments);
  }
  function J(t) {
    let e;
    try {
      e = f(t) instanceof Window;
    } catch {
      e = false;
    }
    return e;
  }
  function $(t) {
    console.log(f(t));
  }
  function X() {
    const t = new Error();
    return u(t);
  }
  function Y() {
    const t = new Array();
    return u(t);
  }
  function K() {
    const t = new Object();
    return u(t);
  }
  function Q() {
    return Date.now();
  }
  function Z(t) {
    return f(t).now();
  }
  function tt(t) {
    const e = f(t).performance;
    return I(e) ? 0 : u(e);
  }
  function et(t, e) {
    return f(t).push(f(e));
  }
  function _t(t, e) {
    const n = setInterval(f(t), e);
    return u(n);
  }
  function nt(t, e) {
    const n = setTimeout(f(t), e);
    return u(n);
  }
  function rt() {
    return L(function(t, e, n) {
      return Reflect.set(f(t), f(e), f(n));
    }, arguments);
  }
  function ot(t, e) {
    const n = f(e).stack, o = p(n, _.__wbindgen_export, _.__wbindgen_export2), r = l;
    i().setInt32(t + 4, r, true), i().setInt32(t + 0, o, true);
  }
  function st() {
    const t = typeof global > "u" ? null : global;
    return I(t) ? 0 : u(t);
  }
  function at() {
    const t = typeof globalThis > "u" ? null : globalThis;
    return I(t) ? 0 : u(t);
  }
  function it() {
    const t = typeof self > "u" ? null : self;
    return I(t) ? 0 : u(t);
  }
  function dt() {
    const t = typeof window > "u" ? null : window;
    return I(t) ? 0 : u(t);
  }
  function ct() {
    return L(function(t) {
      const e = JSON.stringify(f(t));
      return u(e);
    }, arguments);
  }
  function bt(t, e) {
    const n = yt(t, e, _.__wasm_bindgen_func_elem_17168, ut);
    return u(n);
  }
  function gt(t, e) {
    const n = h(t, e);
    return u(n);
  }
  function wt(t) {
    const e = f(t);
    return u(e);
  }
  function ft(t) {
    g(t);
  }
  function ut(t, e) {
    _.__wasm_bindgen_func_elem_17202(t, e);
  }
  const lt = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_jserror_free(t >>> 0, 1)), D = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_loginresult_free(t >>> 0, 1)), E = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_wasmdb_free(t >>> 0, 1));
  function u(t) {
    S === y.length && y.push(y.length + 1);
    const e = S;
    return S = y[e], y[e] = t, e;
  }
  const B = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => t.dtor(t.a, t.b));
  function pt(t) {
    t < 1028 || (y[t] = S, S = t);
  }
  function mt(t, e) {
    return t = t >>> 0, T().subarray(t / 1, t / 1 + e);
  }
  let v = null;
  function i() {
    return (v === null || v.buffer.detached === true || v.buffer.detached === void 0 && v.buffer !== _.memory.buffer) && (v = new DataView(_.memory.buffer)), v;
  }
  function h(t, e) {
    return t = t >>> 0, vt(t, e);
  }
  let A = null;
  function T() {
    return (A === null || A.byteLength === 0) && (A = new Uint8Array(_.memory.buffer)), A;
  }
  function f(t) {
    return y[t];
  }
  function L(t, e) {
    try {
      return t.apply(this, e);
    } catch (n) {
      _.__wbindgen_export4(u(n));
    }
  }
  let y = new Array(1024).fill(void 0);
  y.push(void 0, null, true, false);
  let S = y.length;
  function I(t) {
    return t == null;
  }
  function yt(t, e, n, o) {
    const r = {
      a: t,
      b: e,
      cnt: 1,
      dtor: n
    }, s = (...a) => {
      r.cnt++;
      const c = r.a;
      r.a = 0;
      try {
        return o(c, r.b, ...a);
      } finally {
        r.a = c, s._wbg_cb_unref();
      }
    };
    return s._wbg_cb_unref = () => {
      --r.cnt === 0 && (r.dtor(r.a, r.b), r.a = 0, B.unregister(r));
    }, B.register(s, r, r), s;
  }
  function p(t, e, n) {
    if (n === void 0) {
      const c = j.encode(t), b = e(c.length, 1) >>> 0;
      return T().subarray(b, b + c.length).set(c), l = c.length, b;
    }
    let o = t.length, r = e(o, 1) >>> 0;
    const s = T();
    let a = 0;
    for (; a < o; a++) {
      const c = t.charCodeAt(a);
      if (c > 127) break;
      s[r + a] = c;
    }
    if (a !== o) {
      a !== 0 && (t = t.slice(a)), r = n(r, o, o = a + t.length * 3, 1) >>> 0;
      const c = T().subarray(r + a, r + o), b = j.encodeInto(t, c);
      a += b.written, r = n(r, o, a, 1) >>> 0;
    }
    return l = a, r;
  }
  function g(t) {
    const e = f(t);
    return pt(t), e;
  }
  let O = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  O.decode();
  const ht = 2146435072;
  let R = 0;
  function vt(t, e) {
    return R += e, R >= ht && (O = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), O.decode(), R = e), O.decode(T().subarray(t, t + e));
  }
  const j = new TextEncoder();
  "encodeInto" in j || (j.encodeInto = function(t, e) {
    const n = j.encode(t);
    return e.set(n), {
      read: t.length,
      written: n.length
    };
  });
  let l = 0, _;
  function xt(t) {
    _ = t;
  }
  URL = globalThis.URL;
  const d = await z({
    "./reifydb_webassembly_bg.js": {
      __wbindgen_object_drop_ref: ft,
      __wbg_push_e87b0e732085a946: et,
      __wbg_new_227d7c05414eb861: X,
      __wbg_stack_3b0d974bbf31e44f: ot,
      __wbg_error_a6fa202b58aa1cd3: G,
      __wbg_setTimeout_43e381e7fef13745: nt,
      __wbg_setInterval_c030f9ec15d905ac: _t,
      __wbg_clearInterval_ee8cb903ab35aeed: N,
      __wbg_getRandomValues_76dfc69825c9c552: H,
      __wbg_instanceof_Window_23e677d2c6843922: J,
      __wbg_performance_28be169151161678: tt,
      __wbg_log_524eedafa26daa59: $,
      __wbg_now_c6d7a7d35f74f6f1: Z,
      __wbg_new_a70fbab9066b301f: Y,
      __wbg_new_ab79df5bd7c26067: K,
      __wbg_now_16f0c993d5dd6c27: Q,
      __wbindgen_object_clone_ref: wt,
      __wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: at,
      __wbg_static_accessor_SELF_f207c857566db248: it,
      __wbg_static_accessor_GLOBAL_8adb955bd33fac2f: st,
      __wbg_static_accessor_WINDOW_bb9f1ba69d61b386: dt,
      __wbg_set_7eaa4f96924fd6b3: rt,
      __wbg_stringify_5ae93966a84901ac: ct,
      __wbg___wbindgen_throw_6ddd609b62940d55: V,
      __wbg___wbindgen_is_null_0b605fc6b167c56f: M,
      __wbg___wbindgen_string_get_395e606bd0ee4427: C,
      __wbg___wbindgen_is_undefined_52709e72fb9f179c: U,
      __wbindgen_cast_0000000000000001: bt,
      __wbindgen_cast_0000000000000002: gt
    }
  }, q), It = d.memory, kt = d.__wbg_loginresult_free, Wt = d.__wbg_wasmdb_free, Tt = d.loginresult_identity, St = d.loginresult_token, jt = d.wasmdb_admin, At = d.wasmdb_adminText, Ot = d.wasmdb_adminWithParams, Rt = d.wasmdb_command, Lt = d.wasmdb_commandText, Ft = d.wasmdb_commandWithParams, Pt = d.wasmdb_loginWithPassword, Dt = d.wasmdb_loginWithToken, Et = d.wasmdb_logout, Bt = d.wasmdb_new, qt = d.wasmdb_query, zt = d.wasmdb_queryText, Mt = d.wasmdb_queryWithParams, Ut = d.__wbg_jserror_free, Ct = d.jserror_message, Vt = d.host_log_message, Nt = d.host_alloc, Gt = d.host_free, Ht = d.host_realloc, Jt = d.test_alloc, $t = d.test_free, Xt = d.test_log_message, Yt = d.test_realloc, Kt = d.test_state_clear, Qt = d.test_state_get, Zt = d.test_state_iterator_free, te = d.test_state_iterator_next, ee = d.test_state_prefix, _e = d.test_state_range, ne = d.test_state_remove, re = d.test_state_set, oe = d.__wasm_bindgen_func_elem_17168, se = d.__wasm_bindgen_func_elem_17202, ae = d.__wbindgen_export, ie = d.__wbindgen_export2, de = d.__wbindgen_export3, ce = d.__wbindgen_export4, be = d.__wbindgen_add_to_stack_pointer, ge = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_17168: oe,
    __wasm_bindgen_func_elem_17202: se,
    __wbg_jserror_free: Ut,
    __wbg_loginresult_free: kt,
    __wbg_wasmdb_free: Wt,
    __wbindgen_add_to_stack_pointer: be,
    __wbindgen_export: ae,
    __wbindgen_export2: ie,
    __wbindgen_export3: de,
    __wbindgen_export4: ce,
    host_alloc: Nt,
    host_free: Gt,
    host_log_message: Vt,
    host_realloc: Ht,
    jserror_message: Ct,
    loginresult_identity: Tt,
    loginresult_token: St,
    memory: It,
    test_alloc: Jt,
    test_free: $t,
    test_log_message: Xt,
    test_realloc: Yt,
    test_state_clear: Kt,
    test_state_get: Qt,
    test_state_iterator_free: Zt,
    test_state_iterator_next: te,
    test_state_prefix: ee,
    test_state_range: _e,
    test_state_remove: ne,
    test_state_set: re,
    wasmdb_admin: jt,
    wasmdb_adminText: At,
    wasmdb_adminWithParams: Ot,
    wasmdb_command: Rt,
    wasmdb_commandText: Lt,
    wasmdb_commandWithParams: Ft,
    wasmdb_loginWithPassword: Pt,
    wasmdb_loginWithToken: Dt,
    wasmdb_logout: Et,
    wasmdb_new: Bt,
    wasmdb_query: qt,
    wasmdb_queryText: zt,
    wasmdb_queryWithParams: Mt
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  xt(ge);
})();
export {
  F as JsError,
  x as LoginResult,
  P as WasmDB,
  __tla
};
