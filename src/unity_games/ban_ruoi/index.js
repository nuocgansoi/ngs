import React from "react";
import UnityWrapper from "../../components/UnityWrapper";

function BanRuoi() {
  const unityContext = {
    loaderUrl: "/unity_games/ban_ruoi/Build/v1.loader.js",
    dataUrl: "/unity_games/ban_ruoi/Build/v1.data",
    frameworkUrl: "/unity_games/ban_ruoi/Build/v1.framework.js",
    codeUrl: "/unity_games/ban_ruoi/Build/v1.wasm",
  };

  return (
    <div>
      <div>
        {`Phím di chuyển: A D || <- ->`}
      </div>
      <div>
        {`Phím bắn: Space`}
      </div>
      <UnityWrapper unityContext={unityContext} portrait />
    </div>
  )
}

export default BanRuoi;
