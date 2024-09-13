import { BiSearch } from "react-icons/bi";
import cn from "classnames";

const Search = (props: { className?: string }) => {
  const classnames = cn(
    `relative border border-border rounded-lg h-10 w-full p-0 bg-white md:w-[350px]`,
    props.className
  );

  return (
    <div className={classnames}>
      <BiSearch className="absolute top-2 left-2.5 opacity-40" size={24} />
      <input
        name="search"
        placeholder="Search here"
        className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
        onChange={() => {}}
      />
    </div>
  );
};

export default Search;
