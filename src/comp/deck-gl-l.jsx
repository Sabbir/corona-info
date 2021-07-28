import { ColumnLayer } from "deck.gl";
import { scaleLinear } from "d3-scale";
import de from "../datas/daily.json";
export const RenderLayers = (props) => {
    let maxActive, minActive;
    const radiusColumns = 4000;
    const { data} = props;
    
    
    const dat = de.map(function (location) {
        return {
          active: location.cases,
          death: location.death,
          district: location.district,
          coordinates: [location.lon, location.lat]
        };
      });
    console.log(dat);  
    maxActive = Math.max(6000);
    minActive = Math.min(1);
    const elevation = scaleLinear([minActive, maxActive], [0, 4000]);
    return [
    new ColumnLayer({
        id: "cases",
        data:dat,
        pickable: true,
        extruded: true,
        getPosition: d => d.coordinates,
        diskResolution: 20,
        radius: radiusColumns,
        elevationScale: 80,
        getFillColor: d =>[12, 12, 205, 235],
        getElevation: d => elevation(d.active),
        }),
    new ColumnLayer({
          id: "death",
          data:dat,
          pickable: true,
          extruded: true,
          getPosition: d => d.coordinates,
          diskResolution: 20,
          radius: radiusColumns,
          elevationScale: 1200,
          getFillColor: d =>[250, 108, 11, 235],
          getElevation: d => elevation(d.death),
          }),    
 ];
}