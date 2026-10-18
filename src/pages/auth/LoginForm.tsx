import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSmk from "../../assets/img/logo-smk.png";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Jalankan navigasi setelah state `user` dari AuthContext benar-benar ter-update
  useEffect(() => {
    if (user) {
      if (user.role === "panitia" || user.role === "admin") {
        navigate("/portal-panitia-spmb/dashboard", { replace: true });
      } else if (user.role === "siswa") {
        navigate("/siswa/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!identifier || !password) {
      setErrorMessage("Silakan Isi Username/Email dan Password");
      return;
    }

    setLoading(true);

    const formattedLogin = identifier.includes("@")
      ? identifier.trim().toLowerCase()
      : identifier.trim().toLowerCase().replace(/\s+/g, "_");

    try {
      const response = await loginUser({
        login: formattedLogin,
        password: password,
      });

      // Panggil login context, useEffect di atas yang akan berpindah route
      login(response.access_token, response.data);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Login gagal. Cek kembali akun Anda."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[420px] mb-3">
        <Link
          to="/"
          className="text-gray-700 hover:text-black text-xs flex items-center gap-2 hover:underline cursor-pointer"
        >
          &larr; Kembali Ke Beranda SPMB
        </Link>
      </div>

      <div className="bg-white rounded-[35px] shadow-2xl w-full max-w-[420px] p-8 flex flex-col items-center">
        <div className="flex justify-center mb-3">
          <img
            src={LogoSmk}
            alt="Logo SMK TI Bali Global Badung"
            className="h-16 w-auto object-contain"
          />
        </div>

        <div className="w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#204382]">
              Selamat Datang Di SPMB
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Silakan Login terlebih dahulu
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Email / Username
              </label>
              <input
                type="text"
                placeholder="masukan user/email anda"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="masukan Password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800 placeholder-gray-400 pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.038 10.038 0 013.682-.813c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-4.692-4.692a3 3 0 00-4.243-4.243"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-[11px] text-[#204382] font-semibold hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            <div className="text-center text-[11px] text-gray-500 my-2">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-[#204382] font-semibold hover:underline"
              >
                Daftar sekarang
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#355B8C] hover:bg-[#204382] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm tracking-wide cursor-pointer"
            >
              {loading ? "MEMPROSES..." : "LOGIN"}
            </button>
          </form>

          <div className="text-center text-[11px] text-gray-400 mt-8">
            Kendala saat login?{" "}
            <a href="#" className="text-[#204382] hover:underline">
              Hubungi Bantuan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}