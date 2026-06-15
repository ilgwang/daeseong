/* ===========================================================
   대성교회 — 공용 헤더/푸터 주입 + 인터랙션 (church-nav.js)
   각 페이지 <body data-page="home|about|sermons|community|missions|location">
   =========================================================== */
(function(){
  var page = document.body.getAttribute('data-page') || 'home';

  var MENU = [
    { key:'about',     label:'교회소개',   href:'about.html' },
    { key:'sermons',   label:'예배·설교',  href:'sermons.html', sub:[
        ['주일예배 설교','sermons.html#sunday'],
        ['수요기도회 설교','sermons.html#wed'],
        ['금요철야기도회 설교','sermons.html#fri'] ] },
    { key:'community', label:'커뮤니티',   href:'community.html', sub:[
        ['공지사항','community.html#notice'],
        ['교회소식','community.html#news'],
        ['주보','community.html#bulletin'],
        ['갤러리','community.html#gallery'],
        ['칼럼','community.html#column'],
        ['Bible Study','community.html#bible'] ] },
    { key:'missions',  label:'선교',       href:'missions.html' },
    { key:'location',  label:'오시는 길',  href:'location.html' }
  ];

  var markSvg = '<img src="../images/logo.png" alt="대성교회 로고" style="width: 100%; height: 100%; object-fit: contain;" />';
  var chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function navHtml(){
    var items = MENU.map(function(m){
      var active = m.key===page ? ' active' : '';
      var sub = '';
      if(m.sub){
        sub = '<div class="dropdown">'+m.sub.map(function(s){
          return '<a href="'+s[1]+'"><span class="di"></span>'+s[0]+'</a>';
        }).join('')+'</div>';
      }
      return '<div class="navitem'+active+'"><a href="'+m.href+'">'+m.label+(m.sub?chev:'')+'</a>'+sub+'</div>';
    }).join('');
    return ''+
    '<div class="utility"><div class="wrap">'+
      '<div class="u-left"><span>대한예수교장로회 · 대성교회</span><span class="dot"></span><span class="hide">주일예배 오전 11:00</span></div>'+
      '<div class="u-right"><a href="#">로그인</a><a href="#">회원가입</a><a href="location.html">오시는 길</a></div>'+
    '</div></div>'+
    '<header class="site"><div class="wrap nav">'+
      '<a class="brand" href="index.html"><span class="mark">'+markSvg+'</span></a>'+
      '<nav class="menu">'+items+'</nav>'+
      '<a class="cta" href="sermons.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round"/></svg>예배 안내</a>'+
      '<button class="burger" aria-label="메뉴 열기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg></button>'+
    '</div></header>'+
    mobileHtml();
  }

  function mobileHtml(){
    var groups = MENU.map(function(m){
      var sub = m.sub ? '<div class="msub">'+m.sub.map(function(s){return '<a href="'+s[1]+'">'+s[0]+'</a>';}).join('')+'</div>' : '';
      return '<div class="mgroup"><a href="'+m.href+'">'+m.label+'</a>'+sub+'</div>';
    }).join('');
    return '<div class="mobile-menu"><div class="scrim"></div><div class="panel">'+
      '<div class="mclose"><button aria-label="닫기"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button></div>'+
      groups+
      '<div class="mcta"><a class="btn btn-dark" href="sermons.html">예배 안내</a><a class="btn btn-outline" href="location.html">오시는 길</a></div>'+
    '</div></div>';
  }

  function footerHtml(){
    return '<footer class="site"><div class="wrap">'+
      '<div class="fgrid">'+
        '<div class="fbrand"><a class="brand" href="index.html"><span class="mark">'+markSvg+'</span>'+
          '<span class="bt"><span class="kr">대성교회</span><span class="en">Daeseong Church</span></span></a>'+
          '<p>대한예수교장로회 대성교회는 예수 그리스도의 사랑으로 하나 되어, 하나님께 영광을 돌리고 이웃을 섬기는 신앙 공동체입니다.</p></div>'+
        '<div class="fcol"><h5>바로가기</h5><a href="about.html">교회소개</a><a href="sermons.html">예배·설교</a><a href="community.html">커뮤니티</a><a href="missions.html">선교</a></div>'+
        '<div class="fcol"><h5>커뮤니티</h5><a href="community.html#notice">공지사항</a><a href="community.html#news">교회소식</a><a href="community.html#bulletin">주보</a><a href="community.html#gallery">갤러리</a></div>'+
        '<div class="fgiving"><h5>온라인 헌금 안내</h5><div class="acct">867901-00-030346</div><div class="ah">국민은행 · 예금주 대성교회</div></div>'+
      '</div>'+
      '<div class="fbot"><div>© 2026 대한예수교장로회 대성교회. All rights reserved. · 사업자등록 867901-00-030346</div>'+
        '<div class="sns">'+
          '<a href="#" aria-label="youtube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3V9Z" fill="currentColor" stroke="none"/></svg></a>'+
          '<a href="#" aria-label="instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>'+
          '<a href="location.html" aria-label="map"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg></a>'+
        '</div></div>'+
    '</div></footer>';
  }

  // inject (index.html 제외)
  if(page !== 'home'){
    document.body.insertAdjacentHTML('afterbegin', navHtml());
    document.body.insertAdjacentHTML('beforeend', footerHtml());
  }

  // header shadow
  var header = document.querySelector('header.site');
  window.addEventListener('scroll', function(){ header.classList.toggle('scrolled', window.scrollY>10); });

  // mobile menu
  var mm = document.querySelector('.mobile-menu');
  document.querySelector('.burger').addEventListener('click', function(){ mm.classList.add('open'); });
  mm.querySelector('.scrim').addEventListener('click', function(){ mm.classList.remove('open'); });
  mm.querySelector('.mclose button').addEventListener('click', function(){ mm.classList.remove('open'); });

  // reveal
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.12 });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
})();
