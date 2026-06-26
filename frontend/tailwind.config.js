// Add these animations to your existing tailwind.config.js file
module.exports = {
  // ... your existing config
  theme: {
    extend: {
      // ... your existing extensions
      animation: {
        blob: "blob 10s infinite alternate",
        "pulse-slow": "pulse 6s infinite",
        twinkle: "twinkle 5s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -30px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.2 },
          "50%": { opacity: 0.8 },
        },
      },
      animationDelay: {
        1000: "1000ms",
        2000: "2000ms",
        3000: "3000ms",
        4000: "4000ms",
      },
    },
  },
  plugins: [
    // Add this plugin to support animation delays
    function ({ addUtilities, theme }) {
      const animationDelays = theme("animationDelay", {});
      const utilities = Object.entries(animationDelays).map(([key, value]) => ({
        [`.animation-delay-${key}`]: { animationDelay: value },
      }));
      addUtilities(utilities);
    },
  ],
};
