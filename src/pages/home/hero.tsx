const Hero = () => {
  return (
    <section className="bg-teal-50 w-full min-h-screen py-8">
      <div className="container mx-auto flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl font-semibold">
          Where Features meets their Stars.
        </h1>
        <p>
          Discover the best software and services, guided by real user reviews{" "}
        </p>
        <div className="w-full max-w-[600px] mx-auto flex justify-center border-2 border-black p-2 bg-white">
          <input
            className="w-full py-4 px-2 outline-none border-0"
            placeholder="Search features here..."
          />
          <button className="outline-none border-2 border-black px-5 py-2 bg-lime-300 font-semibold">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
