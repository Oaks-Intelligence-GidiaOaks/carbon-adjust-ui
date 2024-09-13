const ListTile = (props: { name: string; listing: string | number }) => (
  <div className="space-y-[1]">
    <h5 className="text-[#767A85] text-xs  font-[400]">{props.name}</h5>
    <p className="font-[600] text-[#1F2026] text-[10px]">{props.listing}</p>
  </div>
);

export default ListTile;
