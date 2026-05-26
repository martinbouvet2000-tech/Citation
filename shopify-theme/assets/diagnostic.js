/* ─────────── AURÉLIA — Diagnostic personnalisé ─────────── */
/* Vanilla JS. Scoring pondéré, persistance localStorage, animations fade. */

(function () {
  'use strict';

  var STORAGE_KEY = 'aurelia_diagnostic_state_v1';
  var TOTAL_QUESTIONS = 7;

  /* ─── Product catalogue (variant IDs are placeholders to swap in admin) ─── */
  var PRODUCTS = {
    signature: {
      key: 'signature',
      name: 'Signature',
      tag: 'Best-seller anti-âge',
      price: '279 €',
      priceStrike: null,
      variant: 'signature-001',
      url: '/products/masque-signature',
      desc: 'Trois longueurs d’onde, séances de 12 minutes, résultats visibles en 4–6 semaines. Le point d’équilibre de la maison.',
    },
    pro: {
      key: 'pro',
      name: 'Lumière Pro',
      tag: 'Anti-âge intensif',
      price: '379 €',
      priceStrike: null,
      variant: 'lumiere-pro-001',
      url: '/products/masque-lumiere-pro',
      desc: 'Sept longueurs d’onde calibrées, protocoles ciblés rides et fermeté. Notre appareil le plus complet.',
    },
    regard: {
      key: 'regard',
      name: 'Regard',
      tag: 'Contour des yeux',
      price: '129 €',
      priceStrike: null,
      variant: 'regard-001',
      url: '/products/masque-regard',
      desc: 'Pensé pour le contour des yeux. Réduit cernes, poches et ridules en séances douces de 8 minutes.',
    },
    decollete: {
      key: 'decollete',
      name: 'Décolleté',
      tag: 'Cou & décolleté',
      price: '199 €',
      priceStrike: null,
      variant: 'decollete-001',
      url: '/products/masque-decollete',
      desc: 'Forme ergonomique pour la zone la plus oubliée. Lisse, raffermit, redonne de l’éclat.',
    },
    bundle: {
      key: 'bundle',
      name: 'Le Rituel Complet',
      tag: 'L’ensemble des quatre',
      price: '515 €',
      priceStrike: '986 €',
      variant: 'rituel-complet-001',
      url: '/pages/le-rituel-complet',
      desc: 'Les quatre masques réunis pour une transformation globale, du contour des yeux au décolleté.',
    },
  };

  /* ─── Questions schema (scoring weights inline) ─── */
  /* weight: applied multiplier on each option’s score map. Q2 et Q6 pondérées ×2. */
  var QUESTIONS = [
    {
      id: 'q1',
      weight: 1,
      title: 'Votre âge',
      hint: 'Pour ajuster la longueur d’onde recommandée.',
      options: [
        { label: '18 – 29 ans',     score: { regard: 2, signature: 1 } },
        { label: '30 – 39 ans',     score: { signature: 2, regard: 1 } },
        { label: '40 – 49 ans',     score: { signature: 2, pro: 1 } },
        { label: '50 – 59 ans',     score: { pro: 2, signature: 1, decollete: 1 } },
        { label: '60 ans et plus',  score: { pro: 2, bundle: 1, decollete: 1 } },
      ],
    },
    {
      id: 'q2',
      weight: 2,
      title: 'Votre préoccupation principale aujourd’hui',
      hint: 'Une seule réponse — celle qui vous parle le plus.',
      options: [
        { label: 'Acné, imperfections, cicatrices',        score: { signature: 2 } },
        { label: 'Premières rides, perte d’éclat',         score: { signature: 3 } },
        { label: 'Rides marquées, perte de fermeté',       score: { pro: 3 } },
        { label: 'Cernes, poches, ridules du regard',      score: { regard: 3 } },
        { label: 'Cou flasque, décolleté marqué',          score: { decollete: 3 } },
        { label: 'Tout à la fois, honnêtement',            score: { bundle: 3 } },
      ],
    },
    {
      id: 'q3',
      weight: 1,
      title: 'Votre routine actuelle',
      hint: 'Soyez honnête, on ne juge pas.',
      options: [
        { label: 'Très minimaliste — savon et crème hydratante',           score: { signature: 2 } },
        { label: 'Routine cohérente — cleanser, sérum, crème',             score: { signature: 2, regard: 1 } },
        { label: 'Routine complète, multi-étapes, actifs ciblés',          score: { pro: 2, bundle: 1 } },
        { label: 'J’utilise déjà des appareils high-tech à la maison',     score: { pro: 2, bundle: 2 } },
      ],
    },
    {
      id: 'q4',
      weight: 1,
      title: 'Temps que vous pouvez consacrer chaque semaine',
      hint: 'Compté en sessions de masque.',
      options: [
        { label: 'Moins de 30 minutes',                            score: { signature: 2 } },
        { label: 'Entre 30 et 60 minutes',                         score: { signature: 1, regard: 2 } },
        { label: 'Entre 1 et 2 heures',                            score: { pro: 2 } },
        { label: 'Plus de 2 heures, je prends mon rituel au sérieux', score: { bundle: 3 } },
      ],
    },
    {
      id: 'q5',
      weight: 1,
      title: 'Votre sensibilité cutanée',
      hint: 'Importante pour calibrer l’intensité.',
      options: [
        { label: 'Très sensible, rougeurs faciles',          score: { regard: 1, signature: 1 } },
        { label: 'Sensible mais tolérante',                  score: { signature: 2 } },
        { label: 'Normale',                                  score: { signature: 1, pro: 1, regard: 1 } },
        { label: 'Résistante, supporte tous les actifs',     score: { pro: 2, bundle: 1 } },
      ],
    },
    {
      id: 'q6',
      weight: 2,
      title: 'Budget que vous êtes prête à investir',
      hint: 'Aucun mauvais choix — chaque appareil a sa place.',
      options: [
        { label: 'Entre 100 et 200 €',                    score: { regard: 3 } },
        { label: 'Entre 200 et 300 €',                    score: { signature: 3 } },
        { label: 'Entre 300 et 400 €',                    score: { pro: 3 } },
        { label: 'Pas de limite, je veux le meilleur',    score: { bundle: 3 } },
      ],
    },
    {
      id: 'q7',
      weight: 1,
      title: 'Quelle promesse vous parle le plus ?',
      hint: 'La phrase qui vous fait dire « oui, c’est ça ».',
      options: [
        { label: 'Une peau plus lumineuse en quatre semaines',                  score: { signature: 3 } },
        { label: 'Combler les rides, raffermir — anti-âge intensif',            score: { pro: 3 } },
        { label: 'Un regard reposé, sans cernes ni poches',                     score: { regard: 3 } },
        { label: 'Cou et décolleté lisses, un trésor souvent oublié',           score: { decollete: 3 } },
        { label: 'Une transformation globale, du regard au décolleté',          score: { bundle: 3 } },
      ],
    },
  ];

  /* ─── State ─── */
  var state = {
    step: 0,            // 0 = landing, 1..7 = questions, 8 = email, 9 = result
    answers: {},        // { q1: index, q2: index, ... }
    email: '',
    completed: false,
  };

  /* ─── DOM refs ─── */
  var $root, $stage, $progressFill, $progressLabel, $back, $reset, $topbar;

  /* ─── Persistence ─── */
  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        state.step = typeof parsed.step === 'number' ? parsed.step : 0;
        state.answers = parsed.answers || {};
        state.email = parsed.email || '';
        state.completed = !!parsed.completed;
      }
    } catch (e) { /* noop */ }
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  /* ─── Scoring ─── */
  function computeScores() {
    var scores = { signature: 0, pro: 0, regard: 0, decollete: 0, bundle: 0 };
    QUESTIONS.forEach(function (q) {
      var answerIdx = state.answers[q.id];
      if (typeof answerIdx !== 'number') return;
      var opt = q.options[answerIdx];
      if (!opt) return;
      Object.keys(opt.score).forEach(function (k) {
        scores[k] = (scores[k] || 0) + (opt.score[k] * q.weight);
      });
    });
    return scores;
  }

  function pickWinner(scores) {
    var keys = Object.keys(scores);
    var max = -Infinity;
    keys.forEach(function (k) { if (scores[k] > max) max = scores[k]; });
    var tied = keys.filter(function (k) { return scores[k] === max; });
    // Egalité : bundle prioritaire si présent, sinon ordre déterministe.
    if (tied.indexOf('bundle') !== -1 && tied.length > 1) return 'bundle';
    var priorityOrder = ['signature', 'pro', 'regard', 'decollete', 'bundle'];
    for (var i = 0; i < priorityOrder.length; i++) {
      if (tied.indexOf(priorityOrder[i]) !== -1) return priorityOrder[i];
    }
    return tied[0] || 'signature';
  }

  function getComplementary(winnerKey) {
    var order = ['signature', 'regard', 'pro', 'decollete', 'bundle'];
    return order.filter(function (k) { return k !== winnerKey; }).slice(0, 3);
  }

  function buildNarrative(winnerKey) {
    var ageOpt   = QUESTIONS[0].options[state.answers.q1];
    var concern  = QUESTIONS[1].options[state.answers.q2];
    var routine  = QUESTIONS[2].options[state.answers.q3];
    var time     = QUESTIONS[3].options[state.answers.q4];
    var promise  = QUESTIONS[6].options[state.answers.q7];

    var ageTxt = ageOpt ? ageOpt.label.toLowerCase() : 'à votre âge';
    var concernTxt = concern ? concern.label.toLowerCase() : 'vos préoccupations';

    var openings = {
      signature: 'Avec une routine ' + (routine ? routine.label.toLowerCase().split(' —')[0] : 'cohérente') + ' et une préoccupation centrée sur ' + concernTxt + ', le masque Signature est votre point d’équilibre.',
      pro:       'Vos réponses pointent vers un besoin d’efficacité intensive. À ' + ageTxt + ', avec une attention portée à ' + concernTxt + ', le Lumière Pro déploie ses sept longueurs d’onde pour une action complète.',
      regard:    'Le regard est votre priorité, et c’est une zone qui mérite son propre appareil. Plus fine, plus expressive, plus exposée — le masque Regard y consacre des séances ciblées de huit minutes.',
      decollete: 'Cou et décolleté révèlent l’âge avant le visage. Notre masque Décolleté épouse exactement cette zone souvent oubliée, pour des résultats lisibles en quelques semaines.',
      bundle:    'Vos réponses dessinent un rituel ambitieux, global, sans compromis. Le Rituel Complet réunit nos quatre masques pour une transformation cohérente, du contour des yeux jusqu’au décolleté.',
    };

    var closings = {
      signature: 'Trois longueurs d’onde, douze minutes par séance, premiers résultats visibles en quatre à six semaines.',
      pro:       'Protocoles dédiés rides, fermeté et éclat. C’est notre référence pour les peaux qui veulent un protocole sérieux.',
      regard:    'Des résultats sur les cernes et les ridules dès la troisième semaine, dans la grande majorité des cas.',
      decollete: 'Un format ergonomique, des séances brèves, une zone qui retrouve son grain et sa fermeté.',
      bundle:    'Et l’économie de 471 € sur l’ensemble fait du Rituel Complet le choix le plus rationnel — si vous le voulez vraiment complet.',
    };

    var midPromise = promise ? ' Vous nous avez dit : « ' + promise.label + ' » — c’est exactement ce que ce masque promet.' : '';

    return openings[winnerKey] + midPromise + ' ' + closings[winnerKey];
  }

  /* ─── Templates ─── */
  function renderLanding() {
    return ''
      + '<div class="diagnostic-step diagnostic-landing is-active" data-step="0">'
      +   '<span class="diagnostic-eyebrow">Diagnostic personnalisé · 2 minutes</span>'
      +   '<h1>Trouvez <em>votre Aurélia</em></h1>'
      +   '<p class="diagnostic-landing-lead">Sept questions pour identifier le masque adapté à votre peau, votre rythme de vie et vos objectifs. Recommandation immédiate, pas de spam.</p>'
      +   '<div class="diagnostic-reassure">'
      +     '<span><span class="check">✓</span> 2 minutes</span>'
      +     '<span><span class="check">✓</span> Sans email obligatoire</span>'
      +     '<span><span class="check">✓</span> Validé par notre comité dermato</span>'
      +   '</div>'
      +   '<div class="diagnostic-actions" style="justify-content:center;">'
      +     '<button type="button" class="diagnostic-btn diagnostic-btn-primary diagnostic-btn-large" data-action="start">Commencer le diagnostic →</button>'
      +   '</div>'
      + '</div>';
  }

  function renderQuestion(qIndex) {
    var q = QUESTIONS[qIndex];
    var current = state.answers[q.id];
    var optsHtml = q.options.map(function (opt, i) {
      var checked = current === i ? ' checked' : '';
      return ''
        + '<label class="diagnostic-option">'
        +   '<input type="radio" name="' + q.id + '" value="' + i + '"' + checked + ' aria-label="' + escapeAttr(opt.label) + '">'
        +   '<span class="diagnostic-option-card">'
        +     '<span class="diagnostic-option-bullet" aria-hidden="true"></span>'
        +     '<span class="diagnostic-option-label">' + escapeHtml(opt.label) + '</span>'
        +   '</span>'
        + '</label>';
    }).join('');

    var hasAnswer = typeof current === 'number';
    var disabledAttr = hasAnswer ? '' : ' disabled';

    return ''
      + '<div class="diagnostic-step diagnostic-question is-active" data-step="' + (qIndex + 1) + '" role="group" aria-labelledby="dq-' + q.id + '">'
      +   '<h2 id="dq-' + q.id + '">' + escapeHtml(q.title) + '</h2>'
      +   '<p class="diagnostic-question-hint">' + escapeHtml(q.hint) + '</p>'
      +   '<div class="diagnostic-options" role="radiogroup" aria-labelledby="dq-' + q.id + '">' + optsHtml + '</div>'
      +   '<div class="diagnostic-actions">'
      +     '<button type="button" class="diagnostic-btn diagnostic-btn-primary" data-action="next"' + disabledAttr + '>'
      +       (qIndex + 1 === TOTAL_QUESTIONS ? 'Voir mes résultats →' : 'Continuer →')
      +     '</button>'
      +   '</div>'
      + '</div>';
  }

  function renderEmail() {
    return ''
      + '<div class="diagnostic-step is-active" data-step="8">'
      +   '<div class="diagnostic-email-card">'
      +     '<span class="diagnostic-eyebrow">Avant le résultat</span>'
      +     '<h2>Recevez votre <em>diagnostic complet</em></h2>'
      +     '<p>Votre recommandation détaillée par email, accompagnée d’un code de bienvenue de 10 %. Vous pouvez aussi voir directement vos résultats — c’est entièrement libre.</p>'
      +     '<form class="diagnostic-email-form" action="/contact#diagnostic" method="post" data-action="email-submit">'
      +       '<input type="hidden" name="form_type" value="contact">'
      +       '<input type="hidden" name="utf8" value="✓">'
      +       '<input type="hidden" name="contact[tags]" value="diagnostic-quiz">'
      +       '<input type="hidden" name="contact[diagnostic_result]" id="diagnostic-result-hidden" value="">'
      +       '<input class="diagnostic-email-input" type="email" name="contact[email]" placeholder="votre@email.com" aria-label="Votre adresse email" required>'
      +       '<button type="submit" class="diagnostic-btn diagnostic-btn-primary">Voir mes résultats →</button>'
      +     '</form>'
      +     '<div class="diagnostic-email-skip">'
      +       '<button type="button" class="diagnostic-btn diagnostic-btn-link" data-action="skip-email">Non merci, voir directement →</button>'
      +     '</div>'
      +   '</div>'
      + '</div>';
  }

  function renderResults() {
    var scores = computeScores();
    var winnerKey = pickWinner(scores);
    var winner = PRODUCTS[winnerKey];
    var narrative = buildNarrative(winnerKey);
    var complementary = getComplementary(winnerKey);

    // Update the hidden input on the email form if it exists in DOM (next render).
    state._lastResultKey = winnerKey;

    var complementaryHtml = complementary.map(function (k) {
      var p = PRODUCTS[k];
      return ''
        + '<a class="diagnostic-secondary-card" href="' + p.url + '">'
        +   '<div class="mini-img">' + escapeHtml(p.name.charAt(0)) + '</div>'
        +   '<h4>' + escapeHtml(p.name) + '</h4>'
        +   '<div class="mini-price">' + escapeHtml(p.price) + '</div>'
        +   '<span class="mini-link">Découvrir →</span>'
        + '</a>';
    }).join('');

    var priceHtml = winner.priceStrike
      ? '<span class="price-strike">' + escapeHtml(winner.priceStrike) + '</span><span class="price-final">' + escapeHtml(winner.price) + '</span>'
      : '<span class="price-final">' + escapeHtml(winner.price) + '</span>';

    return ''
      + '<div class="diagnostic-step diagnostic-result is-active" data-step="9">'
      +   '<span class="diagnostic-eyebrow diagnostic-result-eyebrow">Votre recommandation personnalisée</span>'
      +   '<h2>Votre Aurélia, c’est <em>' + escapeHtml(winner.name) + '</em></h2>'
      +   '<p class="diagnostic-result-narrative">' + escapeHtml(narrative) + '</p>'

      +   '<div class="diagnostic-product-card">'
      +     '<div class="diagnostic-product-img" aria-hidden="true">' + escapeHtml(winner.name.charAt(0)) + '</div>'
      +     '<div class="diagnostic-product-info">'
      +       '<span class="diagnostic-product-tag">' + escapeHtml(winner.tag) + '</span>'
      +       '<h3>' + escapeHtml(winner.name) + '</h3>'
      +       '<p class="diagnostic-product-desc">' + escapeHtml(winner.desc) + '</p>'
      +       '<div class="diagnostic-product-price">' + priceHtml + '</div>'
      +       '<div class="diagnostic-product-actions">'
      +         '<button type="button" class="diagnostic-btn diagnostic-btn-primary" data-action="add-to-cart" data-variant="' + escapeAttr(winner.variant) + '" data-product-key="' + winnerKey + '">Ajouter à mon panier</button>'
      +         '<a class="diagnostic-btn diagnostic-btn-ghost" href="' + winner.url + '">Voir la fiche produit</a>'
      +       '</div>'
      +     '</div>'
      +   '</div>'

      +   '<h3 class="diagnostic-secondary-title">Recommandations complémentaires</h3>'
      +   '<div class="diagnostic-secondary-grid">' + complementaryHtml + '</div>'

      +   '<div class="diagnostic-result-footer">'
      +     '<button type="button" class="diagnostic-btn diagnostic-btn-ghost" data-action="restart">Refaire le diagnostic</button>'
      +     '<a class="diagnostic-btn diagnostic-btn-ghost" href="/collections/all">Voir toute la gamme</a>'
      +   '</div>'
      +   '<p class="diagnostic-share">Partagez votre résultat <button type="button" data-action="share">copier le lien</button><span class="diagnostic-share-feedback" data-share-feedback>copié</span></p>'
      + '</div>';
  }

  /* ─── Render orchestration ─── */
  function render() {
    saveState();
    updateTopbar();

    var html = '';
    if (state.step === 0) {
      html = renderLanding();
    } else if (state.step >= 1 && state.step <= TOTAL_QUESTIONS) {
      html = renderQuestion(state.step - 1);
    } else if (state.step === 8) {
      html = renderEmail();
    } else if (state.step === 9) {
      html = renderResults();
    }

    // Fade transition
    var prev = $stage.querySelector('.diagnostic-step');
    if (prev) {
      prev.classList.remove('is-active');
      setTimeout(function () {
        $stage.innerHTML = html;
        injectHiddenResult();
        focusFirstControl();
      }, 280);
    } else {
      $stage.innerHTML = html;
      injectHiddenResult();
      focusFirstControl();
    }
  }

  function injectHiddenResult() {
    // If on email step, prefill hidden field with last computed result (for context-aware emails).
    if (state.step === 8) {
      var scores = computeScores();
      var winnerKey = pickWinner(scores);
      var hidden = document.getElementById('diagnostic-result-hidden');
      if (hidden) hidden.value = PRODUCTS[winnerKey].name + ' (' + winnerKey + ')';
    }
  }

  function updateTopbar() {
    if (state.step >= 1 && state.step <= TOTAL_QUESTIONS) {
      $topbar.style.visibility = 'visible';
      var pct = (state.step / TOTAL_QUESTIONS) * 100;
      $progressFill.style.right = (100 - pct) + '%';
      $progressLabel.textContent = 'Question ' + state.step + ' sur ' + TOTAL_QUESTIONS;
      $back.hidden = false;
      $reset.hidden = false;
    } else if (state.step === 0) {
      $topbar.style.visibility = 'hidden';
    } else {
      // email or result : hide progress label, keep reset visible on result
      $topbar.style.visibility = 'visible';
      $progressFill.style.right = '0%';
      $progressLabel.textContent = state.step === 9 ? 'Résultat' : 'Presque terminé';
      $back.hidden = state.step === 9;
      $reset.hidden = false;
    }
  }

  function focusFirstControl() {
    var first = $stage.querySelector('input[type="radio"], button[data-action], input[type="email"]');
    if (first && state.step !== 0) {
      // Don't steal focus on landing.
      try { first.focus({ preventScroll: false }); } catch (e) {}
    }
  }

  /* ─── Event handlers ─── */
  function onClick(e) {
    var actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    var action = actionEl.getAttribute('data-action');

    if (action === 'start') {
      state.step = 1;
      render();
    } else if (action === 'next') {
      if (state.step < TOTAL_QUESTIONS) {
        state.step += 1;
      } else {
        // Done with Q7 — go to email step
        state.step = 8;
      }
      render();
    } else if (action === 'skip-email') {
      state.step = 9;
      state.completed = true;
      render();
    } else if (action === 'restart') {
      state = { step: 0, answers: {}, email: '', completed: false };
      clearState();
      render();
    } else if (action === 'back') {
      goBack();
    } else if (action === 'reset') {
      state = { step: 0, answers: {}, email: '', completed: false };
      clearState();
      render();
    } else if (action === 'add-to-cart') {
      addToCart(actionEl);
    } else if (action === 'share') {
      shareResult(actionEl);
    }
  }

  function onChange(e) {
    var input = e.target.closest('input[type="radio"][name^="q"]');
    if (!input) return;
    var qId = input.name;
    state.answers[qId] = parseInt(input.value, 10);
    saveState();
    // Enable next button
    var nextBtn = $stage.querySelector('[data-action="next"]');
    if (nextBtn) nextBtn.removeAttribute('disabled');
  }

  function onSubmit(e) {
    var form = e.target.closest('form[data-action="email-submit"]');
    if (!form) return;
    // Allow native submission to Shopify /contact, but flip UI to results after.
    // We let it submit normally (page navigates), but if it’s same-origin and quick,
    // we also fire an async fetch so the user lands on results without leaving the quiz.
    e.preventDefault();
    var emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value) return;
    state.email = emailInput.value;

    var data = new FormData(form);
    try {
      fetch(form.action, { method: 'POST', body: data, credentials: 'same-origin' })
        .catch(function () { /* swallow; result still shown */ });
    } catch (err) { /* ignore */ }

    state.step = 9;
    state.completed = true;
    render();
  }

  function onKey(e) {
    // Escape : back one step
    if (e.key === 'Escape' && state.step > 0 && state.step <= TOTAL_QUESTIONS) {
      goBack();
      return;
    }
    // Enter : if on a question with answer selected, advance
    if (e.key === 'Enter' && state.step >= 1 && state.step <= TOTAL_QUESTIONS) {
      var q = QUESTIONS[state.step - 1];
      if (typeof state.answers[q.id] === 'number') {
        // Don't override default if focus is on a button
        if (document.activeElement && document.activeElement.tagName === 'BUTTON') return;
        e.preventDefault();
        var nextBtn = $stage.querySelector('[data-action="next"]');
        if (nextBtn && !nextBtn.disabled) nextBtn.click();
      }
    }
    // ArrowDown / ArrowUp on radios : the browser handles within a radiogroup natively if all share name.
  }

  function goBack() {
    if (state.step === 0) return;
    if (state.step === 9) {
      state.step = 8;
    } else if (state.step === 8) {
      state.step = TOTAL_QUESTIONS;
    } else {
      state.step -= 1;
    }
    render();
  }

  function addToCart(btn) {
    var variant = btn.getAttribute('data-variant');
    var productKey = btn.getAttribute('data-product-key');
    var product = PRODUCTS[productKey];
    if (!variant) return;
    btn.disabled = true;
    var originalLabel = btn.textContent;
    btn.textContent = 'Ajout en cours…';

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ id: variant, quantity: 1 }),
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function () {
        btn.textContent = 'Ajouté ✓';
        // Try to notify the theme cart drawer if available
        if (window.theme && typeof window.theme.refreshCart === 'function') {
          window.theme.refreshCart();
        }
        // Lightweight global toast hook used by the theme
        var toast = document.getElementById('toast');
        var msg = document.getElementById('toast-msg');
        if (toast && msg) {
          msg.textContent = (product ? product.name : 'Produit') + ' ajouté au panier';
          toast.classList.add('is-visible');
          setTimeout(function () { toast.classList.remove('is-visible'); }, 2400);
        }
        setTimeout(function () {
          btn.textContent = originalLabel;
          btn.disabled = false;
        }, 2000);
      })
      .catch(function () {
        btn.textContent = 'Erreur — réessayez';
        setTimeout(function () {
          btn.textContent = originalLabel;
          btn.disabled = false;
        }, 2000);
      });
  }

  function shareResult(btn) {
    var url = window.location.href.split('?')[0] + '?result=' + (state._lastResultKey || '');
    var done = function () {
      var fb = document.querySelector('[data-share-feedback]');
      if (fb) {
        fb.classList.add('is-visible');
        setTimeout(function () { fb.classList.remove('is-visible'); }, 1800);
      }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(function () {
        legacyCopy(url); done();
      });
    } else {
      legacyCopy(url); done();
    }
  }
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  /* ─── Utils ─── */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeAttr(s) { return escapeHtml(s); }

  /* ─── Init ─── */
  function init() {
    $root = document.querySelector('[data-diagnostic-root]');
    if (!$root) return;
    $stage = $root.querySelector('[data-diagnostic-stage]');
    $topbar = $root.querySelector('[data-diagnostic-topbar]');
    $progressFill = $root.querySelector('[data-progress-fill]');
    $progressLabel = $root.querySelector('[data-progress-label]');
    $back = $root.querySelector('[data-action="back"]');
    $reset = $root.querySelector('[data-action="reset"]');

    loadState();

    // If state was completed previously but user came back fresh, restart cleanly.
    if (state.completed && state.step >= 9) {
      // Show the result again so they can re-add to cart or restart.
    }

    render();

    $root.addEventListener('click', onClick);
    $root.addEventListener('change', onChange);
    $root.addEventListener('submit', onSubmit);
    document.addEventListener('keydown', onKey);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
