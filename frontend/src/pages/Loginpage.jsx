import React, { useState } from 'react';

const LoginPage = () => {
  const [role, setRole] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic Styles based on Role
  const isAdmin = role === 'admin';
  const themeColor = isAdmin ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700';
  const ringColor = isAdmin ? 'focus:ring-indigo-500' : 'focus:ring-emerald-500';
  const textColor = isAdmin ? 'text-indigo-600' : 'text-emerald-600';
  const borderColor = isAdmin ? 'border-indigo-600' : 'border-emerald-600';
  const bgLight = isAdmin ? 'bg-indigo-50' : 'bg-emerald-50';

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Login successful as ${role.toUpperCase()}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex font-sans text-gray-900 bg-gray-100">
      
      {/* LEFT SIDE: Visuals & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        {/* Abstract Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between w-full p-12 text-white">
          <div>
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <span className="text-2xl font-bold tracking-wider">StockMaster AI</span>
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight">
              Manage your inventory <br/> with <span className={isAdmin ? 'text-indigo-400' : 'text-emerald-400'}>Precision.</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-md">
              Real-time tracking, automated alerts, and seamless workflow management for modern businesses.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            © 2025 Inventory Management System
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:w-1/2 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">Please sign in to access your dashboard</p>
          </div>

          {/* Role Switcher */}
          <div className="bg-gray-100 p-1.5 rounded-xl flex shadow-inner">
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isAdmin ? 'bg-white shadow-md text-indigo-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Admin Portal
            </button>
            <button
              onClick={() => setRole('staff')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !isAdmin ? 'bg-white shadow-md text-emerald-700' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Warehouse Staff
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    required
                    className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-colors sm:text-sm`}
                    placeholder={isAdmin ? "admin@company.com" : "staff@warehouse.com"}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className={`block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${ringColor} focus:border-transparent transition-colors sm:text-sm`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={`h-4 w-4 ${textColor} border-gray-300 rounded focus:ring-opacity-50 focus:ring-2 ${ringColor}`}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className={`font-medium ${textColor} hover:opacity-80`}>
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${themeColor} focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringColor} transition-all transform hover:scale-[1.02]`}
            >
              {isLoading ? (
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : null}
              {isLoading ? 'Processing...' : 'Sign in'}
            </button>
          </form>

          {/* Helper for Hackathon Judges */}
          <div className={`mt-6 rounded-lg p-4 ${bgLight} border ${borderColor} border-opacity-30`}>
            <p className="text-xs text-center text-gray-500 mb-2 font-semibold tracking-wide uppercase">
              Hackathon Demo Credentials
            </p>
            <div className="flex justify-between text-xs text-gray-600 px-4">
               <span><strong>Admin:</strong> admin@ims.com</span>
               <span><strong>Staff:</strong> staff@ims.com</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;