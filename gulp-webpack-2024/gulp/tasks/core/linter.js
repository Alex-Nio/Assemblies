/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';
import { logger } from '../../tasks/core/logger.js';

export function linter(done) {
  return app.gulp
    .src(['src/**/*.js'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(
      plugins.eslint.failAfterError().on('end', () => {
        logger('lint done');
        done();
      })
    );
}
