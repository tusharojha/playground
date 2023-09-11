import { Box, Tab, Tabs } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedTab } from "../../redux/slice";

export const CodeTabs = () => {
  const dispatch = useAppDispatch()
  const tabs = useAppSelector((state) => state.code.tabs)
  const selectedTab = useAppSelector((state) => state.code.selectedTab)

  return <Box sx={{ borderBottom: 1, flex: 1, borderColor: 'divider' }}>
    <Tabs value={selectedTab} textColor="primary" onChange={(_, d) => {
      dispatch(setSelectedTab(d));
    }} >
      {Array.from(tabs.values()).map((tab, index) => {
        return <Tab sx={{ color: '#fff' }} key={index.toString()} label={`Code ${index + 1}`} />
      })}
    </Tabs>
  </Box>
}