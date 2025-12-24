import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

export async function GET() {
  try {
    // Path to the resume file in the public directory
    const resumePath = join(process.cwd(), 'public', 'documents', 'Jalaj_Sharma_Resume.pdf');

    // Check if the file exists
    if (!existsSync(resumePath)) {
      return NextResponse.json(
        { error: 'Resume file not found. Please contact the administrator.' },
        { status: 404 }
      );
    }

    // Read the file
    const fileBuffer = readFileSync(resumePath);

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Jalaj_Sharma_Resume.pdf"',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error downloading resume:', error);
    return NextResponse.json(
      { error: 'Failed to download resume. Please try again later.' },
      { status: 500 }
    );
  }
}
