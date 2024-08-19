import { imageService } from './ImageService';

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get('image');

  if (!image || !(image instanceof Blob)) {
    return Response.json(
      { error: 'Invalid image' },
      { status: 400 }
    );
  }

  await imageService.save(image);

  return Response.json({ message: 'Success' }, { status: 201 });
}
