import { Plugin } from "vite";
import { transform, unpluginTransform } from "./transform";
import { build } from "./build";
import { importBuild } from "vite-plugin-import-build";
import { getImportBuildCode } from "./getImportBuildCode";

export default unpluginTransform.webpack;

function plugin(): Plugin[] {
  return [
    {
      name: "telefunc:config",
      config: () => ({
        ssr: { external: ["telefunc"] },
        optimizeDeps: { include: ["telefunc/client"] },
      }),
    },
    unpluginTransform.vite(),
    // transform(),
    build(),
    importBuild(getImportBuildCode()),
  ];
}
