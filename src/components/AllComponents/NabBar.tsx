/** @format */

const NavBar = () => {
  return (
    <div className="w-full sticky top-0 z-50">
      <div className=" max-w-[2500px] rounded-2xl mx-auto flex items-center justify-between bg-white border border-gray-200 px-6 py-3">
        {/* Left side - Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Sales Analytics Dashboard
        </h1>
      </div>
    </div>
  );
};

export default NavBar;
