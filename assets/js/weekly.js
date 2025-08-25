// 周记页面交互功能

// 确保在页面完全加载后执行
function initWeeklyPage() {
    // 筛选功能
    const filterTabs = document.querySelectorAll('.filter-tab');
    const weeklyCards = document.querySelectorAll('.weekly-card');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    console.log('初始化周记页面功能...');
    console.log('找到筛选标签:', filterTabs.length);
    console.log('找到周记卡片:', weeklyCards.length);
    console.log('找到搜索输入框:', searchInput ? '是' : '否');

    if (!searchInput) {
        console.error('未找到搜索输入框');
        return;
    }

    // 筛选标签点击事件
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('点击筛选标签:', this.getAttribute('data-filter'));
            // 更新活跃标签
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterCards(filter, searchInput.value);
        });
    });

    // 搜索功能 - 使用多种事件确保触发
    searchInput.addEventListener('input', function() {
        console.log('搜索输入变化:', this.value);
        const activeFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
        filterCards(activeFilter, this.value);
    });

    searchInput.addEventListener('keyup', function() {
        console.log('搜索按键释放:', this.value);
        const activeFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
        filterCards(activeFilter, this.value);
    });

    // 搜索按钮点击事件
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            console.log('点击搜索按钮');
            const activeFilter = document.querySelector('.filter-tab.active').getAttribute('data-filter');
            filterCards(activeFilter, searchInput.value);
        });
    }

    // 筛选卡片函数
    function filterCards(category, searchTerm) {
        let visibleCount = 0;
        
        weeklyCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // 获取卡片的文本内容，包括标题和内容
            const cardTitle = card.querySelector('.card-title')?.textContent || '';
            const cardPreview = card.querySelector('.card-preview')?.textContent || '';
            const cardFullContent = card.querySelector('.card-full-content')?.textContent || '';
            const cardContent = (cardTitle + ' ' + cardPreview + ' ' + cardFullContent).toLowerCase();
            
            // 搜索匹配逻辑
            const searchMatch = searchTerm.trim() === '' || cardContent.includes(searchTerm.toLowerCase().trim());
            
            // 分类匹配逻辑
            const categoryMatch = category === 'all' || cardCategory === category;

            if (searchMatch && categoryMatch) {
                card.style.display = 'block';
                card.classList.add('show');
                card.classList.remove('hidden');
                visibleCount++;
                
                // 添加淡入动画
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, visibleCount * 50);
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
                card.classList.remove('show');
                card.style.opacity = '0';
                card.style.transform = 'translateX(30px)';
            }
        });

        // 显示搜索结果提示
        showSearchResults(visibleCount, searchTerm);
    }

    // 显示搜索结果提示
    function showSearchResults(count, searchTerm) {
        // 移除之前的提示
        const existingTip = document.querySelector('.search-result-tip');
        if (existingTip) {
            existingTip.remove();
        }

        // 如果有搜索词且结果为0，显示无结果提示
        if (searchTerm.trim() !== '' && count === 0) {
            const tip = document.createElement('div');
            tip.className = 'search-result-tip';
            tip.innerHTML = `
                <div style="
                    text-align: center;
                    padding: 40px 20px;
                    color: #7f8c8d;
                    font-size: 1.1rem;
                ">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🔍</div>
                    <p>未找到包含 "${searchTerm}" 的周记</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">试试其他关键词或清空搜索框查看所有周记</p>
                </div>
            `;
            
            const timeline = document.querySelector('.timeline');
            timeline.appendChild(tip);
        }
    }

    // 平滑滚动到顶部
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 添加滚动到顶部按钮
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f39c12;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', scrollToTop);

    // 监听滚动事件，显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(10px)';
        }
    });

    // 为卡片添加进入动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    weeklyCards.forEach(card => {
        observer.observe(card);
    });
}

// 多种方式确保初始化函数被调用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWeeklyPage);
} else {
    initWeeklyPage();
}

// 备用初始化
window.addEventListener('load', function() {
    // 如果页面已经初始化过，就不再重复初始化
    if (!window.weeklyPageInitialized) {
        initWeeklyPage();
        window.weeklyPageInitialized = true;
    }
});

// 展开/收起卡片内容
function toggleCard(button) {
    const card = button.closest('.weekly-card');
    const fullContent = card.querySelector('.card-full-content');
    const preview = card.querySelector('.card-preview');
    
    if (fullContent.style.display === 'none' || fullContent.style.display === '') {
        // 展开
        fullContent.style.display = 'block';
        preview.style.display = 'none';
        button.textContent = '收起';
        button.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        
        // 平滑滚动到卡片位置
        card.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // 收起
        fullContent.style.display = 'none';
        preview.style.display = 'block';
        button.textContent = '展开阅读';
        button.style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
    }
}

