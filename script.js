document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    const cards = document.querySelectorAll('.card');
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const cardGrid = document.getElementById('card-grid');
    const cardCount = document.getElementById('card-count');
    const noResults = document.getElementById('no-results');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const likeBtns = document.querySelectorAll('.like-btn');
    const shareBtns = document.querySelectorAll('.share-btn');
    const rateBtns = document.querySelectorAll('.rate-btn');
    const ratingModal = document.getElementById('rating-modal');
    const ratingStars = document.querySelectorAll('#rating-stars .rating-star');
    const ratingValue = document.getElementById('rating-value');
    const ratingSubmit = document.getElementById('rating-submit');
    const ratingClose = document.querySelector('.rating-modal-close');
    const messageForm = document.getElementById('message-form');
    const messagesList = document.getElementById('messages-list');

    let currentFilter = 'all';
    let currentSearch = '';
    let currentSort = 'default';
    let likes = JSON.parse(localStorage.getItem('travelLikes')) || {};
    let ratings = JSON.parse(localStorage.getItem('travelRatings')) || {};
    let messages = JSON.parse(localStorage.getItem('travelMessages')) || [];
    let currentLightboxIndex = 0;
    let currentRatingId = null;
    let selectedRating = 0;
    let visibleCards = [];

    function updateLikes() {
        likeBtns.forEach(btn => {
            const id = btn.dataset.id;
            const count = likes[id] || 0;
            btn.innerHTML = `❤️ ${count}`;
        });
    }

    function saveLikes() { localStorage.setItem('travelLikes', JSON.stringify(likes)); }

    function updateMessages() {
        messagesList.innerHTML = '';
        messages.forEach(msg => {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.innerHTML = `<div class="message-header"><span class="message-name">${msg.name}</span><span class="message-date">${msg.date}</span></div><div class="message-content">${msg.content}</div>`;
            messagesList.appendChild(messageItem);
        });
    }

    function saveMessages() { localStorage.setItem('travelMessages', JSON.stringify(messages)); }

    function filterAndSortCards() {
        visibleCards = Array.from(cards);
        visibleCards.forEach(card => {
            const category = card.dataset.category;
            const name = card.dataset.name.toLowerCase();
            const searchTerm = currentSearch.toLowerCase();
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = name.includes(searchTerm);
            if (matchesFilter && matchesSearch) { card.style.display = 'block'; } else { card.style.display = 'none'; }
        });
        if (currentSort !== 'default') {
            const sorted = visibleCards.filter(card => card.style.display !== 'none');
            sorted.sort((a, b) => {
                if (currentSort === 'rating-desc') return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
                else if (currentSort === 'rating-asc') return parseFloat(a.dataset.rating) - parseFloat(b.dataset.rating);
                else if (currentSort === 'name-asc') return a.dataset.name.localeCompare(b.dataset.name, 'zh-CN');
                else if (currentSort === 'name-desc') return b.dataset.name.localeCompare(a.dataset.name, 'zh-CN');
                return 0;
            });
            sorted.forEach(card => cardGrid.appendChild(card));
        }
        const visibleCount = visibleCards.filter(card => card.style.display !== 'none').length;
        cardCount.textContent = `显示 ${visibleCount} 个景点`;
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { backToTopBtn.classList.add('visible'); } else { backToTopBtn.classList.remove('visible'); }
    });

    backToTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    searchInput.addEventListener('input', function(e) { currentSearch = e.target.value; filterAndSortCards(); });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterAndSortCards();
        });
    });

    sortSelect.addEventListener('change', function() { currentSort = this.value; filterAndSortCards(); });

    likeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            likes[id] = (likes[id] || 0) + 1;
            saveLikes();
            updateLikes();
            this.style.transform = 'scale(1.3)';
            setTimeout(() => this.style.transform = 'scale(1)', 200);
        });
    });

    shareBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.card');
            const name = card.dataset.name;
            const shareText = `我在「本地旅游攻略」发现了${name}，这个景点太棒了！`;
            const shareUrl = window.location.href;
            if (navigator.share) {
                navigator.share({ title: name, text: shareText, url: shareUrl }).catch(err => console.log('Share cancelled'));
            } else {
                const tempInput = document.createElement('input');
                tempInput.value = `${shareText} ${shareUrl}`;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                this.textContent = '✅ 已复制';
                setTimeout(() => this.textContent = '📤 分享', 2000);
            }
        });
    });

    rateBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            currentRatingId = this.dataset.id;
            selectedRating = 0;
            ratingStars.forEach((star, index) => { star.classList.remove('active'); });
            ratingValue.textContent = '请选择星级';
            ratingModal.classList.add('active');
        });
    });

    ratingStars.forEach((star, index) => {
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            ratingStars.forEach((s, i) => { if (i <= index) { s.classList.add('active'); } else { s.classList.remove('active'); } });
            ratingValue.textContent = `您选择了 ${selectedRating} 星`;
        });
    });

    ratingSubmit.addEventListener('click', function() {
        if (selectedRating > 0 && currentRatingId) {
            ratings[currentRatingId] = selectedRating;
            localStorage.setItem('travelRatings', JSON.stringify(ratings));
            ratingModal.classList.remove('active');
            const rateBtn = document.querySelector(`.rate-btn[data-id="${currentRatingId}"]`);
            if (rateBtn) { rateBtn.textContent = `⭐ ${selectedRating}星`; rateBtn.style.background = '#ffeaa7'; rateBtn.style.color = '#d63031'; }
        }
    });

    ratingClose.addEventListener('click', function() { ratingModal.classList.remove('active'); });
    ratingModal.addEventListener('click', function(e) { if (e.target === ratingModal) { ratingModal.classList.remove('active'); } });

    const cardImages = document.querySelectorAll('.card-image');
    cardImages.forEach((imgContainer, index) => {
        imgContainer.addEventListener('click', function() {
            const img = this.querySelector('img');
            const fullImgUrl = img.dataset.full;
            const cardTitle = this.closest('.card').querySelector('h3').textContent;
            visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
            currentLightboxIndex = visibleCards.indexOf(this.closest('.card'));
            lightboxImg.src = fullImgUrl;
            lightboxCaption.textContent = cardTitle;
            lightbox.classList.add('active');
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => { lightbox.classList.remove('active'); });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + visibleCards.length) % visibleCards.length;
        const card = visibleCards[currentLightboxIndex];
        const img = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        lightboxImg.src = img.dataset.full;
        lightboxCaption.textContent = title;
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % visibleCards.length;
        const card = visibleCards[currentLightboxIndex];
        const img = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        lightboxImg.src = img.dataset.full;
        lightboxCaption.textContent = title;
    });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) { lightbox.classList.remove('active'); } });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') lightbox.classList.remove('active');
        if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
        if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
    });

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('message-name').value;
        const content = document.getElementById('message-content').value;
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        messages.unshift({ name: name, content: content, date: dateStr });
        saveMessages();
        updateMessages();
        document.getElementById('message-name').value = ''; document.getElementById('message-content').value = '';
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } });
    }, observerOptions);

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    updateLikes();
    updateMessages();
    filterAndSortCards();
});