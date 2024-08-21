import { IoDocumentTextOutline } from "react-icons/io5";

const GridDocField = (props: { docs: any[] }) => {
  if (!props.docs.length) {
    return "-----------------";
  }

  return (
    <div id="" className="flex flex-col gap-1 w-60">
      {props.docs.map((item: any, i: number) => (
        <a
          href={item.url}
          key={item.idType}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={`cursor-pointer flex-center gap-[6px] px-2 py-1 rounded-lg border text-xs ${
              i % 2 === 0 ? "bg-[#F8F9FA]" : "bg-[#E8F3FC]"
            }`}
          >
            <IoDocumentTextOutline /> <span>{item.idType}</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GridDocField;
