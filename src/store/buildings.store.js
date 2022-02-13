import create from 'zustand'
import { persist } from 'zustand/middleware'

const defaultConfig = {
  width: 10000,
  height: 10000,
  roofAngle: 30,
}

// TODO: move fetch logic to utils
const URL = 'https://cchvf3mkzi.execute-api.eu-west-1.amazonaws.com/dev/build'

export const useBuildings = create(
  persist(
    (set, get) => ({
      // state
      params: [defaultConfig, defaultConfig, defaultConfig],
      data: null,
      isLoading: false,

      // actions
      fetchData: async (params = get().params) => {
        set({ isLoading: true })

        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: JSON.stringify(params),
        })

        const data = await response.json()

        set({
          data: data.items.map((building, index) => ({
            ...building,
            params: params[index],
          })),
          params: params,
          isLoading: false,
        })
      },
    }),
    {
      name: 'buildings',
      partialize: (state) => ({ params: state.params, data: state.data }),
    },
  ),
)
