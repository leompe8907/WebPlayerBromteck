import React from "react";
import { useState, useEffect } from "react";

import Img from "./Imagenes";
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

    function getClientConfig() {
        CV.call(
            "getClientConfig",
            {
                sessionId: localStorage.getItem("sessionId"),
            },
            (result) => {
                if (result["success"]) {
                    const data = result["answer"];
                    setProfiles(data?.profiles);
                    console.log(data?.profiles.length);
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
        getClientConfig();
        Licenses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        var profile = profiles.length;
        if (profile) {
            profile = profiles.length;
        } else {
            profile = 0;
        }

        if (licenses.length === profile) {
            alert(
                "no puedes crear mas perfiles, por favor comunicate con tu operador de cable"
            );
        } else {
            for (var i = 0; i < licenses.length; i++) {
                var op = localStorage.getItem("lis" + [i]);
                if (profile === 0) {
                    CV.call(
                        "createProfile",
                        {
                            sessionId: localStorage.getItem("sessionId"),
                            name: name,
                            maxAge: age,
                            imageId: `https://cv01.panaccess.com/cv_data_pub/images/${id}/v/thumb.png`,
                            dailyWatchTimeM: 0,
                            assignNewLicense: false,
                            license: op,
                        },
                        (result) => {
                            if (result["success"]) {
                                alert("Felicidades se a creado el usuario  " + name);
                                window.location.reload();
                            } else {
                                alert("failed to fetch result" + result["errorMessage"]);
                            }
                        }
                    );
                    break;
                } else {
                    for (var g = 0; g < licenses.length; g++) {
                        if (op === profiles[g]?.sn) {
                            localStorage.removeItem("lis" + [i]);
                        } else {
                            CV.call(
                                "createProfile",
                                {
                                    sessionId: localStorage.getItem("sessionId"),
                                    name: name,
                                    maxAge: age,
                                    imageId: `https://cv01.panaccess.com/cv_data_pub/images/${id}/v/thumb.png`,
                                    dailyWatchTimeM: 0,
                                    assignNewLicense: false,
                                    license: op,
                                },
                                (result) => {
                                    if (result["success"]) {
                                        alert("Felicidades se ha creado el usuario  " + name);
                                        window.location.reload();
                                    } else {
                                        alert("failed to fetch result" + result["errorMessage"]);
                                    }
                                }
                            );
                        }
                        localStorage.removeItem("lis" + [i]);
                        break;
                    }
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
