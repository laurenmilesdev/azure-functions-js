export default class Error {
  constructor(status, statusText, data) {
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}
