export default function Yijing() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">Yijing</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              The Yijing, also known as the I Ching or Book of Changes, is one
              of the oldest Chinese classical texts. It has been used for
              divination and as a source of wisdom for thousands of years.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 my-12">
              <h2 className="text-3xl font-bold mb-4">The 64 Hexagrams</h2>
              <p className="text-gray-700 mb-6">
                The Yijing is composed of 64 hexagrams, each representing a
                unique combination of six lines that can be either broken (yin)
                or unbroken (yang).
              </p>
              <div className="grid grid-cols-8 gap-4">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white rounded flex items-center justify-center text-sm font-mono hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">Philosophy</h2>
            <p className="text-gray-700 mb-6">
              At its core, the Yijing teaches about the nature of change and
              how to navigate it with wisdom and grace. It emphasizes balance,
              harmony, and the cyclical nature of existence.
            </p>

            <h2 className="text-3xl font-bold mb-4">Contemporary Relevance</h2>
            <p className="text-gray-700">
              Today, the Yijing continues to inspire artists, philosophers, and
              seekers worldwide. Its principles offer timeless insights into
              human nature and the patterns that govern our lives.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
