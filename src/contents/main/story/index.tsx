export default function Story() {
  return (
    <section
      className="
        relative
        overflow-hidden
        text-white 
        py-10 
        px-6 
        md:px-16 
        flex 
        items-center 
        justify-center
      "
    >
      {/* subtle overlay texture */}
      {/* <div className="absolute inset-0 bg-[url('/textures/crystal.png')] opacity-10 pointer-events-none" /> */}

      <div className="relative max-w-2xl text-center">
        {/* <h2 className="text-4xl md:text-5xl font-light mb-6">Grove Lake</h2> */}
        <p className="font-aperture text-white text-lg md:text-xl leading-relaxed font-light">
          Grove Lake is a sonic journey across instrumental hip-hop, lo-fi,
          post-punk, R&amp;B, trap and cinematic soundscapes. Each track unfolds
          like a mini-soundtrack—immersive beats, organic instrumentation and
          evocative synths weaving stories of tension, reflection and release.
          Perfect for late-night introspection, creative flow or simply drifting
          away, Grove Lake invites you to explore new emotional terrain.
        </p>
      </div>
    </section>
  );
}
