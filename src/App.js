import React, {useEffect, useState} from 'react';
// Components
import BlockTerrytory from './components/BlockTerritory';
import NavBar from './components/NavBar';
// Custom Hooks
import useBreakpoint from  './components/customHooks/useBreakpoint';
import useFetchCurrent from './components/customHooks/useFetchCurrent';

// Styles
import './App.css';
import BlockDashboard from './components/BlockDashboard';

function App() {
  // Initial State Territory
  const initialStateTerritory = { name:'', count:0 } ;
  const initialShowDashboard =  false;
  //Hooks
  const [terrytory, setTerritory] = useState(initialStateTerritory);
  const [currentTerrytory, setCurrentTerrytory] = useState({});
  const [currentTowns, setCurrentTowns] = useState({});
  const [showDashboard, setShowDashboard] = useState(initialShowDashboard);
  const breakpoint = useBreakpoint();
  
  // Const 
  const urlInitial = 'https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&rows=0&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=edad&facet=nacionalidad&facet=embarazo&facet=habla_lengua_indi&facet=diabetes&facet=epoc&facet=asma&facet=inmusupr&facet=hipertension&facet=cardiovascular&facet=obesidad&facet=renal_cronica&facet=tabaquismo&facet=resultado&facet=migrante&facet=pais_nacionalidad&facet=rango_edad'

  useEffect(() => {
    fetch(urlInitial)
      .then(response => response.json())
      .then((response)=> {

        if(!! response.facet_groups
           && !!response.facet_groups[0] 
           && !!response.facet_groups[0].facets) {

              // Search State Terrytory / State 
              const searchTerritory = (response.facet_groups.filter( facet => facet.name === 'entidad_um'));  
              // Search Towns 
              const searchTowns = (response.facet_groups.filter( facet => facet.name === 'municipio_res'));     
              // SetStates
              setTerritory({...searchTerritory})
              // Default State
              setCurrentTerrytory({'name': searchTerritory[0].facets[0].name })
              setCurrentTowns({...searchTowns})
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
            <BlockTerrytory terrytory={terrytory} useFetchCurrent={useFetchCurrent} setCurrentTerrytory={setCurrentTerrytory} currentTerrytory={currentTerrytory} setCurrentTowns={setCurrentTowns}></BlockTerrytory>
            <BlockDashboard currentTerrytory={currentTerrytory}  useFetchCurrent={useFetchCurrent}  breakpoint={breakpoint} currentTowns={currentTowns}></BlockDashboard>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
