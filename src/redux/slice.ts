import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';


type Tab = {
  code: string;
  result: any;
  loading: boolean;
}

type SelectedItemType = {
  index: number,
  globalKey: string,
  key: string,
  variants: string[],
  snippets: string[]
}

// Define a type for the slice state
interface CounterState {
  selectedNetwork: string;
  snippet: string;
  tabs: Tab[];
  selectedTab: number;
  isApiReady: boolean;
  selectedItem: SelectedItemType;
  outputWindowHeight?: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  selectedNetwork: 'xsocial',
  snippet: '',
  tabs: [],
  selectedTab: -1,
  isApiReady: false,
  selectedItem: {
    index: 0,
    globalKey: '',
    key: '',
    variants: [],
    snippets: []
  },
}

export const counterSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setSelectedNetwork: (state, action: PayloadAction<string>) => {
      state.selectedNetwork = action.payload
    },
    setSelectedItem: (state, action: PayloadAction<SelectedItemType>) => {
      state.selectedItem = action.payload
    },
    setOutputWindowHeight: (state, action: PayloadAction<number>) => {
      state.outputWindowHeight = action.payload
    },
    setIsApiReady: (state, action: PayloadAction<boolean>) => {
      state.isApiReady = action.payload
    },
    setSnippet: (state, action: PayloadAction<string>) => {
      state.snippet = action.payload

      state.tabs[state.selectedTab].code = action.payload
    },
    addNewTab: (state, action: PayloadAction<Tab>) => {
      state.tabs.push(action.payload)
      state.selectedTab = state.tabs.length - 1
      state.snippet = action.payload.code
    },
    findAndUpdateTabCode: (state, action: PayloadAction<any>) => {
      const { code } = action.payload
      const index = Array.from(state.tabs.values()).findIndex((d) => d.code === code)

      if (index != -1) {
        state.tabs[index].code = code
        state.snippet = code
        state.selectedTab = index
      } else {
        state.tabs.push({ code: code, result: {}, loading: false })
        state.selectedTab = state.tabs.length - 1
        state.snippet = code
      }
    },
    updateTabCode: (state, action: PayloadAction<any>) => {
      const { index, data } = action.payload
      state.tabs[index].code = data
      state.snippet = data
      state.selectedTab = index
    },
    updateTabResult: (state, action: PayloadAction<any>) => {
      const { index, data } = action.payload
      state.tabs[index].result = data
    },
    setSelectedTab: (state, action: PayloadAction<number>) => {
      state.selectedTab = action.payload
      state.snippet = state.tabs[action.payload].code
    },
    setTabLoading: (state, action: PayloadAction<any>) => {
      const { index, loading } = action.payload
      state.tabs[index].loading = loading
    }
  },
})

export const selectResponse = (state: RootState) => state.code.tabs[state.code.selectedTab]?.result ?? {}

export const selectLoading = (state: RootState) => state.code.tabs[state.code.selectedTab]?.loading

export const { setSelectedItem, setSelectedNetwork, setOutputWindowHeight, setIsApiReady, setSnippet, addNewTab, findAndUpdateTabCode, setTabLoading, updateTabResult, setSelectedTab, updateTabCode } = counterSlice.actions

export default counterSlice.reducer