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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "",
    preferredDate: "",
    message: ""
  })
  const [consultationFormData, setConsultationFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    budget: "",
    unitType: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConsultationSubmitting, setIsConsultationSubmitting] = useState(false)
  const [isAmenitiesPopupOpen, setIsAmenitiesPopupOpen] = useState(false);
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleConsultationInputChange = (field: string, value: string) => {
    setConsultationFormData(prev => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      budget: "",
      preferredDate: "",
      message: ""
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Prevent duplicate submissions
    if (isSubmitting) {
      return
    }
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Send data to CRM API
      const payload = {
        clientSource: "website",
        clientSubSource: "reef",
        clientType: "ENQUIRY",
        email: formData.email,
        ip_address: "",
        leads_message: formType,
        name: formData.fullName,
        phone: formData.phone,
        project: "reef998",
        status: "ACTIVE"
      }
      const res = await fetch("https://korchiccrm-api.propfusion.io/properties/create_leads_for_website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      let respJson: any = null
      try {
        respJson = await res.clone().json()
      } catch (err) {
        // Response is not JSON or failed to parse
        respJson = null
      }
      if (!res.ok) {
        console.error("CRM API error", res.status, respJson)
        throw new Error(`API request failed: ${res.status} ${respJson?.message || res.statusText}`)
      }
      console.info("CRM API success", respJson);
      
      // Success feedback
      alert(`Thank you! Your ${formType} request has been submitted successfully. We'll contact you soon.`)
      
      // Reset form and close modal
      resetForm()
      setIsLeadPopupOpen(false)
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Prevent duplicate submissions
    if (isConsultationSubmitting) {
      return
    }
    
    // Basic validation
    if (!consultationFormData.fullName || !consultationFormData.email || !consultationFormData.phone) {
      alert("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(consultationFormData.email)) {
      alert("Please enter a valid email address")
      return
    }

    setIsConsultationSubmitting(true)
    
    try {
      // Send data to CRM API
      const payload = {
        clientSource: "website",
        clientSubSource: "reef",
        clientType: "ENQUIRY",
        email: consultationFormData.email,
        ip_address: "",
        leads_message: consultationFormData.message || "Consultation",
        name: consultationFormData.fullName,
        phone: consultationFormData.phone,
        project: "reef998",
        status: "ACTIVE"
      }
      const res = await fetch("https://korchiccrm-api.propfusion.io/properties/create_leads_for_website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      let respJson: any = null
      try {
        respJson = await res.clone().json()
      } catch (err) {
        // Response is not JSON or failed to parse
        respJson = null
      }
      if (!res.ok) {
        console.error("CRM API error", res.status, respJson)
        throw new Error(`API request failed: ${res.status} ${respJson?.message || res.statusText}`)
      }
      console.info("CRM API success", respJson);
      
      // Success feedback
      alert(`Thank you! Your consultation request has been submitted successfully. We'll contact you soon.`)
      
      // Reset consultation form
      setConsultationFormData({
        fullName: "",
        email: "",
        phone: "",
        budget: "",
        unitType: "",
        message: ""
      })
    } catch (error) {
      console.error("Consultation form submission error:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsConsultationSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Header - Sticky for Mobile */}
      <header className="bg-white shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-2xl sm:text-3xl font-bold text-reef-blue font-serif">REEF</div>
              <div className="hidden sm:block text-sm text-gray-600 font-serif">LUXURY DEVELOPMENTS</div>
            </div>
            <a 
              href="https://wa.me/971552002369?text=Hi%2C%20I%27m%20interested%20in%20REEF%20998%20-%20the%20luxury%20residential%20development%20with%200%25%20interest%20payment%20plan.%20Could%20you%20please%20provide%20more%20information%20about%20unit%20availability%2C%20pricing%2C%20and%20payment%20options%3F" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-green-600 bg-green-50 hover:bg-green-100 px-3.5 py-2 rounded-full transition-colors duration-200"
              aria-label="Chat on WhatsApp +971 55 200 2369"
            >
              <svg className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="text-sm font-medium whitespace-nowrap">+971 55 200 2369</span>
            </a>
          </div>
        </div>
      </header>

      {/* Premium Hero Section */}
      <section className="relative w-full min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/reef-998-building.jpg"
            alt="REEF 998 Building Exterior"
            fill
            className="object-cover w-full h-full"
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%'
            }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* Premium Overlay Content */}
        <div className="relative z-10 px-5 sm:px-6 max-w-6xl text-white w-full md:w-1/2 lg:w-[45%] pl-4 sm:pl-10 md:pl-16 lg:pl-24 py-16 sm:py-0 flex flex-col items-center">

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tight text-white leading-tight text-center">
            REEF <span className="text-reef-blue drop-shadow-lg">998</span>
          </h1>

          {/* Payment Plan Section */}
          <div className="rounded-2xl p-8 max-w-3xl w-full text-white">
            <div className="mb-6 text-center">
              <p className="text-teal-400 font-semibold tracking-widest mb-2">BENEFIT FROM 0% INTEREST</p>
              <h2 className="text-4xl font-extrabold mb-4">3-Year Payment Plan</h2>
              <p className="text-lg text-white font-medium">
                REEF 998 presents an exceptional investment opportunity with strong rental return potential. Investors benefit from capital appreciation — even during construction — once 30% is paid.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 border border-teal-400/70 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-400 mb-2">20%</div>
                <div className="text-white font-medium">Secure your unit with an initial down payment</div>
              </div>
              <div className="flex-1 border border-white/30 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">50%</div>
                <div className="text-white font-medium">During construction<br/>(flexible installments)</div>
              </div>
              <div className="flex-1 border border-white/30 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">30%</div>
                <div className="text-white font-medium">On handover<br/>(or post-handover plan)</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 bg-teal-400 text-zinc-900 font-semibold py-3 rounded-lg hover:bg-teal-300 transition"
                onClick={() => {
                  setFormType("brochure");
                  setIsLeadPopupOpen(true);
                }}
              >
                Request Price List
              </button>
              <button
                className="flex-1 border border-white text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-zinc-900 transition"
                onClick={() => {
                  setFormType("eoi");
                  setIsLeadPopupOpen(true);
                }}
              >
                Register Interest
              </button>
            </div>
          </div>

          {/* Premium Pricing Display */}
          <div className="rounded-xl p-5 sm:p-6 mb-6 sm:mb-8 text-center w-full max-w-3xl">
            <div className="pb-0">
              <div className="text-2xl sm:text-3xl font-bold text-teal-400">AED 695,850</div>
              <div className="text-xs sm:text-sm text-white font-medium mt-1">Starting Price</div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 text-center">
              <p className="text-xs text-white font-medium">Prices starting from. Contact us for detailed pricing and availability.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-3xl">
            <Dialog open={isLeadPopupOpen} onOpenChange={setIsLeadPopupOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold text-gray-900">
                    {formType === "brochure" && "Download Brochure"}
                    {formType === "schedule" && "Schedule Viewing"}
                    {formType === "investment" && "Investment Analysis"}
                    {formType === "eoi" && "Register Interest"}
                    {formType === "consultation" && "Schedule Consultation"}
                  </DialogTitle>
                  <p className="text-center text-gray-600 mt-2">
                    {formType === "brochure" && "Get comprehensive project details and floor plans"}
                    {formType === "schedule" && "Book your private viewing appointment"}
                    {formType === "investment" && "Get detailed ROI analysis and projections"}
                    {formType === "eoi" && "Register your interest to get priority access and exclusive updates"}
                    {formType === "consultation" && "Connect with our investment specialists"}
                  </p>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input 
                      placeholder="Enter your full name" 
                      required 
                      className="rounded-lg" 
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address *</label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email address" 
                      required 
                      className="rounded-lg" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input 
                      placeholder="+971 55 200 2369" 
                      required 
                      className="rounded-lg" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  {(formType === "investment" || formType === "eoi" || formType === "consultation") && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Investment Budget</label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
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
                      <Input 
                        type="date" 
                        className="rounded-lg" 
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      />
                    </div>
                  )}
                  {(formType === "investment" || formType === "consultation") && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea 
                        placeholder="Tell us about your investment goals..." 
                        className="rounded-lg min-h-[80px]" 
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </div>
                  )}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 rounded-lg bg-transparent"
                      onClick={() => {
                        resetForm()
                        setIsLeadPopupOpen(false)
                      }}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-reef-blue hover:bg-reef-blue/90 text-white rounded-lg transition-colors disabled:opacity-50"
                      disabled={isSubmitting}
                      onClick={(e) => {
                        // Let the form onSubmit handle the submission
                        // This onClick is just to ensure proper form behavior
                      }}
                    >
                      {isSubmitting ? "Submitting..." : (
                        <>
                                                {formType === "brochure" && "Download Now"}
                      {formType === "schedule" && "Book Viewing"}
                      {formType === "investment" && "Get Analysis"}
                      {formType === "eoi" && "Register Interest"}
                      {formType === "consultation" && "Schedule Now"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>




      {/* Investment Opportunity */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-reef-blue to-reef-blue/80 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <Badge className="bg-white/20 text-white border-white/30 mb-4 sm:mb-6 px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition-colors">
                Investment Opportunity
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Exceptional Returns Await Smart Investors
              </h2>
              <p className="text-base sm:text-lg opacity-90 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                REEF 998 presents a unique investment opportunity with strong rental return potential and capital
                appreciation. Investors can resell and benefit from appreciation even during construction once 30% is paid.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 max-w-md mx-auto lg:mx-0">
                <div className="bg-white/10 p-4 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">15%+</div>
                  <div className="text-xs sm:text-sm opacity-90">Expected Annual ROI</div>
                </div>
                <div className="bg-white/10 p-4 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">30%</div>
                  <div className="text-xs sm:text-sm opacity-90">Resale Threshold</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-reef-blue hover:bg-gray-100 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                  onClick={() => {
                    setFormType("investment")
                    setIsLeadPopupOpen(true)
                  }}
                >
                  Get Free Investment Analysis
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 bg-transparent hover:bg-white/10 text-white px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all hover:border-white/50"
                  onClick={() => {
                    setFormType("brochure")
                    setIsLeadPopupOpen(true)
                  }}
                >
                  Download Brochure
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">Payment Structure</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white/10 hover:bg-white/15 rounded-xl transition-colors">
                    <span className="text-sm sm:text-base">Down Payment</span>
                    <span className="font-bold text-white/90 text-lg sm:text-xl">20%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white/10 hover:bg-white/15 rounded-xl transition-colors">
                    <span className="text-sm sm:text-base">During Construction</span>
                    <span className="font-bold text-white/90 text-lg sm:text-xl">50%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-white/10 hover:bg-white/15 rounded-xl transition-colors">
                    <span className="text-sm sm:text-base">On Handover or Post Handover</span>
                    <span className="font-bold text-white/90 text-lg sm:text-xl">30%</span>
                  </div>

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
            <Badge className="bg-reef-blue/10 text-reef-blue/90 mb-4 px-4 py-2 border border-reef-blue/20">Strategic Location</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Dubai Land Residence Complex</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Positioned in Dubai's fastest-growing residential hub with unmatched connectivity and future growth
              potential
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <button
                className="absolute top-4 right-4 z-20 bg-reef-blue text-white font-bold px-4 py-2 rounded-lg shadow hover:bg-reef-blue/80 transition"
                onClick={() => setIsLocationPopupOpen(true)}
              >
                CLICK TO VIEW
              </button>
              <Image src="/images/location-map.jpg" alt="Location Map" fill className="object-contain" />
            </div>

            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-reef-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-reef-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-reef-blue mb-2">Future Metro Connectivity</h3>
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
                    <div className="w-12 h-12 bg-reef-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-reef-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-reef-blue mb-2">Academic City Proximity</h3>
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
                    <div className="w-12 h-12 bg-reef-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-reef-blue" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-reef-blue mb-2">Dubailand Growth</h3>
                      <p className="text-gray-600">
                        Dubailand is a sought-after area in Dubai with strong demand, driving substantial regional growth and development.
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
                <div className="w-16 h-16 bg-reef-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  10
                </div>
                <div className="font-semibold flex flex-col items-center">
                  Global Village
                  <span className="text-xs text-gray-600 font-semibold">Minutes</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-reef-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  20
                </div>
                <div className="font-semibold flex flex-col items-center">
                  Burj Khalifa
                  <span className="text-xs text-gray-600 font-semibold">Minutes</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-reef-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  25
                </div>
                <div className="font-semibold flex flex-col items-center">
                  Dubai Airport
                  <span className="text-xs text-gray-600 font-semibold">Minutes</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-reef-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  30
                </div>
                <div className="font-semibold flex flex-col items-center">
                  Dubai Marina
                  <span className="text-xs text-gray-600 font-semibold">Minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Amenities */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-reef-blue/10 text-reef-blue/90 mb-4 px-4 py-2 border border-reef-blue/20">Luxury Amenities</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Resort-Style Living Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 25 world-class amenities designed to enhance your lifestyle and well-being
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <button
                className="absolute top-4 right-4 z-20 bg-reef-blue text-white font-bold px-4 py-2 rounded-lg shadow hover:bg-reef-blue/80 transition"
                onClick={() => setIsAmenitiesPopupOpen(true)}
              >
                CLICK TO VIEW
              </button>
              <Image src="/images/amenities-plan.jpg" alt="Amenities Plan" fill className="object-contain" />
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
                    <div className="w-2 h-2 bg-reef-blue rounded-full"></div>
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
                    <div className="w-2 h-2 bg-reef-blue rounded-full"></div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
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
              <form onSubmit={handleConsultationSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <Input 
                      placeholder="Enter your full name" 
                      className="rounded-xl h-12" 
                      value={consultationFormData.fullName}
                      onChange={(e) => handleConsultationInputChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                    <Input 
                      placeholder="+971 55 200 2369" 
                      className="rounded-xl h-12" 
                      value={consultationFormData.phone}
                      onChange={(e) => handleConsultationInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address *</label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="rounded-xl h-12" 
                    value={consultationFormData.email}
                    onChange={(e) => handleConsultationInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Investment Budget</label>
                    <Select value={consultationFormData.budget} onValueChange={(value) => handleConsultationInputChange('budget', value)}>
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
                    <Select value={consultationFormData.unitType} onValueChange={(value) => handleConsultationInputChange('unitType', value)}>
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
                  <Textarea 
                    placeholder="Tell us about your investment goals..." 
                    rows={4} 
                    className="rounded-xl" 
                    value={consultationFormData.message}
                    onChange={(e) => handleConsultationInputChange('message', e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white py-4 text-lg font-semibold rounded-xl disabled:opacity-50"
                  disabled={isConsultationSubmitting}
                >
                  {isConsultationSubmitting ? "Submitting..." : "Get Instant Consultation"}
                </Button>
              </form>
            </CardContent>
          </Card>


        </div>
      </section>

      {/* WhatsApp CTA */}
      <div className="w-full bg-gray-900 py-6 flex justify-center items-center">
        <div className="flex items-center gap-4">
          {/* WhatsApp Icon */}
          <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 12.3A9 9 0 1 1 12.3 3a9 9 0 0 1 8.7 9.3z" />
            <path d="M16.7 15.3c-.3.8-1.6 1.5-2.2 1.6-1.2.2-2.1-.1-3.2-.7-2.2-1.2-3.7-3.5-3.7-5.9 0-1.1.3-2.1 1-2.9.3-.3.7-.3 1 .1l1.2 1.7c.2.3.2.7-.1 1-.2.2-.4.5-.4.8 0 .2.1.4.2.6.3.5.7 1 1.2 1.3.2.1.4.1.6 0 .3-.1.6-.2.8-.4.3-.2.7-.2 1 .1l1.7 1.2c.4.3.4.7.1 1z"/>
          </svg>
          <span className="text-white font-semibold text-xl">Connect on WhatsApp for Instant Support</span>
          <a
            href="https://wa.me/971552002369?text=Hi%2C%20I%20am%20interested%20in%20REEF%20998%20project.%20Please%20share%20more%20details%20about%20availability%2C%20pricing%2C%20and%20payment%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-teal-400 text-zinc-900 font-semibold px-6 py-2 rounded-full shadow hover:bg-teal-300 transition"
          >
            Start Chat
          </a>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-reef-blue mb-4">REEF 998</div>
              <p className="text-sm opacity-80 mb-4">
                Revolutionary luxury living with patented outdoor cooling technology in Dubai Land Residence Complex.
              </p>
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

            <div className="md:col-span-2 flex justify-center">
              <div className="text-center">
                <Image 
                  src="/images/qr.png" 
                  alt="QR Code for REEF 998" 
                  width={120} 
                  height={120}
                  className="w-24 h-24"
                />
                <p className="text-sm opacity-80 mt-2">Scan to get more information</p>
              </div>
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
              . All Rights Reserved | Expected completion Q2 2028 | No brokerage fees
            </p>
            <p className="text-xs opacity-50 leading-relaxed">
              Primevista Real Estate is an authorized sales partner of REEF Luxury Developments. We are officially
              recognized by the developer to offer their products. All transactions are conducted in accordance with the
              terms and conditions set forth by the developer.
            </p>
          </div>
        </div>
      </footer>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://wa.me/971552002369?text=Hi%2C%20I%27m%20interested%20in%20REEF%20998%20luxury%20residences.%20Can%20you%20provide%20more%20information%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>
      {/* Amenities Popup Dialog */}
      <Dialog open={isAmenitiesPopupOpen} onOpenChange={setIsAmenitiesPopupOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Amenities Plan</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Image src="/images/amenities-plan.jpg" alt="Amenities Plan Large" width={1200} height={800} className="w-full h-auto rounded-xl" />
          </div>
        </DialogContent>
      </Dialog>
      {/* Location Map Popup Dialog */}
      <Dialog open={isLocationPopupOpen} onOpenChange={setIsLocationPopupOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Location Map</DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <Image src="/images/location-map.jpg" alt="Location Map Large" width={1200} height={800} className="w-full h-auto rounded-xl" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
