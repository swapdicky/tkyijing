export default function Exhibition() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">Exhibition</h1>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl">
            Discover our curated collection of works that bridge traditional
            Yijing philosophy with contemporary artistic expression.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-300">
                    Exhibition {item}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Work Title {item}</h3>
                <p className="text-gray-600">Artist Name</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
