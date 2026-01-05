import { Global } from 'xframelib';
import { Tiles3DLoader } from 'xgis-cesium';


//加载或定位布达拉宫
export function doLocateBudalagong(item:any)
{

  if(Global.CesiumViewer)
  {
    if(Global.Budalagong)
    {
    Global.Budalagong.locate(Global.CesiumViewer);
    }
    else
    {
      const tileset3DURL0='https://3dtiles.gis.digsur.com/model/4c64e2b3-5fdf-4193-9456-f22ba71d195b/tileset.json';
      Global.Budalagong=Tiles3DLoader.load3DTilesLayer(tileset3DURL0,Global.CesiumViewer,'布达拉宫','倾斜摄影',false);
    }

  }

}
