import repl from 'repl';

import config from '../src/utils/config.js';
import app from '../src/app.js';
import User from '../src/models/user.js';
import PizzaModel from '../src/models/pizzamodel.js';
import UserService from '../src/services/user.js';
import PizzaModelService from '../src/services/pizzamodel.js';

// used for testing in REPL
const main = async () => {

  process.stdout.write('Express app initialized.\n');
  process.stdout.write('Autoimported modules: config, app, models, services\n');

  const r = repl.start('> ');
  r.context.config = config;
  r.context.app = app;
  r.context.models = {
    User,
    PizzaModel,
  };
  r.context.services = {
    UserService,
    PizzaModelService,
  };

  r.on('exit', () => {
    process.exit();
  });

  r.setupHistory('.shell_history', () => {});
};

main();
