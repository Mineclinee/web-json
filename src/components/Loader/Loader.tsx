import './Loader.scss';

type LoaderType = {
  loadingCount: number;
  totalPersons: number;
};

const Loader = ({ loadingCount, totalPersons }: LoaderType) => {
  return (
    <div className="loader">
      <div className="loader__message">
        {loadingCount} / {totalPersons} загружено
      </div>
    </div>
  );
};

export default Loader;
