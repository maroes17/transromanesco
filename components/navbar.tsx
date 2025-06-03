import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Truck } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                TransRomanesco
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              Sistema de Gestión de Transporte
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  )
} 