import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ClipboardCheck,
  GraduationCap,
  Scale,
  Rocket,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Building2,
  Globe,
  Shield,
  Zap,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const pipelineSteps = [
  {
    icon: Users,
    title: 'Lead Capture',
    description: 'Attract and capture top talent through multiple channels',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessment',
    description: 'Evaluate candidates with customized skill assessments',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: GraduationCap,
    title: 'Training',
    description: 'Upskill candidates with targeted training programs',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: Scale,
    title: 'Legal Processing',
    description: 'Handle documentation and compliance seamlessly',
    color: 'from-emerald-500 to-green-500',
  },
  {
    icon: Rocket,
    title: 'Deployment',
    description: 'Place candidates in their ideal positions',
    color: 'from-green-500 to-lime-500',
  },
  {
    icon: HeartHandshake,
    title: 'After-Service',
    description: 'Ongoing support and relationship management',
    color: 'from-lime-500 to-yellow-500',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Streamline your recruitment process with intelligent automation that saves time and reduces manual work.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Access a worldwide talent pool and manage international placements with ease.',
  },
  {
    icon: Shield,
    title: 'Compliance Ready',
    description: 'Built-in compliance tools ensure all legal requirements are met throughout the hiring process.',
  },
  {
    icon: Building2,
    title: 'Enterprise Scale',
    description: 'Handle thousands of candidates while maintaining personalized experiences for each.',
  },
];

const stats = [
  { value: '50K+', label: 'Candidates Placed' },
  { value: '2,500+', label: 'Partner Companies' },
  { value: '98%', label: 'Success Rate' },
  { value: '45', label: 'Countries Served' },
];

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-slate-900/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                HireMeNow
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#pipeline" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#features" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
                Features
              </a>
              <a href="#stats" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
                Results
              </a>
              <Link
                to="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="#pipeline"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-600 hover:text-emerald-600 transition-colors font-medium py-2"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-600 hover:text-emerald-600 transition-colors font-medium py-2"
            >
              Features
            </a>
            <a
              href="#stats"
              onClick={() => setIsMenuOpen(false)}
              className="block text-slate-600 hover:text-emerald-600 transition-colors font-medium py-2"
            >
              Results
            </a>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500" />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-300 text-sm font-medium mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Trusted by 2,500+ companies worldwide
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              The Complete{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Recruitment
              </span>
              <br />
              Pipeline Platform
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              From lead capture to after-service support — manage your entire candidate journey 
              in one powerful platform. Streamline hiring, ensure compliance, and scale your 
              recruitment operations effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/login"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pipeline"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
              >
                See How It Works
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>

            {/* Hero Visual - Pipeline Preview */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 pointer-events-none" />
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {pipelineSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <step.icon className="w-4 h-4 text-emerald-400" />
                      <span className="hidden sm:inline">{step.title}</span>
                      <span className="sm:hidden">{step.title.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section id="pipeline" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 mb-6">
              Your Complete Candidate Pipeline
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A seamless six-stage process that transforms leads into successful placements 
              while ensuring compliance and satisfaction at every step.
            </p>
          </div>

          {/* Pipeline Steps */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-yellow-500 -translate-y-1/2 rounded-full" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
              {pipelineSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2 h-full">
                    {/* Step Number */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow - Mobile/Tablet */}
                  {index < pipelineSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ChevronRight className="w-6 h-6 text-emerald-500 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 mb-6">
                Built for Modern{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Recruitment
                </span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our platform combines powerful automation with intuitive design to help you 
                find, assess, and place the best candidates faster than ever.
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                {[
                  'End-to-end pipeline visibility',
                  'Integrated payment processing',
                  'Real-time analytics dashboard',
                  'Multi-currency support',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-500 hover:-translate-y-2 ${
                    index % 2 === 1 ? 'sm:translate-y-8' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
              Our Impact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">
              Numbers That Speak
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join thousands of companies who trust HireMeNow to power their recruitment operations.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center group"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Hiring Process?
                </span>
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                Join leading companies worldwide who use HireMeNow to streamline their 
                recruitment pipeline and find the best talent.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#"
                  className="px-8 py-4 text-white font-semibold text-lg hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  Contact Sales
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-bold">HireMeNow</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                The complete recruitment pipeline platform. From lead capture to after-service support.
              </p>
              <div className="flex gap-4">
                {['twitter', 'linkedin', 'facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current rounded" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Integrations', 'API'],
              },
              {
                title: 'Company',
                links: ['About', 'Careers', 'Blog', 'Press'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'Contact', 'Privacy', 'Terms'],
              },
            ].map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-slate-400 hover:text-emerald-400 transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 HireMeNow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

