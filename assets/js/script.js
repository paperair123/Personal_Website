// 主要交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            // 滚动时保持70%不透明度，增加阴影效果
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            // 顶部时也保持70%不透明度
            navbar.style.background = 'rgba(255, 255, 255, 0.7)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
        }

        lastScrollTop = scrollTop;
    });

    // 首页滚动指示器点击
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const introSection = document.querySelector('.intro-section');
            if (introSection) {
                introSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // 卡片悬浮效果增强
    const cards = document.querySelectorAll('.intro-card, .nav-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 导航链接活跃状态
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 页面加载动画
    const animatedElements = document.querySelectorAll('.hero-content, .intro-card, .nav-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // 移动端导航菜单
    const navContainer = document.querySelector('.nav-container');
    const navLinks2 = document.querySelector('.nav-links');
    
    // 创建移动端菜单按钮
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.display = 'none'; // 默认隐藏，CSS媒体查询控制显示
    
    navContainer.appendChild(mobileMenuBtn);

    // 移动端菜单切换
    mobileMenuBtn.addEventListener('click', function() {
        navLinks2.classList.toggle('mobile-active');
        // 切换菜单图标
        if (navLinks2.classList.contains('mobile-active')) {
            mobileMenuBtn.innerHTML = '✕';
        } else {
            mobileMenuBtn.innerHTML = '☰';
        }
    });

    // 点击导航链接后关闭移动端菜单
    const mobileNavLinks = navLinks2.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks2.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    });

    // 点击页面其他地方关闭移动端菜单
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !navContainer.contains(e.target) && 
            navLinks2.classList.contains('mobile-active')) {
            navLinks2.classList.remove('mobile-active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });

    // 获取所有带有 'no-copy-interaction' class的元素
    const no_interact_A = document.querySelectorAll('.no-copy-interaction-with-default-cursor');

    no_interact_A.forEach(function(element) {
        // 阻止文本选择事件
        element.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });

        // 阻止右键菜单事件
        element.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });

    const no_interact_B = document.querySelectorAll('.no-copy-interaction');

    // 为按钮元素专门设计阻止复制和右键菜单逻辑，主体逻辑同上
    no_interact_B.forEach(function(element) {
        element.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });

        element.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });
});

