# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/sccs/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Об архитектуре 

Взаимодействия внутри приложения происходят через события. Модели инициализируют события, слушатели событий в основном коде выполняют передачу данных компонентам отображения, а также вычислениями между этой передачей, и еще они меняют значения в моделях.

# Архитектура MVP
  * Model - классы Model и AppState. 
    Слой данных и бизнес-логики. Модель отвечает за доступ к данным, их обработку и манипуляцию.

  * View - классы Component, Card, Page, Form, Basket.
    Отвечает за отображение данных пользователю и взаимодействие с пользователем. Визуальные элементы,
    компоненты пользовательского интерфейса

  * Present - в роли Present выступает код в файле index.ts Содержит связку Model и View через событийную модель.
    

### <ul>**Базовые компоненты**</ul>

1. # Класс Component<T>
  Основной класс, основа для остальных компонентов VIEW. Используется для создания компонентов пользовательскоего интерфейса.

  ## Конструктор
  * **constructor(protected readonly container: HTMLElement)** - инициализация компонента в заданном контейнере

  ## Методы класса
  * **toggleClass** - переключение класса
  * **setText** - текстовое содержание элемента
  * **setDisabled** - устанавливает disabled элемента
  * **setHidden** - скрывает элемент
  * **setVisible** - отображает элемент
  * **setImage** - устанавливает элементу src и alt
  * **render** - render элемента

2. # Класс Api
  Класс для взаимодействия с сервером.

  ## Конструктор Api
  * **constructor(baseUrl: string, options: RequestInit = {})** - инициализация класса с указанным url и настройками

  ## Свойства класса
  * **baseUrl: string** - основной url
  * **options: RequestInit** - настройки запроса

  ## Методы класса
  * **handleResponse** - ответ сервера, ошибки
  * **get** - get запрос
  * **post** - post запрос

3. # Класс Model<T>
  Инициализирует модель данных приложения.

  ## Конструктор
  * **constructor(data: Partial<T>, protected events: IEvents)** - инициализирут модель данных, и подключает события

  ## Методы класса
  * **emitChanges** - инициализирует событие и сообщает подписчикам об изменениях

4. # Класс EventEmitter
  Брокер событий, позволяет управлять подписками на события и их обработчиками.

  ## Свойства класса
  * **_events: Map<EventName, Set<Subscriber>>** - это коллекция событий и их подписчиков.

  ## Методы класса
  * **on** - устанавливает обработчик
  * **off** - снять обработчик
  * **emit** - Инициировать событие с данными
  * **onAll** - Слушать все события
  * **offAll** - Сбросить все обработчики
  * **trigger** - Коллбек триггер, генерирующий событие при вызове


### <ul>**Общие компоненты**</ul>

1. # Basket
  Класс для корзины магазина, позволяет упралвять товарами в корзине, отображает общую стоимось и инициализирует процесс оформления заказа.

  ## Коннструктор
  * **constructor(container: HTMLElement, protected events: IEvents)** - принимает контейнер, и объект событий

  ## Свойства класса
  * **_list: HTMLElement** - список элементов в корзине
  * **_total: HTMLElement** - стоимость покупки
  * **_button: HTMLElement** - кнопка оформления заказа

  ## Методы класса
  * **set items** - установка элементов корзины
  * **set selected** - контроль состояния кнопки в корзине
  * **set total** - установка текста общей стоимости

2. # Класс Form<T>
  Класс предназначен для управления состоянием формы, обработчки событий ввода и отправки формы.

  ## Конструктор
  * **constructor(protected container: HTMLFormElement, protected events: IEvents)** - принимает container и объект с событиями

  ## Свойства класса
  * **_submit: HTMLButtonElement** - кнопка отправки формы
  * **_errors?: HTMLElement** - элемент отображения ошибок

  ## Методы класса
  * **onInputChange** - вызывается при изменении полей формы
  * **set valid** - установка валидности формы
  * **set errors** - установка текста ошибки
  * **render** - рендер формы с обновлённым состоянии валидности

3. # Класс Modal extends Component<IModalData>
  Класс для создания и управления модальными окнами. Позволяет открывать и закрывать модальное окно, а так же управлять его содержимым.

  ## Конструктор
  * **constructor(container: HTMLElement, protected events: IEvents)** - принимает модальное окно и объект управления событиями

  ## Свойства класса
 * **_closeButton: HTMLButtonElement** - закрытие модального окна
 * **_content: HTMLElement** - контент модального окна

  ## Методы класса
  * **set content** - установливает данные
  * **open** - открыть модальное окно
  * **close** - закрыть модальное окно
  * **render** - render модального окна



### <ul>**Дополнительные компоненты**</ul>

