import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers } from '../searchSlice';
import Status from './Status';

export default function BrandList() {
  const dispatch = useDispatch();
  const { number, brands, selectedBrand, offers } = useSelector((s) => s.search);

  return (
    <section className="mb-4">
      <Status state={brands} emptyText={`По артикулу «${number}» ничего не найдено.`}>
        <h5>Выберите производителя</h5>

        <div className="list-group">
          {brands.items.map((g) => {
            const isSelected = g.brand === selectedBrand;

            return (
              <button
                key={g.goodsID}
                className={`list-group-item list-group-item-action d-flex justify-content-between ${isSelected ? 'active' : ''}`}
                disabled={isSelected && offers.status !== 'failed'}
                onClick={() => dispatch(fetchOffers({ number, brand: g.brand }))}
              >
                <span>
                  <strong>{g.brand}</strong> — {g.name}
                </span>
                <span className="badge bg-secondary">{g.count} шт.</span>
              </button>
            )
          })}
        </div>
      </Status>
    </section>
  );
}
