import React from 'react';
import { Link } from 'react-router-dom';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import { Wallet, ShoppingBag, User } from 'lucide-react';

function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold">DEFY</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/marketplace" className="text-gray-700 hover:text-purple-600">
              Marketplace
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-purple-600">
              My Collection
            </Link>
            
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}