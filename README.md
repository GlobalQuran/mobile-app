## Global Quran mobile app

This is Quran mobile app using GlobalQuran API service. 

### List of Features

- [ ] Display splash page
- [x] List of surah
- [x] List class
    - [x] Api call to fetch list, if not already fetched
    - [x] List of Quran
    - [x] List of translation
    - [x] List of Recitors
    - [x] selected list items for each one of them
    - [ ] refactor list by Observables
- [x] Quran data ayahs class to support selected 
- [x] show list of ayahs based on the selected Quran or Translation
    - [x] Show content which is on scroll only, else it will consume memory and loading of app, because of rendering
    - [x] Pull new selected Quran or Translation, if not already in the array
    - [x] Data content bind with required parsers functions - dynamic, so more data can easily be added on it.
    
- [x] Settings page
    - [x] Change Quran text format
    - [x] change translations
    - [x] change transliteration
    - [ ] change recitor
    - [x] save selected changes in localstorage 
    
- [ ] Player
    - [ ] Settings select recitor   
    - [ ] Support multiple recitors 
    
- [ ] Designs
    - [x] design new mobile & table design
    - [x] css new design to ionic version
    - [ ] check if it works fine with tablet
    - [x] implement new design on the system
    
- [ ] Search Quran 

### Build with

- Angular 2
- ionic 2
- TypeScript
- RxJS



### Usage
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed
- install ionic `npm install -g ionic@beta` (to install ionic 2)
- run `npm install` to install dependencies
- run `ionic serve` to fire up dev server - this will open app in the browser


### Test on IOS Simulator 

```
ionic emulate -ls --target="iPhone5S"
```