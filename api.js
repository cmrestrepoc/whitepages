const data = require("../data.json");

export default class {
  constructor() {
    this.data = data;
  }

  get(id) {
    return new Promise((fulfilled, rejected) => {
      if (Math.random() < 0.9) {
        const match = data.find((d) => d.id === id);
        if (!match) {
          rejected(new Error("Person not found"));
        } else {
          fulfilled(match);
        }
      } else {
        rejected(new Error("Data fetch failed"));
      }
    });
  }

  getList({ number, offset }) {
    number = number ?? 30;
    offset = offset ?? 0;
    return new Promise((fulfilled, rejected) => {
      if (Math.random() < 0.9) {
        fulfilled(
          this.data.slice(offset, offset + number).map((d) => ({
            id: d.id,
            first_name: d.first_name,
            last_name: d.last_name
          }))
        );
      } else {
        rejected(new Error("Data fetch failed"));
      }
    });
  }
}
