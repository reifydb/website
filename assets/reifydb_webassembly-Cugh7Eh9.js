let S, A;
let __tla = (async () => {
  const O = "/assets/reifydb_webassembly_bg-CeEO-udq.wasm", D = async (e = {}, t) => {
    let n;
    if (t.startsWith("data:")) {
      const r = t.replace(/^data:.*?base64,/, "");
      let _;
      if (typeof Buffer == "function" && typeof Buffer.from == "function") _ = Buffer.from(r, "base64");
      else if (typeof atob == "function") {
        const a = atob(r);
        _ = new Uint8Array(a.length);
        for (let c = 0; c < a.length; c++) _[c] = a.charCodeAt(c);
      } else throw new Error("Cannot decode base64-encoded data URL");
      n = await WebAssembly.instantiate(_, e);
    } else {
      const r = await fetch(t), _ = r.headers.get("Content-Type") || "";
      if ("instantiateStreaming" in WebAssembly && _.startsWith("application/wasm")) n = await WebAssembly.instantiateStreaming(r, e);
      else {
        const a = await r.arrayBuffer();
        n = await WebAssembly.instantiate(a, e);
      }
    }
    return n.instance.exports;
  };
  S = class {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, fe.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      s.__wbg_jserror_free(t, 0);
    }
    get message() {
      let t, n;
      try {
        const r = s.jserror_message(this.__wbg_ptr);
        return t = r[0], n = r[1], l(r[0], r[1]);
      } finally {
        s.__wbindgen_free(t, n, 1);
      }
    }
  };
  Symbol.dispose && (S.prototype[Symbol.dispose] = S.prototype.free);
  A = class {
    __destroy_into_raw() {
      const t = this.__wbg_ptr;
      return this.__wbg_ptr = 0, R.unregister(this), t;
    }
    free() {
      const t = this.__destroy_into_raw();
      s.__wbg_wasmdb_free(t, 0);
    }
    admin(t) {
      const n = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, _ = s.wasmdb_admin(this.__wbg_ptr, n, r);
      if (_[2]) throw d(_[1]);
      return d(_[0]);
    }
    adminText(t) {
      let n, r;
      try {
        const c = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), b = f, i = s.wasmdb_adminText(this.__wbg_ptr, c, b);
        var _ = i[0], a = i[1];
        if (i[3]) throw _ = 0, a = 0, d(i[2]);
        return n = _, r = a, l(_, a);
      } finally {
        s.__wbindgen_free(n, r, 1);
      }
    }
    adminWithParams(t, n) {
      const r = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), _ = f, a = s.wasmdb_adminWithParams(this.__wbg_ptr, r, _, n);
      if (a[2]) throw d(a[1]);
      return d(a[0]);
    }
    command(t) {
      const n = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, _ = s.wasmdb_command(this.__wbg_ptr, n, r);
      if (_[2]) throw d(_[1]);
      return d(_[0]);
    }
    commandText(t) {
      let n, r;
      try {
        const c = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), b = f, i = s.wasmdb_commandText(this.__wbg_ptr, c, b);
        var _ = i[0], a = i[1];
        if (i[3]) throw _ = 0, a = 0, d(i[2]);
        return n = _, r = a, l(_, a);
      } finally {
        s.__wbindgen_free(n, r, 1);
      }
    }
    commandWithParams(t, n) {
      const r = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), _ = f, a = s.wasmdb_commandWithParams(this.__wbg_ptr, r, _, n);
      if (a[2]) throw d(a[1]);
      return d(a[0]);
    }
    constructor() {
      const t = s.wasmdb_new();
      if (t[2]) throw d(t[1]);
      return this.__wbg_ptr = t[0] >>> 0, R.register(this, this.__wbg_ptr, this), this;
    }
    query(t) {
      const n = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), r = f, _ = s.wasmdb_query(this.__wbg_ptr, n, r);
      if (_[2]) throw d(_[1]);
      return d(_[0]);
    }
    queryText(t) {
      let n, r;
      try {
        const c = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), b = f, i = s.wasmdb_queryText(this.__wbg_ptr, c, b);
        var _ = i[0], a = i[1];
        if (i[3]) throw _ = 0, a = 0, d(i[2]);
        return n = _, r = a, l(_, a);
      } finally {
        s.__wbindgen_free(n, r, 1);
      }
    }
    queryWithParams(t, n) {
      const r = w(t, s.__wbindgen_malloc, s.__wbindgen_realloc), _ = f, a = s.wasmdb_queryWithParams(this.__wbg_ptr, r, _, n);
      if (a[2]) throw d(a[1]);
      return d(a[0]);
    }
  };
  Symbol.dispose && (A.prototype[Symbol.dispose] = A.prototype.free);
  function F(e) {
    return e === null;
  }
  function B(e) {
    return e === void 0;
  }
  function q(e, t) {
    const n = t, r = typeof n == "string" ? n : void 0;
    var _ = y(r) ? 0 : w(r, s.__wbindgen_malloc, s.__wbindgen_realloc), a = f;
    W().setInt32(e + 4, a, true), W().setInt32(e + 0, _, true);
  }
  function P(e, t) {
    throw new Error(l(e, t));
  }
  function j() {
    return m(function(e, t) {
      return e.call(t);
    }, arguments);
  }
  function k(e) {
    clearInterval(e);
  }
  function M(e, t) {
    let n, r;
    try {
      n = e, r = t, console.error(l(e, t));
    } finally {
      s.__wbindgen_free(n, r, 1);
    }
  }
  function C() {
    return m(function(e, t) {
      globalThis.crypto.getRandomValues(I(e, t));
    }, arguments);
  }
  function U() {
    return m(function(e, t) {
      globalThis.crypto.getRandomValues(I(e, t));
    }, arguments);
  }
  function V(e) {
    let t;
    try {
      t = e instanceof Window;
    } catch {
      t = false;
    }
    return t;
  }
  function z(e) {
    console.log(e);
  }
  function N() {
    return new Object();
  }
  function G() {
    return new Array();
  }
  function J() {
    return new Error();
  }
  function H(e, t) {
    return new Function(l(e, t));
  }
  function $() {
    return m(function() {
      return Date.now();
    }, arguments);
  }
  function X() {
    return Date.now();
  }
  function Y(e) {
    return e.now();
  }
  function K(e) {
    const t = e.performance;
    return y(t) ? 0 : u(t);
  }
  function Q(e, t) {
    return e.push(t);
  }
  function Z(e, t) {
    return setInterval(e, t);
  }
  function ee(e, t) {
    return setTimeout(e, t);
  }
  function te() {
    return m(function(e, t, n) {
      return Reflect.set(e, t, n);
    }, arguments);
  }
  function _e(e, t) {
    const n = t.stack, r = w(n, s.__wbindgen_malloc, s.__wbindgen_realloc), _ = f;
    W().setInt32(e + 4, _, true), W().setInt32(e + 0, r, true);
  }
  function ne() {
    const e = typeof global > "u" ? null : global;
    return y(e) ? 0 : u(e);
  }
  function re() {
    const e = typeof globalThis > "u" ? null : globalThis;
    return y(e) ? 0 : u(e);
  }
  function se() {
    const e = typeof self > "u" ? null : self;
    return y(e) ? 0 : u(e);
  }
  function oe() {
    const e = typeof window > "u" ? null : window;
    return y(e) ? 0 : u(e);
  }
  function ae() {
    return m(function(e) {
      return JSON.stringify(e);
    }, arguments);
  }
  function ce(e, t) {
    return we(e, t, s.wasm_bindgen__closure__destroy__h975cc9e2fa1a0ad4, de);
  }
  function ie(e, t) {
    return l(e, t);
  }
  function be() {
    const e = s.__wbindgen_externrefs, t = e.grow(4);
    e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
  }
  function de(e, t) {
    s.wasm_bindgen__convert__closures_____invoke__h0facaf7b2541447d(e, t);
  }
  const fe = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_jserror_free(e >>> 0, 1)), R = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => s.__wbg_wasmdb_free(e >>> 0, 1));
  function u(e) {
    const t = s.__externref_table_alloc();
    return s.__wbindgen_externrefs.set(t, e), t;
  }
  const E = typeof FinalizationRegistry > "u" ? {
    register: () => {
    },
    unregister: () => {
    }
  } : new FinalizationRegistry((e) => e.dtor(e.a, e.b));
  function I(e, t) {
    return e = e >>> 0, h().subarray(e / 1, e / 1 + t);
  }
  let g = null;
  function W() {
    return (g === null || g.buffer.detached === true || g.buffer.detached === void 0 && g.buffer !== s.memory.buffer) && (g = new DataView(s.memory.buffer)), g;
  }
  function l(e, t) {
    return e = e >>> 0, ge(e, t);
  }
  let x = null;
  function h() {
    return (x === null || x.byteLength === 0) && (x = new Uint8Array(s.memory.buffer)), x;
  }
  function m(e, t) {
    try {
      return e.apply(this, t);
    } catch (n) {
      const r = u(n);
      s.__wbindgen_exn_store(r);
    }
  }
  function y(e) {
    return e == null;
  }
  function we(e, t, n, r) {
    const _ = {
      a: e,
      b: t,
      cnt: 1,
      dtor: n
    }, a = (...c) => {
      _.cnt++;
      const b = _.a;
      _.a = 0;
      try {
        return r(b, _.b, ...c);
      } finally {
        _.a = b, a._wbg_cb_unref();
      }
    };
    return a._wbg_cb_unref = () => {
      --_.cnt === 0 && (_.dtor(_.a, _.b), _.a = 0, E.unregister(_));
    }, E.register(a, _, _), a;
  }
  function w(e, t, n) {
    if (n === void 0) {
      const b = p.encode(e), i = t(b.length, 1) >>> 0;
      return h().subarray(i, i + b.length).set(b), f = b.length, i;
    }
    let r = e.length, _ = t(r, 1) >>> 0;
    const a = h();
    let c = 0;
    for (; c < r; c++) {
      const b = e.charCodeAt(c);
      if (b > 127) break;
      a[_ + c] = b;
    }
    if (c !== r) {
      c !== 0 && (e = e.slice(c)), _ = n(_, r, r = c + e.length * 3, 1) >>> 0;
      const b = h().subarray(_ + c, _ + r), i = p.encodeInto(e, b);
      c += i.written, _ = n(_, r, c, 1) >>> 0;
    }
    return f = c, _;
  }
  function d(e) {
    const t = s.__wbindgen_externrefs.get(e);
    return s.__externref_table_dealloc(e), t;
  }
  let T = new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
  });
  T.decode();
  const le = 2146435072;
  let v = 0;
  function ge(e, t) {
    return v += t, v >= le && (T = new TextDecoder("utf-8", {
      ignoreBOM: true,
      fatal: true
    }), T.decode(), v = t), T.decode(h().subarray(e, e + t));
  }
  const p = new TextEncoder();
  "encodeInto" in p || (p.encodeInto = function(e, t) {
    const n = p.encode(e);
    return t.set(n), {
      read: e.length,
      written: n.length
    };
  });
  let f = 0, s;
  function ue(e) {
    s = e;
  }
  URL = globalThis.URL;
  const o = await D({
    "./reifydb_webassembly_bg.js": {
      __wbg_new_8a6f238a6ece86ea: J,
      __wbg_stack_0ed75d68575b0f3c: _e,
      __wbg_error_7534b8e9a36f1ab4: M,
      __wbg_getRandomValues_2a91986308c74a93: C,
      __wbg_setTimeout_7702ef22255da2d5: ee,
      __wbg_setInterval_ab894f21d858a133: Z,
      __wbg_clearInterval_b7b60b3b939a3e0d: k,
      __wbg_instanceof_Window_ed49b2db8df90359: V,
      __wbg_performance_06f12ba62483475d: K,
      __wbg_log_6b5ca2e6124b2808: z,
      __wbg_now_ebffdf7e580f210d: Y,
      __wbg_new_3eb36ae241fe6f44: G,
      __wbg_new_361308b2356cecd0: N,
      __wbg_new_no_args_1c7c842f08d00ebb: H,
      __wbg_now_a3af9a2f4bbaa4d1: X,
      __wbg_push_8ffdcb2063340ba5: Q,
      __wbg_static_accessor_GLOBAL_THIS_e628e89ab3b1c95f: re,
      __wbg_call_389efe28435a9388: j,
      __wbg_static_accessor_SELF_a621d3dfbb60d0ce: se,
      __wbg_static_accessor_GLOBAL_12837167ad935116: ne,
      __wbg_static_accessor_WINDOW_f8727f0cf888e0bd: oe,
      __wbg_stringify_8d1cc6ff383e8bae: ae,
      __wbg_set_6cb8631f80447a67: te,
      __wbg_getRandomValues_9b655bdd369112f2: U,
      __wbg_now_37839916ec63896b: $,
      __wbg___wbindgen_throw_be289d5034ed271b: P,
      __wbg___wbindgen_is_null_ac34f5003991759a: F,
      __wbg___wbindgen_string_get_72fb696202c56729: q,
      __wbg___wbindgen_is_undefined_9e4d92534c42d778: B,
      __wbindgen_init_externref_table: be,
      __wbindgen_cast_0000000000000001: ce,
      __wbindgen_cast_0000000000000002: ie
    }
  }, O), me = o.memory, ye = o.__wbg_wasmdb_free, he = o.wasmdb_admin, pe = o.wasmdb_adminText, xe = o.wasmdb_adminWithParams, Te = o.wasmdb_command, We = o.wasmdb_commandText, ve = o.wasmdb_commandWithParams, Se = o.wasmdb_new, Ae = o.wasmdb_query, Re = o.wasmdb_queryText, Ee = o.wasmdb_queryWithParams, Ie = o.__wbg_jserror_free, Le = o.jserror_message, Oe = o.host_log_message, De = o.host_alloc, Fe = o.host_free, Be = o.host_realloc, qe = o.test_alloc, Pe = o.test_free, je = o.test_log_message, ke = o.test_realloc, Me = o.test_state_clear, Ce = o.test_state_get, Ue = o.test_state_iterator_free, Ve = o.test_state_iterator_next, ze = o.test_state_prefix, Ne = o.test_state_range, Ge = o.test_state_remove, Je = o.test_state_set, He = o.wasm_bindgen__closure__destroy__h975cc9e2fa1a0ad4, $e = o.wasm_bindgen__convert__closures_____invoke__h0facaf7b2541447d, Xe = o.__wbindgen_malloc, Ye = o.__wbindgen_realloc, Ke = o.__wbindgen_exn_store, Qe = o.__externref_table_alloc, Ze = o.__wbindgen_externrefs, et = o.__wbindgen_free, tt = o.__externref_table_dealloc, L = o.__wbindgen_start, _t = Object.freeze(Object.defineProperty({
    __proto__: null,
    __externref_table_alloc: Qe,
    __externref_table_dealloc: tt,
    __wbg_jserror_free: Ie,
    __wbg_wasmdb_free: ye,
    __wbindgen_exn_store: Ke,
    __wbindgen_externrefs: Ze,
    __wbindgen_free: et,
    __wbindgen_malloc: Xe,
    __wbindgen_realloc: Ye,
    __wbindgen_start: L,
    host_alloc: De,
    host_free: Fe,
    host_log_message: Oe,
    host_realloc: Be,
    jserror_message: Le,
    memory: me,
    test_alloc: qe,
    test_free: Pe,
    test_log_message: je,
    test_realloc: ke,
    test_state_clear: Me,
    test_state_get: Ce,
    test_state_iterator_free: Ue,
    test_state_iterator_next: Ve,
    test_state_prefix: ze,
    test_state_range: Ne,
    test_state_remove: Ge,
    test_state_set: Je,
    wasm_bindgen__closure__destroy__h975cc9e2fa1a0ad4: He,
    wasm_bindgen__convert__closures_____invoke__h0facaf7b2541447d: $e,
    wasmdb_admin: he,
    wasmdb_adminText: pe,
    wasmdb_adminWithParams: xe,
    wasmdb_command: Te,
    wasmdb_commandText: We,
    wasmdb_commandWithParams: ve,
    wasmdb_new: Se,
    wasmdb_query: Ae,
    wasmdb_queryText: Re,
    wasmdb_queryWithParams: Ee
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  ue(_t);
  L();
})();
export {
  S as JsError,
  A as WasmDB,
  __tla
};
