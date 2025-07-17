import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, BookOpen, ArrowRight } from "lucide-react";
import { Button, Input, Card, CardContent } from "@components/ui";
import { useAuth } from "@contexts/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(formData);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message || "Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-['Hanken_Grotesk']">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="p-3 bg-blue-600 rounded-xl shadow-md group- transition-shadow">
              <BookOpen className="h-8 w-8 text-white" />
            </div>{" "}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PeerNote
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-md">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Selamat Datang Kembali
              </h1>
              <p className="text-slate-600">
                Masuk ke akun Anda untuk melanjutkan pembelajaran
              </p>
            </div>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder=""
                    icon={Mail}
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 text-slate-900"
                    required
                  />
                  <label className="absolute left-10 -top-2 text-xs font-medium text-slate-600 bg-white px-2 pointer-events-none">
                    Email
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder=""
                    icon={Lock}
                    value={formData.password}
                    onChange={handleChange}
                    className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12 text-slate-900"
                    required
                  />
                  <label className="absolute left-10 -top-2 text-xs font-medium text-slate-600 bg-white px-2 pointer-events-none">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div
                      className={`w-4 h-4 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                        rememberMe
                          ? "bg-blue-600 border-blue-600"
                          : "bg-transparent border-slate-300 group-hover:border-slate-400"
                      }`}
                    >
                      <svg
                        className={`w-3 h-3 text-white transition-opacity duration-200 ${
                          rememberMe ? "opacity-100" : "opacity-0"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-slate-600 select-none">
                    Ingat saya
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Lupa kata sandi?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md  transition-all duration-200"
                loading={loading}
              >
                {loading ? (
                  "Masuk..."
                ) : (
                  <>
                    Masuk
                    <ArrowRight className="inline ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>{" "}
            <div className="mt-6 text-center">
              <span className="text-slate-600">Belum punya akun? </span>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Daftar sekarang
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-500">
            Dengan masuk, Anda menyetujui{" "}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
