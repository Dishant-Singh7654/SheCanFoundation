import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, TrendingUp, ArrowRight, Star, Globe, Target, Sparkles, Gift, Heart } from 'lucide-react';
import logoImage from '../assests/logo.jpg';

const Landing: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Women Empowered' },
    { icon: Globe, value: '50+', label: 'Communities Reached' },
    { icon: Target, value: '$2.5M+', label: 'Funds Raised' },
    { icon: Award, value: '100+', label: 'Success Stories' }
  ];

  const features = [
    {
      icon: Heart,
      title: 'Make a Difference',
      description: 'Join our mission to empower women and create lasting change in communities worldwide.'
    },
    {
      icon: Users,
      title: 'Build Community',
      description: 'Connect with like-minded individuals who share your passion for social impact and women\'s empowerment.'
    },
    {
      icon: Award,
      title: 'Earn Recognition',
      description: 'Get rewarded for your contributions with certificates, merchandise, and exclusive opportunities.'
    },
    {
      icon: TrendingUp,
      title: 'Track Your Impact',
      description: 'Monitor your fundraising progress and see the real-world impact of your efforts in real-time.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Top Fundraiser',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Being part of She Can Foundation has been transformative. I\'ve raised over $15,000 and helped change lives.'
    },
    {
      name: 'Maria Garcia',
      role: 'Community Leader',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'The support and resources provided here are incredible. Together, we\'re making a real difference.'
    },
    {
      name: 'Jessica Williams',
      role: 'Impact Champion',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'I love seeing my impact grow. The leaderboard motivates me to keep pushing for our shared mission.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md border-b border-primary-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded-lg overflow-hidden">
                <img src={logoImage} alt="She Can Foundation Logo" className="h-8 w-auto" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">She Can Foundation</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-slide-up">
            <div className="flex justify-center mb-8">
              <div className="p-2 rounded-full shadow-glow-lg relative">
                <img src={logoImage} alt="She Can Foundation Logo" className="h-20 w-auto rounded-full" />
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                  <Sparkles className="h-5 w-5 text-primary-500" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering Women,
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {' '}Building Communities
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our mission to create lasting change. As a She Can Foundation intern, you'll raise funds, 
              build connections, and make a real impact in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="btn-primary group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow transform hover:scale-110 transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 right-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block bg-primary-100 text-primary-800 px-4 py-1 rounded-full font-medium text-sm mb-4">
              <Sparkles className="inline-block h-4 w-4 mr-1" />
              Why Join Our Mission?
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover the Benefits</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Be part of our empowering community and make a real difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card card-hover animate-on-scroll" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-glow transform hover:rotate-6 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-block bg-accent-100 text-accent-800 px-4 py-1 rounded-full font-medium text-sm mb-4">
              <Star className="inline-block h-4 w-4 mr-1 fill-current" />
              Success Stories
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hear from Our Community</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stories from amazing women who are making a difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card card-hover animate-on-scroll" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-4 border-primary-100 mr-4 object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full p-1 shadow-md">
                      <Gift className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-primary-600 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-8 border-white opacity-20"></div>
              <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border-8 border-white opacity-20"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of women who are already changing lives and building stronger communities.
              </p>
              <Link
                to="/login"
                className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg inline-flex items-center group"
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="p-1 rounded-lg overflow-hidden">
                <img src={logoImage} alt="She Can Foundation Logo" className="h-8 w-auto" />
              </div>
              <span className="text-xl font-bold">She Can Foundation</span>
            </div>
            <div className="text-gray-400">
              © 2025 She Can Foundation. Empowering women, building communities.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;