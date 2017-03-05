webpackJsonp([1,2],{

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxSubs = __webpack_require__(22);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.interaction.Interaction}
     * @protected
     */
    this.interaction = this.createInteraction();
    this.interaction.$vm = this;
  },

  /**
   * @return {ol.interaction.Interaction}
   * @protected
   */
  createInteraction: function createInteraction() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountInteraction: function mountInteraction() {
    if (this.map()) {
      this.map() && this.map().addInteraction(this.interaction);
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of interaction component, should have map component among it's ancestors");
    }
  },

  /**
   * @protected
   */
  unmountInteraction: function unmountInteraction() {
    this.unsubscribeAll();
    this.map() && this.map().removeInteraction(this.interaction);
  },
  refresh: function refresh() {
    this.interaction && this.interaction.changed();
  }
};

exports.default = {
  mixins: [_rxSubs2.default],
  inject: ['map'],
  props: props,
  methods: methods,
  provide: function provide() {
    var _this = this;

    return {
      interaction: function interaction() {
        return _this.interaction;
      }
    };
  },
  render: function render(h) {
    return h('i', {
      style: {
        display: 'none !important'
      }
    }, this.$slots.default);
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.mountInteraction();
  },
  destroyed: function destroyed() {
    this.unmountInteraction();
    this.interaction = undefined;
  }
};

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _layer = __webpack_require__(73);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  preload: Number
};

var methods = {
  createLayer: function createLayer() {
    return new _openlayers2.default.layer.Tile({
      id: this.id,
      minResolution: this.minResolution,
      maxResolution: this.maxResolution,
      opacity: this.opacity,
      visible: this.visible,
      preload: this.preload,
      projection: this.projection,
      extent: this.extent,
      zIndex: this.zIndex
    });
  }
};

exports.default = {
  mixins: [_layer2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _layer = __webpack_require__(73);

var _layer2 = _interopRequireDefault(_layer);

var _target = __webpack_require__(35);

var _target2 = _interopRequireDefault(_target);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  updateWhileAnimating: {
    type: Boolean,
    default: false
  },
  updateWhileInteracting: {
    type: Boolean,
    default: false
  }
  // todo implement options
  // renderOrder: Function,
  // renderBuffer: Number
};

var methods = {
  createLayer: function createLayer() {
    return new _openlayers2.default.layer.Vector({
      id: this.id,
      minResolution: this.minResolution,
      maxResolution: this.maxResolution,
      opacity: this.opacity,
      visible: this.visible,
      preload: this.preload,
      projection: this.projection,
      extent: this.extent,
      zIndex: this.zIndex,
      updateWhileAnimating: this.updateWhileAnimating,
      updateWhileInteracting: this.updateWhileInteracting
    });
  },
  styleTarget: function styleTarget() {
    return this.layer;
  }
};

var layerProvide = _layer2.default.provide;
var styleTargetProvide = _target2.default.provide;
exports.default = {
  mixins: [_layer2.default, _target2.default],
  props: props,
  methods: methods,
  provide: function provide() {
    return (0, _extends3.default)({}, layerProvide.call(this), styleTargetProvide.call(this));
  },
  render: function render(h) {
    return h('i', {
      style: {
        display: 'none !important'
      }
    }, this.$slots.default);
  }
};

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick2 = __webpack_require__(196);

var _pick3 = _interopRequireDefault(_pick2);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _ol3Tilecache = __webpack_require__(669);

var _func = __webpack_require__(76);

var _source = __webpack_require__(74);

var _source2 = _interopRequireDefault(_source);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  url: {
    type: String,
    required: true
  },
  tileSize: {
    type: Array,
    default: function _default() {
      return [_vlOl.consts.TILE_SIZE, _vlOl.consts.TILE_SIZE];
    },
    validator: function validator(value) {
      return value.length === 2;
    }
  },
  tilePixelRatio: {
    type: Number,
    default: _vlOl.consts.PIXEL_RATIO
  },
  crossOrigin: {
    type: String,
    default: 'anonymous'
  },
  cacheSize: {
    type: Number,
    default: _vlOl.consts.CACHE_SIZE
  },
  opaque: Boolean,
  minZoom: {
    type: Number,
    default: _vlOl.consts.MIN_ZOOM
  },
  maxZoom: {
    type: Number,
    default: _vlOl.consts.MAX_ZOOM
  }
};

var computed = {
  urlTokens: function urlTokens() {
    return [];
  }
};

var methods = {
  /**
   * @return {ol.tilegrid.TileGrid}
   * @protected
   */
  createTileGrid: function createTileGrid() {
    return _openlayers2.default.tilegrid.createXYZ({
      extent: _openlayers2.default.proj.get(this.projection).getExtent(),
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      tileSize: this.tileSize
    });
  },

  /**
   * @return {ol.TileUrlFunction}
   * @protected
   */
  createTileUrlFunction: function createTileUrlFunction() {
    return (0, _ol3Tilecache.createTileUrlFunction)(this.replaceUrlTokens());
  },

  /**
   * @return {string}
   * @protected
   */
  replaceUrlTokens: function replaceUrlTokens() {
    return (0, _func.replaceTokens)(this.url, (0, _pick3.default)(this.urlTokens, this));
  }
};

exports.default = {
  mixins: [_source2.default],
  props: props,
  computed: computed,
  methods: methods
};

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(130);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = __webpack_require__(50);

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = __webpack_require__(129);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _source = __webpack_require__(74);

var _source2 = _interopRequireDefault(_source);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  loader: Function,
  useSpatialIndex: {
    type: Boolean,
    default: true
  }
  // todo implement options
  // format: String,
  // strategy: String
};

var methods = {
  /**
   * @return {function|undefined}
   * @protected
   */
  sourceLoader: function sourceLoader() {
    if (!this.loader) return;

    var loader = this.loader.bind(this);
    var self = this;

    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(extent, resolution, projection) {
        var features;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                projection = projection.getCode();
                extent = _vlOl.coord.extentToLonLat(extent, projection);

                _context.next = 4;
                return _promise2.default.resolve(loader(extent, resolution, projection));

              case 4:
                features = _context.sent;


                if (features && features.length) {
                  self.$emit('load', {
                    features: features,
                    extent: extent,
                    resolution: resolution,
                    projection: projection
                  });
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function __loader(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return __loader;
    }();
  },
  createSource: function createSource() {
    return new _openlayers2.default.source.Vector({
      attributions: this.attributions,
      projection: this.projection,
      loader: this.sourceLoader(),
      useSpatialIndex: this.useSpatialIndex,
      wrapX: this.wrapX,
      logo: this.logo,
      strategy: _openlayers2.default.loadingstrategy.bbox
      // url: this.url,
    });
  }
};

exports.default = {
  mixins: [_source2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.error = error;
exports.warndbg = warndbg;
exports.errordbg = errordbg;
/* global PKG_FULLNAME */

function warn(msg) {
  var _console;

  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  (_console = console).warn.apply(_console, ['[' + "VueLayers" + '] WARNING: ' + msg].concat(args));
}

function error(msg) {
  var _console2;

  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  (_console2 = console).error.apply(_console2, ['[' + "VueLayers" + '] WARNING: ' + msg].concat(args));
}

function warndbg() {
  if (false) {
    warn.apply(undefined, arguments);
  }
}

function errordbg() {
  if (false) {
    error.apply(undefined, arguments);
  }
}

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = __webpack_require__(273);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _isEqual2 = __webpack_require__(70);

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _Observable = __webpack_require__(7);

__webpack_require__(116);

__webpack_require__(114);

__webpack_require__(115);

__webpack_require__(49);

var _rxSubs = __webpack_require__(22);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vlOl = __webpack_require__(8);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  /**
   * Coordinates in EPSG:4326
   */
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  },
  layout: {
    type: String,
    default: 'XY'
  }
};

var computed = {
  type: function type() {
    return this.geometry.getType();
  }
};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.geom.SimpleGeometry}
     * @protected
     */
    this.geometry = this.createGeometry();
    this.geometry.$vm = this;
    /**
     * @protected
     */
    this.coordTransform = _vlOl.coord.coordTransform[this.geometry.getType()];

    this.currentCoordinates = this.coordTransform.toLonLat(this.geometry.getCoordinates(), this.view().getProjection());
    this.currentExtent = _vlOl.coord.extentToLonLat(this.geometry.getExtent(), this.view().getProjection());
  },

  /**
   * @return {ol.geom.SimpleGeometry}
   * @protected
   */
  createGeometry: function createGeometry() {
    throw new Error('Not implemented method');
  },
  subscribeAll: function subscribeAll() {
    subscribeToGeomChanges.call(this);
  },

  /**
   * @protected
   */
  mountGeometry: function mountGeometry() {
    if (this.feature()) {
      this.feature().setGeometry(this.geometry);
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of geometry component, should have feature component among it's ancestors");
    }
  },

  /**
   * @protected
   */
  unmountGeometry: function unmountGeometry() {
    this.unsubscribeAll();
    this.feature() && this.feature().setGeometry(undefined);
  },
  refresh: function refresh() {
    this.geometry && this.geometry.changed();
  }
};

var watch = {
  coordinates: function coordinates(value) {
    this.geometry.setCoordinates(this.coordTransform.fromLonLat(value, this.view().getProjection()));
  }
};

exports.default = {
  mixins: [_rxSubs2.default],
  inject: ['view', 'feature'],
  props: props,
  computed: computed,
  watch: watch,
  methods: methods,
  provide: function provide() {
    var _this = this;

    return {
      geometry: function geometry() {
        return _this.geometry;
      }
    };
  },

  render: function render(h) {
    return h();
  },
  data: function data() {
    return {
      currentCoordinates: this.coordinates.slice(),
      currentExtent: []
    };
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.mountGeometry();
  },
  destroyed: function destroyed() {
    this.unmountGeometry();
    this.geometry = undefined;
  }
};


function subscribeToGeomChanges() {
  var _this2 = this,
      _context;

  this.rxSubs.geomChanges = _Observable.Observable.fromOlEvent(this.geometry, 'change').throttleTime(100).map(function () {
    return [_this2.coordTransform.toLonLat(_this2.geometry.getCoordinates(), _this2.view().getProjection()), _vlOl.coord.extentToLonLat(_this2.geometry.getExtent(), _this2.view().getProjection())];
  }).distinctUntilChanged(function (a, b) {
    return (0, _isEqual3.default)(a, b);
  }).subscribe(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
        coordinates = _ref2[0],
        extent = _ref2[1];

    _this2.currentCoordinates = coordinates;
    _this2.currentExtent = extent;
    _this2.$emit('change', { coordinates: coordinates, extent: extent });
  }, (_context = console).error.bind(_context));
}

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

var _forEach2 = __webpack_require__(110);

var _forEach3 = _interopRequireDefault(_forEach2);

var _merge2 = __webpack_require__(194);

var _merge3 = _interopRequireDefault(_merge2);

var _omit2 = __webpack_require__(195);

var _omit3 = _interopRequireDefault(_omit2);

var _components = __webpack_require__(222);

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forEachWithKey = _forEach3.default.convert({ cap: false }); /* global PKG_VERSION, PKG_FULLNAME */
/**
 * VueLayers
 * Vue components to work with OpenLayers 3.
 *
 * @author Vladimir Vershinin <ghettovoice@gmail.com>
 * @license MIT
 * @copyright (c) 2017, Vladimir Vershinin <ghettovoice@gmail.com>
 */

var keys = ['geom', 'layer', 'source', 'style', 'interaction'];

var flatComponents = (0, _extends3.default)({}, (0, _omit3.default)(keys, components), keys.reduce(function (all, key) {
  return (0, _merge3.default)(all, components[key]);
}, {}));

