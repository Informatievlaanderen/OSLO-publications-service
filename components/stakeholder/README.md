# Stakeholder

This component is a reusable stakeholder component. It's a custom component that shows a stakeholder's name, email and affiliation. It is used within all the application profiles and vocabularies of the Flemish Government.

## How to use

```js
<template>
    <stakeholder
        firstName="John"
        lastName="Doe"
        email="john.doe@vlaanderen.be"
        :affiliation="{
            "affiliationName": "Vlaamse overheid",
            "homepage": "https://overheid.vlaanderen.be"
        }"
    />
</template>
```
