#!/usr/bin/env node
'use strict';

const { execSync, spawnSync } = require('child_process');

const REPO = 'rushikeshsakharleofficial/we-are-linux-administrators';
const PLUGIN = 'linux-admin@we-are-linux-administrators';

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: false });
  if (r.error || r.status !== 0) {
    process.stderr.write(`\nFailed: ${cmd} ${args.join(' ')}\n`);
    process.exit(r.status || 1);
  }
}

function hasClaudeCode() {
  try { execSync('claude --version', { stdio: 'pipe' }); return true; } catch { return false; }
}

console.log('\n linux-admin — Claude Code plugin installer\n');

if (!hasClaudeCode()) {
  console.error(' Claude Code not found. Install it first:\n   https://claude.ai/download\n');
  process.exit(1);
}

console.log(' Adding marketplace source...');
run('claude', ['plugin', 'marketplace', 'add', REPO]);

console.log(' Installing linux-admin...');
run('claude', ['plugin', 'install', PLUGIN]);

console.log('\n Done! Reload plugins in Claude Code:\n');
console.log('   /reload-plugins\n');
console.log(' Then try:\n');
console.log('   /linux-admin:network can ping 8.8.8.8 but DNS fails\n');
