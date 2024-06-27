/* eslint-disable */
import gulp from 'gulp'; // Основной модуль
import { path } from './gulp/config/path.js'; // Импорт путей
import { plugins } from './gulp/config/plugins.js'; // Импорт общих плагинов
import { logger } from './gulp/tasks/core/logger.js'; // Импорт логгирования

// Передаем значения в глобальную переменную
global.app = {
  isDev: process.argv.length === 2 || process.argv[2] === 'dev',
  isBuild: process.argv.length === 2 && process.argv[2] === 'build',
  path: path,
  gulp: gulp,
  plugins: plugins,
};

console.log(
  plugins.chalk.green(
    app.isDev
      ? 'Запуск в режиме разработки'
      : app.isBuild
      ? 'Запуск в режиме сборки для production'
      : ''
  )
);

// Импорт задач
//? Core
import { clean } from './gulp/tasks/core/clean.js';
import { linter } from './gulp/tasks/core/linter.js';
import { server } from './gulp/tasks/core/server.js';
//? Default
import { html } from './gulp/tasks/default/html.js';
import { scss } from './gulp/tasks/default/scss.js';
import { js } from './gulp/tasks/default/js.js';
import { json } from './gulp/tasks/default/json.js';
import { fonts as fontsCompile } from './gulp/tasks/default/fonts.js';
import { images } from './gulp/tasks/default/images.js';
//? Custom
import { cleanComponents } from './gulp/tasks/custom/cleanComponents.js';
import { addShared } from './gulp/tasks/custom/addShared.js';
import { addCommon } from './gulp/tasks/custom/addCommon.js';
import { importsIgnore } from './gulp/tasks/custom/importsIgnore.js';
import { repackBuildFolder } from './gulp/tasks/custom/repackBuildFolder.js';
//? Special
import { zip } from './gulp/tasks/special/zip.js';
import { ftp } from './gulp/tasks/special/ftp.js';

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.data, json);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.componentsScss, scss);
  gulp.watch(path.watch.componentsJs, js);
  gulp.watch(path.watch.componentsJson, html);
  gulp.watch(path.watch.images, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(
  fontsCompile.ttfToWoff,
  fontsCompile.ttfToWoff2,
  fontsCompile.iconFont,
  (done) => {
    logger('fonts done'), done();
  }
);

// Основные задачи
const mainTasks = gulp.series(
  linter,
  gulp.parallel(fonts, json, html, scss, js, images)
);

// Построение сценариев выполнения задач
//* Development
const dev = gulp.series(
  clean,
  (done) => {
    logger('clean done');
    done();
  },
  mainTasks,
  gulp.parallel(watcher, server)
);

const build = gulp.series(clean, repackBuildFolder, cleanComponents, mainTasks);
const deployZIP = gulp.series(clean, mainTasks, zip);
const deployFTP = gulp.series(clean, mainTasks, ftp);
const removeEmpty = gulp.series(cleanComponents);

// Экспорт сценариев
export { dev };
export { build };
export { deployZIP };
export { deployFTP };
export { removeEmpty };

// Выполнение сценария по умолчанию
gulp.task('default', dev);

// Custom commands
gulp.task('repack', repackBuildFolder);
gulp.task('add-c', addCommon); // add-c --common-name //* Создает common компонент
gulp.task('add-s', addShared); // add-s --folder --component-name //* Создает shared компонент

// Removes js imports from global js files
gulp.task('ii', importsIgnore);
