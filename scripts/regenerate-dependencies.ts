import { to } from 'await-to-js';
import chalk from 'chalk';
import fs from 'fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import ora from 'ora';
import { rimraf } from 'rimraf';

async function deleteNodeModules(dir: string) {
  const nodeModulesPath = path.join(dir, 'node_modules');
  const lockFilePath = path.join(dir, 'pnpm-lock.yaml');
  if (fs.existsSync(nodeModulesPath)) {
    const spinner = ora(`removing : ${nodeModulesPath}`).start();
    const [err] = await to(rimraf(nodeModulesPath));
    if (err) {
      spinner.warn(`remove ${nodeModulesPath} ${chalk.bgRedBright('failed')}`);
    } else {
      spinner.succeed(
        `remove ${nodeModulesPath} ${chalk.bgGreenBright('success')}`,
      );
    }
  }

  if (fs.existsSync(lockFilePath)) {
    const spinner = ora(`removing : ${lockFilePath}`).start();
    const [err] = await to(rimraf(lockFilePath));
    if (err) {
      spinner.warn(`remove ${lockFilePath} ${chalk.bgRedBright('failed')}`);
    } else {
      spinner.succeed(
        `remove ${lockFilePath} ${chalk.bgGreenBright('success')}`,
      );
    }
  }

  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      deleteNodeModules(fullPath);
    }
  });
}

async function installDependencies() {
  const pnpmProcess = spawn('pnpm', ['install']);
  pnpmProcess.stdout.on('data', data => {
    console.log(data.toString());
  });
  pnpmProcess.stderr.on('data', data => {
    console.error(data.toString());
  });
}

const rootDir = process.cwd();
await deleteNodeModules(rootDir);
installDependencies();
