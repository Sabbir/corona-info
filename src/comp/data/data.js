
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";
import React, { Component } from "react";
import axios from "axios";
import { RenderLayers } from "../deck-gl-l.jsx";
let datas;

class Data extends Component {
  state = {};
  constructor(props) {
    super();
    this.state = {
      datas: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    axios.all([
      axios.get('https://disease.sh/v2/countries?allowNull=false'),
    ]).then(axios.spread((World) => {
      let data = World.data || [];
      console.log(data);
      data = data.map(function (location) {
        return {
          deaths:location.deaths,
          active: location.cases,
          country: location.country,
          continent: location.continent,
          coordinates: [location.countryInfo.long, location.countryInfo.lat]
        };
      });
      data = data.filter(location => (location.continent === "Asia"));
      this.setState({ datas: data });
    })).catch((error) => {
      console.log(error); return [];
    })
  }
  render() {
    const { datas } = this.state;
    
    
    const INITIAL_VIEW_STATE = {
      latitude: 23,
      longitude: 90,
      zoom: 8,
      bearing: 78,
      pitch: 55
    }; 

    return(<React.Fragment>
      <DeckGL
       initialViewState={INITIAL_VIEW_STATE}
       height="90%"
       width="100%"
       controller={true} 
       layers={RenderLayers({ data: datas})} 
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1Ijoic2FiYmlyIiwiYSI6ImNpenV0b3d0ZTAwdjAyd3IycjU4aTc2NjkifQ.HF6YOQbCT3Eqy2ohOL8BDg"
          
         />
      </DeckGL>
      
     </React.Fragment>
     ) 
  }
}

export default Data;
