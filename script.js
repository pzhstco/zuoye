const jianghuItems = [
    {
        id: 1,
        title: "瑞士阿尔卑斯山脉",
        category: "自然",
        description: "欧洲屋脊，白雪皑皑，壮丽山峦绵延天际。",
        longDescription: "阿尔卑斯山脉是欧洲最高的山脉，横跨瑞士、法国、意大利等多个国家。瑞士段的阿尔卑斯山以其壮丽的雪峰、碧绿的草甸和清澈的湖泊闻名于世，是世界著名的旅游胜地和滑雪天堂。",
        imageUrl: "https://picsum.photos/400/300?random=10",
        likes: 456
    },
    {
        id: 2,
        title: "日本京都古街",
        category: "城市",
        description: "千年古都，韵味十足，传统与现代完美融合。",
        longDescription: "京都是日本的文化古都，拥有众多世界文化遗产。这里保存了大量传统的町屋、神社和寺庙。漫步在�的�的花见小路，可以感受到浓厚的日本传统文化氛围。",
        imageUrl: "https://picsum.photos/400/300?random=11",
        likes: 389
    },
    {
        id: 3,
        title: "巴黎埃菲尔铁塔",
        category: "建筑",
        description: "浪漫之都的地标，钢铁杰作的永恒魅力。",
        longDescription: "埃菲尔铁塔是巴黎最著名的标志性建筑，建于1889年，高324米。这座铁塔最初是为世界博览会而建，如今已成为法国浪漫和优雅的象征，每年吸引数百万游客前来观赏。",
        imageUrl: "https://picsum.photos/400/300?random=12",
        likes: 567
    },
    {
        id: 4,
        title: "意大利威尼斯水城",
        category: "城市",
        description: "水上都市，浪漫至极，贡多拉穿行于水巷之间。",
        longDescription: "威尼斯是意大利东北部的著名水城，由118个小岛组成，以其独特的运河、桥梁和贡多拉船闻名。圣马可广场、叹息桥等景点构成了这座城市独特的浪漫风情。",
        imageUrl: "https://picsum.photos/400/300?random=13",
        likes: 445
    },
    {
        id: 5,
        title: "冰岛极光",
        category: "自然",
        description: "绿色光幕舞动天际，北欧奇观的梦幻体验。",
        longDescription: "冰岛是观赏北极光的最佳地点之一。在漫长的冬夜里，绚丽多彩的极光在夜空中舞动，如同大自然的魔法。绿、蓝、紫色的光带交织成一幅梦幻般的画卷。",
        imageUrl: "https://picsum.photos/400/300?random=14",
        likes: 678
    },
    {
        id: 6,
        title: "中国长城",
        category: "建筑",
        description: "万里长城，世界奇迹，中华文明的伟大象征。",
        longDescription: "长城是世界上最长的人工建筑，全长超过2万公里。它始建于春秋战国时期，历经数千年不断完善。站在长城之上，可以感受到古代劳动人民的智慧和伟大。",
        imageUrl: "https://picsum.photos/400/300?random=15",
        likes: 789
    },
    {
        id: 7,
        title: "摩洛哥马拉喀什",
        category: "人文",
        description: "红色之城，沙漠边缘的千年古都。",
        longDescription: "马拉喀什是摩洛哥的历史文化名城，以其红色城墙和热闹非凡的杰马夫纳广场闻名。这里融合了阿拉伯、柏柏尔和欧洲的文化元素，是一个充满异域风情的目的地。",
        imageUrl: "https://picsum.photos/400/300?random=16",
        likes: 312
    },
    {
        id: 8,
        title: "新西兰皇后镇",
        category: "自然",
        description: "冒险之都，湖泊与雪山的完美结合。",
        longDescription: "皇后镇位于新西兰南岛，以其壮丽的自然风光和丰富的极限运动项目闻名。瓦卡蒂普湖碧波荡漾，卓越山脉白雪皑皑，这里是《指环王》三部曲的主要取景地。",
        imageUrl: "https://picsum.photos/400/300?random=17",
        likes: 423
    }
];

const backupQuotes = [
    { text: "世界那么大，我想去看看。", author: "旅行者" },
    { text: "旅行是最好的阅读，行走是最深的思考。", author: "行者" },
    { text: "最美的风景，总是在路上。", author: "旅人" },
    { text: "用脚步丈量世界，用镜头记录美好。", author: "摄影师" },
    { text: "生活不止眼前的苟且，还有诗和远方。", author: "高晓松" }
];

