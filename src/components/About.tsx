import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Book, GraduationCap, Users, ArrowLeft } from 'lucide-react';
import logoImage from '../assests/logo.jpg';

const About: React.FC = () => {
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
                to="/landing"
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Book className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold">About She Can Foundation</h1>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Heart className="h-6 w-6 text-primary-500 mr-2" />
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The She Can Foundation is dedicated to empowering women through education, resources, and community support. 
                We believe that when women are given equal opportunities, entire communities thrive. Our platform serves as 
                a hub for gathering funds that directly contribute to women's education, skill development, and entrepreneurial ventures.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <GraduationCap className="h-6 w-6 text-primary-500 mr-2" />
                Educational Empowerment
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Education is a powerful tool for change. The funds we raise go toward scholarships, educational programs, 
                workshops, and training sessions designed to equip women with the knowledge and skills they need to succeed. 
                By investing in women's education, we're investing in a brighter future for all.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="h-6 w-6 text-primary-500 mr-2" />
                Community Impact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our foundation works closely with communities to identify needs and implement solutions that create lasting change. 
                Through partnerships with local organizations, businesses, and educational institutions, we're able to maximize our 
                impact and reach more women in need of support.
              </p>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-700 italic">
                This website was developed by Dishant as part of an internship assignment for the She Can Foundation. 
                The platform serves as a tool for fundraising, community building, and tracking the impact of donations 
                toward women's empowerment initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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

export default About;