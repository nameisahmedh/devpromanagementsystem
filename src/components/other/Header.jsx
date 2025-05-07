const Header = ({ data, onLogout }) => {
  const userName = data?.name || "Ahmed";

  return (
    <header className="bg-gradient-to-br from-[#232946] via-[#1a1a2e] to-[#121629] rounded-xl shadow-xl flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-white px-4 sm:px-8 py-4 sm:py-6 mb-6 gap-4 sm:gap-0 w-full">
      <div>
        <span className="text-sm sm:text-base text-[#b8c1ec]">Hello,</span>
        <br />
        <span className="font-extrabold text-xl sm:text-2xl tracking-tight flex items-center gap-2">
          {userName}
          <span className="animate-wave text-xl sm:text-2xl">👋</span>
        </span>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-[#3e54ac] hover:bg-[#6246ea] transition-colors duration-200 rounded-lg px-4 py-2 text-sm sm:text-base font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#6246ea]"
        aria-label="Log Out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
        </svg>
        Log Out
      </button>

      <style>{`
        .animate-wave {
          display: inline-block;
          animation: wave-animation 2s infinite;
          transform-origin: 70% 70%;
        }
        @keyframes wave-animation {
          0% { transform: rotate(0.0deg); }
          10% { transform: rotate(14.0deg); }
          20% { transform: rotate(-8.0deg); }
          30% { transform: rotate(14.0deg); }
          40% { transform: rotate(-4.0deg); }
          50% { transform: rotate(10.0deg); }
          60% { transform: rotate(0.0deg); }
          100% { transform: rotate(0.0deg); }
        }
      `}</style>
    </header>
  );
};

export default Header;