exports.default = (0, _extends3.default)({
  PKG_NAME: "VueLayers",
  VERSION: "0.1.0"
}, flatComponents, {
  install: function install(Vue) {
    forEachWithKey(function (component, key) {
      if (component.install) {
        Vue.use(component);
      } else if (key === 'directives') {
        (0, _forEach3.default)(Vue.use.bind(Vue), component);
      }
    }, flatComponents);
  }
});

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(740)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(247),
  /* template */
  __webpack_require__(722),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/docs/app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6474fc42", Component.options)
  } else {
    hotAPI.reload("data-v-6474fc42", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feature = __webpack_require__(698);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_feature2.default.install = function (Vue) {
  Vue.component(_feature2.default.name, _feature2.default);
};

exports.default = _feature2.default;

/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geoloc = __webpack_require__(699);

var _geoloc2 = _interopRequireDefault(_geoloc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geoloc2.default.install = function (Vue) {
  Vue.component(_geoloc2.default.name, _geoloc2.default);
};

exports.default = _geoloc2.default;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.VlGeomMultiPolygon = exports.VlGeomMultiLineString = exports.VlGeomMultiPoint = exports.VlGeomPolygon = exports.VlGeomLineString = exports.VlGeomPoint = undefined;

var _geom = __webpack_require__(16);

var _geom2 = _interopRequireDefault(_geom);

var _point = __webpack_require__(220);

var _point2 = _interopRequireDefault(_point);

var _lineString = __webpack_require__(216);

var _lineString2 = _interopRequireDefault(_lineString);

var _polygon = __webpack_require__(221);

var _polygon2 = _interopRequireDefault(_polygon);

var _multiPoint = __webpack_require__(218);

var _multiPoint2 = _interopRequireDefault(_multiPoint);

var _multiLineString = __webpack_require__(217);

var _multiLineString2 = _interopRequireDefault(_multiLineString);

var _multiPolygon = __webpack_require__(219);

var _multiPolygon2 = _interopRequireDefault(_multiPolygon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VlGeomPoint = _point2.default;
exports.VlGeomLineString = _lineString2.default;
exports.VlGeomPolygon = _polygon2.default;
exports.VlGeomMultiPoint = _multiPoint2.default;
exports.VlGeomMultiLineString = _multiLineString2.default;
exports.VlGeomMultiPolygon = _multiPolygon2.default;
var mixins = exports.mixins = {
  geom: _geom2.default
};

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(700);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(701);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(702);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(703);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(128);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    subscribeAll: function subscribeAll() {},

    /**
     * @protected
     */
    unsubscribeAll: function unsubscribeAll() {
      var _this = this;

      (0, _keys2.default)(this.rxSubs).forEach(function (name) {
        _this.rxSubs[name].unsubscribe();
        delete _this.rxSubs[name];
      });
    }
  },
  beforeCreate: function beforeCreate() {
    /**
     * @type {Subscription}
     * @protected
     */
    this.rxSubs = {};
  },
  destroyed: function destroyed() {
    this.unsubscribeAll();
  }
};

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(704);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _geom = __webpack_require__(705);

var _geom2 = _interopRequireDefault(_geom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_geom2.default.install = function (Vue) {
  Vue.component(_geom2.default.name, _geom2.default);
};

exports.default = _geom2.default;

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interaction = exports.style = exports.source = exports.layer = exports.geom = exports.VlGeoloc = exports.VlFeature = exports.VlMapView = exports.VlMap = undefined;

var _map = __webpack_require__(229);

var _map2 = _interopRequireDefault(_map);

var _mapView = __webpack_require__(228);

var _mapView2 = _interopRequireDefault(_mapView);

var _feature = __webpack_require__(213);

var _feature2 = _interopRequireDefault(_feature);

var _geoloc = __webpack_require__(214);

var _geoloc2 = _interopRequireDefault(_geoloc);

var _geom2 = __webpack_require__(215);

var _geom = _interopRequireWildcard(_geom2);

var _layer2 = __webpack_require__(225);

var _layer = _interopRequireWildcard(_layer2);

var _source2 = __webpack_require__(230);

var _source = _interopRequireWildcard(_source2);

var _style2 = __webpack_require__(241);

var _style = _interopRequireWildcard(_style2);

var _interaction2 = __webpack_require__(223);

var _interaction = _interopRequireWildcard(_interaction2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VlMap = _map2.default;
exports.VlMapView = _mapView2.default;
exports.VlFeature = _feature2.default;
exports.VlGeoloc = _geoloc2.default;
exports.geom = _geom;
exports.layer = _layer;
exports.source = _source;
exports.style = _style;
exports.interaction = _interaction;

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.VlInteractionSelect = undefined;

var _interaction = __webpack_require__(122);

var _interaction2 = _interopRequireDefault(_interaction);

var _select = __webpack_require__(224);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VlInteractionSelect = _select2.default;
var mixins = exports.mixins = {
  interaction: _interaction2.default
};

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = __webpack_require__(706);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_select2.default.install = function (Vue) {
  Vue.component(_select2.default.name, _select2.default);
};

exports.default = _select2.default;

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.VlLayerTile = exports.VlLayerVector = undefined;

var _layer = __webpack_require__(73);

var _layer2 = _interopRequireDefault(_layer);

var _tileBase = __webpack_require__(123);

var _tileBase2 = _interopRequireDefault(_tileBase);

var _vectorBase = __webpack_require__(124);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

var _vector = __webpack_require__(227);

var _vector2 = _interopRequireDefault(_vector);

var _tile = __webpack_require__(226);

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VlLayerVector = _vector2.default;
exports.VlLayerTile = _tile2.default;
var mixins = exports.mixins = {
  layer: _layer2.default,
  layerTileBase: _tileBase2.default,
  layerVectorBase: _vectorBase2.default
};

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(707);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_layer2.default.install = function (Vue) {
  Vue.component(_layer2.default.name, _layer2.default);
};

exports.default = _layer2.default;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _layer = __webpack_require__(708);

var _layer2 = _interopRequireDefault(_layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_layer2.default.install = function (Vue) {
  Vue.component(_layer2.default.name, _layer2.default);
};

exports.default = _layer2.default;

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _view = __webpack_require__(710);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_view2.default.install = function (Vue) {
  Vue.component(_view2.default.name, _view2.default);
};

exports.default = _view2.default;

/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = __webpack_require__(709);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_map2.default.install = function (Vue) {
  Vue.component(_map2.default.name, _map2.default);
}; /**
    * VueLayers map component
    */
exports.default = _map2.default;

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixins = exports.VlSourceVector = exports.VlSourceMapbox = exports.VlSourceOsm = exports.VlSourceXyz = undefined;

var _source = __webpack_require__(74);

var _source2 = _interopRequireDefault(_source);

var _tileBase = __webpack_require__(125);

var _tileBase2 = _interopRequireDefault(_tileBase);

var _xyzBase = __webpack_require__(47);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

var _vectorBase = __webpack_require__(126);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

var _xyz = __webpack_require__(234);

var _xyz2 = _interopRequireDefault(_xyz);

var _osm = __webpack_require__(232);

var _osm2 = _interopRequireDefault(_osm);

var _mapbox = __webpack_require__(231);

var _mapbox2 = _interopRequireDefault(_mapbox);

var _vector = __webpack_require__(233);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VlSourceXyz = _xyz2.default;
exports.VlSourceOsm = _osm2.default;
exports.VlSourceMapbox = _mapbox2.default;
exports.VlSourceVector = _vector2.default;
var mixins = exports.mixins = {
  source: _source2.default,
  sourceTileBase: _tileBase2.default,
  sourceXyzBase: _xyzBase2.default,
  sourceVectorBase: _vectorBase2.default
};

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(711);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(712);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(713);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _source = __webpack_require__(714);

var _source2 = _interopRequireDefault(_source);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_source2.default.install = function (Vue) {
  Vue.component(_source2.default.name, _source2.default);
};

exports.default = _source2.default;

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _circle = __webpack_require__(715);

var _circle2 = _interopRequireDefault(_circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_circle2.default.install = function (Vue) {
  Vue.component(_circle2.default.name, _circle2.default);
};

exports.default = _circle2.default;

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _container = __webpack_require__(716);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_container2.default.install = function (Vue) {
  Vue.component(_container2.default.name, _container2.default);
};

exports.default = _container2.default;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fill = __webpack_require__(717);

var _fill2 = _interopRequireDefault(_fill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_fill2.default.install = function (Vue) {
  Vue.component(_fill2.default.name, _fill2.default);
};

exports.default = _fill2.default;

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction2 = __webpack_require__(111);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _vue = __webpack_require__(121);

var _vue2 = _interopRequireDefault(_vue);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _target = __webpack_require__(35);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Directive for advanced low-level dynamic styling using ol.StyleFunction.
 * Can be applied on styleable components that use styleTarget mixins
 */
exports.default = {
  name: 'style-func',
  bind: function bind(el, binding, vnode) {
    var component = vnode.componentInstance;
    var styleFunctionFactory = binding.value;

    if (!(0, _isFunction3.default)(styleFunctionFactory) || !component.styleTarget()) return;

    bindStyleFunction(styleFunctionFactory(_openlayers2.default, _vlOl.style), component);
  },
  unbind: function unbind(el, binding, vnode) {
    var component = vnode.componentInstance;
    if (component.styleTarget()) {
      component.setStyle(component.styles);
    }
  },
  update: function update(el, binding, vnode) {
    // todo rebind style function? need test
  }
};


function bindStyleFunction(styleFunc, component) {
  var defStyleFunc = (0, _target.createStyleFunc)(component);

  _vue2.default.nextTick(function () {
    component.styleTarget().setStyle(function __directiveStyleFunc(feature, resolution) {
      var styles = styleFunc(feature, resolution);

      if (styles === null || Array.isArray(styles) && styles.length) {
        return styles;
      }

      return defStyleFunc(feature, resolution);
    });
  });
}

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _func = __webpack_require__(238);

var _func2 = _interopRequireDefault(_func);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_func2.default.install = function (Vue) {
  Vue.directive(_func2.default.name, _func2.default);
};
exports.default = _func2.default;

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(718);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_icon2.default.install = function (Vue) {
  Vue.component(_icon2.default.name, _icon2.default);
};

exports.default = _icon2.default;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directives = exports.mixins = exports.VlStyleIcon = exports.VlStyleCircle = exports.VlStyleStroke = exports.VlStyleFill = exports.VlStyleContainer = undefined;

var _style = __webpack_require__(34);

var _style2 = _interopRequireDefault(_style);

var _image = __webpack_require__(75);

var _image2 = _interopRequireDefault(_image);

var _target = __webpack_require__(35);

var _target2 = _interopRequireDefault(_target);

var _func = __webpack_require__(239);

var _func2 = _interopRequireDefault(_func);

var _container = __webpack_require__(236);

var _container2 = _interopRequireDefault(_container);

var _fill = __webpack_require__(237);

var _fill2 = _interopRequireDefault(_fill);

var _stroke = __webpack_require__(242);

var _stroke2 = _interopRequireDefault(_stroke);

var _circle = __webpack_require__(235);

var _circle2 = _interopRequireDefault(_circle);

var _icon = __webpack_require__(240);

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VlStyleContainer = _container2.default;
exports.VlStyleFill = _fill2.default;
exports.VlStyleStroke = _stroke2.default;
exports.VlStyleCircle = _circle2.default;
exports.VlStyleIcon = _icon2.default;
var mixins = exports.mixins = {
  style: _style2.default,
  styleImage: _image2.default,
  styleTarget: _target2.default
};

var directives = exports.directives = {
  styleFunc: _func2.default
};

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stroke = __webpack_require__(719);

var _stroke2 = _interopRequireDefault(_stroke);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_stroke2.default.install = function (Vue) {
  Vue.component(_stroke2.default.name, _stroke2.default);
};

exports.default = _stroke2.default;

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordTransform = undefined;
exports.extentFromLonLat = extentFromLonLat;
exports.extentToLonLat = extentToLonLat;
exports.pointToLonLat = pointToLonLat;
exports.pointFromLonLat = pointFromLonLat;
exports.lineToLonLat = lineToLonLat;
exports.lineFromLonLat = lineFromLonLat;
exports.polygonToLonLat = polygonToLonLat;
exports.polygonFromLonLat = polygonFromLonLat;
exports.multiPointToLonLat = multiPointToLonLat;
exports.multiPointFromLonLat = multiPointFromLonLat;
exports.multiLineToLonLat = multiLineToLonLat;
exports.multiLineFromLonLat = multiLineFromLonLat;
exports.multiPolygonToLonLat = multiPolygonToLonLat;
exports.multiPolygonFromLonLat = multiPolygonFromLonLat;

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _consts = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {ol.Extent} extent
 * @param {ol.ProjectionLike} projection
 * @return {ol.Extent}
 */
function extentFromLonLat(extent) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.transformExtent(extent, _consts.DATA_PROJECTION, projection);
}

/**
 * @param {ol.Extent} extent
 * @param {ol.ProjectionLike} projection
 * @return {ol.Extent}
 */
function extentToLonLat(extent) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.transformExtent(extent, projection, _consts.DATA_PROJECTION);
}

function pointToLonLat(coordinate) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.toLonLat(coordinate, projection);
}
function pointFromLonLat(coordinate) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return _openlayers2.default.proj.fromLonLat(coordinate, projection);
}

function lineToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointToLonLat(point, projection);
  });
}
function lineFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointFromLonLat(point, projection);
  });
}

function polygonToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineToLonLat(line, projection);
  });
}
function polygonFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineFromLonLat(line, projection);
  });
}

function multiPointToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointToLonLat(point, projection);
  });
}
function multiPointFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (point) {
    return pointFromLonLat(point, projection);
  });
}

function multiLineToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineToLonLat(line, projection);
  });
}
function multiLineFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (line) {
    return lineFromLonLat(line, projection);
  });
}

function multiPolygonToLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (polygon) {
    return polygonToLonLat(polygon, projection);
  });
}
function multiPolygonFromLonLat(coordinates) {
  var projection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _consts.MAP_PROJECTION;

  return coordinates.map(function (polygon) {
    return polygonFromLonLat(polygon, projection);
  });
}

var coordTransform = exports.coordTransform = {
  Point: {
    toLonLat: pointToLonLat,
    fromLonLat: pointFromLonLat
  },
  LineString: {
    toLonLat: lineToLonLat,
    fromLonLat: lineFromLonLat
  },
  Polygon: {
    toLonLat: polygonToLonLat,
    fromLonLat: polygonFromLonLat
  },
  MultiPoint: {
    toLonLat: multiPointToLonLat,
    fromLonLat: multiPointFromLonLat
  },
  MultiLineString: {
    toLonLat: multiLineToLonLat,
    fromLonLat: multiLineFromLonLat
  },
  MultiPolygon: {
    toLonLat: multiPolygonToLonLat,
    fromLonLat: multiPolygonFromLonLat
  }
};

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(50);

var _promise2 = _interopRequireDefault(_promise);

var _log = __webpack_require__(272);

var _log2 = _interopRequireDefault(_log);

var _isEqual2 = __webpack_require__(70);

var _isEqual3 = _interopRequireDefault(_isEqual2);

exports.zoomToResolution = zoomToResolution;
exports.resolutionToZoom = resolutionToZoom;
exports.createAttributions = createAttributions;
exports.haversineDistance = haversineDistance;
exports.flyTo = flyTo;

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _consts = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {number} zoom
 * @param {number} [latitude=0.0]
 * @param {number} [tileSize=256]
 * @return {number}
 */
function zoomToResolution(zoom) {
  var latitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
  var tileSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _consts.TILE_SIZE;

  // meters per pixel at zoom = 0
  var mpp = 2 * Math.PI * _consts.EARTH_RADIUS / tileSize;

  return mpp * Math.cos(latitude) / Math.pow(2, zoom);
}
/**
 * @param {number} resolution
 * @param {number} [latitude=0.0]
 * @param {number} [tileSize=256]
 * @return {number}
 */
function resolutionToZoom(resolution) {
  var latitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.0;
  var tileSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _consts.TILE_SIZE;

  // meters per pixel at zoom = 0
  var mpp = 2 * Math.PI * _consts.EARTH_RADIUS / tileSize;

  return Math.round(Math.log(mpp * Math.cos(latitude) / resolution) / Math.log(2));
}

/**
 * @param {string[]} attributions
 * @return {ol.Attribution[]}
 */
function createAttributions(attributions) {
  return (attributions || []).map(function (html) {
    return new _openlayers2.default.Attribution({ html: html });
  });
}

/**
 * @param {number[]} p1 First point in EPSG:4326
 * @param {number[]} p2 Second point in EPSG:4326
 * @return {number} Distance in meters.
 */
function haversineDistance(p1, p2) {
  return _consts.WGS84_SPHERE.haversineDistance(p1, p2);
}

/**
 * @param {ol.View} view
 * @param {number[]} coordinate Coordinate in EPSG:4326
 * @param {number} zoom
 * @return {Promise}
 */
function flyTo(view, coordinate, zoom) {
  var currentZoom = Math.ceil(view.getZoom());
  var currentCenter = _openlayers2.default.proj.toLonLat(view.getCenter(), view.getProjection());
  var distance = haversineDistance(currentCenter, coordinate);
  var duration = (0, _log2.default)(distance / 1000) * 1000;

  var centerPromise = new _promise2.default(function (resolve) {
    return view.animate({
      center: coordinate,
      duration: duration
    }, resolve);
  });

  var zoomPromise = void 0;
  if (currentZoom >= 10 && distance >= 10000 && !(0, _isEqual3.default)(coordinate, currentCenter)) {
    zoomPromise = new _promise2.default(function (resolve) {
      return view.animate({
        zoom: Math.ceil(currentZoom / 2),
        duration: duration / 2
      }, {
        zoom: zoom,
        duration: duration / 2
      }, resolve);
    });
  } else {
    zoomPromise = new _promise2.default(function (resolve) {
      return view.animate({
        zoom: zoom,
        duration: duration
      });
    });
  }

  return _promise2.default.all([centerPromise, zoomPromise]);
}

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformStyleHash = undefined;

var _assign = __webpack_require__(127);

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

var _reduce2 = __webpack_require__(641);

var _reduce3 = _interopRequireDefault(_reduce2);

var _merge2 = __webpack_require__(194);

var _merge3 = _interopRequireDefault(_merge2);

var _isEmpty2 = __webpack_require__(638);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _lowerFirst2 = __webpack_require__(640);

var _lowerFirst3 = _interopRequireDefault(_lowerFirst2);

var _upperFirst2 = __webpack_require__(643);

var _upperFirst3 = _interopRequireDefault(_upperFirst2);

var _pick2 = __webpack_require__(196);

var _pick3 = _interopRequireDefault(_pick2);

var _flow2 = __webpack_require__(637);

var _flow3 = _interopRequireDefault(_flow2);

exports.getDefaultStyleHash = getDefaultStyleHash;
exports.createStyleFunc = createStyleFunc;
exports.transformStyle = transformStyle;
exports.transformFillStyle = transformFillStyle;
exports.transformStrokeStyle = transformStrokeStyle;
exports.transformImageStyle = transformImageStyle;
exports.transformTextStyle = transformTextStyle;
exports.defaultStyle = defaultStyle;
exports.defaultEditStyle = defaultEditStyle;

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _func = __webpack_require__(76);

var _consts = __webpack_require__(48);

