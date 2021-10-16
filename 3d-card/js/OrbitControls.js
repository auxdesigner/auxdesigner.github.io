import {
  EventDispatcher as Ye,
  MOUSE as m,
  Quaternion as ue,
  Spherical as pe,
  TOUCH as f,
  Vector2 as u,
  Vector3 as b,
} from "/js/three.js";
const he = { type: "change" },
  Z = { type: "start" },
  v = { type: "end" };
class de extends Ye {
  constructor(x, D) {
    super();
    D === void 0 &&
      console.warn(
        'THREE.OrbitControls: The second parameter "domElement" is now mandatory.'
      ),
      D === document &&
        console.error(
          'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'
        ),
      (this.object = x),
      (this.domElement = D),
      (this.domElement.style.touchAction = "none"),
      (this.enabled = !0),
      (this.target = new b()),
      (this.minDistance = 0),
      (this.maxDistance = Infinity),
      (this.minZoom = 0),
      (this.maxZoom = Infinity),
      (this.minPolarAngle = 0),
      (this.maxPolarAngle = Math.PI),
      (this.minAzimuthAngle = -Infinity),
      (this.maxAzimuthAngle = Infinity),
      (this.enableDamping = !1),
      (this.dampingFactor = 0.05),
      (this.enableZoom = !0),
      (this.zoomSpeed = 1),
      (this.enableRotate = !0),
      (this.rotateSpeed = 1),
      (this.enablePan = !0),
      (this.panSpeed = 1),
      (this.screenSpacePanning = !0),
      (this.keyPanSpeed = 7),
      (this.autoRotate = !1),
      (this.autoRotateSpeed = 2),
      (this.keys = {
        LEFT: "ArrowLeft",
        UP: "ArrowUp",
        RIGHT: "ArrowRight",
        BOTTOM: "ArrowDown",
      }),
      (this.mouseButtons = { LEFT: m.ROTATE, MIDDLE: m.DOLLY, RIGHT: m.PAN }),
      (this.touches = { ONE: f.ROTATE, TWO: f.DOLLY_PAN }),
      (this.target0 = this.target.clone()),
      (this.position0 = this.object.position.clone()),
      (this.zoom0 = this.object.zoom),
      (this._domElementKeyEvents = null),
      (this.getPolarAngle = function () {
        return s.phi;
      }),
      (this.getAzimuthalAngle = function () {
        return s.theta;
      }),
      (this.getDistance = function () {
        return this.object.position.distanceTo(this.target);
      }),
      (this.listenToKeyEvents = function (t) {
        t.addEventListener("keydown", ie), (this._domElementKeyEvents = t);
      }),
      (this.saveState = function () {
        e.target0.copy(e.target),
          e.position0.copy(e.object.position),
          (e.zoom0 = e.object.zoom);
      }),
      (this.reset = function () {
        e.target.copy(e.target0),
          e.object.position.copy(e.position0),
          (e.object.zoom = e.zoom0),
          e.object.updateProjectionMatrix(),
          e.dispatchEvent(he),
          e.update(),
          (i = o.NONE);
      }),
      (this.update = (function () {
        const t = new b(),
          n = new ue().setFromUnitVectors(x.up, new b(0, 1, 0)),
          r = n.clone().invert(),
          c = new b(),
          l = new ue(),
          N = 2 * Math.PI;
        return function () {
          const le = e.object.position;
          t.copy(le).sub(e.target),
            t.applyQuaternion(n),
            s.setFromVector3(t),
            e.autoRotate && i === o.NONE && C(fe()),
            e.enableDamping
              ? ((s.theta += p.theta * e.dampingFactor),
                (s.phi += p.phi * e.dampingFactor))
              : ((s.theta += p.theta), (s.phi += p.phi));
          let h = e.minAzimuthAngle,
            d = e.maxAzimuthAngle;
          return (
            isFinite(h) &&
              isFinite(d) &&
              (h < -Math.PI ? (h += N) : h > Math.PI && (h -= N),
              d < -Math.PI ? (d += N) : d > Math.PI && (d -= N),
              h <= d
                ? (s.theta = Math.max(h, Math.min(d, s.theta)))
                : (s.theta =
                    s.theta > (h + d) / 2
                      ? Math.max(h, s.theta)
                      : Math.min(d, s.theta))),
            (s.phi = Math.max(
              e.minPolarAngle,
              Math.min(e.maxPolarAngle, s.phi)
            )),
            s.makeSafe(),
            (s.radius *= j),
            (s.radius = Math.max(
              e.minDistance,
              Math.min(e.maxDistance, s.radius)
            )),
            e.enableDamping === !0
              ? e.target.addScaledVector(P, e.dampingFactor)
              : e.target.add(P),
            t.setFromSpherical(s),
            t.applyQuaternion(r),
            le.copy(e.target).add(t),
            e.object.lookAt(e.target),
            e.enableDamping === !0
              ? ((p.theta *= 1 - e.dampingFactor),
                (p.phi *= 1 - e.dampingFactor),
                P.multiplyScalar(1 - e.dampingFactor))
              : (p.set(0, 0, 0), P.set(0, 0, 0)),
            (j = 1),
            S ||
            c.distanceToSquared(e.object.position) > F ||
            8 * (1 - l.dot(e.object.quaternion)) > F
              ? (e.dispatchEvent(he),
                c.copy(e.object.position),
                l.copy(e.object.quaternion),
                (S = !1),
                !0)
              : !1
          );
        };
      })()),
      (this.dispose = function () {
        e.domElement.removeEventListener("contextmenu", se),
          e.domElement.removeEventListener("pointerdown", ne),
          e.domElement.removeEventListener("pointercancel", oe),
          e.domElement.removeEventListener("wheel", ae),
          e.domElement.removeEventListener("pointermove", H),
          e.domElement.removeEventListener("pointerup", U),
          e._domElementKeyEvents !== null &&
            e._domElementKeyEvents.removeEventListener("keydown", ie);
      });
    const e = this,
      o = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_PAN: 4,
        TOUCH_DOLLY_PAN: 5,
        TOUCH_DOLLY_ROTATE: 6,
      };
    let i = o.NONE;
    const F = 1e-6,
      s = new pe(),
      p = new pe();
    let j = 1;
    const P = new b();
    let S = !1;
    const E = new u(),
      g = new u(),
      O = new u(),
      y = new u(),
      T = new u(),
      A = new u(),
      M = new u(),
      w = new u(),
      R = new u(),
      a = [],
      k = {};
    function fe() {
      return ((2 * Math.PI) / 60 / 60) * e.autoRotateSpeed;
    }
    function I() {
      return Math.pow(0.95, e.zoomSpeed);
    }
    function C(t) {
      p.theta -= t;
    }
    function X(t) {
      p.phi -= t;
    }
    const K = (function () {
        const t = new b();
        return function (r, c) {
          t.setFromMatrixColumn(c, 0), t.multiplyScalar(-r), P.add(t);
        };
      })(),
      V = (function () {
        const t = new b();
        return function (r, c) {
          e.screenSpacePanning === !0
            ? t.setFromMatrixColumn(c, 1)
            : (t.setFromMatrixColumn(c, 0), t.crossVectors(e.object.up, t)),
            t.multiplyScalar(r),
            P.add(t);
        };
      })(),
      L = (function () {
        const t = new b();
        return function (r, c) {
          const l = e.domElement;
          if (e.object.isPerspectiveCamera) {
            const N = e.object.position;
            t.copy(N).sub(e.target);
            let Y = t.length();
            (Y *= Math.tan(((e.object.fov / 2) * Math.PI) / 180)),
              K((2 * r * Y) / l.clientHeight, e.object.matrix),
              V((2 * c * Y) / l.clientHeight, e.object.matrix);
          } else
            e.object.isOrthographicCamera
              ? (K(
                  (r * (e.object.right - e.object.left)) /
                    e.object.zoom /
                    l.clientWidth,
                  e.object.matrix
                ),
                V(
                  (c * (e.object.top - e.object.bottom)) /
                    e.object.zoom /
                    l.clientHeight,
                  e.object.matrix
                ))
              : (console.warn(
                  "WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."
                ),
                (e.enablePan = !1));
        };
      })();
    function _(t) {
      e.object.isPerspectiveCamera
        ? (j /= t)
        : e.object.isOrthographicCamera
        ? ((e.object.zoom = Math.max(
            e.minZoom,
            Math.min(e.maxZoom, e.object.zoom * t)
          )),
          e.object.updateProjectionMatrix(),
          (S = !0))
        : (console.warn(
            "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
          ),
          (e.enableZoom = !1));
    }
    function W(t) {
      e.object.isPerspectiveCamera
        ? (j *= t)
        : e.object.isOrthographicCamera
        ? ((e.object.zoom = Math.max(
            e.minZoom,
            Math.min(e.maxZoom, e.object.zoom / t)
          )),
          e.object.updateProjectionMatrix(),
          (S = !0))
        : (console.warn(
            "WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."
          ),
          (e.enableZoom = !1));
    }
    function B(t) {
      E.set(t.clientX, t.clientY);
    }
    function be(t) {
      M.set(t.clientX, t.clientY);
    }
    function G(t) {
      y.set(t.clientX, t.clientY);
    }
    function Ee(t) {
      g.set(t.clientX, t.clientY),
        O.subVectors(g, E).multiplyScalar(e.rotateSpeed);
      const n = e.domElement;
      C((2 * Math.PI * O.x) / n.clientHeight),
        X((2 * Math.PI * O.y) / n.clientHeight),
        E.copy(g),
        e.update();
    }
    function ge(t) {
      w.set(t.clientX, t.clientY),
        R.subVectors(w, M),
        R.y > 0 ? _(I()) : R.y < 0 && W(I()),
        M.copy(w),
        e.update();
    }
    function ye(t) {
      T.set(t.clientX, t.clientY),
        A.subVectors(T, y).multiplyScalar(e.panSpeed),
        L(A.x, A.y),
        y.copy(T),
        e.update();
    }
    function Te() {}
    function Pe(t) {
      t.deltaY < 0 ? W(I()) : t.deltaY > 0 && _(I()), e.update();
    }
    function Oe(t) {
      let n = !1;
      switch (t.code) {
        case e.keys.UP:
          L(0, e.keyPanSpeed), (n = !0);
          break;
        case e.keys.BOTTOM:
          L(0, -e.keyPanSpeed), (n = !0);
          break;
        case e.keys.LEFT:
          L(e.keyPanSpeed, 0), (n = !0);
          break;
        case e.keys.RIGHT:
          L(-e.keyPanSpeed, 0), (n = !0);
          break;
      }
      n && (t.preventDefault(), e.update());
    }
    function q() {
      if (a.length === 1) E.set(a[0].pageX, a[0].pageY);
      else {
        const t = 0.5 * (a[0].pageX + a[1].pageX),
          n = 0.5 * (a[0].pageY + a[1].pageY);
        E.set(t, n);
      }
    }
    function Q() {
      if (a.length === 1) y.set(a[0].pageX, a[0].pageY);
      else {
        const t = 0.5 * (a[0].pageX + a[1].pageX),
          n = 0.5 * (a[0].pageY + a[1].pageY);
        y.set(t, n);
      }
    }
    function J() {
      const t = a[0].pageX - a[1].pageX,
        n = a[0].pageY - a[1].pageY,
        r = Math.sqrt(t * t + n * n);
      M.set(0, r);
    }
    function Ae() {
      e.enableZoom && J(), e.enablePan && Q();
    }
    function Me() {
      e.enableZoom && J(), e.enableRotate && q();
    }
    function $(t) {
      if (a.length == 1) g.set(t.pageX, t.pageY);
      else {
        const r = z(t),
          c = 0.5 * (t.pageX + r.x),
          l = 0.5 * (t.pageY + r.y);
        g.set(c, l);
      }
      O.subVectors(g, E).multiplyScalar(e.rotateSpeed);
      const n = e.domElement;
      C((2 * Math.PI * O.x) / n.clientHeight),
        X((2 * Math.PI * O.y) / n.clientHeight),
        E.copy(g);
    }
    function ee(t) {
      if (a.length === 1) T.set(t.pageX, t.pageY);
      else {
        const n = z(t),
          r = 0.5 * (t.pageX + n.x),
          c = 0.5 * (t.pageY + n.y);
        T.set(r, c);
      }
      A.subVectors(T, y).multiplyScalar(e.panSpeed), L(A.x, A.y), y.copy(T);
    }
    function te(t) {
      const n = z(t),
        r = t.pageX - n.x,
        c = t.pageY - n.y,
        l = Math.sqrt(r * r + c * c);
      w.set(0, l),
        R.set(0, Math.pow(w.y / M.y, e.zoomSpeed)),
        _(R.y),
        M.copy(w);
    }
    function we(t) {
      e.enableZoom && te(t), e.enablePan && ee(t);
    }
    function Le(t) {
      e.enableZoom && te(t), e.enableRotate && $(t);
    }
    function Ne() {}
    function ne(t) {
      if (e.enabled === !1) return;
      a.length === 0 &&
        (e.domElement.setPointerCapture(t.pointerId),
        e.domElement.addEventListener("pointermove", H),
        e.domElement.addEventListener("pointerup", U)),
        Ie(t),
        t.pointerType === "touch" ? je(t) : De(t);
    }
    function H(t) {
      if (e.enabled === !1) return;
      t.pointerType === "touch" ? Se(t) : Re(t);
    }
    function U(t) {
      if (e.enabled === !1) return;
      t.pointerType === "touch" ? ke() : xe(t),
        re(t),
        a.length === 0 &&
          (e.domElement.releasePointerCapture(t.pointerId),
          e.domElement.removeEventListener("pointermove", H),
          e.domElement.removeEventListener("pointerup", U));
    }
    function oe(t) {
      re(t);
    }
    function De(t) {
      let n;
      switch (t.button) {
        case 0:
          n = e.mouseButtons.LEFT;
          break;
        case 1:
          n = e.mouseButtons.MIDDLE;
          break;
        case 2:
          n = e.mouseButtons.RIGHT;
          break;
        default:
          n = -1;
      }
      switch (n) {
        case m.DOLLY:
          if (e.enableZoom === !1) return;
          be(t), (i = o.DOLLY);
          break;
        case m.ROTATE:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enablePan === !1) return;
            G(t), (i = o.PAN);
          } else {
            if (e.enableRotate === !1) return;
            B(t), (i = o.ROTATE);
          }
          break;
        case m.PAN:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enableRotate === !1) return;
            B(t), (i = o.ROTATE);
          } else {
            if (e.enablePan === !1) return;
            G(t), (i = o.PAN);
          }
          break;
        default:
          i = o.NONE;
      }
      i !== o.NONE && e.dispatchEvent(Z);
    }
    function Re(t) {
      if (e.enabled === !1) return;
      switch (i) {
        case o.ROTATE:
          if (e.enableRotate === !1) return;
          Ee(t);
          break;
        case o.DOLLY:
          if (e.enableZoom === !1) return;
          ge(t);
          break;
        case o.PAN:
          if (e.enablePan === !1) return;
          ye(t);
          break;
      }
    }
    function xe(t) {
      Te(t), e.dispatchEvent(v), (i = o.NONE);
    }
    function ae(t) {
      if (
        e.enabled === !1 ||
        e.enableZoom === !1 ||
        (i !== o.NONE && i !== o.ROTATE)
      )
        return;
      t.preventDefault(), e.dispatchEvent(Z), Pe(t), e.dispatchEvent(v);
    }
    function ie(t) {
      if (e.enabled === !1 || e.enablePan === !1) return;
      Oe(t);
    }
    function je(t) {
      ce(t);
      switch (a.length) {
        case 1:
          switch (e.touches.ONE) {
            case f.ROTATE:
              if (e.enableRotate === !1) return;
              q(), (i = o.TOUCH_ROTATE);
              break;
            case f.PAN:
              if (e.enablePan === !1) return;
              Q(), (i = o.TOUCH_PAN);
              break;
            default:
              i = o.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case f.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1) return;
              Ae(), (i = o.TOUCH_DOLLY_PAN);
              break;
            case f.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1) return;
              Me(), (i = o.TOUCH_DOLLY_ROTATE);
              break;
            default:
              i = o.NONE;
          }
          break;
        default:
          i = o.NONE;
      }
      i !== o.NONE && e.dispatchEvent(Z);
    }
    function Se(t) {
      ce(t);
      switch (i) {
        case o.TOUCH_ROTATE:
          if (e.enableRotate === !1) return;
          $(t), e.update();
          break;
        case o.TOUCH_PAN:
          if (e.enablePan === !1) return;
          ee(t), e.update();
          break;
        case o.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1) return;
          we(t), e.update();
          break;
        case o.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1) return;
          Le(t), e.update();
          break;
        default:
          i = o.NONE;
      }
    }
    function ke(t) {
      Ne(t), e.dispatchEvent(v), (i = o.NONE);
    }
    function se(t) {
      if (e.enabled === !1) return;
      t.preventDefault();
    }
    function Ie(t) {
      a.push(t);
    }
    function re(t) {
      delete k[t.pointerId];
      for (let n = 0; n < a.length; n++)
        if (a[n].pointerId == t.pointerId) {
          a.splice(n, 1);
          return;
        }
    }
    function ce(t) {
      let n = k[t.pointerId];
      n === void 0 && ((n = new u()), (k[t.pointerId] = n)),
        n.set(t.pageX, t.pageY);
    }
    function z(t) {
      const n = t.pointerId === a[0].pointerId ? a[1] : a[0];
      return k[n.pointerId];
    }
    e.domElement.addEventListener("contextmenu", se),
      e.domElement.addEventListener("pointerdown", ne),
      e.domElement.addEventListener("pointercancel", oe),
      e.domElement.addEventListener("wheel", ae, { passive: !1 }),
      this.update();
  }
}
class Ce extends de {
  constructor(x, D) {
    super(x, D);
    (this.screenSpacePanning = !1),
      (this.mouseButtons.LEFT = m.PAN),
      (this.mouseButtons.RIGHT = m.ROTATE),
      (this.touches.ONE = f.PAN),
      (this.touches.TWO = f.DOLLY_ROTATE);
  }
}
export { de as OrbitControls, Ce as MapControls };
export default null;
