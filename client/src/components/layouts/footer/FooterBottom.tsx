{/*Bottom part of the footer*/}

const FooterBottom = () => {
  return (
    <>
      <div className="my-5 h-px bg-white/10" />

      <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/60 sm:text-sm md:flex-row md:text-left">
        <p>© 2025 ShopSphere. All rights reserved.</p>

        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6">
          {/*Iterate each of the list items without repetetion*/}
          {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
            <li
              key={item}
              className="cursor-pointer transition-colors duration-200 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FooterBottom;