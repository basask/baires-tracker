class DateFormatter extends Date {
  toClockify() {
    return this.toISOString().slice(0, -1);
  }

  toTracker() {
    const day = String(this.getDate()).padStart(2, '0');
    const month = String(this.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${this.getFullYear()}`;
  }

  toUi() {
    return this.toTracker();
  }
}

module.exports = {
  DateFormatter,
};
