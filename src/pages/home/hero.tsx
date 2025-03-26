import {IconSearch} from "@tabler/icons-react";

const Hero = () => {
    return (
        <section className=" w-full  py-20 px-2 bg-lime-100">

            <div className="container mx-auto flex flex-col justify-center items-center gap-10">
                <h1 className="text-5xl font-semibold">
                    Where Features meets their Stars.
                </h1>
                <p>
                    Discover the best software and services, guided by real user
                    reviews{" "}
                </p>
                <div
                    className="w-full max-w-[600px] mx-auto flex justify-center border-2 border-black p-2 bg-white rounded-md">
                    <input
                        className="w-full py-4 px-2 outline-none border-0"
                        placeholder="Search product or features..."
                    />
                    <button
                        className="outline-none border-2 border-black px-5 py-2 bg-lime-300 font-semibold rounded-md flex items-center gap-2">
                        <IconSearch stroke={3} size={18}/>
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
