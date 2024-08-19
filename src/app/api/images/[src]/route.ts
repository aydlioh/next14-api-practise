import { NextRequest, NextResponse } from 'next/server';
import { imageService } from '../ImageService';
import { logger } from '../../(shared)/logger';

const successConfig = {
  status: 200,
  headers: {
    'Content-Type': 'image/png',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { src: string } }
) {
  const requestUrl = request.nextUrl;
  const src = params.src;
  const width = Number(requestUrl.searchParams.get('w'));
  const quality = Number(requestUrl.searchParams.get('q')) || 100;
  const thumbnail = requestUrl.searchParams.get('thumbnail');

  if (thumbnail) {
    try {
      const thumbnailImage = await imageService.getThumbnail(src);
      return new NextResponse(thumbnailImage, successConfig);
    } catch (error) {
      logger.error(`Error fetching thumbnail: ${error}`);
      return Response.json({ error: 'Not Found' }, { status: 404 });
    }
  }

  try {
    const resizedImage = await imageService.getImage(src, quality, width);
    return new NextResponse(resizedImage, successConfig);
  } catch (error) {
    logger.error(`Error fetching image: ${error}`);
    return Response.json({ message: 'Not Found' }, { status: 404 });
  }
}
