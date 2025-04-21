const baseUrl = "http://localhost:3000/api/v1"

async function publicLocations(slug) {
  return await (await fetch(`${baseUrl}/locations${slug ? "/" + slug : ""}`, {
    method: "GET"
  })).json()
}

async function publicSubscribe(email) {
  return await (await fetch(`${baseUrl}/subscribe`, {
    method: "GET",
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
  locations: publicLocations,
  subscribe: publicSubscribe
}