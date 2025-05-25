"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, User, Shield, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-purple-900/30" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-purple-600 rounded-full opacity-70 blur-sm"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center bg-black rounded-full border border-purple-500">
                <span className="text-xl font-bold gradient-text">DS</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight gradient-text">Dern-Support</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 py-2 text-sm rounded-md hover:bg-purple-900/20 transition-colors">
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 text-sm rounded-md hover:bg-purple-900/20 transition-colors flex items-center"
                >
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border border-purple-900/50 backdrop-blur-md">
                <DropdownMenuItem className="hover:bg-purple-900/20">
                  <Link href="/request-support" className="flex w-full">
                    Business Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-900/20">
                  <Link href="/request-support" className="flex w-full">
                    Individual Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-purple-900/20">
                  <Link href="/knowledge-base" className="flex w-full">
                    Knowledge Base
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/knowledge-base"
              className="px-3 py-2 text-sm rounded-md hover:bg-purple-900/20 transition-colors"
            >
              Knowledge Base
            </Link>

            <Link href="/#contact" className="px-3 py-2 text-sm rounded-md hover:bg-purple-900/20 transition-colors">
              Contact
            </Link>

            <div className="pl-4 flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm" className="border-purple-600 hover:bg-purple-900/20">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:bg-purple-900/20">
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/90 border border-purple-900/50 backdrop-blur-md">
                  <DropdownMenuItem className="hover:bg-purple-900/20">
                    <Link href="/admin" className="flex w-full items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-purple-900/20">
                    <Link href="/master-admin" className="flex w-full items-center">
                      <ShieldAlert className="mr-2 h-4 w-4" />
                      Master Admin
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-purple-900/30">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-purple-900/20 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-2 pl-4 border-l border-purple-900/30">
              <p className="text-sm text-purple-400 px-3">Services</p>
              <Link
                href="/request-support"
                className="block px-3 py-2 rounded-md hover:bg-purple-900/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Business Support
              </Link>
              <Link
                href="/request-support"
                className="block px-3 py-2 rounded-md hover:bg-purple-900/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Individual Support
              </Link>
            </div>

            <Link
              href="/knowledge-base"
              className="block px-3 py-2 rounded-md hover:bg-purple-900/20 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Knowledge Base
            </Link>

            <Link
              href="/#contact"
              className="block px-3 py-2 rounded-md hover:bg-purple-900/20 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-2 border-t border-purple-900/30 flex flex-col space-y-2">
              <Link href="/login" className="block" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-purple-600 hover:bg-purple-900/20">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>

              <div className="space-y-2">
                <p className="text-sm text-purple-400 px-3">Admin Access</p>
                <Link
                  href="/admin"
                  className="flex items-center px-3 py-2 rounded-md hover:bg-purple-900/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
                <Link
                  href="/master-admin"
                  className="flex items-center px-3 py-2 rounded-md hover:bg-purple-900/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Master Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
