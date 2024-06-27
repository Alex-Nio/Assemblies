/* eslint-disable */
import { plugins } from './gulp/config/plugins.js';
import * as pathNode from 'path';
import fs from 'fs';

const srcFolder = 'src';
const buildFolder = 'dist';

const path = {
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(buildFolder),
};

const getPageEntries = () => {
  const folderPattern = 'src/template/!(*#IGNORE)/';
  const pageFolders = plugins.glob.sync(folderPattern);

  // Создаем объект для хранения результатов
  const pageEntries = {};

  // Обходим каждую папку в pageFolders
  pageFolders.forEach((folder) => {
    // Получаем название папки (последний элемент после разделителя)
    const folderName = folder.split(pathNode.sep).pop();

    // Формируем путь к папке страницы
    const pagesPath = pathNode.resolve(
      `${path.src}/template/${folderName}/public/`
    );

    // Получаем список файлов в папке страницы
    const pages = fs.readdirSync(pagesPath);

    // Обходим каждый файл в папке страницы
    pages.forEach((page) => {
      if (page !== '#IGNORE' && pathNode.extname(page) === '.js') {
        // Проверяем, что это файл с расширением .js
        // Формируем ключ (название файла без расширения) и значение (полный путь к файлу)
        const pageName = page.split('.').slice(0, -1).join('.');
        const pageFilePath = pathNode.resolve(`${pagesPath}/${page}`);

        // Добавляем запись в объект pageEntries
        pageEntries[pageName] = pageFilePath;
      }
    });
  });

  return pageEntries;
};

// Пример использования
// const entries = getPageEntries();
// console.log(entries);

export const webpackConfig = (isMode) => ({
  entry: {
    ...getPageEntries(),
  },
  mode: isMode ? 'development' : 'production',
  output: {
    path: `${path.build}/js`,
    filename: '[name].min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
