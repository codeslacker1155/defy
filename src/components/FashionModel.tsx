export function FashionModel() {
  return (
    <div className="w-full max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-lg">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-[500px] object-cover rounded-2xl"
      >
        <source
          src="https://player.vimeo.com/external/510850877.hd.mp4?s=d5e9ed9ea40ba755e28512cce6c1ad00d92506f7&profile_id=174"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-sm font-medium uppercase tracking-wider mb-2">
            Digital Fashion Experience
          </p>
          <p className="text-xs opacity-80">
            Discover and collect unique digital fashion pieces
          </p>
        </div>
      </div>
    </div>
  );
}