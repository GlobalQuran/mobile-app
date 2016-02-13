## Global Quran mobile app

This is Quran mobile app using GlobalQuran API service. 

### List of Features

- [ ] Display splash page
- [ ] List of surah
- [ ] Ayah list (by surah)
- [ ] Settings page
    - [ ] Change language 
    - [ ] Change Quran text format
- [ ] Player
    - [ ] Settings select recitor   
    - [ ] Support multiple recitors 
- [ ] Search Quran 

### Build with

- Angular 2
- ionic
- typescript
- webpack (replace of gulp/grunt and brower)

- GlobalQuran API
- GlobalQuran Core Library


### Usage
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to `http://localhost:8080`

### Known Issues
- angular2-polyfills.js is currently being handled manually. 
- bundle size is large, due to inline sourcemaps from angular2 npm source.