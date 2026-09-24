// 手机端导航：页面在窄屏下会隐藏顶栏链接，这里补一个菜单按钮，展开后可以进入所有页面。
(function(){
  var top=document.querySelector('header.top'),nav=top&&top.querySelector('.nav');
  if(!nav)return;
  var links=[].slice.call(nav.querySelectorAll(':scope>a'));
  if(!links.length)return;

  var style=document.createElement('style');
  style.textContent=
    '.nav-menu-btn{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;margin-left:2px;padding:0;border:1px solid rgba(255,255,255,.2);border-radius:999px;background:rgba(255,255,255,.04);color:inherit;cursor:pointer;flex:none}'+
    '.nav-menu-btn[hidden]{display:none}'+
    '.nav-menu-btn i{position:relative;display:block;width:14px;height:1.5px;border-radius:2px;background:currentColor;transition:background .2s}'+
    '.nav-menu-btn i:before,.nav-menu-btn i:after{content:"";position:absolute;left:0;width:14px;height:1.5px;border-radius:2px;background:currentColor;transition:transform .2s}'+
    '.nav-menu-btn i:before{top:-4.5px}.nav-menu-btn i:after{top:4.5px}'+
    '.nav-menu-btn[aria-expanded="true"] i{background:transparent}'+
    '.nav-menu-btn[aria-expanded="true"] i:before{transform:translateY(4.5px) rotate(45deg)}'+
    '.nav-menu-btn[aria-expanded="true"] i:after{transform:translateY(-4.5px) rotate(-45deg)}'+
    '.nav-menu-panel{position:fixed;left:12px;right:12px;z-index:60;display:grid;padding:8px;background:rgba(8,13,22,.97);border:1px solid rgba(255,255,255,.12);border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.5);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);opacity:0;visibility:hidden;transform:translateY(-6px);transition:.18s ease}'+
    '.nav-menu-panel.open{opacity:1;visibility:visible;transform:none}'+
    '.nav-menu-panel a{display:flex;justify-content:space-between;align-items:center;padding:14px 12px;border-radius:8px;color:rgba(232,236,243,.78);text-decoration:none;font:14px/1.2 system-ui,sans-serif;letter-spacing:.04em}'+
    '.nav-menu-panel a:after{content:"\\2192";opacity:.4}'+
    '.nav-menu-panel a:hover,.nav-menu-panel a.active{color:#fff;background:rgba(255,255,255,.06)}';
  document.head.appendChild(style);

  var homeLabel={ja:'ホーム',zh:'首页',en:'Home'},menuLabel={ja:'メニュー',zh:'菜单',en:'Menu'};
  var btn=document.createElement('button');
  btn.type='button';btn.className='nav-menu-btn';btn.hidden=true;
  btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','navMenuPanel');
  btn.innerHTML='<i></i>';
  var panel=document.createElement('div');
  panel.className='nav-menu-panel';panel.id='navMenuPanel';
  var home=document.createElement('a');home.href='index.html';home.className='nav-menu-home';
  panel.appendChild(home);
  // 克隆原链接：保留 data-t / data-copy 属性，页面切换语言时会一起更新
  links.forEach(function(a){panel.appendChild(a.cloneNode(true))});
  nav.appendChild(btn);top.appendChild(panel);

  function lang(){var l=(document.documentElement.lang||'ja').slice(0,2);return homeLabel[l]?l:'ja'}
  function setOpen(open){
    if(open){
      home.textContent=homeLabel[lang()];
      panel.style.top=(top.getBoundingClientRect().bottom+6)+'px';
    }
    panel.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',menuLabel[lang()]);
  }
  function sync(){
    var hidden=getComputedStyle(links[0]).display==='none';
    btn.hidden=!hidden;
    if(!hidden)setOpen(false);
  }
  btn.addEventListener('click',function(e){e.stopPropagation();setOpen(!panel.classList.contains('open'))});
  document.addEventListener('click',function(e){if(!panel.contains(e.target))setOpen(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false)});
  panel.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false)});
  addEventListener('resize',sync);
  sync();setOpen(false);
})();
