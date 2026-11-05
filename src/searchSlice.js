import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBrandsApi, fetchOffersApi } from './api';

export const fetchBrands = createAsyncThunk('search/fetchBrands', (number) =>
  fetchBrandsApi(number)
);

export const fetchOffers = createAsyncThunk('search/fetchOffers', ({ number, brand }) =>
  fetchOffersApi(number, brand)
);

const initialState = {
  number: '',
  brands: { items: [], status: 'idle', error: null },
  selectedBrand: null,
  offers: { items: [], status: 'idle', error: null },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchBrands.pending, (s, a) => {
      s.number = a.meta.arg;
      s.brands = { items: [], status: 'loading', error: null };
      s.selectedBrand = null;
      s.offers = initialState.offers;
    })
      .addCase(fetchBrands.fulfilled, (s, a) => {
        s.brands = { items: a.payload, status: 'succeeded', error: null };
      })
      .addCase(fetchBrands.rejected, (s, a) => {
        s.brands = { items: [], status: 'failed', error: a.error.message };
      })

      .addCase(fetchOffers.pending, (s, a) => {
        s.selectedBrand = a.meta.arg.brand;
        s.offers = { items: [], status: 'loading', error: null };
      })
      .addCase(fetchOffers.fulfilled, (s, a) => {
        s.offers = { items: a.payload, status: 'succeeded', error: null };
      })
      .addCase(fetchOffers.rejected, (s, a) => {
        s.offers = { items: [], status: 'failed', error: a.error.message };
      });
  },
});

export default searchSlice.reducer;
