interface LastLocation {
    latitude: string,
    longitude: string,
}

interface InventoryItem{
  itemid?: string,
  quantity?: number
}

interface Survivor {
  name: string,
  age: number,
  gender: string,
  last_location: LastLocation,
  inventory?: InventoryItem[],
  infected: boolean,
  date_added?: Date
}

