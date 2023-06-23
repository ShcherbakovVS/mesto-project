export default class Section {
    constructor({ items = '', renderer = () => {} }, selector) {
        this._renderedItems = items;
        this._renderer = renderer;

        this._container = document.querySelector(selector);
    }

    rendereItems() {
        this._renderedItems.forEach(item => this._renderer(item))
        }

    addItemToStart(element) {
        this._container.prepend(element);
    }

    addItemToEnd(element) {
        this._container.append(element);
    }
}