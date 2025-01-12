import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Repeat, Globe } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-gray-900">
          The Future of Fashion is <span className="text-purple-600">Digital</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Own, trade, and showcase exclusive fashion pieces as NFTs. Join the revolution where luxury meets blockchain technology.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/marketplace"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Explore Marketplace
          </Link>
          <Link
            to="/profile"
            className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition"
          >
            View Collection
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Sparkles className="h-8 w-8 text-purple-600" />,
            title: "Exclusive Pieces",
            description: "Access limited edition fashion items from top designers worldwide"
          },
          {
            icon: <Shield className="h-8 w-8 text-purple-600" />,
            title: "Verified Authenticity",
            description: "Blockchain-backed proof of ownership and authenticity"
          },
          {
            icon: <Repeat className="h-8 w-8 text-purple-600" />,
            title: "Seamless Trading",
            description: "Buy and sell fashion NFTs with ease using crypto or fiat"
          },
          {
            icon: <Globe className="h-8 w-8 text-purple-600" />,
            title: "Global Community",
            description: "Connect with fashion enthusiasts and designers worldwide"
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            {feature.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Collections</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
              title: "Summer Essentials",
              designer: "Maria Rodriguez"
            },
            {
              image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
              title: "Avant-Garde 2024",
              designer: "Jean Paul"
            },
            {
              image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
              title: "Sustainable Future",
              designer: "Echo Studio"
            }
          ].map((collection, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4">{collection.title}</h3>
              <p className="text-gray-600">by {collection.designer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;