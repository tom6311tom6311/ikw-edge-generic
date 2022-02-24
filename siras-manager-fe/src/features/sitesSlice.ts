import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Site = {
  siteId: string;
  status: string;
  companyName: string;
  location: string;
  numSiras: number;
  speciesList: string[];
  capacity: number;
  area: number;
};

interface SitesState {
  [key: string]: Site;
}

const initialState: SitesState = {};

// selectors
export const selectSite = (siteId: string) => (state: RootState) => state.sites[siteId] || {};
export const selectSites = (siteIds: string[]) => (state: RootState) => siteIds.map(
  (siteId) => (state.sites[siteId]),
).filter((site) => site && (site.siteId));
// data fetcher
export const fetchSite = createAsyncThunk(
  'site/fetchSite',
  async (siteId: string) => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        const site: Site = {
          siteId,
          status: 'active',
          companyName: '愛諾華特',
          location: '雲林縣 口湖鄉',
          numSiras: 30,
          speciesList: ['赤鰭笛鯛', '黑毛', '斑點石鯛', '吳郭魚'],
          capacity: 9999,
          area: 0.1
        };
        resolve(site);
      }, 1000);
    });
    return response as Site;
  },
  {
    condition: (siteId, { getState }) => {
      const sites = getState() as SitesState;
      if (sites[siteId] && sites[siteId].siteId) {
        // Already fetched. No need to re-fetch
        return false;
      }
      return true;
    },
  },
);

const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSite.fulfilled, (state, action) => {
      if (!action.payload.siteId) {
        return state;
      }
      return {
        ...state,
        [action.payload.siteId]: action.payload,
      };
    });
  },
});

export default sitesSlice.reducer;
