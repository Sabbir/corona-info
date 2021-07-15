import { ColumnLayer } from "deck.gl";
import { scaleLinear } from "d3-scale";
import de from "../datas/B10721.json";
export const RenderLayers = (props) => {
    let maxActive, minActive;
    const radiusColumns = 55000;
    const { data} = props;
    
    
    const dat = de.map(function (location) {
        return {
          active: location.cases,
          district: location.district,
          coordinates: [location.lon, location.lat]
        };
      });
    console.log(dat);  
    maxActive = Math.max(200);
    minActive = Math.min(5);
    const elevation = scaleLinear([minActive, maxActive], [0, 900]);
    return [
    
    new ColumnLayer({
        id: "deaths",
        data:dat,
        pickable: true,
        extruded: true,
        getPosition: d => d.coordinates,
        diskResolution: 20,
        radius: 4000,
        elevationScale: 1.5,
        getFillColor: d =>[5, 108, d.active * 0.5, 235],
        getElevation: d => elevation(d.active),
        }),
 ];
}