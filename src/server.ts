import chalk from 'chalk';
import app from './app.js';

const PORT = +process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(chalk.bold.green(`Server run on port ${PORT}!`));
});