import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityWrapper = ({ unityContext, portrait }) => {
    let width = "100%";
    let paddingBottom = "56.5%";
    if (portrait) {
        width = "80%";
        paddingBottom = "142.22%";
    }

    const { unityProvider, loadingProgression, requestFullscreen } = useUnityContext(unityContext);
    const enterFullscreen = () => {
        requestFullscreen(true);
    }

    return (
        <div>
            <p>Cứ từ từ, đang tải trò chơi... {Math.round(loadingProgression * 100)}%</p>
            <div className="mb-1">
                <button onClick={enterFullscreen}>Toàn màn hình</button>
            </div>

            <div style={{ position: "relative", margin: "0 auto", width, height: 0, paddingBottom }}>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                    <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
                </div>
            </div>
        </div>
    )
}

export default UnityWrapper;
