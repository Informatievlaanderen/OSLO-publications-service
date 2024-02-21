# Property table

This component is a reusable table component. It's a wrapper around the [vl-data-table component](https://overheid.vlaanderen.be/webuniversum/v3/documentation/components/vl-ui-data-table) from the Webuniversum of the Flemish Government.

This component is different from the regular `<data-table />` component, because it allows the rows of the table to also contain a link. This is useful for the properties of an entity, because they can link to an already defined specification.

## How to use

```js
<template>
    <property-table :properties="[]" />
</template>
```
