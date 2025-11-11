"use client";

export default function FAQ3() {
    return (
        <div className="md:bg-[#fcf9f6] bg-white max-w-[90%] md:h-[1030px] h-[510px] rounded-4xl mt-10 mb-20 font-poltawski mx-auto ">
            <h1 className="text-[#463214] font-bold md:text-4xl text-xl md:pt-15 py-5 text-center">Reach Out to Us</h1>
            <div className="bg-[#fcf9f6] rounded-2xl md:py-0 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-15 gap-2 md:mt-15 mt-0 max-w-[90%] mx-auto">
                    <div>
                        <div>
                            <h1 className="md:text-3xl text-base text-[#463214] font-medium">First Name</h1>
                            <input type="text" placeholder="Your First Name" className=" text-[#463214]/80 bg-[#463214]/6 backdrop-blur-lg md:rounded-xl rounded-lg inset-shadow-sm md:text-xl text-xs w-full md:h-15 h-8 md:mt-5 mt-2 px-3" />
                        </div>
                        <div className="hidden md:block md:mt-15 mt-2">
                            <h1 className="md:text-3xl text-base text-[#463214] font-medium">Email Address</h1>
                            <input type="email" placeholder="Your Email " className=" text-[#463214]/80 bg-[#463214]/6 backdrop-blur-lg rounded-xl inset-shadow-sm text-xl w-full h-15 mt-5 px-3" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 className="md:text-3xl text-base text-[#463214] font-medium">Last Name</h1>
                            <input type="text" placeholder="Your Last Name" className=" text-[#463214]/80 bg-[#463214]/6 backdrop-blur-lg inset-shadow-sm md:rounded-xl rounded-lg md:text-xl text-xs w-full md:h-15 h-8 md:mt-5 mt-2 px-3" />
                        </div>
                        <div className="block md:hidden md:mt-15 mt-2">
                            <h1 className="md:text-3xl text-base text-[#463214] font-medium">Email Address</h1>
                            <input type="email" placeholder="Your Email " className=" text-[#463214]/80 bg-[#463214]/6 backdrop-blur-lg rounded-lg inset-shadow-sm text-xs w-full h-8 mt-2 px-3" />
                        </div>
                        <div className="md:mt-15 mt-2">
                            <h1 className="md:text-3xl text-base text-[#463214] font-medium">Subject</h1>
                            <input type="text" placeholder="Your Subject" className=" text-[#463214]/80 bg-[#463214]/6 backdrop-blur-lg md:rounded-xl rounded-lg inset-shadow-sm md:text-xl text-xs w-full md:h-15 h-8 md:mt-5 mt-2 px-3" />
                        </div>
                    </div>
                    <div className="md:col-span-2 col-span-1 ">
                        <h1 className="md:text-3xl text-base text-[#463214] font-medium">Message</h1>
                        <textarea
                            placeholder="Your Message"
                            className=" text-[#463214]/80 bg-[#463214]/6 backdrop-blur-lg md:rounded-xl rounded-lg inset-shadow-sm md:text-xl text-xs w-full md:h-85 h-20 mt-2 p-3">
                        </textarea>
                    </div>
                </div>
                <div className="flex justify-end max-w-[90%] mx-auto">
                    <button className="bg-[#463214] hover:text-[#b6b4b2] text-white font-medium md:text-lg text-sm md:rounded-2xl rounded-xl py-2 px-4 md:mt-5 mt-2 ">
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}