let currentItems = [...jianghuItems];
let sortOrder = 'desc';

function init() {
    loadLikesFromStorage();
    fetchHitokoto();
    initFilterButtons();
    initSearch();
    initSortButtons();
    renderCards();
    initModal();
}

function loadLikesFromStorage() {
    const savedLikes = localStorage.getItem('world_viewer_likes');
    if (savedLikes) {
        const likesObj = JSON.parse(savedLikes);
        jianghuItems.forEach(item => {
            if (likesObj[item.id]) {
                item.likes = likesObj[item.id];
            }
        });
    }
}

function saveLikesToStorage() {
    const likesObj = {};
    jianghuItems.forEach(item => {
        likesObj[item.id] = item.likes;
    });
    localStorage.setItem('world_viewer_likes', JSON.stringify(likesObj));
}

function fetchHitokoto() {
    const hitokotoEl = document.getElementById('hitokoto');
    const authorEl = document.querySelector('.hitokoto-author');
    
    fetch('https://v1.hitokoto.dev/')
        .then(res => res.json())
        .then(data => {
            hitokotoEl.innerHTML = data.hitokoto;
            authorEl.textContent = data.from || '佚名';
        })
        .catch(() => {
            const randomQuote = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
            hitokotoEl.innerHTML = randomQuote.text;
            authorEl.textContent = randomQuote.author;
        });
}

function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            filterCards(filter);
        });
    });
}

function filterCards(category) {
    if (category === 'all') {
        currentItems = [...jianghuItems];
    } else {
        currentItems = jianghuItems.filter(item => item.category === category);
    }
    sortCards();
    renderCards();
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    const performSearch = () => {
        const keyword = searchInput.value.toLowerCase();
        if (!keyword.trim()) {
            currentItems = [...jianghuItems];
        } else {
            currentItems = jianghuItems.filter(item => 
                item.title.toLowerCase().includes(keyword) ||
                item.description.toLowerCase().includes(keyword)
            );
        }
        sortCards();
        renderCards();
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

function initSortButtons() {
    const sortDescBtn = document.getElementById('sort-desc');
    const sortAscBtn = document.getElementById('sort-asc');
    
    sortDescBtn.addEventListener('click', () => {
        sortOrder = 'desc';
        sortDescBtn.classList.add('active');
        sortAscBtn.classList.remove('active');
        sortCards();
        renderCards();
    });
    
    sortAscBtn.addEventListener('click', () => {
        sortOrder = 'asc';
        sortAscBtn.classList.add('active');
        sortDescBtn.classList.remove('active');
        sortCards();
        renderCards();
    });
}

function sortCards() {
    currentItems.sort((a, b) => {
        return sortOrder === 'desc' ? b.likes - a.likes : a.likes - b.likes;
    });
}

function renderCards() {
    const container = document.getElementById('cards-container');
    const emptyState = document.getElementById('empty-state');
    
    if (currentItems.length === 0) {
        emptyState.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(emptyState);
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = currentItems.map((item, index) => `
        <div class="card fade-in-up" data-id="${item.id}" style="animation-delay: ${index * 0.1}s">
            <div class="card-image">
                <img src="${item.imageUrl}" alt="${item.title}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                <span class="card-category">${item.category}</span>
                <div class="card-actions">
                    <button class="like-btn" data-id="${item.id}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>${item.likes}</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    initLikeButtons();
    initScrollAnimation();
}

function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.dataset.id);
            const item = jianghuItems.find(i => i.id === itemId);
            if (item) {
                item.likes++;
                btn.classList.add('liked');
                setTimeout(() => btn.classList.remove('liked'), 300);
                btn.querySelector('span').textContent = item.likes;
                saveLikesToStorage();
            }
        });
    });
}

function initModal() {
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');
    
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card && !e.target.closest('.like-btn')) {
            const itemId = parseInt(card.dataset.id);
            const item = jianghuItems.find(i => i.id === itemId);
            if (item) {
                showModal(item);
            }
        }
    });
    
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function showModal(item) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-image').src = item.imageUrl;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-description').textContent = item.longDescription;
    document.getElementById('modal-category').textContent = item.category;
    document.getElementById('modal-likes').textContent = item.likes;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', init);