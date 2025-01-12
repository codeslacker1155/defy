import { SignedIn, SignedOut, SignInButton, SignUpButton, RedirectToSignIn } from "@clerk/clerk-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FashionModel } from "./components/FashionModel";
import Marketplace from "./pages/Marketplace";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">DEFY</h1>
          <div className="space-x-4">
            <SignedIn>
              <Navigation />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <SignedOut>
                <div className="max-w-4xl mx-auto space-y-12">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                      The Future of Fashion is <span className="text-purple-600">Digital</span>
                    </h2>
                    <p className="text-xl text-gray-600">
                      Experience fashion in a whole new dimension. Collect, wear, and trade unique digital pieces.
                    </p>
                  </div>
                  
                  <FashionModel />
                  
                  <div className="text-center">
                    <SignUpButton mode="modal">
                      <button className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition text-lg font-semibold">
                        Start Your Digital Wardrobe
                      </button>
                    </SignUpButton>
                  </div>
                </div>
              </SignedOut>
            }
          />
          
          <Route
            path="/marketplace"
            element={
              <>
                <SignedIn>
                  <Marketplace />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </main>
    </div>
  );
}