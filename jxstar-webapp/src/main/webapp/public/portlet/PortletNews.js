﻿/*!
 * Copyright 2011 Guangzhou Donghong Software Technology Inc.
 * Licensed under the www.jxstar.org
 */
 
/**
 * 新闻公告栏portlet控件。
 * 
 * @author TonyTan
 * @version 1.0, 2010-01-01
 */

PortletNews = {};
(function(){

	Ext.apply(PortletNews, {
	/**
	 * public
	 * 父对象
	 **/
	ownerCt:null,
	
	/**
	 * public
	 * 刷新窗口内容
	 **/
	refresh: function() {
		if (this.ownerCt) {
			this.showPortlet(this.ownerCt);
		}
	},
	
	/**
	 * public
	 * 显示新闻公告列表
	 **/
	showPortlet: function(target) {
		if (!Jxstar.jxsender) {
			var url = '/jxstar/system/pub/JxSender.js';
			JxUtil.loadJS(url, true);
		}
		
		var self = this;
		if (target == null) {
			JxHint.alert(jx.plet.noparent);	//'显示PORTLET的容器对象为空！'
			return;
		}
		self.ownerCt = target;
		//先清除内容
		target.removeAll(target.getComponent(0), true);
		
		var hdcall = function(msgJson) {
			var msgHtml = '';
			if (msgJson.length == 0) {
				msgHtml = '<div class="nav_msg_notip">没有新闻公告！</div>';
			} else {
				msgHtml = self.createPortlet(msgJson);
			}
			var panelHtml = self.createHtml(msgHtml, msgJson.length);
			
			target.add({html:panelHtml,autoScroll:true});
			target.doLayout();
		};
		var params = 'funid=sys_news&eventcode=qrycont&pagetype=grid&premonth=1';
		Request.dataRequest(params, hdcall);
	},
	
	/**
	 * private
	 * 构建消息内容的HTML
	 **/
	createHtml: function(msgHtml) {
		var chgcolor = 'onmouseover="this.style.color=\'#FF4400\';" onmouseout="this.style.color=\'#444\';"';
		var btnHtml = 
		'<a href="#" '+ chgcolor +' style="padding-right:8px;color:#444" onclick="JxSender.queryBoard();">'+ jx.plet.all +'</a>';	//所有...
		
		var toolHtml = 
		'<table width="100%" border="0" align="center" cellpadding="1" cellspacing="1" style="bottom:4px;" class="nav_msg_table">' +
            '<tr><td style="text-align:right;">'+ btnHtml +'</td></tr>' +
        '</table>';
		
		var panelHtml = 
		'<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">' +
			'<tr height="90%" style="vertical-align:top;"><td>'+ msgHtml +'</td></tr>' +
			'<tr height="10%" style="vertical-align:bottom;background-color:#deecfd;"><td>'+ toolHtml +'</td></tr>' + 
		'</table>';
		
		return panelHtml;
	},
	
	/**
	 * private
	 * 创建公告列表
	 * msgJson参数是数组对象: news_id -- 消息ID, news_title -- 消息标题
	 **/
	createPortlet: function(msgJson) {
		var tableTpl = new Ext.Template(
			'<table width="100%" border="0" align="center" cellpadding="1" cellspacing="1" class="nav_msg_table">',
				'{rows}',
			'</table>'
		);
		
		var rowTpl = new Ext.Template(
			'<tr height="20" style="background-color:{bgcolor};"><td>',
				'<li><a href="#" {chgcolor} onclick="JxSender.readBoard(\'{msgid}\');">{msgtitle}</a>',
			'</td><tr>'
		);
	
		var rows = [];
		for (var i = 0; i < msgJson.length; i++) {
			var msgVal = {};
			msgVal.msgid = msgJson[i].news_id;
			var msgtitle = msgJson[i].news_title;
			msgVal.msgtitle = Ext.util.Format.ellipsis(msgtitle, 40);
			msgVal.bgcolor = (i%2 == 1) ? '#ddffdd' : '';
			msgVal.chgcolor = 'onmouseover="this.style.color=\'#FF4400\';" onmouseout="this.style.color=\'#0080FF\';"';
			if (msgJson[i].is_top == '1') {
				msgVal.chgcolor += ' style="font-weight:bold;"';
			}
			
			rows[i] = rowTpl.apply(msgVal);
		}
		
		return tableTpl.apply({rows:rows.join('')});
	}
	
	});//Ext.apply

})();
