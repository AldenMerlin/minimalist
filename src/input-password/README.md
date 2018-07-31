# mn-input-password

A input component, extending behaviors from `mn-input` but specific behaviors to input a password.

## Usage

```js
import '@darlanmendonca/minimalist'
```

```html
<mn-form id="someID">
  <mn-input-password label="Password" name="password"></mn-input-password>
</mn-form>
```

```js
const form = window.someId
const password = form.password
```

## Attributes

- [label](../input/#label)
- [value](../input/#value)
- [name](../input/#name)
- [placeholder](../input/#placeholder)
- [disabled](../input/#disabled)
- [readonly](../input/#readonly)
- [maxlength](../input/#maxlength)
- [autocapitalize](../input/#autocapitalize)
- [autofocus](../input/#autofocus)
- [pattern](../input/#pattern)
- [required](../input/#required)