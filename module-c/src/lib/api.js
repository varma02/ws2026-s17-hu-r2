const baseUrl = "http://localhost:3000/api/v1"

async function publicLocation(slug) {
  return await (await fetch(`${baseUrl}/locations/${slug}`, {
    method: "GET"
  })).json()
}

async function publicLocations(page = 1, search) {
  return await (await fetch(`${baseUrl}/locations?page=${page}${search ? `&search=${search}` : ""}`, {
    method: "GET"
  })).json()
}

async function publicSubscribe(email) {
  return await (await fetch(`${baseUrl}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      display_email: email
    })
  })).json()
}


export default {
  baseUrl,
  locations: {
    get: publicLocation,
    list: publicLocations
  },
  subscribe: publicSubscribe
}