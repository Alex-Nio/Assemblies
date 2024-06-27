import fs from 'fs';
import path from 'path';

const removeImports = async (filePath, importsToRemove) => {
  try {
    // Чтение содержимого файла
    let fileContent = await fs.promises.readFile(filePath, 'utf8');

    for (const fileToRemove of importsToRemove) {
      const importToRemoveRegex = new RegExp(
        `import\\s+['"].*${fileToRemove}['"]\\s*;\\s*\\n*`
      );

      // Фактическое удаление соответствующих строк
      fileContent = fileContent.replace(importToRemoveRegex, '');
    }

    // Сохранение изменений обратно в файл
    await fs.promises.writeFile(filePath, fileContent, 'utf8');
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
};

export const importsIgnore = async (done) => {
  // Указываем путь к файлу imports ignore
  const filePath = '.importsignore';

  // Читаем содержимое файла
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    const importsToRemove = data
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    // Разделяем содержимое файла по символу новой строки и удаляем лишние пробелы
    const filesContent = data.split('\n').map((line) => line.trim());

    // Создаем массив из файлов, прописанных в файле imports ignore
    const filesArray = filesContent.filter((line) => line.length > 0);

    // Выводим массив файлов
    console.log('Files from importsignore:', filesArray);

    // Добавляем код для получения списка путей к js файлам
    const templatePath = 'src/template';

    try {
      // Чтение всех папок в src/template
      const templateFolders = await fs.promises.readdir(templatePath, {
        withFileTypes: true,
      });

      // Фильтрация только папок
      const templateDirectories = templateFolders.filter((dirent) =>
        dirent.isDirectory()
      );

      // Создание массива путей к js файлам
      const jsFilePaths = [];

      // Перебор каждой папки в src/template
      for (const directory of templateDirectories) {
        const publicPath = path.join(templatePath, directory.name, 'public');

        try {
          // Проверка наличия папки public
          await fs.promises.access(publicPath);

          // Чтение содержимого папки public
          const publicFiles = await fs.promises.readdir(publicPath);

          // Фильтрация только js файлов
          const jsFiles = publicFiles.filter((file) => file.endsWith('.js'));

          // Создание полного пути к каждому js файлу и добавление в массив
          jsFiles.forEach((jsFile) => {
            const jsFilePath = path.join(publicPath, jsFile);
            jsFilePaths.push(jsFilePath);
          });
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.warn(`Folder 'public' not found in ${publicPath}`);
          } else {
            console.error(
              `Error reading or accessing public folder in ${publicPath}:`,
              err
            );
          }
        }
      }

      // Вывод массива путей к js файлам (Пути к файлам из которых произошло удаление импорта)
      console.log('JS files in src/template/public:', jsFilePaths);

      // Обработка каждого js файла
      for (const jsFilePath of jsFilePaths) {
        await removeImports(jsFilePath, importsToRemove);
      }

      console.log('Imports removed successfully.');
    } catch (err) {
      console.error('Error reading template folder:', err);
    }
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
  }

  done();
};
