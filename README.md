# Changelog

- init `npm create vite@latest react-app -- --template react-ts`
- fix the start command `npm i && npm run start`
- [`https://oleg-butko.github.io/vite-react-ts-gh-pages`](https://oleg-butko.github.io/vite-react-ts-gh-pages/)
- [`Mantine components:`](https://mantine.dev/guides/vite/)
  - `npm i @mantine/core @mantine/hooks`
  - `npm i --save-dev postcss postcss-preset-mantine postcss-simple-vars`
  - `npm i @tabler/icons-react`
  - Mantine InputWithButton
- Basic static list of todos (InputWithButton + checkboxes)
- Adding new items with a click or Enter
- Add filter for 'All', 'Active', 'Completed'
- Add a test (components/Todos/index.spec.tsx)
  - `npm i -D jest @testing-library/react ts-jest @types/jest ts-node @testing-library/jest-dom jest-environment-jsdom @testing-library/user-event`
  - `npm i -D identity-obj-proxy jest-transformer-svg vite-tsconfig-paths`
- Add [jsonplaceholder)](https://jsonplaceholder.typicode.com/todos) data source

