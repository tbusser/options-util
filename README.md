# Options Util
An options communication utility API. Allows for sharing options between different components, but also between JavaScript and the DOM.


## Installation
This utility is registered with Bower. To install simply execute the following command in the root of your project folder.

```bash
bower install --save-dev options-util
```


## Usage
Use a script tag with type `json/options` to store values inside the options util using JSON.

```javascript
<script type="json/options">
{
    "propertyName": "property value"
}
</script>
```


## API

### .set()

Sets a value.
- If the property was already set and both values are a string, the last call will override the previous value.
- If the property was already set and both values are objects, They will be merged.

```javascript
options.set('propertyName', 'property value');
```

### .get()

Returns a value that was previously set.

```javascript
options.get('propertyName');
```

### .remove()

Deletes a value that was previously set.


```javascript
options.remove('propertyName');
```


### .isSet()
Check if property is set:

```javascript
options.isSet('propertyName');
```
