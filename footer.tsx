import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-900/30 relative z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-purple-600 rounded-full opacity-70 blur-sm"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center bg-black rounded-full border border-purple-500">
                  <span className="text-sm font-bold gradient-text">DS</span>
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight gradient-text">Dern-Support</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Professional IT technical support for businesses and individuals. We fix your tech problems so you can
              focus on what matters.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/request-support" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Business IT Support
                </Link>
              </li>
              <li>
                <Link href="/request-support" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Individual Computer Repair
                </Link>
              </li>
              <li>
                <Link href="/request-support" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Network Setup & Maintenance
                </Link>
              </li>
              <li>
                <Link href="/request-support" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Data Recovery
                </Link>
              </li>
              <li>
                <Link href="/request-support" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Cybersecurity Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/knowledge-base" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Troubleshooting Guides
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Common Issues
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="text-gray-400 hover:text-purple-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dern-Support. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-purple-400 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
