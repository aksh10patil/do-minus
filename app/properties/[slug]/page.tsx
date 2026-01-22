import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { properties } from '@/lib/data';
import { Button } from '@/components/ui/button';

// 1. Static Generation of params
export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

// 2. Page Component
export default function PropertyPage({ params }: { params: { slug: string } }) {
  const property = properties.find((p) => p.slug === params.slug);

  if (!property) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={property.image}
          alt={property.name}
          fill
          priority
          className="object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8 md:p-16">
          <div className="text-white max-w-2xl">
            <span className="uppercase tracking-[0.2em] text-sm mb-2 block opacity-90">{property.type}</span>
            <h1 className="font-serif text-4xl md:text-6xl mb-4">{property.name}</h1>
            <p className="text-lg opacity-90 max-w-lg">{property.description}</p>
          </div>
        </div>
        
        <Link href="/" className="absolute top-8 left-8">
          <Button variant="secondary" className="backdrop-blur-md bg-white/20 hover:bg-white/40 border-none text-white">
            ← Back to Map
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 p-8 md:p-16">
        
        {/* Details Column */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-2xl mb-4 text-slate-800">Highlights</h2>
            <div className="flex flex-wrap gap-3">
              {property.highlights.map((highlight) => (
                <span key={highlight} className="px-4 py-2 border border-slate-200 rounded-full text-slate-600 text-sm">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="font-serif text-2xl mb-4 text-slate-800">About the Experience</h2>
            <p className="text-slate-600 leading-relaxed">
              Experience the pinnacle of Swiss hospitality. {property.description} 
              Nestled in the heart of Ticino, this property offers a unique blend of 
              Mediterranean charm and Alpine precision.
            </p>
          </div>
        </div>

        {/* Sidebar / Location */}
        <div className="space-y-6">
          <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#E6DFD5]">
            <span className="block text-sm text-gray-400 uppercase tracking-widest mb-1">Starting From</span>
            <span className="font-serif text-3xl text-slate-900">{property.priceStart}</span>
            <span className="text-sm text-gray-500"> / night</span>
            <Button className="w-full mt-6 bg-slate-900 text-white">Book Now</Button>
          </div>

          <div className="rounded-xl overflow-hidden h-64 relative border border-slate-200">
             {/* Google Maps Embed (Only loads on detail page) */}
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${property.lat},${property.lng}`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}