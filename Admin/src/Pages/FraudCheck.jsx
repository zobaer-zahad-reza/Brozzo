import React, { useState } from "react";
import axios from "axios";
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Loader2,
  CheckCircle,
  Truck,
  UserX,
  LayoutDashboard,
} from "lucide-react";

const FraudCheck = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleCheck = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!bdPhoneRegex.test(phone)) {
      setError("Please enter a valid Bangladeshi mobile number");
      return;
    }

    if (!backendUrl) {
      setError("Backend URL missing");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/fraud/check`, {
        phone,
      });

      if (response.data) {
        setResult(response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server connection failed.");
    } finally {
      setLoading(false);
    }
  };

  // Pie Chart Component for Brozzo Theme
  const CircularProgress = ({ value, color }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center">
        <svg className="transform -rotate-90 w-36 h-36">
          {/* Background Circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="#27272a" // zinc-800
            strokeWidth="10"
            fill="transparent"
          />
          {/* Progress Circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute text-center">
          <span className="block text-3xl font-black text-white">{value}%</span>
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Success
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-10 px-4 md:px-8 font-sans text-gray-300">
      {/* Full Width Container */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="bg-[#111113] rounded-2xl shadow-2xl border border-zinc-800 p-6 flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden">
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4955]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="flex items-center gap-4 z-10 w-full lg:w-auto">
            <div className="bg-black border border-zinc-800 p-3.5 rounded-xl shadow-inner">
              <ShieldCheck className="text-[#FF4955] w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-wider">
                Fraud <span className="text-[#FF4955]">Detector</span>
              </h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">
                Brozzo Intelligence System
              </p>
            </div>
          </div>

          {/* Search Bar in Header */}
          <form
            onSubmit={handleCheck}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 z-10"
          >
            <div className="relative flex-1 sm:w-80">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500 font-black bg-[#18181b] rounded-l-lg border-r border-zinc-800 px-3 text-sm">
                +88
              </span>
              <input
                type="number"
                placeholder="017XXXXXXXX"
                className="w-full pl-[70px] pr-4 py-3.5 bg-[#111113] border border-zinc-800 rounded-lg focus:border-[#FF4955] outline-none transition-all font-bold text-white placeholder-zinc-700 shadow-inner"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-[#FF4955] hover:bg-[#e03e49] text-white font-black uppercase tracking-widest text-xs rounded-lg shadow-lg shadow-[#FF4955]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Check Status
            </button>
          </form>
        </div>

        {error && (
          <div className="p-4 bg-[#FF4955]/10 border border-[#FF4955]/20 text-[#FF4955] rounded-xl flex items-center gap-3 animate-pulse font-bold text-sm">
            <ShieldAlert className="w-5 h-5" /> {error}
          </div>
        )}

        {/* Dashboard Content */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status & Stats (Left Column) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Status Card */}
              <div
                className={`p-8 rounded-2xl border flex flex-col items-center text-center shadow-2xl relative overflow-hidden ${
                  result.isSafe
                    ? "bg-[#111113] border-emerald-500/30"
                    : "bg-[#111113] border-rose-500/30"
                }`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 opacity-10 blur-[60px] ${result.isSafe ? "bg-emerald-500" : "bg-rose-500"}`}
                ></div>

                {result.isSafe ? (
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-5 relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                ) : (
                  <ShieldAlert className="w-16 h-16 text-rose-500 mb-5 relative z-10 drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                )}

                <h2 className="text-2xl font-black text-white uppercase tracking-wider relative z-10 mb-2">
                  {result.isSafe ? "Safe Customer" : "High Risk"}
                </h2>
                <p
                  className={`text-xs font-black uppercase tracking-[0.2em] relative z-10 ${result.isSafe ? "text-emerald-500" : "text-rose-500"}`}
                >
                  Risk Level: {result.risk_level}
                </p>

                <button
                  className={`w-full mt-8 py-4 rounded-xl text-white font-black uppercase text-xs tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 relative z-10 active:scale-95 ${
                    result.isSafe
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
                      : "bg-rose-600 hover:bg-rose-500 shadow-rose-500/20"
                  }`}
                >
                  {result.isSafe ? "Safe for COD" : "Take Advance Payment"}
                </button>
              </div>

              {/* Big Stats */}
              {result.details && result.details.total > 0 && (
                <div className="bg-[#111113] p-6 rounded-2xl border border-zinc-800 shadow-xl flex flex-col items-center">
                  <h3 className="text-zinc-500 font-black text-xs uppercase tracking-[0.2em] mb-6">
                    Overall Performance
                  </h3>
                  <CircularProgress
                    value={result.details.successRate}
                    color={result.isSafe ? "#10b981" : "#f43f5e"} // emerald or rose
                  />

                  <div className="grid grid-cols-3 gap-2 w-full mt-8 pt-6 border-t border-zinc-800">
                    <div className="text-center bg-black py-3 rounded-lg border border-zinc-800/50">
                      <p className="text-xl font-black text-white">
                        {result.details.total}
                      </p>
                      <p className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider mt-1">
                        Total
                      </p>
                    </div>
                    <div className="text-center bg-black py-3 rounded-lg border border-zinc-800/50">
                      <p className="text-xl font-black text-emerald-500">
                        {result.details.delivered}
                      </p>
                      <p className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider mt-1">
                        Success
                      </p>
                    </div>
                    <div className="text-center bg-black py-3 rounded-lg border border-zinc-800/50">
                      <p className="text-xl font-black text-rose-500">
                        {result.details.returned}
                      </p>
                      <p className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider mt-1">
                        Return
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Table (Right Column) */}
            <div className="lg:col-span-2">
              {result.couriers && result.couriers.length > 0 ? (
                <div className="bg-[#111113] rounded-2xl border border-zinc-800 shadow-xl overflow-hidden h-full flex flex-col">
                  {/* Table Header Area */}
                  <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b]">
                    <h3 className="font-black text-lg text-white uppercase tracking-wider flex items-center gap-3">
                      <LayoutDashboard className="w-5 h-5 text-[#FF4955]" />
                      Courier Breakdown
                    </h3>
                    <span className="text-[10px] font-black bg-[#FF4955]/10 border border-[#FF4955]/20 text-[#FF4955] px-4 py-1.5 rounded-full uppercase tracking-widest w-max">
                      {result.couriers.length} Couriers Found
                    </span>
                  </div>

                  <div className="overflow-x-auto flex-1 p-4">
                    <table className="w-full text-left border-collapse">
                      <thead className="text-zinc-500 text-[10px] uppercase font-black tracking-widest border-b border-zinc-800">
                        <tr>
                          <th className="px-4 py-4">Courier Name</th>
                          <th className="px-4 py-4 text-center">
                            Total Parcel
                          </th>
                          <th className="px-4 py-4 text-center">Delivered</th>
                          <th className="px-4 py-4 text-right">Return Rate</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50">
                        {result.couriers.map((courier, index) => (
                          <tr
                            key={index}
                            className="hover:bg-black/40 transition-colors group"
                          >
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white border border-zinc-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                                  {courier.logo ? (
                                    <img
                                      src={courier.logo}
                                      alt={courier.name}
                                      className="w-full h-full object-contain mix-blend-multiply"
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                        e.target.nextSibling.style.display =
                                          "block";
                                      }}
                                    />
                                  ) : null}
                                  <Truck
                                    className={`w-5 h-5 text-gray-400 ${courier.logo ? "hidden" : "block"}`}
                                  />
                                </div>
                                <span className="font-bold text-gray-300 group-hover:text-white transition-colors text-sm">
                                  {courier.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md font-bold text-gray-400 text-xs">
                                {courier.total}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className="font-bold text-emerald-500 text-sm">
                                {courier.delivered}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <div className="flex items-center justify-end gap-3">
                                <div className="w-16 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${courier.returnRate > 10 ? "bg-rose-500" : "bg-emerald-500"}`}
                                    style={{
                                      width: `${Math.min(courier.returnRate, 100)}%`,
                                    }}
                                  ></div>
                                </div>
                                <span
                                  className={`text-xs font-bold w-9 text-right ${courier.returnRate > 10 ? "text-rose-500" : "text-emerald-500"}`}
                                >
                                  {courier.returnRate}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                // No History State
                <div className="bg-[#111113] rounded-2xl border border-dashed border-zinc-700 h-full flex flex-col items-center justify-center p-10 text-center min-h-[300px]">
                  <div className="bg-black border border-zinc-800 p-6 rounded-full mb-6 relative">
                    <div className="absolute inset-0 bg-[#FF4955]/5 blur-xl rounded-full"></div>
                    <UserX className="w-12 h-12 text-zinc-600 relative z-10" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">
                    No History Found
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                    This phone number has no previous delivery records in the
                    courier databases.
                  </p>
                  <span className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    New Customer
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudCheck;
