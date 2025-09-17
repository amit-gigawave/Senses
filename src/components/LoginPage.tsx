import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Shield, Users, TrendingUp, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/services/query/userQuery";
import type { LoginResponse } from "@/lib/types";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import sensesLogo from 'figma:asset/f4ed2d55b63c4080b9188766b5c68566c5aeeb31.png';

interface LoginPageProps {
  onLogin: (credentials: LoginResponse) => void;
}

const phoneRegex = /^[6-9]\d{9}$/; // Exactly 10 digits, starting with 6-9
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars with 1 lowercase, 1 uppercase, 1 digit, 1 special char

export function LoginPage({ onLogin }: LoginPageProps) {
  const { mutateAsync: login, isPending } = useLoginMutation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePhone = (phoneNumber: string) => {
    if (!phoneNumber) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Enter a valid 10-digit mobile number (starting with 6-9)");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validatePassword = (pwd: string) => {
    if (!pwd) {
      setPasswordError("Password is required");
      return false;
    }
    if (!passwordRegex.test(pwd)) {
      setPasswordError(
        "Password must contain at least 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 10) {
      setPhone(value);
      if (phoneError && value) {
        validatePhone(value);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError && value) {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);

    if (!isPhoneValid || !isPasswordValid) {
      return;
    }

    try {
      const data = await login({ phone: "+91" + phone, password });
      onLogin(data);
    } catch (error) {
      // Error handling is done by the mutation hook
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Information */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#3498db] via-[#2980b9] to-[#2c3e50] p-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
        </div>

        <div className="relative flex flex-col justify-center text-white">
          {/* Logo and Title */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="w-20 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 p-2">
                <img
                  src="/images/logo.jpg"
                  className="w-full h-full object-contain"
                />
                {/* <ImageWithFallback /> */}
              </div>
              <div>
                <h1 className="text-3xl font-bold">SENSES</h1>
                <p className="text-white/80 text-lg">
                  Genetic and Specialty Diagnostics
                </p>
                <p className="text-white/70 text-sm">Admin Management Portal</p>
              </div>
            </div>
            <p className="text-xl text-white/90 leading-relaxed max-w-md">
              Streamline your diagnostic operations with our comprehensive
              management system.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Secure & Compliant</h3>
                <p className="text-white/80">
                  HIPAA compliant genetic data management
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Sample Coordination</h3>
                <p className="text-white/80">Manage sample collection teams</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Diagnostic Analytics</h3>
                <p className="text-white/80">
                  Track lab performance and insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-20 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 p-2 shadow-lg">
              <img
                src="/images/logo.jpg"
                alt="SENSES Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#2c3e50]">
              SENSES Admin Portal
            </h1>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl text-[#2c3e50] mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-base text-[#717182]">
                Sign in to access SENSES administrator dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#2c3e50] font-medium">
                    Mobile Number
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182] font-medium">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Enter 10-digit mobile number"
                      className={`h-12 pl-12 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl ${
                        phoneError ? "border-red-500 focus:border-red-500" : ""
                      }`}
                      maxLength={10}
                      required
                    />
                  </div>
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-1">{phoneError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-[#2c3e50] font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter your password"
                      className={`h-12 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl pr-12 ${
                        passwordError
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-[#717182]" />
                      ) : (
                        <Eye className="h-4 w-4 text-[#717182]" />
                      )}
                    </Button>
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                  )}
                  <div className="text-xs text-[#717182] mt-1">
                    Password must contain at least 8 characters with 1
                    uppercase, 1 lowercase, 1 digit, and 1 special character
                  </div>
                </div>

                {/* <div className="flex items-center justify-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#3498db] bg-[#f8fafc] border-[#e2e8f0] rounded focus:ring-[#3498db]/20 focus:ring-2"
                    />
                    <span className="text-sm text-[#717182]">Remember me</span>
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-sm text-[#3498db] hover:text-[#2980b9] font-medium transition-colors "
                  >
                    Forgot password?
                  </a>
                </div> */}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#3498db] to-[#2980b9] hover:from-[#2980b9] hover:to-[#2574a9] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  disabled={isPending}
                >
                  {isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
                <p className="text-center text-sm text-[#717182]">
                  Need access? Contact your{" "}
                  <a
                    href="#"
                    className="text-[#3498db] hover:text-[#2980b9] font-medium"
                  >
                    system administrator
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-[#717182]">
            <p>
              © 2025 SENSES - Genetic and Specialty Diagnostics. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
