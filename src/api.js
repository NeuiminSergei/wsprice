const KEY = import.meta.env.VITE_API_KEY;

async function request(params) {
  const qs = new URLSearchParams({ key: KEY, ...params });
  let res;
  try {
    res = await fetch(`/api/?${qs}`);
  } catch {
    throw new Error('Не удалось связаться с сервером. Проверьте подключение.');
  }
  if (!res.ok) throw new Error(`Ошибка сервера: HTTP ${res.status}`);

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.goods || [];
}

export async function fetchBrandsApi(number) {
  const goods = await request({ number });
  const seen = new Set();
  return goods.filter((g) => g.brand && !seen.has(g.brand) && seen.add(g.brand));
}

export async function fetchOffersApi(number, brand) {
  const goods = await request({ number, brand, analogues: 'on' });
  const rows = [];
  goods.forEach((g) => {
    rows.push({ ...g, isOriginal: true });
    (g.analogues || []).forEach((a) => rows.push({ ...a, isOriginal: false }));
  });
  return rows.filter((r) => r.brand);
}
