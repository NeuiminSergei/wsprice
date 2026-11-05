import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../searchSlice';

export default function SearchForm() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.search.brands.status === 'loading');
  const [value, setValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const number = value.trim();
    if (number) dispatch(fetchBrands(number));
  };

  return (
    <form className="input-group mb-4" onSubmit={onSubmit}>
      <input
        className="form-control"
        placeholder="Артикул детали, например 7160500039S"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn btn-primary" disabled={loading || !value.trim()}>
        Найти
      </button>
    </form>
  );
}
