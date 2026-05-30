"use client";

import React, { useState } from "react";
import { ChevronDown, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

const regionalOffices = [
  {
    city: 'KOLKATA',
    addresses: [
      'Kamrbari, Basina, Rajarhat-Newtown, Kol-135',
      '34, Circus Ave, opposite Aakash Institute, Lower Range, Beck Bagan, Ballygunge, Kolkata, West Bengal 700017'
    ]
  },
  {
    city: 'BANGALORE',
    addresses: ['Office details coming soon'],
    isComingSoon: true
  },
  {
    city: 'MUMBAI',
    addresses: ['Office details coming soon'],
    isComingSoon: true
  }
];

const stats = [
  { value: '150+', label: 'Universities' },
  { value: '20+', label: 'Countries' },
  { value: '50,000+', label: 'Students Guided' },
  { value: '100+', label: 'Resources' }
];

const studentSupportLinks = [
  'Career Counselling', 'Admission Support', 'Visa Assistance', 
  'Travel Guidance', 'Hostel Guidance', 'Documentation Support'
];

const scholarshipLinks = [
  'Scholarships', 'Education Loans', 'Financial Planning', 
  'Funding Opportunities', 'Cost Estimation'
];

const trustLinks = [
  'NMC Guidance', 'WHO Listed Universities', 'Verified Information', 
  'Student First Approach', 'Transparent Guidance'
];

const communityLinks = [
  { name: 'Facebook', icon: '📘', url: 'https://facebook.com/ilmalink' },
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com/ilmalink' },
  { name: 'YouTube', icon: '▶️', url: 'https://youtube.com/ilmalink' },
  { name: 'WhatsApp Community', icon: '💬', url: 'https://whatsapp.com/channel/ilmalink' }
];

const quickAccessLinks = [
  'Apply Now', 'Free Counselling', 'Scholarships', 'Education Loans', 'Contact Us'
];

const legalLinks = [
  'Privacy Policy', 'Terms of Use', 'Disclaimer', 'Sitemap', 'Contact Us'
];

const OfficeCard = ({ office }: { office: any }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-[#5DE9FF]/30 transition-all">
    <h3 className="text-[#5DE9FF] font-bold text-lg mb-3">{office.city}</h3>
    {office.isComingSoon ? (
      <p className="text-gray-400 text-sm">{office.addresses[0]}</p>
    ) : (
      <address className="not-italic space-y-3">
        {office.addresses.map((addr: string, idx: number) => (
          <p key={idx} className="text-gray-300 text-sm leading-relaxed">{addr}</p>
        ))}
      </address>
    )}
  </div>
);

const AccordionSection = ({ title, links }: { title: string; links: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left text-white font-semibold text-lg"
      >
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mb-4' : 'max-h-0'}`}>
        <ul className="space-y-3">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-[#5DE9FF] transition-colors">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#020C23] to-[#021A3D] text-white">
      <section className="relative px-4 pt-12 pb-8 md:pt-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#5DE9FF]/10 via-[#021A3D] to-[#020C23] rounded-3xl md:rounded-[36px] p-6 md:p-12 border border-[#5DE9FF]/20 shadow-2xl">
            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-[#5DE9FF] bg-clip-text text-transparent">
                Explore Medical Education Worldwide
              </h2>
              <p className="text-gray-300 text-base md:text-lg mb-8">
                Discover universities, scholarships, financial aid opportunities and trusted guidance for medical education around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/explore-opportunities" className="px-8 py-3 bg-[#5DE9FF] text-[#020C23] font-semibold rounded-full hover:shadow-lg hover:shadow-[#5DE9FF]/20 transition-all">
                  Explore Opportunities
                </Link>
                <Link href="/free-counselling" className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all">
                  Get Free Counselling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl">ILMALINK MEDIGO</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Global Medical Education Platform. Connecting aspiring medical students with verified universities, scholarships, and trusted guidance worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Regional Offices</h3>
            <div className="space-y-4">
              {regionalOffices.map((office, idx) => (
                <OfficeCard key={idx} office={office} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contact Hub</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-center gap-3 text-gray-300"><Phone className="w-4 h-4 text-[#5DE9FF]" /> +91 9330155576</p>
              <p className="flex items-center gap-3 text-gray-300"><span className="w-4 h-4 text-[#5DE9FF]">📱</span> +91 9563910223</p>
              <p className="flex items-center gap-3 text-gray-300"><Mail className="w-4 h-4 text-[#5DE9FF]" /> middya@ilmalink.com</p>
              <p className="flex items-start gap-3 text-gray-300"><Clock className="w-4 h-4 text-[#5DE9FF] mt-0.5" /><span>Mon–Sat<br />10:00 AM – 8:00 PM</span></p>
            </address>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Access</h3>
            <ul className="space-y-3">
              {quickAccessLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-[#5DE9FF] transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-8 border-t border-white/10">
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Student Support</h3>
            <ul className="space-y-3">
              {studentSupportLinks.map((link, idx) => (
                <li key={idx}><Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-[#5DE9FF]">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Scholarships & Financial Assistance</h3>
            <ul className="space-y-3">
              {scholarshipLinks.map((link, idx) => (
                <li key={idx}><Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-[#5DE9FF]">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Trust & Compliance</h3>
            <ul className="space-y-3">
              {trustLinks.map((link, idx) => (
                <li key={idx}><Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-[#5DE9FF]">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Community</h3>
            <ul className="space-y-3">
              {communityLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#5DE9FF] transition-colors flex items-center gap-2">
                    <span>{link.icon}</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:hidden space-y-6">
          <div>
            <h3 className="text-white font-bold text-xl mb-3">ILMALINK MEDIGO</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Global Medical Education Platform.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Regional Offices</h3>
            <div className="space-y-4">{regionalOffices.map((office, idx) => (<OfficeCard key={idx} office={office} />))}</div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Contact Hub</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-center gap-3 text-gray-300"><Phone className="w-4 h-4 text-[#5DE9FF]" /> +91 9330155576</p>
              <p className="flex items-center gap-3 text-gray-300"><span className="w-4 h-4 text-[#5DE9FF]">📱</span> +91 9563910223</p>
              <p className="flex items-center gap-3 text-gray-300"><Mail className="w-4 h-4 text-[#5DE9FF]" /> middya@ilmalink.com</p>
              <p className="flex items-start gap-3 text-gray-300"><Clock className="w-4 h-4 text-[#5DE9FF] mt-0.5" /><span>Mon–Sat<br />10:00 AM – 8:00 PM</span></p>
            </address>
          </div>
          <AccordionSection title="Student Support" links={studentSupportLinks} />
          <AccordionSection title="Scholarships & Financial Assistance" links={scholarshipLinks} />
          <AccordionSection title="Trust & Compliance" links={trustLinks} />
          <AccordionSection title="Community" links={communityLinks.map(c => c.name)} />
          <AccordionSection title="Quick Access" links={quickAccessLinks} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-12 md:my-16 pt-8 border-t border-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-5 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-[#5DE9FF] mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-4">
            {legalLinks.map((link, idx) => (
              <Link key={idx} href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-gray-400 hover:text-[#5DE9FF] text-sm transition-colors">
                {link}
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm">© 2026 ILMALINK MEDIGO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;