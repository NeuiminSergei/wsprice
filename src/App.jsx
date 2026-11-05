import SearchForm from './components/SearchForm';
import BrandList from './components/BrandList';
import OffersTable from './components/OffersTable';

export default function App() {
  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <h3 className="mb-3">Поиск автозапчастей и аналогов</h3>
      <SearchForm />
      <BrandList />
      <OffersTable />
    </div>
  );
}
