# Домашнє завдання №10

1. **Створи репозиторій** `goit-js-hw-10`.
2. **Збери проєкт** за допомогою Vite.
3. **Переконайся**, що код відформатований за допомогою Prettier, а в консолі відсутні помилки й попередження під час відкриття живої сторінки завдання.
4. **Здай домашнє завдання** на перевірку.

---

## Завдання 1 - Таймер зворотного відліку

Виконуй це завдання у файлах `1-timer.html` і `1-timer.js`. Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах, інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демовідео роботи таймера.

### Елементи інтерфейсу

Додай в HTML файл розмітку таймера, поля вибору кінцевої дати і кнопку, при кліку на яку таймер повинен запускатися. Додай оформлення елементів інтерфейсу згідно з макетом.

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

### Відлік часу

Натисканням на кнопку **«Start»** скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі **xx:xx:xx:xx**.

- Кількість днів може складатися з більше, ніж двох цифр.
- Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто залишок часу дорівнює нулю **00:00:00:00**.

`❗ Після запуску таймера натисканням кнопки **Старт** кнопка **Старт** і інпут стають неактивними, щоб користувач не міг обрати нову дату, поки йде відлік часу. Після зупинки таймера інпут стає активним, щоб користувач міг обрати наступну дату. Кнопка залишається неактивною.`

Для підрахунку значень використовуй готову функцію `convertMs`, де `ms` — різниця між кінцевою і поточною датою в мілісекундах.

```javascript
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
```

## Завдання 2 - Генератор промісів

Виконуй це завдання у файлах `2-snackbar.html` і `2-snackbar.js`. Подивися демовідео роботи генератора промісів.

### Елементи інтерфейсу

Додай в HTML файл розмітку форми. Форма складається з поля вводу для введення значення затримки в мілісекундах, двох радіокнопок, які визначають те, як виконається проміс, і кнопки з типом submit, при кліку на яку має створюватися проміс.

```html
<form class="form">
  <label>
    Delay (ms)
    <input type="number" name="delay" required />
  </label>

  <fieldset>
    <legend>State</legend>
    <label>
      <input type="radio" name="state" value="fulfilled" required />
      Fulfilled
    </label>
    <label>
      <input type="radio" name="state" value="rejected" required />
      Rejected
    </label>
  </fieldset>

  <button type="submit">Create notification</button>
</form>
```

Напиши скрипт, який після сабміту форми створює проміс. В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при `fulfilled`) або відхилятися (при `rejected`), залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи `resolve/reject`, має бути значення затримки в мілісекундах.

Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

Якщо проміс виконується вдало, виводь у консоль наступний рядок:

```javascript
`❌ Rejected promise in ${delay}ms`
```

Якщо проміс буде відхилено, то виводь у консоль наступний рядок, де delay — це значення затримки промісу в мілісекундах.

```javascript
`❌ Rejected promise in ${delay}ms`
```
