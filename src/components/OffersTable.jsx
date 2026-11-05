import { useSelector } from 'react-redux';
import Status from './Status';

function minPrice(item) {
  const prices = (item.warehouses || []).filter((w) => w.stock > 0).map((w) => w.price);
  return prices.length ? Math.min(...prices) : null;
}

export default function OffersTable() {
  const { offers, selectedBrand, number } = useSelector((s) => s.search);

  return (
    <section>
      <Status state={offers} emptyText="Предложений не найдено.">
        <h5>
          Предложения: {number} / {selectedBrand}
        </h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Название / Производитель</th>
                <th>Номер</th>
                <th className="text-end">Цена</th>
                <th className="text-end">Остаток</th>
              </tr>
            </thead>
            <tbody>
              {offers.items.map((item) => {
                const price = minPrice(item);
                return (
                  <tr key={item.goodsID}>
                    <td>
                      {item.name} <span className="text-muted">/ {item.brand}</span>{' '}
                      {item.isOriginal && <span className="badge bg-success">искомая</span>}
                    </td>
                    <td>{item.number}</td>
                    <td className="text-end">
                      {price === null ? '—' : price.toLocaleString('ru-RU', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-end">{item.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Status>
    </section>
  );
}
