export function getFactoryId() {
  let factoryId = localStorage.getItem("factory_id")

  if (!factoryId) {
    factoryId = crypto.randomUUID()
    localStorage.setItem("factory_id", factoryId)
  }

  return factoryId
}