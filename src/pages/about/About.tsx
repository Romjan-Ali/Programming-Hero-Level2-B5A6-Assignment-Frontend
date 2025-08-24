const About = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          About <span className="text-indigo-600">Wallex Digital Wallet</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Welcome to <span className="font-semibold">Wallex Digital Wallet</span> —
          your trusted partner for seamless, secure, and reliable financial
          transactions. Our mission is to simplify payments, mobile top-ups, and
          money transfers with just a few clicks.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          With security and convenience at the core, we empower users to send
          money, recharge, and manage their finances anytime, anywhere. Whether
          you are cashing in, cashing out, or paying bills — we’ve got you
          covered.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          At <span className="font-semibold">Wallex Digital Wallet</span>, we
          believe in building a future where digital payments are accessible,
          fast, and safe for everyone.
        </p>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 inline-block">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            To create a simple, secure, and accessible digital payment system
            that brings financial freedom to every user.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
