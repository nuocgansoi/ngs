import React from "react";
import { useUnityContext } from "react-unity-webgl";
import UnityWrapper from "../../components/UnityWrapper";

function BanChim() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/unity_games/ban_chim/Build/v1.loader.js",
    dataUrl: "/unity_games/ban_chim/Build/v1.data",
    frameworkUrl: "/unity_games/ban_chim/Build/v1.framework.js",
    codeUrl: "/unity_games/ban_chim/Build/v1.wasm",
  });

  return (
    <div>
      <div>Hãy bắn những chú chim đang bay ngang qua :v</div>
      <div>
        {`Phím bắn: Chuột trái`}
      </div>
      <UnityWrapper unityProvider={unityProvider} />
    </div>
  )
}

export default BanChim;
