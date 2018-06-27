(function() {
  window.addEventListener('devicelight', function(event) {
      $('#light').text('light: ' + event.value);

  });
})();
