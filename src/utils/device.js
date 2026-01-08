export const getDeviceId = () => {
  let id = localStorage.getItem("device_id");
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9);
    localStorage.setItem("device_id", id);
  }
  return id;
};
