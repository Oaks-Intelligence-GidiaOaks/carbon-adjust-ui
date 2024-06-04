type Props = {
  startYear: number;
  endYear: number;
  selectedYear: number;
  onChange: (bb: number) => void;
};

const YearDropDown = (props: Props) => {
  const years = [];
  for (let year = props.endYear; year >= props.startYear; year--) {
    years.push(year);
  }

  const handleChange = (e: any) => {
    const selectedYear = parseInt(e.target.value);
    props.onChange(selectedYear);
  };

  return (
    <div className="px-2">
      <select
        className="py-1 px-2 text-[12px] leading-[12px] font-normal font-poppins bg-gray-200 rounded border-0 outline-0"
        defaultValue={props.selectedYear}
        onChange={handleChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearDropDown;
