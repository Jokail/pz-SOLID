# Practical lesson pz-SOLID
# Практична реалізація SOLID принципів

> У цьому занятті студенти отримують практичні навички застосування SOLID принципів під час рефакторингу існуючого коду.
> Мета — створити гнучку, масштабовану та чисту архітектуру шляхом застосування SRP, OCP, LSP, ISP та DIP.

---

## What need to do:
* Провести аналіз вихідного «анти-SOLID» коду
* Визначити порушення кожного SOLID принципу
* Виконати рефакторинг згідно з:
  * SRP — Single Responsibility Principle
  * OCP — Open/Closed Principle
  * LSP — Liskov Substitution Principle
  * ISP — Interface Segregation Principle
  * DIP — Dependency Inversion Principle
* Створити відповідні інтерфейси й абстракції
* Усунути зайві або циклічні залежності
* Додати мінімальний набір unit-тестів після рефакторингу

---

## Acceptance criteria
* Реалізація на мові Typescript
* Студент розуміє кожен SOLID принцип та пояснює його застосування
* Увесь вихідний код проаналізовано
* Усі порушення SOLID знайдено та описано
* Після рефакторингу:
  * Кожен клас має одну відповідальність (SRP)
  * Код розширюється через нові класи, а не редагування існуючих (OCP)
  * Класи-нащадки повністю заміщають базові (LSP)
  * Інтерфейси невеликі й специфічні (ISP)
  * Залежності реалізовані через абстракції (DIP)
* Код структурований, логічний та зрозумілий
* Усі тести проходять успішно
* Звіт оформлений у Markdown (README.md)

---

## Directory Structure

```
pz-SOLID/
├── src/
│   ├── SRP/
│   │   ├── interfaces/
│   │   │   ├── IUser.ts
│   │   │   ├── IUserRepository.ts
│   │   │   ├── IEmailService.ts
│   │   │   └── ILogger.ts
│   │   ├── original/
│   │   │   └── UserManager.ts
│   │   └── refactored/
│   │       ├── UserRepository.ts
│   │       ├── EmailService.ts
│   │       ├── Logger.ts
│   │       ├── UserReportService.ts
│   │       └── UserService.ts
│   ├── OCP/
│   │   ├── interfaces/
│   │   │   └── IDiscount.ts
│   │   ├── original/
│   │   │   └── DiscountCalculator.ts
│   │   └── refactored/
│   │       ├── DiscountService.ts
│   │       ├── RegularDiscount.ts
│   │       ├── PremiumDiscount.ts
│   │       ├── VIPDiscount.ts
│   │       ├── EmployeeDiscount.ts
│   │       └── NoDiscount.ts
│   ├── LSP/
│   │   ├── interfaces/
│   │   │   ├── IBird.ts
│   │   │   ├── IFlyingBird.ts
│   │   │   └── ISwimmingBird.ts
│   │   ├── original/
│   │   │   └── Bird.ts
│   │   └── refactored/
│   │       ├── Eagle.ts
│   │       ├── Sparrow.ts
│   │       ├── Penguin.ts
│   │       └── BirdUtils.ts
│   ├── ISP/
│   │   ├── interfaces/
│   │   │   ├── IPrintable.ts
│   │   │   ├── IScannable.ts
│   │   │   ├── IFaxable.ts
│   │   │   ├── IPhotocopiable.ts
│   │   │   └── IStapleable.ts
│   │   ├── original/
│   │   │   └── MultifunctionDevice.ts
│   │   └── refactored/
│   │       ├── SimplePrinter.ts
│   │       ├── Scanner.ts
│   │       └── AllInOnePrinter.ts
│   └── DIP/
│       ├── interfaces/
│       │   ├── IOrder.ts
│       │   ├── IOrderRepository.ts
│       │   └── INotificationService.ts
│       ├── original/
│       │   └── OrderController.ts
│       └── refactored/
│           ├── OrderService.ts
│           ├── InMemoryOrderRepository.ts
│           ├── MySQLOrderRepository.ts
│           ├── EmailNotificationService.ts
│           └── SMSNotificationService.ts
├── tests/
│   ├── SRP.spec.ts
│   ├── OCP.spec.ts
│   ├── LSP.spec.ts
│   ├── ISP.spec.ts
│   └── DIP.spec.ts
├── .editorconfig
├── .gitignore
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## Звіт про виконану роботу

## S — Single Responsibility Principle

> **Клас повинен мати лише одну причину для зміни.**

### Домен: Управління користувачами

### Аналіз порушення (`src/SRP/original/UserManager.ts`)

Клас `UserManager` виконував одразу **4 незалежні відповідальності**:

```
UserManager
  ├── CRUD користувачів      ← відповідальність 1
  ├── Надсилання email       ← відповідальність 2
  ├── Генерація звітів       ← відповідальність 3
  └── Логування подій        ← відповідальність 4
