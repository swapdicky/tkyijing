export default function CreativeTeam() {
  const team = [
    {
      name: "Director Name",
      role: "Creative Director",
      bio: "Leading the artistic vision and overall direction of the project.",
    },
    {
      name: "Artist Name",
      role: "Lead Artist",
      bio: "Creating the visual interpretations of Yijing hexagrams.",
    },
    {
      name: "Scholar Name",
      role: "Yijing Scholar",
      bio: "Providing expertise on the historical and philosophical context.",
    },
    {
      name: "Designer Name",
      role: "Exhibition Designer",
      bio: "Crafting the immersive exhibition experience.",
    },
    {
      name: "Curator Name",
      role: "Curator",
      bio: "Selecting and organizing the exhibition content.",
    },
    {
      name: "Producer Name",
      role: "Producer",
      bio: "Managing the production and logistics of the exhibition.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8">Creative Team</h1>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl">
            Meet the talented individuals who brought this vision to life
            through their expertise, creativity, and dedication.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-gray-400">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-center font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Collaborators</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              This project would not be possible without the support of our
              partners, advisors, and the broader community of artists and
              scholars who contributed their insights and expertise.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
