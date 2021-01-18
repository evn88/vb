export default class Services {
  constructor() {
    this._apiBase = 'http://localhost:3001/api/v1';
  }

  async getResource(path) {
    const res = await fetch(`${this._apiBase}${path}`);

    if (!res.ok) {
      throw new Error(`Failed to get resource ${path}, status: ${res.status}`);
    }

    return await res.json();
  }

  getComments() {
    return this.getResource('/comments/');
  }

  getComment(id) {
    return this.getResource(`/comment/${id}`);
  }
}