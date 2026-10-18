import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logoSmk from "../../assets/img/logo-smk.png";
import { registerSendOtp } from "../../services/api";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    no_hp: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lettersOnlyRegex = /^[a-zA-Z\s]*$/;

    if (!lettersOnlyRegex.test(value)) {
      setUsernameError(
        "Username hanya boleh berisi huruf dan nama saja (tanpa angka/simbol/emoji)"
      );
      return;
    }

    setUsernameError("");
    setFormData((prev) => ({ ...prev, username: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password" || name === "password_confirmation") {
      setPasswordError("");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.password_confirmation) {
      setPasswordError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      await registerSendOtp({
        nama_lengkap: formData.username,
        username: formData.username.toLowerCase().trim().replace(/\s+/g, "_"),
        email: formData.email,
        no_hp: formData.no_hp,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      navigate("/otp", {
        state: {
          email: formData.email,
          registerData: {
            nama_lengkap: formData.username,
            username: formData.username.toLowerCase().trim().replace(/\s+/g, "_"),
            email: formData.email,
            no_hp: formData.no_hp,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
          },
        },
      });
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Pendaftaran gagal, periksa data yang dimasukkan."
      );
    } finally {
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
            src={logoSmk}
            alt="Logo SMK"
            className="h-16 w-auto object-contain"
          />
        </div>

        <div className="w-full">
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold text-[#204382]">
              Daftar Akun SPMB
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Buat akun untuk memulai pendaftaran
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-xs rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="masukan email anda"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Nomor WhatsApp / HP
              </label>
              <input
                type="tel"
                name="no_hp"
                placeholder="08123456789"
                value={formData.no_hp}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-400 focus:outline-none focus:border-[#204382] text-sm text-gray-800"
                required
                disabled={loading}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Username / Nama Lengkap
              </label>
              <input
                type="text"
                name="username"
                placeholder="masukan nama saja tanpa angka/simbol"
                value={formData.username}
                onChange={handleUsernameChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 focus:outline-none ${
                  usernameError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-400 focus:border-[#204382]"
                }`}
                required
                disabled={loading}
              />
              {usernameError && (
                <span className="text-[11px] text-red-500 leading-tight">
                  {usernameError}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="masukan Password anda"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="ulangi Password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 focus:outline-none pr-10 ${
                    passwordError
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-400 focus:border-[#204382]"
                  }`}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
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
              {passwordError && (
                <span className="text-[11px] text-red-500 leading-tight">
                  {passwordError}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#355B8C] hover:bg-[#204382] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm tracking-wide mt-3 cursor-pointer"
            >
              {loading ? "MEMPROSES..." : "REGISTER"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-[#204382] font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}