var _consts2 = _interopRequireDefault(_consts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reduceWithKey = _reduce3.default.convert({ cap: false });

// Style helpers (get from geo-1.1)
/**
 * @typedef {Object} GeoStyle
 *
 * Shared
 * @property {string|number[]} fillColor
 * @property {string|number[]} strokeColor
 * @property {number} strokeWidth
 * @property {number[]} strokeDash
 * @property {string} strokeCap
 * @property {string} strokeJoin
 * @property {number} zIndex
 *
 * Text only
 * @property {string} text
 * @property {string} textFont
 * @property {number} textFontSize
 * @property {number} textScale
 * @property {string} textAlign
 * @property {number} textRotation
 * @property {number} textOffsetX
 * @property {number} textOffsetY
 *
 * Icon only
 * @property {string} iconUrl
 * @property {Image} iconImg
 * @property {number[]} iconSize
 * @property {number[]} iconImgSize
 * @property {number} iconOffset
 * @property {number[]} iconAnchor
 * @property {number} iconScale
 * @property {number} iconRotation
 * @property {number} iconRadius
 * @property {number} iconRadius1
 * @property {number} iconRadius2
 * @property {number} iconPoints
 * @property {number} iconAngle
 * @property {number} iconOpacity
 * @property {ol.style.IconOrigin | undefined} iconAnchorOrigin
 * @property {ol.Color | string | undefined} iconColor
 * @property {ol.style.IconOrigin | undefined} iconOffsetOrigin
 */
function getDefaultStyleHash() {
  var default_ = {
    fillColor: [255, 255, 255, 0.7],
    strokeColor: [30, 54, 133, 1],
    strokeWidth: 3,
    strokeCap: 'round',
    strokeJoin: 'round',
    iconRadius: 7,
    textStrokeColor: [30, 54, 133, 1],
    textFillColor: [30, 54, 133, 1],
    textFont: 'sans-serif',
    textFontSize: 12,
    textStrokeWidth: 1
  };

  var select = (0, _extends3.default)({}, default_, {
    fillColor: [255, 255, 255, 0.8],
    strokeColor: [255, 121, 1, 1],
    textFillColor: [255, 121, 1, 1],
    textStrokeColor: [255, 121, 1, 1],
    zIndex: 1
  });

  var cluster = (0, _extends3.default)({}, default_, {
    text: '<%= item.clusterSize %>',
    iconUrl: null,
    iconImg: null,
    iconPoints: null,
    iconRadius: 20,
    textFontSize: 14,
    zIndex: 1
  });

  var modify = (0, _extends3.default)({}, default_, {
    fillColor: [255, 255, 255, 0.8],
    strokeColor: '#FF1E23',
    zIndex: 1
  });

  var current = (0, _extends3.default)({}, default_, {
    fillColor: [27, 226, 23, 0.8],
    strokeColor: [14, 118, 11, 1],
    strokeWidth: 4,
    zIndex: 1
  });

  return {
    default: [(0, _extends3.default)({}, default_)],
    select: [(0, _extends3.default)({}, select)],
    cluster: [(0, _extends3.default)({}, cluster)],
    remove: null,
    modify: [(0, _extends3.default)({}, modify)],
    current: [(0, _extends3.default)({}, current)]
  };
}

/**
 * @param {Object<string, GeoStyle[]>} styleHash
 * @return {Object<string, ol.style.Style[]>}
 * @function
 */
var transformStyleHash = exports.transformStyleHash = reduceWithKey(function (olStyleHash, geoStyles, styleName) {
  if (geoStyles && geoStyles.length) {
    var olStyle = geoStyles.map(transformStyle);

    if (!(0, _isEmpty3.default)(olStyle)) {
      olStyleHash[styleName] = olStyle;
    }
  }

  return olStyleHash;
});

/**
 * Returns style function for `styleHash` or default style function.
 *
 * @param {Object} [styleHash]
 * @return {ol.StyleFunction}
 */
function createStyleFunc(styleHash) {
  styleHash = (0, _merge3.default)(getDefaultStyleHash(), styleHash);

  // Static pre-compilation
  var olStyleHash = transformStyleHash({}, styleHash);

  return (
    /**
     * @param {ol.Feature} feature
     * @return {ol.style.Style[]}
     */
    function __styleFunc(feature) {
      var styleName = feature.get('styleName') || 'default';

      return olStyleHash[styleName];
    }
  );
}

/**
 * @param {GeoStyle} geoStyle
 * @return {ol.style.Style|undefined}
 */
function transformStyle(geoStyle) {
  if ((0, _isEmpty3.default)(geoStyle)) return;

  var olStyle = {
    text: transformTextStyle(geoStyle),
    fill: transformFillStyle(geoStyle),
    stroke: transformStrokeStyle(geoStyle),
    image: transformImageStyle(geoStyle),
    zIndex: geoStyle.zIndex
  };

  if (!(0, _isEmpty3.default)(olStyle)) {
    return new _openlayers2.default.style.Style(olStyle);
  }
}

var addPrefix = function addPrefix(prefix) {
  return function (str) {
    return prefix + (prefix ? (0, _upperFirst3.default)(str) : str);
  };
};

/**
 * @param {GeoStyle} geoStyle
 * @param {string} [prefix]
 * @returns {ol.style.Fill|undefined}
 */
function transformFillStyle(geoStyle) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var prefixKey = addPrefix(prefix);
  var keys = ['fillColor'].map(prefixKey);

  var transform = (0, _flow3.default)((0, _pick3.default)(keys), reduceWithKey(function (result, value, name) {
    name = (0, _lowerFirst3.default)(name.replace(new RegExp(prefixKey('fill')), ''));
    result[name] = value;

    return result;
  }, {}));

  var fillStyle = transform(geoStyle);

  if (!(0, _isEmpty3.default)(fillStyle)) {
    return new _openlayers2.default.style.Fill(fillStyle);
  }
}

/**
 * @param {GeoStyle} geoStyle
 * @param {string} [prefix]
 * @returns {ol.style.Stroke|undefined}
 */
function transformStrokeStyle(geoStyle) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var prefixKey = addPrefix(prefix);
  var keys = ['strokeColor', 'strokeWidth', 'strokeDash', 'strokeCap', 'strokeJoin'].map(prefixKey);

  var transform = (0, _flow3.default)((0, _pick3.default)(keys), reduceWithKey(function (result, value, name) {
    switch (name) {
      case prefixKey('strokeColor'):
      case prefixKey('strokeWidth'):
        name = (0, _lowerFirst3.default)(name.replace(new RegExp(prefixKey('stroke')), ''));
        break;
      case prefixKey('strokeDash'):
      case prefixKey('strokeCap'):
      case prefixKey('strokeJoin'):
        name = 'line' + name.replace(new RegExp(prefixKey('stroke')), '');
        break;
    }

    result[name] = value;

    return result;
  }, {}));
  var strokeStyle = transform(geoStyle);

  if (!(0, _isEmpty3.default)(strokeStyle)) {
    return new _openlayers2.default.style.Stroke(strokeStyle);
  }
}

/**
 * @param {GeoStyle} geoStyle
 * @returns {ol.style.Icon|ol.style.Circle|ol.style.RegularShape|undefined}
 */
function transformImageStyle(geoStyle) {
  if ((0, _isEmpty3.default)(geoStyle.iconUrl) && (0, _isEmpty3.default)(geoStyle.iconImg) && (0, _isEmpty3.default)(geoStyle.iconPoints) && !(0, _func.isNumeric)(geoStyle.iconRadius)) {
    return;
  }

  var imageStyle = void 0;

  if (!(0, _isEmpty3.default)(geoStyle.iconUrl) || !(0, _isEmpty3.default)(geoStyle.iconImg)) {
    // then create ol.style.Icon options
    imageStyle = (0, _extends3.default)({}, geoStyle, {
      type: 'icon',
      anchor: geoStyle.iconAnchor,
      anchorOrigin: geoStyle.iconAnchorOrigin,
      color: geoStyle.iconColor,
      offset: geoStyle.iconOffset,
      offsetOrigin: geoStyle.iconOffsetOrigin,
      opacity: geoStyle.iconOpacity,
      scale: geoStyle.iconScale,
      rotation: geoStyle.iconRotation,
      size: geoStyle.iconSize,
      imgSize: geoStyle.iconImgSize,
      src: geoStyle.iconUrl,
      crossOrigin: 'anonymous'
    });
  } else if (geoStyle.iconPoints != null) {
    // create ol.style.RegularShape options
    imageStyle = (0, _extends3.default)({}, geoStyle, {
      type: 'shape',
      points: geoStyle.iconPoints,
      radius: geoStyle.iconRadius,
      radius1: geoStyle.iconRadius1,
      radius2: geoStyle.iconRadius2,
      angle: geoStyle.iconAngle,
      rotation: geoStyle.iconRotation
    });
  } else {
    // create ol.style.Circle options
    imageStyle = (0, _extends3.default)({}, geoStyle, {
      type: 'circle',
      radius: geoStyle.iconRadius
    });
  }

  imageStyle = (0, _extends3.default)({}, imageStyle, {
    fill: transformFillStyle(geoStyle, 'icon') || transformFillStyle(geoStyle),
    stroke: transformStrokeStyle(geoStyle, 'icon') || transformStrokeStyle(geoStyle),
    snapToPixel: true
  });

  if (!(0, _isEmpty3.default)(imageStyle)) {
    return new _openlayers2.default.style[(0, _upperFirst3.default)(imageStyle.type)](imageStyle);
  }
}

/**
 * @param {GeoStyle} geoStyle
 * @returns {ol.style.Text|undefined}
 */
function transformTextStyle(geoStyle) {
  // noinspection JSValidateTypes
  if (geoStyle.text == null) {
    return;
  }

  var textStyle = {
    text: geoStyle.text
  };

  var fontSize = geoStyle.textFontSize ? geoStyle.textFontSize + 'px' : undefined;
  var font = ['normal', fontSize, geoStyle.textFont].filter(function (x) {
    return !!x;
  }).join(' ');

  (0, _assign2.default)(textStyle, (0, _pick3.default)(['textScale', 'textRotation', 'textOffsetX', 'textOffsetY', 'textAlign'])(geoStyle), {
    font: font,
    fill: transformFillStyle(geoStyle, 'text') || transformFillStyle(geoStyle),
    stroke: transformStrokeStyle(geoStyle, 'text') || transformStrokeStyle(geoStyle)
  });

  if (!(0, _isEmpty3.default)(textStyle)) {
    return new _openlayers2.default.style.Text(textStyle);
  }
}

/**
 * Default OpenLayers styles
 *
 * @return {ol.style.Style[]}
 * @see {@link https://github.com/openlayers/openlayers/blob/master/src/ol/style/style.js#L290}
 */
function defaultStyle() {
  // We don't use an immediately-invoked function
  // and a closure so we don't get an error at script evaluation time in
  // browsers that do not support Canvas. (ol.style.Circle does
  // canvas.getContext('2d') at construction time, which will cause an.error
  // in such browsers.)
  var fill = new _openlayers2.default.style.Fill({
    color: 'rgba(255,255,255,0.4)'
  });
  var stroke = new _openlayers2.default.style.Stroke({
    color: '#3399CC',
    width: 1.25
  });
  return [new _openlayers2.default.style.Style({
    image: new _openlayers2.default.style.Circle({
      fill: fill,
      stroke: stroke,
      radius: 5
    }),
    fill: fill,
    stroke: stroke
  })];
}

/**
 * Default OpenLayers edit style.
 *
 * @return {Object.<consts.GEOMETRY_TYPE, Array.<ol.style.Style>>}
 * @see {@link https://github.com/openlayers/openlayers/blob/master/src/ol/style/style.js#L324}
 */
function defaultEditStyle() {
  /** @type {Object.<consts.GEOMETRY_TYPE, Array.<ol.style.Style>>} */
  var styles = {};
  var white = [255, 255, 255, 1];
  var blue = [0, 153, 255, 1];
  var width = 3;

  styles[_consts2.default.GEOMETRY_TYPE.LINE_STRING] = [new _openlayers2.default.style.Style({
    stroke: new _openlayers2.default.style.Stroke({
      color: white,
      width: width + 2
    })
  }), new _openlayers2.default.style.Style({
    stroke: new _openlayers2.default.style.Stroke({
      color: blue,
      width: width
    })
  })];
  styles[_consts2.default.GEOMETRY_TYPE.MULTI_LINE_STRING] = styles[_consts2.default.GEOMETRY_TYPE.LINE_STRING];

  styles[_consts2.default.GEOMETRY_TYPE.POLYGON] = [new _openlayers2.default.style.Style({
    fill: new _openlayers2.default.style.Fill({
      color: [255, 255, 255, 0.5]
    })
  })].concat(styles[_consts2.default.GEOMETRY_TYPE.LINE_STRING]);
  styles[_consts2.default.GEOMETRY_TYPE.MULTI_POLYGON] = styles[_consts2.default.GEOMETRY_TYPE.POLYGON];

  styles[_consts2.default.GEOMETRY_TYPE.CIRCLE] = styles[_consts2.default.GEOMETRY_TYPE.POLYGON].concat(styles[_consts2.default.GEOMETRY_TYPE.LINE_STRING]);

  styles[_consts2.default.GEOMETRY_TYPE.POINT] = [new _openlayers2.default.style.Style({
    image: new _openlayers2.default.style.Circle({
      radius: width * 2,
      fill: new _openlayers2.default.style.Fill({
        color: blue
      }),
      stroke: new _openlayers2.default.style.Stroke({
        color: white,
        width: width / 2
      })
    }),
    zIndex: Infinity
  })];
  styles[_consts2.default.GEOMETRY_TYPE.MULTI_POINT] = styles[_consts2.default.GEOMETRY_TYPE.POINT];

  styles[_consts2.default.GEOMETRY_TYPE.GEOMETRY_COLLECTION] = styles[_consts2.default.GEOMETRY_TYPE.POLYGON].concat(styles[_consts2.default.GEOMETRY_TYPE.LINE_STRING], styles[_consts2.default.GEOMETRY_TYPE.POINT]);

  return styles;
}

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fromOlEvent;

var _Observable = __webpack_require__(7);

__webpack_require__(676);

/**
 * Creates an Observable using OpenLayers event pattern that emits events of a specific type
 * coming from the given event target.
 *
 * @example <caption>Subscribe on view center change events</caption>
 * const map = ol.Map({ ... })
 * const changes = Observable.fromOlEvent(map.getView(), 'change:center')
 *
 * changes.subscribe(coordinate => console.log(coordinate))
 *
 * @param {ol.Object} target OpenLayers event target.
 * @param {string} eventName The event name of interest, being emitted by the `target`.
 * @param {function(...*): *} [selector] An optional function to post-process results. It takes the arguments
 *    from the event handler and should return a single value.
 * @return {Observable<T>}
 * @memberOf {Observable}
 */
function fromOlEvent(target, eventName, selector) {
  return _Observable.Observable.fromEventPattern(function (handler) {
    return target.on(eventName, handler);
  }, function (handler) {
    return target.un(eventName, handler);
  }, selector);
}

_Observable.Observable.fromOlEvent = fromOlEvent;

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(130);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = __webpack_require__(129);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _forEach2 = __webpack_require__(110);

var _forEach3 = _interopRequireDefault(_forEach2);

var _kebabCase2 = __webpack_require__(193);

var _kebabCase3 = _interopRequireDefault(_kebabCase2);

__webpack_require__(748);

var _highlight = __webpack_require__(340);

var _highlight2 = _interopRequireDefault(_highlight);

var _scss = __webpack_require__(143);

var _scss2 = _interopRequireDefault(_scss);

var _xml = __webpack_require__(144);

var _xml2 = _interopRequireDefault(_xml);

