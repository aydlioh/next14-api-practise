import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

class ImageService {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
  }

  async save(image: any) {
    const filename = image.name;
    const fileExtension = path.extname(filename);
    const baseFilename = path.basename(filename, fileExtension);

    try {
      await fs.access(this.uploadDir);
    } catch (error) {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const originalPath = path.join(
      this.uploadDir,
      `${baseFilename}${fileExtension}`
    );
    await fs.writeFile(originalPath, imageBuffer);

    const thumbnailBuffer = await sharp(imageBuffer)
      .blur(1)
      .resize(10)
      .toBuffer();
    const thumbnailPath = path.join(
      this.uploadDir,
      `${baseFilename}-thumbnail${fileExtension}`
    );
    await fs.writeFile(thumbnailPath, thumbnailBuffer);
  }

  async getAll() {
    try {
      const files = await fs.readdir(this.uploadDir);

      return files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        const basename = path.basename(file).toLowerCase();
        return (
          ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext) &&
          !basename.includes('-thumbnail.')
        );
      });
    } catch (error) {
      return [];
    }
  }

  async getThumbnail(src: string) {
    const fileExtension = path.extname(src);
    const basename = path.basename(src, fileExtension);

    return await fs.readFile(
      path.join(this.uploadDir, `${basename}-thumbnail${fileExtension}`)
    );
  }

  async getImage(src: string, quality: number, width: number) {
    const imagePath = path.join(this.uploadDir, src);
    const originalImage = await fs.readFile(imagePath);
    return await sharp(originalImage)
      .png({
        quality,
      })
      .resize(width)
      .toBuffer();
  }
}

export const imageService = new ImageService();
