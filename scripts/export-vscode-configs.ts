import fs from 'fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import os from 'os';
import { __dirname } from './polyfills';

async function exportVscodePlugins() {
  const exportProcess = spawn('code-insiders', ['--list-extensions']);
  let plugins = '';
  exportProcess.stdout.on('data', data => {
    plugins += data.toString();
  });

  exportProcess.on('close', async () => {
    fs.writeFile(
      path.resolve(__dirname, '../configs/vscode-plugins.txt'),
      plugins,
      'utf-8',
    );
  });
}

async function exportVscodeSettings() {
  const settingsPath = path.join(
    os.homedir(),
    'Library',
    'Application Support',
    'Code - Insiders',
    'User',
    'settings.json',
  );
  const config = await fs.readFile(settingsPath, { encoding: 'utf-8' });
  fs.writeFile(
    path.resolve(__dirname, '../configs/vscode-settings.json'),
    config,
    'utf-8',
  );
}

exportVscodePlugins();
exportVscodeSettings();
