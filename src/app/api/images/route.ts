import { NextRequest } from 'next/server';
import { logger } from '../(shared)/logger';
import { imageService } from './ImageService';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get('image');

  if (!image || !(image instanceof Blob)) {
    logger.warn('Invalid image provided');
    return Response.json({ error: 'Invalid image' }, { status: 400 });
  }

  await imageService.save(image);
  logger.info(`Image save successfully POST:${request.nextUrl.pathname}`);
  return Response.json({ message: 'Success' }, { status: 201 });
}

export async function GET() {
  const images = await imageService.getAll();
  logger.info(`Images fetched successfully GET:/api/images`);
  return Response.json(images, { status: 200 });
}
