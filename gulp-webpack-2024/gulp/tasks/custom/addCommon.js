import gulp from 'gulp';
import file from 'gulp-file';
import fs from 'fs';

export const addCommon = (done) => {
  const args = process.argv.slice(2);

  // Если аргументов нет, или если первый аргумент не существует
  if (args.length <= 1 || !args[0] || !args[1]) {
    console.error('Укажите аргументы в формате: --папка --название компонента');
    return;
  }

  const common = args[1].replace('--', '');
  const commonName = common.charAt(0).toLowerCase() + common.slice(1);

  // console.log(`Название целевой папки Common компонента: ${CommonName}`);

  const commonFolder = `src/components/Common/${commonName}`;

  const addCommon = () => {
    // Проверить существование директории Common и создать её, если она не существует
    if (!fs.existsSync(commonFolder)) {
      fs.mkdirSync(commonFolder);
    }

    // Проверить существование директории Common/CommonName и создать её, если она не существует
    if (!fs.existsSync(`${commonFolder}`)) {
      fs.mkdirSync(`${commonFolder}`);
    }

    // Создать файлы my-component.html, my-component.scss в папке ui, index.js
    file(`${commonName}.html`, '', { src: true }).pipe(
      gulp.dest(`${commonFolder}`)
    );

    file(`${commonName}.scss`, '', { src: true }).pipe(
      gulp.dest(`${commonFolder}`)
    );

    file(`${commonName}.js`, '', { src: true }).pipe(
      gulp.dest(`${commonFolder}`)
    );
  };

  if (common && commonName) {
    addCommon();
  } else {
    console.error('Укажите аргументы в формате: --папка --название компонента');
  }

  done();
};
