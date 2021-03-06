﻿Jxstar.currentPage = function() {
	var config = {param:{},initpage:function(page, define){},eventcfg:{}};

	var tablestateData = Jxstar.findComboData('tablestate');
	var fdatatypeData = Jxstar.findComboData('fdatatype');
	var yesnoData = Jxstar.findComboData('yesno');
	var fieldtypeData = Jxstar.findComboData('fieldtype');

	var cols = [
	{col:{header:'状态', width:53, sortable:true, defaultval:'1', align:'center',
		editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields:['value','text'],
				data: tablestateData
			}),
			emptyText: jx.star.select,
			mode: 'local',
			triggerAction: 'all',
			valueField: 'value',
			displayField: 'text',
			editable:false,
			value: tablestateData[0][0]
		}),
		renderer:function(value){
			for (var i = 0; i < tablestateData.length; i++) {
				if (tablestateData[i][0] == value)
					return tablestateData[i][1];
			}
		}}, field:{name:'dm_fieldcfg__state',type:'string'}},
	{col:{header:'*序号', width:64, sortable:true, defaultval:'10', align:'right',
		editable:true, hcss:'color:#0000ff;',
		editor:new Ext.form.NumberField({
			maxLength:12, allowBlank:false
		}),renderer:JxUtil.formatInt()}, field:{name:'dm_fieldcfg__field_index',type:'int'}},
	{col:{header:'*字段名称', width:112, sortable:true, editable:true, hcss:'color:#0000ff;',
		editor:new Ext.form.TextField({
			maxLength:50, allowBlank:false
		})}, field:{name:'dm_fieldcfg__field_name',type:'string'}},
	{col:{header:'*字段标题', width:126, sortable:true, editable:true, hcss:'color:#0000ff;',
		editor:new Ext.form.TextField({
			maxLength:50, allowBlank:false
		})}, field:{name:'dm_fieldcfg__field_title',type:'string'}},
	{col:{header:'*数据类型', width:79, sortable:true, defaultval:'varchar', align:'center',
		editable:true, hcss:'color:#0000ff;',
		editor:new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields:['value','text'],
				data: fdatatypeData
			}),
			emptyText: jx.star.select,
			mode: 'local',
			triggerAction: 'all',
			valueField: 'value',
			displayField: 'text',
			editable:false, allowBlank:false,
			value: fdatatypeData[0][0]
		}),
		renderer:function(value){
			for (var i = 0; i < fdatatypeData.length; i++) {
				if (fdatatypeData[i][0] == value)
					return fdatatypeData[i][1];
			}
		}}, field:{name:'dm_fieldcfg__data_type',type:'string'}},
	{col:{header:'长度', width:62, sortable:true, defaultval:'50', align:'right',
		editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.NumberField({
			maxLength:12
		}),renderer:JxUtil.formatInt()}, field:{name:'dm_fieldcfg__data_size',type:'int'}},
	{col:{header:'小数位', width:63, sortable:true, align:'right',
		editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.NumberField({
			maxLength:12
		}),renderer:JxUtil.formatInt()}, field:{name:'dm_fieldcfg__data_scale',type:'int'}},
	{col:{header:'必填?', width:53, sortable:true, defaultval:'0', align:'center',
		editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields:['value','text'],
				data: yesnoData
			}),
			emptyText: jx.star.select,
			mode: 'local',
			triggerAction: 'all',
			valueField: 'value',
			displayField: 'text',
			editable:false,
			value: yesnoData[0][0]
		}),
		renderer:function(value){
			for (var i = 0; i < yesnoData.length; i++) {
				if (yesnoData[i][0] == value)
					return yesnoData[i][1];
			}
		}}, field:{name:'dm_fieldcfg__nullable',type:'string'}},
	{col:{header:'缺省值', width:82, sortable:true, editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.TextField({
			maxLength:20
		})}, field:{name:'dm_fieldcfg__default_value',type:'string'}},
	{col:{header:'等同字段', width:114, sortable:true, hidden:true}, field:{name:'dm_fieldcfg__like_field',type:'string'}},
	{col:{header:'分类', width:58, sortable:true, defaultval:'0', align:'center',
		editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields:['value','text'],
				data: fieldtypeData
			}),
			emptyText: jx.star.select,
			mode: 'local',
			triggerAction: 'all',
			valueField: 'value',
			displayField: 'text',
			editable:false,
			value: fieldtypeData[0][0]
		}),
		renderer:function(value){
			for (var i = 0; i < fieldtypeData.length; i++) {
				if (fieldtypeData[i][0] == value)
					return fieldtypeData[i][1];
			}
		}}, field:{name:'dm_fieldcfg__field_type',type:'string'}},
	{col:{header:'字段说明', width:251, sortable:true, editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.TextField({
			maxLength:1000
		})}, field:{name:'dm_fieldcfg__field_memo',type:'string'}},
	{col:{header:'字段ID', width:100, sortable:true, hidden:true}, field:{name:'dm_fieldcfg__field_id',type:'string'}},
	{col:{header:'表ID', width:100, sortable:true, hidden:true}, field:{name:'dm_fieldcfg__table_id',type:'string'}}
	];
	
	config.param = {
		cols: cols,
		sorts: null,
		hasQuery: '1',
		isedit: '1',
		isshow: '0',
		funid: 'dm_fieldcfg_rep'
	};
	
	config.initpage = function(gridNode){
		var grid = gridNode.page;
		//表格编辑后事件
		grid.on('afteredit', function(event) {
			if (event.field == 'dm_fieldcfg__data_type') {
				var r = event.record;
				var datatype = r.get('dm_fieldcfg__data_type');
				if (datatype == 'char') {
					r.set('dm_fieldcfg__data_size', '1');
					r.set('dm_fieldcfg__data_scale', '');
				} else if (datatype == 'int') {
					r.set('dm_fieldcfg__data_size', '22');
					r.set('dm_fieldcfg__data_scale', '0');
					r.set('dm_fieldcfg__default_value', '0');
				} else if (datatype == 'number') {
					r.set('dm_fieldcfg__data_size', '22');
					r.set('dm_fieldcfg__data_scale', '6');
					r.set('dm_fieldcfg__default_value', '0');
				} else if (datatype == 'date') {
					r.set('dm_fieldcfg__data_size', '7');
					r.set('dm_fieldcfg__data_scale', '');
				} else {
					r.set('dm_fieldcfg__data_size', '0');
					r.set('dm_fieldcfg__data_scale', '');
				}
			}
		});
	};
		
	return new Jxstar.GridNode(config);
}