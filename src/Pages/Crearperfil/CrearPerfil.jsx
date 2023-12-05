import React from "react";
import { useState, useEffect } from "react";

import Img from "./Imagenes.js";
import { CV } from "../../CV/cv.js";
import "./CrearPerfil.scss"

function CrearPerfil() {
    //nombre del perfil
    const [name, setName] = useState("");
    // edad del usuario
    const [age, setAge] = useState("");
    // id de la imagen
    const [id, setId] = useState({});
    // Verificacion de tarjetas
    const [licenses, setLicenses] = useState([]);
    // Verificacion de perfiles
    const [profiles, setProfiles] = useState([]);

    function configProfile() {
        CV.call(
          "getClientConfig",
          {
            sessionId: localStorage.getItem("sessionId"),
          },
          (result) => {
            if (result["success"]) {
              const data = result["answer"];
              setProfiles(data.profiles);
            } else {
              alert("failed to fetch result" + result["errorMessage"]);
            }
          }
        );
      }

    function Licenses() {
        CV.call(
            "getStreamingLicenses",
            {
                sessionId: localStorage.getItem("sessionId"),
                withPins: true,
            },
            (result) => {
                if (result["success"]) {
                    const data = result["answer"];
                    console.log(data);
                    for (let i = 0; i < data[i]?.key; i++) {
                        console.log(data[i].key);
                        console.log(data[i].pin);
                        localStorage.setItem("lis" + [i], data[i].key);
                    }
                    setLicenses(data);
                } else {
                    alert("failed to fetch result" + result["errorMessage"]);
                }
            }
        );
    }

    useEffect(() => {
        configProfile();
        Licenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const profileCount = profiles.length;
        const licenseCount = licenses.length;
    
        if (licenseCount === profileCount) {
            alert("No puedes crear más perfiles. Por favor, comunícate con tu operador de cable");
        } else {
            for (let i = 0; i < licenseCount; i++) {
                const license = localStorage.getItem("lis" + [i]);
    
                if (profileCount === 0 || !profiles.some((profile) => license === profile?.sn)) {
                    CV.call(
                        "createProfile",
                        {
                            sessionId: localStorage.getItem("sessionId"),
                            name: name,
                            maxAge: age,
                            imageId: `https://cv01.panaccess.com/cv_data_pub/images/${id}/v/thumb.png`,
                            dailyWatchTimeM: 0,
                            assignNewLicense: false,
                            license: license,
                        },
                        (result) => {
                            if (result["success"]) {
                                alert("¡Felicidades! Se ha creado el usuario " + name);
                                window.location.reload();
                            } else {
                                alert("Failed to fetch result: " + result["errorMessage"]);
                            }
                        }
                    );
                    localStorage.removeItem("lis" + [i]);
                    break;
                }
            }
        }
    };
    

    return (
        <>
            <div className="Profile-container">
                <form onSubmit={handleSubmit} className="formProfile">
                    <div className="content-container">
                        <div className="formcontainer">
                            <label className="labelcontainer" htmlFor="username">Nombre:</label>
                                <input
                                    type="text"
                                    id="name"
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                />
                        </div>
                        <div className="formcontainer">
                            <label className="labelcontainer" htmlFor="username">Edad:</label>
                                <input
                                    type="text"
                                    id="edad"
                                    onChange={(e) => setAge(e.target.value)}
                                    value={age}
                                    required
                                    aria-describedby="pwdnote"
                                />
                        </div>
                    </div>
                    <div className="imagenes-container">
                        {Img.map((img) => (
                            <input
                                type="image"
                                key={img.id}
                                className="profileImage"
                                src={img.img}
                                alt={img.id}
                                onClick={(e) => setId(e.target.alt)}
                                value={`https://cv01.panaccess.com/cv_data_pub/images/${img.id}/v/thumb.png`}
                                required
                            />
                        ))}
                    </div>
                    <div className="buttons-container">
                        <button type="submit" className="button-container"> Sign In </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CrearPerfil;
