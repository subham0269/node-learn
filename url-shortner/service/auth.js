const sessionUIDToUserMap = new Map();

export const setUser = (uid, user) => {
  sessionUIDToUserMap.set(uid, user)
}

export const getUser = (uid) => {
  return sessionUIDToUserMap.get(uid);
}