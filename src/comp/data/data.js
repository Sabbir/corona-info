
import DeckGL from "deck.gl";
import {MapView, FirstPersonView} from '@deck.gl/core';
import { StaticMap } from "react-map-gl";
import React, { Component } from "react";
import axios from "axios";
import Select from 'react-select';
import { RenderLayers } from "../deck-gl-l.jsx";
import covid from '../../asset/covid_icon.svg';
//let datas;
const options = [
  { value: '26', label: '26th July' },
  { value: '2', label: '2nd August' },
  { value: '4', label: '4th August' }, 
  { value: '9', label: '9th August' },
  { value: '14', label: '14th August' },
   
];
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: 14,
    padding:'3px',
    width: '169px',
    borderBottom: 'solid blue',
    color: state.isSelected ? 'darkgreen' : 'black',
    backgroundColor: state.isSelected ? 'lightblue' : 'white'
  }),
  control: (provided) => ({
    ...provided,
    
  })
}



class Data extends Component {
  state = {};
  constructor(props) {
    super();
    this.state = {
      datas: [],
      selectOption :null,
      id: "",
      name: ''
    };
  }

  componentDidMount() {
   // this.fetchData();
   console.log("Component mounted")
  }

  selectionChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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
    //const { datas } = this.state;
    const { selectedOption } = this.state;
    
    
    const INITIAL_VIEW_STATE = {
      latitude: 23,
      longitude: 90,
      zoom: 6,
      bearing: 68,
      pitch: 55
    }; 

    return(
    
    <React.Fragment>
      
      <div style={{ padding: '30px' }}>
      <DeckGL
       initialViewState={INITIAL_VIEW_STATE}
       height="100%"
       width="100%"
       controller={true} 
       layers={RenderLayers({ option: selectedOption})} 
       getTooltip={({object}) => object && `${object.district}\ncases: ${object.active}\nDeath: ${object.death}`}
      >
        <MapView id="map" width="100%" controller={true}>
        <StaticMap
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1Ijoic2FiYmlyIiwiYSI6ImNpenV0b3d0ZTAwdjAyd3IycjU4aTc2NjkifQ.HF6YOQbCT3Eqy2ohOL8BDg"
          
         />
         </MapView>
         <FirstPersonView width="100%" x="100%" y="100%" fovy={10} />
      </DeckGL>
      </div>
      <div style={{ position:'absolute',padding:'10px', backgroundColor:'black', height: '180px', width:'170px',marginLeft:'20px', borderRadius: 10, opacity:0.89  }}>
      <img src={covid} width='75px' alt="Covid 19" />
        <Select 
        defaultValue={options[4]}
        onChange={this.selectionChange}
        placeholder = "Select Date .."
        styles = { customStyles }
        options = {options} />

        

      </div>
      
      
     </React.Fragment>
     ) 
  }
}

export default Data;