var _javascript = __webpack_require__(142);

var _javascript2 = _interopRequireDefault(_javascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highlight2.default.registerLanguage('scss', _scss2.default); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

_highlight2.default.registerLanguage('xml', _xml2.default);
_highlight2.default.registerLanguage('javascript', _javascript2.default);

var methods = {
  geometryTypeToCompName: function geometryTypeToCompName(type) {
    return 'vl-geom-' + (0, _kebabCase3.default)(type);
  },
  updateMapView: function updateMapView(_ref) {
    var center = _ref.center,
        zoom = _ref.zoom,
        rotation = _ref.rotation;

    this.center = center;
    this.zoom = zoom;
    this.rotation = rotation;
  },
  updateGeoloc: function updateGeoloc(_ref2) {
    var position = _ref2.position;

    this.position = position;
  },
  select: function select(id) {
    if (this.selected.indexOf(id) === -1) {
      this.selected.push(id);
    }
  },
  unselect: function unselect(id) {
    var i = this.selected.indexOf(id);
    if (i !== -1) {
      this.selected.splice(i, 1);
    }
  },
  loadData: function loadData() {
    var _this = this;

    return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var res, geomCollection;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('https://openlayers.org/en/latest/examples/data/geojson/countries.geojson');

            case 2:
              res = _context.sent;
              _context.next = 5;
              return res.json();

            case 5:
              geomCollection = _context.sent;

              _this.countries = geomCollection.features.map(function (feature, i) {
                feature.properties = (0, _extends3.default)({}, feature.properties, {
                  color: i % 2 === 0 ? [49, 163, 84, 0.7] : undefined,
                  selectColor: i % 2 !== 0 ? [221, 28, 119, 0.9] : undefined
                });

                return feature;
              });

              return _context.abrupt('return', _this.countries);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  pacmanStyleFunc: function pacmanStyleFunc(ol, styleHelper) {
    var pacman = [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#DE9147',
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [222, 189, 36, 0.8]
      })
    })];
    var path = [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'blue',
        width: 1
      })
    }), new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
          color: 'orange'
        })
      }),
      geometry: function geometry(feature) {
        return new ol.geom.MultiPoint(feature.getGeometry().getCoordinates());
      }
    })];
    var eye = [new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({
          color: '#444444'
        })
      })
    })];

    return function __pacmanStyleFunc(feature, resolution) {
      switch (feature.getId()) {
        case 'pacman':
          return pacman;
        case 'pacman-path':
          return path;
        case 'pacman-eye':
          return eye;
      }
    };
  },
  toggleLayer: function toggleLayer(layer) {
    this.layers[layer] = !this.layers[layer];
  },
  showSourceCode: function showSourceCode() {
    this.sourceCode = true;
  }
};

var watch = {
  sourceCode: function sourceCode(value) {
    var _this2 = this;

    if (value) {
      this.$nextTick(function () {
        (0, _forEach3.default)(_highlight2.default.highlightBlock.bind(_highlight2.default), _this2.$refs.sourceCode.querySelectorAll('pre > code'));
      });
    }
  }
};

exports.default = {
  name: 'app',
  watch: watch,
  methods: methods,
  data: function data() {
    return {
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      selected: [],
      countries: [],
      pacman: __webpack_require__(507).features,
      position: [],
      layers: {
        osm: false,
        mapbox: true,
        countries: true,
        pacman: false
      },
      sourceCode: false
    };
  },
  created: function created() {
    var _context2;

    this.loadData().catch((_context2 = console).error.bind(_context2));
  }
};

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

var _omit2 = __webpack_require__(195);

var _omit3 = _interopRequireDefault(_omit2);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _v = __webpack_require__(210);

var _v2 = _interopRequireDefault(_v);

var _target = __webpack_require__(35);

var _target2 = _interopRequireDefault(_target);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//

/**
 * Wrapper around ol.Feature.
 *
 * @todo Add property 'visible', like in layer. If visible = false -> set null style
 */
var props = {
  id: {
    type: [String, Number],
    default: function _default() {
      return (0, _v2.default)();
    }
  },
  data: {
    type: Object,
    default: function _default() {
      return {};
    }
  }
};

var methods = {
  refresh: function refresh() {
    this.feature && this.feature.changed();
  },
  plain: function plain() {
    var obj = {
      id: this.id,
      layer: this.layer() && this.layer().$vm.id,
      data: this.data
    };

    var geom = this.feature.getGeometry();
    if (geom) {
      obj.geometry = {
        type: geom.getType(),
        coordinates: geom.getCoordinates()
      };
    }

    return obj;
  },
  styleTarget: function styleTarget() {
    return this.feature;
  }
};

var watch = {
  id: function id(value) {
    this.feature.setId(value);
  },
  data: function data(value) {
    this.feature.setProperties((0, _omit3.default)(['geometry'], value));
  }
};

var styleTargetProvide = _target2.default.provide;
exports.default = {
  name: 'vl-feature',
  mixins: [_target2.default],
  inject: ['layer', 'source'],
  props: props,
  methods: methods,
  watch: watch,
  provide: function provide() {
    var _this = this;

    return (0, _extends3.default)({}, styleTargetProvide.call(this), {
      feature: function feature() {
        return _this.feature;
      }
    });
  },
  created: function created() {
    createFeature.call(this);
  },
  mounted: function mounted() {
    if (this.source()) {
      this.source().addFeature(this.feature);
    } else if (false) {
      (0, _debug.warn)("Invalid usage of feature component, should have source component among it's ancestors");
    }
  },
  destroyed: function destroyed() {
    this.source() && this.source().removeFeature(this.feature);
    this.feature = undefined;
  }
};

/**
 * Create feature without inner style applying, feature level style
 * will be applied in the layer level style function.
 *
 * @return {ol.Feature}
 */

function createFeature() {
  /**
   * @type {ol.Feature}
   * @protected
   */
  this.feature = new _openlayers2.default.Feature((0, _omit3.default)(['geometry'], this.data));
  this.feature.setId(this.id);
  this.feature.$vm = this;

  return this.feature;
}

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEqual2 = __webpack_require__(70);

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _Observable = __webpack_require__(7);

__webpack_require__(203);

__webpack_require__(114);

__webpack_require__(116);

__webpack_require__(115);

__webpack_require__(49);

var _debug = __webpack_require__(14);

var _rxSubs = __webpack_require__(22);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  import positionMarker from './position-marker.svg'

var props = {
  tracking: {
    type: Boolean,
    default: true
  },
  projection: {
    type: String,
    default: _vlOl.consts.MAP_PROJECTION
  }
};

var methods = {
  refresh: function refresh() {
    this.geoloc.changed();
  }
};

var watch = {
  tracking: function tracking(value) {
    this.geoloc.setTracking(value);
  }
};

exports.default = {
  name: 'vl-geoloc',
  mixins: [_rxSubs2.default],
  inject: ['serviceLayer'],
  props: props,
  watch: watch,
  methods: methods,
  render: function render(h) {
    return h();
  },
  data: function data() {
    return {
      currentPosition: undefined,
      currentAccuracy: undefined
    };
  },
  created: function created() {
    createGeolocApi.call(this);
    subscribeToGeolocation.call(this);
  },
  destroyed: function destroyed() {
    this.geoloc.setTracking(false);
    //      this.serviceLayer() && this.serviceLayer().getSource().removeFeature(this.positionFeature)
    this.geoloc = this.positionFeature = undefined;
  }
};

/**
 * @return {ol.Geolocation}
 */

function createGeolocApi() {
  /**
   * @type {ol.Geolocation}
   * @protected
   */
  this.geoloc = new _openlayers2.default.Geolocation({
    tracking: this.tracking,
    projection: this.projection
  });

  this.geoloc.$vm = this;
  /**
   * @type {ol.Feature}
   * @protected
   */
  //    this.positionFeature = new ol.Feature({
  //      internal: true
  //    })
  //    this.positionFeature.setStyle(new ol.style.Style({
  //      image: new ol.style.Icon({
  //        src: positionMarker,
  //        scale: 0.85,
  //        anchor: [ 0.5, 1 ]
  //      })
  //    }))
  //    this.serviceLayer() && this.serviceLayer().getSource().addFeature(this.positionFeature)

  return this.geoloc;
}

function subscribeToGeolocation() {
  var _this = this;

  var geolocChanges = _Observable.Observable.fromOlEvent(this.geoloc, 'change').throttleTime(100).map(function () {
    var position = _openlayers2.default.proj.toLonLat(_this.geoloc.getPosition(), _this.projection);
    var accuracy = _this.geoloc.getAccuracy();

    return { position: position, accuracy: accuracy };
  }).distinctUntilChanged(function (a, b) {
    return (0, _isEqual3.default)(a, b);
  });

  this.rxSubs.geoloc = geolocChanges.subscribe(function (_ref) {
    var position = _ref.position,
        accuracy = _ref.accuracy;

    _this.currentPosition = position;
    _this.currentAccuracy = accuracy;
    _this.$emit('change', { position: position, accuracy: accuracy });
  }, _debug.errordbg);
}

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _geom = __webpack_require__(16);

