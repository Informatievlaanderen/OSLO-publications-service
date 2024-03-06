# Entity region

This component is a reusable entity region. it can be used to display an `entity` in combination with a `vl-region` and a `property-table`

## How to use

```js
import type { Class } from '~/types/class'
<template>
    <entity-region :item="'Object as () => Class'" language="nl" type="AP" />
</template>
```