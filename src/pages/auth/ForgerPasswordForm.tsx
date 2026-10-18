import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSmk from "../../assets/img/logo-smk.png";
import { forgotPasswordSendOtp } from "../../services/api";

export default function ForgetPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Silakan masukkan email Anda.");
      return;
    }

    setLoading(true);
    try {
      await forgotPasswordSendOtp(email);
      // Pindah ke halaman /otp membawa data email
      navigate("/otp", { state: { email, type: "forgot-password" } });
    } catch (err: any) {
      console.error("Error Send OTP:", err);
      setErrorMessage(
        err.response?.data?.message || err.message || "Gagal mengirim kode OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[420px] mb-3">
        <Link
          to="/login"
          className="text-gray-700 hover:text-black text-xs flex items-center gap-2 hover:underline cursor-pointer"
        >
          &larr; Kembali Ke Halaman Login
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
            <h1 className="text-2xl font-bold text-[#204382]">Lupa Password</h1>
            <p className="text-xs text-gray-500 mt-1">
              Masukkan email akun Anda untuk menerima kode OTP
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="masukkan email terdaftar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800 placeholder-gray-400"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#355B8C] hover:bg-[#204382] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm tracking-wide cursor-pointer"
            >
              {loading ? "MENGIRIM OTP..." : "KIRIM KODE OTP"}
            </button>
          </form>

          <div className="text-center text-[11px] text-gray-500 mt-6">
            Sudah ingat password Anda?{" "}
            <Link to="/login" className="text-[#204382] font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}