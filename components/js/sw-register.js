if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://joshboyan.com/fifteeen/sw.js', {scope: 'https://joshboyan.com/fifteen/})
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}