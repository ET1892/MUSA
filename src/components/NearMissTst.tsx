import React, { useState, useEffect } from 'react'
import FlowNavBar from './FlowNavBar'

async function fetchNeo() {
  
    try{
       const response = await fetch('https://musa.ocathain.ie/nearmiss');
       const json = await response.json();
       return json;
    }
    catch (error: any) {
      console.log(error)
    }
   
}

function reformatSizeData(s: number){
    let sizeScale = "";
    let sizeFormatted;
    if(s < 0.5){
        sizeScale = "m"; 
        sizeFormatted = parseFloat((s*1000).toFixed(3));
    } else {
        sizeScale = "km"; 
        sizeFormatted = parseFloat(s.toFixed(3));
    }
    return {sizeScale, sizeFormatted}
}

function reformatDistData(s: number){
    let distScale = "";
    let distFormatted;
    if(s < 0.5){
        distScale = "m"; 
        distFormatted = parseFloat((s*1000).toFixed(3));
    } else {
        distScale = "km"; 
        distFormatted = parseFloat(s.toFixed(3));
    }
    return {distScale, distFormatted}
}

function formatSizeScale(s: number){
    let scaleObj = "No Scale Found"; let scaleFile = "earth.svg"; let scaleSize = 0;
    if(s < 0.03){scaleObj = "the average house"; scaleFile = "scale_house.svg"; scaleSize = 6; return {scaleObj, scaleFile, scaleSize}};
    if(s < 0.15){scaleObj = "Statue of Liberty"; scaleFile = "scale_statue.svg"; scaleSize = 93; return {scaleObj, scaleFile, scaleSize}};
    if(s < 20){scaleObj = "Empire State Building"; scaleFile = "scale_emp_state.svg"; scaleSize = 381; return {scaleObj, scaleFile, scaleSize}};
    if(s < 2000){scaleObj = "Mt. Fuji"; scaleFile = "scale_fuji.svg"; scaleSize = 3776; return {scaleObj, scaleFile, scaleSize}};
    if(s < 20000){scaleObj = "Ireland"; scaleFile = "scale_ireland.svg"; scaleSize = 275000; return {scaleObj, scaleFile, scaleSize}};
    if(s < 120000){scaleObj = "Earth"; scaleFile = "scale_earth.svg"; scaleSize = 12742000; return {scaleObj, scaleFile, scaleSize}};
    scaleObj = "Distance to Moon"; scaleFile = "scale_moon_to_earth.svg"; scaleSize = 384400000; return {scaleObj, scaleFile, scaleSize};
}

function svgScalingModifiers(s: number){
    let astMult = 1; let objMult = 1;
    if(s > 1){
        astMult = 1; objMult = 1/s;
    }
    else{
        astMult = 1*s; objMult = 1;
    }
    return {astMult, objMult};
}

const NearMiss = () => {
    const [data, setData] = useState<{ name: string, id: string, size: number, distance: string }[] | null>(null);
    useEffect(() => {
        
        fetchNeo().then((data) => setData(data));


    }, []);
    console.log(data);
    return (
        <div>
            <header>
                <FlowNavBar />
            </header>
            <body className="grid grid-cols-2 gap-4 justify-center space-evenly space-y-10 p-10 m-10">
                {data?.map(item => {
                    // Refine the data to a more understandable form.
                    // If distFormatted is ever not km we have serious issues.
                    let {sizeScale, sizeFormatted} = reformatSizeData(item.size);
                    let {distScale, distFormatted} = reformatDistData(parseFloat(item.distance));
                    let {scaleObj, scaleFile, scaleSize} = formatSizeScale(item.size);
                    let {astMult, objMult} = svgScalingModifiers((item.size*1000/scaleSize));
                    console.log(astMult, objMult);
                    let svgAstSize = 100*astMult; let svgObjSize = 100*objMult;
                    let fileName = "../pictures/" + scaleFile;
                    return <div className="flex flex-row space-evenly">
                        <div className='align-left min-w-200'>
                            <b>Name: {item.name}</b>
                            <p>ID: {item.id}</p>
                            <p>Size: {sizeFormatted} {sizeScale}</p>
                            <p>Distance: {distFormatted} {distScale}</p>
                        </div>
                        <div className='space-x-10'>
                            <div className='flex flex-row justify-center align-center content-stretch'>
                                <div className=''>
                                <img src="../pictures/scale_asteroid.svg" style={{height:svgAstSize,width:svgAstSize}} alt='asteroid image'/>
                                </div>
                                
                                <img src={fileName} style={{height:svgObjSize,width:svgObjSize}} alt={scaleFile}/>
                            </div>
                            <div><b>{(item.size*1000/scaleSize).toFixed(3)}</b> times the size of {scaleObj}</div>
                        </div>
                    </div> 
                })}
                
            </body>
        </div>
      )
}

export default NearMiss