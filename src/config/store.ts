export type AppStorage = {
  token: string | null;
};

export function getStore(): AppStorage {
  const data = localStorage.getItem("appStroage");
  if (!data) {
    return { token: null };
  }
  return JSON.parse(data);
}

export function setStore(data: Partial<AppStorage>) {
  const existing = getStore();
  const updated = { ...existing, ...data };
  localStorage.setItem("appStroage", JSON.stringify(updated));
}

export function getFromAppStorage<K extends keyof AppStorage>(
  key: K
): AppStorage[K] | undefined {
  const storage = getStore();
  return storage[key];
}

export function removeFromAppStorage<K extends keyof AppStorage>(key: K) {
  const storage = getStore();
  delete storage[key];
  localStorage.setItem("appStroage", JSON.stringify(storage));
}

export function clearAppStorage() {
  localStorage.removeItem("appStroage");
}
