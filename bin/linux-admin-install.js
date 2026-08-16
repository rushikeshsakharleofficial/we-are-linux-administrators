#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SKILLS = path.join(ROOT, 'skills');
const pkg = require(path.join(ROOT, 'package.json'));
const REPO = 'rushikeshsakharleofficial/we-are-linux-administrators';
const PLUGIN = 'linux-admin@we-are-linux-administrators';

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: false });
  if (r.error || r.status !== 0) process.exit(r.status || 1);
}

function has(cmd) {
  try { execSync(`${cmd} --version`, { stdio: 'pipe' }); return true; } catch { return false; }
}

function skillDirs() {
  if (!fs.existsSync(SKILLS)) throw new Error(`skills directory missing from package: ${SKILLS}`);
  return fs.readdirSync(SKILLS, { withFileTypes: true })
    .filter(e => e.isDirectory() && fs.existsSync(path.join(SKILLS, e.name, 'SKILL.md')))
    .map(e => e.name)
    .sort();
}

function installTo(target, force) {
  fs.mkdirSync(target, { recursive: true });
  let installed = 0;
  let skipped = 0;
  for (const name of skillDirs()) {
    const src = path.join(SKILLS, name);
    const dst = path.join(target, name);
    if (fs.existsSync(dst) && !force) { skipped++; continue; }
    fs.cpSync(src, dst, { recursive: true, force: true });
    installed++;
  }
  console.log(`  ${target}: ${installed} installed/refreshed, ${skipped} skipped`);
}

function installGlobal(force) {
  const home = os.homedir();
  console.log('\nInstalling linux-admin skills into user-level discovery paths:');
  installTo(path.join(home, '.agents', 'skills'), force);
  installTo(path.join(home, '.claude', 'skills'), force);
  console.log('\nUse --force only when you intentionally want to refresh existing skill directories.');
  console.log('See docs/LOCAL_GLOBAL_AGENT_SETUP.md for other agent instruction paths.\n');
}

function installClaude() {
  if (!has('claude')) {
    console.error('Claude Code not found. Install Claude Code first, or use `linux-admin install-global` for user-level skills.');
    process.exit(1);
  }
  console.log('Adding Claude Code marketplace source...');
  run('claude', ['plugin', 'marketplace', 'add', REPO]);
  console.log('Installing linux-admin Claude Code plugin...');
  run('claude', ['plugin', 'install', PLUGIN]);
  console.log('\nDone. Reload plugins in Claude Code with /reload-plugins.\n');
}

function status() {
  const dirs = skillDirs();
  console.log(`linux-admin ${pkg.version}`);
  console.log(`package root: ${ROOT}`);
  console.log(`canonical skills: ${SKILLS}`);
  console.log(`detected skills: ${dirs.length}`);
  console.log(`master router: ${path.join(SKILLS, 'using-linux-admin', 'SKILL.md')}`);
}

function help() {
  console.log(`\nlinux-admin ${pkg.version}\n
Commands:
  linux-admin status                  Show installed package and skill paths
  linux-admin install-global          Copy skills to ~/.agents/skills and ~/.claude/skills
  linux-admin install-global --force  Refresh existing installed skill directories
  linux-admin install-claude          Install the Claude Code plugin from GitHub
  linux-admin paths                   Alias for status

With no command, linux-admin preserves the original Claude installer behavior when Claude Code is available; otherwise it shows this help.
See docs/LOCAL_GLOBAL_AGENT_SETUP.md for per-agent local/global instruction paths.\n`);
}

const args = process.argv.slice(2);
const cmd = args[0];

try {
  if (cmd === 'status' || cmd === 'paths') status();
  else if (cmd === 'install-global') installGlobal(args.includes('--force'));
  else if (cmd === 'install-claude') installClaude();
  else if (!cmd && has('claude')) installClaude();
  else help();
} catch (err) {
  console.error(`linux-admin: ${err.message}`);
  process.exit(1);
}
