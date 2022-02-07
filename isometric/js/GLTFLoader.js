import {
  AnimationClip as Ae,
  Bone as Se,
  Box3 as Le,
  BufferAttribute as ee,
  BufferGeometry as _e,
  ClampToEdgeWrapping as ye,
  Color as A,
  DirectionalLight as be,
  DoubleSide as we,
  FileLoader as te,
  FrontSide as Ne,
  Group as V,
  ImageBitmapLoader as Ie,
  InterleavedBuffer as Fe,
  InterleavedBufferAttribute as Oe,
  Interpolant as Ce,
  InterpolateDiscrete as Pe,
  InterpolateLinear as ne,
  Line as ve,
  LineBasicMaterial as He,
  LineLoop as Ue,
  LineSegments as Ge,
  LinearFilter as se,
  LinearMipmapLinearFilter as re,
  LinearMipmapNearestFilter as De,
  Loader as ke,
  LoaderUtils as N,
  Material as X,
  MathUtils as Be,
  Matrix4 as ie,
  Mesh as Ke,
  MeshBasicMaterial as U,
  MeshPhysicalMaterial as v,
  MeshStandardMaterial as z,
  MirroredRepeatWrapping as je,
  NearestFilter as Ve,
  NearestMipmapLinearFilter as Xe,
  NearestMipmapNearestFilter as ze,
  NumberKeyframeTrack as qe,
  Object3D as We,
  OrthographicCamera as Ye,
  PerspectiveCamera as Qe,
  PointLight as Je,
  Points as Ze,
  PointsMaterial as $e,
  PropertyBinding as et,
  Quaternion as tt,
  QuaternionKeyframeTrack as oe,
  RGBFormat as nt,
  RepeatWrapping as q,
  Skeleton as st,
  SkinnedMesh as rt,
  Sphere as it,
  SpotLight as ot,
  TangentSpaceNormalMap as at,
  Texture as ae,
  TextureLoader as ct,
  TriangleFanDrawMode as ce,
  TriangleStripDrawMode as lt,
  Vector2 as le,
  Vector3 as j,
  VectorKeyframeTrack as ut,
  sRGBEncoding as W,
} from "https://auxdesigner.github.io/isometric/js/three.js";
class ft extends ke {
  constructor(t) {
    super(t);
    (this.dracoLoader = null),
      (this.ktx2Loader = null),
      (this.meshoptDecoder = null),
      (this.pluginCallbacks = []),
      this.register(function (e) {
        return new mt(e);
      }),
      this.register(function (e) {
        return new Rt(e);
      }),
      this.register(function (e) {
        return new At(e);
      }),
      this.register(function (e) {
        return new gt(e);
      }),
      this.register(function (e) {
        return new Tt(e);
      }),
      this.register(function (e) {
        return new xt(e);
      }),
      this.register(function (e) {
        return new Mt(e);
      }),
      this.register(function (e) {
        return new Et(e);
      }),
      this.register(function (e) {
        return new ht(e);
      }),
      this.register(function (e) {
        return new St(e);
      });
  }
  load(t, e, s, n) {
    const r = this;
    let i;
    this.resourcePath !== ""
      ? (i = this.resourcePath)
      : this.path !== ""
      ? (i = this.path)
      : (i = N.extractUrlBase(t)),
      this.manager.itemStart(t);
    const a = function (c) {
        n ? n(c) : console.error(c),
          r.manager.itemError(t),
          r.manager.itemEnd(t);
      },
      o = new te(this.manager);
    o.setPath(this.path),
      o.setResponseType("arraybuffer"),
      o.setRequestHeader(this.requestHeader),
      o.setWithCredentials(this.withCredentials),
      o.load(
        t,
        function (c) {
          try {
            r.parse(
              c,
              i,
              function (u) {
                e(u), r.manager.itemEnd(t);
              },
              a
            );
          } catch (u) {
            a(u);
          }
        },
        s,
        a
      );
  }
  setDRACOLoader(t) {
    return (this.dracoLoader = t), this;
  }
  setDDSLoader() {
    throw new Error(
      'THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".'
    );
  }
  setKTX2Loader(t) {
    return (this.ktx2Loader = t), this;
  }
  setMeshoptDecoder(t) {
    return (this.meshoptDecoder = t), this;
  }
  register(t) {
    return (
      this.pluginCallbacks.indexOf(t) === -1 && this.pluginCallbacks.push(t),
      this
    );
  }
  unregister(t) {
    return (
      this.pluginCallbacks.indexOf(t) !== -1 &&
        this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1),
      this
    );
  }
  parse(t, e, s, n) {
    let r;
    const i = {},
      a = {};
    if (typeof t == "string") r = t;
    else {
      const u = N.decodeText(new Uint8Array(t, 0, 4));
      if (u === ue) {
        try {
          i[g.KHR_BINARY_GLTF] = new Lt(t);
        } catch (l) {
          n && n(l);
          return;
        }
        r = i[g.KHR_BINARY_GLTF].content;
      } else r = N.decodeText(new Uint8Array(t));
    }
    const o = JSON.parse(r);
    if (o.asset === void 0 || o.asset.version[0] < 2) {
      n &&
        n(
          new Error(
            "THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."
          )
        );
      return;
    }
    const c = new Ht(o, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder,
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let u = 0; u < this.pluginCallbacks.length; u++) {
      const l = this.pluginCallbacks[u](c);
      (a[l.name] = l), (i[l.name] = !0);
    }
    if (o.extensionsUsed)
      for (let u = 0; u < o.extensionsUsed.length; ++u) {
        const l = o.extensionsUsed[u],
          h = o.extensionsRequired || [];
        switch (l) {
          case g.KHR_MATERIALS_UNLIT:
            i[l] = new pt();
            break;
          case g.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
            i[l] = new bt();
            break;
          case g.KHR_DRACO_MESH_COMPRESSION:
            i[l] = new _t(o, this.dracoLoader);
            break;
          case g.KHR_TEXTURE_TRANSFORM:
            i[l] = new yt();
            break;
          case g.KHR_MESH_QUANTIZATION:
            i[l] = new wt();
            break;
          default:
            h.indexOf(l) >= 0 &&
              a[l] === void 0 &&
              console.warn('THREE.GLTFLoader: Unknown extension "' + l + '".');
        }
      }
    c.setExtensions(i), c.setPlugins(a), c.parse(s, n);
  }
  parseAsync(t, e) {
    const s = this;
    return new Promise(function (n, r) {
      s.parse(t, e, n, r);
    });
  }
}
function dt() {
  let f = {};
  return {
    get: function (t) {
      return f[t];
    },
    add: function (t, e) {
      f[t] = e;
    },
    remove: function (t) {
      delete f[t];
    },
    removeAll: function () {
      f = {};
    },
  };
}
const g = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: "KHR_materials_pbrSpecularGlossiness",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
};
class ht {
  constructor(t) {
    (this.parser = t),
      (this.name = g.KHR_LIGHTS_PUNCTUAL),
      (this.cache = { refs: {}, uses: {} });
  }
  _markDefs() {
    const t = this.parser,
      e = this.parser.json.nodes || [];
    for (let s = 0, n = e.length; s < n; s++) {
      const r = e[s];
      r.extensions &&
        r.extensions[this.name] &&
        r.extensions[this.name].light !== void 0 &&
        t._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(t) {
    const e = this.parser,
      s = "light:" + t;
    let n = e.cache.get(s);
    if (n) return n;
    const r = e.json,
      i = (r.extensions && r.extensions[this.name]) || {},
      a = i.lights || [],
      o = a[t];
    let c;
    const u = new A(16777215);
    o.color !== void 0 && u.fromArray(o.color);
    const l = o.range !== void 0 ? o.range : 0;
    switch (o.type) {
      case "directional":
        (c = new be(u)), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        (c = new Je(u)), (c.distance = l);
        break;
      case "spot":
        (c = new ot(u)),
          (c.distance = l),
          (o.spot = o.spot || {}),
          (o.spot.innerConeAngle =
            o.spot.innerConeAngle !== void 0 ? o.spot.innerConeAngle : 0),
          (o.spot.outerConeAngle =
            o.spot.outerConeAngle !== void 0
              ? o.spot.outerConeAngle
              : Math.PI / 4),
          (c.angle = o.spot.outerConeAngle),
          (c.penumbra = 1 - o.spot.innerConeAngle / o.spot.outerConeAngle),
          c.target.position.set(0, 0, -1),
          c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + o.type);
    }
    return (
      c.position.set(0, 0, 0),
      (c.decay = 2),
      o.intensity !== void 0 && (c.intensity = o.intensity),
      (c.name = e.createUniqueName(o.name || "light_" + t)),
      (n = Promise.resolve(c)),
      e.cache.add(s, n),
      n
    );
  }
  createNodeAttachment(t) {
    const e = this,
      s = this.parser,
      n = s.json,
      r = n.nodes[t],
      i = (r.extensions && r.extensions[this.name]) || {},
      a = i.light;
    return a === void 0
      ? null
      : this._loadLight(a).then(function (o) {
          return s._getNodeRef(e.cache, a, o);
        });
  }
}
class pt {
  constructor() {
    this.name = g.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return U;
  }
  extendParams(t, e, s) {
    const n = [];
    (t.color = new A(1, 1, 1)), (t.opacity = 1);
    const r = e.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const i = r.baseColorFactor;
        t.color.fromArray(i), (t.opacity = i[3]);
      }
      r.baseColorTexture !== void 0 &&
        n.push(s.assignTexture(t, "map", r.baseColorTexture));
    }
    return Promise.all(n);
  }
}
class mt {
  constructor(t) {
    (this.parser = t), (this.name = g.KHR_MATERIALS_CLEARCOAT);
  }
  getMaterialType(t) {
    const e = this.parser,
      s = e.json.materials[t];
    return !s.extensions || !s.extensions[this.name] ? null : v;
  }
  extendMaterialParams(t, e) {
    const s = this.parser,
      n = s.json.materials[t];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      i = n.extensions[this.name];
    if (
      (i.clearcoatFactor !== void 0 && (e.clearcoat = i.clearcoatFactor),
      i.clearcoatTexture !== void 0 &&
        r.push(s.assignTexture(e, "clearcoatMap", i.clearcoatTexture)),
      i.clearcoatRoughnessFactor !== void 0 &&
        (e.clearcoatRoughness = i.clearcoatRoughnessFactor),
      i.clearcoatRoughnessTexture !== void 0 &&
        r.push(
          s.assignTexture(
            e,
            "clearcoatRoughnessMap",
            i.clearcoatRoughnessTexture
          )
        ),
      i.clearcoatNormalTexture !== void 0 &&
        (r.push(
          s.assignTexture(e, "clearcoatNormalMap", i.clearcoatNormalTexture)
        ),
        i.clearcoatNormalTexture.scale !== void 0))
    ) {
      const a = i.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new le(a, a);
    }
    return Promise.all(r);
  }
}
class gt {
  constructor(t) {
    (this.parser = t), (this.name = g.KHR_MATERIALS_SHEEN);
  }
  getMaterialType(t) {
    const e = this.parser,
      s = e.json.materials[t];
    return !s.extensions || !s.extensions[this.name] ? null : v;
  }
  extendMaterialParams(t, e) {
    const s = this.parser,
      n = s.json.materials[t];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [];
    (e.sheenColor = new A(0, 0, 0)), (e.sheenRoughness = 0), (e.sheen = 1);
    const i = n.extensions[this.name];
    return (
      i.sheenColorFactor !== void 0 &&
        e.sheenColor.fromArray(i.sheenColorFactor),
      i.sheenRoughnessFactor !== void 0 &&
        (e.sheenRoughness = i.sheenRoughnessFactor),
      i.sheenColorTexture !== void 0 &&
        r.push(s.assignTexture(e, "sheenColorMap", i.sheenColorTexture)),
      i.sheenRoughnessTexture !== void 0 &&
        r.push(
          s.assignTexture(e, "sheenRoughnessMap", i.sheenRoughnessTexture)
        ),
      Promise.all(r)
    );
  }
}
class Tt {
  constructor(t) {
    (this.parser = t), (this.name = g.KHR_MATERIALS_TRANSMISSION);
  }
  getMaterialType(t) {
    const e = this.parser,
      s = e.json.materials[t];
    return !s.extensions || !s.extensions[this.name] ? null : v;
  }
  extendMaterialParams(t, e) {
    const s = this.parser,
      n = s.json.materials[t];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      i = n.extensions[this.name];
    return (
      i.transmissionFactor !== void 0 &&
        (e.transmission = i.transmissionFactor),
      i.transmissionTexture !== void 0 &&
        r.push(s.assignTexture(e, "transmissionMap", i.transmissionTexture)),
      Promise.all(r)
    );
  }
}
class xt {
  constructor(t) {
    (this.parser = t), (this.name = g.KHR_MATERIALS_VOLUME);
  }
  getMaterialType(t) {
    const e = this.parser,
      s = e.json.materials[t];
    return !s.extensions || !s.extensions[this.name] ? null : v;
  }
  extendMaterialParams(t, e) {
    const s = this.parser,
      n = s.json.materials[t];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      i = n.extensions[this.name];
    (e.thickness = i.thicknessFactor !== void 0 ? i.thicknessFactor : 0),
      i.thicknessTexture !== void 0 &&
        r.push(s.assignTexture(e, "thicknessMap", i.thicknessTexture)),
      (e.attenuationDistance = i.attenuationDistance || 0);
    const a = i.attenuationColor || [1, 1, 1];
    return (e.attenuationColor = new A(a[0], a[1], a[2])), Promise.all(r);
  }
}
class Mt {
  constructor(t) {
    (this.parser = t), (this.name = g.KHR_MATERIALS_IOR);
  }
  getMaterialType(t) {
    const e = this.parser,
      s = e.json.materials[t];
    return !s.extensions || !s.extensions[this.name] ? null : v;
  }
  extendMaterialParams(t, e) {
    const s = this.parser,
      n = s.json.materials[t];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = n.extensions[this.name];
    return (e.ior = r.ior !== void 0 ? r.ior : 1.5), Promise.resolve();
  }
}
class Et {
  constructor(t) {
    (this.parser = t), (this.name = g.KHR_MATERIALS_SPECULAR);
  }
  getMaterialType(t) {
    const e = this.parser,
      s = e.json.materials[t];
    return !s.extensions || !s.extensions[this.name] ? null : v;
  }
  extendMaterialParams(t, e) {
    const s = this.parser,
      n = s.json.materials[t];
    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
    const r = [],
      i = n.extensions[this.name];
    (e.specularIntensity = i.specularFactor !== void 0 ? i.specularFactor : 1),
      i.specularTexture !== void 0 &&
        r.push(s.assignTexture(e, "specularIntensityMap", i.specularTexture));
    const a = i.specularColorFactor || [1, 1, 1];
    return (
      (e.specularColor = new A(a[0], a[1], a[2])),
      i.specularColorTexture !== void 0 &&
        r.push(
          s
            .assignTexture(e, "specularColorMap", i.specularColorTexture)
            .then(function (o) {
              o.encoding = W;
            })
        ),
      Promise.all(r)
    );
  }
}
class Rt {
  constructor(t) {
    (this.parser = t), (this.name = g.KHR_TEXTURE_BASISU);
  }
  loadTexture(t) {
    const e = this.parser,
      s = e.json,
      n = s.textures[t];
    if (!n.extensions || !n.extensions[this.name]) return null;
    const r = n.extensions[this.name],
      i = s.images[r.source],
      a = e.options.ktx2Loader;
    if (!a) {
      if (s.extensionsRequired && s.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error(
          "THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures"
        );
      return null;
    }
    return e.loadTextureImage(t, i, a);
  }
}
class At {
  constructor(t) {
    (this.parser = t),
      (this.name = g.EXT_TEXTURE_WEBP),
      (this.isSupported = null);
  }
  loadTexture(t) {
    const e = this.name,
      s = this.parser,
      n = s.json,
      r = n.textures[t];
    if (!r.extensions || !r.extensions[e]) return null;
    const i = r.extensions[e],
      a = n.images[i.source];
    let o = s.textureLoader;
    if (a.uri) {
      const c = s.options.manager.getHandler(a.uri);
      c !== null && (o = c);
    }
    return this.detectSupport().then(function (c) {
      if (c) return s.loadTextureImage(t, a, o);
      if (n.extensionsRequired && n.extensionsRequired.indexOf(e) >= 0)
        throw new Error(
          "THREE.GLTFLoader: WebP required by asset but unsupported."
        );
      return s.loadTexture(t);
    });
  }
  detectSupport() {
    return (
      this.isSupported ||
        (this.isSupported = new Promise(function (t) {
          const e = new Image();
          (e.src =
            "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"),
            (e.onload = e.onerror =
              function () {
                t(e.height === 1);
              });
        })),
      this.isSupported
    );
  }
}
class St {
  constructor(t) {
    (this.name = g.EXT_MESHOPT_COMPRESSION), (this.parser = t);
  }
  loadBufferView(t) {
    const e = this.parser.json,
      s = e.bufferViews[t];
    if (s.extensions && s.extensions[this.name]) {
      const n = s.extensions[this.name],
        r = this.parser.getDependency("buffer", n.buffer),
        i = this.parser.options.meshoptDecoder;
      if (!i || !i.supported) {
        if (
          e.extensionsRequired &&
          e.extensionsRequired.indexOf(this.name) >= 0
        )
          throw new Error(
            "THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files"
          );
        return null;
      }
      return Promise.all([r, i.ready]).then(function (a) {
        const o = n.byteOffset || 0,
          c = n.byteLength || 0,
          u = n.count,
          l = n.byteStride,
          h = new ArrayBuffer(u * l),
          d = new Uint8Array(a[0], o, c);
        return (
          i.decodeGltfBuffer(new Uint8Array(h), u, l, d, n.mode, n.filter), h
        );
      });
    } else return null;
  }
}
const ue = "glTF",
  G = 12,
  fe = { JSON: 1313821514, BIN: 5130562 };
class Lt {
  constructor(t) {
    (this.name = g.KHR_BINARY_GLTF), (this.content = null), (this.body = null);
    const e = new DataView(t, 0, G);
    if (
      ((this.header = {
        magic: N.decodeText(new Uint8Array(t.slice(0, 4))),
        version: e.getUint32(4, !0),
        length: e.getUint32(8, !0),
      }),
      this.header.magic !== ue)
    )
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - G,
      n = new DataView(t, G);
    let r = 0;
    for (; r < s; ) {
      const i = n.getUint32(r, !0);
      r += 4;
      const a = n.getUint32(r, !0);
      if (((r += 4), a === fe.JSON)) {
        const o = new Uint8Array(t, G + r, i);
        this.content = N.decodeText(o);
      } else if (a === fe.BIN) {
        const o = G + r;
        this.body = t.slice(o, o + i);
      }
      r += i;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class _t {
  constructor(t, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    (this.name = g.KHR_DRACO_MESH_COMPRESSION),
      (this.json = t),
      (this.dracoLoader = e),
      this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const s = this.json,
      n = this.dracoLoader,
      r = t.extensions[this.name].bufferView,
      i = t.extensions[this.name].attributes,
      a = {},
      o = {},
      c = {};
    for (const u in i) {
      const l = Q[u] || u.toLowerCase();
      a[l] = i[u];
    }
    for (const u in t.attributes) {
      const l = Q[u] || u.toLowerCase();
      if (i[u] !== void 0) {
        const h = s.accessors[t.attributes[u]],
          d = D[h.componentType];
        (c[l] = d), (o[l] = h.normalized === !0);
      }
    }
    return e.getDependency("bufferView", r).then(function (u) {
      return new Promise(function (l) {
        n.decodeDracoFile(
          u,
          function (h) {
            for (const d in h.attributes) {
              const T = h.attributes[d],
                x = o[d];
              x !== void 0 && (T.normalized = x);
            }
            l(h);
          },
          a,
          c
        );
      });
    });
  }
}
class yt {
  constructor() {
    this.name = g.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    return (
      e.texCoord !== void 0 &&
        console.warn(
          'THREE.GLTFLoader: Custom UV sets in "' +
            this.name +
            '" extension not yet supported.'
        ),
      (e.offset === void 0 && e.rotation === void 0 && e.scale === void 0) ||
        ((t = t.clone()),
        e.offset !== void 0 && t.offset.fromArray(e.offset),
        e.rotation !== void 0 && (t.rotation = e.rotation),
        e.scale !== void 0 && t.repeat.fromArray(e.scale),
        (t.needsUpdate = !0)),
      t
    );
  }
}
class Y extends z {
  constructor(t) {
    super();
    this.isGLTFSpecularGlossinessMaterial = !0;
    const e = [
        "#ifdef USE_SPECULARMAP",
        "	uniform sampler2D specularMap;",
        "#endif",
      ].join(`
`),
      s = [
        "#ifdef USE_GLOSSINESSMAP",
        "	uniform sampler2D glossinessMap;",
        "#endif",
      ].join(`
`),
      n = [
        "vec3 specularFactor = specular;",
        "#ifdef USE_SPECULARMAP",
        "	vec4 texelSpecular = texture2D( specularMap, vUv );",
        "	texelSpecular = sRGBToLinear( texelSpecular );",
        "	// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture",
        "	specularFactor *= texelSpecular.rgb;",
        "#endif",
      ].join(`
`),
      r = [
        "float glossinessFactor = glossiness;",
        "#ifdef USE_GLOSSINESSMAP",
        "	vec4 texelGlossiness = texture2D( glossinessMap, vUv );",
        "	// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture",
        "	glossinessFactor *= texelGlossiness.a;",
        "#endif",
      ].join(`
`),
      i = [
        "PhysicalMaterial material;",
        "material.diffuseColor = diffuseColor.rgb * ( 1. - max( specularFactor.r, max( specularFactor.g, specularFactor.b ) ) );",
        "vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );",
        "float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );",
        "material.roughness = max( 1.0 - glossinessFactor, 0.0525 ); // 0.0525 corresponds to the base mip of a 256 cubemap.",
        "material.roughness += geometryRoughness;",
        "material.roughness = min( material.roughness, 1.0 );",
        "material.specularColor = specularFactor;",
      ].join(`
`),
      a = {
        specular: { value: new A().setHex(16777215) },
        glossiness: { value: 1 },
        specularMap: { value: null },
        glossinessMap: { value: null },
      };
    (this._extraUniforms = a),
      (this.onBeforeCompile = function (o) {
        for (const c in a) o.uniforms[c] = a[c];
        o.fragmentShader = o.fragmentShader
          .replace("uniform float roughness;", "uniform vec3 specular;")
          .replace("uniform float metalness;", "uniform float glossiness;")
          .replace("#include <roughnessmap_pars_fragment>", e)
          .replace("#include <metalnessmap_pars_fragment>", s)
          .replace("#include <roughnessmap_fragment>", n)
          .replace("#include <metalnessmap_fragment>", r)
          .replace("#include <lights_physical_fragment>", i);
      }),
      Object.defineProperties(this, {
        specular: {
          get: function () {
            return a.specular.value;
          },
          set: function (o) {
            a.specular.value = o;
          },
        },
        specularMap: {
          get: function () {
            return a.specularMap.value;
          },
          set: function (o) {
            (a.specularMap.value = o),
              o
                ? (this.defines.USE_SPECULARMAP = "")
                : delete this.defines.USE_SPECULARMAP;
          },
        },
        glossiness: {
          get: function () {
            return a.glossiness.value;
          },
          set: function (o) {
            a.glossiness.value = o;
          },
        },
        glossinessMap: {
          get: function () {
            return a.glossinessMap.value;
          },
          set: function (o) {
            (a.glossinessMap.value = o),
              o
                ? ((this.defines.USE_GLOSSINESSMAP = ""),
                  (this.defines.USE_UV = ""))
                : (delete this.defines.USE_GLOSSINESSMAP,
                  delete this.defines.USE_UV);
          },
        },
      }),
      delete this.metalness,
      delete this.roughness,
      delete this.metalnessMap,
      delete this.roughnessMap,
      this.setValues(t);
  }
  copy(t) {
    return (
      super.copy(t),
      (this.specularMap = t.specularMap),
      this.specular.copy(t.specular),
      (this.glossinessMap = t.glossinessMap),
      (this.glossiness = t.glossiness),
      delete this.metalness,
      delete this.roughness,
      delete this.metalnessMap,
      delete this.roughnessMap,
      this
    );
  }
}
class bt {
  constructor() {
    (this.name = g.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS),
      (this.specularGlossinessParams = [
        "color",
        "map",
        "lightMap",
        "lightMapIntensity",
        "aoMap",
        "aoMapIntensity",
        "emissive",
        "emissiveIntensity",
        "emissiveMap",
        "bumpMap",
        "bumpScale",
        "normalMap",
        "normalMapType",
        "displacementMap",
        "displacementScale",
        "displacementBias",
        "specularMap",
        "specular",
        "glossinessMap",
        "glossiness",
        "alphaMap",
        "envMap",
        "envMapIntensity",
        "refractionRatio",
      ]);
  }
  getMaterialType() {
    return Y;
  }
  extendParams(t, e, s) {
    const n = e.extensions[this.name];
    (t.color = new A(1, 1, 1)), (t.opacity = 1);
    const r = [];
    if (Array.isArray(n.diffuseFactor)) {
      const i = n.diffuseFactor;
      t.color.fromArray(i), (t.opacity = i[3]);
    }
    if (
      (n.diffuseTexture !== void 0 &&
        r.push(s.assignTexture(t, "map", n.diffuseTexture)),
      (t.emissive = new A(0, 0, 0)),
      (t.glossiness = n.glossinessFactor !== void 0 ? n.glossinessFactor : 1),
      (t.specular = new A(1, 1, 1)),
      Array.isArray(n.specularFactor) && t.specular.fromArray(n.specularFactor),
      n.specularGlossinessTexture !== void 0)
    ) {
      const i = n.specularGlossinessTexture;
      r.push(s.assignTexture(t, "glossinessMap", i)),
        r.push(s.assignTexture(t, "specularMap", i));
    }
    return Promise.all(r);
  }
  createMaterial(t) {
    const e = new Y(t);
    return (
      (e.fog = !0),
      (e.color = t.color),
      (e.map = t.map === void 0 ? null : t.map),
      (e.lightMap = null),
      (e.lightMapIntensity = 1),
      (e.aoMap = t.aoMap === void 0 ? null : t.aoMap),
      (e.aoMapIntensity = 1),
      (e.emissive = t.emissive),
      (e.emissiveIntensity = 1),
      (e.emissiveMap = t.emissiveMap === void 0 ? null : t.emissiveMap),
      (e.bumpMap = t.bumpMap === void 0 ? null : t.bumpMap),
      (e.bumpScale = 1),
      (e.normalMap = t.normalMap === void 0 ? null : t.normalMap),
      (e.normalMapType = at),
      t.normalScale && (e.normalScale = t.normalScale),
      (e.displacementMap = null),
      (e.displacementScale = 1),
      (e.displacementBias = 0),
      (e.specularMap = t.specularMap === void 0 ? null : t.specularMap),
      (e.specular = t.specular),
      (e.glossinessMap = t.glossinessMap === void 0 ? null : t.glossinessMap),
      (e.glossiness = t.glossiness),
      (e.alphaMap = null),
      (e.envMap = t.envMap === void 0 ? null : t.envMap),
      (e.envMapIntensity = 1),
      (e.refractionRatio = 0.98),
      e
    );
  }
}
class wt {
  constructor() {
    this.name = g.KHR_MESH_QUANTIZATION;
  }
}
class I extends Ce {
  constructor(t, e, s, n) {
    super(t, e, s, n);
  }
  copySampleValue_(t) {
    const e = this.resultBuffer,
      s = this.sampleValues,
      n = this.valueSize,
      r = t * n * 3 + n;
    for (let i = 0; i !== n; i++) e[i] = s[r + i];
    return e;
  }
}
(I.prototype.beforeStart_ = I.prototype.copySampleValue_),
  (I.prototype.afterEnd_ = I.prototype.copySampleValue_),
  (I.prototype.interpolate_ = function (f, t, e, s) {
    const n = this.resultBuffer,
      r = this.sampleValues,
      i = this.valueSize,
      a = i * 2,
      o = i * 3,
      c = s - t,
      u = (e - t) / c,
      l = u * u,
      h = l * u,
      d = f * o,
      T = d - o,
      x = -2 * h + 3 * l,
      m = h - l,
      p = 1 - x,
      E = m - l + u;
    for (let M = 0; M !== i; M++) {
      const H = r[T + M + i],
        w = r[T + M + a] * c,
        S = r[d + M + i],
        R = r[d + M] * c;
      n[M] = p * H + E * w + x * S + m * R;
    }
    return n;
  });
const Nt = new tt();
class It extends I {
  interpolate_(t, e, s, n) {
    const r = super.interpolate_(t, e, s, n);
    return Nt.fromArray(r).normalize().toArray(r), r;
  }
}
const _ = {
    FLOAT: 5126,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    LINEAR: 9729,
    REPEAT: 10497,
    SAMPLER_2D: 35678,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT: 5123,
  },
  D = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array,
  },
  de = { 9728: Ve, 9729: se, 9984: ze, 9985: De, 9986: Xe, 9987: re },
  he = { 33071: ye, 33648: je, 10497: q },
  pe = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 },
  Q = {
    POSITION: "position",
    NORMAL: "normal",
    TANGENT: "tangent",
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv2",
    COLOR_0: "color",
    WEIGHTS_0: "skinWeight",
    JOINTS_0: "skinIndex",
  },
  b = {
    scale: "scale",
    translation: "position",
    rotation: "quaternion",
    weights: "morphTargetInfluences",
  },
  Ft = { CUBICSPLINE: void 0, LINEAR: ne, STEP: Pe },
  J = { OPAQUE: "OPAQUE", MASK: "MASK", BLEND: "BLEND" };
function Ot(f) {
  return (
    f.DefaultMaterial === void 0 &&
      (f.DefaultMaterial = new z({
        color: 16777215,
        emissive: 0,
        metalness: 1,
        roughness: 1,
        transparent: !1,
        depthTest: !0,
        side: Ne,
      })),
    f.DefaultMaterial
  );
}
function k(f, t, e) {
  for (const s in e.extensions)
    f[s] === void 0 &&
      ((t.userData.gltfExtensions = t.userData.gltfExtensions || {}),
      (t.userData.gltfExtensions[s] = e.extensions[s]));
}
function F(f, t) {
  t.extras !== void 0 &&
    (typeof t.extras == "object"
      ? Object.assign(f.userData, t.extras)
      : console.warn(
          "THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras
        ));
}
function Ct(f, t, e) {
  let s = !1,
    n = !1;
  for (let a = 0, o = t.length; a < o; a++) {
    const c = t[a];
    if (
      (c.POSITION !== void 0 && (s = !0),
      c.NORMAL !== void 0 && (n = !0),
      s && n)
    )
      break;
  }
  if (!s && !n) return Promise.resolve(f);
  const r = [],
    i = [];
  for (let a = 0, o = t.length; a < o; a++) {
    const c = t[a];
    if (s) {
      const u =
        c.POSITION !== void 0
          ? e.getDependency("accessor", c.POSITION)
          : f.attributes.position;
      r.push(u);
    }
    if (n) {
      const u =
        c.NORMAL !== void 0
          ? e.getDependency("accessor", c.NORMAL)
          : f.attributes.normal;
      i.push(u);
    }
  }
  return Promise.all([Promise.all(r), Promise.all(i)]).then(function (a) {
    const o = a[0],
      c = a[1];
    return (
      s && (f.morphAttributes.position = o),
      n && (f.morphAttributes.normal = c),
      (f.morphTargetsRelative = !0),
      f
    );
  });
}
function Pt(f, t) {
  if ((f.updateMorphTargets(), t.weights !== void 0))
    for (let e = 0, s = t.weights.length; e < s; e++)
      f.morphTargetInfluences[e] = t.weights[e];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const e = t.extras.targetNames;
    if (f.morphTargetInfluences.length === e.length) {
      f.morphTargetDictionary = {};
      for (let s = 0, n = e.length; s < n; s++)
        f.morphTargetDictionary[e[s]] = s;
    } else
      console.warn(
        "THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names."
      );
  }
}
function vt(f) {
  const t = f.extensions && f.extensions[g.KHR_DRACO_MESH_COMPRESSION];
  let e;
  return (
    t
      ? (e = "draco:" + t.bufferView + ":" + t.indices + ":" + me(t.attributes))
      : (e = f.indices + ":" + me(f.attributes) + ":" + f.mode),
    e
  );
}
function me(f) {
  let t = "";
  const e = Object.keys(f).sort();
  for (let s = 0, n = e.length; s < n; s++) t += e[s] + ":" + f[e[s]] + ";";
  return t;
}
function Z(f) {
  switch (f) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error(
        "THREE.GLTFLoader: Unsupported normalized accessor component type."
      );
  }
}
class Ht {
  constructor(t = {}, e = {}) {
    (this.json = t),
      (this.extensions = {}),
      (this.plugins = {}),
      (this.options = e),
      (this.cache = new dt()),
      (this.associations = new Map()),
      (this.primitiveCache = {}),
      (this.meshCache = { refs: {}, uses: {} }),
      (this.cameraCache = { refs: {}, uses: {} }),
      (this.lightCache = { refs: {}, uses: {} }),
      (this.textureCache = {}),
      (this.nodeNamesUsed = {}),
      typeof createImageBitmap != "undefined" &&
      /Firefox|Safari/.test(navigator.userAgent) === !1
        ? (this.textureLoader = new Ie(this.options.manager))
        : (this.textureLoader = new ct(this.options.manager)),
      this.textureLoader.setCrossOrigin(this.options.crossOrigin),
      this.textureLoader.setRequestHeader(this.options.requestHeader),
      (this.fileLoader = new te(this.options.manager)),
      this.fileLoader.setResponseType("arraybuffer"),
      this.options.crossOrigin === "use-credentials" &&
        this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(t) {
    this.extensions = t;
  }
  setPlugins(t) {
    this.plugins = t;
  }
  parse(t, e) {
    const s = this,
      n = this.json,
      r = this.extensions;
    this.cache.removeAll(),
      this._invokeAll(function (i) {
        return i._markDefs && i._markDefs();
      }),
      Promise.all(
        this._invokeAll(function (i) {
          return i.beforeRoot && i.beforeRoot();
        })
      )
        .then(function () {
          return Promise.all([
            s.getDependencies("scene"),
            s.getDependencies("animation"),
            s.getDependencies("camera"),
          ]);
        })
        .then(function (i) {
          const a = {
            scene: i[0][n.scene || 0],
            scenes: i[0],
            animations: i[1],
            cameras: i[2],
            asset: n.asset,
            parser: s,
            userData: {},
          };
          k(r, a, n),
            F(a, n),
            Promise.all(
              s._invokeAll(function (o) {
                return o.afterRoot && o.afterRoot(a);
              })
            ).then(function () {
              t(a);
            });
        })
        .catch(e);
  }
  _markDefs() {
    const t = this.json.nodes || [],
      e = this.json.skins || [],
      s = this.json.meshes || [];
    for (let n = 0, r = e.length; n < r; n++) {
      const i = e[n].joints;
      for (let a = 0, o = i.length; a < o; a++) t[i[a]].isBone = !0;
    }
    for (let n = 0, r = t.length; n < r; n++) {
      const i = t[n];
      i.mesh !== void 0 &&
        (this._addNodeRef(this.meshCache, i.mesh),
        i.skin !== void 0 && (s[i.mesh].isSkinnedMesh = !0)),
        i.camera !== void 0 && this._addNodeRef(this.cameraCache, i.camera);
    }
  }
  _addNodeRef(t, e) {
    if (e === void 0) return;
    t.refs[e] === void 0 && (t.refs[e] = t.uses[e] = 0), t.refs[e]++;
  }
  _getNodeRef(t, e, s) {
    if (t.refs[e] <= 1) return s;
    const n = s.clone(),
      r = (i, a) => {
        const o = this.associations.get(i);
        o != null && this.associations.set(a, o);
        for (const [c, u] of i.children.entries()) r(u, a.children[c]);
      };
    return r(s, n), (n.name += "_instance_" + t.uses[e]++), n;
  }
  _invokeOne(t) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let s = 0; s < e.length; s++) {
      const n = t(e[s]);
      if (n) return n;
    }
    return null;
  }
  _invokeAll(t) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const s = [];
    for (let n = 0; n < e.length; n++) {
      const r = t(e[n]);
      r && s.push(r);
    }
    return s;
  }
  getDependency(t, e) {
    const s = t + ":" + e;
    let n = this.cache.get(s);
    if (!n) {
      switch (t) {
        case "scene":
          n = this.loadScene(e);
          break;
        case "node":
          n = this.loadNode(e);
          break;
        case "mesh":
          n = this._invokeOne(function (r) {
            return r.loadMesh && r.loadMesh(e);
          });
          break;
        case "accessor":
          n = this.loadAccessor(e);
          break;
        case "bufferView":
          n = this._invokeOne(function (r) {
            return r.loadBufferView && r.loadBufferView(e);
          });
          break;
        case "buffer":
          n = this.loadBuffer(e);
          break;
        case "material":
          n = this._invokeOne(function (r) {
            return r.loadMaterial && r.loadMaterial(e);
          });
          break;
        case "texture":
          n = this._invokeOne(function (r) {
            return r.loadTexture && r.loadTexture(e);
          });
          break;
        case "skin":
          n = this.loadSkin(e);
          break;
        case "animation":
          n = this.loadAnimation(e);
          break;
        case "camera":
          n = this.loadCamera(e);
          break;
        default:
          throw new Error("Unknown type: " + t);
      }
      this.cache.add(s, n);
    }
    return n;
  }
  getDependencies(t) {
    let e = this.cache.get(t);
    if (!e) {
      const s = this,
        n = this.json[t + (t === "mesh" ? "es" : "s")] || [];
      (e = Promise.all(
        n.map(function (r, i) {
          return s.getDependency(t, i);
        })
      )),
        this.cache.add(t, e);
    }
    return e;
  }
  loadBuffer(t) {
    const e = this.json.buffers[t],
      s = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error(
        "THREE.GLTFLoader: " + e.type + " buffer type is not supported."
      );
    if (e.uri === void 0 && t === 0)
      return Promise.resolve(this.extensions[g.KHR_BINARY_GLTF].body);
    const n = this.options;
    return new Promise(function (r, i) {
      s.load(N.resolveURL(e.uri, n.path), r, void 0, function () {
        i(
          new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".')
        );
      });
    });
  }
  loadBufferView(t) {
    const e = this.json.bufferViews[t];
    return this.getDependency("buffer", e.buffer).then(function (s) {
      const n = e.byteLength || 0,
        r = e.byteOffset || 0;
      return s.slice(r, r + n);
    });
  }
  loadAccessor(t) {
    const e = this,
      s = this.json,
      n = this.json.accessors[t];
    if (n.bufferView === void 0 && n.sparse === void 0)
      return Promise.resolve(null);
    const r = [];
    return (
      n.bufferView !== void 0
        ? r.push(this.getDependency("bufferView", n.bufferView))
        : r.push(null),
      n.sparse !== void 0 &&
        (r.push(this.getDependency("bufferView", n.sparse.indices.bufferView)),
        r.push(this.getDependency("bufferView", n.sparse.values.bufferView))),
      Promise.all(r).then(function (i) {
        const a = i[0],
          o = pe[n.type],
          c = D[n.componentType],
          u = c.BYTES_PER_ELEMENT,
          l = u * o,
          h = n.byteOffset || 0,
          d =
            n.bufferView !== void 0
              ? s.bufferViews[n.bufferView].byteStride
              : void 0,
          T = n.normalized === !0;
        let x, m;
        if (d && d !== l) {
          const p = Math.floor(h / d),
            E =
              "InterleavedBuffer:" +
              n.bufferView +
              ":" +
              n.componentType +
              ":" +
              p +
              ":" +
              n.count;
          let M = e.cache.get(E);
          M ||
            ((x = new c(a, p * d, (n.count * d) / u)),
            (M = new Fe(x, d / u)),
            e.cache.add(E, M)),
            (m = new Oe(M, o, (h % d) / u, T));
        } else a === null ? (x = new c(n.count * o)) : (x = new c(a, h, n.count * o)), (m = new ee(x, o, T));
        if (n.sparse !== void 0) {
          const p = pe.SCALAR,
            E = D[n.sparse.indices.componentType],
            M = n.sparse.indices.byteOffset || 0,
            H = n.sparse.values.byteOffset || 0,
            w = new E(i[1], M, n.sparse.count * p),
            S = new c(i[2], H, n.sparse.count * o);
          a !== null && (m = new ee(m.array.slice(), m.itemSize, m.normalized));
          for (let R = 0, O = w.length; R < O; R++) {
            const C = w[R];
            if (
              (m.setX(C, S[R * o]),
              o >= 2 && m.setY(C, S[R * o + 1]),
              o >= 3 && m.setZ(C, S[R * o + 2]),
              o >= 4 && m.setW(C, S[R * o + 3]),
              o >= 5)
            )
              throw new Error(
                "THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute."
              );
          }
        }
        return m;
      })
    );
  }
  loadTexture(t) {
    const e = this.json,
      s = this.options,
      n = e.textures[t],
      r = e.images[n.source];
    let i = this.textureLoader;
    if (r.uri) {
      const a = s.manager.getHandler(r.uri);
      a !== null && (i = a);
    }
    return this.loadTextureImage(t, r, i);
  }
  loadTextureImage(t, e, s) {
    const n = this,
      r = this.json,
      i = this.options,
      a = r.textures[t],
      o = (e.uri || e.bufferView) + ":" + a.sampler;
    if (this.textureCache[o]) return this.textureCache[o];
    const c = self.URL || self.webkitURL;
    let u = e.uri || "",
      l = !1;
    if (e.bufferView !== void 0)
      u = n.getDependency("bufferView", e.bufferView).then(function (d) {
        l = !0;
        const T = new Blob([d], { type: e.mimeType });
        return (u = c.createObjectURL(T)), u;
      });
    else if (e.uri === void 0)
      throw new Error(
        "THREE.GLTFLoader: Image " + t + " is missing URI and bufferView"
      );
    const h = Promise.resolve(u)
      .then(function (d) {
        return new Promise(function (T, x) {
          let m = T;
          s.isImageBitmapLoader === !0 &&
            (m = function (p) {
              const E = new ae(p);
              (E.needsUpdate = !0), T(E);
            }),
            s.load(N.resolveURL(d, i.path), m, void 0, x);
        });
      })
      .then(function (d) {
        l === !0 && c.revokeObjectURL(u),
          (d.flipY = !1),
          a.name && (d.name = a.name);
        const T = r.samplers || {},
          x = T[a.sampler] || {};
        return (
          (d.magFilter = de[x.magFilter] || se),
          (d.minFilter = de[x.minFilter] || re),
          (d.wrapS = he[x.wrapS] || q),
          (d.wrapT = he[x.wrapT] || q),
          n.associations.set(d, { textures: t }),
          d
        );
      })
      .catch(function () {
        return (
          console.error("THREE.GLTFLoader: Couldn't load texture", u), null
        );
      });
    return (this.textureCache[o] = h), h;
  }
  assignTexture(t, e, s) {
    const n = this;
    return this.getDependency("texture", s.index).then(function (r) {
      if (
        (s.texCoord !== void 0 &&
          s.texCoord != 0 &&
          !(e === "aoMap" && s.texCoord == 1) &&
          console.warn(
            "THREE.GLTFLoader: Custom UV set " +
              s.texCoord +
              " for texture " +
              e +
              " not yet supported."
          ),
        n.extensions[g.KHR_TEXTURE_TRANSFORM])
      ) {
        const i =
          s.extensions !== void 0
            ? s.extensions[g.KHR_TEXTURE_TRANSFORM]
            : void 0;
        if (i) {
          const a = n.associations.get(r);
          (r = n.extensions[g.KHR_TEXTURE_TRANSFORM].extendTexture(r, i)),
            n.associations.set(r, a);
        }
      }
      return (t[e] = r), r;
    });
  }
  assignFinalMaterial(t) {
    const e = t.geometry;
    let s = t.material;
    const n = e.attributes.tangent === void 0,
      r = e.attributes.color !== void 0,
      i = e.attributes.normal === void 0;
    if (t.isPoints) {
      const a = "PointsMaterial:" + s.uuid;
      let o = this.cache.get(a);
      o ||
        ((o = new $e()),
        X.prototype.copy.call(o, s),
        o.color.copy(s.color),
        (o.map = s.map),
        (o.sizeAttenuation = !1),
        this.cache.add(a, o)),
        (s = o);
    } else if (t.isLine) {
      const a = "LineBasicMaterial:" + s.uuid;
      let o = this.cache.get(a);
      o ||
        ((o = new He()),
        X.prototype.copy.call(o, s),
        o.color.copy(s.color),
        this.cache.add(a, o)),
        (s = o);
    }
    if (n || r || i) {
      let a = "ClonedMaterial:" + s.uuid + ":";
      s.isGLTFSpecularGlossinessMaterial && (a += "specular-glossiness:"),
        n && (a += "derivative-tangents:"),
        r && (a += "vertex-colors:"),
        i && (a += "flat-shading:");
      let o = this.cache.get(a);
      o ||
        ((o = s.clone()),
        r && (o.vertexColors = !0),
        i && (o.flatShading = !0),
        n &&
          (o.normalScale && (o.normalScale.y *= -1),
          o.clearcoatNormalScale && (o.clearcoatNormalScale.y *= -1)),
        this.cache.add(a, o),
        this.associations.set(o, this.associations.get(s))),
        (s = o);
    }
    s.aoMap &&
      e.attributes.uv2 === void 0 &&
      e.attributes.uv !== void 0 &&
      e.setAttribute("uv2", e.attributes.uv),
      (t.material = s);
  }
  getMaterialType() {
    return z;
  }
  loadMaterial(t) {
    const e = this,
      s = this.json,
      n = this.extensions,
      r = s.materials[t];
    let i;
    const a = {},
      o = r.extensions || {},
      c = [];
    if (o[g.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]) {
      const l = n[g.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];
      (i = l.getMaterialType()), c.push(l.extendParams(a, r, e));
    } else if (o[g.KHR_MATERIALS_UNLIT]) {
      const l = n[g.KHR_MATERIALS_UNLIT];
      (i = l.getMaterialType()), c.push(l.extendParams(a, r, e));
    } else {
      const l = r.pbrMetallicRoughness || {};
      if (
        ((a.color = new A(1, 1, 1)),
        (a.opacity = 1),
        Array.isArray(l.baseColorFactor))
      ) {
        const h = l.baseColorFactor;
        a.color.fromArray(h), (a.opacity = h[3]);
      }
      l.baseColorTexture !== void 0 &&
        c.push(e.assignTexture(a, "map", l.baseColorTexture)),
        (a.metalness = l.metallicFactor !== void 0 ? l.metallicFactor : 1),
        (a.roughness = l.roughnessFactor !== void 0 ? l.roughnessFactor : 1),
        l.metallicRoughnessTexture !== void 0 &&
          (c.push(
            e.assignTexture(a, "metalnessMap", l.metallicRoughnessTexture)
          ),
          c.push(
            e.assignTexture(a, "roughnessMap", l.metallicRoughnessTexture)
          )),
        (i = this._invokeOne(function (h) {
          return h.getMaterialType && h.getMaterialType(t);
        })),
        c.push(
          Promise.all(
            this._invokeAll(function (h) {
              return h.extendMaterialParams && h.extendMaterialParams(t, a);
            })
          )
        );
    }
    r.doubleSided === !0 && (a.side = we);
    const u = r.alphaMode || J.OPAQUE;
    if (
      (u === J.BLEND
        ? ((a.transparent = !0), (a.depthWrite = !1))
        : ((a.format = nt),
          (a.transparent = !1),
          u === J.MASK &&
            (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)),
      r.normalTexture !== void 0 &&
        i !== U &&
        (c.push(e.assignTexture(a, "normalMap", r.normalTexture)),
        (a.normalScale = new le(1, 1)),
        r.normalTexture.scale !== void 0))
    ) {
      const l = r.normalTexture.scale;
      a.normalScale.set(l, l);
    }
    return (
      r.occlusionTexture !== void 0 &&
        i !== U &&
        (c.push(e.assignTexture(a, "aoMap", r.occlusionTexture)),
        r.occlusionTexture.strength !== void 0 &&
          (a.aoMapIntensity = r.occlusionTexture.strength)),
      r.emissiveFactor !== void 0 &&
        i !== U &&
        (a.emissive = new A().fromArray(r.emissiveFactor)),
      r.emissiveTexture !== void 0 &&
        i !== U &&
        c.push(e.assignTexture(a, "emissiveMap", r.emissiveTexture)),
      Promise.all(c).then(function () {
        let l;
        return (
          i === Y
            ? (l = n[g.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(a))
            : (l = new i(a)),
          r.name && (l.name = r.name),
          l.map && (l.map.encoding = W),
          l.emissiveMap && (l.emissiveMap.encoding = W),
          F(l, r),
          e.associations.set(l, { materials: t }),
          r.extensions && k(n, l, r),
          l
        );
      })
    );
  }
  createUniqueName(t) {
    const e = et.sanitizeNodeName(t || "");
    let s = e;
    for (let n = 1; this.nodeNamesUsed[s]; ++n) s = e + "_" + n;
    return (this.nodeNamesUsed[s] = !0), s;
  }
  loadGeometries(t) {
    const e = this,
      s = this.extensions,
      n = this.primitiveCache;
    function r(a) {
      return s[g.KHR_DRACO_MESH_COMPRESSION]
        .decodePrimitive(a, e)
        .then(function (o) {
          return Te(o, a, e);
        });
    }
    const i = [];
    for (let a = 0, o = t.length; a < o; a++) {
      const c = t[a],
        u = vt(c),
        l = n[u];
      if (l) i.push(l.promise);
      else {
        let h;
        c.extensions && c.extensions[g.KHR_DRACO_MESH_COMPRESSION]
          ? (h = r(c))
          : (h = Te(new _e(), c, e)),
          (n[u] = { primitive: c, promise: h }),
          i.push(h);
      }
    }
    return Promise.all(i);
  }
  loadMesh(t) {
    const e = this,
      s = this.json,
      n = this.extensions,
      r = s.meshes[t],
      i = r.primitives,
      a = [];
    for (let o = 0, c = i.length; o < c; o++) {
      const u =
        i[o].material === void 0
          ? Ot(this.cache)
          : this.getDependency("material", i[o].material);
      a.push(u);
    }
    return (
      a.push(e.loadGeometries(i)),
      Promise.all(a).then(function (o) {
        const c = o.slice(0, o.length - 1),
          u = o[o.length - 1],
          l = [];
        for (let d = 0, T = u.length; d < T; d++) {
          const x = u[d],
            m = i[d];
          let p;
          const E = c[d];
          if (
            m.mode === _.TRIANGLES ||
            m.mode === _.TRIANGLE_STRIP ||
            m.mode === _.TRIANGLE_FAN ||
            m.mode === void 0
          )
            (p = r.isSkinnedMesh === !0 ? new rt(x, E) : new Ke(x, E)),
              p.isSkinnedMesh === !0 &&
                !p.geometry.attributes.skinWeight.normalized &&
                p.normalizeSkinWeights(),
              m.mode === _.TRIANGLE_STRIP
                ? (p.geometry = xe(p.geometry, lt))
                : m.mode === _.TRIANGLE_FAN &&
                  (p.geometry = xe(p.geometry, ce));
          else if (m.mode === _.LINES) p = new Ge(x, E);
          else if (m.mode === _.LINE_STRIP) p = new ve(x, E);
          else if (m.mode === _.LINE_LOOP) p = new Ue(x, E);
          else if (m.mode === _.POINTS) p = new Ze(x, E);
          else
            throw new Error(
              "THREE.GLTFLoader: Primitive mode unsupported: " + m.mode
            );
          Object.keys(p.geometry.morphAttributes).length > 0 && Pt(p, r),
            (p.name = e.createUniqueName(r.name || "mesh_" + t)),
            F(p, r),
            m.extensions && k(n, p, m),
            e.assignFinalMaterial(p),
            l.push(p);
        }
        for (let d = 0, T = l.length; d < T; d++)
          e.associations.set(l[d], { meshes: t, primitives: d });
        if (l.length === 1) return l[0];
        const h = new V();
        e.associations.set(h, { meshes: t });
        for (let d = 0, T = l.length; d < T; d++) h.add(l[d]);
        return h;
      })
    );
  }
  loadCamera(t) {
    let e;
    const s = this.json.cameras[t],
      n = s[s.type];
    if (!n) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return (
      s.type === "perspective"
        ? (e = new Qe(
            Be.radToDeg(n.yfov),
            n.aspectRatio || 1,
            n.znear || 1,
            n.zfar || 2e6
          ))
        : s.type === "orthographic" &&
          (e = new Ye(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)),
      s.name && (e.name = this.createUniqueName(s.name)),
      F(e, s),
      Promise.resolve(e)
    );
  }
  loadSkin(t) {
    const e = this.json.skins[t],
      s = { joints: e.joints };
    return e.inverseBindMatrices === void 0
      ? Promise.resolve(s)
      : this.getDependency("accessor", e.inverseBindMatrices).then(function (
          n
        ) {
          return (s.inverseBindMatrices = n), s;
        });
  }
  loadAnimation(t) {
    const e = this.json,
      s = e.animations[t],
      n = [],
      r = [],
      i = [],
      a = [],
      o = [];
    for (let c = 0, u = s.channels.length; c < u; c++) {
      const l = s.channels[c],
        h = s.samplers[l.sampler],
        d = l.target,
        T = d.node !== void 0 ? d.node : d.id,
        x = s.parameters !== void 0 ? s.parameters[h.input] : h.input,
        m = s.parameters !== void 0 ? s.parameters[h.output] : h.output;
      n.push(this.getDependency("node", T)),
        r.push(this.getDependency("accessor", x)),
        i.push(this.getDependency("accessor", m)),
        a.push(h),
        o.push(d);
    }
    return Promise.all([
      Promise.all(n),
      Promise.all(r),
      Promise.all(i),
      Promise.all(a),
      Promise.all(o),
    ]).then(function (c) {
      const u = c[0],
        l = c[1],
        h = c[2],
        d = c[3],
        T = c[4],
        x = [];
      for (let p = 0, E = u.length; p < E; p++) {
        const M = u[p],
          H = l[p],
          w = h[p],
          S = d[p],
          R = T[p];
        if (M === void 0) continue;
        M.updateMatrix(), (M.matrixAutoUpdate = !0);
        let O;
        switch (b[R.path]) {
          case b.weights:
            O = qe;
            break;
          case b.rotation:
            O = oe;
            break;
          case b.position:
          case b.scale:
          default:
            O = ut;
            break;
        }
        const C = M.name ? M.name : M.uuid,
          Me = S.interpolation !== void 0 ? Ft[S.interpolation] : ne,
          B = [];
        b[R.path] === b.weights
          ? M.traverse(function (L) {
              L.morphTargetInfluences && B.push(L.name ? L.name : L.uuid);
            })
          : B.push(C);
        let P = w.array;
        if (w.normalized) {
          const L = Z(P.constructor),
            K = new Float32Array(P.length);
          for (let y = 0, $ = P.length; y < $; y++) K[y] = P[y] * L;
          P = K;
        }
        for (let L = 0, K = B.length; L < K; L++) {
          const y = new O(B[L] + "." + b[R.path], H.array, P, Me);
          S.interpolation === "CUBICSPLINE" &&
            ((y.createInterpolant = function (Ee) {
              const Re = this instanceof oe ? It : I;
              return new Re(
                this.times,
                this.values,
                this.getValueSize() / 3,
                Ee
              );
            }),
            (y.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline =
              !0)),
            x.push(y);
        }
      }
      const m = s.name ? s.name : "animation_" + t;
      return new Ae(m, void 0, x);
    });
  }
  createNodeMesh(t) {
    const e = this.json,
      s = this,
      n = e.nodes[t];
    return n.mesh === void 0
      ? null
      : s.getDependency("mesh", n.mesh).then(function (r) {
          const i = s._getNodeRef(s.meshCache, n.mesh, r);
          return (
            n.weights !== void 0 &&
              i.traverse(function (a) {
                if (!a.isMesh) return;
                for (let o = 0, c = n.weights.length; o < c; o++)
                  a.morphTargetInfluences[o] = n.weights[o];
              }),
            i
          );
        });
  }
  loadNode(t) {
    const e = this.json,
      s = this.extensions,
      n = this,
      r = e.nodes[t],
      i = r.name ? n.createUniqueName(r.name) : "";
    return (function () {
      const a = [],
        o = n._invokeOne(function (c) {
          return c.createNodeMesh && c.createNodeMesh(t);
        });
      return (
        o && a.push(o),
        r.camera !== void 0 &&
          a.push(
            n.getDependency("camera", r.camera).then(function (c) {
              return n._getNodeRef(n.cameraCache, r.camera, c);
            })
          ),
        n
          ._invokeAll(function (c) {
            return c.createNodeAttachment && c.createNodeAttachment(t);
          })
          .forEach(function (c) {
            a.push(c);
          }),
        Promise.all(a)
      );
    })().then(function (a) {
      let o;
      if (
        (r.isBone === !0
          ? (o = new Se())
          : a.length > 1
          ? (o = new V())
          : a.length === 1
          ? (o = a[0])
          : (o = new We()),
        o !== a[0])
      )
        for (let c = 0, u = a.length; c < u; c++) o.add(a[c]);
      if (
        (r.name && ((o.userData.name = r.name), (o.name = i)),
        F(o, r),
        r.extensions && k(s, o, r),
        r.matrix !== void 0)
      ) {
        const c = new ie();
        c.fromArray(r.matrix), o.applyMatrix4(c);
      } else r.translation !== void 0 && o.position.fromArray(r.translation), r.rotation !== void 0 && o.quaternion.fromArray(r.rotation), r.scale !== void 0 && o.scale.fromArray(r.scale);
      return (
        n.associations.has(o) || n.associations.set(o, {}),
        (n.associations.get(o).nodes = t),
        o
      );
    });
  }
  loadScene(t) {
    const e = this.json,
      s = this.extensions,
      n = this.json.scenes[t],
      r = this,
      i = new V();
    n.name && (i.name = r.createUniqueName(n.name)),
      F(i, n),
      n.extensions && k(s, i, n);
    const a = n.nodes || [],
      o = [];
    for (let c = 0, u = a.length; c < u; c++) o.push(ge(a[c], i, e, r));
    return Promise.all(o).then(function () {
      const c = (u) => {
        const l = new Map();
        for (const [h, d] of r.associations)
          (h instanceof X || h instanceof ae) && l.set(h, d);
        return (
          u.traverse((h) => {
            const d = r.associations.get(h);
            d != null && l.set(h, d);
          }),
          l
        );
      };
      return (r.associations = c(i)), i;
    });
  }
}
function ge(f, t, e, s) {
  const n = e.nodes[f];
  return s
    .getDependency("node", f)
    .then(function (r) {
      if (n.skin === void 0) return r;
      let i;
      return s
        .getDependency("skin", n.skin)
        .then(function (a) {
          i = a;
          const o = [];
          for (let c = 0, u = i.joints.length; c < u; c++)
            o.push(s.getDependency("node", i.joints[c]));
          return Promise.all(o);
        })
        .then(function (a) {
          return (
            r.traverse(function (o) {
              if (!o.isMesh) return;
              const c = [],
                u = [];
              for (let l = 0, h = a.length; l < h; l++) {
                const d = a[l];
                if (d) {
                  c.push(d);
                  const T = new ie();
                  i.inverseBindMatrices !== void 0 &&
                    T.fromArray(i.inverseBindMatrices.array, l * 16),
                    u.push(T);
                } else
                  console.warn(
                    'THREE.GLTFLoader: Joint "%s" could not be found.',
                    i.joints[l]
                  );
              }
              o.bind(new st(c, u), o.matrixWorld);
            }),
            r
          );
        });
    })
    .then(function (r) {
      t.add(r);
      const i = [];
      if (n.children) {
        const a = n.children;
        for (let o = 0, c = a.length; o < c; o++) {
          const u = a[o];
          i.push(ge(u, r, e, s));
        }
      }
      return Promise.all(i);
    });
}
function Ut(f, t, e) {
  const s = t.attributes,
    n = new Le();
  if (s.POSITION !== void 0) {
    const a = e.json.accessors[s.POSITION],
      o = a.min,
      c = a.max;
    if (o !== void 0 && c !== void 0) {
      if (
        (n.set(new j(o[0], o[1], o[2]), new j(c[0], c[1], c[2])), a.normalized)
      ) {
        const u = Z(D[a.componentType]);
        n.min.multiplyScalar(u), n.max.multiplyScalar(u);
      }
    } else {
      console.warn(
        "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
      );
      return;
    }
  } else return;
  const r = t.targets;
  if (r !== void 0) {
    const a = new j(),
      o = new j();
    for (let c = 0, u = r.length; c < u; c++) {
      const l = r[c];
      if (l.POSITION !== void 0) {
        const h = e.json.accessors[l.POSITION],
          d = h.min,
          T = h.max;
        if (d !== void 0 && T !== void 0) {
          if (
            (o.setX(Math.max(Math.abs(d[0]), Math.abs(T[0]))),
            o.setY(Math.max(Math.abs(d[1]), Math.abs(T[1]))),
            o.setZ(Math.max(Math.abs(d[2]), Math.abs(T[2]))),
            h.normalized)
          ) {
            const x = Z(D[h.componentType]);
            o.multiplyScalar(x);
          }
          a.max(o);
        } else
          console.warn(
            "THREE.GLTFLoader: Missing min/max properties for accessor POSITION."
          );
      }
    }
    n.expandByVector(a);
  }
  f.boundingBox = n;
  const i = new it();
  n.getCenter(i.center),
    (i.radius = n.min.distanceTo(n.max) / 2),
    (f.boundingSphere = i);
}
function Te(f, t, e) {
  const s = t.attributes,
    n = [];
  function r(i, a) {
    return e.getDependency("accessor", i).then(function (o) {
      f.setAttribute(a, o);
    });
  }
  for (const i in s) {
    const a = Q[i] || i.toLowerCase();
    if (a in f.attributes) continue;
    n.push(r(s[i], a));
  }
  if (t.indices !== void 0 && !f.index) {
    const i = e.getDependency("accessor", t.indices).then(function (a) {
      f.setIndex(a);
    });
    n.push(i);
  }
  return (
    F(f, t),
    Ut(f, t, e),
    Promise.all(n).then(function () {
      return t.targets !== void 0 ? Ct(f, t.targets, e) : f;
    })
  );
}
function xe(f, t) {
  let e = f.getIndex();
  if (e === null) {
    const i = [],
      a = f.getAttribute("position");
    if (a !== void 0) {
      for (let o = 0; o < a.count; o++) i.push(o);
      f.setIndex(i), (e = f.getIndex());
    } else
      return (
        console.error(
          "THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
        ),
        f
      );
  }
  const s = e.count - 2,
    n = [];
  if (t === ce)
    for (let i = 1; i <= s; i++)
      n.push(e.getX(0)), n.push(e.getX(i)), n.push(e.getX(i + 1));
  else
    for (let i = 0; i < s; i++)
      i % 2 === 0
        ? (n.push(e.getX(i)), n.push(e.getX(i + 1)), n.push(e.getX(i + 2)))
        : (n.push(e.getX(i + 2)), n.push(e.getX(i + 1)), n.push(e.getX(i)));
  n.length / 3 !== s &&
    console.error(
      "THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles."
    );
  const r = f.clone();
  return r.setIndex(n), r;
}
export { ft as GLTFLoader };
export default null;
