## Global Quran mobile app

This is Quran mobile app using GlobalQuran API service. 

### List of Features

- [ ] Display splash page
- [x] List of surah
- [ ] List class
    - [x] Api call to fetch list, if not already fetched
    - [x] List of Quran
    - [x] List of translation
    - [x] List of Recitors
    - [x] selected list items for each one of them
    - [ ] refactor list by Observables
- [x] Quran data ayahs class to support selected 
- [x] show list of ayahs based on the selected Quran or Translation
    - [ ] Show content which is on scroll only, else it will consume memory and loading of app, because of rendering
    - [ ] Pull new selected Quran or Translation, if not already in the array
    
- [x] Settings page
    - [x] Change Quran text format
    - [x] change translations
    - [x] change transliteration
    - [ ] change recitor
    - [ ] save selected changes in localstorage 
    
- [ ] Player
    - [ ] Settings select recitor   
    - [ ] Support multiple recitors 
    
- [ ] Search Quran 

### Build with

- Angular 2
- ionic
- TypeScript
- RxJS



### Usage
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed
- run `npm install` to install dependencies
- install ionic `npm install -g ionic@beta`
- run `ionic serve` to fire up dev server - this will open app in the browser