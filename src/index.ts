import { AppState } from './components/AppData';
import { Card } from './components/Card';
import { Contacts } from './components/Contacts';
import { LarekApi } from './components/LarekApi';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { Success } from './components/Success';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import './scss/styles.scss';
import { IOrder, IOrderForm, IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const page = new Page(document.body, events);
const api = new LarekApi(CDN_URL, API_URL);
const appData = new AppState({}, events);

const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

api.getProducts()
  .then(appData.setCatalog.bind(appData))
  .catch(err => {
    console.error(err);
  })

// лист карточек
events.on('items:changed', () => {
  page.catalog = appData.catalog.map(item => {
    const card = new Card( cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('item:select', item)
    });
    
    return card.render({
      title: item.title,
      image: item.image,
      price: item.price === null ? 'Бесплатно' : `${item.price} синапсов`,
      category: item.category,
    })
  })
})

events.on('item:select', (item: IProduct) => {
  
  const card = new Card(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      card.button = 'Купить';
      if (appData.getButtonName(item.title) === 'Купить') {
        events.emit('item:add', item);
      } else {
        events.emit('item:remove', item);
      }
      card.button = appData.getButtonName(item.title);
    }
    
  })
    
  modal.render({
    content: card.render({
      category: item.category,
      title: item.title,
      description: item.description,
      image: item.image,
      price: item.price === null ? 'Бесплатно' : `${item.price} синапсов`,
      button: appData.getButtonName(item.title),
    })
  })
})

events.on('item:add', (item: IProduct) => {
  appData.addBasketList(item);
  events.emit('counter:changed');
  events.emit('basket:changed');
})

events.on('item:remove', (item: IProduct) => {
  appData.changeBasketList(item.id);
  events.emit('basket:changed');
  events.emit('counter:changed');
})

events.on('counter:changed', () => {
  page.counter = appData.basketList.length;
})

//basket changed
events.on('basket:changed', () => {
  basket.total = `${appData.getTotalPrice()} синапсов`
  let i = 1;
  
  basket.items = appData.basketList.map((item) => {
    const card = new Card(cloneTemplate(basketItemTemplate), {
      onClick: () => events.emit('item:remove', item)
    })
    return card.render({
      title: item.title,
      price: item.price === null ? 'Бесплатно' : `${item.price} синапсов`,
      index: i++
    })
  })
})


events.on('modal:open', () => {
  page.locked = true;
});

events.on('modal:close', () => {
  page.locked = false;
});



//basket open
events.on('basket:open', () => {
  basket.total = `${appData.getTotalPrice()} синапсов`
  modal.render({
    content: basket.render()
  })
})

events.on('order:open', () => {
  modal.render({
    content: order.render({
      address: '',
      payment: '',
      valid: false,
      errors: []
    })
  })
})

events.on('order:submit', () => {
  appData.order.total = appData.getTotalPrice();
  appData.order.items = appData.basketList
    .filter(item => item.price !== null && item.price !== 0)
    .map(item => item.id);
  modal.render({
    content: contacts.render({
      email: '',
      phone: '',
      valid: false,
      errors: []
    })
  })
})

events.on('contacts:submit', () => {
  api.makeOrder(appData.order)
    .then((res) => {
      const success = new Success(cloneTemplate(successTemplate), {
        onClick: () => {
          modal.close()
        }
      });

      modal.render({
        content: success.render({
          total: Number(res.total)
        })
      })
      appData.validateOrder()
      appData.clearBasket()
      page.counter = 0;
    })
    .catch((err) => {
      console.log(err)
    })
})

events.on('payment:change', (item: HTMLButtonElement) => {
  appData.order.payment = item.name;
  appData.validateOrder();
});



events.on('formErrors:change', (errors: Partial<IOrder>) => {
  const { email, phone, address, payment } = errors;
	order.valid = !address && !payment;
	contacts.valid = !email && !phone;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
})


events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setContactsField(data.field, data.value);
	}
);