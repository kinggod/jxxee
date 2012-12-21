﻿<%@ page contentType="text/html; charset=UTF-8"%>
</body>
<script type="text/javascript">
Ext.onReady(function() {
	Jxstar.path = '<%=contextpath%>';
	Jxstar.systemVar.indexType = '<%=indexType%>';
	Jxstar.systemVar.verType = '<%=verType%>';
	Jxstar.systemVar.useCase = '<%=useCase%>';
	//支持集中附件管理模式
	Jxstar.systemVar.uploadUrl = '<%=uploadUrl%>';
	Jxstar.systemVar.uploadType = '<%=uploadType%>';
	//把所有用于页面的系统变量附加到对象中
	Ext.apply(Jxstar.systemVar, Ext.decode("<%=allVarJs%>"));
	//设置EXT的常量
	Ext.BLANK_IMAGE_URL = Jxstar.path + '/public/lib/ext/resources/images/default/s.gif';
	Ext.chart.Chart.CHART_URL = Jxstar.path + '/public/lib/ext/resources/charts.swf';
	//显示系统支持的语言版本
	JxLang.showLang('<%=curLangType%>', '<%=supLangType%>');
	
	//动态加载功能数据文件，提供加载效率；
	//在f_login方法中检验是否加载完成，如果没有加载完成则继续等待
	var isloaded = false;
	var hdcall = function(){isloaded = true};
	Request.loadJS('/public/data/NodeDefine.js?verno=<%=datasvn%>', hdcall);
	Request.loadJS('/public/data/RuleData.js?verno=<%=datasvn%>');
	Request.loadJS('/public/locale/combo-lang-<%=curLangType%>.js?verno=<%=datasvn%>');
	Request.loadJS('/custom.js?verno=<%=datasvn%>');

	var usercodeEl = Ext.get('user_code');
	var userpassEl = Ext.get('user_pass');
	
	//取上次登录用户
	var CURRCODE = Ext.util.Cookies.get('cur_user_code');
	if (CURRCODE != null && CURRCODE.length > 0) {
		usercodeEl.dom.value = CURRCODE;
		userpassEl.focus();
	} else {
		usercodeEl.focus();
	}
	
	//回车登录
	var enter = function(e){
		if (e.getKey() == e.ENTER) {f_login();}
	};
	userpassEl.on('keypress', enter);
	usercodeEl.on('keypress', enter);
	
	//登陆成功
	var f_success = function(data) {
		userpassEl.remove();
		usercodeEl.remove();
		Ext.fly('login_body').remove();
		Ext.fly('body_div').remove();
		
		Jxstar.session = data;
		Jxstar.session.maxInterval = <%=session.getMaxInactiveInterval()%>;
		Jxstar.session.sessionId = '<%=session.getId()%>';
		Request.loadJS('/public/core/JxBody.js');
	};
	
	//登陆方法
	var f_login = function() {
		var hdcall = function(data) {
			var usercode = usercodeEl.dom.value;
			if (usercode == "") {
				alert(jx.index.nocode);
				return false;
			}
			//保存一个月，只保留上次的登录用户名
			Ext.util.Cookies.set('cur_user_code', usercode, (new Date()).add(Date.MONTH, 1));
			var userpass = userpassEl.dom.value;
			userpassEl.dom.value = "";

			//设置请求的参数
			var params = 'funid=login&eventcode=login&pagetype=login';
			params += '&user_code='+usercode+'&user_pass='+userpass;

			//发送请求
			Ext.lib.Ajax.request(
				'POST', Jxstar.path + '/commonAction.do',
				{
					success: function(response) {
						var result = Ext.decode(response.responseText);
						if (result.success) {
							f_success(result.data);
						} else {
							JxHint.alert(result.message);
						}
					},
					failure: function(response) {
						JxUtil.errorResponse(response);
					}
				},
				params
			);
		};
		//用于检测功能数据文件是否加载成功
		if (isloaded) {
			hdcall();
		} else {
			JxHint.alert('建议开启【index.useminjs,index.datasvn】功能！网速很慢，请等待...');
			JxUtil.delay(1000, f_login);
		}
	};
	
	//登陆按钮
	Ext.fly('loginbtn').on('click', f_login);
	if (Jxstar.systemVar.indexType == '1') {
		Ext.fly('returnbtn').on('click', function(){
			usercodeEl.dom.value = "";
			userpassEl.dom.value = "";
			usercodeEl.focus();
		});
	}
	
	//添加frmhidden的响应事件，用于处理文件下载的错误消息
	Ext.fly('frmhidden').on('load', function(event, dom){
		var doc = null;
		try {doc = dom.contentWindow.document;} catch(e) {}
		
		if (doc) {
			var text = doc.body.innerHTML;
			if (text == null || text.length == 0) {
				text = jx.index.downerror;
			}
			JxHint.alert(text);
		} else {
			JxHint.alert('执行完成！');
		}
	});
});
</script>
<script type="text/javascript">
var down_firfox = function() {
	var params = 'funid=sys_attach&keyid=jxstar0001&pagetype=editgrid&eventcode=down&nousercheck=1';
	Request.fileDown(params);
};
var doKey = function(e){//用ExtJs的事件注册时无效
	var ev = e || window.event;
	var obj = ev.target || ev.srcElement;
	var t = obj.type || obj.getAttribute('type');//获取事件源类型
	if(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea"){
		return false;
	}
};
//禁止后退键 作用于Firefox、Opera
document.onkeypress=doKey;
//禁止后退键  作用于IE、Chrome
document.onkeydown=doKey;
</script>
</html>
