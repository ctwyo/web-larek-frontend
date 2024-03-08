import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";


export interface ICard {
  title: string;
  description: string;
  image?: string;
  category?: string;
  price: number;
  index?: number;
  button?: string;
}

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}
export class Card extends Component<ICard> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _category: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _button?: HTMLButtonElement;
  protected _index?: HTMLSpanElement;
  
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._image = container.querySelector('.card__image');
    this._category = container.querySelector('.card__category');
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._button = container.querySelector('.card__button');
    this._index = container.querySelector('.basket__item-index');

    if (actions?.onClick) {
      if (this._button) {  // если найдена кнопка, то клик на нее вешается
          this._button.addEventListener('click', actions.onClick);
      } else {
          container.addEventListener('click', actions.onClick); // иначе на весь контейнер
      }
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || '';
  }

  set index(value: number) {
    this.setText(this._index, value);
  }

  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || '';
  }

  set price(value: string) {
    this.setText(this._price, value ? `${value} синапсов`: 'Бесплатно');
  }

  get price(): string {
    return this._price.textContent || '';
  }

  set category(value: string) {
		if (value === 'софт-скил') {
			this._category.classList.add('card__category_soft');
		} else if (value === 'другое') {
			this._category.classList.add('card__category_other');
		} else if (value === 'хард-скил') {
			this._category.classList.add('card__category_hard');
		} else if (value === 'дополнительное') {
			this._category.classList.add('card__category_additional');
		} else if (value === 'кнопка') {
			this._category.classList.add('card__category_button');
		}
		this.setText(this._category, value);
	}

  set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

  set button(value: string) {
    this.setText(this._button, value);
  }
}