/**
 * tsj-loader.js
 * Dynamically loads projects and blog posts from JSON data files.
 *
 * TO ADD A NEW PROJECT: edit  data/projects.json
 * TO ADD A NEW BLOG:    edit  data/blogs.json
 *
 * Fields for projects.json item:
 *   id, title, category, date, image, link, description
 *
 * Fields for blogs.json item:
 *   id, title, category, date, readTime, image, link, excerpt
 */

(function () {
    'use strict';

    /* ── Helpers ──────────────────────────────────────────────────── */

    function fetchJSON(url) {
        return fetch(url).then(function (res) {
            if (!res.ok) throw new Error('Failed to load ' + url);
            return res.json();
        });
    }

    /* ── Build a single Swiper slide (project) ────────────────────── */
    function buildProjectSlide(p) {
        return [
            '<div class="swiper-slide">',
            '  <div class="mil-portfolio-item mil-slider-item" data-swiper-parallax="-30">',
            '    <div class="mil-cover-frame mil-drag">',
            '      <div class="mil-cover" data-swiper-parallax-scale="1.3">',
            '        <img src="' + p.image + '" alt="' + p.title + '">',
            '      </div>',
            '    </div>',
            '    <div class="mil-descr" data-swiper-parallax-x="104%" data-swiper-parallax-opacity="0">',
            '      <div class="mil-descr-text" data-swiper-parallax-y="100%" data-swiper-parallax-opacity="0">',
            '        <div class="mil-labels mil-mb-15">',
            '          <div class="mil-label mil-upper mil-accent">' + p.category.toUpperCase() + '</div>',
            '          <div class="mil-label mil-upper">' + p.date + '</div>',
            '        </div>',
            '        <h5>' + p.title + '</h5>',
            '        <p style="margin-top:8px;font-size:0.9rem;opacity:0.75;">' + (p.description || '') + '</p>',
            '      </div>',
            '      <div data-swiper-parallax-y="120" data-swiper-parallax-opacity="0">',
            '        <a href="' + p.link + '" class="mil-button mil-arrow-place">',
            '          <span>View Project</span>',
            '        </a>',
            '      </div>',
            '    </div>',
            '  </div>',
            '</div>'
        ].join('\n');
    }

    /* ── Build a single blog card ─────────────────────────────────── */
    function buildBlogCard(b) {
        return [
            '<div class="col-12 col-md-6 col-lg-4">',
            '  <div class="tsj-blog-card mil-up">',
            '    <div class="tsj-blog-img-wrap">',
            '      <img src="' + b.image + '" alt="' + b.title + '">',
            '      <span class="tsj-blog-tag">' + b.category + '</span>',
            '    </div>',
            '    <div class="tsj-blog-body">',
            '      <div class="tsj-blog-meta">',
            '        <span><i class="far fa-calendar-alt"></i> ' + b.date + '</span>',
            '        <span><i class="far fa-clock"></i> ' + b.readTime + '</span>',
            '      </div>',
            '      <h5 class="tsj-blog-title">' + b.title + '</h5>',
            '      <p class="tsj-blog-excerpt">' + b.excerpt + '</p>',
            '      <a href="' + b.link + '" class="tsj-blog-btn">',
            '        <span>Read Article</span> <i class="fas fa-arrow-right"></i>',
            '      </a>',
            '    </div>',
            '  </div>',
            '</div>'
        ].join('\n');
    }

    /* ── Build sidebar menu project links ─────────────────────────── */
    function buildMenuLinks(projects) {
        return projects.map(function (p) {
            return '<li><a href="' + p.link + '" class="mil-light-soft">' + p.title + '</a></li>';
        }).join('\n');
    }

    /* ── Render projects into Swiper slider ───────────────────────── */
    function renderProjects(projects) {
        var wrapper = document.querySelector('.mil-portfolio-slider .swiper-wrapper');
        var menuList = document.getElementById('tsj-menu-projects');

        if (!wrapper) return;

        // Inject slides HTML
        wrapper.innerHTML = projects.map(buildProjectSlide).join('\n');

        // Update sidebar menu links
        if (menuList) {
            menuList.innerHTML = buildMenuLinks(projects);
        }

        // Destroy existing Swiper instance if it exists, then reinitialize
        var sliderEl = document.querySelector('.mil-portfolio-slider');
        if (sliderEl && sliderEl.swiper) {
            sliderEl.swiper.destroy(true, true);
        }

        // Wait one frame so the DOM is painted before Swiper measures widths
        requestAnimationFrame(function () {
            new Swiper('.mil-portfolio-slider', {
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                parallax: true,
                mousewheel: { enable: true },
                navigation: {
                    nextEl: '.mil-portfolio-next',
                    prevEl: '.mil-portfolio-prev'
                },
                pagination: {
                    el: '.swiper-portfolio-pagination',
                    type: 'fraction'
                }
            });
        });
    }

    /* ── Render blog cards ────────────────────────────────────────── */
    function renderBlogs(blogs) {
        var container = document.getElementById('tsj-blog-container');
        if (!container) return;
        container.innerHTML = blogs.map(buildBlogCard).join('\n');
    }

    /* ── Boot ─────────────────────────────────────────────────────── */
    Promise.all([
        fetchJSON('data/projects.json'),
        fetchJSON('data/blogs.json')
    ]).then(function (results) {
        var projects = results[0];
        var blogs    = results[1];

        renderProjects(projects);
        renderBlogs(blogs);

    }).catch(function (err) {
        console.error('[tsj-loader] Could not load data:', err.message);
    });

})();
