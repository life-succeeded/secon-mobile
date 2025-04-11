export const Config = {
  apiEndpoint: getOrThrow('REACT_APP_API_ENDPOINT'),
}

function getOrThrow(key: string): string {
  console.log(process.env)
  const value = process.env[key]
  if (value === undefined || value.length === 0)
    throw new Error(`${key} env not defined!`)

  return value
}

function getOrDefault(key: string, defaultValue: number): number
function getOrDefault(key: string, defaultValue: string): string
function getOrDefault(
  key: string,
  defaultValue: number | string,
): number | string {
  const value = process.env[key]
  if (value === undefined || value.length === 0) return defaultValue

  if (typeof defaultValue === 'number') {
    return Number(value)
  } else {
    return String(value)
  }
}