var _geom2 = _interopRequireDefault(_geom);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _openlayers2.default.geom.LineString(_vlOl.coord.lineFromLonLat(this.coordinates, this.view().getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-line-string',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _geom = __webpack_require__(16);

var _geom2 = _interopRequireDefault(_geom);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _openlayers2.default.geom.MultiLineString(_vlOl.coord.multiLineFromLonLat(this.coordinates, this.view().getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-multi-line-string',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _geom = __webpack_require__(16);

var _geom2 = _interopRequireDefault(_geom);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _openlayers2.default.geom.MultiPoint(_vlOl.coord.multiPointFromLonLat(this.coordinates, this.view().getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-multi-point',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _geom = __webpack_require__(16);

var _geom2 = _interopRequireDefault(_geom);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _openlayers2.default.geom.MultiPolygon(_vlOl.coord.multiPolygonFromLonLat(this.coordinates, this.view().getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-multi-polygon',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _geom = __webpack_require__(16);

var _geom2 = _interopRequireDefault(_geom);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length === 2;
    }
  }
};

var methods = {
  /**
   * @return {ol.geom.Point}
   * @protected
   */
  createGeometry: function createGeometry() {
    return new _openlayers2.default.geom.Point(_vlOl.coord.pointFromLonLat(this.coordinates, this.view().getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-point',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _geom = __webpack_require__(16);

var _geom2 = _interopRequireDefault(_geom);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  coordinates: {
    type: Array,
    required: true,
    validator: function validator(value) {
      return Array.isArray(value) && value.length;
    }
  }
};

var methods = {
  createGeometry: function createGeometry() {
    return new _openlayers2.default.geom.Polygon(_vlOl.coord.polygonFromLonLat(this.coordinates, this.view().getProjection()));
  }
};

exports.default = {
  name: 'vl-geom-polygon',
  mixins: [_geom2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(23);

var _extends3 = _interopRequireDefault(_extends2);

var _difference2 = __webpack_require__(636);

var _difference3 = _interopRequireDefault(_difference2);

var _forEach2 = __webpack_require__(110);

var _forEach3 = _interopRequireDefault(_forEach2);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _Observable = __webpack_require__(7);

__webpack_require__(49);

var _debug = __webpack_require__(14);

var _vlOl = __webpack_require__(8);

var _interaction = __webpack_require__(122);

var _interaction2 = _interopRequireDefault(_interaction);

var _target = __webpack_require__(35);

var _target2 = _interopRequireDefault(_target);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo add other options, like event modifiers
var props = {
  multi: {
    type: Boolean,
    default: false
  },
  wrapX: {
    type: Boolean,
    default: true
  },
  selected: {
    type: Array,
    default: function _default() {
      return [];
    }
  }
};

var interactionRefresh = _interaction2.default.methods.refresh;
var methods = {
  /**
   * @protected
   */
  subscribeAll: function subscribeAll() {
    subscribeToInteractionChanges.call(this);
  },

  /**
   * @return {ol.interaction.Select}
   * @protected
   */
  createInteraction: function createInteraction() {
    var defaultStyles = _vlOl.style.defaultEditStyle();
    var styleFunc = (0, _target.createStyleFunc)(this);
    var style = function __selectStyleFunc(feature, resolution) {
      var styles = styleFunc(feature, resolution);
      if (styles === null || Array.isArray(styles) && styles.length) {
        return styles;
      }

      return feature.getGeometry() != null ? defaultStyles[feature.getGeometry().getType()] : null;
    };
    var serviceFeatures = this.serviceLayer() && this.serviceLayer().getSource().getFeatures();

    return new _openlayers2.default.interaction.Select({
      multi: this.multi,
      filter: function filter(feature) {
        return !serviceFeatures.includes(feature);
      },
      style: style
    });
  },
  refresh: function refresh() {
    this.interaction && this.interaction.getFeatures().changed();
    interactionRefresh.call(this);
  },

  /**
   * @param {number} id
   */
  select: function select(id) {
    var selection = this.interaction.getFeatures();
    var layers = this.map().getLayers().getArray().filter(function (layer) {
      return layer.$vm && layer instanceof _openlayers2.default.layer.Vector;
    });

    if (this.currentSelected.includes(id)) return;

    var feature = void 0;
    (0, _forEach3.default)(function (layer) {
      feature = layer.getSource().getFeatureById(id);
      return !feature;
    }, layers);

    feature && selection.push(feature);
  },

  /**
   * @param {number} id
   */
  unselect: function unselect(id) {
    var selection = this.interaction.getFeatures();
    var selectionArray = selection.getArray();
    var idx = selectionArray.findIndex(function (feature) {
      return feature.getId() === id;
    });

    if (idx !== -1) {
      selection.removeAt(idx);
    }
  },
  unselectAll: function unselectAll() {
    this.interaction.getFeatures().clear();
  },
  styleTarget: function styleTarget() {
    return this.interaction;
  },
  setStyle: function setStyle(style) {
    this.styles = style;
    this.refresh();
  }
};

var watch = {
  selected: function selected(_selected) {
    var _this = this;

    var forSelect = (0, _difference3.default)(_selected, this.currentSelected);
    var forUnselect = (0, _difference3.default)(this.currentSelected, _selected);

    forSelect.forEach(function (id) {
      return _this.select(id);
    });
    forUnselect.forEach(function (id) {
      return _this.unselect(id);
    });
  }
};

var interactionProvide = _interaction2.default.provide;
var styleTargetProvide = _target2.default.provide;
exports.default = {
  name: 'vl-interaction-select',
  mixins: [_interaction2.default, _target2.default],
  inject: ['map', 'serviceLayer'],
  props: props,
  methods: methods,
  watch: watch,
  provide: function provide() {
    return (0, _extends3.default)({}, interactionProvide.call(this), styleTargetProvide.call(this));
  },
  data: function data() {
    return {
      currentSelected: this.selected.slice()
    };
  }
};


function subscribeToInteractionChanges() {
  var _this2 = this;

  var selection = this.interaction.getFeatures();

  this.rxSubs.select = _Observable.Observable.fromOlEvent(selection, 'add', function (evt) {
    return evt.element;
  }).subscribe(function (feature) {
    _this2.currentSelected.push(feature.getId());
    _this2.$emit('select', feature.getId());
  }, _debug.errordbg);
  this.rxSubs.unselect = _Observable.Observable.fromOlEvent(selection, 'remove', function (evt) {
    return evt.element;
  }).subscribe(function (feature) {
    _this2.currentSelected = _this2.currentSelected.filter(function (x) {
      return x !== feature.getId();
    });
    _this2.$emit('unselect', feature.getId());
  }, _debug.errordbg);
}

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tileBase = __webpack_require__(123);

var _tileBase2 = _interopRequireDefault(_tileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'vl-layer-tile',
  mixins: [_tileBase2.default]
};

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vectorBase = __webpack_require__(124);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'vl-layer-vector',
  mixins: [_vectorBase2.default]
};

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  loadTilesWhileAnimating: {
    type: Boolean,
    default: false
  },
  loadTilesWhileInteracting: {
    type: Boolean,
    default: false
  },
  pixelRatio: Number,
  renderer: [String, Array],
  logo: [String, Object],
  keyboardEventTarget: [String, Node],
  tabIndex: {
    type: Number,
    default: 0
  }
}; //
//
//
//
//
//
//

var methods = {
  /**
   * Updates `ol.Map` view
   */
  refresh: function refresh() {
    this.map.updateSize();
    this.map.render();
  },

  /**
   * Trigger focus on map container.
   */
  focus: function focus() {
    this.$el.tabIndex = 0;
    this.$el.focus();
  }
};

exports.default = {
  name: 'vl-map',
  props: props,
  methods: methods,
  provide: function provide() {
    var _this = this;

    return {
      map: function map() {
        return _this.map;
      },
      serviceLayer: function serviceLayer() {
        return _this.serviceLayer;
      },
      view: function view() {
        return _this.map.getView();
      }
    };
  },
  created: function created() {
    createMap.call(this);
  },
  mounted: function mounted() {
    var _this2 = this;

    this.map.setTarget(this.$refs.map);
    this.$nextTick(function () {
      _this2.refresh();
    });
  },
  destroyed: function destroyed() {
    this.serviceLayer.setMap(undefined);
    this.map.setTarget(undefined);
    this.map = this.serviceLayer = undefined;
  }
};

/**
 * @return {ol.Map}
 */

function createMap() {
  /**
   * @type {ol.Map}
   * @protected
   */
  this.map = new _openlayers2.default.Map({
    layers: [],
    // todo disable all default interaction and controls and use custom if defined, wrap all
    //      interactions: [],
    //      controls: [],
    loadTilesWhileAnimating: this.loadTilesWhileAnimating,
    loadTilesWhileInteracting: this.loadTilesWhileInteracting,
    pixelRatio: this.pixelRatio,
    renderer: this.renderer,
    logo: this.logo,
    keyboardEventTarget: this.keyboardEventTarget
  });

  this.map.$vm = this;

  this.serviceLayer = new _openlayers2.default.layer.Vector({
    map: this.map,
    source: new _openlayers2.default.source.Vector()
  });

  return this.map;
}

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(50);

var _promise2 = _interopRequireDefault(_promise);

var _isEqual2 = __webpack_require__(70);

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isFunction2 = __webpack_require__(111);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _Observable = __webpack_require__(7);

__webpack_require__(203);

__webpack_require__(114);

__webpack_require__(116);

__webpack_require__(115);

__webpack_require__(49);

var _debug = __webpack_require__(14);

var _rxSubs = __webpack_require__(22);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vlOl = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  zoom: {
    type: Number,
    default: _vlOl.consts.MIN_ZOOM
  },
  center: {
    type: Array,
    default: function _default() {
      return [0, 0];
    },
    validator: function validator(value) {
      return value.length === 2;
    }
  },
  rotation: {
    type: Number,
    default: 0
  },
  maxZoom: {
    type: Number,
    default: _vlOl.consts.MAX_ZOOM
  },
  minZoom: {
    type: Number,
    default: _vlOl.consts.MIN_ZOOM
  },
  projection: {
    type: String,
    default: _vlOl.consts.MAP_PROJECTION
  },
  enableRotation: {
    type: Boolean,
    default: true
  },
  extent: {
    type: Array,
    validator: function validator(value) {
      return value.length === 4;
    }
  },
  maxResolution: Number,
  minResolution: Number,
  resolution: Array,
  zoomFactor: {
    type: Number,
    default: _vlOl.consts.ZOOM_FACTOR
  }
};

var methods = {
  /**
   * @see {@link https://openlayers.org/en/latest/apidoc/ol.View.html#fit}
   */
  fit: function fit(geometryOrExtent, options) {
    this.view.fit(geometryOrExtent, options);
  },

  /**
   * @see {@link https://openlayers.org/en/latest/apidoc/ol.View.html#animate}
   * @param {...Object} args
   * @return {Promise}
   */
  animate: function animate() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cb = args.find(_isFunction3.default);

    return new _promise2.default(function (resolve) {
      var _view;

      return (_view = _this.view).animate.apply(_view, args.concat([function (complete) {
        cb && cb(complete);
        resolve(complete);
      }]));
    });
  },
  refresh: function refresh() {
    this.view.changed();
  },
  setCurrentView: function setCurrentView(_ref) {
    var center = _ref.center,
        zoom = _ref.zoom,
        rotation = _ref.rotation;

    if (center != null && !(0, _isEqual3.default)(center, this.currentCenter)) {
      this.view.setCenter(_openlayers2.default.proj.fromLonLat(center, this.projection));
    }
    if (zoom != null && zoom !== this.currentZoom) {
      this.view.setZoom(zoom);
    }
    if (rotation != null && rotation !== this.currentRotation) {
      this.view.setRotation(rotation);
    }
  },
  subscribeAll: function subscribeAll() {
    subscribeToViewChanges.call(this);
  },
  mountView: function mountView() {
    if (!this.map()) {
      (0, _debug.warn)("Invalid usage of view component, should have map component among it's ancestors");
    }

    var view = this.map().getView();

    if (view && view.$vm) {
      if (false) {
        (0, _debug.warn)('Map already has unmounted vl-view component. ' + 'It will be replaced with new.');
      }
      view.$vm.unmountView();
    }

    this.map().setView(this.view);
    this.subscribeAll();
  },
  unmountView: function unmountView() {
    this.unsubscribeAll();
    this.map() && this.map().setView(undefined);
  }
};
// todo watch other props
var watch = {
  center: function center(_center) {
    this.setCurrentView({ center: _center });
  },
  zoom: function zoom(_zoom) {
    this.setCurrentView({ zoom: _zoom });
  },
  rotation: function rotation(_rotation) {
    this.setCurrentView({ rotation: _rotation });
  }
};

exports.default = {
  name: 'vl-map-view',
  inject: ['map'],
  mixins: [_rxSubs2.default],
  props: props,
  methods: methods,
  watch: watch,
  render: function render(h) {
    return h();
  },
  data: function data() {
    return {
      currentZoom: this.zoom,
      currentCenter: this.center.slice(),
      currentRotation: this.rotation
    };
  },
  created: function created() {
    createView.call(this);
  },
  mounted: function mounted() {
    this.mountView();
  },
  destroyed: function destroyed() {
    this.unmountView();
    this.view = undefined;
  }
};

/**
 * @return {ol.View}
 */

function createView() {
  /**
   * @type {ol.View}
   * @protected
   */
  this.view = new _openlayers2.default.View({
    center: _openlayers2.default.proj.fromLonLat(this.currentCenter, this.projection),
    zoom: this.currentZoom,
    maxZoom: this.maxZoom,
    minZoom: this.minZoom,
    projection: this.projection
  });
  this.view.$vm = this;

  return this.view;
}

/**
 * Subscribe to OpenLayers significant events
 */
function subscribeToViewChanges() {
  var _this2 = this;

  var viewChanges = _Observable.Observable.fromOlEvent(this.view, 'change').throttleTime(300).map(function () {
    var center = _openlayers2.default.proj.toLonLat(_this2.view.getCenter(), _this2.projection);
    var zoom = Math.ceil(_this2.view.getZoom());
    var rotation = _this2.view.getRotation();

    return { center: center, zoom: zoom, rotation: rotation };
  }).distinctUntilChanged(function (a, b) {
    return (0, _isEqual3.default)(a, b);
  });

  this.rxSubs.viewChanges = viewChanges.subscribe(function (_ref2) {
    var center = _ref2.center,
        zoom = _ref2.zoom,
        rotation = _ref2.rotation;

    _this2.currentCenter = center;
    _this2.currentZoom = zoom;
    _this2.currentRotation = rotation;
    _this2.$emit('change', { center: center, zoom: zoom, rotation: rotation });
  }, _debug.errordbg);
}

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xyzBase = __webpack_require__(47);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

var _func = __webpack_require__(76);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  url: {
    type: String,
    default: 'https://{a-c}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}{tileNameSuffix}.{tileFormat}?access_token={accessToken}'
  },
  accessToken: {
    type: String,
    required: true
  },
  mapId: {
    type: String,
    required: true
  },
  attributions: {
    type: String,
    default: '© <a href="https://www.mapbox.com/">MapBox</a>, ' + new Date().getFullYear()
  },
  tileFormat: {
    type: String,
    default: 'png'
  }
};

var computed = {
  tileNameSuffix: function tileNameSuffix() {
    return _tileNameSuffix(this.tilePixelRatio);
  },
  urlTokens: function urlTokens() {
    return ['mapId', 'accessToken', 'tileNameSuffix', 'tileFormat'];
  }
};

exports.default = {
  name: 'vl-source-mapbox',
  mixins: [_xyzBase2.default],
  props: props,
  computed: computed
};

/**
 * @param {number} [ratio]
 * @returns {number}
 * @private
 */

function tileRatio(ratio) {
  ratio = (0, _func.coalesce)(ratio, 1);

  return ratio > 1 ? 2 : 1;
}

/**
 * @param {number} [ratio]
 * @returns {string}
 * @private
 */
function _tileNameSuffix(ratio) {
  ratio = tileRatio(ratio);

  return ratio > 1 ? ['@', ratio, 'x'].join('') : '';
}

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _xyzBase = __webpack_require__(47);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  attributions: {
    type: String,
    default: _openlayers2.default.source.OSM.ATTRIBUTION.getHTML()
  },
  url: {
    type: String,
    default: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  maxZoom: {
    type: Number,
    default: 19
  }
};

var methods = {
  createSource: function createSource() {
    return new _openlayers2.default.source.OSM({
      url: this.url,
      attributions: this.attributions,
      crossOrigin: this.crossOrigin,
      maxZoom: this.maxZoom
    });
  }
};

exports.default = {
  name: 'vl-source-osm',
  mixins: [_xyzBase2.default],
  props: props,
  methods: methods
};

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vectorBase = __webpack_require__(126);

var _vectorBase2 = _interopRequireDefault(_vectorBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'vl-source-vector',
  mixins: [_vectorBase2.default]
};

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xyzBase = __webpack_require__(47);

var _xyzBase2 = _interopRequireDefault(_xyzBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'vl-source-xyz',
  mixins: [_xyzBase2.default]
};

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _image = __webpack_require__(75);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  radius: {
    type: Number,
    default: 5
  },
  snapToPixel: {
    type: Boolean,
    default: true
  }
};

var methods = {
  /**
   * @return {ol.style.Circle}
   * @protected
   */
  createStyle: function createStyle() {
    return new _openlayers2.default.style.Circle({
      radius: this.radius,
      snapToPixel: this.snapToPixel,
      fill: this.fill,
      stroke: this.stroke
    });
  }
};

var watch = {
  radius: function radius() {
    this.refresh();
  },
  snapToPixel: function snapToPixel() {
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-circle',
  mixins: [_image2.default],
  props: props,
  methods: methods,
  watch: watch,
  provide: function provide() {
    return {
      setFill: setFill.bind(this),
      setStroke: setStroke.bind(this)
    };
  }
};


function setFill(fill) {
  /**
   * @type {ol.style.Fill}
   * @private
   */
  this.fill = fill;
  this.refresh();
}

function setStroke(stroke) {
  /**
   * @type {ol.style.Stroke}
   * @private
   */
  this.stroke = stroke;
  this.refresh();
}

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _debug = __webpack_require__(14);

var _style = __webpack_require__(34);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  zIndex: Number,
  geomType: String
}; //
//
//
//
//
//

/**
 * ol.style.Style wrapper.
 * Acts as an style container that will be injected into "style" slot inside layer or feature components.
 */


var methods = {
  /**
   * @return {ol.style.Style}
   * @protected
   */
  createStyle: function createStyle() {
    return new _openlayers2.default.style.Style({
      zIndex: this.zIndex,
      fill: this.fill,
      stroke: this.stroke,
      image: this.image
    });
  },
  mountStyle: function mountStyle() {
    var currentStyle = this.getStyle() || [];
    if (!Array.isArray(currentStyle)) {
      if (false) {
        (0, _debug.warn)('Current style is not an array, will be replaced with new style array');
      }
      currentStyle = [];
    }

    currentStyle.push({
      style: this.style,
      geomType: this.geomType
    });
    this.setStyle(currentStyle);
  },
  unmountStyle: function unmountStyle() {
    var _this = this;

    var currentStyle = this.getStyle() || [];
    if (!Array.isArray(currentStyle)) {
      if (false) {
        (0, _debug.warn)('Current style is not an array, will be replaced with new style array');
      }
      currentStyle = [];
    }

    currentStyle = currentStyle.filter(function (s) {
      return s.style !== _this.style;
    });
    currentStyle.length || (currentStyle = undefined);
    this.setStyle(currentStyle);
  }
};

var watch = {
  zIndex: function zIndex(value) {
    this.style.setZIndex(value);
  },
  geomType: function geomType() {
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-container',
  mixins: [_style2.default],
  inject: ['setStyle', 'getStyle'],
  props: props,
  methods: methods,
  watch: watch,
  provide: function provide() {
    return {
      setFill: setFill.bind(this),
      setStroke: setStroke.bind(this),
      setImage: setImage.bind(this)
    };
  }
};


function setFill(fill) {
  /**
   * @type {ol.style.Fill}
   * @protected
   */
  this.fill = fill;

  if (this.style) {
    this.style.setFill(this.fill);
    this.refresh();
  }
}

function setStroke(stroke) {
  /**
   * @type {ol.style.Stroke}
   * @protected
   */
  this.stroke = stroke;

  if (this.style) {
    this.style.setStroke(this.stroke);
    this.refresh();
  }
}

function setImage(image) {
  /**
   * @type {ol.style.Image}
   * @protected
   */
  this.image = image;

  if (this.style) {
    this.style.setImage(this.image);
    this.refresh();
  }
}

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _style = __webpack_require__(34);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  color: {
    type: [String, Array],
    default: null
  }
};

var methods = {
  /**
   * @return {ol.style.Fill}
   * @protected
   */
  createStyle: function createStyle() {
    return new _openlayers2.default.style.Fill({
      color: this.color
    });
  },

  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    this.setFill(this.style);
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    this.setFill(undefined);
  }
};

var watch = {
  color: function color(value) {
    this.style.setColor(value);
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-fill',
  mixins: [_style2.default],
  inject: ['setFill'],
  props: props,
  methods: methods,
  watch: watch
};

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _image = __webpack_require__(75);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  src: {
    type: String,
    required: true
  },
  size: Array,
  anchor: {
    type: Array,
    default: function _default() {
      return [0.5, 0.5];
    }
  },
  anchorOrigin: {
    type: String,
    default: 'top-left' // bottom-left, bottom-right, top-left or top-right
  },
  anchorXUnits: {
    type: String,
    default: 'fraction' // pixels, fraction
  },
  anchorYUnits: {
    type: String,
    default: 'fraction' // pixels, fraction
  },
  color: Array,
  crossOrigin: {
    type: String,
    default: 'anonymous'
  },
  offset: {
    type: Array,
    default: function _default() {
      return [0, 0];
    }
  },
  offsetOrigin: {
    type: String,
    default: 'top-left' // bottom-left, bottom-right, top-left or top-right
  },
  opacity: {
    type: Number,
    default: 1
  },
  scale: {
    type: Number,
    default: 1
  },
  snapToPixel: {
    type: Boolean,
    default: true
  },
  rotateWithView: {
    type: Boolean,
    default: false
  },
  rotation: {
    type: Number,
    default: 0
  }
};

var methods = {
  /**
   * @return {ol.style.Icon}
   * @protected
   */
  createStyle: function createStyle() {
    return new _openlayers2.default.style.Icon({
      anchor: this.anchor,
      anchorOrigin: this.anchorOrigin,
      anchorXUnits: this.anchorXUnits,
      anchorYUnits: this.anchorYUnits,
      color: this.color,
      crossOrigin: this.crossOrigin,
      offset: this.offset,
      offsetOrigin: this.offsetOrigin,
      opacity: this.opacity,
      scale: this.scale,
      snapToPixel: this.snapToPixel,
      rotateWithView: this.rotateWithView,
      rotation: this.rotation,
      size: this.size,
      src: this.src
    });
  }
};
// todo other watchers
var watch = {
  src: function src() {
    this.refresh();
  },
  size: function size() {
    this.refresh();
  },
  anchor: function anchor() {
    this.refresh();
  },
  scale: function scale() {
    this.refresh();
  }
};

exports.default = {
  name: 'vl-style-icon',
  mixins: [_image2.default],
  props: props,
  methods: methods,
  watch: watch
};

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _style = __webpack_require__(34);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  color: {
    type: [Array, String],
    default: null
  },
  lineCap: {
    type: String,
    default: 'round' // round, butt, square
  },
  lineJoin: {
    type: String,
    default: 'round' // round, bevel, miter
  },
  lineDash: Array,
  lineDashOffset: Number,
  miterLimit: Number,
  width: {
    type: Number,
    default: 1
  }
};

var methods = {
  /**
   * @return {ol.style.Stroke}
   * @protected
   */
  createStyle: function createStyle() {
    return new _openlayers2.default.style.Stroke({
      color: this.color,
      lineCap: this.lineCap,
      lineJoin: this.lineJoin,
      lineDash: this.lineDash,
      lineDashOffset: this.lineDashOffset,
      miterLimit: this.miterLimit,
      width: this.width
    });
  },

  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    this.setStroke(this.style);
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    this.setStroke(undefined);
  }
};

var watch = {
  color: function color(value) {
    this.style.setColor(value);
    this.refresh();
  },
  lineCap: function lineCap(value) {
    this.style.setLineCap(value);
    this.refresh();
  },
  lineDash: function lineDash(value) {
    this.style.setLineDash(value);
    this.refresh();
  },
  lineJoin: function lineJoin(value) {
    this.style.setLineJoin(value);
    this.refresh();
  },
  width: function width(value) {
    this.style.setWidth(value);
    this.refresh();
  }
  // todo добавить остальный вотчеры

};

exports.default = {
  name: 'vl-style-stroke',
  mixins: [_style2.default],
  inject: ['setStroke'],
  props: props,
  watch: watch,
  methods: methods
};

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/*\nDate: 24 Fev 2015\nAuthor: Pedro Oliveira <kanytu@gmail . com>\n*/\n\n.hljs {\n  color: #a9b7c6;\n  background: #282b2e;\n  display: block;\n  overflow-x: auto;\n  padding: 0.5em;\n}\n\n.hljs-number,\n.hljs-literal,\n.hljs-symbol,\n.hljs-bullet {\n  color: #6897BB;\n}\n\n.hljs-keyword,\n.hljs-selector-tag,\n.hljs-deletion {\n  color: #cc7832;\n}\n\n.hljs-variable,\n.hljs-template-variable,\n.hljs-link {\n  color: #629755;\n}\n\n.hljs-comment,\n.hljs-quote {\n  color: #808080;\n}\n\n.hljs-meta {\n  color: #bbb529;\n}\n\n.hljs-string,\n.hljs-attribute,\n.hljs-addition {\n  color: #6A8759;\n}\n\n.hljs-section,\n.hljs-title,\n.hljs-type {\n  color: #ffc66d;\n}\n\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class {\n  color: #e8bf6a;\n}\n\n.hljs-emphasis {\n  font-style: italic;\n}\n\n.hljs-strong {\n  font-weight: bold;\n}\n", ""]);

// exports


/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 323:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n/* stub style  */\n", ""]);

// exports


/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/**\n * VueLayers SCSS mixins.\n * This part of the VueLayers package.\n */\n.ol-control, .ol-scale-line {\n  position: absolute;\n  padding: 2px;\n}\n.ol-box {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  border-radius: 2px;\n  border: 2px solid #00f;\n}\n.ol-mouse-position {\n  top: 8px;\n  right: 8px;\n  position: absolute;\n}\n.ol-scale-line {\n  background: rgba(0, 60, 136, 0.3);\n  border-radius: 4px;\n  bottom: 8px;\n  left: 8px;\n}\n.ol-scale-line-inner {\n  border: 1px solid #eee;\n  border-top: none;\n  color: #eee;\n  font-size: 10px;\n  text-align: center;\n  margin: 1px;\n  will-change: contents,width;\n}\n.ol-overlay-container {\n  will-change: left,right,top,bottom;\n}\n.ol-unsupported {\n  display: none;\n}\n.ol-viewport .ol-unselectable {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.ol-control {\n  background-color: rgba(255, 255, 255, 0.4);\n  border-radius: 4px;\n}\n.ol-control:hover {\n  background-color: rgba(255, 255, 255, 0.6);\n}\n.ol-zoom {\n  top: .5em;\n  left: .5em;\n}\n.ol-rotate {\n  top: .5em;\n  right: .5em;\n  -webkit-transition: opacity .25s linear,visibility 0s linear;\n  transition: opacity .25s linear,visibility 0s linear;\n}\n.ol-rotate.ol-hidden {\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: opacity .25s linear,visibility 0s linear .25s;\n  transition: opacity .25s linear,visibility 0s linear .25s;\n}\n.ol-zoom-extent {\n  top: 4.643em;\n  left: .5em;\n}\n.ol-full-screen {\n  right: .5em;\n  top: .5em;\n}\n@media print {\n.ol-control {\n    display: none;\n}\n}\n.ol-control button {\n  display: block;\n  margin: 1px;\n  padding: 0;\n  color: #fff;\n  font-size: 1.14em;\n  font-weight: 700;\n  text-decoration: none;\n  text-align: center;\n  height: 1.375em;\n  width: 1.375em;\n  line-height: .4em;\n  background-color: rgba(0, 60, 136, 0.5);\n  border: none;\n  border-radius: 2px;\n}\n.ol-control button::-moz-focus-inner {\n  border: none;\n  padding: 0;\n}\n.ol-zoom-extent button {\n  line-height: 1.4em;\n}\n.ol-compass {\n  display: block;\n  font-weight: 400;\n  font-size: 1.2em;\n  will-change: transform;\n}\n.ol-touch .ol-control button {\n  font-size: 1.5em;\n}\n.ol-touch .ol-zoom-extent {\n  top: 5.5em;\n}\n.ol-control button:focus, .ol-control button:hover {\n  text-decoration: none;\n  background-color: rgba(0, 60, 136, 0.7);\n}\n.ol-zoom .ol-zoom-in {\n  border-radius: 2px 2px 0 0;\n}\n.ol-zoom .ol-zoom-out {\n  border-radius: 0 0 2px 2px;\n}\n.ol-attribution {\n  text-align: right;\n  bottom: .5em;\n  right: .5em;\n  max-width: -webkit-calc(100% - 1.3em);\n  max-width: calc(100% - 1.3em);\n}\n.ol-attribution ul {\n  margin: 0;\n  padding: 0 .5em;\n  font-size: .7rem;\n  line-height: 1.375em;\n  color: #000;\n  text-shadow: 0 0 2px #fff;\n}\n.ol-attribution li {\n  display: inline;\n  list-style: none;\n  line-height: inherit;\n}\n.ol-attribution li:not(:last-child):after {\n  content: \" \";\n}\n.ol-attribution img {\n  max-height: 2em;\n  max-width: inherit;\n  vertical-align: middle;\n}\n.ol-attribution button, .ol-attribution ul {\n  display: inline-block;\n}\n.ol-attribution.ol-collapsed ul {\n  display: none;\n}\n.ol-attribution.ol-logo-only ul {\n  display: block;\n}\n.ol-attribution:not(.ol-collapsed) {\n  background: rgba(255, 255, 255, 0.8);\n}\n.ol-attribution.ol-uncollapsible {\n  bottom: 0;\n  right: 0;\n  border-radius: 4px 0 0;\n  height: 1.1em;\n  line-height: 1em;\n}\n.ol-attribution.ol-logo-only {\n  background: 0 0;\n  bottom: .4em;\n  height: 1.1em;\n  line-height: 1em;\n}\n.ol-attribution.ol-uncollapsible img {\n  margin-top: -.2em;\n  max-height: 1.6em;\n}\n.ol-attribution.ol-logo-only button, .ol-attribution.ol-uncollapsible button {\n  display: none;\n}\n.ol-zoomslider {\n  top: 4.5em;\n  left: .5em;\n  height: 200px;\n}\n.ol-zoomslider button {\n  position: relative;\n  height: 10px;\n}\n.ol-touch .ol-zoomslider {\n  top: 5.5em;\n}\n.ol-overviewmap {\n  left: .5em;\n  bottom: .5em;\n}\n.ol-overviewmap.ol-uncollapsible {\n  bottom: 0;\n  left: 0;\n  border-radius: 0 4px 0 0;\n}\n.ol-overviewmap .ol-overviewmap-map, .ol-overviewmap button {\n  display: inline-block;\n}\n.ol-overviewmap .ol-overviewmap-map {\n  border: 1px solid #7b98bc;\n  height: 150px;\n  margin: 2px;\n  width: 150px;\n}\n.ol-overviewmap:not(.ol-collapsed) button {\n  bottom: 1px;\n  left: 2px;\n  position: absolute;\n}\n.ol-overviewmap.ol-collapsed .ol-overviewmap-map, .ol-overviewmap.ol-uncollapsible button {\n  display: none;\n}\n.ol-overviewmap:not(.ol-collapsed) {\n  background: rgba(255, 255, 255, 0.8);\n}\n.ol-overviewmap-box {\n  border: 2px dotted rgba(0, 60, 136, 0.7);\n}\n.vl-map, .vl-map .map {\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.i(__webpack_require__(315), "");

// module
exports.push([module.i, "\nhtml, body, #app {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-family: Helvetica, Arial, sans-serif;\n  overflow: hidden;\n}\nhtml *, body *, #app * {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.controls {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n      -ms-transform: translateX(-50%);\n          transform: translateX(-50%);\n  width: 70vw;\n  background: rgba(255, 255, 255, 0.7);\n  -webkit-box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);\n          box-shadow: 0 0 20px rgba(2, 2, 2, 0.1);\n  padding: 5px;\n  text-align: center;\n}\n.controls > button {\n    margin: 5px;\n    text-transform: uppercase;\n}\n#source-code {\n  overflow: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  padding: 20px;\n  background: #ffffff;\n}\n#source-code .controls {\n    position: relative;\n}\n.slide-enter, .slide-leave-to {\n  -webkit-transform: translateY(100%);\n      -ms-transform: translateY(100%);\n          transform: translateY(100%);\n}\n.slide-enter-active, .slide-leave-active {\n  -webkit-transition: all .3s ease-out;\n  transition: all .3s ease-out;\n}\n", ""]);

// exports


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n/* stub styles */\n", ""]);

// exports


/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */\n", ""]);

// exports


/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */\n", ""]);

// exports


/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub styles */", ""]);

// exports


/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* stub style  */", ""]);

// exports


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Basic style mixin.
 * Exposes for children inner OpenLayer style object as styleTarget.
 * Injects styleTarget from parent to apply self style.
 */

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.style.Style|ol.style.Image|ol.style.Fill|ol.style.Stroke|ol.style.Text}
     * @protected
     */
    this.style = this.createStyle();
    this.style.$vm = this;
  },

  /**
   * @return {ol.style.Style|ol.style.Image|ol.style.Fill|ol.style.Stroke|ol.style.Text}
   * @protected
   */
  createStyle: function createStyle() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    throw new Error('Not implemented method');
  },
  refresh: function refresh() {
    this.$nextTick(this.mountStyle);
  }
};

