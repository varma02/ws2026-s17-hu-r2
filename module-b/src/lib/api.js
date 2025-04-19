const baseUrl = "http://localhost:3000/api/v1"

async function login(username, password) {
  return await (await fetch(`${baseUrl}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username, password
    })
  })).json()
}

async function register(token, name, username, password) {
  return await (await fetch(`${baseUrl}/admin/register`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name, username, password
    })
  })).json()
}

async function logout(token) {
  return await (await fetch(`${baseUrl}/admin/logout`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json()
}

async function list(token) {
  return await (await fetch(`${baseUrl}/admin/list`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json()
}

async function locations(token) {
  return await (await fetch(`${baseUrl}/admin/locations`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json()
}

async function newLocation(token, data) {
  return await (await fetch(`${baseUrl}/admin/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })).json()
}

async function updateLocation(token, slug) {
  return await (await fetch(`${baseUrl}/admin/locations/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })).json()
}

async function deleteLocation(token, slug) {
  return await (await fetch(`${baseUrl}/admin/locations/${slug}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json()
}

async function machines(token) {
  return await (await fetch(`${baseUrl}/admin/machines`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json()
}

async function subscriptions(token) {
  return await (await fetch(`${baseUrl}/admin/subscriptions`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json()
}

async function deleteSubscription(token, id) {
  return await (await fetch(`${baseUrl}/admin/subscriptions/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })).json()
}

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
  admin: {
    login, register, list, logout,
    locations: {
      list: locations,
      new: newLocation,
      update: updateLocation,
      delete: deleteLocation
    },
    machines: machines,
    subscriptions: {
      list: subscriptions,
      delete: deleteSubscription
    }
  },
  locations: publicLocations,
  subscribe: publicSubscribe
}