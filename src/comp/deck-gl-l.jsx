import { ColumnLayer } from "deck.gl";
import { scaleLinear } from "d3-scale";
import de from "../datas/daily.json";
import de2 from "../datas/2nd.json"
export const RenderLayers = (props) => {
    let maxActive, minActive;
    const radiusColumns = 4000;
    const { option} = props;
    

       
    let dat = de2.map(function (location) {
        return {
          active: location.ca_408,
          death: location.de_408,
          district: location.district,
          coordinates: [location.lon, location.lat]
        };
      });
      if(option!==undefined){
         console.log("Value:",option.value);
        if(option.value==="26"){
          dat = de.map(function (location) {
            return {
              active: location.cases,
              death: location.death,
              district: location.district,
              coordinates: [location.lon, location.lat]
            };
          });
        } 
        if(option.value==="2"){
          dat = de2.map(function (location) {
            return {
              active: location.cases,
              death: location.death,
              district: location.district,
              coordinates: [location.lon, location.lat]
            };
          });
        } 
          
      }
         
    console.log(dat);  
    maxActive = Math.max(6000);
    minActive = Math.min(0);
    const elevation = scaleLinear([minActive, maxActive], [0, 4000]);
    return [
    new ColumnLayer({
        id: "cases",
        data:dat,
        pickable: true,
        extruded: true,
        getPosition: d => d.coordinates,
        diskResolution: 21,
        radius: radiusColumns,
        elevationScale: 200,
        getFillColor: d =>[12, 12, 205, 225],
        getElevation: d => elevation(d.active),
        }),
    new ColumnLayer({
          id: "death",
          data:dat,
          pickable: true,
          extruded: true,
          getPosition: d => d.coordinates,
          diskResolution: 21,
          radius: radiusColumns,
          elevationScale: 800,
          getFillColor: d =>[250, 108, 11, 225],
          getElevation: d => elevation(d.death),
          })
    
 ];
}