﻿Jxstar.currentPage = function() {
	var config = {param:{},initpage:function(page, define){},eventcfg:{}};
	
	var Dataaudit = Jxstar.findComboData('audit');
	var items = [{
		width:'97%',
		border:false,
		layout:'form',
		autoHeight:true,
		style:'padding:5 10 5 10;',
		items:[{
			anchor:'100%',
			border:false,
			layout:'column',
			autoHeight:true,
			items:[{
				border:false,
				columnWidth:0.495,
				layout:'form',
				style: 'padding-left:10px;',
				items:[
					{xtype:'combo', fieldLabel:'记录状态', name:'mat_test__auditing',
						anchor:'100%', readOnly:true, editable:false,
						store: new Ext.data.SimpleStore({
							fields:['value','text'],
							data: Dataaudit
						}),
						emptyText: jx.star.select,
						mode: 'local',
						triggerAction: 'all',
						valueField: 'value',
						displayField: 'text',
						value: Dataaudit[0][0]},
					{xtype:'datefield', fieldLabel:'计划日期', name:'mat_test__plan_date', defaultval:'fun_getToday()', format:'Y-m-d', allowBlank:false, labelStyle:'color:#0000FF;', labelSeparator:'*', anchor:'100%'},
					{xtype:'textfield', fieldLabel:'测试负责人', name:'mat_test__test_user', anchor:'100%', maxLength:20},
					{xtype:'numberfield', decimalPrecision:2, fieldLabel:'测试费用', name:'mat_test__test_money', anchor:'100%', maxLength:12}
				]
			},{
				border:false,
				columnWidth:0.495,
				layout:'form',
				style: 'padding-left:10px;',
				items:[
					{xtype:'textfield', fieldLabel:'测试单号', name:'mat_test__test_code', readOnly:true, anchor:'100%', maxLength:20},
					{xtype:'textfield', fieldLabel:'测试项目', name:'mat_test__project_name', allowBlank:false, labelStyle:'color:#0000FF;', labelSeparator:'*', anchor:'100%', maxLength:100},
					{xtype:'numberfield', allowDecimals:false, fieldLabel:'计划天数', name:'mat_test__plan_days', defaultval:'1', anchor:'100%', maxLength:12},
					{xtype:'textfield', fieldLabel:'测试类型', name:'mat_test__test_type', anchor:'100%', maxLength:10},
					{xtype:'hidden', fieldLabel:'主键', name:'mat_test__test_id', anchor:'100%'}
				]
			}
			]
		},{
			anchor:'100%',
			border:false,
			layout:'column',
			autoHeight:true,
			items:[{
				border:false,
				columnWidth:0.99,
				layout:'form',
				style: 'padding-left:10px;',
				items:[
					{xtype:'textarea', fieldLabel:'测试工作安排', name:'mat_test__test_plan', width:'100%', height:96, maxLength:200}
				]
			}
			]
		}]
	}];
	
	config.param = {
		items: items,
		funid: 'mat_test'
	};

	
	
	
	return new Jxstar.FormNode(config);
}