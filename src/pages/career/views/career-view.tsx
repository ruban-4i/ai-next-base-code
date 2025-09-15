'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CareerHeader } from '../components/career-header';
import { HeroSection } from '../components/hero-section';
import { FeatureCard } from '../components/feature-card';
import { LocationCard } from '../components/location-card';
import { ContactSection } from '../components/contact-section';
import { FooterSection } from '../components/footer-section';

export function CareerView() {
  const features = [
    {
      title: 'Innovative Work Environment',
      description: 'Collaborate with industry leaders and innovators in a dynamic and supportive workplace.',
      icon: '/assets/career/icons/spinner-circle.png',
      bgColor: 'bg-[#3795bd]',
      textColor: 'text-white',
      descColor: 'text-white',
    },
    {
      title: 'Career Growth',
      description: 'We invest in our employees\' professional development and provide opportunities for advancement.',
      icon: '/assets/career/icons/trending-up.png',
      bgColor: 'bg-neutral-50',
      textColor: 'text-[#464646]',
      descColor: 'text-[#7e7e7e]',
    },
    {
      title: 'Impactful Projects',
      description: 'Work on projects that challenge you and contribute to our vision.',
      icon: '/assets/career/icons/assignment.png',
      bgColor: 'bg-[#e9ecff]',
      textColor: 'text-[#464646]',
      descColor: 'text-[#7e7e7e]',
    },
    {
      title: 'Comprehensive Benefits',
      description: 'On learning and competitive career roadmap and matching to the growing industry dynamics.',
      icon: '/assets/career/icons/category.png',
      bgColor: 'bg-[#201e43]',
      textColor: 'text-white',
      descColor: 'text-white',
    },
  ];

  const locations = [
    {
      country: 'INDIA',
      icon: '/assets/career/icons/india-gate.svg',
      address: 'HQ, 2nd Floor, Rajiv Gandhi Salai (OMR)',
      city: 'Kazhipattur, Thiruporur Taluk 603103 Chengalpattu',
      phone: 'Tel : + 91 44 6638 0000',
    },
    {
      country: 'UAE',
      icon: '/assets/career/icons/burj-al-arab.svg',
      address: '123, RKM Building, Hor Al Anz East',
      city: 'Abu Hail, PO Box: 236830 Dubai',
      phone: 'Tel : +971 42690072',
    },
    {
      country: 'QATAR',
      icon: '/assets/career/icons/qatar-building.png',
      address: 'P.O. Box 18639',
      city: 'Industrial Area Doha',
      phone: 'Tel : +97450303956',
    },
    {
      country: 'OMAN',
      icon: '/assets/career/icons/oman-museum.svg',
      address: 'C.R : 1220243 P.O Box # 3360',
      city: 'PC #135 Knowledge, Oasis Muscat',
      phone: 'Tel : +96894003501',
    },
    {
      country: 'LONDON',
      icon: '/assets/career/icons/london-clock.svg',
      address: 'Office 59 61 Praed Street, London',
      city: 'United Kingdom, W2 1NS London',
      phone: 'Tel : +447469738733',
    },
    {
      country: 'USA',
      icon: '/assets/career/icons/statue-liberty.png',
      address: '12410 Milestone Center Dr Suite 600,',
      city: 'Germantown, MD 20876 Washington DC',
      phone: 'Tel : +13019791738',
    },
    {
      country: 'CANADA',
      icon: '/assets/career/icons/canada-maple-leaf.svg',
      address: '700-1199 West Hastings Street, Suite 700,',
      city: 'Vancouver, BC Canada V6E 3T5 Vancouver',
      phone: 'Tel : +1-301-979-1738',
    },
    {
      country: 'MALAYSIA',
      icon: '/assets/career/icons/malaysia-building-group.svg',
      address: 'Level 35-02 East Wing Q Sentral',
      city: '2A Jalan Stesen Sentral 2 KL Sentral Kuala Lumpur',
      phone: 'Tel : +60177820682',
    },
    {
      country: 'SINGAPORE',
      icon: '/assets/career/icons/singapore-merlion.svg',
      address: '10 Jalan Besar, #10-09 Sim Lim Tower',
      city: '208787 Singapore',
      phone: 'Tel : +65 971 556 72',
    },
  ];

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/career/backgrounds/main-background.png')" }}>
      {/* Header */}
      <CareerHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Join Our Team Section */}
      <section className="relative px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-[#204429]">Join our Team !</h2>
        <p className="mx-auto max-w-6xl text-2xl font-medium leading-9 text-gray-600">
          Are you ready to take the next step in your career? Join us and become part of a dynamic team dedicated to Career enhancements and great learning opportunity. We're looking for talented individuals who are passionate about IT and are eager to make a difference.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative px-6 py-16">
        <h2 className="mb-16 text-center text-4xl font-medium text-[#263238]">Why Choose us ?</h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Our Premise Section */}
      <section className="relative px-6 py-16">
        <h2 className="mb-8 text-center text-4xl font-medium text-[#263238]">Our Premise</h2>
        <p className="mx-auto mb-12 max-w-5xl text-center text-2xl font-medium leading-7 text-[#5c5c5c]">
          Architects breathes life into your home dreams. We blend elegance with functionality, ensuring each space tells you a unique story !
        </p>
        <div className="mx-auto max-w-4xl">
          <Image
            src="/assets/career/backgrounds/premise-photo.png"
            alt="Our team premise"
            width={1200}
            height={400}
            className="rounded-2xl object-cover"
            priority
          />
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="relative px-6 py-16">
        <h2 className="mb-8 text-center text-4xl font-medium text-[#263238]">How to Apply ?</h2>
        <p className="mx-auto mb-12 max-w-6xl text-center text-2xl font-medium leading-10 text-[#4f4f4f]">
          To apply for a position please submit your resume and cover letter through our online application system. We look forward to reviewing your application and discovering how your skills and experience align with our team.
        </p>
        <div className="flex justify-center">
          <Image
            src="/assets/career/illustrations/job-hunting-animation.png"
            alt="Job hunting illustration"
            width={288}
            height={288}
            className="object-contain"
          />
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactSection />

      {/* Our Locations Section */}
      <section className="relative px-6 py-16">
        <h2 className="mb-12 text-center text-4xl font-medium text-[#263238]">Our Locations</h2>
        <div className="mx-auto max-w-7xl overflow-x-auto">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {locations.map((location, index) => (
              <LocationCard key={index} {...location} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />

      {/* Decorative Illustrations */}
      <div className="pointer-events-none absolute left-0 top-48 -z-10 opacity-50">
        <Image
          src="/assets/career/illustrations/left-illustration.svg"
          alt=""
          width={200}
          height={400}
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-48 -z-10 opacity-50">
        <Image
          src="/assets/career/illustrations/right-illustration.svg"
          alt=""
          width={200}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
}
