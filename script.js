// Mobilmeny – åpne/lukk
(function () {
  var knapp = document.querySelector('.meny-knapp');
  var meny = document.getElementById('hovedmeny');
  if (!knapp || !meny) return;

  function settApen(apen) {
    meny.classList.toggle('er-apen', apen);
    knapp.setAttribute('aria-expanded', apen ? 'true' : 'false');
    knapp.lastChild.textContent = apen ? ' Lukk' : ' Meny';
  }

  knapp.addEventListener('click', function () {
    settApen(!meny.classList.contains('er-apen'));
  });

  // Lenker som Kontakt og Tjenester blir på samme side, så menyen må lukkes manuelt
  meny.addEventListener('click', function (e) {
    if (e.target.closest('a')) settApen(false);
  });
})();

// Oppdater årstall i bunnteksten automatisk
var aar = document.getElementById('aar');
if (aar) aar.textContent = new Date().getFullYear();

// FormSubmit krever full adresse til takk-siden
document.querySelectorAll('input[name="_next"]').forEach(function (felt) {
  felt.value = new URL('takk.html', window.location.href).href;
});
