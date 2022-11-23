import { SubsocialApi } from "@subsocial/api"
import { useEffect, useState } from "react"
import config from "./playground/config"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { setIsApiReady } from "./redux/slice"

const useNetworkManager = () => {
  const dispatch = useAppDispatch()
  const [api, setApi] = useState<Map<String, SubsocialApi>>(new Map<String, SubsocialApi>())
  const isApiReady = useAppSelector((state) => state.code.isApiReady)

  const selectedNetwork = useAppSelector((state) => state.code.selectedNetwork)

  const setupNetworks = async () => {
    const selectedNetworkApi = api.get(selectedNetwork)
    if (selectedNetworkApi === undefined) {
      const configDetails = config(selectedNetwork)
      const newApi = await SubsocialApi.create(configDetails)
      api.set(selectedNetwork, newApi)
      setApi(api)
    }

    dispatch(setIsApiReady(true))
  }

  useEffect(() => {
    dispatch(setIsApiReady(false))
    setupNetworks()
  }, [selectedNetwork])

  return { api, isApiReady };
}

export default useNetworkManager
