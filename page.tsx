import Link from "next/link"
import {
  ArrowRight,
  Database,
  Headphones,
  Server,
  Shield,
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Star,
  CheckCircle,
  Zap,
  Users,
  Award,
  Globe,
  Smartphone,
  Monitor,
  Wifi,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge">
              <Zap className="h-4 w-4" />
              Professional IT Support Services
            </div>
            <h1 className="glow-text">
              Expert IT Solutions for <span className="gradient-text">Every Challenge</span>
            </h1>
            <p>
              Dern-Support provides comprehensive technical support for businesses and individuals. From hardware
              repairs to software troubleshooting, we've got you covered.
            </p>
            <div className="hero-buttons">
              <Link href="/request-support">
                <Button size="lg" className="btn btn-primary">
                  Request Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/knowledge-base">
                <Button size="lg" className="btn btn-outline">
                  Explore Knowledge Base
                </Button>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="glow-circle"></div>
            <div className="rotating-circle"></div>
            <div className="center-icon">
              <div className="icon-glow"></div>
              <Server className="h-16 w-16 text-purple-400" />
            </div>
            <div className="floating-icon icon-1">
              <Monitor className="h-6 w-6 text-purple-400" />
            </div>
            <div className="floating-icon icon-2">
              <Smartphone className="h-6 w-6 text-purple-400" />
            </div>
            <div className="floating-icon icon-3">
              <Wifi className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="services-header">
            <div className="section-badge">
              <Star className="h-4 w-4" />
              Next-Generation IT Solutions
            </div>
            <h2 className="services-title">
              Revolutionary Support <br />
              <span className="gradient-text">That Adapts to You</span>
            </h2>
            <p className="services-subtitle">
              Experience the future of technical assistance with our cutting-edge solutions designed for businesses and
              individuals who demand excellence.
            </p>
          </div>

          <div className="services-grid">
            {/* Business Support Card */}
            <div className="service-card premium">
              <div className="service-header">
                <div className="service-icon business">
                  <div className="icon-bg"></div>
                  <Headphones className="h-8 w-8" />
                </div>
                <div className="service-badge">Most Popular</div>
              </div>

              <div className="service-content">
                <h3>Enterprise Solutions</h3>
                <p className="service-description">
                  Comprehensive IT infrastructure management for businesses of all sizes. From network setup to
                  cybersecurity, we handle it all.
                </p>

                <div className="service-features">
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>24/7 Network Monitoring</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Advanced Cybersecurity</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Cloud Migration & Management</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Data Backup & Recovery</span>
                  </div>
                </div>

                <div className="service-stats">
                  <div className="stat">
                    <span className="stat-number">99.9%</span>
                    <span className="stat-label">Uptime</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">&lt;1hr</span>
                    <span className="stat-label">Response</span>
                  </div>
                </div>
              </div>

              <div className="service-footer">
                <div className="service-pricing">
                  <span className="price-from">Starting from</span>
                  <span className="price">$299/visit</span>
                </div>
                <Link href="/request-support" className="service-btn primary">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Individual Support Card */}
            <div className="service-card">
              <div className="service-header">
                <div className="service-icon individual">
                  <div className="icon-bg"></div>
                  <Wrench className="h-8 w-8" />
                </div>
                <div className="service-badge">Personal</div>
              </div>

              <div className="service-content">
                <h3>Personal Support</h3>
                <p className="service-description">
                  Expert technical assistance for individuals. Computer repairs, virus removal, and hardware upgrades
                  made simple.
                </p>

                <div className="service-features">
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Computer Diagnostics</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Virus & Malware Removal</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Hardware Upgrades</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Data Recovery</span>
                  </div>
                </div>

                <div className="service-stats">
                  <div className="stat">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Repairs</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">4.9★</span>
                    <span className="stat-label">Rating</span>
                  </div>
                </div>
              </div>

              <div className="service-footer">
                <div className="service-pricing">
                  <span className="price-from">Starting from</span>
                  <span className="price">$89/hour</span>
                </div>
                <Link href="/request-support" className="service-btn secondary">
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Knowledge Base Card */}
            <div className="service-card">
              <div className="service-header">
                <div className="service-icon knowledge">
                  <div className="icon-bg"></div>
                  <Database className="h-8 w-8" />
                </div>
                <div className="service-badge free">Free Access</div>
              </div>

              <div className="service-content">
                <h3>Knowledge Hub</h3>
                <p className="service-description">
                  Self-service portal with AI-powered diagnostics, interactive guides, and 24/7 community support for
                  instant solutions.
                </p>

                <div className="service-features">
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>AI-Powered Diagnostics</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Interactive Repair Guides</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Video Tutorials</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="h-4 w-4" />
                    <span>Community Support</span>
                  </div>
                </div>

                <div className="service-stats">
                  <div className="stat">
                    <span className="stat-number">1000+</span>
                    <span className="stat-label">Articles</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Access</span>
                  </div>
                </div>
              </div>

              <div className="service-footer">
                <div className="service-pricing">
                  <span className="price-from">Always</span>
                  <span className="price">Free</span>
                </div>
                <Link href="/knowledge-base" className="service-btn outline">
                  Explore Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Service Features Banner */}
          <div className="service-features-banner">
            <div className="feature-highlight">
              <div className="feature-icon">
                <Clock className="h-6 w-6" />
              </div>
              <div className="feature-text">
                <h4>Lightning Fast Response</h4>
                <p>Average response time under 1 hour for critical issues</p>
              </div>
            </div>

            <div className="feature-highlight">
              <div className="feature-icon">
                <Shield className="h-6 w-6" />
              </div>
              <div className="feature-text">
                <h4>Enterprise Security</h4>
                <p>Military-grade encryption and security protocols</p>
              </div>
            </div>

            <div className="feature-highlight">
              <div className="feature-icon">
                <Award className="h-6 w-6" />
              </div>
              <div className="feature-text">
                <h4>Certified Experts</h4>
                <p>Industry-certified technicians with 10+ years experience</p>
              </div>
            </div>

            <div className="feature-highlight">
              <div className="feature-icon">
                <Globe className="h-6 w-6" />
              </div>
              <div className="feature-text">
                <h4>Global Coverage</h4>
                <p>Remote support available worldwide, 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Fixed Button Centering */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>
              Our streamlined process makes it easy to get the IT support you need, when you need it. Follow these
              simple steps to get started.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <Users className="h-6 w-6" />
              </div>
              <h3>Create Account</h3>
              <p>
                Sign up as a business or individual customer. This allows us to track your support history and provide
                faster, personalized service.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <Send className="h-6 w-6" />
              </div>
              <h3>Submit Request</h3>
              <p>
                Describe your technical issue in detail. For businesses, we'll schedule an on-site visit. Individuals
                can arrange drop-off or courier delivery.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <Settings className="h-6 w-6" />
              </div>
              <h3>Expert Support</h3>
              <p>
                Our skilled technicians diagnose and fix your issue. You'll receive regular updates and recommendations
                to prevent future problems.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-icon">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3>Quality Assurance</h3>
              <p>
                We test everything thoroughly and provide maintenance tips. Your satisfaction is guaranteed with our
                comprehensive warranty.
              </p>
            </div>
          </div>

          {/* Fixed: Centered button */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link href="/login">
              <Button size="lg" className="btn btn-primary">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Extraordinary Contact Section with Map */}
      <section id="contact" className="py-20 px-4 relative overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-cyan-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 40% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)
                `,
              }}
            ></div>
          </div>
          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-8 backdrop-blur-sm">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Get In Touch</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Let's Transform Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Technology Experience
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to revolutionize your IT infrastructure? Our expert team is standing by to provide personalized
              solutions that drive your success forward.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Interactive Map & Contact Info */}
            <div className="space-y-8">
              {/* Interactive Map */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Our Location</h3>
                      <p className="text-gray-400">Visit our state-of-the-art facility</p>
                    </div>
                  </div>

                  {/* Interactive Map Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <MapPin className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-white font-semibold">123 Tech Street</p>
                        <p className="text-gray-400">Digital City, DC 12345</p>
                        <button className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
                          View on Google Maps
                        </button>
                      </div>
                    </div>
                    {/* Map grid overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Phone,
                    title: "Call Us",
                    info: "+1 (555) 123-4567",
                    desc: "Mon-Fri 8AM-8PM EST",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    info: "support@dern-support.com",
                    desc: "24/7 Response",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Clock,
                    title: "Response Time",
                    info: "< 1 Hour",
                    desc: "Guaranteed",
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    icon: Globe,
                    title: "Global Support",
                    info: "Worldwide",
                    desc: "Remote Assistance",
                    color: "from-purple-500 to-pink-500",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative p-6 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur"></div>
                    <div className="relative">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-purple-300 font-medium mb-1">{item.info}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
                <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-white font-semibold">4.9/5 Rating</span>
                    <span className="text-green-400 text-sm">(500+ Reviews)</span>
                  </div>
                  <blockquote className="text-green-300 italic">
                    "Exceptional service! Dern-Support transformed our entire IT infrastructure. Their team is
                    professional, knowledgeable, and always available when we need them."
                  </blockquote>
                  <cite className="block mt-3 text-green-400 font-medium not-italic">
                    — Sarah Johnson, CEO of TechCorp
                  </cite>
                </div>
              </div>
            </div>

            {/* Advanced Contact Form */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-all duration-500"></div>
              <form className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-8 rounded-3xl space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
                    Start Your Journey
                  </h3>
                  <p className="text-gray-300">Fill out the form below and we'll get back to you within the hour</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl h-12 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl h-12 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Subject
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-500 rounded-xl h-12 backdrop-blur-sm">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-xl">
                      <SelectItem value="business-support">🏢 Business Support</SelectItem>
                      <SelectItem value="individual-support">👤 Individual Support</SelectItem>
                      <SelectItem value="quote">💰 Request a Quote</SelectItem>
                      <SelectItem value="partnership">🤝 Partnership Inquiry</SelectItem>
                      <SelectItem value="feedback">💬 Feedback</SelectItem>
                      <SelectItem value="other">🔧 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white font-medium flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your IT needs and how we can help transform your technology experience..."
                    required
                    className="min-h-32 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl resize-none backdrop-blur-sm"
                  />
                </div>

                {/* Priority Selector */}
                <div className="space-y-3">
                  <Label className="text-white font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Priority Level
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "low", label: "Low", color: "from-green-500 to-emerald-500", icon: "🟢" },
                      { value: "medium", label: "Medium", color: "from-yellow-500 to-orange-500", icon: "🟡" },
                      { value: "high", label: "High", color: "from-red-500 to-pink-500", icon: "🔴" },
                    ].map((priority) => (
                      <label key={priority.value} className="relative cursor-pointer group">
                        <input type="radio" name="priority" value={priority.value} className="sr-only peer" />
                        <div
                          className={`p-4 rounded-xl border-2 border-white/20 bg-gradient-to-r ${priority.color} opacity-50 peer-checked:opacity-100 peer-checked:border-white/50 transition-all duration-300 text-center group-hover:opacity-75`}
                        >
                          <div className="text-2xl mb-2">{priority.icon}</div>
                          <div className="text-white font-medium">{priority.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>

                {/* Trust Badge */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    Your information is secure and will never be shared with third parties
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold text-white mb-2">Ready to Get Started?</h3>
                <p className="text-gray-300 text-lg">Join hundreds of satisfied customers today</p>
              </div>
              <Button className="ml-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105">
                Contact Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
