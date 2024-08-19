import { Image } from '@/components/Image';

const getPictures = async () => {
  return (
    await fetch('http://localhost:3000/api/images', { next: { revalidate: 1 } })
  ).json();
};

export default async function Home() {
  const pictures = await getPictures();

  return (
    <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 bg-black invisible">
      {pictures.map((picture: string, index: number) => (
        <div key={index} className="visible flex flex-col items-center gap-10">
          <h1 className="text-blue-400 text-5xl">{picture}</h1>
          <div className="w-full max-w-[400px] sm:h-[400px] h-[280px]">
            <Image src={picture} alt={picture} />
          </div>
        </div>
      ))}
    </section>
  );
}
