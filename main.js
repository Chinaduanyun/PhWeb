的要求，胸部和臀部DuanYun// 移动端导航菜单切换
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // 防止页面滚动
      document.body.classList.toggle('no-scroll');
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-toggle') && !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });

    // 点击链接关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
  // 为作品集项目添加点击事件
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      const href = this.dataset.href;
      if (href) {
        window.location.href = href;
      }
    });
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
    
    // 立即加载初始图片
    const masonryGrid = document.getElementById('masonry-grid');
    console.log('Masonry grid:', masonryGrid);
    if (!masonryGrid) {
      console.error('无法找到masonry-grid元素');
      return;
    }
    loadImages();
    
    // 无限滚动图片加载
    const images = [
      '1.png', '2.png', '3.png', '4.png', '5.png',
      '6.png', '7.png', '8.png', '9.png', '10.png',
      '11.png', '12.png', '13.png'
    ];
    
    let currentIndex = 0;
    const batchSize = 4;
    
    function loadImages() {
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < batchSize && currentIndex < images.length; i++) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'masonry-item';
        
        const img = document.createElement('img');
        const imgPath = `images/work1/${images[currentIndex]}`;
        console.log('正在加载图片:', imgPath);
        img.src = imgPath;
        img.alt = `作品 ${currentIndex + 1}`;
        img.loading = 'lazy';
        
        img.onload = () => console.log('图片加载成功:', imgPath);
        img.onerror = () => console.error('图片加载失败:', imgPath);
        
        imgContainer.appendChild(img);
        fragment.appendChild(imgContainer);
        currentIndex++;
      }
      
      console.log('准备插入DOM的图片数量:', fragment.children.length);
      masonryGrid.appendChild(fragment);
      console.log('插入DOM后的子元素数量:', masonryGrid.children.length);
    }
    
    // 初始加载
    loadImages();
    
    // 滚动加载
    window.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      if (scrollTop + clientHeight >= scrollHeight - 100 && currentIndex < images.length) {
        loadImages();
      }
    });
  });
});