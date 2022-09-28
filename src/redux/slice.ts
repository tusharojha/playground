import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type SelectedItemType = {
  index: number,
  globalKey: string,
  key: string,
  variants: string[],
  snippets: string[]
}

// Define a type for the slice state
interface CounterState {
  snippet: string;
  result: any;
  fetchingResult: boolean;
  selectedItem: SelectedItemType;
  outputWindowHeight?: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  snippet: '',
  result: {},
  fetchingResult: false,
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
    }
  },
})

export const { setResponse, setSnippet, setSelectedItem, setOutputWindowHeight, setFetchingResult } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSnippet = (state: RootState) => state.code.snippet

export default counterSlice.reducer