```

**Наслідки порушення:**
- Зміна формату email-листа → редагування класу управління користувачами
- Зміна формату логів → знову редагування того самого класу
- Неможливо протестувати зберігання даних без надсилання email
- Клас розростається з кожною новою вимогою

### Виправлення (`src/SRP/refactored/`)

Кожна відповідальність отримала **власний клас** з власним інтерфейсом:

| Клас | Інтерфейс | Єдина відповідальність |
|------|-----------|----------------------|
| `UserRepository` | `IUserRepository` | Зберігання та пошук користувачів |
| `EmailService` | `IEmailService` | Надсилання email-повідомлень |
| `Logger` | `ILogger` | Логування подій |
| `UserReportService` | — | Генерація текстових звітів |
| `UserService` | — | Оркестрація бізнес-операцій |

`UserService` координує роботу залежностей, але **не реалізує** жодну з них:

```typescript
class UserService {
  constructor(
    private repository: IUserRepository,
    private emailService: IEmailService,
    private logger: ILogger,
  ) {}

  addUser(name: string, email: string, role: string): IUser {
    const user = { id: Date.now(), name, email, role };
    this.repository.add(user);
    this.logger.log(`User added: ${name}`);
    this.emailService.sendWelcome(email, name);
    return user;
  }
}
```

**Результат:** кожен клас має рівно одну причину для зміни. Класи незалежні та ізольовано тестуються.

---

## O — Open/Closed Principle

> **Клас повинен бути відкритий для розширення, але закритий для модифікації.**

### Домен: Система знижок

### Аналіз порушення (`src/OCP/original/DiscountCalculator.ts`)

Клас `DiscountCalculator` використовував ланцюжок `if/else` для кожного типу знижки:

```typescript
calculateDiscount(price: number, customerType: string): number {
  if (customerType === 'regular')  return price * 0.05;
  if (customerType === 'premium')  return price * 0.10;
  if (customerType === 'vip')      return price * 0.20;
  if (customerType === 'employee') return price * 0.30;
  return 0;
  // додати 'partner' → змінити цей клас → ризик зламати решту гілок
}
```

**Наслідки порушення:**
- Додавання нового типу знижки → обов'язкове редагування існуючого класу
- Ризик регресій при кожному розширенні
- Клас ніколи не можна вважати "завершеним"

### Виправлення (`src/OCP/refactored/`)

Введено абстракцію `IDiscount`. Кожен тип знижки — **окремий клас**, `DiscountService` — **не змінюється**:

```
IDiscount (interface)
  ├── RegularDiscount   → 5%
  ├── PremiumDiscount   → 10%
  ├── VIPDiscount       → 20%
  ├── EmployeeDiscount  → 30%
  ├── NoDiscount        → 0%
  └── PartnerDiscount   → будь-який новий, без зміни DiscountService
```

```typescript
interface IDiscount {
  calculate(price: number): number;
  getDescription(): string;
}

class DiscountService {                         // закритий для модифікацій
  constructor(private discount: IDiscount) {}  // відкритий для розширень