1. # Класс AppState extends Model<IAppState>
  представляющий состояние приложения, включая данные каталога, предпросмотра, корзины, заказа и ошибок формы. Наследуеются от класса Model.

  ## Свойства класса
  * **catalog: IProduct[]** - список товаров
  * **basketList: IProduct[]** - список товаров в корзине
  * **order: IOrder** - данные заказа
  * **formErrors: FormErrors** - ошибки форм 

  ## Методы класса
  * **getTotal** - возвращает кол-во товара
  * **getTOtalPrice** - возвращает общую сумму корзины
  * **setCatalog** - инициалазация события изменения каталога
  * **clearBasket** - очищение корзины
  * **clearOrder** - очищает заказ 
  * **addBasketList** - добавить в корзину
  * **changeBasketList** - удаляет item по id
  * **setOrderField, setContactsField** - сохранение заказа, данных и инициализация событий валидации
  * **validateOrder** - валидация заказа
  * **validateContacts** - валидация контактов

 2. # Класс Card<ICard>
  Класс представляет собой компонент карточки товара, предназначен для управления состоянием карточки и обработки собитый клика на неё.

  ## Конструктор
  * **constructor(container: HTMLElement, actions?: ICardActions)** - принимает карточку и действия с ней

  ## Свойства класса
  * **_title: HTMLElement** - название товара
  * **_price: HTMLElement** - цена товара
  * **_category: HTMLElement** - категория товара
  * **_image?: HTMLImageElement** - картинка товара
  * **_button?: HTMLButtonElement** - кнопка действий с карточкой
  * **_index?: HTMLSpanElement** - id карточки

  # Методы класса
   * **set id, get id** - установка, возвращение id
   * **set title, get title** - установка, возвращение названия товара
   * **get price** - возвращает цену товара
   * **set category** - управление цветом категории
   * **set image** - установка изображения товара
   * **set button** - установка textContent кнопки управления товаром


3. # Класс Contacts extends Form<IOrderForm>
  Расширяет класс формы конатактов, наследуется от класса Form
  который принимает в дженерике форму заказа.

  ## Конструктор
  * **constructor(container: HTMLFormElement, events: IEvents)** - принимает родительский элемент и обработчик событий

  ## Методы класса
  * **set phone** - находит input элемента 'phone' и начинает слушать там изменения.
  * **set email** - находит input элемента 'email' и начинает слушать там изменения.


4. # Класс LarekApi extends Api
  Расширяет класс Api добавляя методы для работы с серсером магазина. Получает список продуктов и позволяет отправить заказ на сервер.

## Конструктор
* **constructor(cdn: string, baseUrl: string, options?: RequestInit)** - принимает ссылку на изображение, основной url и настройки запроса.

## Методы класса
* **getProducts()** - получает список продуктов магазина.
* **makeOrder** - отправляет заказ со списком покупок на сервер.


5. # Класс Order extends Form<IOrderForm>
  Класс формы заказа. Отвечает за способ выбора оплаты и адреса доставки.

## Конструктор
* **constructor(container: HTMLFormElement, events: IEvents)** - принимает родительский элемент и обработчик событий.

Находит кнопки выбора способа оплаты _buttons: HTMLButtonElement[] и вешает обработчик payment:change.

## Методы класса
* **set payment** - устанавливает активный класс выбранной кнопке.
* **set address** - устанавливает значения адреса в форме заказа.


 6. # Класс Page extends Component<IPage>
  Класс, предназначенный для управления и отображения основных элементов страницы, таких как каталог продуктов, счетчик товаров в корзине, а так же позволяющий блокировать прокрутку страницы.

  ## Конструктор
  * **constructor(container: HTMLElement, protected events: IEvents)** - принимает родительский элемент  и обработчик событий.

  ## Свойства класса
  * **_counter: HTMLElement** - счётчик корзины
  * **_catalog: HTMLElement** - каталог товаров
  * **_wrapper: HTMLElement** - обёртка, lock страницы
  * **_basket: HTMLElement** - корзина

  ## Методы класса
  * **set counter** - счётчик корзины
  * **set catalog** - добавление карточек на страницу
  * **set locked** - lock интерфейса




# События

 * items:changed - перерисовывает список товаров на страницек.
 * item:select - инициализируется при клике на карточку товара, октрывает модальное окно с дополнительной информацией о карточке.
 * item:add - добавляет товар в корзину, меняет количество товара в корзине.
 * item:remove - удаляет товар из корзины, меняет кол-во товара в корзине.
 * counter:changed - меняет кол-во товара в корзине.
 * basket:changed - меняет стоимость всех товаров в корзине, перерисовывает карточки в корзине.
 * modal:open - блокирует прокрутку страницы при открытии модального окна.
 * modal:close - убирает блок прокрутки страницы.
 * basket:open - обновляет сумму заказа в корзине, рендерит модальное окно корзины.
 * order:open - инициализирует форму выбора способа оплаты и адреса.
 * order:submit - валидирует форму, инициализируется при заполнении первой формы, открывает следующую форму ввода номера телефона и email.
 * contacts:submit - если все фоля форм заполнениы, инициализирует отправку заказа на сервер. Инициализирует модальное окно Success.
 * payment:change - валидирует форму способа оплаты.
 * address:change - валидирует форму воода адреса.
 * formErrors:change - возвращает ошибки валидации.
  

# Основные типы приложения

```
export interface IProduct {
  id: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | null;
}

export interface IOrderForm {
  payment?: string;
  address?: string;
  email?: string;
  phone?: string;
  total?: number | string;
}

export interface IOrder extends IOrderForm{
  items: string[];
}

export interface IAppState {
  catalog: IProduct[];
  basketList: IProduct[];
  preview: string | null;
  order: IOrder | null;
  loading: boolean;
}

export interface ILarekApi {
  getProducts: () => Promise<IProduct[]>;
  makeOrder: (value: IOrder) => Promise<IOrder>;
}
```