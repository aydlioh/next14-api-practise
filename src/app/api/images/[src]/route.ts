import { NextRequest, NextResponse } from 'next/server';
import { imageService } from '../ImageService';

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
  const src = params.src;
  const width = Number(request.nextUrl.searchParams.get('w'));
  const quality = Number(request.nextUrl.searchParams.get('q')) || 100;
  const thumbnail = request.nextUrl.searchParams.get('thumbnail');

  if (thumbnail) {
    try {
      const thumbnailImage = await imageService.getThumbnail(src);
      return new NextResponse(thumbnailImage, successConfig);
    } catch (error) {
      return Response.json({ error: 'Not Found' }, { status: 404 });
    }
  }

  try {
    const resizedImage = await imageService.getImage(src, quality, width);
    return new NextResponse(resizedImage, successConfig);
  } catch (error) {
    return Response.json({ message: 'Not Found' }, { status: 404 });
  }
}