exports.default = {
  methods: methods,
  render: function render(h) {
    return h();
  },
  mounted: function mounted() {
    // Create style in  mounted hook because of some ol style classes doesn't have
    // setters for all inner objects. This setters are emulated through method: getStyleTarget
    this.initialize();
    this.mountStyle();
  },
  destroyed: function destroyed() {
    this.unmountStyle();
    this.style = undefined;
  }
};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kebabCase2 = __webpack_require__(193);

var _kebabCase3 = _interopRequireDefault(_kebabCase2);

var _isFunction2 = __webpack_require__(111);

var _isFunction3 = _interopRequireDefault(_isFunction2);

exports.createStyleFunc = createStyleFunc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  provide: function provide() {
    return {
      setStyle: this.setStyle.bind(this),
      getStyle: this.getStyle.bind(this)
    };
  },
  beforeCreate: function beforeCreate() {
    this.styles = [];
  },

  methods: {
    styleTarget: function styleTarget() {},
    setStyle: function setStyle(style) {
      this.styles = style;
      var styleTarget = this.styleTarget();

      if (styleTarget) {
        if (this.styles && this.styles.length) {
          styleTarget.setStyle((0, _isFunction3.default)(this.styles) ? this.styles : createStyleFunc(this));
        } else {
          styleTarget.setStyle(undefined);
        }
        this.refresh();
      }
    },
    getStyle: function getStyle() {
      return this.styles || [];
    }
  }
};
// todo implement removed, aka null style

function createStyleFunc(styleTarget) {
  return function __styleTargetStyleFunc(feature, resolution) {
    if (!styleTarget.styles || !styleTarget.styles.length) return null;

    var plainFeature = feature.$vm ? feature.$vm.plain() : feature.getProperties();
    if (!plainFeature.geometry) return null;

    var styles = [];
    styleTarget.styles.forEach(function (_ref) {
      var style = _ref.style,
          geomType = _ref.geomType;

      if (geomType == null || plainFeature.geometry.type === geomType || (0, _kebabCase3.default)(feature.geometry.type) === geomType) {
        styles.push(style);
      }
    });

    return styles;
  };
}

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

var _tileBase = __webpack_require__(125);

