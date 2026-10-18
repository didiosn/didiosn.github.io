/* ===== Faust Athiley — Portfolio (vanilla JS) ===== */
(() => {
    'use strict';

    /* ---------- Loader ---------- */
    window.addEventListener('load', () => {
        setTimeout(() => document.getElementById('loader').classList.add('done'), 350);
    });

    /* ---------- Hash router + transitions (style Empathy) ---------- */
    const pages = [...document.querySelectorAll('.pt-page')];
    const navLinks = [...document.querySelectorAll('#main-nav a')];
    let animating = false;

    const routeFromHash = () => {
        const id = location.hash.replace(/^#\//, '');
        return pages.some(p => p.id === id) ? id : 'intro';
    };

    function show(id) {
        const next = document.getElementById(id);
        const current = document.querySelector('.pt-page.page-current');
        if (next === current) return;

        navLinks.forEach(a =>
            a.parentElement.classList.toggle('current', a.dataset.page === id));

        if (!current) {                    // premier affichage : pas d'anim
            next.classList.add('page-current');
            return;
        }
        if (animating) return;
        animating = true;

        current.classList.add('page-out');
        next.classList.add('page-current', 'page-in');
        next.scrollTop = 0;

        const done = () => {
            current.classList.remove('page-current', 'page-out');
            next.classList.remove('page-in');
            current.removeEventListener('animationend', done);
            animating = false;
        };
        current.addEventListener('animationend', done);
        setTimeout(done, 800);             // garde-fou
    }

    window.addEventListener('hashchange', () => show(routeFromHash()));
    show(routeFromHash());

    /* ---------- Menu mobile ---------- */
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('menu-toggle');
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        toggle.classList.toggle('open');
    });
    navLinks.forEach(a => a.addEventListener('click', () => {
        sidebar.classList.remove('open');
        toggle.classList.remove('open');
    }));

    /* ---------- Typist ---------- */
    const WORDS = ['développeur web.', 'développeur mobile.', 'expert.'];
    const el = document.getElementById('typist');
    let w = 0, i = 0, deleting = false;

    (function type() {
        const word = WORDS[w];
        el.textContent = word.slice(0, i);
        if (!deleting && i < word.length) {
            i++; setTimeout(type, 90);
        } else if (!deleting) {
            deleting = true; setTimeout(type, 1800);
        } else if (i > 0) {
            i--; setTimeout(type, 45);
        } else {
            deleting = false; w = (w + 1) % WORDS.length;
            setTimeout(type, 400);
        }
    })();

    /* ---------- Logos flottants (intro) ---------- */
    const FLOAT_LOGOS = [
        'wordpress-1.png', 'apple.png', 'svgporn-javascript.png', 'css-3-1.png',
        'html-5.png', 'php-1.png', 'prestashop-1.png', 'Android_robot.png',
        '320px-LaravelLogo.png', 'svgporn-trello.png', 'svgporn-phpstorm.png',
        '1024px-Android_Studio_icon.128.png', '1051px-Adobe_Photoshop_CC_icon.128.png',
        'flutter.png', 'svgporn-git.png',
    ];
    const wrap = document.querySelector('#intro .particles');
    FLOAT_LOGOS.forEach((name, k) => {
        const f = document.createElement('img');
        f.className = 'flt';
        f.src = `assets/img/${name}`;
        f.alt = '';
        // répartition à peu près régulière + léger hasard (comme l'original)
        const left = (k * (92 / FLOAT_LOGOS.length)) + Math.random() * 6;
        f.style.cssText = `
            left:${left.toFixed(1)}%;
            height:${56 + Math.random() * 56}px;
            opacity:${.5 + Math.random() * .4};
            filter:blur(${Math.random() * 2.5}px);
            animation-duration:${8 + Math.random() * 14}s;
            animation-delay:-${(Math.random() * 20).toFixed(1)}s;
            --s:${.5 + Math.random() * .7}`;
        wrap.appendChild(f);
    });

    /* ---------- Portfolio ---------- */
    const WORKS = [
        // récents (CV) — projets propriétaires, pas de lien public
        { t: 'IA Analytics',     c: 'webapp',     cat: 'ReactJS + Python/Django · interne', img: null, url: null },
        { t: 'Hosman 3',         c: 'webapp',     cat: 'AngularJS · projet interne',  img: null, url: null },
        { t: 'Formaric',         c: 'webapp',     cat: 'Laravel + VueJS',   img: 'assets/img/formaric.png', url: 'https://rhumatech-alliance.com/le-projet-formaric/' },
        { t: 'NOA',              c: 'webapp',     cat: 'Laravel + ReactJS · interne', img: null, url: null },
        { t: 'Proxicare (Eiquem)', c: 'webapp',   cat: 'Laravel + VueJS',   img: 'assets/img/eiquem.png',   url: 'https://eiquem.com/fr/' },
        { t: 'ToneoFirst',       c: 'android',    cat: 'Flutter',           img: 'assets/img/toneo.png',    url: 'https://www.toneofirst.com/' },
        { t: 'Cyclevia',         c: 'webapp',     cat: 'NuxtJS + Symfony',  img: 'assets/img/cyclevia.png', url: 'https://www.cyclevia.com/' },
        { t: 'Oasys',            c: 'webapp',     cat: 'ReactJS',           img: 'assets/img/oasys.png',    url: 'https://app.oasys.fr/connexion' },
        // archive 2018 — liens morts retirés (sites clients fermés)
        { t: 'Genipluri',        c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/genipluri-500x397.jpg',     url: 'http://www.genipluri.fr' },
        { t: 'Faivre Immobilier',c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/faivre-500x436.jpg',        url: null },
        { t: 'Blog Humaninnov',  c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/Sans-titre-5-500x440.jpg',  url: null },
        { t: 'Humaninnov',       c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/hummaninov-500x446.jpg',    url: 'http://humaninnov.com' },
        { t: 'Prest',            c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/prest-500x460.jpg',         url: null },
        { t: 'Horizon 21',       c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/horizon-500x448.jpg',       url: null },
        { t: 'AGO',              c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/ago-500x490.jpg',           url: 'http://www.ago-formation.fr' },
        { t: 'Boreale',          c: 'laravel',    cat: 'Laravel',    img: 'assets/img/boreale-500x318.png',       url: null },
        { t: 'Tobuzz',           c: 'android',    cat: 'Android',    img: 'assets/img/cover10012017x2014-500x500.jpg', url: null },
        { t: 'Avie',             c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/avie-500x473.jpg',          url: null },
        { t: 'Finbiz',           c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/finbiz-500x476.jpg',        url: null },
        { t: 'Soladis Group',    c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/soladis-500x570.jpg',       url: 'http://www.soladis.com' },
        { t: 'Bertin Ostéopathe',c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/bertin-500x525.jpg',        url: null },
        { t: 'Armagnac Castarède',c:'prestashop', cat: 'Prestashop', img: 'assets/img/ac-500x514.jpg',            url: 'https://www.armagnac-castarede.fr/fr/' },
        { t: 'Ushuaia Beauté',   c: 'wordpress',  cat: 'Wordpress',  img: 'assets/img/ushuaia-500x467.jpg',       url: null },
    ];

    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = WORKS.map((w, k) => `
        <${w.url ? `a href="${w.url}" target="_blank" rel="noopener"` : 'div'}
           class="p-item" data-cat="${w.c}" style="animation-delay:${(k % 12) * 40}ms">
            <div class="p-thumb">
                ${w.img
                    ? `<img src="${w.img}" alt="${w.t}" loading="lazy">`
                    : `<div class="ph">${w.t.slice(0, 2).toUpperCase()}</div>`}
            </div>
            <div class="p-info"><h3>${w.t}</h3><span>${w.cat}</span></div>
        </${w.url ? 'a' : 'div'}>`
    ).join('');

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.current').classList.remove('current');
            btn.classList.add('current');
            const f = btn.dataset.filter;
            grid.querySelectorAll('.p-item').forEach(it =>
                it.classList.toggle('hide', f !== '*' && it.dataset.cat !== f));
        });
    });

    /* ---------- Contact ----------
       GitHub Pages = statique : pas de backend.
       FormSubmit.co : vrai formulaire sans compte. Au 1er envoi, un mail
       d'activation part vers gdidiosn@gmail.com — cliquer le lien une fois.
       Fallback mailto si l'API échoue. */
    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/gdidiosn@gmail.com';
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const f = e.target;
        const btn = f.querySelector('button');
        const data = new FormData(f);
        data.append('_subject', `[Portfolio] Message de ${f.name.value}`);
        data.append('_captcha', 'false');
        btn.disabled = true;
        btn.textContent = 'Envoi…';
        fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data,
        }).then(r => {
            btn.textContent = r.ok ? 'Message envoyé ✓' : 'Erreur, réessayez';
            if (r.ok) f.reset();
            btn.disabled = false;
        }).catch(() => {
            const subject = encodeURIComponent(`[Portfolio] Message de ${f.name.value}`);
            const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} <${f.email.value}>`);
            window.location.href = `mailto:gdidiosn@gmail.com?subject=${subject}&body=${body}`;
        });
    });
})();
