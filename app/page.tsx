"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  DollarSign,
  Shield,
  Award,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Star,
  Building,
  Users,
  TrendingUp,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export default function ReefOffPlanPage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const [isLeadPopupOpen, setIsLeadPopupOpen] = useState(false)
  const [formType, setFormType] = useState<"brochure" | "schedule" | "investment" | "eoi" | "consultation">("brochure")

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-cyan-600">REEF</div>
              <div className="text-sm text-gray-500">LUXURY DEVELOPMENTS</div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <span className="text-gray-600">Last Updated: {currentDate}</span>
              <div className="flex items-center space-x-2 text-cyan-600">
                <Phone className="w-4 h-4" />
                <span>+971 55 200 2369</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/reef-998-building.jpg"
            alt="REEF 998 Building Exterior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Premium Overlay Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <Badge className="bg-white/20 text-white border-white/30 mb-4 px-4 py-2">
              Off-Plan Development • Q2 2028 Handover
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            REEF <span className="text-cyan-400">998</span>
          </h1>

          <p className="text-xl md:text-2xl mb-4 font-light opacity-90">Revolutionary Outdoor Cooling Technology</p>

          <p className="text-lg mb-8 max-w-4xl mx-auto leading-relaxed opacity-80">
            Experience the world's 3rd building with patented outdoor cooling balconies. Redefining luxury living in
            Dubai Land Residence Complex with innovation, wellness, and unparalleled comfort.
          </p>

          {/* Premium Pricing Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400">AED 695,850</div>
                <div className="text-sm opacity-80">Starting Price</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">USD 189,500</div>
                <div className="text-sm opacity-80">International Price</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400">0%</div>
                <div className="text-sm opacity-80">Interest Rate</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Direct from Developer - No Brokerage Fees
              </Badge>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
              onClick={() => {
                setFormType("eoi")
                setIsLeadPopupOpen(true)
              }}
            >
              Secure Unit Now
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
              onClick={() => {
                setFormType("investment")
                setIsLeadPopupOpen(true)
              }}
            >
              Calculate ROI
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog open={isLeadPopupOpen} onOpenChange={setIsLeadPopupOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold text-gray-900">
                    {formType === "brochure" && "Download Brochure"}
                    {formType === "schedule" && "Schedule Viewing"}
                    {formType === "investment" && "Investment Analysis"}
                    {formType === "eoi" && "Expression of Interest"}
                    {formType === "consultation" && "Schedule Consultation"}
                  </DialogTitle>
                  <p className="text-center text-gray-600 mt-2">
                    {formType === "brochure" && "Get comprehensive project details and floor plans"}
                    {formType === "schedule" && "Book your private viewing appointment"}
                    {formType === "investment" && "Get detailed ROI analysis and projections"}
                    {formType === "eoi" && "Secure priority access with AED 35,000 EOI"}
                    {formType === "consultation" && "Connect with our investment specialists"}
                  </p>
                </DialogHeader>
                <form className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input placeholder="Enter your full name" required className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input type="email" placeholder="Enter your email address" required className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input placeholder="+971 55 200 2369" required className="rounded-lg" />
                  </div>
                  {(formType === "investment" || formType === "eoi" || formType === "consultation") && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Investment Budget</label>
                      <Select>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500k-1m">AED 500K - 1M</SelectItem>
                          <SelectItem value="1m-2m">AED 1M - 2M</SelectItem>
                          <SelectItem value="2m+">AED 2M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {formType === "schedule" && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Date</label>
                      <Input type="date" className="rounded-lg" />
                    </div>
                  )}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 rounded-lg bg-transparent"
                      onClick={() => setIsLeadPopupOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg"
                      onClick={() => {
                        // Handle form submission here
                        setIsLeadPopupOpen(false)
                      }}
                    >
                      {formType === "brochure" && "Download Now"}
                      {formType === "schedule" && "Book Viewing"}
                      {formType === "investment" && "Get Analysis"}
                      {formType === "eoi" && "Submit EOI"}
                      {formType === "consultation" && "Schedule Now"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Developer Credentials Bar */}
      <section className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Building className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="font-bold">20+ Years</div>
                <div className="text-xs opacity-80">Experience</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="font-bold">3 Projects</div>
                <div className="text-xs opacity-80">Successfully Delivered</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="font-bold">1000+</div>
                <div className="text-xs opacity-80">Happy Residents</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="font-bold">15%</div>
                <div className="text-xs opacity-80">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-100 text-cyan-800 mb-4 px-4 py-2">Project Highlights</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why REEF 998 Stands Apart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering innovation meets luxury living in Dubai's most promising residential development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">World's 3rd Cooling Technology</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Revolutionary patented outdoor cooling balconies - a global innovation providing year-round comfort in
                  Dubai's climate.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Strategic DLRC Location</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Prime location with upcoming metro connectivity, academic proximity, and rapid infrastructure
                  development.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">0% Interest Financing</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Flexible 3-year payment plan with zero interest, making luxury living accessible and affordable.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">25+ Premium Amenities</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Resort-style facilities including infinity pools, sports courts, wellness centers, and entertainment
                  zones.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Proven Developer Track Record</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  REEF 999 and REEF 1000 sold out successfully, demonstrating strong market confidence and delivery
                  capability.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">High Investment Potential</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Strong rental yields, capital appreciation potential, and resale flexibility even during construction
                  phase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2">Investment Opportunity</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Exceptional Returns Await Smart Investors</h2>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                REEF 998 presents a unique investment opportunity with strong rental return potential and capital
                appreciation. Investors can resell and benefit from appreciation even during construction once 30% is
                paid.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-200">15%+</div>
                  <div className="text-sm opacity-80">Expected Annual ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-200">30%</div>
                  <div className="text-sm opacity-80">Resale Threshold</div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
                onClick={() => {
                  setFormType("investment")
                  setIsLeadPopupOpen(true)
                }}
              >
                Get Free Investment Analysis
              </Button>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Payment Structure</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                    <span>Down Payment</span>
                    <span className="font-bold text-cyan-200">20%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                    <span>During Construction</span>
                    <span className="font-bold text-cyan-200">50%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                    <span>On Handover</span>
                    <span className="font-bold text-cyan-200">30%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-500/20 rounded-xl border border-orange-400/30">
                    <span>DLD Registration</span>
                    <span className="font-bold text-orange-200">4%</span>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                    0% Interest • 3-Year Plan
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Excellence */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-100 text-cyan-800 mb-4 px-4 py-2">Strategic Location</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Dubai Land Residence Complex</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Positioned in Dubai's fastest-growing residential hub with unmatched connectivity and future growth
              potential
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/location-map.jpg" alt="Location Map" fill className="object-cover" />
            </div>

            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-600 mb-2">Future Metro Connectivity</h3>
                      <p className="text-gray-600">
                        Upcoming metro station will provide seamless access to key Dubai districts, significantly
                        boosting property values and rental demand.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-600 mb-2">Academic City Proximity</h3>
                      <p className="text-gray-600">
                        Located near 27+ universities, ensuring consistent rental demand from students, faculty, and
                        academic professionals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-cyan-600 mb-2">Silicon Oasis Growth</h3>
                      <p className="text-gray-600">
                        Dubai Silicon Oasis is emerging as the city's third center by 2040, driving substantial regional
                        growth and development.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Travel Times */}
          <div className="bg-gray-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Connectivity & Access Times</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  10
                </div>
                <div className="font-semibold">Global Village</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  20
                </div>
                <div className="font-semibold">Burj Khalifa</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  25
                </div>
                <div className="font-semibold">Dubai Airport</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  30
                </div>
                <div className="font-semibold">Dubai Marina</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Amenities */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-100 text-cyan-800 mb-4 px-4 py-2">Luxury Amenities</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Resort-Style Living Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 25 world-class amenities designed to enhance your lifestyle and well-being
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/amenities-plan.jpg" alt="Amenities Plan" fill className="object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  "Infinity Swimming Pool",
                  "Kids Pool & Play Area",
                  "State-of-the-Art Gym",
                  "Outdoor Cinema",
                  "Zip Line Adventure",
                  "BBQ & Social Areas",
                  "Yoga & Wellness Zone",
                  "Co-Working Spaces",
                  "CrossFit Training",
                  "Boxing Facility",
                  "Wall Climbing",
                  "Floating Lounge",
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  "Sunken Seating Areas",
                  "Wet Decking Zones",
                  "Hammock Forest",
                  "Aqua Bikes",
                  "Fire Pit Lounges",
                  "Trampoline Park",
                  "Swing Areas",
                  "Sports Courts",
                  "Cricket Pitch",
                  "Padel Courts",
                  "Squash Courts",
                  "Skate Park",
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Profile */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 mb-4 px-4 py-2">Developer Profile</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">REEF Luxury Developments</h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Pioneering innovation in Dubai's real estate landscape with a proven track record of excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">Proven Excellence</h3>
                    <p className="opacity-80">
                      REEF 999 and REEF 1000 both achieved complete sell-out status, demonstrating strong market
                      confidence and exceptional delivery standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">Visionary Leadership</h3>
                    <p className="opacity-80">
                      Led by CEO Samer Ambar with 20+ years in finance and real estate. Graduate of University of Dubai
                      and London Business School.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-2">Innovation Focus</h3>
                    <p className="opacity-80">
                      Committed to integrating cutting-edge technology and sustainable design principles in every
                      development project.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700 shadow-xl">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">20+</div>
                      <div className="text-sm text-gray-300">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">3</div>
                      <div className="text-sm text-gray-300">Successful Projects</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 shadow-xl">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-lg mb-2 text-cyan-400">Project Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Construction Start:</span>
                      <span className="text-cyan-400">Q1 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expected Handover:</span>
                      <span className="text-cyan-400">Q2 2028</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Project Type:</span>
                      <span className="text-cyan-400">Residential Tower</span>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </div>
          </div>
        </div>
      </section>

      {/* Contact & Inquiry */}
      <section className="py-20 bg-gradient-to-r from-cyan-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-cyan-100 text-cyan-800 mb-4 px-4 py-2">Get In Touch</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ready to Invest?</h2>
            <p className="text-xl text-gray-600">
              Connect with our investment specialists for personalized consultation and exclusive offers
            </p>
          </div>

          <Card className="border-0 shadow-2xl">
            <CardContent className="pt-8 pb-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <Input placeholder="Enter your full name" className="rounded-xl h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                    <Input placeholder="+971 55 200 2369" className="rounded-xl h-12" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <Input type="email" placeholder="Enter your email address" className="rounded-xl h-12" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Investment Budget</label>
                    <Select>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500k-1m">AED 500K - 1M</SelectItem>
                        <SelectItem value="1m-2m">AED 1M - 2M</SelectItem>
                        <SelectItem value="2m+">AED 2M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Preferred Unit Type</label>
                    <Select>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder="Select unit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1br">1-Bedroom</SelectItem>
                        <SelectItem value="2br">2-Bedroom</SelectItem>
                        <SelectItem value="3br">3-Bedroom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <Textarea placeholder="Tell us about your investment goals..." rows={4} className="rounded-xl" />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white py-4 text-lg font-semibold rounded-xl"
                  onClick={() => {
                    setFormType("consultation")
                    setIsLeadPopupOpen(true)
                  }}
                >
                  Get Instant Consultation
                </Button>
              </form>
            </CardContent>
          </Card>


        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-8 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4">
            <MessageCircle className="w-8 h-8" />
            <span className="text-xl font-bold">Connect on WhatsApp for Instant Support</span>
            <Button
              className="bg-white text-green-600 hover:bg-gray-100 rounded-xl px-6 py-2 font-semibold"
              onClick={() => window.open("https://wa.me/971552002369", "_blank")}
            >
              Start Chat
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-cyan-400 mb-4">REEF 998</div>
              <p className="text-sm opacity-80 mb-4">
                Revolutionary luxury living with patented outdoor cooling technology in Dubai Land Residence Complex.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Project Info</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Expected Handover: Q2 2028</li>
                <li>Location: Dubai Land Residence Complex</li>
                <li>Unit Types: Studio to 3BR</li>
                <li>Payment Plan: 70/30</li>
              </ul>
            </div>


          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm opacity-60 mb-3">
              © 2025{" "}
              <a
                href="https://www.primevistarealestate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Primevista Real Estate
              </a>
              . All Rights Reserved | Expected completion Q2 2028 | Direct from developer - No brokerage fees
            </p>
            <p className="text-xs opacity-50 leading-relaxed">
              Primevista Real Estate is an authorized sales partner of REEF Luxury Developments. We are officially
              recognized by the developer to offer their products. All transactions are conducted in accordance with the
              terms and conditions set forth by the developer.
            </p>
          </div>
        </div>
      </footer>
      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 md:hidden">
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg"
          onClick={() => {
            setFormType("consultation")
            setIsLeadPopupOpen(true)
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button
          size="sm"
          className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full w-14 h-14 shadow-lg"
          onClick={() => {
            setFormType("brochure")
            setIsLeadPopupOpen(true)
          }}
        >
          <Phone className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
