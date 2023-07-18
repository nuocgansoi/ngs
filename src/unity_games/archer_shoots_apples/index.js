import React from "react";
import UnityWrapper from "../../components/UnityWrapper";

function ArcherShootsApples() {
  const unityContext = {
    loaderUrl: "/unity_games/archer_shoots_apples/Build/v1.loader.js",
    dataUrl: "/unity_games/archer_shoots_apples/Build/v1.data",
    frameworkUrl: "/unity_games/archer_shoots_apples/Build/v1.framework.js",
    codeUrl: "/unity_games/archer_shoots_apples/Build/v1.wasm",
  };

  return (
    <div>
      <div>Bắn tên: Giữ & kéo chuột trái</div>
      <UnityWrapper unityContext={unityContext} />
    </div>
  )
}

export default ArcherShootsApples;
