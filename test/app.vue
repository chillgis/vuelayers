<template>
  <div id="app">
    <vl-map>
      <vl-view :center="center" :zoom="zoom" :rotation="rotation" @change="updateMapView"/>

      <!-- interactions -->
      <vl-interaction-select ref="select" :selected="selected" @select="select" @unselect="unselect">
        <vl-style-container>
          <vl-style-stroke color="#f03b20" :width="3"/>
          <vl-style-fill :color="[254, 178, 76, 0.7]"/>

          <vl-style-circle>
            <vl-style-stroke color="#f03b20" :width="3"/>
            <vl-style-fill :color="[254, 178, 76, 0.7]"/>
          </vl-style-circle>
        </vl-style-container>
      </vl-interaction-select>
      <!--// interactions -->

      <vl-layer-tile>
        <vl-source-sputnik/>
      </vl-layer-tile>
      <!--// base layers -->

      <vl-layer-vector id="points" v-if="pointsLayer">
        <!-- layer level style -->
        <vl-style-container>
          <vl-style-stroke color="#8856a7" :width="2"/>
          <vl-style-fill :color="[158, 188, 218, 0.5]"/>

          <vl-style-circle>
            <vl-style-stroke color="#8856a7" :width="2"/>
            <vl-style-fill :color="[158, 188, 218, 0.5]"/>
          </vl-style-circle>
        </vl-style-container>
        <!--// layer level style -->

        <vl-source-vector :features="points" />
      </vl-layer-vector>

      <!-- Tile WMS -->
      <vl-layer-tile id="wms">
        <vl-source-wms url="https://ahocevar.com/geoserver/wms" layers="topp:states"
                       :ext-params="{ TILED: true }" server-type="geoserver" />
      </vl-layer-tile>
      <!--// Tile WMS -->

      <!-- WMTS -->
      <vl-layer-tile id="wmts">
        <vl-source-wmts
          url="https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/"
          layer-name="0" matrix-set="EPSG:3857" format="image/png" style-name="default"/>
      </vl-layer-tile>
      <!--// WMTS -->
    </vl-map>

    <div class="controls">
      <button @click="pointsLayer = !pointsLayer">Toggle</button>
      <button @click="points = points.slice(1)">Remove</button>
    </div>
  </div>
</template>

<script>
  import { kebabCase, range, random } from 'lodash/fp'

  const computed = {
    selectedIds () {
      return this.selected.map(feature => feature.id)
    }
  }

  const methods = {
    geometryTypeToCompName (type) {
      return 'vl-geom-' + kebabCase(type)
    },
    updateMapView ({ center, zoom, rotation }) {
      this.center = center
      this.zoom = zoom
      this.rotation = rotation
    },
    select (feature) {
      const i = this.selectedIds.indexOf(feature.id)
      if (i === -1) {
        this.selected.push(feature)
      }
    },
    unselect ({ id }) {
      const i = this.selectedIds.indexOf(id)
      if (i !== -1) {
        this.selected.splice(i, 1)
      }
    },
    loadData () {
      const points = []
      range(1, 100).forEach(i => {
        points.push({
          id: i,
          properties: {
            id: i
          },
          geometry: {
            type: 'Point',
            coordinates: [
              random(-179, 179),
              random(-89, 89)
            ]
          }
        })
      })

      this.points = points

      return Promise.resolve(this.points)
    }
  }

  export default {
    name: 'app',
    computed,
    methods,
    data () {
      return {
        zoom: 2,
        center: [ 0, 0 ],
        rotation: 0,
        selected: [],
        points: [],
        pointsLayer: true
      }
    },
    created () {
      this.loadData()
        .catch(::console.error)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  html, body, #app {
    width       : 100%;
    height      : 100%;
    margin      : 0;
    box-sizing  : border-box;
    font-family : Helvetica, Arial, sans-serif;
    overflow    : hidden;

    * {
      box-sizing : border-box;
    }
  }

  .controls {
    position   : absolute;
    bottom     : 10px;
    left       : 50%;
    transform  : translateX(-50%);
    width      : 70vw;
    background : rgba(255, 255, 255, 0.7);
    box-shadow : 0 0 20px rgba(2, 2, 2, 0.1);
    padding    : 5px;
    text-align : center;

    > button {
      margin         : 5px;
      padding        : 5px 10px;
      text-transform : uppercase;
    }
  }
</style>
