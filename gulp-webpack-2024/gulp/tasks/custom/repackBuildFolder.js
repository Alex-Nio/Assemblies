/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export const repackBuildFolder = (done) => {
  // Переместим папки из IGNORE в родительские папки
  const repack = () => {
    return app.gulp
      .src('src/template/#IGNORE/**')
      .pipe(app.gulp.dest('src/template/'));
  };

  // Задача для очистки папки #IGNORE
  const cleanIgnoreFolders = () => {
    return plugins.del(['src/template/#IGNORE']);
  };

  // Выполняем задачи последовательно и вызываем done после их завершения
  return app.gulp.series(repack, cleanIgnoreFolders, (seriesDone) => {
    seriesDone();
    done();
  })();
};
