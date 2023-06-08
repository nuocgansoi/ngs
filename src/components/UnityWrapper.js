import React from "react";
import { Unity } from "react-unity-webgl";

const UnityWrapper = ({unityProvider}) => {
    return (
        <div style={{ position: "relative", width: "100%", height: 0, paddingBottom: "56.5%" }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    )
}

export default UnityWrapper;
