export const getDeviceId = () => {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem("device_id");

  if (!id) {
    if (window.crypto && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = "dev-" + Math.random().toString(36).slice(2, 11);
    }
    localStorage.setItem("device_id", id);
  }

  return id;
};
