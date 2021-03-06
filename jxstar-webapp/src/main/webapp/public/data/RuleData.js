﻿RuleData = {
'dm_fieldcfg':[
	{srcNodeId:'sel_fieldcfg',destNodeId:'dm_fieldcfg',layout:'',whereSql:'dm_fieldcfg.field_type = \'0\'',whereType:'',whereValue:''}
],
'event_domain_det':[
	{srcNodeId:'sys_event',destNodeId:'event_domain_det',layout:'',whereSql:'fun_id = \'sysevent\' and event_index < 10000',whereType:'',whereValue:''}
],
'fun_attrdes':[
	{srcNodeId:'fun_attr',destNodeId:'fun_attrdes',layout:'',whereSql:'',whereType:'',whereValue:''}
],
'fun_event':[
	{srcNodeId:'sys_event',destNodeId:'fun_event',layout:'',whereSql:'fun_id = \'sysevent\' and event_index < 10000',whereType:'',whereValue:''}
],
'fun_tree':[
	{srcNodeId:'fun_tree',destNodeId:'fun_tree',layout:'',whereSql:'tree_id not in (select tree_id from fun_tree where fun_id = {FKEYID})',whereType:'',whereValue:''}
],
'mat_appdet':[
	{srcNodeId:'mat_base',destNodeId:'mat_appdet',layout:'/public/layout/layout_tree.js',whereSql:'mat_id not in (select mat_id from mat_appdet where app_id = {FKEYID})',whereType:'',whereValue:''}
],
'plet_fun':[
	{srcNodeId:'sel_fun',destNodeId:'plet_fun',layout:'/public/layout/layout_tree.js',whereSql:'reg_type in (\'main\',\'treemain\')',whereType:'',whereValue:''}
],
'plet_portlet':[
	{srcNodeId:'sel_plettype',destNodeId:'plet_portlet',layout:'',whereSql:'',whereType:'',whereValue:''}
],
'rpt_detailwf':[
	{srcNodeId:'rpt_wfnode',destNodeId:'rpt_detailwf',layout:'',whereSql:'',whereType:'',whereValue:''}
],
'send_user':[
	{srcNodeId:'sys_user',destNodeId:'send_user',layout:'',whereSql:'user_id not in (select user_id from plet_msg_user where plet_msg_user.msg_id = {FKEYID})',whereType:'',whereValue:''}
],
'sys_fun_col':[
	{srcNodeId:'sel_field',destNodeId:'sys_fun_col',layout:'/jxstar/studio/pub/layout_selfield.js',whereSql:'',whereType:'',whereValue:''}
],
'sys_msg_obj':[
	{srcNodeId:'sys_user',destNodeId:'sys_msg_obj',layout:'/public/layout/layout_tree.js',whereSql:'not exists (select * from sys_news_obj where obj_type = \'1\' and obj_id = user_id and news_id = {FKEYID})',whereType:'',whereValue:''}
],
'sys_news_obj':[
	{srcNodeId:'sys_dept',destNodeId:'sys_news_obj',layout:'/public/layout/layout_tree.js',whereSql:'not exists (select * from sys_news_obj where obj_type = \'0\' and obj_id = dept_id and news_id = {FKEYID})',whereType:'',whereValue:''},
	{srcNodeId:'sys_user',destNodeId:'sys_news_obj',layout:'/public/layout/layout_tree.js',whereSql:'not exists (select * from sys_news_obj where obj_type = \'1\' and obj_id = user_id and news_id = {FKEYID})',whereType:'',whereValue:''}
],
'sys_qrydet':[
	{srcNodeId:'sel_fun_col',destNodeId:'sys_qrydet',layout:'',whereSql:'fun_col.col_code not like \'%id\'',whereType:'',whereValue:''}
],
'sys_role_data':[
	{srcNodeId:'sys_datatype',destNodeId:'sys_role_data',layout:'',whereSql:'',whereType:'',whereValue:''}
],
'sys_role_field':[
	{srcNodeId:'sel_fun_col',destNodeId:'sys_role_field',layout:'',whereSql:'col_code not like \'%id\'',whereType:'',whereValue:''}
],
'sys_role_fun':[
	{srcNodeId:'sel_fun',destNodeId:'sys_role_fun',layout:'/public/layout/layout_tree.js',whereSql:'reg_type in (\'main\', \'treemain\', \'selfun\', \'result\') and module_id not like \'1010%\'',whereType:'',whereValue:''}
],
'sys_role_user':[
	{srcNodeId:'sys_user',destNodeId:'sys_role_user',layout:'/public/layout/layout_tree.js',whereSql:'sys_user.is_novalid = \'0\'',whereType:'',whereValue:''}
],
'sys_user_data':[
	{srcNodeId:'sys_datatype',destNodeId:'sys_user_data',layout:'',whereSql:'',whereType:'',whereValue:''}
],
'sys_user_funx':[
	{srcNodeId:'sel_fun',destNodeId:'sys_user_funx',layout:'/public/layout/layout_tree.js',whereSql:'reg_type in (\'main\', \'treemain\', \'selfun\')',whereType:'',whereValue:''}
],
'sys_user_role':[
	{srcNodeId:'sys_role',destNodeId:'sys_user_role',layout:'',whereSql:'',whereType:'',whereValue:''}
],
'sys_warnuser':[
	{srcNodeId:'sys_user',destNodeId:'sys_warnuser',layout:'/public/layout/layout_tree.js',whereSql:'sys_user.is_novalid = \'0\' and not exists (select * from warn_user where sys_user.user_id = warn_user.user_id and warn_id = {FKEYID})',whereType:'',whereValue:''}
],
'wf_user':[
	{srcNodeId:'sys_user',destNodeId:'wf_user',layout:'/public/layout/layout_tree.js',whereSql:'sys_user.is_novalid = \'0\' and not exists (select * from wf_user where sys_user.user_id = wf_user.user_id and nodeattr_id = {FKEYID})',whereType:'',whereValue:''}
]
};