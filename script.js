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

// Uthev menyknappen man trykket på, også når den peker til en del av en side (f.eks. Ansatte)
(function () {
  var lenker = document.querySelectorAll('.meny a');
  if (!lenker.length) return;

  function filnavn(url) {
    return url.pathname.split('/').pop() || 'index.html';
  }

  function oppdater() {
    var side = filnavn(window.location);
    var valgt = null;
    var reserve = null;

    lenker.forEach(function (a) {
      var url = new URL(a.href);
      a.removeAttribute('aria-current');
      if (filnavn(url) !== side) return;
      if (url.hash && url.hash === window.location.hash) valgt = a;
      if (!url.hash && !reserve) reserve = a;
    });

    var aktiv = valgt || reserve;
    if (aktiv) aktiv.setAttribute('aria-current', 'page');
  }

  oppdater();
  window.addEventListener('hashchange', oppdater);
})();

// Oppdater årstall i bunnteksten automatisk
var aar = document.getElementById('aar');
if (aar) aar.textContent = new Date().getFullYear();

// FormSubmit krever full adresse til takk-siden
document.querySelectorAll('input[name="_next"]').forEach(function (felt) {
  felt.value = new URL('takk.html', window.location.href).href;
});
