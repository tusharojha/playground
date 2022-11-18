import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { SubsocialApi } from '@subsocial/api'

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
  result: any;
  fetchingResult: boolean;
  isApiReady: boolean;
  selectedItem: SelectedItemType;
  outputWindowHeight?: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  selectedNetwork: 'testnet',
  snippet: '',
  result: {},
  fetchingResult: false,
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
    setSnippet: (state, action: PayloadAction<string>) => {
      state.snippet = action.payload
    },
    setResponse: (state, action: PayloadAction<any>) => {
      state.result = action.payload
    },
    setSelectedItem: (state, action: PayloadAction<SelectedItemType>) => {
      state.selectedItem = action.payload
    },
    setOutputWindowHeight: (state, action: PayloadAction<number>) => {
      state.outputWindowHeight = action.payload
    },
    setFetchingResult: (state, action: PayloadAction<boolean>) => {
      state.fetchingResult = action.payload
    },
    setIsApiReady: (state, action: PayloadAction<boolean>) => {
      state.isApiReady = action.payload
    }
  },
})

export const { setResponse, setSnippet, setSelectedItem, setSelectedNetwork, setOutputWindowHeight, setFetchingResult, setIsApiReady } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSnippet = (state: RootState) => state.code.snippet

export default counterSlice.reducer