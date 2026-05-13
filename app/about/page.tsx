export default function About() {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">About</h1>
          
          <div className="mb-12">
            <p className="text-xl text-gray-700 mb-6">
              TK Yijing is a groundbreaking project that explores the timeless
              wisdom of the ancient Chinese text through contemporary artistic
              expression.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to bridge the gap between ancient philosophy and
              modern creativity, making the profound teachings of the Yijing
              accessible and relevant to todays audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To create a space where ancient wisdom meets contemporary art,
                fostering dialogue between tradition and innovation.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To inspire and educate through immersive exhibitions that
                reveal the enduring relevance of Yijing philosophy.
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">The Project</h2>
            <p className="text-gray-700 mb-4">
              This exhibition represents years of research, collaboration, and
              artistic exploration. Weve worked with scholars, artists, and
              cultural experts to create an experience that honors the depth of
              the Yijing while making it accessible to contemporary audiences.
            </p>
            <p className="text-gray-700">
              Through interactive installations, visual art, and multimedia
              presentations, we invite visitors to engage with the Yijing in
              new and meaningful ways.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
