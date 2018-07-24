# mn-form

A form component. Useful to retrieve data in json format, validate all inputs, and submit data. 
<!-- Can submit only modified data, instead all. -->

### Usage

```js
import {form} from '@darlanmendonca/minimalist'
```

```html
<mn-form id="loginForm">
  <!-- inputs here -->
</mn-form>
```

```js
const form = window.loginForm
form.addEventListener('submit', (data) => console.log('submiting', data))
```

Before submit event, `.validate()` method is called.
Event submit only be called if form is valid.

### Disabled 

Useful to disable all childrens, e.g.

```html
<mn-form disabled></mn-form>
```

And offer a getter/setter to javascript, e.g.

```js
form.disabled = true
console.log(form.disabled)
```

### Readonly

Useful to set all childrens as readonly, e.g.

```html
<mn-form readonly></mn-form>
```

And offer a getter/setter to javascript, e.g.

```js
form.readonly = true
console.log(form.readonly)
```