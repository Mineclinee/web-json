import '../Sort.scss';

type SortByMonthType = {
  months: string[];
  onChange: (month: string) => void;
  selectedMonth: string;
};

const SortByMonth: React.FC<SortByMonthType> = ({
  months,
  onChange,
  selectedMonth,
}) => {
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={selectedMonth} onChange={handleSelection} className="sort">
      <option value="" className="sort__option">
        Выберите месяц рождения
      </option>
      {months.map((month, index) => (
        <option key={index} value={month} className="sort__option">
          {month}
        </option>
      ))}
    </select>
  );
};

export default SortByMonth;
