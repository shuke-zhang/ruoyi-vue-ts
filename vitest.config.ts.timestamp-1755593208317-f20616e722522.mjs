// vitest.config.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { configDefaults, defineConfig as defineConfig2, mergeConfig } from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/vitest@2.1.9_@types+node@20_794919214f3a0f0eab42a52d0d504a85/node_modules/vitest/dist/config.js";

// vite.config.ts
import { fileURLToPath, URL as URL2 } from "node:url";
import tailwindcss from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/@tailwindcss+vite@4.1.11_vi_729e8aecacf12e77b909017a66a91311/node_modules/@tailwindcss/vite/dist/index.mjs";
import vue from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vi_bca2c022cfe8d120b73ac395720ee049/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.2._9638e9530c44a346dfbe6be63e2bbabf/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/unplugin-auto-import@0.18.6_b115bcf93b20629222d7d73473a090b9/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/unplugin-icons@0.20.2_@vue+compiler-sfc@3.5.17/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/unplugin-icons@0.20.2_@vue+compiler-sfc@3.5.17/node_modules/unplugin-icons/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/unplugin-vue-components@0.2_7f300d82db9355c8089459e884173274/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/unplugin-vue-components@0.2_7f300d82db9355c8089459e884173274/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig, loadEnv } from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/vite@5.4.19_@types+node@20._5195e41bc99bdddaf7fe229681cf2306/node_modules/vite/dist/node/index.js";
import vueDevTools from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/vite-plugin-vue-devtools@7._6b5787be22b7bd4d647cbed768c579f2/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";

// script/iconfont.ts
import fs from "node:fs";
import path from "node:path";
import chokidar from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/chokidar@4.0.3/node_modules/chokidar/esm/index.js";
import ejs from "file:///D:/project/study/github/ruoyi-vue-ts/node_modules/.pnpm/ejs@3.1.10/node_modules/ejs/lib/ejs.js";
var __vite_injected_original_dirname = "D:\\project\\study\\github\\ruoyi-vue-ts\\script";
var debounce = (func, delay = 1e3) => {
  let timer;
  return async (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(async () => {
        await func(...args);
        resolve();
      }, delay);
    });
  };
};
var sourceDir = path.resolve(__vite_injected_original_dirname, "__iconfont");
var targetDir = path.resolve(__vite_injected_original_dirname, "../src/components/icon-font/");
var ignored = [
  /\/src\/iconfont\/demo_index\.html$/,
  /\/src\/iconfont\/demo\.css$/,
  /\/src\/iconfont\/iconfont\.js$/,
  /\/src\/iconfont\/iconfont\.json$/,
  /\/src\/iconfont\/iconfont\.ttf$/,
  /\/src\/iconfont\/iconfont\.woff$/,
  /\/src\/iconfont\/iconfont\.woff2$/
];
function copyFile(sourceFile, targetFile) {
  if (!fs.existsSync(sourceFile)) {
    throw new Error(`Source file "${sourceFile}" does not exist.`);
  }
  const fileContent = fs.readFileSync(sourceFile);
  fs.writeFileSync(targetFile, fileContent);
}
var cssDelimiter = [
  "/* [",
  "] */"
];
var jsDelimiter = [
  "'/* [",
  "] */'"
];
function getEjsData() {
  const css = fs.readFileSync(
    path.resolve(__vite_injected_original_dirname, "__iconfont", "iconfont.css"),
    "utf-8"
  );
  const index = css.indexOf(".icon-");
  const content = css.slice(index, css.length - 1).replace(/\r?\n*$/, "");
  const json = fs.readFileSync(path.resolve(__vite_injected_original_dirname, "__iconfont", "iconfont.json")).toString();
  const typesObject = JSON.parse(json).glyphs.map((e) => `'${e.font_class}'`).sort();
  const types = typesObject.join(" |\n").replace(/\r?\n*$/, "");
  const ejsData = {
    content,
    types
  };
  return ejsData;
}
function getTemplateData(templateName, [openDelimiter, closeDelimiter] = cssDelimiter) {
  const ejsData = getEjsData();
  const _templatePath = path.resolve(__vite_injected_original_dirname, "./__template", templateName);
  const source = fs.readFileSync(_templatePath).toString();
  const template = ejs.compile(source, {
    openDelimiter,
    closeDelimiter
  });
  return template(ejsData);
}
async function copy() {
  try {
    fs.writeFileSync(
      path.resolve(targetDir, "iconfont.css"),
      getTemplateData("iconfont.css"),
      "utf-8"
    );
    fs.writeFileSync(
      path.resolve(targetDir, "iconfont.ts"),
      getTemplateData("iconfont.ts", jsDelimiter)
    );
    await copyFile(
      path.resolve(__vite_injected_original_dirname, "__iconfont", "iconfont.js"),
      path.resolve(targetDir, "iconfont.js")
    );
  } catch (error) {
    console.error(`${error}`);
  }
}
function generatedIcons(isBuild) {
  if (isBuild)
    return;
  console.log("generatedIcons");
  const handler = debounce(copy);
  const watcher = chokidar.watch(sourceDir, {
    ignored
  });
  watcher.on("all", async (type) => {
    if (type !== "addDir" && type !== "unlink" && type !== "unlinkDir")
      handler();
  });
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///D:/project/study/github/ruoyi-vue-ts/vite.config.ts";
var vite_config_default = defineConfig(({ command, mode: mode2 }) => {
  const env = loadEnv(mode2, process.cwd(), "");
  const isBuild = command === "build";
  return {
    define: {
      __DEV__: mode2 === "development",
      __PROD__: mode2 === "production",
      __APP_TITLE__: `"${env.VITE_APP_TITLE}"`,
      __API_URL__: `"${env.VITE_API_URL}"`
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL2("./src", __vite_injected_original_import_meta_url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/global.scss" as global; @use "@/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      generatedIcons(isBuild),
      tailwindcss(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: "./types/auto-imports.d.ts",
        // 指定生成的自动导入声明文件的路径
        dirs: ["./src/hooks", "./src/utils", "./src/store"],
        // 告诉AutoImport插件在哪些目录中自动导入模块。插件会扫描这些目录中的文件，并根据文件内容自动生成导入语句。
        eslintrc: {
          enabled: true,
          // 生成 ESLint 配置，避免 import 报错
          filepath: "./.eslintrc-auto-import.json",
          // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true
          // 自动设置全局变量
        },
        resolvers: [
          ElementPlusResolver({ importStyle: "sass" }),
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon"
          })
        ]
      }),
      Components({
        dirs: ["./src/components"],
        dts: "./types/components.d.ts",
        // 指定生成的组件声明文件的路径
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            prefix: "Icon"
          }),
          ElementPlusResolver({ importStyle: "sass" })
        ]
      }),
      Icons({
        autoInstall: true
      })
    ],
    server: {
      host: "0.0.0.0",
      open: false,
      port: 88
    },
    build: {
      rollupOptions: {
        external: ["fs"]
        // 确保不打包 Node.js 模块
      }
    }
  };
});