var _tileBase2 = _interopRequireDefault(_tileBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {
  createSource: function createSource() {
    return new _openlayers2.default.source.XYZ({
      attributions: this.attributions,
      tileUrlFunction: this.createTileUrlFunction(),
      crossOrigin: this.crossOrigin,
      projection: this.projection,
      tileGrid: this.createTileGrid(),
      tilePixelRatio: this.tilePixelRatio,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      wrapX: this.wrapX,
      opaque: this.opaque,
      cacheSize: this.cacheSize
    });
  }
};

exports.default = {
  mixins: [_tileBase2.default],
  methods: methods
};

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GEOMETRY_TYPE = exports.WGS84_SPHERE = exports.EARTH_RADIUS = exports.PIXEL_RATIO = exports.CACHE_SIZE = exports.ZOOM_FACTOR = exports.TILE_SIZE = exports.MIN_ZOOM = exports.MAX_ZOOM = exports.DATA_PROJECTION = exports.MAP_PROJECTION = undefined;

var _openlayers = __webpack_require__(0);

var _openlayers2 = _interopRequireDefault(_openlayers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @type {string} Default map projection.
 */
var MAP_PROJECTION = exports.MAP_PROJECTION = 'EPSG:3857';
/**
 * @type {string} Default data source projection.
 */
var DATA_PROJECTION = exports.DATA_PROJECTION = 'EPSG:4326';
/**
 * @type {number} Default map max zoom
 */
var MAX_ZOOM = exports.MAX_ZOOM = 28;
/**
 * @type {number} Default map min zoom
 */
var MIN_ZOOM = exports.MIN_ZOOM = 0;
/**
 * @type {number} Default tile size
 */
var TILE_SIZE = exports.TILE_SIZE = 256;
/**
 * @type {number} Default zoom factor
 */
var ZOOM_FACTOR = exports.ZOOM_FACTOR = 2;
/**
 * @type {number}
 */
var CACHE_SIZE = exports.CACHE_SIZE = 2048;
/**
 * @type {number}
 */
var PIXEL_RATIO = exports.PIXEL_RATIO = 1;
/**
 * @type {number} Earth radius in meters
 */
var EARTH_RADIUS = exports.EARTH_RADIUS = 6378137;
var WGS84_SPHERE = exports.WGS84_SPHERE = new _openlayers2.default.Sphere(EARTH_RADIUS);

var GEOMETRY_TYPE = exports.GEOMETRY_TYPE = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
};

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromOlEvent = undefined;

var _fromOlEvent2 = __webpack_require__(246);

var _fromOlEvent3 = _interopRequireDefault(_fromOlEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fromOlEvent = _fromOlEvent3.default; /**
                                              * RxJS extensions.
                                              */

/***/ }),

/***/ 507:
/***/ (function(module, exports) {

module.exports = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"id": "pacman",
			"properties": {},
			"geometry": {
				"coordinates": [
					[
						[
							-119.36662387471965,
							-41.695909853775774
						],
						[
							-127.94244,
							-37.751311
						],
						[
							-138.66337,
							-37.037351
						],
						[
							-147.824999,
							-37.961188
						],
						[
							-154.42546725056079,
							-40.34752707396435
						],
						[
							-159.497091,
							-43.766705
						],
						[
							-164.94328590931863,
							-49.79123584867231
						],
						[
							-165.97818669927116,
							-55.507654307259564
						],
						[
							-164.15987129417792,
							-60.58607221239511
						],
						[
							-156.88931007683288,
							-64.26307739454326
						],
						[
							-146.38011953841647,
							-66.57958701677654
						],
						[
							-135.870929,
							-66.923693
						],
						[
							-124.077324,
							-66.15905
						],
						[
							-116.42965,
							-63.550593
						],
						[
							-139.881975,
							-55.500884
						],
						[
							-129.021801,
							-48.849505
						],
						[
							-119.36662387471965,
							-41.695909853775774
						]
					]
				],
				"type": "Polygon"
			}
		},
		{
			"type": "Feature",
			"id": "pacman-path",
			"properties": {},
			"geometry": {
				"coordinates": [
					[
						-106.86705950421077,
						-55.7032908486452
					],
					[
						-63.16248861520228,
						-55.65897331453094
					],
					[
						-20.008155129472726,
						-55.078263423967456
					],
					[
						22.281519579649057,
						-55.570187523502014
					],
					[
						56.710659956242125,
						-55.61460554958341
					],
					[
						86.26626904665073,
						-55.34734242173761
					],
					[
						115.30780244306703,
						-55.4812005671803
					],
					[
						139.7540642173147,
						-55.347342421737906
					],
					[
						167.03011835128234,
						-55.302622197467514
					],
					[
						176.9343916103021,
						-55.257851502422156
					]
				],
				"type": "LineString"
			}
		},
		{
			"type": "Feature",
			"id": "pacman-eye",
			"properties": {},
			"geometry": {
				"coordinates": [
					-147.3604640117643,
					-49.28908175281041
				],
				"type": "Point"
			}
		}
	]
};

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(746)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(248),
  /* template */
  __webpack_require__(723),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/feature/feature.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] feature.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e8970bb8", Component.options)
  } else {
    hotAPI.reload("data-v-e8970bb8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(733)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(249),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geoloc/geoloc.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-331d2e16", Component.options)
  } else {
    hotAPI.reload("data-v-331d2e16", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(732)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(250),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/line-string/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2fa219ca", Component.options)
  } else {
    hotAPI.reload("data-v-2fa219ca", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(726)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(251),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/multi-line-string/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0dfe7ca2", Component.options)
  } else {
    hotAPI.reload("data-v-0dfe7ca2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(724)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(252),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/multi-point/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05891369", Component.options)
  } else {
    hotAPI.reload("data-v-05891369", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(742)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(253),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/multi-polygon/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71976d7f", Component.options)
  } else {
    hotAPI.reload("data-v-71976d7f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(744)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(254),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/point/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c387456", Component.options)
  } else {
    hotAPI.reload("data-v-8c387456", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 705:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(743)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(255),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/geom/polygon/geom.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a0f34eb", Component.options)
  } else {
    hotAPI.reload("data-v-7a0f34eb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(731)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(256),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/interaction/select/select.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24ec578e", Component.options)
  } else {
    hotAPI.reload("data-v-24ec578e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(729)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(257),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/layer/tile/layer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20415277", Component.options)
  } else {
    hotAPI.reload("data-v-20415277", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(737)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(258),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/layer/vector/layer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53ea49e8", Component.options)
  } else {
    hotAPI.reload("data-v-53ea49e8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(739)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(259),
  /* template */
  __webpack_require__(721),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/map/map.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] map.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61f65070", Component.options)
  } else {
    hotAPI.reload("data-v-61f65070", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(728)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(260),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/map/view.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c0edbc1", Component.options)
  } else {
    hotAPI.reload("data-v-1c0edbc1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(736)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(261),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/mapbox/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e3aff90", Component.options)
  } else {
    hotAPI.reload("data-v-4e3aff90", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 712:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(730)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(262),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/osm/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-23ecb9dc", Component.options)
  } else {
    hotAPI.reload("data-v-23ecb9dc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 713:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(741)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(263),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/vector/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6475a688", Component.options)
  } else {
    hotAPI.reload("data-v-6475a688", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 714:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(727)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(264),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/source/xyz/source.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0fd05d4c", Component.options)
  } else {
    hotAPI.reload("data-v-0fd05d4c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 715:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(734)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(265),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/circle/circle.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33dfe2d8", Component.options)
  } else {
    hotAPI.reload("data-v-33dfe2d8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 716:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(738)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(266),
  /* template */
  __webpack_require__(720),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/container/container.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] container.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5417799c", Component.options)
  } else {
    hotAPI.reload("data-v-5417799c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 717:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(725)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(267),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/fill/fill.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b5ed210", Component.options)
  } else {
    hotAPI.reload("data-v-0b5ed210", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(735)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(268),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/icon/icon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e69a0b8", Component.options)
  } else {
    hotAPI.reload("data-v-3e69a0b8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 719:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(745)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(269),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/ghetto/projects/vuelayers/src/components/style/stroke/stroke.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-977b0450", Component.options)
  } else {
    hotAPI.reload("data-v-977b0450", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 720:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticStyle: {
      "display": "none !important"
    }
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5417799c", module.exports)
  }
}

/***/ }),

/***/ 721:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vl-map"
  }, [_c('div', {
    ref: "map",
    staticClass: "map",
    attrs: {
      "tabindex": _vm.tabIndex
    }
  }), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-61f65070", module.exports)
  }
}

/***/ }),

/***/ 722:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('vl-map', [_c('vl-map-view', {
    attrs: {
      "center": _vm.center,
      "zoom": _vm.zoom,
      "rotation": _vm.rotation
    },
    on: {
      "change": _vm.updateMapView
    }
  }), _vm._v(" "), _c('vl-geoloc', {
    on: {
      "change": _vm.updateGeoloc
    }
  }), _vm._v(" "), _c('vl-interaction-select', {
    ref: "select",
    attrs: {
      "selected": _vm.selected
    },
    on: {
      "select": _vm.select,
      "unselect": _vm.unselect
    }
  }, [_c('vl-style-container', [_c('vl-style-stroke', {
    attrs: {
      "color": "#f03b20",
      "width": 3
    }
  }), _vm._v(" "), _c('vl-style-fill', {
    attrs: {
      "color": [254, 178, 76, 0.7]
    }
  })], 1)], 1), _vm._v(" "), _c('vl-layer-tile', {
    attrs: {
      "id": "osm",
      "visible": _vm.layers.osm
    }
  }, [_c('vl-source-osm')], 1), _vm._v(" "), _c('vl-layer-tile', {
    attrs: {
      "id": "mapbox",
      "visible": _vm.layers.mapbox
    }
  }, [_c('vl-source-mapbox', {
    attrs: {
      "map-id": "ghettovoice.nbm2olb0",
      "access-token": "pk.eyJ1IjoiZ2hldHRvdm9pY2UiLCJhIjoiMzMxYzMyMWQ3NTgzMTU4Nzk3ZTNmMmI3MmQ1NmVhMjgifQ._erAEzdvdB0jfYXXqzOJCg"
    }
  })], 1), _vm._v(" "), (_vm.countries.length) ? _c('vl-layer-vector', {
    attrs: {
      "id": "countries",
      "visible": _vm.layers.countries
    }
  }, [_c('vl-style-container', [_c('vl-style-stroke', {
    attrs: {
      "color": "#8856a7",
      "width": 2
    }
  }), _vm._v(" "), _c('vl-style-fill', {
    attrs: {
      "color": [158, 188, 218, 0.5]
    }
  })], 1), _vm._v(" "), _c('vl-source-vector', _vm._l((_vm.countries), function(feature) {
    return _c('vl-feature', {
      key: feature.id,
      attrs: {
        "id": feature.id,
        "data": feature.properties
      }
    }, [_c(_vm.geometryTypeToCompName(feature.geometry.type), {
      tag: "component",
      attrs: {
        "coordinates": feature.geometry.coordinates
      }
    }), _vm._v(" "), (feature.properties.color && !_vm.selected.includes(feature.id)) ? _c('vl-style-container', [_c('vl-style-stroke', {
      attrs: {
        "color": "#8856a7",
        "width": 2
      }
    }), _vm._v(" "), _c('vl-style-fill', {
      attrs: {
        "color": feature.properties.color
      }
    })], 1) : _vm._e(), _vm._v(" "), (_vm.selected.includes(feature.id) && feature.properties.selectColor) ? _c('vl-style-container', [_c('vl-style-stroke', {
      attrs: {
        "color": "#8856a7",
        "width": 2
      }
    }), _vm._v(" "), _c('vl-style-fill', {
      attrs: {
        "color": feature.properties.selectColor
      }
    })], 1) : _vm._e()], 1)
  }))], 1) : _vm._e(), _vm._v(" "), (_vm.pacman.length) ? _c('vl-layer-vector', {
    directives: [{
      name: "style-func",
      rawName: "v-style-func",
      value: (_vm.pacmanStyleFunc),
      expression: "pacmanStyleFunc"
    }],
    attrs: {
      "id": "pacman",
      "visible": _vm.layers.pacman
    }
  }, [_c('vl-source-vector', _vm._l((_vm.pacman), function(feature) {
    return _c('vl-feature', {
      key: feature.id,
      attrs: {
        "id": feature.id,
        "data": feature.properties
      }
    }, [_c(_vm.geometryTypeToCompName(feature.geometry.type), {
      tag: "component",
      attrs: {
        "coordinates": feature.geometry.coordinates
      }
    })], 1)
  }))], 1) : _vm._e(), _vm._v(" "), (_vm.position.length) ? _c('vl-layer-vector', {
    attrs: {
      "id": "my-position",
      "z-index": 100
    }
  }, [_c('vl-style-container', [_c('vl-style-icon', {
    attrs: {
      "src": "static/img/marker.png",
      "scale": 0.3,
      "anchor": [0.5, 1]
    }
  })], 1), _vm._v(" "), _c('vl-source-vector', [_c('vl-feature', {
    attrs: {
      "id": "my-position"
    }
  }, [_c('vl-geom-point', {
    attrs: {
      "coordinates": _vm.position
    }
  })], 1)], 1)], 1) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "controls"
  }, [_vm._l((['osm', 'mapbox', 'countries', 'pacman']), function(layer) {
    return _c('button', {
      key: layer,
      on: {
        "click": function($event) {
          _vm.toggleLayer(layer)
        }
      }
    }, [_vm._v("\n        Toggle layer " + _vm._s(layer) + "\n      ")])
  }), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.showSourceCode
    }
  }, [_vm._v("Show source code")]), _vm._v(" "), _c('hr'), _vm._v("\n      Center: " + _vm._s(_vm.center.map(function (x) { return parseFloat(x.toPrecision(6)); })) + " Zoom: " + _vm._s(_vm.zoom) + " Rotation " + _vm._s(_vm.rotation)), _c('br'), _vm._v("\n      My position: " + _vm._s(_vm.position.map(function (x) { return parseFloat(x.toPrecision(6)); }))), _c('br'), _vm._v("\n      Current selection: " + _vm._s(_vm.selected) + "\n    ")], 2), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide"
    }
  }, [(_vm.sourceCode) ? _c('div', {
    ref: "sourceCode",
    attrs: {
      "id": "source-code"
    }
  }, [_c('div', {
    staticClass: "controls"
  }, [_c('button', {
    on: {
      "click": function($event) {
        _vm.sourceCode = false
      }
    }
  }, [_vm._v("Close")])]), _vm._v(" "), _c('div', [_c('h1', [_vm._v("HTML")]), _vm._v(" "), _c('pre', [_vm._v("\n            "), _c('code', {
    staticClass: "xml"
  }, [_vm._v("\n<vl-map>\n  <vl-map-view :center=\"center\" :zoom=\"zoom\" :rotation=\"rotation\" @change=\"updateMapView\"/>\n  <vl-geoloc @change=\"updateGeoloc\"/>\n\n  <!-- interactions -->\n  <vl-interaction-select ref=\"select\" :selected=\"selected\" @select=\"select\" @unselect=\"unselect\">\n    <vl-style-container>\n      <vl-style-stroke color=\"#f03b20\" :width=\"3\"/>\n      <vl-style-fill :color=\"[254, 178, 76, 0.7]\"/>\n    </vl-style-container>\n  </vl-interaction-select>\n  <!-- interactions -->\n\n  <!-- base layers -->\n  <vl-layer-tile id=\"osm\" :visible=\"layers.osm\">\n    <vl-source-osm/>\n  </vl-layer-tile>\n\n  <vl-layer-tile id=\"mapbox\" :visible=\"layers.mapbox\">\n    <vl-source-mapbox map-id=\"ghettovoice.nbm2olb0\"\n                      access-token=\"pk.eyJ1IjoiZ2hldHRvdm9pY2UiLCJhIjoiMzMxYzMyMWQ3NTgzMTU4Nzk3ZTNmMmI3MmQ1NmVhMjgifQ._erAEzdvdB0jfYXXqzOJCg\"/>\n  </vl-layer-tile>\n  <!-- base layers -->\n\n  <!-- countries vector -->\n  <vl-layer-vector id=\"countries\" v-if=\"countries.length\" :visible=\"layers.countries\">\n    <!-- layer level style -->\n    <vl-style-container>\n      <vl-style-stroke color=\"#8856a7\" :width=\"2\"/>\n      <vl-style-fill :color=\"[158, 188, 218, 0.5]\"/>\n    </vl-style-container>\n    <!-- layer level style -->\n\n    <vl-source-vector>\n      <vl-feature v-for=\"feature in countries\" :key=\"feature.id\" :id=\"feature.id\" :data=\"feature.properties\">\n        <component :is=\"geometryTypeToCompName(feature.geometry.type)\" :coordinates=\"feature.geometry.coordinates\"/>\n\n        <!-- feature level style -->\n        <vl-style-container v-if=\"feature.properties.color && !selected.includes(feature.id)\">\n          <vl-style-stroke color=\"#8856a7\" :width=\"2\"/>\n          <vl-style-fill :color=\"feature.properties.color\"/>\n        </vl-style-container>\n\n        <vl-style-container v-if=\"selected.includes(feature.id) && feature.properties.selectColor\">\n          <vl-style-stroke color=\"#8856a7\" :width=\"2\"/>\n          <vl-style-fill :color=\"feature.properties.selectColor\"/>\n        </vl-style-container>\n        <!-- feature level style -->\n      </vl-feature>\n    </vl-source-vector>\n  </vl-layer-vector>\n  <!-- countries vector -->\n\n  <!-- pacman, use v-style-func for advanced styling -->\n  <vl-layer-vector id=\"pacman\" v-if=\"pacman.length\" v-style-func=\"pacmanStyleFunc\" :visible=\"layers.pacman\">\n    <vl-source-vector>\n      <vl-feature v-for=\"feature in pacman\" :key=\"feature.id\" :id=\"feature.id\" :data=\"feature.properties\">\n        <component :is=\"geometryTypeToCompName(feature.geometry.type)\" :coordinates=\"feature.geometry.coordinates\"/>\n      </vl-feature>\n    </vl-source-vector>\n  </vl-layer-vector>\n  <!-- pacman -->\n\n  <!-- position -->\n  <vl-layer-vector v-if=\"position.length\" id=\"my-position\" :z-index=\"100\">\n    <vl-style-container>\n      <vl-style-icon src=\"/static/marker.png\" :scale=\"0.3\" :anchor=\"[0.5, 1]\"/>\n    </vl-style-container>\n\n    <vl-source-vector>\n      <vl-feature id=\"my-position\">\n        <vl-geom-point :coordinates=\"position\"/>\n      </vl-feature>\n    </vl-source-vector>\n  </vl-layer-vector>\n  <!-- position -->\n</vl-map>\n            ")]), _vm._v("\n          ")])]), _vm._v(" "), _c('div', [_c('h1', [_vm._v("JavaScript")]), _vm._v(" "), _c('pre', [_vm._v("\n            "), _c('code', {
    staticClass: "javascript"
  }, [_vm._v("\nimport 'whatwg-fetch'\nimport { kebabCase } from 'lodash/fp'\n\nconst methods = {\n  geometryTypeToCompName (type) {\n    return 'vl-geom-' + kebabCase(type)\n  },\n  updateMapView ({ center, zoom, rotation }) {\n    this.center = center\n    this.zoom = zoom\n    this.rotation = rotation\n  },\n  updateGeoloc ({ position }) {\n    this.position = position\n  },\n  select (id) {\n    if (this.selected.indexOf(id) === -1) {\n      this.selected.push(id)\n    }\n  },\n  unselect (id) {\n    const i = this.selected.indexOf(id)\n    if (i !== -1) {\n      this.selected.splice(i, 1)\n    }\n  },\n  async loadData () {\n    const res = await fetch('https://openlayers.org/en/latest/examples/data/geojson/countries.geojson')\n    const geomCollection = await res.json()\n    this.countries = geomCollection.features.map((feature, i) => {\n      feature.properties = {\n        ...feature.properties,\n        color: i % 2 === 0 ? [ 49, 163, 84, 0.7 ] : undefined,\n        selectColor: i % 2 !== 0 ? [ 221, 28, 119, 0.9 ] : undefined\n      }\n\n      return feature\n    })\n\n    return this.countries\n  },\n  /**\n   * Style function factory, use with v-style-func directive to apply complex stylings with OpenLayers native API.\n   */\n  pacmanStyleFunc (ol, styleHelper) {\n    const pacman = [\n      new ol.style.Style({\n        stroke: new ol.style.Stroke({\n          color: '#DE9147',\n          width: 3\n        }),\n        fill: new ol.style.Fill({\n          color: [ 222, 189, 36, 0.8 ]\n        })\n      })\n    ]\n    const path = [\n      new ol.style.Style({\n        stroke: new ol.style.Stroke({\n          color: 'blue',\n          width: 1\n        })\n      }),\n      new ol.style.Style({\n        image: new ol.style.Circle({\n          radius: 5,\n          fill: new ol.style.Fill({\n            color: 'orange'\n          })\n        }),\n        geometry (feature) {\n          return new ol.geom.MultiPoint(feature.getGeometry().getCoordinates())\n        }\n      })\n    ]\n    const eye = [\n      new ol.style.Style({\n        image: new ol.style.Circle({\n          radius: 6,\n          fill: new ol.style.Fill({\n            color: '#444444'\n          })\n        })\n      })\n    ]\n\n    return function __pacmanStyleFunc (feature, resolution) {\n      switch (feature.getId()) {\n        case 'pacman':\n          return pacman\n        case 'pacman-path':\n          return path\n        case 'pacman-eye':\n          return eye\n      }\n    }\n  },\n  toggleLayer (layer) {\n    this.layers[ layer ] = !this.layers[ layer ]\n  }\n}\n\nexport default {\n  name: 'app',\n  methods,\n  data () {\n    return {\n      zoom: 2,\n      center: [ 0, 0 ],\n      rotation: 0,\n      selected: [],\n      countries: [],\n      pacman: require('../static/pacman.geojson').features,\n      position: [],\n      layers: {\n        osm: false,\n        mapbox: true,\n        countries: true,\n        pacman: false\n      }\n    }\n  },\n  created () {\n    this.loadData()\n      .catch(::console.error)\n  }\n}\n            ")]), _vm._v("\n          ")])]), _vm._v(" "), _c('div', {
    staticClass: "controls"
  }, [_c('button', {
    on: {
      "click": function($event) {
        _vm.sourceCode = false
      }
    }
  }, [_vm._v("Close")])])]) : _vm._e()])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6474fc42", module.exports)
  }
}

