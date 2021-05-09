import 'ol/ol.css';
import "../css/style.css";
import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
// import LineString from 'ol/geom/LineString';

import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
// import Stroke from 'ol/style/Stroke';
import Overlay from 'ol/Overlay';

var __map = null;
var __markerLayer=null;
/** ポップアップを表示するためのレイヤー */
var __overlay = null;

// 浜松町〜東京タワーの道のりを表す座標の配列
var coordinates = [

  {
    name:'住所1',
    coordinate:[139.75655240134424, 35.6553463380788],
  },
  {
    name:'住所2',
    coordinate:[139.75573020071425, 35.654585477741634],
  },
  {
    name:'住所3',
    coordinate:[139.75390308820317, 35.65482672692599],
  },
  {
    name:'住所4',
    coordinate:[139.74578081849876, 35.659007609306684],
  }


]


// マップの作成
__map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: fromLonLat([139.745433, 35.658581]),
    zoom: 16
  })
});

// マーカーを載せるためのレイヤーを作成する
__markerLayer = new VectorLayer({
  source: new VectorSource()
});
__map.addLayer(__markerLayer);

// ポップアップを表示するためのオーバーレイを作成する
__overlay = new Overlay({
  element: document.getElementById('popup'),
  positioning: 'bottom-center'
});

// 点を出す
drawPolyilne();


/**
 * 点を出す
 */
function drawPolyilne() {
  // ジオメトリの作成
  // var lineStrings = new LineString([]);
  // lineStrings.setCoordinates(coordinates);

  // マーカーをレイヤーにプロットする
  for (var i in coordinates) {
    // 地物オブジェクトを作成
    var info = coordinates[i];

    var feature = new Feature({
        geometry: new Point(fromLonLat(info.coordinate))
    });
    feature.information = info;

    // マーカーのスタイルを設定
    var style = new Style({
        image: new Icon({
            src: 'img/icon.png',
            anchor: [0.5, 1.0],
            scale: 0.8
        })
    });
    feature.setStyle(style);

    // 地物を追加する
    __markerLayer.getSource().addFeature(feature);
  }

      // 地図のクリックイベントを設定
      __map.on('click', function (evt) {
        var feature = __map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
                return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            var info = feature.information;
            var element = __overlay.getElement();
            console.log(element);
            var descriptionHTML =
                "<div>" + info.name + "</div>";
            element.innerHTML = descriptionHTML;
            __overlay.setPosition(coordinates);
            __map.addOverlay(__overlay);
        } else {
            __map.removeOverlay(__overlay);
        }
    });


}


