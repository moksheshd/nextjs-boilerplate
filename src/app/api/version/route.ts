import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Version information endpoint
 *
 * This endpoint returns the content of the version.json file that is generated
 * during the build process. It contains information about the application version,
 * git branch, commit hash, and build timestamp.
 *
 * @returns {NextResponse} JSON response with version information
 */
export async function GET() {
  try {
    const versionPath = path.join(process.cwd(), 'public', 'version.json');

    if (!fs.existsSync(versionPath)) {
      return NextResponse.json(
        {
          error: 'Version information not available',
          message:
            'The version.json file does not exist. It is generated during the build process.',
        },
        { status: 404 }
      );
    }

    const versionContent = fs.readFileSync(versionPath, 'utf8');
    const versionData = JSON.parse(versionContent);

    return NextResponse.json(versionData, { status: 200 });
  } catch (error) {
    console.error('Error serving version information:', error);

    return NextResponse.json(
      {
        error: 'Failed to retrieve version information',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
