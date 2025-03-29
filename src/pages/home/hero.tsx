import {IconSearch} from "@tabler/icons-react";
import {Button} from "@heroui/react";

const Hero = () => {
    return (
        <section className=" w-full  py-20 px-2 bg-green-200 ">

            <div className="container mx-auto flex flex-col justify-center items-center gap-10">
                <h1 className="text-5xl font-semibold dark:text-black">
                    Where Features meets their Stars.
                </h1>
                <p className="dark:text-black">
                    Discover the best software and services, guided by real user
                    reviews{" "}
                </p>
                <div
                    className="w-full max-w-[600px] mx-auto flex justify-center items-center  p-2 bg-white shadow-2xl rounded-md dark:bg-gray-300">
                    <input
                        className="w-full py-4 px-2 outline-none border-0  dark:bg-gray-300 dark:text-white"
                        placeholder="Search product or features..."
                    />

                    <Button color="success" variant="ghost" startContent={<IconSearch size={32} stroke={3}/>}>Search
                    </Button>

                </div>
            </div>
        </section>
    );
};

export default Hero;
