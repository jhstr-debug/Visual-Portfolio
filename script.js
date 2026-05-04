/* ============================================================
   JHESTER M. PASCUAL — PORTFOLIO
   script.js
   ============================================================ */

   'use strict';

   /* ── Custom Cursor ── */
   const cursor = document.getElementById('cursor');
   const follower = document.getElementById('cursorFollower');
   
   let mouseX = 0, mouseY = 0;
   let followerX = 0, followerY = 0;
   
   document.addEventListener('mousemove', (e) => {
     mouseX = e.clientX;
     mouseY = e.clientY;
     cursor.style.left = mouseX + 'px';
     cursor.style.top  = mouseY + 'px';
   });
   
   (function animateFollower() {
     followerX += (mouseX - followerX) * 0.1;
     followerY += (mouseY - followerY) * 0.1;
     follower.style.left = followerX + 'px';
     follower.style.top  = followerY + 'px';
     requestAnimationFrame(animateFollower);
   })();
   
   document.addEventListener('mouseleave', () => {
     cursor.style.opacity   = '0';
     follower.style.opacity = '0';
   });
   
   document.addEventListener('mouseenter', () => {
     cursor.style.opacity   = '1';
     follower.style.opacity = '1';
   });
   
   /* ── Sticky Header ── */
   const header = document.getElementById('header');
   
   window.addEventListener('scroll', () => {
     if (window.scrollY > 40) {
       header.classList.add('scrolled');
     } else {
       header.classList.remove('scrolled');
     }
   }, { passive: true });
   
   /* ── Mobile Nav ── */
   const burger     = document.getElementById('burger');
   const mobileMenu = document.getElementById('mobileMenu');
   const mobileLinks = document.querySelectorAll('.mobile__link');
   
   burger.addEventListener('click', () => {
     const isOpen = mobileMenu.classList.toggle('open');
     burger.classList.toggle('open', isOpen);
     document.body.style.overflow = isOpen ? 'hidden' : '';
   });
   
   mobileLinks.forEach(link => {
     link.addEventListener('click', () => {
       mobileMenu.classList.remove('open');
       burger.classList.remove('open');
       document.body.style.overflow = '';
     });
   });
   
   /* ── Scroll Reveal ── */
   const revealEls = document.querySelectorAll('.reveal');
   
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('is-visible');
         observer.unobserve(entry.target);
       }
     });
   }, {
     threshold: 0.12,
     rootMargin: '0px 0px -60px 0px'
   });
   
   revealEls.forEach(el => observer.observe(el));
   
   /* ── Active Nav Link on Scroll ── */
   const sections  = document.querySelectorAll('section[id], div[id]');
   const navLinks  = document.querySelectorAll('.nav__link');
   
   const sectionObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         const id = entry.target.getAttribute('id');
         navLinks.forEach(link => {
           link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
         });
       }
     });
   }, { threshold: 0.4 });
   
   sections.forEach(s => sectionObserver.observe(s));
   
   /* ── Smooth scroll for anchor links ── */
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
       const target = document.querySelector(this.getAttribute('href'));
       if (target) {
         e.preventDefault();
         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
     });
   });
   
   /* ── Skill items stagger ── */
   const skillItems = document.querySelectorAll('.skill-item');
   skillItems.forEach((item, i) => {
     item.style.transitionDelay = `${i * 0.07}s`;
   });