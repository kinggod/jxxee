﻿Jxstar.currentPage = function() {
	var config = {param:{},initpage:function(page, define){},eventcfg:{}};

	var wfstateData = Jxstar.findComboData('wfstate');

	var cols = [
	{col:{header:'过程名称', width:167, sortable:true}, field:{name:'wf_instance__process_name',type:'string'}},
	{col:{header:'开始时间', width:134, sortable:true, renderer:function(value) {
			return value ? value.format('Y-m-d H:i:s') : '';
		}}, field:{name:'wf_instance__start_date',type:'date'}},
	{col:{header:'发起人', width:65, sortable:true}, field:{name:'wf_instance__start_user',type:'string'}},
	{col:{header:'功能ID', width:100, sortable:true}, field:{name:'wf_instance__fun_id',type:'string'}},
	{col:{header:'数据ID', width:100, sortable:true}, field:{name:'wf_instance__data_id',type:'string'}},
	{col:{header:'实例状态', width:66, sortable:true, align:'center',
		editable:false,
		editor:new Ext.form.ComboBox({
			store: new Ext.data.SimpleStore({
				fields:['value','text'],
				data: wfstateData
			}),
			emptyText: jx.star.select,
			mode: 'local',
			triggerAction: 'all',
			valueField: 'value',
			displayField: 'text',
			editable:false,
			value: wfstateData[0][0]
		}),
		renderer:function(value){
			for (var i = 0; i < wfstateData.length; i++) {
				if (wfstateData[i][0] == value)
					return wfstateData[i][1];
			}
		}}, field:{name:'wf_instance__run_state',type:'string'}},
	{col:{header:'实例消息', width:198, sortable:true}, field:{name:'wf_instance__instance_desc',type:'string'}},
	{col:{header:'实例ID', width:100, sortable:true}, field:{name:'wf_instance__instance_id',type:'string'}},
	{col:{header:'父实例ID', width:100, sortable:true}, field:{name:'wf_instance__parent_sid',type:'string'}},
	{col:{header:'父过程ID', width:100, sortable:true}, field:{name:'wf_instance__parent_pid',type:'string'}},
	{col:{header:'开始节点', width:100, sortable:true, hidden:true}, field:{name:'wf_instance__start_nodeid',type:'string'}},
	{col:{header:'父节点ID', width:100, sortable:true, hidden:true}, field:{name:'wf_instance__parent_nid',type:'string'}},
	{col:{header:'过程ID', width:100, sortable:true, hidden:true}, field:{name:'wf_instance__process_id',type:'string'}},
	{col:{header:'结束时间', width:100, sortable:true, hidden:true, renderer:function(value) {
			return value ? value.format('Y-m-d') : '';
		}}, field:{name:'wf_instance__end_date',type:'date'}},
	{col:{header:'发起人ID', width:100, sortable:true, hidden:true}, field:{name:'wf_instance__start_userid',type:'string'}},
	{col:{header:'模块ID', width:100, sortable:true, hidden:true}, field:{name:'wf_process__module_id',type:'string'}}
	];
	
	config.param = {
		cols: cols,
		sorts: null,
		hasQuery: '1',
		isedit: '0',
		isshow: '1',
		funid: 'wf_instance'
	};
	
	config.eventcfg = {
		baseWf: function(fileName) {
			var self = this;
			var records = self.grid.getSelectionModel().getSelections();
			if (!JxUtil.selectone(records)) return;
			
			var funId =  records[0].get('wf_instance__fun_id');
			var dataId = records[0].get('wf_instance__data_id');
			
			var appData = {funId:funId, dataId:dataId};
			JxUtil.showCheckWindow(appData, fileName);
		}
	};
	

	config.initpage = function(gridNode){
		var event = gridNode.event;
		event.on('beforecustom', function(ge) {
			var records = ge.grid.getSelectionModel().getSelections();
			
			for (var i = 0; i < records.length; i++) {
				var state = records[i].get('wf_instance__run_state');
				if (state.length > 0 && state != '4') {
					JxHint.alert('您选择的过程实例不是挂起状态，不能操作！');	
					return false;
				}
			}
		});
	};
		
	return new Jxstar.GridNode(config);
}