// SNS Login Modal - 공통 로직 + 동적 주입
(function() {
  // SNS 로그인 모달 HTML 동적 생성
  function createSNSLoginModal() {
    return `
<!-- SNS Login Modal -->
<div id="sns-login-modal" class="sns-modal">
	<div class="sns-modal-content">
		<button class="sns-modal-close">&times;</button>
		<h2>SNS로 로그인</h2>
		<div class="sns-buttons">
			<a href="javascript:void(0);" class="sns-btn kakao-btn">
				<span>카카오톡으로 로그인</span>
			</a>
			<a href="javascript:void(0);" class="sns-btn naver-btn">
				<span>네이버로 로그인</span>
			</a>
			<a href="javascript:void(0);" class="sns-btn google-btn">
				<span>Google로 로그인</span>
			</a>
		</div>
		<div class="admin-login-divider">또는</div>
		<a href="/admin/login" class="admin-login-link">관리자 로그인</a>
	</div>
</div>`;
  }

  // 기존 모달이 없으면 동적으로 주입
  function injectSNSLoginModal() {
    if (document.getElementById('sns-login-modal')) {
      return; // 이미 존재하면 중복 생성 방지
    }

    const modalHtml = createSNSLoginModal();
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  // SNS 로그인 모달 초기화
  function initSNSLoginModal() {
    injectSNSLoginModal();

    const snsModal = document.getElementById('sns-login-modal');
    if (!snsModal) return;

    const loginBtn = document.querySelector('.login-btn');
    const closeBtn = document.querySelector('.sns-modal-close');

    // SNS 버튼 클릭 방지
    document.querySelectorAll('.sns-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
      });
    });

    // 로그인 버튼 클릭
    if (loginBtn) {
      loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        snsModal.classList.add('active');
      });
    }

    // 닫기 버튼
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        snsModal.classList.remove('active');
      });
    }

    // 배경 클릭으로 닫기
    snsModal.addEventListener('click', function(e) {
      if (e.target === snsModal) {
        snsModal.classList.remove('active');
      }
    });

    // Esc 키로 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && snsModal.classList.contains('active')) {
        snsModal.classList.remove('active');
      }
    });
  }

  // DOM 로드 후 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSNSLoginModal);
  } else {
    initSNSLoginModal();
  }
})();
