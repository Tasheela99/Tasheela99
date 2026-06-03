/**
 * blog-reader.js
 * Handles all interactivity for blog.html:
 *  - Loads the correct post from data/blogs.json via URL ?slug=
 *  - Renders content blocks into the page
 *  - Menu button, progress bar, scroll animations, back-to-top
 */

(function ($) {
    'use strict';

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    /* ── Clone hidden elements (arrows / shapes / lines) ─────── */
    $(document).ready(function () {
        $('.mil-arrow').clone().appendTo('.mil-arrow-place');
        $('.mil-dodecahedron').clone().appendTo('.mil-animation');
        $('.mil-lines').clone().appendTo('.mil-lines-place');
    });

    /* ── Progress bar ──────────────────────────────────────────── */
    gsap.to('.mil-progress', {
        height: '100%',
        ease: 'none',
        scrollTrigger: { scrub: 0.3 }
    });

    /* ── Back to top smooth scroll ─────────────────────────────── */
    $(document).on('click', 'a[href="#top"]', function (e) {
        e.preventDefault();
        gsap.to(window, { duration: 0.6, scrollTo: 0, ease: 'power2.inOut' });
    });

    /* ── Back to top button visibility ─────────────────────────── */
    var btt = document.querySelector('.tsj-back-top');
    if (btt) {
        gsap.set(btt, { x: -30, opacity: 0 });
        gsap.to(btt, {
            x: 0, opacity: 1, ease: 'sine',
            scrollTrigger: {
                trigger: 'body', start: 'top -40%', end: 'top -40%',
                toggleActions: 'play none reverse none'
            }
        });
    }

    /* ── Scroll-reveal for .mil-up elements ─────────────────────── */
    document.querySelectorAll('.mil-up').forEach(function (el) {
        gsap.fromTo(el,
            { opacity: 0, y: 40, scale: 0.98 },
            {
                y: 0, opacity: 1, scale: 1, duration: 0.5,
                scrollTrigger: { trigger: el, toggleActions: 'play none none reverse' }
            }
        );
    });

    /* ── Menu button toggle ─────────────────────────────────────── */
    $('.mil-menu-btn').on('click', function () {
        $('.mil-menu-btn').toggleClass('mil-active');
        $('.mil-menu-frame').toggleClass('mil-active');
    });

    /* ── Close menu on nav link click ──────────────────────────── */
    $('.mil-main-menu a').on('click', function () {
        $('.mil-menu-btn').removeClass('mil-active');
        $('.mil-menu-frame').removeClass('mil-active');
    });

    /* ═══════════════════════════════════════════════════════════
       BLOG CONTENT RENDERER
       ═══════════════════════════════════════════════════════════ */

    /* Render a single content block to HTML */
    function renderBlock(block) {
        switch (block.type) {
            case 'heading':
                return '<h2 class="tsj-article-h2">' + block.text + '</h2>';
            case 'subheading':
                return '<h3 class="tsj-article-h3">' + block.text + '</h3>';
            case 'paragraph':
            case 'intro':
                return '<p class="tsj-article-p">' + block.text + '</p>';
            case 'quote':
                return '<blockquote class="tsj-article-quote"><i class="fas fa-quote-left"></i> ' + block.text + '</blockquote>';
            case 'list':
                var items = (block.items || []).map(function (item) {
                    return '<li>' + item + '</li>';
                }).join('');
                return '<ul class="tsj-article-list">' + items + '</ul>';
            case 'code':
                return '<pre class="tsj-article-code"><code>' + block.text + '</code></pre>';
            default:
                return '';
        }
    }

    /* Load and render the blog post */
    function loadPost() {
        var params = new URLSearchParams(window.location.search);
        var slug = params.get('slug');

        if (!slug) {
            showError('No blog post specified.');
            return;
        }

        fetch('data/blogs.json')
            .then(function (res) { return res.json(); })
            .then(function (posts) {
                var post = posts.find(function (p) { return p.slug === slug; });
                if (!post) { showError('Blog post not found.'); return; }
                renderPost(post);
            })
            .catch(function () { showError('Could not load blog data.'); });
    }

    function renderPost(post) {
        /* Page title */
        document.title = post.title + ' — Tasheela Jayawickrama';

        /* Banner fields */
        var catEl = document.getElementById('tsj-post-category');
        var metaEl = document.getElementById('tsj-post-meta');
        var titleEl = document.getElementById('tsj-post-title');

        if (catEl) catEl.textContent = post.category;
        if (metaEl) metaEl.textContent = post.date + ' · ' + post.readTime;
        if (titleEl) titleEl.textContent = post.title;

        /* Featured image */
        var img = document.getElementById('tsj-post-image');
        if (img && post.image) {
            img.src = post.image;
            img.alt = post.title;
        }

        /* Article body */
        var content = document.getElementById('tsj-post-content');
        if (content && post.contentBlocks) {
            content.innerHTML = post.contentBlocks.map(renderBlock).join('');
        }

        /* Trigger scroll animations on newly rendered content */
        ScrollTrigger.refresh();
    }

    function showError(msg) {
        var titleEl = document.getElementById('tsj-post-title');
        if (titleEl) titleEl.textContent = msg;
        var catEl = document.getElementById('tsj-post-category');
        if (catEl) catEl.textContent = 'Error';
    }

    /* Boot */
    loadPost();

}(jQuery));
