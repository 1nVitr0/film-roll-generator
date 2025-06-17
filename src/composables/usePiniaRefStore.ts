import { type Store, storeToRefs } from 'pinia'

export const usePiniaRefStore = <T extends Store>(store: T) => {
  const refs = storeToRefs(store)

  return { ...store, ...refs }
}
