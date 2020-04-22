import { useState, useEffect } from "react"

const useFetchCurrent = (current) => {
    const initialStateTowns = [{name:'', count:0 , path:'',state:''}];
    const initialShowDashboard =  false;
    const [currentTerritory, setCurrentTerritory] = useState({});
    const [error, setError ] = useState({});
    const [persons, setPersons] = useState();
    const [currentTowns, setTowns] = useState(initialStateTowns)
    const [showDashboard, setShowDashboard] = useState(initialShowDashboard);
    const initialHospitals = [{sector:'', count:0}];
    const initiaSickness = [];
    //Hooks
    const [hospitals, setHospitals] = useState(initialHospitals);
    const [sickness, setSickness] = useState(initiaSickness);


    const  urlTerritoy =  `https://datos.cdmx.gob.mx/api/records/1.0/search/?dataset=casos-asociados-a-covid-19&rows=0&facet=origen&facet=sector&facet=entidad_um&facet=sexo&facet=municipio_res&facet=tipo_paciente&facet=fecha_ingreso&facet=edad&facet=nacionalidad&facet=embarazo&facet=habla_lengua_indi&facet=diabetes&facet=epoc&facet=asma&facet=inmusupr&facet=hipertension&facet=cardiovascular&facet=obesidad&facet=renal_cronica&facet=tabaquismo&facet=resultado&facet=migrante&facet=pais_nacionalidad&facet=rango_edad&refine.entidad_um=${current}`

    useEffect(()=> {
        fetch(urlTerritoy)
        .then(response => response.json())
        .then((response)=> {
            if(!! response.facet_groups
                && !!response.facet_groups[0] 
                && !!response.facet_groups[0].facets) {
                    const searchTerritoryName = (response.facet_groups.filter( facet => facet.name === 'entidad_um')); 
                    const searchTerritoryPostive =  (response.facet_groups.filter( facet => facet.name === 'resultado')); 
                    const countPositive = (searchTerritoryPostive[0].facets.filter(facet => facet.path==='Positivo SARS-CoV-2'))
                     // Search Towns 
                    const searchTowns = (response.facet_groups.filter( facet => facet.name === 'municipio_res'));
                    setTowns({...searchTowns})
                    setCurrentTerritory({'name': searchTerritoryName[0].facets[0].name, 'count': countPositive[0].count });

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
        
                    // Default State
                    setTowns({...searchTowns})
                    setHospitals({...searchHospitals});
                    setSickness({...searchSickness});
                    setShowDashboard(true);
                    setPersons(response.nhits);
                }
        }).catch(error => {
            setError({...error});
        });
    },[current,urlTerritoy])

    return [currentTerritory, error , currentTowns, sickness ,hospitals, showDashboard, persons]

}

export default useFetchCurrent;