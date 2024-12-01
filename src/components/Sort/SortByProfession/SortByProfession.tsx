import '../Sort.scss';

type SortByProfessionType = {
  professions: string[];
  onChange: (profession: string) => void;
  selectedProfession: string;
};

const SortByProfession: React.FC<SortByProfessionType> = ({
  professions,
  onChange,
  selectedProfession,
}) => {
  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={selectedProfession}
      onChange={handleSelection}
      className="sort"
    >
      <option value="" className="sort__option">
        Все профессии
      </option>
      {professions.map((profession) => (
        <option key={profession} value={profession} className="sort__option">
          {profession}
        </option>
      ))}
    </select>
  );
};

export default SortByProfession;
