import React, { useEffect, useState } from "react";
import lgblanco from "../../Media/Img/lgblanco.png";
import { CV } from "../../CV/cv";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

function Profile() {

  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([]);
  const [on, setOn] = useState(true);

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
          localStorage.setItem("configProfile", JSON.stringify(data));
        } else {
          alert("failed to fetch result" + result["errorMessage"]);
        }
      }
    );
  }

  useEffect(() => {
    if (on) {
      configProfile();
      setOn(false);
    }
  }, [on]);

  useEffect(() => {
    // Lógica adicional basada en el nuevo valor de profiles
    console.log("Nuevo valor de profiles:", profiles);
  }, [profiles]);

  function EliminarProfile(id) {
    CV.call(
      "deleteProfile",
      {
        sessionId: localStorage.getItem("sessionId"),
        profileId: id,
      },
      (result) => {
        if (result["success"]) {
          alert(result);
          window.location.reload();
        } else {
          alert("failed to fetch" + result["errorMassage"]);
        }
      }
    );
  }

  function handleCreateProfile(){
    navigate("/profile/createprofile")
  }

  function handleProfileClick(profile) {
    ActivateProfile(profile);
  }

  function ActivateProfile(profile) {
    CV.call(
      "setActiveProfile", {
        sessionId: localStorage.getItem("sessionId"),
        udid:localStorage.getItem("udid"),
        profileId:profile.id,
        activate:true,
        deviceName:profile.deviceName,
        licenseKey:profile.sn,
        pin:profile.pin,
        //active:true,
        failIfInUse:false,
    },
    (result) => {
        if (result["success"]) {
          alert(result);
          console.log(result)
        } else {
          alert("failed to fetch " + result["errorMassage"]);
          console.log(result);
        }
      }
    );
  }

  return (
    <>
      <div className="profileGeneralContainer">
        <div className="logocontener">
          <img className="logoTop" src={lgblanco} alt="logoTop" />
        </div>
        <div className="itemProfiles">
          <div className="profilesContener">
            <ul className="profiles">
              {profiles.map((profile) => (
                <li key={profile.id} className="profile" onClick={() => handleProfileClick(profile)}>
                  <div className="profileContent">
                    <img src={`https://cv01.panaccess.com/cv_data_pub/images/${profile.imageId}/v/thumb.png`} alt={`Profile ${profile.name}`} />
                    <p>{profile.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="moreProfile" >
            <GroupAddIcon  onClick={() => handleCreateProfile()} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
