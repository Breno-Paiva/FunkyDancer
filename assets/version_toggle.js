(function () {
  'use strict';

  var STORAGE_KEY = 'funkyDancerVersion';

  var toggle = document.getElementById('versionToggle');
  var classicVersion = document.getElementById('classic-version');
  var modernVersion = document.getElementById('modern-version');
  var announcer = document.getElementById('versionAnnouncer');

  if (!toggle || !classicVersion || !modernVersion) return;

  var currentMode = 'classic';

  function setMode(mode, persist) {
    currentMode = mode;
    var isModern = mode === 'modern';

    toggle.setAttribute('aria-checked', isModern ? 'true' : 'false');
    classicVersion.hidden = isModern;
    modernVersion.hidden = !isModern;

    if (announcer) {
      announcer.textContent = isModern
        ? 'Modern version selected. Coming soon.'
        : 'Classic 2017 version selected.';
    }

    // Reuse the game's own pause control instead of touching its audio/ticker
    // state directly, so switching away mid-song leaves everything in sync.
    if (isModern) {
      var playButton = document.getElementById('play');
      if (playButton && playButton.textContent.trim() === '||') {
        playButton.click();
      }
    }

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch (err) {
        // localStorage unavailable (private browsing, etc.) - preference just won't persist
      }
    }
  }

  toggle.addEventListener('click', function () {
    setMode(currentMode === 'modern' ? 'classic' : 'modern', true);
  });

  // The game binds j/k/l/; on document.body regardless of visibility; stop
  // those keys in the capture phase so they don't fire against the hidden
  // classic canvas while the coming-soon screen is showing.
  document.addEventListener('keydown', function (e) {
    if (currentMode === 'modern') {
      e.stopPropagation();
    }
  }, true);

  var savedMode = null;
  try {
    savedMode = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    // localStorage unavailable - fall back to the default classic view
  }

  if (savedMode === 'modern') {
    setMode('modern', false);
  }
})();
