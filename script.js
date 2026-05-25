const jianghuItems = [
    {
        id: 1,
        title: "笑傲江湖 · 令狐冲",
        category: "人物",
        description: "华山派大弟子，独孤九剑传人，性格洒脱不羁。",
        longDescription: "令狐冲是金庸武侠小说《笑傲江湖》中的男主角。他本是华山派掌门岳不群的大弟子，天资聪颖，却因性格洒脱不拘小节而不为师父所喜。因缘际会之下，他习得独孤九剑，成为一代武林高手。令狐冲一生追求自由，最终与任盈盈携手归隐江湖。",
        imageUrl: "https://picsum.photos/400/300?random=1",
        likes: 256
    },
    {
        id: 2,
        title: "倚天屠龙记 · 赵敏",
        category: "人物",
        description: "蒙古郡主，聪明机智，敢爱敢恨。",
        longDescription: "赵敏是金庸武侠小说《倚天屠龙记》中的女主角之一。她是元朝汝阳王的女儿，封号绍敏郡主。赵敏容貌美丽，智计百出，擅长权谋。她与张无忌的爱情故事曲折动人，最终放弃郡主身份，追随张无忌。",
        imageUrl: "https://picsum.photos/400/300?random=2",
        likes: 189
    },
    {
        id: 3,
        title: "玄铁重剑",
        category: "兵器",
        description: "剑魔独孤求败所铸，重逾千斤。",
        longDescription: "玄铁重剑是金庸武侠小说中的神兵利器，为剑魔独孤求败所铸造。此剑通体黝黑，重逾千斤，寻常人难以举起。独孤求败曾以此剑横行天下，后将其埋于剑冢之中。杨过断臂后在剑冢中发现此剑，凭此练成绝世武功。",
        imageUrl: "https://picsum.photos/400/300?random=3",
        likes: 312
    },
    {
        id: 4,
        title: "独孤九剑",
        category: "招式",
        description: "剑魔独孤求败所创，无招胜有招。",
        longDescription: "独孤九剑是金庸武侠小说中最顶尖的剑法之一，由剑魔独孤求败所创。这套剑法共有九式：总诀式、破剑式、破刀式、破枪式、破鞭式、破索式、破掌式、破箭式、破气式。其精髓在于'无招胜有招'，能看破对手招式的破绽并加以破解。",
        imageUrl: "https://picsum.photos/400/300?random=4",
        likes: 423
    },
    {
        id: 5,
        title: "武当派",
        category: "门派",
        description: "张三丰所创，以太极拳、太极剑闻名。",
        longDescription: "武当派是金庸武侠小说中的名门正派，由张三丰真人所创。武当派以太极拳、太极剑为独门绝技，讲究以柔克刚、后发制人。武当派历任掌门皆是武林中德高望重的人物，与少林派并称武林两大泰斗。",
        imageUrl: "https://picsum.photos/400/300?random=5",
        likes: 167
    },
    {
        id: 6,
        title: "降龙十八掌",
        category: "招式",
        description: "丐帮镇帮绝学，刚猛无俦。",
        longDescription: "降龙十八掌是金庸武侠小说中丐帮的镇帮绝学，刚猛无俦，威力无穷。这套掌法共有十八式，每一招都蕴含着无穷的力量。历代丐帮帮主如乔峰、洪七公、郭靖等人都曾以此掌法威震武林。",
        imageUrl: "https://picsum.photos/400/300?random=6",
        likes: 389
    },
    {
        id: 7,
        title: "小李飞刀",
        category: "兵器",
        description: "李寻欢独门武器，例不虚发。",
        longDescription: "小李飞刀是古龙武侠小说《多情剑客无情剑》中李寻欢的独门武器。李寻欢的飞刀短小精悍，却能在瞬息之间取人性命，百发百中，从未失手。'小李飞刀，例不虚发'成为江湖中流传的神话。",
        imageUrl: "https://picsum.photos/400/300?random=7",
        likes: 278
    },
    {
        id: 8,
        title: "少林派",
        category: "门派",
        description: "武林泰斗，博大精深。",
        longDescription: "少林派是金庸武侠小说中的武林泰斗，创立于北魏时期，历史悠久。少林派武学博大精深，拥有七十二项绝技，如易筋经、少林拳、罗汉拳等。少林派向来以除暴安良、维护正义为己任，是武林中的中流砥柱。",
        imageUrl: "https://picsum.photos/400/300?random=8",
        likes: 245
    }
];

const backupQuotes = [
    { text: "十步杀一人，千里不留行。", author: "李白" },
    { text: "侠之大者，为国为民。", author: "金庸" },
    { text: "天下风云出我辈，一入江湖岁月催。", author: "黄霑" },
    { text: "人在江湖，身不由己。", author: "古龙" },
    { text: "刀剑如梦，恩怨似风。", author: "周华健" }
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
    const savedLikes = localStorage.getItem('jianghu_likes');
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
    localStorage.setItem('jianghu_likes', JSON.stringify(likesObj));
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