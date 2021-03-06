# mn-form

A form component. Useful to retrieve data in json format, validate all inputs, and submit data. 
<!-- Can submit only modified data, instead all. -->

### Usage

```js
import {form} from 'minimalist-ui'
```

```scss
@import 'path/to/node_modules/minimalist-ui/src/form/form.style.scss';
```

```html
<mn-form id="loginForm">
  <!-- inputs here -->
</mn-form>
```

```js
const form = window.loginForm
form.addEventListener('submit', (event) => console.log('submiting', event.data))
```

Before submit event, `.validate()` method is called.
Event submit only be called if form is valid.

### disabled 

Useful to disable all childrens, e.g.

```html
<mn-form disabled></mn-form>
```

```js
form.disabled = true
console.log(form.disabled)
```

### readonly

Useful to set all childrens as readonly, e.g.

```html
<mn-form readonly></mn-form>
```

```js
form.readonly = true
console.log(form.readonly)
```
