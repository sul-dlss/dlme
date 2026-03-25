import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

const external = [] //"openseadragon"]

const rollupConfig = {
  input: "app/javascript/application.js",
  output: {
    file: "app/assets/builds/application.js",
    format: "esm",
    inlineDynamicImports: true,
    sourcemap: true
  },
  external,
  plugins: [resolve(), commonjs()]
}

export default rollupConfig
