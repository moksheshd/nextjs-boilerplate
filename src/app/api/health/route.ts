import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Health check endpoint
 *
 * This endpoint returns a 200 OK response with a JSON payload containing:
 * - status: "ok" to indicate the service is running
 * - timestamp: the current server time
 * - version: the application version from package.json
 *
 * @returns {NextResponse} JSON response with health status
 */
export async function GET() {
  try {
    // Get the package.json version
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: packageJson.version,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check error:', error);

    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to retrieve health information',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
