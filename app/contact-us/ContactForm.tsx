const ContactForm = () => {
  return (
    <>
      <form action="" className="space-y-3">
        <label className="text-[12px] md:text-[13px] font-medium text-white">
          Name
        </label>
        <br />
        <input
          type="text"
          placeholder="Enter your Name"
          className="my-2 bg-[#ff8833] text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-full text-white"
        />
        <label className="text-[12px] md:text-[13px] font-medium text-white">
          Email/Phone
        </label>
        <br />
        <input
          type="text"
          placeholder="you@example.com or 9876543210"
          className="my-2 bg-[#ff8833] text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-full text-white"
        />
        <label className="text-[12px] md:text-[13px] font-medium text-white">
          Message
        </label>
        <br />
        <textarea
          placeholder="you@example.com or 9876543210"
          className="my-2 bg-[#ff8833] text-sm w-full p-2 text-[12px] md:text-[13px] outline-1 outline-zinc-300 focus:outline-orange-300 focus:outline-2 rounded-2xl text-white h-32"
        />

        <input
          type="submit"
          value="Submit"
          className="w-full bg-white text-primary font-medium py-2 rounded-3xl mt-4 cursor-pointer text-[12px] md:text-[13px]"
        />
      </form>
    </>
  );
};

export default ContactForm;
