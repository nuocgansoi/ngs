import React from "react";
import { Unity } from "react-unity-webgl";

const UnityWrapper = ({unityProvider, portrait}) => {
    let width = "100%";
    let paddingBottom = "56.5%";
    if (portrait) {
        width = "80%";
        paddingBottom = "142.22%";
    }

    return (
        <div style={{ position: "relative", margin: "0 auto", width, height: 0, paddingBottom }}>
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    )
}

export default UnityWrapper;