  applyDiscount(price: number): number {
    return price - this.discount.calculate(price);
  }
}
```

**Результат:** `DiscountService` не знає про конкретні знижки. Нова знижка — новий клас, нуль змін в існуючому коді.

---

## L — Liskov Substitution Principle

> **Підкласи повинні повністю замінювати базовий клас, не порушуючи коректності програми.**

### Домен: Ієрархія птахів

### Аналіз порушення (`src/LSP/original/Bird.ts`)

Клас `Penguin` розширював `Bird`, але **порушував контракт** базового класу:

```typescript
class Bird {
  fly(): string { return `${this.name} is flying!`; }
}

class Penguin extends Bird {
  fly(): string {
    throw new Error(`${this.name} cannot fly!`); // ← ламає контракт
  }
}

function makeBirdFly(bird: Bird): string {
  return bird.fly(); // 💥 вибух при Penguin
}
```

**Наслідки порушення:**
- Функція `makeBirdFly` не може безпечно приймати будь-який `Bird`
- Runtime-помилки замість compile-time
- Ієрархія класів відображає неправильну модель реального світу

### Виправлення (`src/LSP/refactored/`)

Ієрархія перебудована за реальними здібностями птахів:

```
IBird (базовий контракт: eat, makeSound)
  ├── IFlyingBird  (+ fly)  → Eagle, Sparrow
  └── ISwimmingBird (+ swim) → Penguin
```

```typescript
// Функції приймають лише правильний тип — LSP гарантовано на рівні типів
function makeBirdFly(bird: IFlyingBird): string   { return bird.fly();  }
function makeBirdSwim(bird: ISwimmingBird): string { return bird.swim(); }
```

TypeScript **не дозволить** передати `Penguin` у `makeBirdFly` — помилка на етапі компіляції.

**Результат:** будь-який `IFlyingBird` можна передати у `makeBirdFly` без жодних винятків. Ієрархія відповідає реальній моделі.

---

## I — Interface Segregation Principle

> **Клас не повинен залежати від методів, які він не використовує.**

### Домен: Офісні пристрої

### Аналіз порушення (`src/ISP/original/MultifunctionDevice.ts`)

Єдиний "жирний" інтерфейс `IAllInOne` містив **5 методів**, більшість з яких `SimplePrinter` не підтримував:

```typescript
interface IAllInOne {
  print, scan, fax, photocopy, staple  // 5 методів в одному інтерфейсі
}

class SimplePrinter implements IAllInOne {
  print()     { /* працює */ }
  scan()      { throw new Error('not supported') } // ← вимушений мертвий код
  fax()       { throw new Error('not supported') }
  photocopy() { throw new Error('not supported') }
  staple()    { throw new Error('not supported') }
}
```

**Наслідки порушення:**
- Клас має 4 методи-пастки, що кидають виняток під час виконання
- Будь-яка зміна в `IAllInOne` зачіпає всі класи, навіть ті, що не використовують метод
- Неможливо зрозуміти справжні можливості класу з його інтерфейсу

### Виправлення (`src/ISP/interfaces/` + `src/ISP/refactored/`)

Один великий інтерфейс розбито на **5 малих та специфічних**:

```
IPrintable     → print()
IScannable     → scan()
IFaxable       → fax()
IPhotocopiable → photocopy()
IStapleable    → staple()
```

```typescript
class SimplePrinter implements IPrintable {    // лише те, що підтримує
  print(doc: string): void { ... }
  // scan, fax, photocopy, staple — не існують в цьому класі
}

class AllInOnePrinter implements IPrintable, IScannable, IFaxable, IPhotocopiable, IStapleable {
  // реалізує все, бо справді підтримує все — жодного throw
}
```

**Результат:** `SimplePrinter.scan()` неможливо викликати — такого методу не існує. Помилка виявляється на етапі компіляції, а не в runtime.

---

## D — Dependency Inversion Principle

> **Модулі вищого рівня не повинні залежати від модулів нижчого рівня. Обидва повинні залежати від абстракцій.**

### Домен: Обробка замовлень

### Аналіз порушення (`src/DIP/original/OrderController.ts`)

`OrderController` (бізнес-логіка) безпосередньо створював конкретні об'єкти інфраструктури:

```typescript
class OrderController {
  private db       = new MySQLDatabase(); // ← жорстка прив'язка до MySQL
  private notifier = new EmailNotifier(); // ← жорстка прив'язка до Email

