"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Aperture, BookOpen, Calendar, Users, Briefcase, Mail, Phone, MapPin, 
  Menu, X, ChevronRight, GraduationCap, Search, User, Shield, Award,
  ArrowRight, Play, Star, Quote, Heart, Eye, Clock, Download
} from 'lucide-react';
import Image from 'next/image';
// Custom colors based on the Annex School Logo
const PRIMARY_BLUE = '#0A1974';
const ACCENT_GOLD = '#FFD700';
const SECONDARY_BLUE = '#1E3A8A';

const FIXED_PAGE_PADDING = "mx-auto px-4 lg:px-[150px]";

// Enhanced Mock Data
const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Academics', href: '#academics' },
  { name: 'Admissions', href: '#admissions' },
  { name: 'Campus Life', href: '#campus-life' },
  { name: 'News & Events', href: '#news' },
];

const quickLinks = [
  { name: 'Student Portal', icon: User, href: '#' },
  { name: 'Teacher Portal', icon: Users, href: '#' },
  { name: 'Staff Login', icon: Shield, href: '#' },
  { name: 'Calendar', icon: Calendar, href: '#' },
];

const features = [
  { icon: BookOpen, title: 'Holistic Curriculum', description: 'Fostering intellectual, emotional, and social growth through balanced learning.' },
  { icon: Users, title: 'Dedicated Faculty', description: 'Experienced educators committed to personalized student mentorship and success.' },
  { icon: Aperture, title: 'Modern Facilities', description: 'State-of-the-art labs, library, and sports complexes supporting all learning types.' },
  { icon: Heart, title: 'Inclusive Community', description: 'Diverse and welcoming environment that celebrates every student\'s uniqueness.' },
];

const newsItems = [
  { 
    date: 'NOV 15', 
    title: 'Clay Modeling Competition ', 
    description: 'Our students secured 3 gold medals at the regional Science Olympiad competition.',
    image: '/clay.jpg',
    category: 'Achievements',
    readTime: '2 min read'
  },
  { 
    date: 'NOV 18', 
    title: 'Exam Cards Released', 
    description: 'Exam cards for the upcoming semester exams are now available for download from the student portal.',
    image: '/exam.jpg',
    category: 'Result Day',
    readTime: '3 min read'
  },
  { 
    date: 'NOV 20', 
    title: 'Health & Wellness Workshop', 
    description: 'Join us for a workshop on mental health and wellness strategies for students and parents.',
    image: '/checkup.jpg',
    category: 'Events',
    readTime: '4 min read'
  },
];

const stats = [
  { number: '98%', label: 'Graduation Rate' },
  { number: '25+', label: 'Clubs & Activities' },
  { number: '1:12', label: 'Student-Teacher Ratio' },
  { number: '15', label: 'AP Courses Offered' },
];

const programs = [
  { name: 'STEM Program', description: 'Advanced science and technology curriculum', icon: Aperture },
  { name: 'Arts Academy', description: 'Comprehensive visual and performing arts', icon: Star },
  { name: 'Sports Excellence', description: 'Elite athletic training programs', icon: Award },

];

const testimonials = [
  {
    name: 'Rafiqul Islam Nihal',
    role: 'Alumni, Class of 2020',
    content: 'Annex School provided me with the foundation to excel at Stanford University. The teachers genuinely care about student success.',
    avatar: '/avatar1.jpg'
  },
  {
    name: 'Md Karim Uddin',
    role: 'Parent',
    content: 'The supportive environment and excellent faculty have helped my daughter thrive both academically and personally.',
    avatar: '/avatar2.jpg'
  },
  {
    name: 'Yeasin Khan Arafath',
    role: 'Faculty Member',
    content: 'Teaching at Annex School is incredibly rewarding. We foster creativity and critical thinking in every student.',
    avatar: '/avatar3.jpg'
  }
];

// Custom hook for scroll-triggered animations
const useScrollAnimation = <T extends HTMLElement = HTMLElement>(threshold = 0.1): [React.RefObject<T | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Custom hook for scroll-triggered navbar
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};

