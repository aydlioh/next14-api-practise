import { promises as fs } from 'fs';
import { join } from 'path';
import { logger } from './(shared)/logger';
import { render } from './(shared)/utils';
{}
export async function GET() {
  try {
    const filePath = join(process.cwd(), 'templates', 'api.html');
    const template = await fs.readFile(filePath, 'utf-8');

    const html = render(template, {
      title: 'Next.js',
      website: 'https://nextjs.org/',
    });

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    logger.error(`Error reading file: ${error}`);
    return new Response('Internal Server Error', { status: 500 });
  }
}
