// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/styles/js/`,
    css: `${buildFolder}/styles/css/`,
    html: `${buildFolder}/`,
    pages: `${buildFolder}/`,
    images: `${buildFolder}/assets/images/`,
    fonts: `${buildFolder}/assets/fonts/`,
    files: `${buildFolder}/files/`,
    data: `${buildFolder}/styles/json/`,
  },
  src: {
    images: `${srcFolder}/app/assets/images/**/*.{jpg,jpeg,png,gif,webp,ico}`,
    svg: `${srcFolder}/app/assets/images/**/*.svg`,
    svgicons: `${srcFolder}/app/assets/images/svg/*.svg`,
    pages: `${srcFolder}/template/**/views/*.html`,
    html: `${srcFolder}/*.html`,
    js: `${srcFolder}/template/**/public/*.js`,
    scss: `${srcFolder}/template/**/public/*.scss`,
    componentsJs: `${srcFolder}/components/**/*.js`,
    componentsJson: `${srcFolder}/components/**/*.json`,
    componentsScss: `${srcFolder}/components/**/*.scss`,
    files: './#files/**/*.*',
    data: `${srcFolder}/app/js/data/*.json`,
  },
  watch: {
    images: `${srcFolder}/app/assets/images/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    pages: `${srcFolder}/html/views/*.html`,
    html: `${srcFolder}/**/*.html`,
    js: `${srcFolder}/**/*.js`,
    scss: `${srcFolder}/**/*.scss`,
    componentsJs: `${srcFolder}/components/**/*.js`,
    componentsJson: `${srcFolder}/components/**/*.json`,
    componentsScss: `${srcFolder}/components/**/*.scss`,
    files: './#files/**/*.*',
    data: `${srcFolder}/app/js/data/*.json`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: 'test',
};
