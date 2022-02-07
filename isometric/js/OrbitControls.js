import {
  EventDispatcher as je,
  MOUSE as d,
  Quaternion as le,
  Spherical as ue,
  TOUCH as f,
  Vector2 as u,
  Vector3 as b,
} from "/js/three.js";
const pe = { type: "change" },
  v = { type: "start" },
  he = { type: "end" };
class me extends je {
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
      (this.mouseButtons = { LEFT: d.ROTATE, MIDDLE: d.DOLLY, RIGHT: d.PAN }),
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
        t.addEventListener("keydown", ae), (this._domElementKeyEvents = t);
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
          e.dispatchEvent(pe),
          e.update(),
          (i = a.NONE);
      }),
      (this.update = (function () {
        const t = new b(),
          n = new le().setFromUnitVectors(x.up, new b(0, 1, 0)),
          r = n.clone().invert(),
          c = new b(),
          l = new le(),
          N = 2 * Math.PI;
        return function () {
          const ce = e.object.position;
          t.copy(ce).sub(e.target),
            t.applyQuaternion(n),
            s.setFromVector3(t),
            e.autoRotate && i === a.NONE && C(fe()),
            e.enableDamping
              ? ((s.theta += p.theta * e.dampingFactor),
                (s.phi += p.phi * e.dampingFactor))
              : ((s.theta += p.theta), (s.phi += p.phi));
          let h = e.minAzimuthAngle,
            m = e.maxAzimuthAngle;
          return (
            isFinite(h) &&
              isFinite(m) &&
              (h < -Math.PI ? (h += N) : h > Math.PI && (h -= N),
              m < -Math.PI ? (m += N) : m > Math.PI && (m -= N),
              h <= m
                ? (s.theta = Math.max(h, Math.min(m, s.theta)))
                : (s.theta =
                    s.theta > (h + m) / 2
                      ? Math.max(h, s.theta)
                      : Math.min(m, s.theta))),
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
            ce.copy(e.target).add(t),
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
              ? (e.dispatchEvent(pe),
                c.copy(e.object.position),
                l.copy(e.object.quaternion),
                (S = !1),
                !0)
              : !1
          );
        };
      })()),
      (this.dispose = function () {
        e.domElement.removeEventListener("contextmenu", ie),
          e.domElement.removeEventListener("pointerdown", te),
          e.domElement.removeEventListener("pointercancel", ne),
          e.domElement.removeEventListener("wheel", oe),
          e.domElement.removeEventListener("pointermove", H),
          e.domElement.removeEventListener("pointerup", z),
          e._domElementKeyEvents !== null &&
            e._domElementKeyEvents.removeEventListener("keydown", ae);
      });
    const e = this,
      a = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_PAN: 4,
        TOUCH_DOLLY_PAN: 5,
        TOUCH_DOLLY_ROTATE: 6,
      };
    let i = a.NONE;
    const F = 1e-6,
      s = new ue(),
      p = new ue();
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
      o = [],
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
    function Z(t) {
      p.phi -= t;
    }
    const X = (function () {
        const t = new b();
        return function (r, c) {
          t.setFromMatrixColumn(c, 0), t.multiplyScalar(-r), P.add(t);
        };
      })(),
      K = (function () {
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
              X((2 * r * Y) / l.clientHeight, e.object.matrix),
              K((2 * c * Y) / l.clientHeight, e.object.matrix);
          } else
            e.object.isOrthographicCamera
              ? (X(
                  (r * (e.object.right - e.object.left)) /
                    e.object.zoom /
                    l.clientWidth,
                  e.object.matrix
                ),
                K(
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
    function V(t) {
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
    function W(t) {
      y.set(t.clientX, t.clientY);
    }
    function Ee(t) {
      g.set(t.clientX, t.clientY),
        O.subVectors(g, E).multiplyScalar(e.rotateSpeed);
      const n = e.domElement;
      C((2 * Math.PI * O.x) / n.clientHeight),
        Z((2 * Math.PI * O.y) / n.clientHeight),
        E.copy(g),
        e.update();
    }
    function ge(t) {
      w.set(t.clientX, t.clientY),
        R.subVectors(w, M),
        R.y > 0 ? _(I()) : R.y < 0 && V(I()),
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
    function Te(t) {
      t.deltaY < 0 ? V(I()) : t.deltaY > 0 && _(I()), e.update();
    }
    function Pe(t) {
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
      if (o.length === 1) E.set(o[0].pageX, o[0].pageY);
      else {
        const t = 0.5 * (o[0].pageX + o[1].pageX),
          n = 0.5 * (o[0].pageY + o[1].pageY);
        E.set(t, n);
      }
    }
    function G() {
      if (o.length === 1) y.set(o[0].pageX, o[0].pageY);
      else {
        const t = 0.5 * (o[0].pageX + o[1].pageX),
          n = 0.5 * (o[0].pageY + o[1].pageY);
        y.set(t, n);
      }
    }
    function Q() {
      const t = o[0].pageX - o[1].pageX,
        n = o[0].pageY - o[1].pageY,
        r = Math.sqrt(t * t + n * n);
      M.set(0, r);
    }
    function Oe() {
      e.enableZoom && Q(), e.enablePan && G();
    }
    function Ae() {
      e.enableZoom && Q(), e.enableRotate && q();
    }
    function J(t) {
      if (o.length == 1) g.set(t.pageX, t.pageY);
      else {
        const r = U(t),
          c = 0.5 * (t.pageX + r.x),
          l = 0.5 * (t.pageY + r.y);
        g.set(c, l);
      }
      O.subVectors(g, E).multiplyScalar(e.rotateSpeed);
      const n = e.domElement;
      C((2 * Math.PI * O.x) / n.clientHeight),
        Z((2 * Math.PI * O.y) / n.clientHeight),
        E.copy(g);
    }
    function $(t) {
      if (o.length === 1) T.set(t.pageX, t.pageY);
      else {
        const n = U(t),
          r = 0.5 * (t.pageX + n.x),
          c = 0.5 * (t.pageY + n.y);
        T.set(r, c);
      }
      A.subVectors(T, y).multiplyScalar(e.panSpeed), L(A.x, A.y), y.copy(T);
    }
    function ee(t) {
      const n = U(t),
        r = t.pageX - n.x,
        c = t.pageY - n.y,
        l = Math.sqrt(r * r + c * c);
      w.set(0, l),
        R.set(0, Math.pow(w.y / M.y, e.zoomSpeed)),
        _(R.y),
        M.copy(w);
    }
    function Me(t) {
      e.enableZoom && ee(t), e.enablePan && $(t);
    }
    function we(t) {
      e.enableZoom && ee(t), e.enableRotate && J(t);
    }
    function te(t) {
      if (e.enabled === !1) return;
      o.length === 0 &&
        (e.domElement.setPointerCapture(t.pointerId),
        e.domElement.addEventListener("pointermove", H),
        e.domElement.addEventListener("pointerup", z)),
        xe(t),
        t.pointerType === "touch" ? De(t) : Le(t);
    }
    function H(t) {
      if (e.enabled === !1) return;
      t.pointerType === "touch" ? Re(t) : Ne(t);
    }
    function z(t) {
      se(t),
        o.length === 0 &&
          (e.domElement.releasePointerCapture(t.pointerId),
          e.domElement.removeEventListener("pointermove", H),
          e.domElement.removeEventListener("pointerup", z)),
        e.dispatchEvent(he),
        (i = a.NONE);
    }
    function ne(t) {
      se(t);
    }
    function Le(t) {
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
        case d.DOLLY:
          if (e.enableZoom === !1) return;
          be(t), (i = a.DOLLY);
          break;
        case d.ROTATE:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enablePan === !1) return;
            W(t), (i = a.PAN);
          } else {
            if (e.enableRotate === !1) return;
            B(t), (i = a.ROTATE);
          }
          break;
        case d.PAN:
          if (t.ctrlKey || t.metaKey || t.shiftKey) {
            if (e.enableRotate === !1) return;
            B(t), (i = a.ROTATE);
          } else {
            if (e.enablePan === !1) return;
            W(t), (i = a.PAN);
          }
          break;
        default:
          i = a.NONE;
      }
      i !== a.NONE && e.dispatchEvent(v);
    }
    function Ne(t) {
      if (e.enabled === !1) return;
      switch (i) {
        case a.ROTATE:
          if (e.enableRotate === !1) return;
          Ee(t);
          break;
        case a.DOLLY:
          if (e.enableZoom === !1) return;
          ge(t);
          break;
        case a.PAN:
          if (e.enablePan === !1) return;
          ye(t);
          break;
      }
    }
    function oe(t) {
      if (e.enabled === !1 || e.enableZoom === !1 || i !== a.NONE) return;
      t.preventDefault(), e.dispatchEvent(v), Te(t), e.dispatchEvent(he);
    }
    function ae(t) {
      if (e.enabled === !1 || e.enablePan === !1) return;
      Pe(t);
    }
    function De(t) {
      re(t);
      switch (o.length) {
        case 1:
          switch (e.touches.ONE) {
            case f.ROTATE:
              if (e.enableRotate === !1) return;
              q(), (i = a.TOUCH_ROTATE);
              break;
            case f.PAN:
              if (e.enablePan === !1) return;
              G(), (i = a.TOUCH_PAN);
              break;
            default:
              i = a.NONE;
          }
          break;
        case 2:
          switch (e.touches.TWO) {
            case f.DOLLY_PAN:
              if (e.enableZoom === !1 && e.enablePan === !1) return;
              Oe(), (i = a.TOUCH_DOLLY_PAN);
              break;
            case f.DOLLY_ROTATE:
              if (e.enableZoom === !1 && e.enableRotate === !1) return;
              Ae(), (i = a.TOUCH_DOLLY_ROTATE);
              break;
            default:
              i = a.NONE;
          }
          break;
        default:
          i = a.NONE;
      }
      i !== a.NONE && e.dispatchEvent(v);
    }
    function Re(t) {
      re(t);
      switch (i) {
        case a.TOUCH_ROTATE:
          if (e.enableRotate === !1) return;
          J(t), e.update();
          break;
        case a.TOUCH_PAN:
          if (e.enablePan === !1) return;
          $(t), e.update();
          break;
        case a.TOUCH_DOLLY_PAN:
          if (e.enableZoom === !1 && e.enablePan === !1) return;
          Me(t), e.update();
          break;
        case a.TOUCH_DOLLY_ROTATE:
          if (e.enableZoom === !1 && e.enableRotate === !1) return;
          we(t), e.update();
          break;
        default:
          i = a.NONE;
      }
    }
    function ie(t) {
      if (e.enabled === !1) return;
      t.preventDefault();
    }
    function xe(t) {
      o.push(t);
    }
    function se(t) {
      delete k[t.pointerId];
      for (let n = 0; n < o.length; n++)
        if (o[n].pointerId == t.pointerId) {
          o.splice(n, 1);
          return;
        }
    }
    function re(t) {
      let n = k[t.pointerId];
      n === void 0 && ((n = new u()), (k[t.pointerId] = n)),
        n.set(t.pageX, t.pageY);
    }
    function U(t) {
      const n = t.pointerId === o[0].pointerId ? o[1] : o[0];
      return k[n.pointerId];
    }
    e.domElement.addEventListener("contextmenu", ie),
      e.domElement.addEventListener("pointerdown", te),
      e.domElement.addEventListener("pointercancel", ne),
      e.domElement.addEventListener("wheel", oe, { passive: !1 }),
      this.update();
  }
}
class Se extends me {
  constructor(x, D) {
    super(x, D);
    (this.screenSpacePanning = !1),
      (this.mouseButtons.LEFT = d.PAN),
      (this.mouseButtons.RIGHT = d.ROTATE),
      (this.touches.ONE = f.PAN),
      (this.touches.TWO = f.DOLLY_ROTATE);
  }
}
export { me as OrbitControls, Se as MapControls };
export default null;
