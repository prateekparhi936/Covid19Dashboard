import axios from 'axios'

const url = "https://covid19.mathdro.id/api"

export const fetchData=async(country)=>{
    let changeableUrl=url;
    if(country){
        changeableUrl= `${url}/countries/${country}`;
        console.log("URL: ",changeableUrl);
    }
    try{
        const {data:{confirmed,recovered,deaths,lastUpdate}}=await axios.get(changeableUrl);
        const modifiedData={
            confirmed:confirmed,
            recovered:recovered,
            deaths:deaths,
            lastUpdate:lastUpdate,
        }
        console.log("countires: ",modifiedData);
        return modifiedData;

    }
    catch(error){
        console.log(error);
    }
};
export const fetchDailyData = async () =>{
    try{
        const {data} = await axios.get(`${url}/daily`);

        // const modifiedData=data.map((dailyData)=>({
        //     confirmed:dailyData.confirmed.total,
        //     deaths:dailyData.deaths.total,
        //     date:dailyData.reportDate,
        // }));
        // return modifiedData
        return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    }
    catch(error){

    }
};

export const fetchCountries= async () =>{
    try{
        const {data:{countries}}= await axios.get(`${url}/countries`);
        return countries.map((country)=>country.name);
    }
    catch(error){
        console.log(error);
    }
};