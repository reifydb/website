let F, W, P, je, Oe;
let __tla = (async () => {
  const z = "/assets/reifydb_webassembly_bg-BrgharAs.wasm", M = async (t = {}, e) => {
    let n;
    if (e.startsWith("data:")) {
      const r = e.replace(/^data:.*?base64,/, "");
      let o;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") o = Buffer.from(r, "base64");
      else if (typeof atob == "function") {
        const s = atob(r);
        o = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) o[i] = s.charCodeAt(i);
      } else throw new Error("Cannot decode base64-encoded data URL");
      n = await WebAssembly.instantiate(o, t);
    } else {
      const r = await fetch(e), o = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && o.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(r, t);
      else {
        const s = await r.arrayBuffer();
        n = await WebAssembly.instantiate(s, t);
      }
    }
    return n.instance.exports;
  };
  F = class {
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, pt.unregister(this), e;
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
        var r = a().getInt32(s + 0, true), o = a().getInt32(s + 4, true);
        return e = r, n = o, y(r, o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
      }
    }
  };
  Symbol.dispose && (F.prototype[Symbol.dispose] = F.prototype.free);
  W = class {
    static __wrap(e) {
      const n = Object.create(W.prototype);
      return n.__wbg_ptr = e, E.register(n, n.__wbg_ptr, n), n;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, E.unregister(this), e;
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
        var r = a().getInt32(s + 0, true), o = a().getInt32(s + 4, true);
        return e = r, n = o, y(r, o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
      }
    }
    get token() {
      let e, n;
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16);
        _.loginresult_token(s, this.__wbg_ptr);
        var r = a().getInt32(s + 0, true), o = a().getInt32(s + 4, true);
        return e = r, n = o, y(r, o);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
      }
    }
  };
  Symbol.dispose && (W.prototype[Symbol.dispose] = W.prototype.free);
  P = class {
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return this.__wbg_ptr = 0, B.unregister(this), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      _.__wbg_wasmdb_free(e, 0);
    }
    admin(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), i = m(e, _.__wbindgen_export, _.__wbindgen_export2), c = f;
        _.wasmdb_admin(s, this.__wbg_ptr, i, c);
        var n = a().getInt32(s + 0, true), r = a().getInt32(s + 4, true), o = a().getInt32(s + 8, true);
        if (o) throw u(r);
        return u(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    adminText(e) {
      let n, r;
      try {
        const w = _.__wbindgen_add_to_stack_pointer(-16), h = m(e, _.__wbindgen_export, _.__wbindgen_export2), T = f;
        _.wasmdb_adminText(w, this.__wbg_ptr, h, T);
        var o = a().getInt32(w + 0, true), s = a().getInt32(w + 4, true), i = a().getInt32(w + 8, true), c = a().getInt32(w + 12, true), b = o, g = s;
        if (c) throw b = 0, g = 0, u(i);
        return n = b, r = g, y(b, g);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(n, r, 1);
      }
    }
    adminWithParams(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16), c = m(e, _.__wbindgen_export, _.__wbindgen_export2), b = f;
        _.wasmdb_adminWithParams(i, this.__wbg_ptr, c, b, p(n));
        var r = a().getInt32(i + 0, true), o = a().getInt32(i + 4, true), s = a().getInt32(i + 8, true);
        if (s) throw u(o);
        return u(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    command(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), i = m(e, _.__wbindgen_export, _.__wbindgen_export2), c = f;
        _.wasmdb_command(s, this.__wbg_ptr, i, c);
        var n = a().getInt32(s + 0, true), r = a().getInt32(s + 4, true), o = a().getInt32(s + 8, true);
        if (o) throw u(r);
        return u(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    commandText(e) {
      let n, r;
      try {
        const w = _.__wbindgen_add_to_stack_pointer(-16), h = m(e, _.__wbindgen_export, _.__wbindgen_export2), T = f;
        _.wasmdb_commandText(w, this.__wbg_ptr, h, T);
        var o = a().getInt32(w + 0, true), s = a().getInt32(w + 4, true), i = a().getInt32(w + 8, true), c = a().getInt32(w + 12, true), b = o, g = s;
        if (c) throw b = 0, g = 0, u(i);
        return n = b, r = g, y(b, g);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(n, r, 1);
      }
    }
    commandWithParams(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16), c = m(e, _.__wbindgen_export, _.__wbindgen_export2), b = f;
        _.wasmdb_commandWithParams(i, this.__wbg_ptr, c, b, p(n));
        var r = a().getInt32(i + 0, true), o = a().getInt32(i + 4, true), s = a().getInt32(i + 8, true);
        if (s) throw u(o);
        return u(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    loginWithPassword(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16), c = m(e, _.__wbindgen_export, _.__wbindgen_export2), b = f, g = m(n, _.__wbindgen_export, _.__wbindgen_export2), w = f;
        _.wasmdb_loginWithPassword(i, this.__wbg_ptr, c, b, g, w);
        var r = a().getInt32(i + 0, true), o = a().getInt32(i + 4, true), s = a().getInt32(i + 8, true);
        if (s) throw u(o);
        return W.__wrap(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    loginWithToken(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), i = m(e, _.__wbindgen_export, _.__wbindgen_export2), c = f;
        _.wasmdb_loginWithToken(s, this.__wbg_ptr, i, c);
        var n = a().getInt32(s + 0, true), r = a().getInt32(s + 4, true), o = a().getInt32(s + 8, true);
        if (o) throw u(r);
        return W.__wrap(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    logout() {
      try {
        const r = _.__wbindgen_add_to_stack_pointer(-16);
        _.wasmdb_logout(r, this.__wbg_ptr);
        var e = a().getInt32(r + 0, true), n = a().getInt32(r + 4, true);
        if (n) throw u(e);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    constructor() {
      try {
        const o = _.__wbindgen_add_to_stack_pointer(-16);
        _.wasmdb_new(o);
        var e = a().getInt32(o + 0, true), n = a().getInt32(o + 4, true), r = a().getInt32(o + 8, true);
        if (r) throw u(n);
        return this.__wbg_ptr = e, B.register(this, this.__wbg_ptr, this), this;
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    query(e) {
      try {
        const s = _.__wbindgen_add_to_stack_pointer(-16), i = m(e, _.__wbindgen_export, _.__wbindgen_export2), c = f;
        _.wasmdb_query(s, this.__wbg_ptr, i, c);
        var n = a().getInt32(s + 0, true), r = a().getInt32(s + 4, true), o = a().getInt32(s + 8, true);
        if (o) throw u(r);
        return u(n);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
    queryText(e) {
      let n, r;
      try {
        const w = _.__wbindgen_add_to_stack_pointer(-16), h = m(e, _.__wbindgen_export, _.__wbindgen_export2), T = f;
        _.wasmdb_queryText(w, this.__wbg_ptr, h, T);
        var o = a().getInt32(w + 0, true), s = a().getInt32(w + 4, true), i = a().getInt32(w + 8, true), c = a().getInt32(w + 12, true), b = o, g = s;
        if (c) throw b = 0, g = 0, u(i);
        return n = b, r = g, y(b, g);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(n, r, 1);
      }
    }
    queryWithParams(e, n) {
      try {
        const i = _.__wbindgen_add_to_stack_pointer(-16), c = m(e, _.__wbindgen_export, _.__wbindgen_export2), b = f;
        _.wasmdb_queryWithParams(i, this.__wbg_ptr, c, b, p(n));
        var r = a().getInt32(i + 0, true), o = a().getInt32(i + 4, true), s = a().getInt32(i + 8, true);
        if (s) throw u(o);
        return u(r);
      } finally {
        _.__wbindgen_add_to_stack_pointer(16);
      }
    }
  };
  Symbol.dispose && (P.prototype[Symbol.dispose] = P.prototype.free);
  je = function(t) {
    let e, n;
    try {
      const g = _.__wbindgen_add_to_stack_pointer(-16), w = ht(t, _.__wbindgen_export), h = f;
      _.decode_rbcf(g, w, h);
      var r = a().getInt32(g + 0, true), o = a().getInt32(g + 4, true), s = a().getInt32(g + 8, true), i = a().getInt32(g + 12, true), c = r, b = o;
      if (i) throw c = 0, b = 0, u(s);
      return e = c, n = b, y(c, b);
    } finally {
      _.__wbindgen_add_to_stack_pointer(16), _.__wbindgen_export3(e, n, 1);
    }
  };
  Oe = function(t, e) {
    try {
      const g = _.__wbindgen_add_to_stack_pointer(-16), w = m(t, _.__wbindgen_export, _.__wbindgen_export2), h = f;
      var n = x(e) ? 0 : m(e, _.__wbindgen_export, _.__wbindgen_export2), r = f;
      _.encode_rbcf(g, w, h, n, r);
      var o = a().getInt32(g + 0, true), s = a().getInt32(g + 4, true), i = a().getInt32(g + 8, true), c = a().getInt32(g + 12, true);
      if (c) throw u(i);
      var b = q(o, s).slice();
      return _.__wbindgen_export3(o, s * 1, 1), b;
    } finally {
      _.__wbindgen_add_to_stack_pointer(16);
    }
  };
  function U(t) {
    return l(t) === null;
  }
  function C(t) {
    return l(t) === void 0;
  }
  function V(t, e) {
    const n = l(e), r = typeof n == "string" ? n : void 0;
    var o = x(r) ? 0 : m(r, _.__wbindgen_export, _.__wbindgen_export2), s = f;
    a().setInt32(t + 4, s, true), a().setInt32(t + 0, o, true);
  }
  function N(t, e) {
    throw new Error(y(t, e));
  }
  function G(t) {
    clearInterval(l(t));
  }
  function $(t, e) {
    let n, r;
    try {
      n = t, r = e, console.error(y(t, e));
    } finally {
      _.__wbindgen_export3(n, r, 1);
    }
  }
  function H() {
    return L(function(t, e) {
      globalThis.crypto.getRandomValues(q(t, e));
    }, arguments);
  }
  function J(t) {
    let e;
    try {
      e = l(t) instanceof Window;
    } catch {
      e = false;
    }
    return e;
  }
  function X(t) {
    console.log(l(t));
  }
  function Y() {
    const t = new Error();
    return p(t);
  }
  function K() {
    const t = new Object();
    return p(t);
  }
  function Q() {
    const t = new Array();
    return p(t);
  }
  function Z() {
    return Date.now();
  }
  function tt(t) {
    return l(t).now();
  }
  function et(t) {
    const e = l(t).performance;
    return x(e) ? 0 : p(e);
  }
  function _t(t, e) {
    return l(t).push(l(e));
  }
  function nt(t, e) {
    const n = setInterval(l(t), e);
    return p(n);
  }
  function rt(t, e) {
    const n = setTimeout(l(t), e);
    return p(n);
  }
  function ot() {
    return L(function(t, e, n) {
      return Reflect.set(l(t), l(e), l(n));
    }, arguments);
  }
  function st(t, e) {
    const n = l(e).stack, r = m(n, _.__wbindgen_export, _.__wbindgen_export2), o = f;
    a().setInt32(t + 4, o, true), a().setInt32(t + 0, r, true);
  }
  function at() {
    const t = typeof global > "u" ? null : global;
    return x(t) ? 0 : p(t);
  }
  function it() {
    const t = typeof globalThis > "u" ? null : globalThis;
    return x(t) ? 0 : p(t);
  }
  function dt() {
    const t = typeof self > "u" ? null : self;
    return x(t) ? 0 : p(t);
  }
  function ct() {
    const t = typeof window > "u" ? null : window;
    return x(t) ? 0 : p(t);
  }
  function bt() {
    return L(function(t) {
      const e = JSON.stringify(l(t));
      return p(e);
    }, arguments);
  }
  function gt(t, e) {
    const n = yt(t, e, lt);
    return p(n);
  }
  function wt(t, e) {
    const n = y(t, e);
    return p(n);
  }
  function ut(t) {
    const e = l(t);
    return p(e);
  }
  function ft(t) {
    u(t);
  }
  function lt(t, e) {
    _.__wasm_bindgen_func_elem_22649(t, e);
  }
  const pt = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_jserror_free(t, 1)), E = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_loginresult_free(t, 1)), B = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbg_wasmdb_free(t, 1));
  function p(t) {
    A === v.length && v.push(v.length + 1);
    const e = A;
    return A = v[e], v[e] = t, e;
  }
  const D = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((t) => _.__wbindgen_export5(t.a, t.b));
  function mt(t) {
    t < 1028 || (v[t] = A, A = t);
  }
  function q(t, e) {
    return t = t >>> 0, k().subarray(t / 1, t / 1 + e);
  }
  let I = null;
  function a() {
    return (I === null || I.buffer.detached === true || I.buffer.detached === void 0 && I.buffer !== _.memory.buffer) && (I = new DataView(_.memory.buffer)), I;
  }
  function y(t, e) {
    return xt(t >>> 0, e);
  }
  let j = null;
  function k() {
    return (j === null || j.byteLength === 0) && (j = new Uint8Array(_.memory.buffer)), j;
  }
  function l(t) {
    return v[t];
  }
  function L(t, e) {
    try {
      return t.apply(this, e);
    } catch (n) {
      _.__wbindgen_export4(p(n));
    }
  }
  let v = new Array(1024).fill(void 0);
  v.push(void 0, null, true, false);
  let A = v.length;
  function x(t) {
    return t == null;
  }
  function yt(t, e, n) {
    const r = {
      a: t,
      b: e,
      cnt: 1
    }, o = (...s) => {
      r.cnt++;
      const i = r.a;
      r.a = 0;
      try {
        return n(i, r.b, ...s);
      } finally {
        r.a = i, o._wbg_cb_unref();
      }
    };
    return o._wbg_cb_unref = () => {
      --r.cnt === 0 && (_.__wbindgen_export5(r.a, r.b), r.a = 0, D.unregister(r));
    }, D.register(o, r, r), o;
  }
  function ht(t, e) {
    const n = e(t.length * 1, 1) >>> 0;
    return k().set(t, n / 1), f = t.length, n;
  }
  function m(t, e, n) {
    if (n === void 0) {
      const c = S.encode(t), b = e(c.length, 1) >>> 0;
      return k().subarray(b, b + c.length).set(c), f = c.length, b;
    }
    let r = t.length, o = e(r, 1) >>> 0;
    const s = k();
    let i = 0;
    for (; i < r; i++) {
      const c = t.charCodeAt(i);
      if (c > 127) break;
      s[o + i] = c;
    }
    if (i !== r) {
      i !== 0 && (t = t.slice(i)), o = n(o, r, r = i + t.length * 3, 1) >>> 0;
      const c = k().subarray(o + i, o + r), b = S.encodeInto(t, c);
      i += b.written, o = n(o, r, i, 1) >>> 0;
    }
    return f = i, o;
  }
  function u(t) {
    const e = l(t);
    return mt(t), e;
  }
  let O = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  O.decode();
  const vt = 2146435072;
  let R = 0;
  function xt(t, e) {
    return R += e, R >= vt && (O = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), O.decode(), R = e), O.decode(k().subarray(t, t + e));
  }
  const S = new TextEncoder();
  "encodeInto" in S || (S.encodeInto = function(t, e) {
    const n = S.encode(t);
    return e.set(n), {
      read: t.length,
      written: n.length
    };
  });
  let f = 0, _;
  function It(t) {
    _ = t;
  }
  URL = globalThis.URL;
  const d = await M({
    "./reifydb_webassembly_bg.js": {
      __wbindgen_object_drop_ref: ft,
      __wbg_push_a6822215aa43e71c: _t,
      __wbg_new_227d7c05414eb861: Y,
      __wbg_stack_3b0d974bbf31e44f: st,
      __wbg_error_a6fa202b58aa1cd3: $,
      __wbg_setTimeout_4b61db21bfbf7b27: rt,
      __wbg_setInterval_6f085e2d65b9a15a: nt,
      __wbg_clearInterval_d7d87777839342bd: G,
      __wbg_getRandomValues_76dfc69825c9c552: H,
      __wbg_instanceof_Window_e093be59ee9a8e14: J,
      __wbg_performance_68499ca0718837f5: et,
      __wbg_log_cf2e968649f3384e: X,
      __wbg_now_f565250295e2d180: tt,
      __wbg_new_d90091b82fdf5b91: Q,
      __wbg_new_ce1ab61c1c2b300d: K,
      __wbg_now_190933fa139cc119: Z,
      __wbindgen_object_clone_ref: ut,
      __wbg_static_accessor_GLOBAL_THIS_a1a35cec07001a8a: it,
      __wbg_static_accessor_SELF_4c59f6c7ea29a144: dt,
      __wbg_static_accessor_GLOBAL_9d53f2689e622ca1: at,
      __wbg_static_accessor_WINDOW_e70ae9f2eb052253: ct,
      __wbg_set_6e30c9374c26414c: ot,
      __wbg_stringify_8286df6dcc591521: bt,
      __wbg___wbindgen_throw_1506f2235d1bdba0: N,
      __wbg___wbindgen_is_null_87c3bfe968c6a5ad: U,
      __wbg___wbindgen_string_get_72bdf95d3ae505b1: V,
      __wbg___wbindgen_is_undefined_67b456be8673d3d7: C,
      __wbindgen_cast_0000000000000001: gt,
      __wbindgen_cast_0000000000000002: wt
    }
  }, z), kt = d.memory, Wt = d.__wbg_loginresult_free, Tt = d.__wbg_wasmdb_free, At = d.decode_rbcf, St = d.encode_rbcf, jt = d.loginresult_identity, Ot = d.loginresult_token, Rt = d.wasmdb_admin, Lt = d.wasmdb_adminText, Ft = d.wasmdb_adminWithParams, Pt = d.wasmdb_command, Et = d.wasmdb_commandText, Bt = d.wasmdb_commandWithParams, Dt = d.wasmdb_loginWithPassword, qt = d.wasmdb_loginWithToken, zt = d.wasmdb_logout, Mt = d.wasmdb_new, Ut = d.wasmdb_query, Ct = d.wasmdb_queryText, Vt = d.wasmdb_queryWithParams, Nt = d.__wbg_jserror_free, Gt = d.jserror_message, $t = d.host_builder_acquire, Ht = d.host_builder_bitvec_ptr, Jt = d.host_builder_commit, Xt = d.host_builder_data_ptr, Yt = d.host_builder_emit_diff, Kt = d.host_builder_grow, Qt = d.host_builder_offsets_ptr, Zt = d.host_builder_release, te = d.host_log_message, ee = d.host_alloc, _e = d.host_free, ne = d.host_realloc, re = d.test_alloc, oe = d.test_free, se = d.test_internal_state_get_many, ae = d.test_internal_state_range, ie = d.test_internal_state_remove, de = d.test_internal_state_set, ce = d.test_log_message, be = d.test_realloc, ge = d.test_state_clear, we = d.test_state_get, ue = d.test_state_get_many, fe = d.test_state_prefix, le = d.test_state_range, pe = d.test_state_remove, me = d.test_state_set, ye = d.test_state_iterator_free, he = d.test_state_iterator_next, ve = d.__wasm_bindgen_func_elem_22649, xe = d.__wbindgen_export, Ie = d.__wbindgen_export2, ke = d.__wbindgen_export3, We = d.__wbindgen_export4, Te = d.__wbindgen_export5, Ae = d.__wbindgen_add_to_stack_pointer, Se = Object.freeze(Object.defineProperty({
    __proto__: null,
    __wasm_bindgen_func_elem_22649: ve,
    __wbg_jserror_free: Nt,
    __wbg_loginresult_free: Wt,
    __wbg_wasmdb_free: Tt,
    __wbindgen_add_to_stack_pointer: Ae,
    __wbindgen_export: xe,
    __wbindgen_export2: Ie,
    __wbindgen_export3: ke,
    __wbindgen_export4: We,
    __wbindgen_export5: Te,
    decode_rbcf: At,
    encode_rbcf: St,
    host_alloc: ee,
    host_builder_acquire: $t,
    host_builder_bitvec_ptr: Ht,
    host_builder_commit: Jt,
    host_builder_data_ptr: Xt,
    host_builder_emit_diff: Yt,
    host_builder_grow: Kt,
    host_builder_offsets_ptr: Qt,
    host_builder_release: Zt,
    host_free: _e,
    host_log_message: te,
    host_realloc: ne,
    jserror_message: Gt,
    loginresult_identity: jt,
    loginresult_token: Ot,
    memory: kt,
    test_alloc: re,
    test_free: oe,
    test_internal_state_get_many: se,
    test_internal_state_range: ae,
    test_internal_state_remove: ie,
    test_internal_state_set: de,
    test_log_message: ce,
    test_realloc: be,
    test_state_clear: ge,
    test_state_get: we,
    test_state_get_many: ue,
    test_state_iterator_free: ye,
    test_state_iterator_next: he,
    test_state_prefix: fe,
    test_state_range: le,
    test_state_remove: pe,
    test_state_set: me,
    wasmdb_admin: Rt,
    wasmdb_adminText: Lt,
    wasmdb_adminWithParams: Ft,
    wasmdb_command: Pt,
    wasmdb_commandText: Et,
    wasmdb_commandWithParams: Bt,
    wasmdb_loginWithPassword: Dt,
    wasmdb_loginWithToken: qt,
    wasmdb_logout: zt,
    wasmdb_new: Mt,
    wasmdb_query: Ut,
    wasmdb_queryText: Ct,
    wasmdb_queryWithParams: Vt
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  It(Se);
})();
export {
  F as JsError,
  W as LoginResult,
  P as WasmDB,
  __tla,
  je as decode_rbcf,
  Oe as encode_rbcf
};
