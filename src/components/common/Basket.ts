import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
}

export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit('order:open')
      })
    }

    this.items = [];
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this._list.replaceChildren(...items);
      super.setDisabled(this._button, false);
    } else {
      super.setDisabled(this._button, true);
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: 'Здесь пока ничего нет -_-'
      }));
    }
  }

  set selected(items: string[]) {
    if (items.length) {
      this.setDisabled(this._button, false);
    } else {
      this.setDisabled(this._button, true);
    }
  }

  set total(total: string) {
    this.setText(this._total, total);
  }
}