// vitest.config.ts
var __vite_injected_original_import_meta_url2 = "file:///D:/project/study/github/ruoyi-vue-ts/vitest.config.ts";
var mode = process.env.NODE_ENV || "development";
var viteConfigResult = vite_config_default({ mode });
var vitest_config_default = mergeConfig(
  viteConfigResult,
  defineConfig2({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath2(new URL("./", __vite_injected_original_import_meta_url2))
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyIsICJzY3JpcHQvaWNvbmZvbnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHN0dWR5XFxcXGdpdGh1YlxcXFxydW95aS12dWUtdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb2plY3RcXFxcc3R1ZHlcXFxcZ2l0aHViXFxcXHJ1b3lpLXZ1ZS10c1xcXFx2aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9qZWN0L3N0dWR5L2dpdGh1Yi9ydW95aS12dWUtdHMvdml0ZXN0LmNvbmZpZy50c1wiO2ltcG9ydCB0eXBlIHsgQ29uZmlnRW52IH0gZnJvbSAndml0ZXN0L2NvbmZpZydcclxuXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzLCBkZWZpbmVDb25maWcsIG1lcmdlQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZydcclxuXHJcbmltcG9ydCB2aXRlQ29uZmlnIGZyb20gJy4vdml0ZS5jb25maWcnXG5cclxuY29uc3QgbW9kZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCdcclxuY29uc3Qgdml0ZUNvbmZpZ1Jlc3VsdCA9IHZpdGVDb25maWcoeyBtb2RlIH0gYXMgQ29uZmlnRW52KVxyXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcclxuICB2aXRlQ29uZmlnUmVzdWx0LFxyXG4gIGRlZmluZUNvbmZpZyh7XHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgICBleGNsdWRlOiBbLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSwgJ2UyZS8qKiddLFxyXG4gICAgICByb290OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vJywgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICB9LFxyXG4gIH0pLFxyXG4pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxzdHVkeVxcXFxnaXRodWJcXFxccnVveWktdnVlLXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXHN0dWR5XFxcXGdpdGh1YlxcXFxydW95aS12dWUtdHNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3Qvc3R1ZHkvZ2l0aHViL3J1b3lpLXZ1ZS10cy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5cclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5cclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXHJcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xyXG5pbXBvcnQgeyBnZW5lcmF0ZWRJY29ucyB9IGZyb20gJy4vc2NyaXB0L2ljb25mb250J1xyXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXHJcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRlZmluZToge1xyXG4gICAgICBfX0RFVl9fOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLFxyXG4gICAgICBfX1BST0RfXzogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nLFxyXG4gICAgICBfX0FQUF9USVRMRV9fOiBgXCIke2Vudi5WSVRFX0FQUF9USVRMRX1cImAsXHJcbiAgICAgIF9fQVBJX1VSTF9fOiBgXCIke2Vudi5WSVRFX0FQSV9VUkx9XCJgLFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIkAvc3R5bGVzL2dsb2JhbC5zY3NzXCIgYXMgZ2xvYmFsOyBAdXNlIFwiQC9zdHlsZXMvZWxlbWVudC9pbmRleC5zY3NzXCIgYXMgKjtgLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgZ2VuZXJhdGVkSWNvbnMoaXNCdWlsZCksXHJcblxyXG4gICAgICB0YWlsd2luZGNzcygpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgdnVlRGV2VG9vbHMoKSxcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxyXG4gICAgICAgIGR0czogJy4vdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLCAvLyBcdTYzMDdcdTVCOUFcdTc1MUZcdTYyMTBcdTc2ODRcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdTc2ODRcdThERUZcdTVGODRcclxuICAgICAgICBkaXJzOiBbJy4vc3JjL2hvb2tzJywgJy4vc3JjL3V0aWxzJywgJy4vc3JjL3N0b3JlJ10sIC8vIFx1NTQ0QVx1OEJDOUF1dG9JbXBvcnRcdTYzRDJcdTRFRjZcdTU3MjhcdTU0RUFcdTRFOUJcdTc2RUVcdTVGNTVcdTRFMkRcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTZBMjFcdTU3NTdcdTMwMDJcdTYzRDJcdTRFRjZcdTRGMUFcdTYyNkJcdTYzQ0ZcdThGRDlcdTRFOUJcdTc2RUVcdTVGNTVcdTRFMkRcdTc2ODRcdTY1ODdcdTRFRjZcdUZGMENcdTVFNzZcdTY4MzlcdTYzNkVcdTY1ODdcdTRFRjZcdTUxODVcdTVCQjlcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTBcdTVCRkNcdTUxNjVcdThCRURcdTUzRTVcdTMwMDJcclxuICAgICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gXHU3NTFGXHU2MjEwIEVTTGludCBcdTkxNERcdTdGNkVcdUZGMENcdTkwN0ZcdTUxNEQgaW1wb3J0IFx1NjJBNVx1OTUxOVxyXG4gICAgICAgICAgZmlsZXBhdGg6ICcuLy5lc2xpbnRyYy1hdXRvLWltcG9ydC5qc29uJywgLy8gRGVmYXVsdCBgLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbmBcclxuICAgICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsIC8vIFx1ODFFQVx1NTJBOFx1OEJCRVx1N0Y2RVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKHsgaW1wb3J0U3R5bGU6ICdzYXNzJyB9KSxcclxuICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxyXG4gICAgICAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgICAgICAgIHByZWZpeDogJ0ljb24nLFxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cyddLFxyXG4gICAgICAgIGR0czogJy4vdHlwZXMvY29tcG9uZW50cy5kLnRzJywgLy8gXHU2MzA3XHU1QjlBXHU3NTFGXHU2MjEwXHU3Njg0XHU3RUM0XHU0RUY2XHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU3Njg0XHU4REVGXHU1Rjg0XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICBwcmVmaXg6ICdJY29uJyxcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnc2FzcycgfSksXHJcbiAgICAgICAgXSxcclxuICAgICAgfSksXHJcbiAgICAgIEljb25zKHtcclxuICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG5cclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICBwb3J0OiA4OCxcclxuICAgIH0sXHJcblxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIGV4dGVybmFsOiBbJ2ZzJ10sIC8vIFx1Nzg2RVx1NEZERFx1NEUwRFx1NjI1M1x1NTMwNSBOb2RlLmpzIFx1NkEyMVx1NTc1N1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxzdHVkeVxcXFxnaXRodWJcXFxccnVveWktdnVlLXRzXFxcXHNjcmlwdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxzdHVkeVxcXFxnaXRodWJcXFxccnVveWktdnVlLXRzXFxcXHNjcmlwdFxcXFxpY29uZm9udC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdC9zdHVkeS9naXRodWIvcnVveWktdnVlLXRzL3NjcmlwdC9pY29uZm9udC50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXHJcblxyXG5pbXBvcnQgY2hva2lkYXIgZnJvbSAnY2hva2lkYXInXHJcbmltcG9ydCBlanMgZnJvbSAnZWpzJ1xyXG5cclxudHlwZSBEZWJvdW5jZUZ1bmN0aW9uID0gPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4oXHJcbiAgZnVuYzogVCxcclxuICBkZWxheT86IG51bWJlclxyXG4pID0+ICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiB2b2lkXHJcblxyXG5leHBvcnQgY29uc3QgZGVib3VuY2U6IERlYm91bmNlRnVuY3Rpb24gPSAoZnVuYywgZGVsYXkgPSAxMDAwKSA9PiB7XHJcbiAgbGV0IHRpbWVyOiBOb2RlSlMuVGltZW91dFxyXG5cclxuICByZXR1cm4gYXN5bmMgKC4uLmFyZ3MpID0+IHtcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSkgPT4ge1xyXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGZ1bmMoLi4uYXJncylcclxuICAgICAgICByZXNvbHZlKClcclxuICAgICAgfSwgZGVsYXkpXHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc291cmNlRGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ19faWNvbmZvbnQnKVxyXG5jb25zdCB0YXJnZXREaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL2NvbXBvbmVudHMvaWNvbi1mb250LycpXHJcblxyXG5jb25zdCBpZ25vcmVkID0gW1xyXG4gIC9cXC9zcmNcXC9pY29uZm9udFxcL2RlbW9faW5kZXhcXC5odG1sJC8sXHJcbiAgL1xcL3NyY1xcL2ljb25mb250XFwvZGVtb1xcLmNzcyQvLFxyXG4gIC9cXC9zcmNcXC9pY29uZm9udFxcL2ljb25mb250XFwuanMkLyxcclxuICAvXFwvc3JjXFwvaWNvbmZvbnRcXC9pY29uZm9udFxcLmpzb24kLyxcclxuICAvXFwvc3JjXFwvaWNvbmZvbnRcXC9pY29uZm9udFxcLnR0ZiQvLFxyXG4gIC9cXC9zcmNcXC9pY29uZm9udFxcL2ljb25mb250XFwud29mZiQvLFxyXG4gIC9cXC9zcmNcXC9pY29uZm9udFxcL2ljb25mb250XFwud29mZjIkLyxcclxuXVxyXG5cclxuZnVuY3Rpb24gY29weUZpbGUoc291cmNlRmlsZTogc3RyaW5nLCB0YXJnZXRGaWxlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAvLyBcdTY4QzBcdTY3RTVcdTZFOTBcdTY1ODdcdTRFRjZcdTY2MkZcdTU0MjZcdTVCNThcdTU3MjhcclxuICBpZiAoIWZzLmV4aXN0c1N5bmMoc291cmNlRmlsZSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgU291cmNlIGZpbGUgXCIke3NvdXJjZUZpbGV9XCIgZG9lcyBub3QgZXhpc3QuYClcclxuICB9XHJcblxyXG4gIC8vIFx1OEJGQlx1NTNENlx1NkU5MFx1NjU4N1x1NEVGNlx1NTE4NVx1NUJCOSAoXHU0RjVDXHU0RTNBQnVmZmVyXHU1OTA0XHU3NDA2XHU0RThDXHU4RkRCXHU1MjM2XHU2NTg3XHU0RUY2KVxyXG4gIGNvbnN0IGZpbGVDb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHNvdXJjZUZpbGUpXHJcblxyXG4gIC8vIFx1NTE5OVx1NTE2NVx1NzZFRVx1NjgwN1x1NjU4N1x1NEVGNiAoQnVmZmVyXHU2NjJGVWludDhBcnJheVx1NzY4NFx1NUI1MFx1N0M3Qlx1RkYwQ1x1NkVFMVx1OERCM0FycmF5QnVmZmVyVmlld1x1ODk4MVx1NkM0MilcclxuICBmcy53cml0ZUZpbGVTeW5jKHRhcmdldEZpbGUsIGZpbGVDb250ZW50IGFzIHVua25vd24gYXMgVWludDhBcnJheSlcclxufVxyXG5cclxuY29uc3QgY3NzRGVsaW1pdGVyID0gW1xyXG4gICcvKiBbJyxcclxuICAnXSAqLycsXHJcbl0gYXMgW3N0cmluZywgc3RyaW5nXVxyXG5cclxuY29uc3QganNEZWxpbWl0ZXIgPSBbXHJcbiAgJ1xcJy8qIFsnLFxyXG4gICddICovXFwnJyxcclxuXSBhcyBbc3RyaW5nLCBzdHJpbmddXHJcblxyXG5mdW5jdGlvbiBnZXRFanNEYXRhKCkge1xyXG4gIGNvbnN0IGNzcyA9IGZzLnJlYWRGaWxlU3luYyhcclxuICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdfX2ljb25mb250JywgJ2ljb25mb250LmNzcycpLFxyXG4gICAgJ3V0Zi04JyxcclxuICApXHJcbiAgY29uc3QgaW5kZXggPSBjc3MuaW5kZXhPZignLmljb24tJylcclxuICBjb25zdCBjb250ZW50ID0gY3NzLnNsaWNlKGluZGV4LCBjc3MubGVuZ3RoIC0gMSkucmVwbGFjZSgvXFxyP1xcbiokLywgJycpXHJcbiAgLy8gdHlwZXNcclxuICBjb25zdCBqc29uID0gZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdfX2ljb25mb250JywgJ2ljb25mb250Lmpzb24nKSkudG9TdHJpbmcoKVxyXG4gIGNvbnN0IHR5cGVzT2JqZWN0ID0gKEpTT04ucGFyc2UoanNvbikuZ2x5cGhzIGFzIHsgZm9udF9jbGFzczogc3RyaW5nIH1bXSkubWFwKGUgPT4gYCcke2UuZm9udF9jbGFzc30nYCkuc29ydCgpXHJcbiAgY29uc3QgdHlwZXMgPSB0eXBlc09iamVjdC5qb2luKCcgfFxcbicpLnJlcGxhY2UoL1xccj9cXG4qJC8sICcnKVxyXG4gIGNvbnN0IGVqc0RhdGEgPSB7XHJcbiAgICBjb250ZW50LFxyXG4gICAgdHlwZXMsXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWpzRGF0YVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRUZW1wbGF0ZURhdGEodGVtcGxhdGVOYW1lOiBzdHJpbmcsIFtvcGVuRGVsaW1pdGVyLCBjbG9zZURlbGltaXRlcl06IFtzdHJpbmcsIHN0cmluZ10gPSBjc3NEZWxpbWl0ZXIpIHtcclxuICBjb25zdCBlanNEYXRhID0gZ2V0RWpzRGF0YSgpXHJcbiAgY29uc3QgX3RlbXBsYXRlUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL19fdGVtcGxhdGUnLCB0ZW1wbGF0ZU5hbWUpXHJcbiAgY29uc3Qgc291cmNlID0gZnMucmVhZEZpbGVTeW5jKF90ZW1wbGF0ZVBhdGgpLnRvU3RyaW5nKClcclxuICBjb25zdCB0ZW1wbGF0ZSA9IGVqcy5jb21waWxlKHNvdXJjZSwge1xyXG4gICAgb3BlbkRlbGltaXRlcixcclxuICAgIGNsb3NlRGVsaW1pdGVyLFxyXG4gIH0pXHJcbiAgcmV0dXJuIHRlbXBsYXRlKGVqc0RhdGEpXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNvcHkoKSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIGZvbnRzXHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKFxyXG4gICAgICBwYXRoLnJlc29sdmUodGFyZ2V0RGlyLCAnaWNvbmZvbnQuY3NzJyksXHJcbiAgICAgIGdldFRlbXBsYXRlRGF0YSgnaWNvbmZvbnQuY3NzJyksXHJcbiAgICAgICd1dGYtOCcsXHJcbiAgICApXHJcblxyXG4gICAgLy8gdHlwZXNcclxuICAgIGZzLndyaXRlRmlsZVN5bmMoXHJcbiAgICAgIHBhdGgucmVzb2x2ZSh0YXJnZXREaXIsICdpY29uZm9udC50cycpLFxyXG4gICAgICBnZXRUZW1wbGF0ZURhdGEoJ2ljb25mb250LnRzJywganNEZWxpbWl0ZXIpLFxyXG4gICAgKVxyXG5cclxuICAgIC8vIC8vIFx1NUI1N1x1NEY1M1xyXG5cclxuICAgIGF3YWl0IGNvcHlGaWxlKFxyXG4gICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnX19pY29uZm9udCcsICdpY29uZm9udC5qcycpLFxyXG4gICAgICBwYXRoLnJlc29sdmUodGFyZ2V0RGlyLCAnaWNvbmZvbnQuanMnKSxcclxuICAgIClcclxuICB9XHJcbiAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGAke2Vycm9yfWApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVkSWNvbnMoaXNCdWlsZDogYm9vbGVhbikge1xyXG4gIGlmIChpc0J1aWxkKVxyXG4gICAgcmV0dXJuXHJcbiAgY29uc29sZS5sb2coJ2dlbmVyYXRlZEljb25zJylcclxuXHJcbiAgY29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGNvcHkpXHJcblxyXG4gIGNvbnN0IHdhdGNoZXIgPSBjaG9raWRhci53YXRjaChzb3VyY2VEaXIsIHtcclxuICAgIGlnbm9yZWQsXHJcbiAgfSlcclxuXHJcbiAgd2F0Y2hlci5vbignYWxsJywgYXN5bmMgKHR5cGUpID0+IHtcclxuICAgIGlmICh0eXBlICE9PSAnYWRkRGlyJyAmJiB0eXBlICE9PSAndW5saW5rJyAmJiB0eXBlICE9PSAndW5saW5rRGlyJylcclxuICAgICAgaGFuZGxlcigpXHJcbiAgfSlcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxpQkFBQUEsc0JBQXFCO0FBRTlCLFNBQVMsZ0JBQWdCLGdCQUFBQyxlQUFjLG1CQUFtQjs7O0FDSjhPLFNBQVMsZUFBZSxPQUFBQyxZQUFXO0FBRTNVLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFFdkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8saUJBQWlCOzs7QUNaaVMsT0FBTyxRQUFRO0FBQ3hVLE9BQU8sVUFBVTtBQUVqQixPQUFPLGNBQWM7QUFDckIsT0FBTyxTQUFTO0FBSmhCLElBQU0sbUNBQW1DO0FBV2xDLElBQU0sV0FBNkIsQ0FBQyxNQUFNLFFBQVEsUUFBUztBQUNoRSxNQUFJO0FBRUosU0FBTyxVQUFVLFNBQVM7QUFDeEIsaUJBQWEsS0FBSztBQUNsQixXQUFPLElBQUksUUFBYyxDQUFDLFlBQVk7QUFDcEMsY0FBUSxXQUFXLFlBQVk7QUFDN0IsY0FBTSxLQUFLLEdBQUcsSUFBSTtBQUNsQixnQkFBUTtBQUFBLE1BQ1YsR0FBRyxLQUFLO0FBQUEsSUFDVixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBRUEsSUFBTSxZQUFZLEtBQUssUUFBUSxrQ0FBVyxZQUFZO0FBQ3RELElBQU0sWUFBWSxLQUFLLFFBQVEsa0NBQVcsOEJBQThCO0FBRXhFLElBQU0sVUFBVTtBQUFBLEVBQ2Q7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxF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Q2YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFFQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixVQUFVLENBQUMsSUFBSTtBQUFBO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRDFGMEwsSUFBTUMsNENBQTJDO0FBUTVPLElBQU0sT0FBTyxRQUFRLElBQUksWUFBWTtBQUNyQyxJQUFNLG1CQUFtQixvQkFBVyxFQUFFLEtBQUssQ0FBYztBQUN6RCxJQUFPLHdCQUFRO0FBQUEsRUFDYjtBQUFBLEVBQ0FDLGNBQWE7QUFBQSxJQUNYLE1BQU07QUFBQSxNQUNKLGFBQWE7QUFBQSxNQUNiLFNBQVMsQ0FBQyxHQUFHLGVBQWUsU0FBUyxRQUFRO0FBQUEsTUFDN0MsTUFBTUMsZUFBYyxJQUFJLElBQUksTUFBTUYseUNBQWUsQ0FBQztBQUFBLElBQ3BEO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbImZpbGVVUkxUb1BhdGgiLCAiZGVmaW5lQ29uZmlnIiwgIlVSTCIsICJtb2RlIiwgIlVSTCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgImRlZmluZUNvbmZpZyIsICJmaWxlVVJMVG9QYXRoIl0KfQo=
