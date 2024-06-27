import gulp from 'gulp';
import file from 'gulp-file';
import fs from 'fs';

// Add shared component task
export const addShared = (done) => {
  const args = process.argv.slice(2);

  // Если аргументов нет
  if (args.length <= 1 || !args[0] || !args[1]) {
    console.error('Укажите аргументы в формате: --папка --название компонента');
    return;
  }

  const folder = args[1].replace('--', '');
  const folderName = folder.charAt(0).toUpperCase() + folder.slice(1);
  const component = args[2].replace('--', '');
  const componentName = component.charAt(0).toLowerCase() + component.slice(1);

  console.log(`Название целевой папки Shared компонента: ${folderName}`);
  console.log(`Название компонента: ${componentName}`);

  const shared = `src/components/Shared/${folderName}`;
  const sharedUi = `${shared}/${componentName}`;

  const addSharedComponent = () => {
    // Проверить существование директории Shared и создать её, если она не существует
    if (!fs.existsSync(shared)) {
      fs.mkdirSync(shared);
    }

    // Проверить существование директории Shared/componentName и создать её, если она не существует
    if (!fs.existsSync(`${shared}/${componentName}`)) {
      fs.mkdirSync(`${shared}/${componentName}`);
    }

    // Проверить существование директории sharedUi и создать её, если она не существует
    if (!fs.existsSync(sharedUi)) {
      fs.mkdirSync(sharedUi);
    }

    // Создать файлы my-component.html, my-component.scss в папке ui, index.js
    file(`${componentName}.html`, '', { src: true }).pipe(
      gulp.dest(`${sharedUi}`)
    );

    file(`${componentName}.scss`, '', { src: true }).pipe(
      gulp.dest(`${sharedUi}`)
    );

    file(`${componentName}.js`, '', { src: true }).pipe(
      gulp.dest(`${shared}/${componentName}`)
    );
  };

  if (folderName && componentName) {
    addSharedComponent();
  } else {
    console.error('Укажите аргументы в формате: --папка --название компонента');
  }

  done();
};
