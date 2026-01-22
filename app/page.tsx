import MapExplorer from '@/components/map/MapExplorer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAF9F6]">
      {/* Header */}
      <header className="w-full p-6 md:p-12 text-center">
        <h1 className="font-serif text-3xl md:text-5xl text-slate-800 mb-2">Ticino Wellness</h1>
        <p className="text-slate-500 font-light tracking-wide">Select your sanctuary</p>
      </header>

      {/* Map Section */}
      <section className="flex-grow w-full flex items-center justify-center p-4">
        <MapExplorer />
      </section>
    </main>
  );
}