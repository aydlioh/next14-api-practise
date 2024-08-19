import { Image } from '@/components/Image';

export default function Home() {
  return (
    <main className="bg-[#224] min-h-[100dvh] p-8">
      <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 bg-black invisible">
        <div className="visible flex flex-col items-center gap-10">
          <h1 className="text-blue-400 text-5xl">Hello!</h1>
          <div className="w-full max-w-[400px] sm:h-[400px] h-[280px]">
            <Image src="fox.png" alt="Fox" />
          </div>
        </div>
      </section>
    </main>
  );
}
