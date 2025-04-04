#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Get the project root directory
const rootDir = process.cwd();

try {
  // Read version from package.json
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);
  const version = packageJson.version;

  // Get git information
  let branch = 'unknown';
  let commit = 'unknown';

  try {
    branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch (gitError) {
    console.warn('Warning: Unable to get git information:', gitError.message);
    console.warn('Using default values for branch and commit.');
  }

  // Create version object
  const versionInfo = {
    version,
    branch,
    commit,
    build_at: new Date().toISOString(),
  };

  // Ensure public directory exists
  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write to public directory
  const outputPath = path.join(publicDir, 'version.json');
  fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));

  console.log(`Version file generated at ${outputPath}`);
  console.log(`Version: ${version}`);
  console.log(`Branch: ${branch}`);
  console.log(`Commit: ${commit}`);
  console.log(`Build at: ${versionInfo.build_at}`);
} catch (error) {
  console.error('Error generating version file:', error);
  process.exit(1);
}
