import AsyncStorage from "@react-native-async-storage/async-storage";

const LINKS_STORAGE_KEY = "links-storage";

export type LinkStorage = {
  id: string
  name: string
  url: string
  category: string
}

async function get(): Promise<LinkStorage[]> {
  const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY);

  return storage ? JSON.parse(storage) : []; 
}

async function save(newLink: LinkStorage) {
  try {
    const storage = await get();
    const updatedStorage = [...storage, newLink];

    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updatedStorage));
  } catch  (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error;
  }
}

async function remove(linkId: string): Promise<void> {
  try {
    const storage = await get();
    const updatedStorage = storage.filter(item => item.id !== linkId);

    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updatedStorage));
  } catch (error) {
    // biome-ignore lint/complexity/noUselessCatch: <explanation>
    throw error;
  }
}

export const linkStorage = { get, save, remove };