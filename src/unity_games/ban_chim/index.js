import React from "react";
import UnityWrapper from "../../components/UnityWrapper";

function BanChim() {
  const unityContext = {
    loaderUrl: "/unity_games/ban_chim/Build/v1.1.loader.js",
    dataUrl: "/unity_games/ban_chim/Build/v1.1.data",
    frameworkUrl: "/unity_games/ban_chim/Build/v1.1.framework.js",
    codeUrl: "/unity_games/ban_chim/Build/v1.1.wasm",
  };

  return (
    <div>
      <div>Hãy bắn những chú chim đang bay ngang qua :v</div>
      <div>
        {`Phím bắn: Chuột trái`}
      </div>
      <UnityWrapper unityContext={unityContext} />
    </div>
  )
}

export default BanChim;
