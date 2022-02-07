import {
  BackSide as P,
  Color as B,
  ShaderMaterial as E,
  UniformsLib as p,
  UniformsUtils as U,
} from "/js/three.js";
class z {
  constructor(i, s = {}) {
    this.enabled = !0;
    const m = s.defaultThickness !== void 0 ? s.defaultThickness : 0.003,
      h = new B().fromArray(
        s.defaultColor !== void 0 ? s.defaultColor : [0, 0, 0]
      ),
      v = s.defaultAlpha !== void 0 ? s.defaultAlpha : 1,
      g = s.defaultKeepAlive !== void 0 ? s.defaultKeepAlive : !1,
      l = {},
      _ = 60,
      o = {},
      r = {},
      x = {
        outlineThickness: { value: m },
        outlineColor: { value: h },
        outlineAlpha: { value: v },
      },
      k = [
        "#include <common>",
        "#include <uv_pars_vertex>",
        "#include <displacementmap_pars_vertex>",
        "#include <fog_pars_vertex>",
        "#include <morphtarget_pars_vertex>",
        "#include <skinning_pars_vertex>",
        "#include <logdepthbuf_pars_vertex>",
        "#include <clipping_planes_pars_vertex>",
        "uniform float outlineThickness;",
        "vec4 calculateOutline( vec4 pos, vec3 normal, vec4 skinned ) {",
        "	float thickness = outlineThickness;",
        "	const float ratio = 1.0;",
        "	vec4 pos2 = projectionMatrix * modelViewMatrix * vec4( skinned.xyz + normal, 1.0 );",
        "	vec4 norm = normalize( pos - pos2 );",
        "	return pos + norm * thickness * pos.w * ratio;",
        "}",
        "void main() {",
        "	#include <uv_vertex>",
        "	#include <beginnormal_vertex>",
        "	#include <morphnormal_vertex>",
        "	#include <skinbase_vertex>",
        "	#include <skinnormal_vertex>",
        "	#include <begin_vertex>",
        "	#include <morphtarget_vertex>",
        "	#include <skinning_vertex>",
        "	#include <displacementmap_vertex>",
        "	#include <project_vertex>",
        "	vec3 outlineNormal = - objectNormal;",
        "	gl_Position = calculateOutline( gl_Position, outlineNormal, vec4( transformed, 1.0 ) );",
        "	#include <logdepthbuf_vertex>",
        "	#include <clipping_planes_vertex>",
        "	#include <fog_vertex>",
        "}",
      ].join(`
`),
      A = [
        "#include <common>",
        "#include <fog_pars_fragment>",
        "#include <logdepthbuf_pars_fragment>",
        "#include <clipping_planes_pars_fragment>",
        "uniform vec3 outlineColor;",
        "uniform float outlineAlpha;",
        "void main() {",
        "	#include <clipping_planes_fragment>",
        "	#include <logdepthbuf_fragment>",
        "	gl_FragColor = vec4( outlineColor, outlineAlpha );",
        "	#include <tonemapping_fragment>",
        "	#include <encodings_fragment>",
        "	#include <fog_fragment>",
        "	#include <premultiplied_alpha_fragment>",
        "}",
      ].join(`
`);
    function C() {
      return new E({
        type: "OutlineEffect",
        uniforms: U.merge([p.fog, p.displacementmap, x]),
        vertexShader: k,
        fragmentShader: A,
        side: P,
      });
    }
    function S(e) {
      let n = l[e.uuid];
      return (
        n === void 0 &&
          ((n = { material: C(), used: !0, keepAlive: g, count: 0 }),
          (l[e.uuid] = n)),
        (n.used = !0),
        n.material
      );
    }
    function f(e) {
      const n = S(e);
      return (o[n.uuid] = e), R(n, e), n;
    }
    function c(e) {
      const n = e.geometry;
      let t = !1;
      return (
        e.geometry !== void 0 &&
          (n.isBufferGeometry
            ? (t = n.attributes.normal !== void 0)
            : (t = !0)),
        e.isMesh === !0 && e.material !== void 0 && t === !0
      );
    }
    function y(e) {
      if (c(e) === !1) return;
      if (Array.isArray(e.material))
        for (let n = 0, t = e.material.length; n < t; n++)
          e.material[n] = f(e.material[n]);
      else e.material = f(e.material);
      (r[e.uuid] = e.onBeforeRender), (e.onBeforeRender = O);
    }
    function T(e) {
      if (c(e) === !1) return;
      if (Array.isArray(e.material))
        for (let n = 0, t = e.material.length; n < t; n++)
          e.material[n] = o[e.material[n].uuid];
      else e.material = o[e.material.uuid];
      e.onBeforeRender = r[e.uuid];
    }
    function O(e, n, t, u, a) {
      const d = o[a.uuid];
      if (d === void 0) return;
      w(a, d);
    }
    function w(e, n) {
      const t = n.userData.outlineParameters;
      (e.uniforms.outlineAlpha.value = n.opacity),
        t !== void 0 &&
          (t.thickness !== void 0 &&
            (e.uniforms.outlineThickness.value = t.thickness),
          t.color !== void 0 &&
            e.uniforms.outlineColor.value.fromArray(t.color),
          t.alpha !== void 0 && (e.uniforms.outlineAlpha.value = t.alpha)),
        n.displacementMap &&
          ((e.uniforms.displacementMap.value = n.displacementMap),
          (e.uniforms.displacementScale.value = n.displacementScale),
          (e.uniforms.displacementBias.value = n.displacementBias));
    }
    function R(e, n) {
      if (e.name === "invisible") return;
      const t = n.userData.outlineParameters;
      (e.fog = n.fog),
        (e.toneMapped = n.toneMapped),
        (e.premultipliedAlpha = n.premultipliedAlpha),
        (e.displacementMap = n.displacementMap),
        t !== void 0
          ? (n.visible === !1
              ? (e.visible = !1)
              : (e.visible = t.visible !== void 0 ? t.visible : !0),
            (e.transparent =
              t.alpha !== void 0 && t.alpha < 1 ? !0 : n.transparent),
            t.keepAlive !== void 0 && (l[n.uuid].keepAlive = t.keepAlive))
          : ((e.transparent = n.transparent), (e.visible = n.visible)),
        (n.wireframe === !0 || n.depthTest === !1) && (e.visible = !1),
        n.clippingPlanes &&
          ((e.clipping = !0),
          (e.clippingPlanes = n.clippingPlanes),
          (e.clipIntersection = n.clipIntersection),
          (e.clipShadows = n.clipShadows)),
        (e.version = n.version);
    }
    function b() {
      let e;
      e = Object.keys(o);
      for (let n = 0, t = e.length; n < t; n++) o[e[n]] = void 0;
      e = Object.keys(r);
      for (let n = 0, t = e.length; n < t; n++) r[e[n]] = void 0;
      e = Object.keys(l);
      for (let n = 0, t = e.length; n < t; n++) {
        const u = e[n];
        l[u].used === !1
          ? (l[u].count++,
            l[u].keepAlive === !1 && l[u].count > _ && delete l[u])
          : ((l[u].used = !1), (l[u].count = 0));
      }
    }
    (this.render = function (e, n) {
      let t,
        u = !1;
      if (
        (arguments[2] !== void 0 &&
          (console.warn(
            "THREE.OutlineEffect.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."
          ),
          (t = arguments[2])),
        arguments[3] !== void 0 &&
          (console.warn(
            "THREE.OutlineEffect.render(): the forceClear argument has been removed. Use .clear() instead."
          ),
          (u = arguments[3])),
        t !== void 0 && i.setRenderTarget(t),
        u && i.clear(),
        this.enabled === !1)
      ) {
        i.render(e, n);
        return;
      }
      const a = i.autoClear;
      (i.autoClear = this.autoClear),
        i.render(e, n),
        (i.autoClear = a),
        this.renderOutline(e, n);
    }),
      (this.renderOutline = function (e, n) {
        const t = i.autoClear,
          u = e.autoUpdate,
          a = e.background,
          d = i.shadowMap.enabled;
        (e.autoUpdate = !1),
          (e.background = null),
          (i.autoClear = !1),
          (i.shadowMap.enabled = !1),
          e.traverse(y),
          i.render(e, n),
          e.traverse(T),
          b(),
          (e.autoUpdate = u),
          (e.background = a),
          (i.autoClear = t),
          (i.shadowMap.enabled = d);
      }),
      (this.autoClear = i.autoClear),
      (this.domElement = i.domElement),
      (this.shadowMap = i.shadowMap),
      (this.clear = function (e, n, t) {
        i.clear(e, n, t);
      }),
      (this.getPixelRatio = function () {
        return i.getPixelRatio();
      }),
      (this.setPixelRatio = function (e) {
        i.setPixelRatio(e);
      }),
      (this.getSize = function (e) {
        return i.getSize(e);
      }),
      (this.setSize = function (e, n, t) {
        i.setSize(e, n, t);
      }),
      (this.setViewport = function (e, n, t, u) {
        i.setViewport(e, n, t, u);
      }),
      (this.setScissor = function (e, n, t, u) {
        i.setScissor(e, n, t, u);
      }),
      (this.setScissorTest = function (e) {
        i.setScissorTest(e);
      }),
      (this.setRenderTarget = function (e) {
        i.setRenderTarget(e);
      });
  }
}
export { z as OutlineEffect };
export default null;
