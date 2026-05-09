export function getFactoryId() {
  return localStorage.getItem("factoryId")
}

export function getFactoryName() {
  return localStorage.getItem("factoryName")
}

export function setFactoryName(name) {
  localStorage.setItem("factoryName", name)
}