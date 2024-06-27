/* eslint-disable */
import { logger } from './../core/logger.js';
import { plugins } from '../../config/plugins.js';

export const images = (done) => {
  // Инициализируем массивы для хранения размеров до и после оптимизации
  const sizesBefore = [];
  const sizesAfter = [];

  return (
    app.gulp
      .src(app.path.src.images)
      .pipe(
        plugins.plumber(
          plugins.notify.onError({
            title: 'IMAGES',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(plugins.newer(app.path.build.images))
      .pipe(app.gulp.src(app.path.src.images))
      // Измеряем размер изображений до оптимизации
      .pipe(
        plugins.size({
          title: 'Images Before Optimization',
          showFiles: false,
          pretty: true,
          // Добавляем размер до оптимизации в массив
          callback: (details) => {
            sizesBefore.push(details.total);
          },
        })
      )
      .pipe(
        plugins.if(
          app.isBuild,
          plugins.imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 4, // 0 to 7
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.images))
      // Измеряем размер изображений после оптимизации
      .pipe(
        plugins.size({
          title: 'Images After Optimization',
          showFiles: false,
          pretty: true,
          callback: (details) => {
            sizesAfter.push(details.total);
          },
        })
      )
      .pipe(plugins.browserSync.stream())
      .on('end', () => {
        logger('images done');
        done();
      })
  );
};
