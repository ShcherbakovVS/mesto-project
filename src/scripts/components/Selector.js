export default class Selector {
    constructor({ items, renderer }, selector) {
        this._renderedItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(selector);
    }

    rendereItems() {
        this._renderedItems.forEach(item => this._renderer(item))
        }

    addItem(element) {
        this._container.append(element);
    }
}