import React from "react";

export default function Influencers() {
  return (
    <section className="w-full bg-gradient-to-r from-black via-[#0d0d0f] to-[#11121b] text-white py-20 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between">

      {/* Left big image */}
      <img
        src="/img/speaker3.png"
        className="w-80 h-96 object-cover rounded-3xl border-4 border-[#ffeaa7]"
      />

      {/* Center text */}
      <div className="max-w-lg px-10">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          The event boasts <br /> our top creative <br /> influencers
        </h1>

        <p className="text-gray-300 mb-10">
          The event features renowned influencers and innovators shaping 
          trends and driving creativity across various industries.
        </p>

        <div className="flex flex-col gap-8">
          {/* Person 1 */}
          <div>
            <h2 className="font-semibold text-lg">Sarah Johnson</h2>
            <p className="text-gray-400">December 15, 2025</p>
            <p className="text-gray-500 text-sm">10:00 AM – 11:30 AM</p>
          </div>

          {/* Person 2 */}
          <div>
            <h2 className="font-semibold text-lg">Christopher Wilson</h2>
            <p className="text-gray-400">December 17, 2025</p>
            <p className="text-gray-500 text-sm">12:00 PM – 2:00 PM</p>
          </div>
        </div>
      </div>

      {/* Right image */}
      <img
        src="/img/speaker4.png"
        className="w-72 h-96 object-cover rounded-3xl border-4 border-[#ffeaa7]"
      />
    </section>
  );
}