const SchoolLogo = () => (
  <a href="#" className="flex items-center space-x-3 group">
    <img
      src="/logo.png"
      alt="Annex School Logo" 
      className="h-17 w-auto rounded-md object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/60x60/FFD700/0A1974?text=Annex'; }}
    />
  </a>
);

/**
 * Enhanced Navigation with Scroll Behavior
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled ? 'shadow-2xl bg-white/95 backdrop-blur-md' : 'bg-white'
      }`}
    >
      {/* Utility Bar */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className={`${FIXED_PAGE_PADDING} flex items-center justify-between py-2 text-sm`}>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">🎓 Now Accepting Applications for 2024-2025</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {quickLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                <link.icon size={14} />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`${FIXED_PAGE_PADDING} flex items-center justify-between p-4 lg:p-4`}>
        <SchoolLogo />
        
        {/* Desktop Navigation with Search */}
        <div className="hidden lg:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-medium transition-all duration-300 hover:text-blue-600 group py-2"
                style={{ color: PRIMARY_BLUE }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-hover:scale-110" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-48 focus:w-64"
              />
            </div>
            
            <a
              href="#contact"
              className="rounded-full px-6 py-2 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg transform hover:rotate-1"
              style={{ backgroundColor: ACCENT_GOLD, color: PRIMARY_BLUE }}
            >
              Contact
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          style={{ color: PRIMARY_BLUE }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{ backgroundColor: PRIMARY_BLUE, top: '6.5rem' }}
      >
        <nav className="flex flex-col p-6 space-y-2">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-4 text-lg font-medium text-white transition-all duration-500 hover:bg-white/10 transform hover:translate-x-4 hover:scale-105"
              style={{ 
                borderLeft: `4px solid ${ACCENT_GOLD}`,
                transitionDelay: `${index * 100}ms`
              }}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-white/20 mt-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg p-4 text-lg font-bold text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: ACCENT_GOLD, color: PRIMARY_BLUE }}
            >
              Contact Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

/**
 * Enhanced Hero Section with Advanced Animations
 */
/**
 * Enhanced Hero Section with Background Image
 */
const HeroSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <section
      ref={ref}
      className="relative pt-48 pb-20 w-full overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.jpg')",
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: PRIMARY_BLUE,
            opacity: 0.85 // Adjust this value to control the overlay darkness
          }}
        ></div>
      </div>

      {/* Animated Background Elements - Reduced opacity to work with image */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-yellow-400 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-yellow-400 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-yellow-400 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-yellow-400 animate-pulse delay-1000"></div>
      </div>

      <div className={`relative z-10 w-full ${FIXED_PAGE_PADDING}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
                Empowering <span style={{ color: ACCENT_GOLD }}>Minds</span> for a Brighter Tomorrow
              </h1>
              <p className="text-xl md:text-2xl text-zinc-200 font-light leading-relaxed">
                Where Tradition Meets Innovation in Education. Excellence in learning since 1985. 
                Join our community of lifelong learners and future leaders.
              </p>
            </div>
            
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#admissions"
                className="group relative inline-flex items-center justify-center space-x-3 rounded-full px-8 py-4 text-lg font-bold uppercase transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
                style={{ backgroundColor: ACCENT_GOLD, color: PRIMARY_BLUE }}
              >
                <span className="relative z-10">Apply Now</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </a>
              <a
                href="#tour"
                className="group relative inline-flex items-center justify-center space-x-3 rounded-full border-2 px-8 py-4 text-lg font-bold uppercase transition-all duration-500 hover:bg-white/10 overflow-hidden"
                style={{ borderColor: ACCENT_GOLD, color: ACCENT_GOLD }}
              >
                <Play size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">Virtual Tour</span>
                <div className="absolute inset-0 bg-yellow-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`text-center p-4 rounded-xl backdrop-blur-sm bg-white/10 transition-all duration-700 hover:scale-105 hover:bg-white/20 cursor-pointer ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-zinc-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Component */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
          }`}>
            <div className="relative group">
              <div 
                className="w-full max-w-md rounded-3xl p-8 shadow-2xl backdrop-blur-sm mx-auto transition-all duration-500 hover:shadow-3xl hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: `3px solid ${ACCENT_GOLD}` }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: PRIMARY_BLUE }}>
                  📅 Upcoming Events
                </h3>
                
                {newsItems.slice(0, 2).map((event, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg mb-4 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group/card border border-transparent hover:border-yellow-400/30"
                    style={{ backgroundColor: PRIMARY_BLUE + '08' }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-center min-w-16">
                        <div className="text-sm font-bold" style={{ color: ACCENT_GOLD }}>{event.date}</div>
                        <div className="text-xs text-gray-600">{event.category}</div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 group-hover/card:text-blue-600 transition-colors duration-300">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <a 
                  href="#news" 
                  className="block text-center mt-6 font-semibold transition-all duration-300 group/link py-2 rounded-lg hover:bg-blue-50"
                  style={{ color: PRIMARY_BLUE }}
                >
                  View All Events <ArrowRight size={16} className="inline group-hover/link:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-yellow-400 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-yellow-400 animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
/**
 * Enhanced About Section with Advanced Card Animations
 */
const AboutSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="about" ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 ${FIXED_PAGE_PADDING}`}>
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>
            About Annex School
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over three decades, we've been committed to providing exceptional education that 
            prepares students for success in college, career, and life.
          </p>
        </div>

        {/* Mission & Features Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
          {/* Mission Statement - Left Side */}
          <div className={`xl:col-span-2 space-y-8 transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <div className="group p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105 border-2 border-transparent hover:border-yellow-400/50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg" style={{ backgroundColor: ACCENT_GOLD }}>
                  <Award size={32} style={{ color: PRIMARY_BLUE }} />
                </div>
                <h3 className="text-3xl font-bold" style={{ color: PRIMARY_BLUE }}>Our Mission</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To inspire and prepare students to become compassionate, innovative leaders who 
                make a positive impact in their communities and the world.
              </p>
              <div className="space-y-4">
                {['Academic Excellence', 'Character Development', 'Global Citizenship', 'Lifelong Learning'].map((item, index) => (
                  <div key={item} className="flex items-center space-x-4 group/item transition-all duration-300 hover:translate-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 transition-all duration-300 group-hover/item:scale-150"></div>
                    <span className="font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Cards - Right Side */}
          <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-3xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden relative ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ 
                  borderColor: PRIMARY_BLUE, 
                  backgroundColor: 'white',
                  transitionDelay: `${400 + index * 100}ms`
                }}
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-yellow-400/5 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-md" style={{ backgroundColor: ACCENT_GOLD + '20' }}>
                      <feature.icon size={28} style={{ color: PRIMARY_BLUE }} />
                    </div>
                    <h4 className="text-xl font-semibold" style={{ color: PRIMARY_BLUE }}>
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-800">
                    {feature.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-400 transform translate-x-3 -translate-y-3 rotate-45 transition-all duration-500 group-hover:scale-150"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { number: '35+', label: 'Years of Excellence' },
            { number: '2,000+', label: 'Successful Alumni' },
            { number: '95%', label: 'College Acceptance' },
            { number: '50+', label: 'National Awards' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
              style={{ backgroundColor: PRIMARY_BLUE + '08' }}
            >
              <div className="text-3xl font-bold mb-2 transition-all duration-300 group-hover:scale-110" style={{ color: PRIMARY_BLUE }}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold transition-all duration-300 group-hover:text-gray-800">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Academics Section with Interactive Cards
 */
const AcademicsSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="academics" ref={ref} className="py-20 relative overflow-hidden" style={{ backgroundColor: SECONDARY_BLUE }}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-400 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-yellow-400 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-yellow-400 animate-pulse delay-500"></div>
      </div>

      <div className={`relative z-10 ${FIXED_PAGE_PADDING}`}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold mb-6 text-white">Academics & Programs</h2>
          <p className="text-xl text-zinc-200 max-w-3xl mx-auto">
            Discover a path of excellence from foundational learning to advanced studies across all disciplines.
          </p>
        </div>

        {/* School Levels with Enhanced Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { 
              level: 'Junior School (K-5)', 
              description: 'Building strong foundations through play-based learning and curiosity development.',
              icon: '🎓',
              color: 'from-purple-500 to-pink-500'
            },
            { 
              level: 'High School (6-10)', 
              description: 'Developing critical thinking and exploration across diverse subject areas.',
              icon: '🎓',
              color: 'from-blue-500 to-cyan-500'
            },
            
          ].map((school, index) => (
            <div
              key={index}
              className="group relative text-center p-8 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${school.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Animated Icon */}
              <div className="relative mb-6">
                <div className="text-4xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  {school.icon}
                </div>
                <div className="absolute inset-0 bg-current opacity-5 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 transition-all duration-300 group-hover:scale-105" style={{ color: PRIMARY_BLUE }}>
                {school.level}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed transition-all duration-300 group-hover:text-gray-800">
                {school.description}
              </p>
              <a href="#" className="inline-flex items-center font-semibold transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" style={{ color: PRIMARY_BLUE }}>
                Learn More <ArrowRight size={16} className="ml-2" />
              </a>

              {/* Shine Effect */}
              <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Featured Programs Grid */}
        <div className={`transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-3xl font-bold mb-12 text-center text-white">Featured Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden border border-white/20"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-all duration-500 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="p-3 rounded-xl inline-block mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" style={{ backgroundColor: PRIMARY_BLUE }}>
                    <program.icon size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2 transition-all duration-300 group-hover:scale-105">{program.name}</h4>
                  <p className="text-sm text-zinc-300 transition-all duration-300 group-hover:text-white">{program.description}</p>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-yellow-400/50 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// students life
/**
 * Enhanced Student Life Section with Activities
 */
const StudentLifeSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  const studentActivities = [
    {
      icon: '🏗️',
      title: 'Clay Modeling Festival',
      description: 'Annual clay modeling competition where students showcase their creativity and artistic talents through beautiful clay sculptures.',
      highlights: ['Creative Expression', 'Skill Development', 'Team Collaboration']
    },
    {
      icon: '🎪',
      title: 'Indoor Play Zone',
      description: 'State-of-the-art indoor play area with safe, modern equipment for physical activities and recreational fun during breaks.',
      highlights: ['Safe Environment', 'Physical Development', 'Social Interaction']
    },
    {
      icon: '🍚',
      title: 'Pitha Utshob',
      description: 'Traditional Bengali winter festival celebrating our cultural heritage with various types of pithas and traditional foods.',
      highlights: ['Cultural Heritage', 'Traditional Foods', 'Community Bonding']
    },
    {
      icon: '🎭',
      title: 'Annual Cultural Program',
      description: 'Grand cultural event featuring dance, drama, music, and art performances by our talented students.',
      highlights: ['Talent Showcase', 'Confidence Building', 'Cultural Diversity']
    }
  ];

  return (
    <section id="student-life" ref={ref} className="py-20 bg-linear-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-200 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 ${FIXED_PAGE_PADDING}`}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>
            Student Life at Annex
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beyond academics, we foster a vibrant campus life filled with cultural celebrations, 
            creative expressions, and joyful learning experiences that shape well-rounded individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-10 opacity-0 scale-95'
          }`}>
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:scale-105">
                <img
                  src="/student.png"
                  alt="Happy Students at Annex School"
                  className="w-full h-auto object-cover"
                  onError={(e) => { 
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src='https://placehold.co/600x400/0A1974/FFD700?text=Happy+Students+at+Annex+School'; 
                  }}
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400"></div>
              
              {/* Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-sm bg-white/90 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-semibold text-center" style={{ color: PRIMARY_BLUE }}>
                  Our students enjoying the annual Pitha Utshob celebration
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Activities */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            {studentActivities.map((activity, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-yellow-400/50 relative overflow-hidden"
                style={{ backgroundColor: 'white' }}
              >
                {/* Hover Background */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-yellow-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="relative z-10 flex items-start space-x-4">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="p-3 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-md" style={{ backgroundColor: ACCENT_GOLD + '20' }}>
                      <span className="text-2xl">{activity.icon}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 transition-all duration-300 group-hover:scale-105" style={{ color: PRIMARY_BLUE }}>
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed transition-all duration-300 group-hover:text-gray-800">
                      {activity.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {activity.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm"
                          style={{ backgroundColor: ACCENT_GOLD + '20', color: PRIMARY_BLUE }}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Arrow on Hover */}
                <ArrowRight 
                  size={20} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Bar */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { number: '50+', label: 'Annual Events', icon: '🎉' },
            { number: '100%', label: 'Student Participation', icon: '👥' },
            { number: '15+', label: 'Cultural Activities', icon: '🎭' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
              style={{ backgroundColor: 'white', border: `2px solid ${PRIMARY_BLUE}20` }}
            >
              <div className="text-3xl mb-2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold mb-1 transition-all duration-300 group-hover:scale-110" style={{ color: PRIMARY_BLUE }}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold transition-all duration-300 group-hover:text-gray-800">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
};
/**
 * Enhanced Gallery Section with Filtering and Lightbox
 */
const GallerySection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [selectedCategory, setSelectedCategory] = useState('all');

  type GalleryImage = {
    id: number;
    src: string;
    alt: string;
    category: string;
    title: string;
    description: string;
    date: string;
  };

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryCategories = [
    { id: 'all', name: 'All Photos'},
    { id: 'events', name: 'School Events'},
    { id: 'activities', name: 'Activities'},
    { id: 'cultural', name: 'Cultural'},
    { id: 'achievements', name: 'Achievements' },
    { id: 'campus', name: 'Campus'},
  ];

  const galleryImages = [
    {
      id: 1,
      src: '/clay.jpg',
      alt: 'Students participating in Clay Modeling Festival',
      category: 'cultural',
      title: 'Clay Modeling Festival 2024',
      description: 'Creative clay art competition showcasing student talent',
      date: 'NOV 15, 2024'
    },
    {
      id: 2,
      src: '/hatekhori.jpg',
      alt: 'Hatekhori',
      category: 'cultural',
      title: 'Hatekhori Festival',
      description: 'Hatekhori celebration',
      date: 'JAN 20, 2024'
    },
    {
      id: 3,
      src: '/indoor.jpg',
      alt: 'Students enjoying indoor play zone',
      category: 'activities',
      title: 'Indoor Play Zone',
      description: 'Modern indoor recreational area for students',
      date: 'MAR 10, 2024'
    },
    
    
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  // Lightbox Component
  const Lightbox = () => {
    if (!selectedImage) return null;

    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const nextImage = galleryImages[(currentIndex + 1) % galleryImages.length];
    const prevImage = galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length];

    const handleNext = () => setSelectedImage(nextImage);
    const handlePrev = () => setSelectedImage(prevImage);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        <button
          onClick={() => setSelectedImage(null)}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <X size={24} className="text-white" />
        </button>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} className="text-white rotate-180" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        <div className="relative max-w-4xl max-h-[80vh] mx-4">
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="w-full h-full object-contain rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/800x600/0A1974/FFD700?text=${encodeURIComponent(selectedImage.title)}`;
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
            <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
            <p className="text-sm opacity-90">{selectedImage.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs opacity-75">{selectedImage.date}</span>
              <span className="px-2 py-1 text-xs rounded-full bg-yellow-400 text-blue-800 font-semibold">
                {galleryCategories.find(cat => cat.id === selectedImage.category)?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 ${FIXED_PAGE_PADDING}`}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>
            School Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the vibrant life at Annex School through our photo collection. 
            From cultural festivals to academic achievements, every moment tells a story.
          </p>
        </div>

        {/* Category Filters */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                selectedCategory === category.id
                  ? 'text-white shadow-lg transform scale-105'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? PRIMARY_BLUE : undefined,
                color: selectedCategory === category.id ? 'white' : undefined,
              }}
            >
              
              <span>{category.name}</span>
              {selectedCategory === category.id && (
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${500 + index * 100}ms`,
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                }}
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://placehold.co/400x300/0A1974/FFD700?text=${encodeURIComponent(image.title)}`;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Quick Info */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm bg-black/50">
                      {image.date}
                    </span>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                        <Eye size={24} className="text-white" />
                      </div>
                      <span className="text-white font-semibold text-sm">Click to View</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: ACCENT_GOLD + 'CC', color: PRIMARY_BLUE }}
                    >
                      {galleryCategories.find(cat => cat.id === image.category)?.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300" style={{ color: PRIMARY_BLUE }}>
                    {image.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {image.description}
                  </p>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-semibold mb-2" style={{ color: PRIMARY_BLUE }}>No Images Found</h3>
              <p className="text-gray-600">Try selecting a different category to see more photos.</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <div className="bg-linear-to-r from-blue-50 to-yellow-50 rounded-3xl p-8 border-2" style={{ borderColor: ACCENT_GOLD + '30' }}>
            <h3 className="text-3xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>
              Share Your Memories
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Are you a student or parent with great photos of school events? 
              Share them with us to be featured in our gallery!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center space-x-3 rounded-full px-8 py-4 font-bold transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: ACCENT_GOLD, color: PRIMARY_BLUE }}
              >
                <span>Submit Photos</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#student-life"
                className="group inline-flex items-center justify-center space-x-3 rounded-full border-2 px-8 py-4 font-bold transition-all duration-500 hover:bg-blue-50"
                style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE }}
              >
                <span>View Student Life</span>
                <Users size={20} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox />

      {/* Add CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

/**
 * Enhanced News & Events Section with Interactive Cards
 */
const NewsSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="news" ref={ref} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 ${FIXED_PAGE_PADDING}`}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>
            News & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest happenings, achievements, and events at Annex School.
          </p>
        </div>

        {/* News Grid with Enhanced Cards */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {newsItems.map((item, index) => (
            <article
  key={index}
  className="group bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer relative"
>
  {/* Image Container with Hover Effect */}
  <div className="relative h-48 overflow-hidden">
    <Image
      src={item.image}
      alt={item.title}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 z-10" style={{ backgroundColor: ACCENT_GOLD + 'CC', color: PRIMARY_BLUE }}>
      {item.category}
    </div>
    <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white/80 z-10">
      <Clock size={14} />
      <span className="text-sm">{item.readTime}</span>
    </div>
    {/* Hover Overlay Content */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-500">
        <Eye size={24} className="text-white" />
      </div>
    </div>
  </div>
              
              {/* Content */}
              <div className="p-6 relative">
                {/* Date Badge */}
                <div className="absolute -top-4 right-6 bg-yellow-400 text-blue-800 px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {item.date}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300 pr-16" style={{ color: PRIMARY_BLUE }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed transition-all duration-300 group-hover:text-gray-800">
                  {item.description}
                </p>
                <a href="#" className="inline-flex items-center font-semibold transition-all duration-300 group-hover:translate-x-2 group-hover:scale-105" style={{ color: PRIMARY_BLUE }}>
                  Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 group-hover:w-full transition-all duration-500"></div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <a
            href="#"
            className="group inline-flex items-center space-x-3 rounded-full px-8 py-4 font-bold uppercase transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: ACCENT_GOLD, color: PRIMARY_BLUE }}
          >
            <span className="relative z-10">View All News & Events</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Campus Life Section with Interactive Cards
 */
const CampusLifeSection = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section id="campus-life" ref={ref} className="py-20 bg-white relative overflow-hidden">
      <div className={`relative z-10 ${FIXED_PAGE_PADDING}`}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold mb-6" style={{ color: PRIMARY_BLUE }}>
            Campus Life
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the vibrant community and endless opportunities beyond the classroom.
          </p>
        </div>

        {/* Campus Activities Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {[
            { 
              icon: Users, 
              title: 'Clubs & Organizations', 
              count: '25+',
              description: 'From robotics to debate, find your passion',
              color: 'from-blue-500 to-cyan-500'
            },
            { 
              icon: Award, 
              title: 'Sports Teams', 
              count: '15',
              description: 'Competitive and recreational athletics',
              color: 'from-green-500 to-emerald-500'
            },
            { 
              icon: BookOpen, 
              title: 'Arts Programs', 
              count: '12',
              description: 'Visual and performing arts opportunities',
              color: 'from-purple-500 to-pink-500'
            },
            { 
              icon: Heart, 
              title: 'Community Service', 
              count: '1000+ hrs',
              description: 'Making a difference in our community',
              color: 'from-red-500 to-orange-500'
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer relative overflow-hidden border-2"
              style={{ borderColor: PRIMARY_BLUE, backgroundColor: 'white' }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="p-4 rounded-2xl inline-block transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg" style={{ backgroundColor: ACCENT_GOLD + '20' }}>
                  <item.icon size={32} style={{ color: PRIMARY_BLUE }} />
                </div>
                {/* Floating Particles */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2 transition-all duration-300 group-hover:scale-105" style={{ color: PRIMARY_BLUE }}>{item.count}</h3>
              <p className="text-gray-600 font-semibold mb-3 transition-all duration-300 group-hover:text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500 transition-all duration-300 group-hover:text-gray-700">{item.description}</p>

              {/* Hover Border Animation */}
              <div className="absolute inset-0 border-2 border-transparent rounded-3xl group-hover:border-yellow-400/50 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h3 className="text-3xl font-bold mb-12 text-center" style={{ color: PRIMARY_BLUE }}>What Our Community Says</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative overflow-hidden border-2 border-transparent hover:border-yellow-400/30"
                style={{ backgroundColor: 'rgba(10, 25, 116, 0.03)' }}
              >
                {/* Quote Icon */}
                <Quote size={32} className="absolute top-4 right-4 text-yellow-400/20 transition-all duration-500 group-hover:scale-110 group-hover:text-yellow-400/40" />
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 group-hover:scale-110">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic transition-all duration-300 group-hover:text-gray-800">
                  "{testimonial.content}"
                </p>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Admissions CTA Section
 */
const AdmissionsCTA = () => {
  const [ref, isVisible] = useScrollAnimation(0.3);

  return (
    <section id="admissions" ref={ref} className="py-20 relative overflow-hidden text-white" style={{ backgroundColor: PRIMARY_BLUE }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-yellow-400 opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-yellow-400 opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-yellow-400 opacity-5 animate-pulse delay-500"></div>
      </div>

      <div className={`relative z-10 ${FIXED_PAGE_PADDING} text-center`}>
        <div className={`max-w-4xl mx-auto space-y-8 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            Ready to Join the <span style={{ color: ACCENT_GOLD }}>Annex Family</span>?
          </h2>
          <p className="text-2xl text-zinc-200 font-light mb-8">
            Admissions are open for the upcoming academic year. Start your journey today!
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a
              href="#"
              className="group relative inline-flex items-center justify-center space-x-3 rounded-full px-10 py-5 text-xl font-bold uppercase transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
              style={{ backgroundColor: ACCENT_GOLD, color: PRIMARY_BLUE }}
            >
              <span className="relative z-10">Start Application</span>
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
            <a
              href="#"
              className="group relative inline-flex items-center justify-center space-x-3 rounded-full border-2 px-10 py-5 text-xl font-bold uppercase transition-all duration-500 hover:bg-white/10 overflow-hidden"
              style={{ borderColor: ACCENT_GOLD, color: ACCENT_GOLD }}
            >
              <Play size={24} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="relative z-10">Schedule Tour</span>
              <div className="absolute inset-0 bg-yellow-400/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto">
            {[
              { title: 'Application Deadline', value: 'January 15, 2024', icon: Calendar },
              { title: 'Financial Aid', value: 'Available', icon: Download },
              { title: 'Open House', value: 'December 10, 2023', icon: Users },
            ].map((item, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-2xl backdrop-blur-sm bg-white/10 transition-all duration-500 hover:scale-105 hover:bg-white/20 cursor-pointer group ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                <item.icon size={24} className="mx-auto mb-3 text-yellow-400 transition-all duration-300 group-hover:scale-110" />
                <div className="text-sm text-zinc-300 mb-1 transition-all duration-300 group-hover:text-white">{item.title}</div>
                <div className="text-lg font-bold text-white transition-all duration-300 group-hover:scale-105">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Footer
 */
const Footer = () => {
  return (
    <footer id="contact" className="pt-16 pb-8 text-white relative overflow-hidden" style={{ backgroundColor: SECONDARY_BLUE }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className={`relative z-10 ${FIXED_PAGE_PADDING} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12`}>
        
        {/* School Info */}
        <div className="lg:col-span-1">
          <SchoolLogo />
          <p className="mt-4 text-zinc-300 leading-relaxed">
            Excellence in education since 1985. Preparing students for success in college, career, and life.
          </p>
          <div className="flex space-x-3 mt-6">
            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="p-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:rotate-12"
                style={{ backgroundColor: PRIMARY_BLUE }}
              >
                <div className="w-5 h-5 bg-current rounded-sm"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-6" style={{ color: ACCENT_GOLD }}>Quick Links</h5>
          <ul className="space-y-3">
            {['Admissions', 'Academics', 'Campus Life', 'News & Events', 'Contact'].map((item) => (
              <li key={item}>
                <a href="#" className="text-zinc-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block hover:scale-105">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="text-lg font-semibold mb-6" style={{ color: ACCENT_GOLD }}>Resources</h5>
          <ul className="space-y-3">
            {['Teacher Portal', 'Student Portal', 'Staff Directory', 'Calendar', 'Library'].map((item) => (
              <li key={item}>
                <a href="#" className="text-zinc-300 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-block hover:scale-105">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="text-lg font-semibold mb-6" style={{ color: ACCENT_GOLD }}>Contact Us</h5>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 group transition-all duration-300 hover:translate-x-2">
              <MapPin size={20} className="mt-1 shrink-0 transition-all duration-300 group-hover:scale-110" style={{ color: ACCENT_GOLD }} />
              <span className="text-zinc-300 group-hover:text-white">3, Sharat Gupta road, Narinda, Dhaka 880 Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-3 group transition-all duration-300 hover:translate-x-2">
              <Phone size={20} className="transition-all duration-300 group-hover:scale-110" style={{ color: ACCENT_GOLD }} />
              <span className="text-zinc-300 group-hover:text-white">01926-531716</span>
            </div>
            <div className="flex items-center space-x-3 group transition-all duration-300 hover:translate-x-2">
              <Mail size={20} className="transition-all duration-300 group-hover:scale-110" style={{ color: ACCENT_GOLD }} />
              <span className="text-zinc-300 group-hover:text-white">annexschool71@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-600 pt-8">
        <div className={`${FIXED_PAGE_PADDING} flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
          <div className="text-zinc-400 text-sm">
            &copy; {new Date().getFullYear()} Annex School. All Rights Reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Sitemap'].map((item) => (
              <a key={item} href="#" className="text-zinc-400 hover:text-white transition-all duration-300 hover:scale-105">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Main Application Component
 */
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans scroll-smooth overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <AcademicsSection />
        <NewsSection />
        <CampusLifeSection />
        <StudentLifeSection />
        <GallerySection />
        <AdmissionsCTA />
      </main>
      <Footer />
    </div>
  );
}