/***/ }),

/***/ 723:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('i', {
    staticStyle: {
      "display": "none !important"
    }
  }, [_vm._t("default", null, {
    feature: _vm.plain
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e8970bb8", module.exports)
  }
}

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(316);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("95557bf0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-05891369\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-05891369\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(317);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("72f86146", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0b5ed210\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fill.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0b5ed210\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fill.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 726:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(318);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6acaa13a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0dfe7ca2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0dfe7ca2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 727:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(319);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e97d7558", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0fd05d4c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-0fd05d4c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 728:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(320);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("5fd7e5e8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-1c0edbc1\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-1c0edbc1\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 729:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(321);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("d477d128", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-20415277\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-20415277\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = __webpack_require__(210);

var _v2 = _interopRequireDefault(_v);

var _rxSubs = __webpack_require__(22);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  id: {
    type: [String, Number],
    default: function _default() {
      return (0, _v2.default)();
    }
  },
  opacity: {
    type: Number,
    default: 1
  },
  minResolution: Number,
  maxResolution: Number,
  visible: {
    type: Boolean,
    default: true
  },
  extent: {
    type: Array,
    validator: function validator(value) {
      return value.length === 4;
    }
  },
  zIndex: {
    type: Number,
    default: 0
  }
};

var methods = {
  /**
   * Updates layer state
   */
  refresh: function refresh() {
    this.layer && this.layer.changed();
  },
  initialize: function initialize() {
    /**
     * @type {ol.layer.Layer}
     * @protected
     */
    this.layer = this.createLayer();
    this.layer.$vm = this;
    this.layer.set('id', this.id);
  },

  /**
   * @return {ol.layer.Layer}
   * @protected
   */
  createLayer: function createLayer() {
    throw new Error('Not implemented method');
  },

  /**
   * @protected
   */
  mountLayer: function mountLayer() {
    if (this.map()) {
      this.map().addLayer(this.layer);
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of map component, should have layer component among it's ancestors");
    }
  },

  /**
   * @protected
   */
  unmountLayer: function unmountLayer() {
    this.unsubscribeAll();
    this.map() && this.map().removeLayer(this.layer);
  }
};

var watch = {
  maxResolution: function maxResolution(value) {
    this.layer.setMaxResolution(value);
  },
  minResolution: function minResolution(value) {
    this.layer.setMinResolution(value);
  },
  opacity: function opacity(value) {
    this.layer.setOpacity(value);
  },
  visible: function visible(value) {
    this.layer.setVisible(value);
  },
  zIndex: function zIndex(value) {
    this.layer.setZIndex(value);
  }
};

exports.default = {
  mixins: [_rxSubs2.default],
  inject: ['map'],
  props: props,
  methods: methods,
  watch: watch,
  provide: function provide() {
    var _this = this;

    return {
      layer: function layer() {
        return _this.layer;
      }
    };
  },
  render: function render(h) {
    return h('i', {
      style: {
        display: 'none !important'
      }
    }, this.$slots.default);
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.mountLayer();
  },
  destroyed: function destroyed() {
    this.unmountLayer();
    this.layer = undefined;
  }
};

/***/ }),

/***/ 730:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(322);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("7dbf7e02", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-23ecb9dc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-23ecb9dc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 731:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(323);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("578da678", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-24ec578e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./select.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-24ec578e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./select.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 732:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(324);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("184cafc8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-2fa219ca\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-2fa219ca\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(325);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("0f4c7116", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-331d2e16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geoloc.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-331d2e16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geoloc.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(326);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e6d10d88", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-33dfe2d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./circle.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-33dfe2d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./circle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(327);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("b0150148", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3e69a0b8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-3e69a0b8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./icon.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(328);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e7feb404", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4e3aff90\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4e3aff90\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 737:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(329);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("ef88f934", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-53ea49e8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-53ea49e8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./layer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 738:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(330);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("f6818f96", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5417799c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./container.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-5417799c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./container.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 739:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(331);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2962a994", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-61f65070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./map.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-61f65070\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./map.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxSubs = __webpack_require__(22);

var _rxSubs2 = _interopRequireDefault(_rxSubs);

var _vlOl = __webpack_require__(8);

var _debug = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var props = {
  attributions: String,
  url: String,
  projection: {
    type: String,
    default: _vlOl.consts.MAP_PROJECTION
  },
  wrapX: {
    type: Boolean,
    default: true
  },
  logo: String
};

var methods = {
  /**
   * @protected
   */
  initialize: function initialize() {
    /**
     * @type {ol.source.Source}
     * @protected
     */
    this.source = this.createSource();
    this.source.$vm = this;
  },

  /**
   * @return {ol.source.Source}
   * @protected
   */
  createSource: function createSource() {
    throw new Error('Not implemented method');
  },
  mountSource: function mountSource() {
    if (this.layer()) {
      this.layer().setSource(this.source);
      this.subscribeAll();
    } else if (false) {
      (0, _debug.warn)("Invalid usage of source component, should have layer component among it's ancestors");
    }
  },
  unmountSource: function unmountSource() {
    this.unsubscribeAll();
    this.layer() && this.layer().setSource(undefined);
  },
  refresh: function refresh() {
    this.source && this.source.changed();
  }
};

var watch = {
  attributions: function attributions(value) {
    this.source.setAttributions(value);
  },
  projection: function projection(value) {
    // todo recreate source?
  }
};

exports.default = {
  mixins: [_rxSubs2.default],
  inject: ['layer'],
  props: props,
  methods: methods,
  watch: watch,
  provide: function provide() {
    var _this = this;

    return {
      source: function source() {
        return _this.source;
      }
    };
  },
  render: function render(h) {
    return h('i', {
      style: {
        display: 'none !important'
      }
    }, this.$slots.default);
  },
  created: function created() {
    this.initialize();
  },
  mounted: function mounted() {
    this.mountSource();
  },
  destroyed: function destroyed() {
    this.unmountSource();
    this.source = undefined;
  }
};

/***/ }),

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(332);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("253b3b38", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6474fc42\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6474fc42\",\"scoped\":false,\"hasInlineConfig\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 741:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(333);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("afb040ba", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6475a688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-6475a688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./source.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 742:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(334);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("714b867e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-71976d7f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-71976d7f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(335);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("7d2fc415", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7a0f34eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7a0f34eb\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(336);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("000af685", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c387456\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-8c387456\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./geom.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 745:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(337);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("721ae84f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-977b0450\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./stroke.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-977b0450\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./stroke.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(338);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("4529e1eb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-e8970bb8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./feature.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../node_modules/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-e8970bb8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./feature.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__app__);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1__src___default.a)

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  render: h => h(__WEBPACK_IMPORTED_MODULE_2__app___default.a)
})


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = __webpack_require__(34);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleRefresh = _style2.default.methods.refresh;
var methods = {
  /**
   * @protected
   */
  mountStyle: function mountStyle() {
    this.setImage(this.style);
  },

  /**
   * @protected
   */
  unmountStyle: function unmountStyle() {
    this.setImage(undefined);
  },
  refresh: function refresh() {
    this.initialize();
    styleRefresh.call(this);
  }
};

exports.default = {
  mixins: [_style2.default],
  inject: ['setImage'],
  methods: methods,
  render: function render(h) {
    return h('i', {
      style: {
        display: 'none !important'
      }
    }, this.$slots.default);
  }
};

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(128);

var _keys2 = _interopRequireDefault(_keys);

var _templateSettings2 = __webpack_require__(642);

var _templateSettings3 = _interopRequireDefault(_templateSettings2);

var _isString2 = __webpack_require__(639);

var _isString3 = _interopRequireDefault(_isString2);

exports.isNumeric = isNumeric;
exports.coalesce = coalesce;
exports.round = round;
exports.replaceTokens = replaceTokens;
exports.isTemplate = isTemplate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} value
 * @return {boolean} True if value is number or numeric string.
 */
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * @param {...*} [args]
 *
 * @return {*}
 */
function coalesce() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.find(function (val) {
    return val != null;
  });
}

/**
 * @param {number} num
 * @param {number} [precision=0]
 * @return {number}
 */
function round(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return Number(Math.round(Number(num + 'e+' + precision)) + 'e-' + precision);
}

/**
 * Replaces `tokens` in the `string` by values from the `replaces`.
 *
 * @param {string} string
 * @param {Object} replaces
 *
 * @returns {string}
 */
function replaceTokens(string, replaces) {
  var regExp = new RegExp((0, _keys2.default)(replaces).map(function (field) {
    return '(\\{' + field + '\\})';
  }).join('|'), 'ig');

  return string.replace(regExp, function (match) {
    return replaces[match.substr(1, match.length - 2)] || '';
  });
}

/**
 * Check if string is lodash template string.
 * @param {string} value
 * @return {boolean}
 */
function isTemplate(value) {
  return (0, _isString3.default)(value) && (value.search(_templateSettings3.default.interpolate) !== -1 || value.search(_templateSettings3.default.evaluate) !== -1);
}

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coord = exports.style = exports.helpers = exports.consts = undefined;

var _consts2 = __webpack_require__(48);

var _consts = _interopRequireWildcard(_consts2);

var _helpers2 = __webpack_require__(244);

var _helpers = _interopRequireWildcard(_helpers2);

var _style2 = __webpack_require__(245);

var _style = _interopRequireWildcard(_style2);

var _coord2 = __webpack_require__(243);

var _coord = _interopRequireWildcard(_coord2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.consts = _consts; /**
                           * OpenLayers 3 helpers and constants
                           */

exports.helpers = _helpers;
exports.style = _style;
exports.coord = _coord;

/***/ })

},[749]);
//# sourceMappingURL=app.3d3d5e451b8261f652d0.js.map