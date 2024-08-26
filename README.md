# OSLO-publications-service

This repository is the Nuxt project for all the publications of the OSLO initiative, which is a project of the Flemish government. The goal of this project is to provide a central place for all the publications. This project is built using the Nuxt framework, which is a Vue.js framework that is used to build static websites.

This repository is based on the [OSLO-frontend-template](https://github.com/Informatievlaanderen/OSLO-frontend-template) so the needed configuration has already been set up, so that you can start using these components immediately.

Documentation about the webcomponents of the Flemish government can be found in their [Storybook page](https://642e92e0cda6c627a0601f07-bpunzfpjnm.chromatic.com/?path=/docs/about-getting-started--docs). If the link does not work anymore, feel free to contact someone from the development team via their Slack channel `#design-system-vue3-alpha`.

## Build Setup

```bash
# install dependencies
$ yarn install

# Some of the Flanders gov dependencies are currently in alpha state. Use --force to install the correct versions of these libraries since the peer dependencies are not defined correctly (as of writing this documentation)
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn run start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxt.com/docs)

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/getting-started/assets#assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

### `content`

The content directory serves as the file-based CMS of the whole project. We use a library called `nuxt/content` that allows us to import all the content of our website into components/pages across the project.
More information about the usage of this directory in [the documentation](https://content.nuxtjs.org/).

#### i18n

In this project we also support multiple languages. This means that we have to create a separate folder for each language that we want to support. Inside these folders, we can create markdown/JSON files that contain the content for the specific language. An example of how a directory with internationalization should look like is:

```
content
├── mobiliteit-trips-en-aanbod
├── slimme-raadpleegomgevingen
├── ....
│   ├── nl
│   │   ├── configuration.json
│   │   ├── stakeholders.json
│   │   ├── vocabularium-content.md
│   │   ├── applicatieprofiel-content.md
│   │   ├── overview.svg
│   ├── fr
│   │   ├── configuration.json
│   │   ├── stakeholders.json
│   │   ├── vocabularium-content.md
│   │   ├── applicatieprofiel-content.md
│   │   ├── overview.svg
│   ├── en
│   │   ├── configuration.json
│   │   ├── stakeholders.json
│   │   ├── vocabularium-content.md
│   │   ├── applicatieprofiel-content.md
│   │   ├── overview.svg
```

### `enums`

The enums directory contains all the enums that are used in the project. This is a custom directory that we created to store all the enums in one place. This is not a default directory in a Nuxt project.

### `constants`

The constants directory contains all the constants that are used in the project. This is a custom directory that we created to store all the constants in one place. This is not a default directory in a Nuxt project.

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/pages/#pages-directory).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.ts`.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/plugins#plugins-directory).

### `css`

The css directory contains your custom imported css or Sass files. We use this to import the custom styling from the `@govflanders/vl-ui-design-system-style` library. you should create a file in `css/` and add its path to css in `nuxt.config.ts`.

### `types`

Custom directory that contains our customly defined typescript config files. Can be used shorthandedly in your code:

```typescript
import { NavigationMenu } from '~/types/navigationMenu'
```

### `locales`

The locales directory contains all the translations for the website. This is a custom directory that we created to store all the translations in one place. This is not a default directory in a Nuxt project and is needed for the i18n library to work.

## Special files

### .npmrc

This file serves as a config file, specifically for npm. We use this file to store our required tokens for the private npm repositoires such as `@govflanders/vl-ui-design-system-style` and `@govflanders/vl-ui-design-system-vue3`. More information about this file can be found in [the documentation](https://docs.npmjs.com/cli/v9/configuring-npm/npmrc).

In this file, we mention a secret authentication token.

```
registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

This is a secret token that needs to exist in your own session. If you try installing the dependencies without this token present, it will not work. You can set a token using the command below, where `NPM_TOKEN` contains the actual token. For more information, please read this [stackoverflow issue](https://stackoverflow.com/questions/53099434/using-auth-tokens-in-npmrc/61666885#61666885).

```bash
export NPM_TOKEN="${NPM_TOKEN}"
```

### .env

This file serves as a secret file to contain all our API-keys, tokens,... that we don't want to expose to the outside world. This file should **never** be added inside the repository for security purposes. In the `.env.example` file, you can see which tokens and API-keys are required to run this project. Place the actual values inside the `.env` folder on your local device.

#### passing env variables to the frontend

Since Vue `3.x`, nuxt uses [Vite](https://vitejs.dev/guide/why.html) as its preferred bundler over [Webpack](https://webpack.js.org/). This means that environment variables are passed in a different manner from the backend to the frontend. You can access the environment variables by using

```js
import.meta.env.VITE_ENVIRONMENT
```

> Only variables using the `VITE_` prefix are passed to the frontend. **Never** pass secret variables, such as API-tokens to the frontend as these will be up for grabs

## i18n

### Configuration

In this project we also support multiple languages using the `nuxt-i18n` [library](https://i18n.nuxtjs.org/). This library offers out-of-the-box translation for your website. The configuration for this library can be found in the `nuxt.config.ts` file. There is also a separate `i18n.config.ts` with extra configuration options for the library.

### Strategy

`no-prefix` is the default strategy for our project. This means that the default language will not have a prefix in the URL. If you want to change this, you can do so in the `nuxt.config.ts` file. The default language is set to Dutch, but this can be changed in the `nuxt.config.ts` file. For more information about this strategy, please refer to the [documentation](https://i18n.nuxtjs.org/docs/guide#strategies).

The language switcher that's present in the project will set a cookie in your browser that will maintain the `locale`. This means that this cookie is not publication-specific, but rather a global setting for the whole website.

### Query params

Since there is no way to directly navigate to a specific publication using a route, we also support a query-parameter that controls the language of the website. This means that you can navigate to a specific publication using the following URL:

```
{host}/doc/applicatieprofiel/{publicationName}/?lang=nl
```

### Fallback

If at any point the translation fails, the library will fall back to the default language. This means that if a translation is not found for a specific language, because we do not support it or it's not translated, the default language will be used instead. The default language is set in the `nuxt.config.ts` file.

### Reactivity in the code

When using the `language-switcher` component, the application does not redirect to a different page. Instead it changes the locale in the cookie and the page will re-render with the new language. This means that you'll have to be careful with setting variables in the `data` function of your components. If you want to change the language of the website, you'll have to use the `watch` function to watch for changes in the `locale` variable or create a function around it.

#### Wrapper function for reactivity

```typescript
const { t } = useI18n()

const getNavigationLinks = (): NavigationLink[] => {
  return [
    {
      href: '#introduction',
      title: t('introduction'),
    },
  ]
}
```

#### Watch dependency array

```typescript
const { data } = await useAsyncData(
  'data',
  async () => {
    const basePath = `${params?.slug?.[0]}/${locale?.value}`
    const jsonQuery = { _extension: 'json' }

    const [voc] = await Promise.all([
      queryContent<Configuration>(`${basePath}/configuration`)
        .where(jsonQuery)
        .find(),
    ])

    return {
      voc: voc[0],
    }
  },
  {
    watch: [locale],
  },
)
```

## Developer tools

### Prettier

For code formatting purposes, we use a tool called [Prettier](https://prettier.io/). Prettier is a handy tool that can be used to streamline code-formatting across a development team. In this repository, you can find a specific configuration file for this tool called `.prettierrc` which contains our ruleset. This set can be extended based on the project's needs. Don't forget to install Prettier itself in your IDE to get the full effect of this tool.

### ESLint

ESlint is a linting tool that will try and find problems with your JavaScript/TypeScript code as you are writing it. This will help minimize any potential bugs in our production code. For this tool, there is a separate configuration file called `eslintrc.ts` that contains the ruleset we want to enforce. This ruleset can be extended with any amount of rules that can be found [here](https://eslint.org/docs/latest/rules/). Don't forget to install ESlint itself in your IDE to get the full effect of this tool.

## Updating this project

### Setup

There are two important branches in this project: `main` and `publicaties`. The `main` branch is the branch that contains the latest version of the project with just the code and features. There should **never** be any config files in this branch. The `publicaties` branch is the branch that contains the latest version of the project with the latest version of all the required config files of each publication.

### New features

When you want to add a new feature to the project, you should follow these steps:

- Create a new branch from the `main` branch. This can be done automatically from JIRA or manually.
- Develop the feature in this branch.
- When the feature is ready, create a pull request to the `main` branch.
- When the pull request is approved, merge the feature into the `main` branch.
- Merge the main branch with the `publicaties` branch.
