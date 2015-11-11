A communication utility between the page and JavaScript.

**API**

*.set()*

Sets a value.
- If the property was already set and both values are a string, the last call will override the previous value. 
- If the property was already set and both values are objects, They will be merged.

```
options.set('propertyName', 'property value');
```

*.get()*

Returns a value that was previously set.

```
options.get('propertyName');
````

*.remove()*

Deletes a value that was previously set.


```
options.remove('propertyName');
```


*.isset()*
Check if property is set:

```
options.isset('propertyName');
```


*script tag*

Use a script tag with type *json/options* to store values inside the options util using JSON<br>


```
<script type="json/options">
{
    "propertyName": "property value"
}
</script>
```