  createOrder(userId, product, price) {
    this.db.save('orders', order);
    this.notifier.notify(userId, message);
  }
}
```

**Наслідки порушення:**
- Неможливо протестувати бізнес-логіку без реального підключення до MySQL
- Зміна БД з MySQL на PostgreSQL → обов'язкове редагування `OrderController`
- Додавання SMS-нотифікацій → обов'язкове редагування `OrderController`
- Модуль вищого рівня знає деталі реалізації нижчого рівня

### Виправлення (`src/DIP/`)

Введено абстракції для кожної залежності. Конкретні реалізації передаються **ззовні** через конструктор (Dependency Injection):

```
IOrderRepository (абстракція)
  ├── InMemoryOrderRepository  ← для тестів
  └── MySQLOrderRepository     ← для production

INotificationService (абстракція)
  ├── EmailNotificationService ← email
  └── SMSNotificationService   ← SMS (без зміни OrderService)
```

```typescript
class OrderService {
  constructor(
    private repository: IOrderRepository,    // ← абстракція
    private notifier: INotificationService,  // ← абстракція
  ) {}

  createOrder(userId: string, product: string, price: number): IOrder {
    const order = { id: Date.now().toString(), userId, product, price, createdAt: new Date() };
    this.repository.save(order);           // не знає — MySQL чи пам'ять
    this.notifier.notify(userId, `...`);   // не знає — email чи SMS
    return order;
  }
}
```

**Головна перевага — ізольоване тестування:**

```typescript
// Тест без БД та без реального email — завдяки DIP
const mockRepo: IOrderRepository = {
  save: (order) => savedOrders.push(order),
  findById: (id) => savedOrders.find(o => o.id === id),
  findAll: () => [...savedOrders],
};
const mockNotifier: INotificationService = {
  notify: (r, m) => notifications.push(`${r}: ${m}`),
};

const service = new OrderService(mockRepo, mockNotifier);
```

**Результат:** `OrderService` стабільний і незмінний. Заміна MySQL на PostgreSQL або Email на SMS — нульові зміни в бізнес-логіці.

---

## Підсумкова таблиця

| Принцип | Файл з порушенням | Що порушено | Файли рефакторингу | Як виправлено |
|---------|------------------|-------------|-------------------|---------------|
| **SRP** | `SRP/original/UserManager.ts` | 4 відповідальності в одному класі | `UserRepository`, `EmailService`, `Logger`, `UserReportService`, `UserService` | Кожна відповідальність — окремий клас |
| **OCP** | `OCP/original/DiscountCalculator.ts` | `if/else` для кожного типу знижки | `IDiscount` + 5 реалізацій + `DiscountService` | Абстракція + нові класи без зміни існуючих |
| **LSP** | `LSP/original/Bird.ts` | `Penguin.fly()` кидає виняток | `IFlyingBird`, `ISwimmingBird`, `Eagle`, `Sparrow`, `Penguin` | Правильна ієрархія за реальними здібностями |
| **ISP** | `ISP/original/MultifunctionDevice.ts` | "Жирний" інтерфейс з непотрібними методами | 5 інтерфейсів + `SimplePrinter`, `Scanner`, `AllInOnePrinter` | Малі специфічні інтерфейси |
| **DIP** | `DIP/original/OrderController.ts` | `new MySQL()`, `new Email()` всередині класу | `IOrderRepository`, `INotificationService` + 4 реалізації + `OrderService` | Dependency Injection через конструктор |

---

## Корисні посилання

[SOLID Principles Explained](https://www.baeldung.com/solid-principles)

[SOLID: The First 5 Principles of Object-Oriented Design](https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/)

[JavaScript SOLID: Реалізація принципів](https://khalilstemmler.com/articles/solid-principles/)

[Clean Code Concepts Adapted for JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

[Dependency Injection in JavaScript](https://javascript.plainenglish.io/dependency-injection-in-javascript-1b82a8101c1a)
