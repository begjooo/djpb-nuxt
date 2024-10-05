import * as fs from "node:fs";

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log(`nuxt plugins: initiate local dir`);
  if(!fs.existsSync(`./public`)){
    console.log(`create ./public directory`);
    fs.mkdirSync(`./public`);
  };
  if(!fs.existsSync(`./public/tmp`)){
    console.log(`create ./public/tmp directory`);
    fs.mkdirSync(`./public/tmp`);
  };
});