{/*Bottom part of the footer*/}

const FooterBottom = () => {
  return (
    <>
      <div className="my-10 h-px bg-white/10" />

      <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
        <p>© 2025 ShopSphere. All rights reserved.</p>

        <ul className="flex items-center gap-6">
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