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
import { Shield, Users, TrendingUp} from "lucide-react";
// import { useLoginMutation } from "@/services/query/userQuery";
// import type { LoginResponse } from "@/lib/types";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
// import sensesLogo from 'figma:asset/f4ed2d55b63c4080b9188766b5c68566c5aeeb31.png';

// interface ForgotPasswordProps {
//   onLogin: (credentials: LoginResponse) => void;
// }

export function ForgotPassword() {
//   const { mutateAsync: login, isPending } = useLoginMutation();
  const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = await login({ phone, password });
//     // onLogin(data);
//   };

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

      {/* Right Side - Forgot Password Form */}
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
                Forgot Password
              </CardTitle>
              <CardDescription className="text-base text-[#717182]">
                Enter your email or phone number. We’ll send you a reset link or OTP.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: wire up forgot password request API
                  console.log("Request password reset for:", phone);
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#2c3e50] font-medium">
                    Email or Phone
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. user@example.com or +91 xxxxxxxxxx"
                    className="h-12 bg-[#f8fafc] border-[#e2e8f0] focus:border-[#3498db] focus:ring-[#3498db]/20 rounded-xl"
                    required
                  />
                </div>

                <div className="flex items-center justify-end">
                  <a
                    href="/login"
                    className="text-sm text-[#3498db] hover:text-[#2980b9] font-medium transition-colors"
                  >
                    Back to login
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#3498db] to-[#2980b9] hover:from-[#2980b9] hover:to-[#2574a9] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                //   disabled={isPending}
                >
                  "Send reset link / OTP"
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
                <p className="text-center text-sm text-[#717182]">
                  Need help? Contact your{" "}
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
              &copy; 2024 SENSES - Genetic and Specialty Diagnostics. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
