export function getFactoryId() {
  let factoryId = localStorage.getItem("factory_id")

  if (!factoryId) {
    factoryId = crypto.randomUUID()
    localStorage.setItem("factory_id", factoryId)
  }

  return factoryId
}

export function getFactoryName() {
  return localStorage.getItem("factory_name")
}

export function setFactoryName(name) {
  localStorage.setItem("factory_name", name)
}