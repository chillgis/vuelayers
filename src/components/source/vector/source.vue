<script>
  import VectorSource from 'ol/source/vector'
  import loadingstrategy from 'ol/loadingstrategy'
  import { merge, differenceWith } from 'lodash/fp'
  import { consts, extentHelper, geoJson } from '../../../ol-ext'
  import source from '../source'

  const { toLonLat: extentToLonLat } = extentHelper
  const { LAYER_PROP } = consts

  const props = {
    loader: Function,
    useSpatialIndex: {
      type: Boolean,
      default: true
    },
    features: {
      type: Array,
      default: () => []
    }
    // todo implement options
    // format: String,
    // strategy: String
  }

  const computed = {
    currentLoader () {
      return this.loader
    },
    currentFeatures () {
      return this.features
    }
  }

  const {
    mountSource: sourceMountSource,
    unmountSource: sourceUnmountSource
  } = source.methods

  const methods = {
    /**
     * @return {function|undefined}
     * @protected
     */
    sourceLoader () {
      if (!this.currentLoader) return

      const loader = this.currentLoader
      const self = this

      return async function __loader (extent, resolution, projection) {
        projection = projection.getCode()
        extent = extentToLonLat(extent, projection)

        const features = await Promise.resolve(loader(extent, resolution, projection))

        if (features && features.length) {
          self.$nextTick(() => {
            self.$emit('load', {
              features,
              extent,
              resolution,
              projection
            })
          })
        }
      }
    },
    createSource () {
      return new VectorSource({
        attributions: this.currentAttributions,
        projection: this.currentProjection,
        loader: this.sourceLoader(),
        useSpatialIndex: this.useSpatialIndex,
        wrapX: this.wrapX,
        logo: this.logo,
        strategy: loadingstrategy.bbox
        // url: this.url,
      })
    },
    mountSource () {
      this::sourceMountSource()

      if (this.currentFeatures.length) {
        this.source.addFeatures(this.currentFeatures.map(this::createFeature))
      }
    },
    unmountSource () {
      this::sourceUnmountSource()
      this.clear()
    },
    clear () {
      this.source.clear()
    }
  }

  const diffById = differenceWith((a, b) => a.id === b.id)
  const watch = {
    currentLoader () {
      // todo
    },
    currentFeatures (value, oldValue) {
      let forAdd = diffById(value, oldValue)
      let forRemove = diffById(oldValue, value)

      this.source.addFeatures(forAdd.map(this::createFeature))
      forRemove.map(geoJsonFeature => {
        const feature = this.source.getFeatureById(geoJsonFeature.id)

        if (feature) {
          this.source.removeFeature(feature)
          feature.unset(LAYER_PROP)
        }
      })
    }
  }

  export default {
    name: 'vl-source-vector',
    mixins: [ source ],
    props,
    computed,
    methods,
    watch,
    stubVNode: {
      empty: false,
      attrs () {
        return {
          id: this.$options.name
        }
      }
    }
  }

  function createFeature (geoJsonFeature) {
    return geoJson.readFeature(merge(geoJsonFeature, {
      properties: {
        [ LAYER_PROP ]: this.layer.get('id')
      }
    }), this.currentProjection)
  }
</script>
