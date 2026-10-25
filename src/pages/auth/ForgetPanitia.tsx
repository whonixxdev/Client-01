import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoSmk from "../../assets/img/logo-smk.png";
import { forgotPasswordSendOtp } from "../../services/Api";

export default function ForgetPanitia() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!identifier) {
      setErrorMessage("Silakan masukkan email atau username panitia Anda.");
      return;
    }

    setLoading(true);

    try {
      const emailTarget = identifier.includes("@") ? identifier.trim() : `${identifier.trim()}@panitia.spmb`;
      
      await forgotPasswordSendOtp(emailTarget);
      
      setSuccessMessage(`Kode pemulihan berhasil dikirim ke email terkait.`);
      
      setTimeout(() => {
        navigate("/otp", {
          state: {
            email: emailTarget,
            type: "forgot-password",
          },
        });
      }, 1500);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Gagal memproses pemulihan akun panitia."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[420px] mb-3">
        <Link
          to="/login-panitia"
          className="text-gray-700 hover:text-black text-xs flex items-center gap-2 hover:underline cursor-pointer"
        >
          &larr; Kembali Ke Login Panitia
        </Link>
      </div>

      <div className="bg-white rounded-[35px] shadow-2xl w-full max-w-[420px] p-8 flex flex-col items-center">
        <div className="flex justify-center mb-3">
          <img src={LogoSmk} alt="Logo SMK TI" className="h-16 w-auto object-contain" />
        </div>

        <div className="w-full">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-[#204382]">Pemulihan Akun Panitia</h1>
            <p className="text-xs text-gray-500 mt-1">
              Masukkan Email atau Username Anda untuk menerima kode OTP pemulihan ID & Password
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 text-xs rounded-lg text-center">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">Email atau Username Panitia</label>
              <input
                type="text"
                placeholder="masukkan email atau username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#355B8C] hover:bg-[#204382] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm tracking-wide cursor-pointer"
            >
              {loading ? "MENGIRIM..." : "KIRIM KODE OTP"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Sudah ingat kredensial Anda?{" "}
              <Link to="/login-panitia" className="text-[#204382] font-semibold hover:underline">
                Login Panitia
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}