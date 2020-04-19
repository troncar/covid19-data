import React, {useEffect, useState} from 'react';
// Components
import BlockTerrytory from './components/BlockTerritory';
import NavBar from './components/NavBar';
// Styles
import './App.css';
import BlockDashboard from './components/BlockDashboard';

function App() {
  // Initial State Territory
  const initialStateTerritory = { name:'', count:0 } ;
  const initialStateTowns = [{name:'', count:0 , path:'',state:''}];
  const initialShowDashboard =  false;
  const initialHospitals = [{sector:'', count:0}];
  const initiaSickness = [];

  //Hooks
  const [terrytory, setTerritory] = useState(initialStateTerritory);
  const [towns, setTowns] = useState(initialStateTowns)
  const [showDashboard, setShowDashboard] = useState(initialShowDashboard);
  const [hospitals, setHospitals] = useState(initialHospitals);
  const [sickness, setSickness] = useState(initiaSickness);
  
  // Const 
  const urlInitial = 'https://datos.cdmx.gob.mx/api/records/1.0/search/?rows=0&dataChart=eyJxdWVyaWVzIjpbeyJjb25maWciOnsiZGF0YXNldCI6ImNhc29zLWFzb2NpYWRvcy1hLWNvdmlkLTE5Iiwib3B0aW9ucyI6eyJyb3dzIjoiMTAifX0sImNoYXJ0cyI6W3siYWxpZ25Nb250aCI6dHJ1ZSwidHlwZSI6ImxpbmUiLCJmdW5jIjoiQVZHIiwieUF4aXMiOiJlZGFkIiwic2NpZW50aWZpY0Rpc3BsYXkiOnRydWUsImNvbG9yIjoiIzY2YzJhNSJ9XSwieEF4aXMiOiJmZWNoYV9kZWYiLCJtYXhwb2ludHMiOiIiLCJ0aW1lc2NhbGUiOiJ5ZWFyIiwic29ydCI6IiJ9XSwiZGlzcGxheUxlZ2VuZCI6dHJ1ZSwiYWxpZ25Nb250aCI6dHJ1ZX0%3D&refine.resultado=Positivo+SARS-CoV-2&refine.entidad_um=CIUDAD+DE+M%C3%89XICO&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=edad&facet=nacionalidad&facet=embarazo&facet=habla_lengua_indi&facet=diabetes&facet=epoc&facet=asma&facet=inmusupr&facet=hipertension&facet=cardiovascular&facet=obesidad&facet=renal_cronica&facet=tabaquismo&facet=resultado&facet=migrante&facet=pais_nacionalidad&facet=rango_edad&facetsort.origen=-count&facetsort.sector=-count&facetsort.sexo=-count&facetsort.tipo_paciente=-count&facetsort.nacionalidad=-count&facetsort.embarazo=-count&facetsort.habla_lengua_indi=-count&facetsort.diabetes=-count&facetsort.epoc=-count&facetsort.asma=-count&facetsort.inmusupr=-count&facetsort.hipertension=-count&facetsort.cardiovascular=-count&facetsort.obesidad=-count&facetsort.renal_cronica=-count&facetsort.tabaquismo=-count&facetsort.resultado=-count&facetsort.migrante=-count&facetsort.rango_edad=-count&dataset=casos-asociados-a-covid-19&timezone=America%2FMexico_City&lang=es'

  useEffect(() => {
    fetch(urlInitial)
      .then(response => response.json())
      .then((response)=> {

        if(!! response.facet_groups
           && !!response.facet_groups[0] 
           && !!response.facet_groups[0].facets) {
             console.log(response);
              // Search State Terrytory / State 
              const searchTerritory = (response.facet_groups.filter( facet => facet.name === 'entidad_um'));
              // Search Towns 
              const searchTowns = (response.facet_groups.filter( facet => facet.name === 'municipio_res'));
              // Search Hospitals 
              const searchHospitals = (response.facet_groups.filter( facet => facet.name === 'sector'));
              // Search Previous Sickness 
              const searchSickness = (response.facet_groups.filter( facet => facet.name === 'obesidad' 
                || facet.name === 'tabaquismo'  
                || facet.name === 'diabetes'
                || facet.name === 'asma'
                || facet.name === 'hipertension'
                || facet.name === 'cardiovascular'
                || facet.name === 'epoc'
                || facet.name === 'renal_cronica'
                || facet.name === 'inmusupr'));
   
              // SetStates
              setTerritory({name: searchTerritory[0].facets[0].path , count : searchTerritory[0].facets[0].count})
              setTowns({...searchTowns})
              setHospitals({...searchHospitals});
              setSickness({...searchSickness});
              setShowDashboard(true);
           }  
      })
  },[])

  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="wrapper">
        {showDashboard && (
          <div>
            <BlockTerrytory terrytory={terrytory}></BlockTerrytory>
            <BlockDashboard towns={towns} hospitals={hospitals} sickness={sickness}></BlockDashboard>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
