/*eslint indent: "off"*/
import chalk from 'chalk';

export const logger = (action) => {
  switch (action) {
    case 'clean done':
      console.log(
        chalk.white.bgYellow.bold(
          '---Директория Dist очищена от старых файлов---'
        )
      );
      break;
    case 'lint done':
      console.log(
        chalk.white.bgYellow.bold('---Выполнена проверка линтером---')
      );
      break;
    case 'fonts done':
      console.log(chalk.white.bgYellow.bold('---Шрифты скомпилированы---'));
      break;
    case 'images done':
      console.log(
        chalk.white.bgYellow.bold('---Изображения оптимизированы---')
      );
      break;
  }
};
