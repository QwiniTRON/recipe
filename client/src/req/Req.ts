export class Req {

  static get(url: string ) {
    return fetch(url).then((res) => res.json());
  }

  static post(url: string, body: Object) {
    return fetch(url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then((res) => res.json());
  }

  static put(url: string, body: Object) {
    return fetch(url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    }).then((res) => res.json());
  }
  static delete(url: string, body: Object) {
    return fetch(url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then((res) => res.json());
  }

  static postFormData(url: string, body: Object) {
    return fetch(url, body).then((res) => res.json());
  }
}