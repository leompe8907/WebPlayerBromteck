import React, { useEffect } from 'react'
import { CV } from '../../CV/cv'

function Home() {

  function getAvailableStreams (){
    CV.call("getAvailableStreams",
    {
        sessionId: localStorage.getItem("sessionId")
    },
    (result) => {
        if (result["success"]) {
          const data = result["answer"];
          console.log(JSON.stringify(data))
          console.log(data)
        } else {
          alert("failed to fetch result" + result["errorMessage"]);
          console.log(JSON.stringify(result));
        }
      }
    )
  }

  function getAds (){
    CV.call("getAds",
    {
        sessionId: localStorage.getItem("sessionId")
    },
    (result) => {
        if (result["success"]) {
          const data = result["answer"];
          console.log(JSON.stringify(data))
        } else {
          alert("failed to fetch result" + result["errorMessage"]);
        }
      }
    )
  }

  function Bouquets() {
    CV.call("getBouquets",
    {
        sessionId: localStorage.getItem("sessionId")
    },
    (result) => {
        if (result["success"]) {
            const data = result["answer"];
            console.log(data);
        }else{
            alert("failed to fetch result" + result["errorMessage"]);
        }
    }
    )
  }

  function getStreamingLicenses() {
    CV.call("getBouquets",
    {
        sessionId: localStorage.getItem("sessionId")
    },
    (result) => {
        if (result["success"]) {
            const data = result["answer"];
            console.log(data);
        }else{
            alert("failed to fetch result" + result["errorMessage"]);
        }
    }
    )
  }

  useEffect(() =>{
    getAvailableStreams()
    getAds()
    Bouquets()
  },[])  
  return (
    <div>Home</div>
  )
}

export default Home