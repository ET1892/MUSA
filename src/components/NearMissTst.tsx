import React, { useState, useEffect } from 'react'
import FlowNavBar from './FlowNavBar'

async function fetchNeo() {
  
    try{
       const response = await fetch('https://localhost:4000/nearmiss');
       const json = await response.json();
       return json;
    }
    catch (error: any) {
      console.log(error)
    }
   
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
            <body className="flex flex-col justify-center items-center space-evenly space-y-10 p-10 m-10">
                {data?.map(item => {
                    return <div>
                        <b>Name: {item.name}</b>
                        <p>ID: {item.id}</p>
                        <p>Size: {item.size}</p>
                        <p>Distance: {item.distance}</p>
                    </div> 
                })}
            </body>
        </div>
      )
}

export default NearMiss