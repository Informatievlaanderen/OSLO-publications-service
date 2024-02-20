# Entity

This component is a reusable table component. It's a custom component that shows an entity and all its specifications. It is used within all the application profiles of the Flemish Government.

## How to use

```js
<template>
    <entity
        title="Hello world"
        href="https://overheid.vlaanderen.be"
        description="Lorem ipsum"
        usage="How to use this"
        :properties="[]"
        vocHref="https://data.vlaanderen.be/ns/adres#AdresseerbaarObject"
    />
</template>
```
