if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('//sw.plugin.js', {
    scope: '/'
  }).then(function(registration) {
    window.$sw = registration
  }).catch(function(error) {
    console.error('Service worker registration failed:', error)
  })
} else {
  console.warn('Service workers are not supported.')
}
