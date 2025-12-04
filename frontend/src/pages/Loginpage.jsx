import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Backend URLs
  const LOGIN_URL = "http://localhost:5000/api/users/login";
  const REGISTER_URL = "http://localhost:5000/api/users/register";

  // Dynamic Theme
  const isAdmin = role === "admin";
  const themeColor = isAdmin ? "bg-indigo-600 hover:bg-indigo-700" : "bg-emerald-600 hover:bg-emerald-700";
  const ringColor = isAdmin ? "focus:ring-indigo-500" : "focus:ring-emerald-500";
  const bgLight = isAdmin ? "bg-indigo-50" : "bg-emerald-50";
  const textColor = isAdmin ? "text-indigo-600" : "text-emerald-600";

  // LOGIN function
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔐 Login attempt started");
    console.log("Email:", email);
    console.log("Role:", role);
    
    setIsLoading(true);
    
    try {
      console.log("📡 Sending login request to:", LOGIN_URL);
      const { data } = await axios.post(LOGIN_URL, { 
        email, 
        password,
        role 
      });
      
      console.log("✅ Login successful!", data);
      setIsLoading(false);
      
      alert("Login Successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      console.log("💾 Token and user saved to localStorage");
      console.log("🔄 Redirecting to dashboard...");
      
      window.location.href = "/dashboard";
    } catch (error) {
      setIsLoading(false);
      console.error("❌ Login failed:");
      console.error("Error object:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status code:", error.response?.status);
      
      const errorMessage = error.response?.data?.message || "Login Failed";
      alert(errorMessage);
    }
  };

  // REGISTER function
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("📝 Registration attempt started");
    console.log("Email:", email);
    console.log("Role:", role);
    
    setIsLoading(true);

    if (password !== confirmPassword) {
      console.warn("⚠️ Passwords do not match");
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      console.warn("⚠️ Password too short");
      alert("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      console.log("📡 Sending registration request to:", REGISTER_URL);
      const { data } = await axios.post(REGISTER_URL, {
        email,
        password,
        role,
      });
      
      console.log("✅ Registration successful!", data);
      setIsLoading(false);
      
      alert("Registration Successful! Please login.");
      setIsLogin(true);
      
      // Clear form
      setPassword("");
      setConfirmPassword("");
      
      console.log("🔄 Switched to login mode");
    } catch (error) {
      setIsLoading(false);
      console.error("❌ Registration failed:");
      console.error("Error object:", error);
      console.error("Response data:", error.response?.data);
      console.error("Status code:", error.response?.status);
      
      const errorMessage = error.response?.data?.message || "Registration Failed";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE VISUAL */}
      <div className={`hidden lg:flex lg:w-1/2 ${themeColor} text-white flex-col justify-center items-center p-12`}>
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6">
            Inventory Management System
          </h1>
          <p className="text-xl opacity-90 mb-8">
            {isLogin ? "Manage your inventory" : "Create your account"} with Precision.
          </p>
          <div className="space-y-4 text-sm opacity-75">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📦</span>
              <span>Real-time stock tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <span>Advanced analytics</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <span>Secure & reliable</span>
            </div>
          </div>
          <p className="mt-12 text-sm opacity-60">© 2025 Inventory System</p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLogin ? "Sign in to continue" : "Register to get started"}
            </p>
          </div>

          {/* Role Switch */}
          <div className={`flex gap-2 p-1.5 rounded-lg ${bgLight} mb-6`}>
            <button
              type="button"
              onClick={() => {
                setRole("admin");
                console.log("🔄 Role switched to: admin");
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isAdmin
                  ? "bg-white shadow-md text-indigo-700"
                  : "text-gray-500"
              }`}
            >
              👨‍💼 Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("user");
                console.log("🔄 Role switched to: user");
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                !isAdmin
                  ? "bg-white shadow-md text-emerald-700"
                  : "text-gray-500"
              }`}
            >
              👤 Staff
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none ${ringColor}`}
                placeholder={isLogin ? "your@email.com" : "newuser@email.com"}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none ${ringColor}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:outline-none ${ringColor}`}
                  placeholder="Re-enter password"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${themeColor} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Processing..." : isLogin ? "Sign in" : "Register"}
            </button>
          </form>

          {/* Toggle Login / Register */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                console.log(`🔄 Switched to ${!isLogin ? "login" : "register"} mode`);
              }}
              className={`font-semibold ${textColor} hover:underline`}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>

          {/* Demo Helper */}
          {isLogin && (
            <div className={`mt-6 p-4 rounded-lg ${bgLight} border ${isAdmin ? "border-indigo-200" : "border-emerald-200"}`}>
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Demo Credentials
              </p>
              <p className="text-xs text-gray-600">
                <strong>Admin:</strong> admin@ims.com
              </p>
              <p className="text-xs text-gray-600">
                <strong>Staff:</strong> staff@ims.com
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Password: demo123 (or as per your backend)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;