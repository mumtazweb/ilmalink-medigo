"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { createPortal } from "react-dom";

import {
  X,
  BadgeCheck,
  Calendar,
  GraduationCap,
  BookOpen,
  Globe,
  Sparkles,
  Stethoscope
} from "lucide-react";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface FormData {
  name: string;
  mobile: string;
  course: string;
  preference: string;
  location: string;
  message: string;
}

export default function CounsellingPopup({ isOpen, onClose }: PopupProps){
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    course: "",
    preference: "",
    location: "",
    message: "",
  });

  if (!mounted || !isOpen) return null;

const portalRoot = document.getElementById("modal-root") ?? document.body;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const message = `
New Counselling Request

Name: ${formData.name}
Mobile: ${formData.mobile}
Course: ${formData.course}
Study Preference: ${formData.preference}
State/Country: ${formData.location}
Message: ${formData.message}
`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(
        `https://wa.me/919563910223?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } else {
      window.location.href = `mailto:injamulhoquemiddya@gmail.com?subject=New Counselling Request&body=${encodeURIComponent(message)}`;
    }
  };

  return createPortal(
  <div
    className="fixed inset-0 isolate flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-6"
    style={{
      zIndex: 2147483647,
      position: "fixed",
      inset: 0,
      isolation: "isolate",
    }}
    onClick={onClose}
>
  <div
    className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
    style={{ zIndex: 2147483647 }}
    onClick={(e) => e.stopPropagation()}
  >
        
        {/* Close Button - Always Visible */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 bg-white/90 hover:bg-red-50 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110 group"
          aria-label="Close popup"
        >
          <X className="text-gray-600 group-hover:text-red-500" size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid lg:grid-cols-[30%_70%]">
            
            {/* LEFT PANEL */}
            <div className="bg-gradient-to-br from-[#0d9d55] via-[#0b7a46] to-[#064e2c] p-4 md:p-6 text-white relative overflow-hidden">
              
              {/* Background Aspirant Elements */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
                <div className="absolute top-8 left-5">
                  <GraduationCap size={70} />
                </div>
                <div className="absolute top-20 right-10 text-red-400">
                  <div className="text-5xl font-bold">✚</div>
                </div>
                <div className="absolute bottom-16 left-8">
                  <Stethoscope size={60} />
                </div>
                <div className="absolute top-[45%] left-[35%]">
                  <Globe size={100} />
                </div>
                <div className="absolute bottom-[25%] right-[15%]">
                  <BookOpen size={60} />
                </div>
                <div className="absolute top-[65%] left-[20%]">
                  <Sparkles size={30} />
                </div>
                <div className="absolute top-[25%] right-[20%]">
                  <Sparkles size={30} />
                </div>
              </div>

              {/* Logo Section */}
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl px-4 py-2 flex gap-3 items-center shadow-md">
                  <img
                    src="/logoimage.svg"
                    className="w-8 h-8 md:w-10 md:h-10"
                    alt="ILMALINK MEDIGO Logo"
                  />
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base md:text-lg leading-none">
                      <span className="text-green-600">Ilma</span>
                      <span className="text-red-500">Link</span>
                    </h3>
                    <span className="text-blue-600 font-semibold text-xs md:text-sm">MEDIGO</span>
                  </div>
                </div>
              </div>

              {/* Journey Text */}
              <div className="text-center mt-4 md:mt-6">
                <h2 className="font-bold text-xl md:text-3xl whitespace-nowrap">
                  Your Medical Journey
                </h2>
                <div className="flex items-end justify-center mt-2">
                  <div className="relative">
                    <h3
                      className="text-[#FFD232] text-3xl md:text-[48px] font-semibold italic leading-none"
                      style={{
                        fontFamily: "Dancing Script, cursive",
                        textShadow: "0px 0px 8px rgba(84, 82, 186, 0.4)",
                      }}
                    >
                      Starts Here
                    </h3>
                    <div className="absolute left-0 -bottom-1">
                      <div className="w-[80px] md:w-[120px] h-[3px] bg-red-500 rounded-full rotate-[-6deg]"></div>
                      <div className="w-[100px] md:w-[145px] h-[4px] bg-yellow-400 rounded-full rotate-[-10deg] mt-[2px] ml-2"></div>
                    </div>
                  </div>
                  <div className="flex items-center ml-2 mb-2">
                    <svg
                      width="70"
                      height="30"
                      viewBox="0 0 110 40"
                      fill="none"
                      className="w-[70px] md:w-[110px]"
                    >
                      <path
                        d="M0 20 H30 L40 8 L50 32 L60 15 L70 20 H100"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      className="text-red-500 text-2xl md:text-3xl -ml-1"
                      style={{
                        filter: "drop-shadow(0px 0px 6px rgba(239,68,68,.8))",
                      }}
                    >
                      ❤️
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Points */}
              <div className="space-y-3 md:space-y-4 mt-4 md:mt-6">
                {[
                  { 
                    icon: <GraduationCap size={16} />, 
                    title: "NEET Counselling & Medical Admission", 
                    desc: "Personalized guidance for India and Abroad"
                  },
                  { 
                    icon: <Globe size={16} />, 
                    title: "NMC & WHO Approved Universities", 
                    desc: "Explore foreign opportunities with confidence"
                  },
                  { 
                    icon: <BadgeCheck size={16} />, 
                    title: "Scholarship & Budget Guidance", 
                    desc: "Affordable medical education worldwide"
                  },
                  { 
                    icon: <BookOpen size={16} />, 
                    title: "Direct University Tie-ups", 
                    desc: "Verified university network globally"
                  },
                  { 
                    icon: <Stethoscope size={16} />, 
                    title: "Career Guidance", 
                    desc: "End-to-end support for success"
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-2 md:gap-3 group cursor-pointer hover:translate-x-1 transition duration-200">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/60 rounded-xl blur-md group-hover:blur-xl transition duration-300"></div>
                      <div className="relative bg-white/90 backdrop-blur-sm p-2 rounded-xl border border-white shadow-lg group-hover:scale-110 transition duration-200">
                        <div className="text-emerald-700 group-hover:text-emerald-600 transition">
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs md:text-sm text-white">{item.title}</h4>
                      <p className="text-[10px] md:text-xs text-white/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Student Card */}
              <div className="bg-white rounded-2xl p-3 md:p-4 mt-4 md:mt-6 text-black">
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-3">
                    {[
                      "https://randomuser.me/api/portraits/women/44.jpg",
                      "https://randomuser.me/api/portraits/men/32.jpg",
                      "https://randomuser.me/api/portraits/women/68.jpg",
                      "https://randomuser.me/api/portraits/men/75.jpg",
                      "https://randomuser.me/api/portraits/women/90.jpg"
                    ].map((img,index) => (
                      <img
                        key={index}
                        src={img}
                        alt="Student"
                        className="w-7 h-7 md:w-9 md:h-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-xl md:text-2xl">5000+</h3>
                    <p className="text-xs md:text-sm font-medium">Students Guided</p>
                    <p className="text-xs text-gray-500">Successfully ❤️</p>
                  </div>
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-black/20 rounded-xl p-3 md:p-4 mt-3 md:mt-4">
                <h4 className="font-semibold text-sm md:text-base">Trusted by Thousands</h4>
                <p className="text-xs md:text-sm">Students & Parents Worldwide</p>
              </div>
            </div>

            {/* RIGHT PANEL - Form */}
            <div className="p-4 md:p-8 overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <h1 className="font-bold text-2xl md:text-4xl text-[#111827]">
                  Looking For
                  <span className="text-green-600"> MBBS</span>
                  <br />
                  Admission Guidance?
                </h1>
                <div className="w-[80px] md:w-[120px] h-[3px] md:h-[4px] rounded-full bg-red-500 mt-2 md:mt-3" />
                <p className="mt-3 md:mt-4 text-gray-500 text-sm md:text-base">
                  Fill in your details and our team will connect with you
                </p>

                <div className="space-y-3 md:space-y-4 mt-5 md:mt-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="👤 Full Name"
                      className="w-full p-3 md:p-4 border rounded-xl bg-[#f8fafc] text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                      required
                    />
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="📱 Mobile"
                      className="w-full p-3 md:p-4 border rounded-xl bg-[#f8fafc] text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                      required
                    />
                  </div>

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full p-3 md:p-4 border rounded-xl bg-[#f8fafc] text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                    required
                  >
                    <option value="">📚 Course Interested</option>
                    <option value="MBBS">MBBS</option>
                    <option value="BDS">BDS</option>
                    <option value="Nursing">Nursing</option>
                    <option value="AYUSH">AYUSH</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    name="preference"
                    value={formData.preference}
                    onChange={handleChange}
                    className="w-full p-3 md:p-4 border rounded-xl bg-[#f8fafc] text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                    required
                  >
                    <option value="">🌍 Study Preference</option>
                    <option value="India">India</option>
                    <option value="Abroad">Abroad</option>
                  </select>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={
                      formData.preference === "India"
                        ? "📍 State Preference"
                        : "📍 Preferred Country"
                    }
                    className="w-full p-3 md:p-4 border rounded-xl bg-[#f8fafc] text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                    required
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="💬 Message"
                    className="w-full p-3 md:p-4 border rounded-xl bg-[#f8fafc] text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold flex justify-center items-center gap-2 hover:shadow-lg transition text-sm md:text-base"
                  >
                    <Calendar size={16} />
                    Book Counselling Now
                  </button>

                  <div className="text-center text-xs md:text-sm text-gray-500">
                    🔒 Your information is 100% safe
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="bg-[#eef6ef] border-t border-[#c8e0ca] py-1.5 px-3">
            <div className="grid grid-cols-4 gap-1 md:gap-2">
              
              <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2 group cursor-pointer">
                <div className="relative flex-shrink-0">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-white to-emerald-100 rounded-lg shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition duration-200">
                    <span className="text-xs md:text-sm">🛡️</span>
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm ring-1 ring-white">
                    <span className="text-white text-[4px] md:text-[5px] font-bold">✓</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <h4 className="font-bold text-[#064e2c] text-[10px] md:text-[11px] leading-tight">100% Trusted Platform</h4>
                  <p className="text-[8px] md:text-[9px] text-[#4a7c59] leading-tight">Trusted by Thousands</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2 group cursor-pointer">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-white to-emerald-100 rounded-lg shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition duration-200">
                  <span className="text-xs md:text-sm">👨‍🎧</span>
                </div>
                <div className="hidden md:block">
                  <h4 className="font-bold text-[#064e2c] text-[10px] md:text-[11px] leading-tight">Expert Counsellors</h4>
                  <p className="text-[8px] md:text-[9px] text-[#4a7c59] leading-tight">24/7 Guidance & Support</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2 group cursor-pointer">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-white to-emerald-100 rounded-lg shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition duration-200">
                  <span className="text-xs md:text-sm">📋</span>
                </div>
                <div className="hidden md:block">
                  <h4 className="font-bold text-[#064e2c] text-[10px] md:text-[11px] leading-tight">Transparent Process</h4>
                  <p className="text-[8px] md:text-[9px] text-[#4a7c59] leading-tight">No Hidden Charges</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2 group cursor-pointer">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-white to-emerald-100 rounded-lg shadow-sm flex items-center justify-center group-hover:shadow-md group-hover:scale-105 transition duration-200">
                  <span className="text-xs md:text-sm">🎓</span>
                </div>
                <div className="hidden md:block">
                  <h4 className="font-bold text-[#064e2c] text-[10px] md:text-[11px] leading-tight">Post Admission Support</h4>
                  <p className="text-[8px] md:text-[9px] text-[#4a7c59] leading-tight">We&apos;re with you always</p>
                </div>
              </div>

            </div>
          </div>
           </div>
    </div>
  </div>,
  portalRoot
);
}