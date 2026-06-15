
// 새창 또는 레이어창 열기
openPage = function(){
	this.layerSkin = 'default';		// 레이어 스킨
	this.layerPos = 'RB';			// 레이어 위치(RB:우측아래, RT:우측상단, LB:좌측아래, LT:좌측상단)
	this.layerObj = null;			// 레이어 객체
	this.frameObj = null;			// 프레임 객체
	this.openType = 'layer';		// 새창열기 기본(layer ? popup)
	this.shadowDsp = true;			// 그림자처리 여부
	this.shadow = null;				// 그림자 레이어
	this.shadowInt = null;			// 그림자 레이어 크기조절 이벤트
	this.shadowAlpha = 30;			// 그림자 그림자 투명도(%)
	this.shadowColor = '#000000';	// 그림자 색상

	// 브라우져 호환성 체크 (IE9 이상은 IE이외 브라우져로 체크함)
	this.isIE = false;
	if((navigator.appName.indexOf('Microsoft')+1)){
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(navigator.userAgent) != null){ 
			rv = parseFloat(RegExp.$1);
			if(rv < 9) this.isIE = true;
		}
	}else{
		this.isIE = false;
	}	// end IE check if

	
	// 페이지 생성
	openPage.prototype.createPage = function(e, pWidth, pHeight, pUrl, pScroll, pX, pY){
		if(this.openType == "popup"){
			screenWidth = window.screen.width; // 윈도우 넓이
			screenHeight = window.screen.height; // 윈도우 높이
			if(!pScroll) pScroll = "auto";	// 스크롤링

			openLeft = (screenWidth - pWidth) / 2;
			openTop = (screenHeight - pHeight) / 3;
			openLeft = parseInt(openLeft);
			openTop = parseInt(openTop);

			window.open(pUrl, '', 'left='+openLeft+',top='+openTop+',height='+pHeight+',width='+pWidth+',toolbar=no,directories=no,status=no,linemenubar=no,scrollbars='+pScroll+',resizable=no,modal=yes,dependent=yes');
			
		}else{
			if(document.getElementById("layerFrame")) return false;	// 중복생성 방지
			this.layerObj = document.createElement("DIV");
			this.layerObj.setAttribute('id', 'layerFrame');
			this.layerObj.style.position = 'absolute';		
			this.layerObj.style.zIndex = '9999';
			this.layerObj.style.width = pWidth+"px";
			this.layerObj.style.height = pHeight+"px";


			// 레이어 위치를 정하지 않았을경우
			if(!pX || !pY){
				pX = (!window.event) ? e.pageX : document.documentElement.scrollLeft + document.body.scrollLeft + window.event.clientX;
				pY = (!window.event) ? e.pageY : document.documentElement.scrollTop + document.body.scrollTop + window.event.clientY;

				if(this.layerPos == 'RT'){
					pY = pY - pHeight;
				}else if(this.layerPos == 'LB'){
					pX = pX - pWidth;
				}else if(this.layerPos == 'LT'){
					pY = pY - pHeight;
					pX = pX - pWidth;
				}else{
				}

				pX += "px";
				pY += "px";

				this.layerObj.style.left = pX;
				this.layerObj.style.top = pY;
			}else{
				// 중앙 정렬일경우
				if(pX == -1){
					tmpWidth = ( document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth  );
					pX = (tmpWidth - pWidth) / 2;
					if(pX < 0) pX = 0;
					pX += "px";
				}

				if(pY == -1){
					tmpHeight = ( document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight  );
					pY = (tmpHeight - pHeight) / 2;
					if(pY < 0) pY = 0;
					pY += "px";
				}

				this.layerObj.style.left = pX;
				this.layerObj.style.top = pY;
			}

			if(this.shadowDsp) this.shadowCreate();	// 그림자 생성
			document.body.appendChild(this.layerObj);
			this.createSkin(pWidth, pHeight, pUrl, pScroll);
		}		
	}	// end createPage function


	// 페이지 삭제
	openPage.prototype.removePage = function(){
		if(this.shadow != null) this.shadowRemove();
		document.body.removeChild(this.layerObj);
		this.layerObj = null;
		this.frameObj = null;
	}	// end removePage function


	// 레이어 스킨 생성
	openPage.prototype.createSkin = function(pWidth, pHeight, pUrl, pScroll) {		
		if(!pScroll) pScroll = "auto";	// 스크롤링
		switch(this.layerSkin){
			case 'default':
				tmpWidth = parseInt(pWidth) + 12;
				//htmlData = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\""+tmpWidth+"\" valign=\"top\"><table width=\""+tmpWidth+"\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/top_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_right.gif\"></td></tr><tr><td background=\"/core/images/layer_default/left_cen.gif\">&nbsp;</td><td valign=\"top\" bgcolor=\"#FFFFFF\"><iframe src=\""+pUrl+"\" width=\""+pWidth+"\" height=\""+pHeight+"\" frameborder=\"0\" marginwidth=\"10\" marginheight=\"10\" id=\"innerSetFrame\" scrolling=\""+pScroll+"\"></iframe></td><td background=\"/core/images/layer_default/right_cen.gif\">&nbsp;</td></tr><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/bot_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_right.gif\"></td></tr></table></td><td width=\"14\" valign=\"top\"><img src=\"/core/images/layer_default/btn_close.gif\" width=\"14\" height=\"46\" border=\"0\" style=\"cursor:pointer;\" onClick=\"openPage.removePage();\" /></td></tr></table>";
				htmlData = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\""+tmpWidth+"\" valign=\"top\"><table width=\""+tmpWidth+"\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/top_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_right.gif\"></td></tr><tr><td background=\"/core/images/layer_default/left_cen.gif\">&nbsp;</td><td valign=\"top\" bgcolor=\"#FFFFFF\"><iframe src=\""+pUrl+"\" width=\""+pWidth+"\" height=\""+pHeight+"\" frameborder=\"0\" marginwidth=\"10\" marginheight=\"10\" id=\"innerSetFrame\" scrolling=\""+pScroll+"\"></iframe></td><td background=\"/core/images/layer_default/right_cen.gif\">&nbsp;</td></tr><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/bot_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_right.gif\"></td></tr></table></td></tr></table>";
				break;

			default:
				tmpWidth = parseInt(pWidth) + 12;
				//htmlData = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\""+tmpWidth+"\" valign=\"top\"><table width=\""+tmpWidth+"\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/top_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_right.gif\"></td></tr><tr><td background=\"/core/images/layer_default/left_cen.gif\">&nbsp;</td><td valign=\"top\" bgcolor=\"#FFFFFF\"><iframe src=\""+pUrl+"\" width=\""+pWidth+"\" height=\""+pHeight+"\" frameborder=\"0\" marginwidth=\"10\" marginheight=\"10\" id=\"innerSetFrame\" scrolling=\""+pScroll+"\"></iframe></td><td background=\"/core/images/layer_default/right_cen.gif\">&nbsp;</td></tr><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/bot_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_right.gif\"></td></tr></table></td><td width=\"14\" valign=\"top\"><img src=\"/core/images/layer_default/btn_close.gif\" width=\"14\" height=\"46\" border=\"0\" style=\"cursor:pointer;\" onClick=\"openPage.removePage();\" /></td></tr></table>";
				htmlData = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\""+tmpWidth+"\" valign=\"top\"><table width=\""+tmpWidth+"\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/top_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/top_right.gif\"></td></tr><tr><td background=\"/core/images/layer_default/left_cen.gif\">&nbsp;</td><td valign=\"top\" bgcolor=\"#FFFFFF\"><iframe src=\""+pUrl+"\" width=\""+pWidth+"\" height=\""+pHeight+"\" frameborder=\"0\" marginwidth=\"10\" marginheight=\"10\" id=\"innerSetFrame\" scrolling=\""+pScroll+"\"></iframe></td><td background=\"/core/images/layer_default/right_cen.gif\">&nbsp;</td></tr><tr><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_left.gif\"></td><td height=\"6\" background=\"/core/images/layer_default/bot_cen.gif\"></td><td width=\"6\" height=\"6\"  background=\"/core/images/layer_default/bot_right.gif\"></td></tr></table></td></tr></table>";
				break;
		}
		this.layerObj.innerHTML = htmlData;
	}	//	end createShadow function
	

	// 레이어 그림자 생성
	openPage.prototype.shadowCreate = function() {

		docBody = document.body;
		this.shadow = document.createElement("DIV");		
		this.shadow.style.zIndex = "900";
		this.shadow.style.position = "absolute";
		this.shadow.style.top = "0px";
		this.shadow.style.left = "0px";
		this.shadow.style.width = ((document.documentElement.scrollWidth > document.body.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth) + 'px';
		this.shadow.style.height = ((document.documentElement.scrollHeight > document.body.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight) + 'px';
		this.shadow.style.background = this.shadowColor;
		this.shadow.style.backgroundAttachment = "fixed";
		this.shadow.setAttribute('id', 'pageShadow');
		// IE
		if(this.isIE){
			this.shadow.style.filter = "Alpha(Opacity:"+this.shadowAlpha+");";
		// 모질라,오페라
		}else{
			this.shadow.style.opacity = this.shadowAlpha/100;
		}
		docBody.appendChild(this.shadow); 
		this.shadow.style.display = "block";		
		this.shadowInt = setInterval("openPage.shadowResize();", 200);
	}	//	end createShadow function


	// 레이어 그림자 크기 조절
	openPage.prototype.shadowResize = function(){
		if(this.shadow != null){
			this.shadow.style.width = ((document.documentElement.scrollWidth > document.body.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth) + 'px';
			this.shadow.style.height = ((document.documentElement.scrollHeight > document.body.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight) + 'px';
		}
	}	// end shadowResize function


	// 레이어 그림자 삭제
	openPage.prototype.shadowRemove = function(){
		if(this.shadow != null){
			this.shadowInt = null;
			document.body.removeChild(this.shadow);
			this.shadow = null;
		}
	}	// end createShadow function

}
openPage = new openPage();