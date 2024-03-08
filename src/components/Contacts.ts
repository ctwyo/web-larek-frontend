import { IOrderForm } from "../types";
import { IEvents } from "./base/Events";
import { Form } from "./common/Form";

export class Contacts extends Form<IOrderForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
		this.onInputChange('phone', value);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
		this.onInputChange('email', value);
	}
}