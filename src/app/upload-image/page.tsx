'use client';

import { Button, FilePicker } from '@/components';
import { useState } from 'react';

const UploadImagePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setImage(null);
  };

  const handleSubmit = async () => {
    if (image) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', image);

      await fetch(`${process.env.NEXT_PUBLIC_API}/api/images`, {
        method: 'POST',
        body: formData,
      }).then(() => {
        setIsLoading(false);
        setImage(null);
      });
    }
  };

  return (
    <section className="flex justify-center">
      <div className="w-full sm:w-[500px]">
        <FilePicker
          onSelect={setImage}
          image={image}
          previewTools={
            <div className="flex flex-row gap-3">
              <Button
                disabled={isLoading}
                onClick={handleClear}
                className="bg-rose-500 hover:bg-rose-600 focus:ring-rose-400"
              >
                Clear
              </Button>
              <Button disabled={isLoading} onClick={handleSubmit}>
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default UploadImagePage;
