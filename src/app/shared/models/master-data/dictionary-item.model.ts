export class DictionaryItem {
  key: string;
  value: string;
  displayText: string;
  group: string;
  order: number;
  constructor(
    key: string,
    value: string,
    displayText: string,
    group: string,
    order: number
  ) {
    (this.key = key),
      (this.value = value),
      (this.displayText = displayText),
      (this.group = group),
      (this.order = order);
  }
}
