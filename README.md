# AMCEF Zadanie

## Požadovaná funkcionalita
- Vytvorenie ToDo zoznamu (môže ich byť viac)
- ToDo zoznam obsahuje:
   - názov
   - ToDo itemy
- Pridanie ToDo itemu do zoznamu
  ToDo item obsahuje:
   - titulok
   - voľný text
   - deadline (dátum a čas)
- Zmazanie ToDo itemu
- Označenie ToDo ako dokončený
- Filtrovanie itemov (všetky, aktívne, dokončené)
- Vyhľadávanie ToDo itemov v rámci zoznamu
- Perzistencia ToDo zoznamov pomocou externej API (napr. [mockapi.io](https://mockapi.io/))

## Použité technológie
- [React](https://github.com/facebook/react)
- [Redux](https://react-redux.js.org/)
- [axios](https://axios-http.com/docs/intro)
- [MaterialUI](https://mui.com/)
- [Formik](https://formik.org/) s [Yup](https://github.com/jquense/yup)
- [mockapi.io](https://mockapi.io/)

## Spustenie
1. Naklonuj tento repozitár:
```
https://github.com/Sangalaa/amcef-test.git
```

2. Nastav .env

3. Nainštaluj knižnice
```
yarn
```

4. Spusti projekt
```
yarn start
```

5. Otvor [localhost](http://www.localhost:3000/)