﻿Jxstar.currentPage = function() {
	var config = {param:{},initpage:function(page, define){},eventcfg:{}};
	
		var items = [{
		width:'97%',
		border:false,
		layout:'form',
		autoHeight:true,
		xtype:'container',
		style:'padding:5 10 5 10;',
		items:[{
			anchor:'100%',
			border:false,
			xtype:'container',
			layout:'column',
			autoHeight:true,
			items:[{
				border:false,
				xtype:'container',
				columnWidth:0.99,
				layout:'form',
				style: 'padding-left:10px;',
				items:[
					{xtype:'trigger', fieldLabel:'功能名称', name:'wfnav_node__fun_name',
						anchor:'100%', triggerClass:'x-form-search-trigger',
						maxLength:50, allowBlank:false, labelStyle:'color:#0000FF;', labelSeparator:'*', editable:false,
						onTriggerClick: function() {
							var selcfg = {pageType:'combogrid', nodeId:'sel_fun', layoutPage:'/public/layout/layout_tree.js', sourceField:'', targetField:'', whereSql:"", whereValue:'', whereType:'', isSame:'1', isShowData:'1', isMoreSelect:'0',isReadonly:'1',queryField:'',likeType:'',fieldName:'wfnav_node.fun_name'};
							JxSelect.createSelectWin(selcfg, this, 'node_wfnav_node_form');
						}},
					{xtype:'textarea', fieldLabel:'节点描述', name:'wfnav_node__node_desc', width:'100%', height:120, maxLength:200},
					{xtype:'textarea', fieldLabel:'扩展wheresql', name:'wfnav_node__where_sql', width:'100%', height:48, maxLength:200},
					{xtype:'textfield', fieldLabel:'扩展wherevalue', name:'wfnav_node__where_value', anchor:'100%', maxLength:200},
					{xtype:'textfield', fieldLabel:'扩展wheretype', name:'wfnav_node__where_type', anchor:'100%', maxLength:100},
					{xtype:'hidden', fieldLabel:'流程ID', name:'wfnav_node__graph_id', anchor:'100%'},
					{xtype:'hidden', fieldLabel:'节点ID', name:'wfnav_node__node_id', anchor:'100%'},
					{xtype:'hidden', fieldLabel:'功能ID', name:'wfnav_node__fun_id', anchor:'100%'},
					{xtype:'hidden', fieldLabel:'主键', name:'wfnav_node__node_detid', anchor:'100%'}
				]
			}
			]
		}]
	}];
	
	config.param = {
		items: items,
		funid: 'wfnav_node'
	};

	
	
	
	return new Jxstar.FormNode(config);
}