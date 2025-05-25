"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Send, MapPin, Phone, Mail, Clock, Star, Zap } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        {/* Success Content */}
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-12 rounded-3xl text-center">
          {/* Animated Success Icon */}
          <div className="relative mx-auto w-24 h-24 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-12 w-12 text-white animate-bounce" />
            </div>
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-300"></div>
          </div>

          <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Message Sent Successfully! 🎉
          </h3>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Thank you for reaching out! Our expert team will get back to you within
            <span className="font-bold text-green-400">&lt; 24 hours</span> with a personalized solution.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">&lt; 24h</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">99.9%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>

          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <Send className="mr-2 h-5 w-5" />
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-cyan-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_50%)]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div className="relative grid lg:grid-cols-5 gap-8">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Get In Touch</span>
            </div>

            <h3 className="text-4xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
              Let's Start Your IT Journey
            </h3>

            <p className="text-lg text-gray-300 leading-relaxed">
              Ready to transform your technology experience? Our expert team is here to provide personalized solutions
              that exceed your expectations.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            {[
              { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567", desc: "Mon-Fri 8AM-8PM EST" },
              { icon: Mail, title: "Email Us", info: "support@dern-support.com", desc: "24/7 Response" },
              { icon: MapPin, title: "Visit Us", info: "123 Tech Street, Digital City", desc: "By Appointment" },
              { icon: Clock, title: "Response Time", info: "&lt; 24 Hours", desc: "Guaranteed" },
            ].map((item, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-purple-300 font-medium">{item.info}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white font-semibold">4.9/5 Rating</span>
            </div>
            <p className="text-green-300 text-sm">
              "Exceptional service! Dern-Support transformed our entire IT infrastructure. Highly recommended!"
              <span className="block mt-2 text-green-400 font-medium">- Sarah Johnson, CEO TechCorp</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-3xl space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Send Us a Message
              </h3>
              <p className="text-gray-300">Fill out the form below and we'll get back to you shortly</p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white font-medium">
                Subject
              </Label>
              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-purple-500 rounded-xl h-12">
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
              <Label htmlFor="message" className="text-white font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your IT needs and how we can help..."
                required
                className="min-h-32 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl resize-none"
              />
            </div>

            {/* Priority Options */}
            <div className="space-y-3">
              <Label className="text-white font-medium">Priority Level</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "low", label: "Low", color: "from-green-500 to-emerald-500", icon: "🟢" },
                  { value: "medium", label: "Medium", color: "from-yellow-500 to-orange-500", icon: "🟡" },
                  { value: "high", label: "High", color: "from-red-500 to-pink-500", icon: "🔴" },
                ].map((priority) => (
                  <label key={priority.value} className="relative cursor-pointer">
                    <input type="radio" name="priority" value={priority.value} className="sr-only peer" />
                    <div
                      className={`p-3 rounded-xl border-2 border-white/20 bg-gradient-to-r ${priority.color} opacity-50 peer-checked:opacity-100 peer-checked:border-white/50 transition-all duration-300 text-center`}
                    >
                      <div className="text-lg mb-1">{priority.icon}</div>
                      <div className="text-white font-medium text-sm">{priority.label}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>

            {/* Trust Badge */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-400">
                🔒 Your information is secure and will never be shared with third parties
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
