import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSmk from "../../assets/img/logo-smk.png";
import { loginUser } from "../../services/Api";
import { useAuth } from "../../context/AuthContext";

export default function LoginPanitia() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [idPanitia, setIdPanitia] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role === "panitia" || user.role === "admin") {
        navigate("/portal-panitia-spmb/dashboard", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !idPanitia || !password) {
      setErrorMessage("Silakan isi Email, ID Panitia, dan Password dengan lengkap.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        login: email.trim().toLowerCase(),
        password: password,
      });

      if (response.data.id_panitia !== idPanitia.trim()) {
        setErrorMessage("ID Panitia tidak cocok dengan akun email tersebut.");
        setLoading(false);
        return;
      }

      login(response.access_token, response.data);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Login panitia gagal. Periksa kembali data Anda."
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
          <img src={LogoSmk} alt="Logo SMK TI Bali Global Badung" className="h-16 w-auto object-contain" />
        </div>

        <div className="w-full">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#204382]">Login Portal Panitia</h1>
            <p className="text-xs text-gray-500 mt-1">Silakan masukkan kredensial panitia Anda</p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Email Panitia</label>
              <input
                type="email"
                placeholder="masukkan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">ID Panitia</label>
              <input
                type="text"
                placeholder="contoh: PNT-2026-001"
                value={idPanitia}
                onChange={(e) => setIdPanitia(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800 font-mono"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="masukkan password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800 pr-10"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forget-panitia"
                className="text-[11px] text-[#204382] font-semibold hover:underline"
              >
                Lupa ID Panitia / Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#355B8C] hover:bg-[#204382] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm tracking-wide cursor-pointer"
            >
              {loading ? "MEMPROSES..." : "LOGIN PANITIA"}
            </button>
          </form>

          <div className="text-center text-[11px] text-gray-500 mt-6">
            Belum terdaftar sebagai panitia?{" "}
            <Link to="/register-panitia" className="text-[#204382] font-semibold hover:underline">
              Daftar di sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}