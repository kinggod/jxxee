/*
 * TreeQuery.java 2009-11-18
 * 
 * Copyright 2010 Guangzhou Donghong Software Technology Inc.
 * Licensed under the www.jxstar.org
 */
package org.jxstar.service.query;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.jxstar.control.action.RequestContext;
import org.jxstar.dao.DaoParam;
import org.jxstar.dao.DmDaoUtil;
import org.jxstar.service.BoException;
import org.jxstar.service.BusinessObject;
import org.jxstar.service.util.SysDataUtil;
import org.jxstar.util.MapUtil;
import org.jxstar.util.factory.FactoryUtil;
import org.jxstar.util.resource.JsMessage;

/**
 * 查询树型数据对象，只处理单级树。
 *
 * @author TonyTan
 * @version 1.0, 2009-11-18
 * @deprecated 由TreeQueryExt类替代，支持多级树展现
 */
public class TreeQuery extends BusinessObject {
	private static final long serialVersionUID = 1L;
	//根节点ID
	private static final String ROOT_ID = "10";
	//取树定义字段
	private static String _field_tree = DmDaoUtil.getFieldSql("fun_tree");
	
	/**
	 * 查询树形数据
	 * @param request
	 * @return
	 */
	public String queryTree(RequestContext request) {
		String sWhereSql = request.getRequestValue("where_sql");
		String sWhereType = request.getRequestValue("where_type");
		String sWhereValue = request.getRequestValue("where_value");
		
		String sUserID = request.getRequestValue("user_id");
		String sFunId = request.getRequestValue("tree_funid");
		String sParentId = request.getRequestValue("node");
		
		return createJson(sUserID, sFunId, sParentId, 
				sWhereSql, sWhereType, sWhereValue);
	}
	
	/**
	 * 查询树型数据
	 * @param sUserID -- 当前用户ID
	 * @param sFunId -- 当前功能ID
	 * @param sParentId -- 父节点ID
	 * @return
	 */
	public String createJson(String sUserID, String sFunId, String sParentId, 
			String sWhereSql, String sWhereType, String sWhereValue) {
		String sLevel = "1";
		if (sParentId.equals(ROOT_ID)) {
			sLevel = "1"; 
		} else {
			sLevel = Integer.toString(sParentId.length()/4+1);
		}
		
		_log.showDebug("tree_funid=" + sFunId + ";tree_level=" + sLevel + ";nodeId=" + sParentId);
		if (sFunId == null || sFunId.length() == 0) {
			setMessage(JsMessage.getValue("pagedesign.funidisnull"));
			return _returnFaild;
		}
		
		List<Map<String, String>> lsNode = treeData(sUserID, sFunId, sParentId, sLevel,
				sWhereSql, sWhereType, sWhereValue);
		if (lsNode == null || lsNode.isEmpty()) {
			_log.showWarn(sParentId + " tree node is empty!");
			return _returnFaild;
		}
		
		StringBuilder sbJson = new StringBuilder();
		for (int i = 0, n = lsNode.size(); i < n; i++) {
			Map<String, String> mpData = lsNode.get(i);
			
			//是否有子节点
			String has = mpData.get("has_child");
			has = has.equals("0") ? "true" : "false";
			//节点信息
			sbJson.append("{id:'"+mpData.get("node_id")+"', ");
			sbJson.append("text:'"+mpData.get("node_name")+"', ");
			sbJson.append(otherValue(mpData));
			sbJson.append("leaf:"+has+"},");
		}
		String json = "[" + sbJson.substring(0, sbJson.length()-1) + "]";
		//_log.showDebug("===============json=" + json);
		setReturnData(json);
		
		return _returnSuccess;
	}
	
	/**
	 * 取查询后的树型数据。
	 * 
	 * @param sUserID -- 用户ID
	 * @param sFunID -- 功能ID
	 * @param sParentID -- 父级节点ID，如果为空，则取第一级节点
	 * @param sLevel -- 节点级别
	 * @return List
	 */
	public List<Map<String,String>> treeData(String sUserID, 
			String sFunID, String sParentID, String sLevel,
			String sWhereSql, String sWhereType, String sWhereValue) {
		List<Map<String,String>> lsRet = FactoryUtil.newList();
		
		//如果父节点是根节点,则取空字符串
		if (sParentID.equals(ROOT_ID)) sParentID = "";
		
		//取树型定义对象
		Map<String,String> mpTree = queryTree(sFunID);
		if (mpTree == null || mpTree.isEmpty()) {
			_log.showWarn("don't find tree define...");
			return lsRet;
		}
		
		//取树型节点的附加显示值字段名，如果有多个字段名则以’,’分隔。
		String othercol = MapUtil.getValue(mpTree, "node_other");
		//不检查是否有子级
		String notcheck = MapUtil.getValue(mpTree, "not_check", "0");
		
		//主键字段
		String pkcol = MapUtil.getValue(mpTree, "node_id");
		//级别列字段
		String levelcol = MapUtil.getValue(mpTree, "node_level");
		
		//select子句
		StringBuilder treesql = new StringBuilder("select ");
		treesql.append(pkcol + " as node_id, ");
		treesql.append(MapUtil.getValue(mpTree, "node_name") + " as node_name, ");
		
		//添加附加值字段
		if (othercol.length() > 0) {
			treesql.append(othercol + ", ");
		}
		
		treesql.append(" '1' as has_child ");
		
		treesql.append(" from " + MapUtil.getValue(mpTree, "table_name") + " ");
		
		//添加父节点IDwhere子句
		treesql.append(" where " + pkcol + " like ? ");
		//添加级别列的where子句
		if (levelcol.length() > 0 && sLevel.length() > 0) {
			treesql.append(" and " + levelcol + " = ? ");
		}
		//添加定义的where子句
		String where = MapUtil.getValue(mpTree, "self_where");
		if (where.length() > 0) {
			treesql.append(" and (" + where + ") ");
		}
		
		//添加数据权限控制where子句
		String treeFunId = MapUtil.getValue(mpTree, "self_funid");
		try {
			String dataWhere = SysDataUtil.getTreeDataWhere(
									sUserID, treeFunId, Integer.parseInt(sLevel));
			if (dataWhere.length() > 0) {
				treesql.append(" and " + dataWhere);
			}
		} catch (BoException e) {
			_log.showError(e);
		}
		
		//添加扩展wheresql
		if (sWhereSql.length() > 0) {
			treesql.append(" and (" + sWhereSql + ")");
		}
		
		//添加order子句
		String order = MapUtil.getValue(mpTree, "self_order");
		if (order.length() > 0) {
			treesql.append(" order by " + order);
		}
		_log.showDebug("tree data sql=" + treesql.toString());
		
		//定义查询参数
		String param0 = sParentID + "%";
		String param1 = "string";
		if (levelcol.length() > 0 && sLevel.length() > 0) {
			param0 += ";" + sLevel;
			param1 += ";int";
		}
		
		//添加扩展参数
		if (sWhereType.length() > 0) {
			param0 += ";" + sWhereValue;
			param1 += ";" + sWhereType;
		}
		
		//取数据源名
		String dbName = MapUtil.getValue(mpTree, "db_name");
		_log.showDebug("tree data dbname=" + dbName);
		_log.showDebug("tree data param value=" + param0);
		_log.showDebug("tree data param type=" + param1);
		
		DaoParam param = _dao.createParam(treesql.toString());
		param.setDsName(dbName);
		param.setValue(param0).setType(param1);
		lsRet = _dao.query(param);
		
		//处理是否有子节点
		if (!lsRet.isEmpty() && notcheck.equals("0")) {
			lsRet = addHasChild(lsRet, mpTree, sLevel);
		}
			
		return lsRet;
	}
	
	/**
	 * 处理每个节点是否有子节点
	 * @param lsData -- 当前级别节点值
	 * @param mpTree -- 树形定义值
	 * @param sLevel -- 当前级别
	 * @return
	 */
	private List<Map<String,String>> addHasChild(List<Map<String,String>> lsData, 
			Map<String,String> mpTree, String sLevel) {
		int subLevel = Integer.parseInt(sLevel)+1;
		
		for (int i = 0, n = lsData.size(); i < n; i++) {
			Map<String,String> mpData = lsData.get(i);
			
			//主键字段
			String pkcol = MapUtil.getValue(mpTree, "node_id");
			//级别列字段
			String levelcol = MapUtil.getValue(mpTree, "node_level");
			//当前节点ID
			String nodeId = MapUtil.getValue(mpData, "node_id");
			
			//构建是否有下级的SQL
			StringBuilder treesql = new StringBuilder("select count(*) as cnt ");
			treesql.append(" from " + MapUtil.getValue(mpTree, "table_name") + " ");
			
			//添加父节点IDwhere子句
			treesql.append(" where " + pkcol + " like ? ");
			//添加级别列的where子句
			if (levelcol.length() > 0 && sLevel.length() > 0) {
				treesql.append(" and " + levelcol + " = ? ");
			}
			//添加定义的where子句
			String where = MapUtil.getValue(mpTree, "self_where");
			if (where.length() > 0) {
				treesql.append(" and (" + where + ") ");
			}
			//_log.showDebug("check has child tree data sql=" + treesql.toString());
			
			//定义查询参数
			String param0 = nodeId + "%";
			String param1 = "string";
			if (levelcol.length() > 0 && sLevel.length() > 0) {
				param0 += ";" + subLevel;
				param1 += ";int";
			}
			
			//取数据源名
			String dbName = MapUtil.getValue(mpTree, "db_name");
			//_log.showDebug("check has child tree data dbname=" + dbName);
			//_log.showDebug("check has child tree data param value=" + param0);
			//_log.showDebug("check has child tree data param type=" + param1);
			
			DaoParam param = _dao.createParam(treesql.toString());
			param.setDsName(dbName);
			param.setValue(param0).setType(param1);
			Map<String,String> mpRet = _dao.queryMap(param);
			
			String subNum = mpRet.get("cnt");
			//_log.showDebug("check has child tree data sub num=" + subNum);
			//设置是否有下级
			if (subNum.equals("0")) {
				mpData.put("has_child", "0");
			}
		}
		
		return lsData;
	}
	
	/**
	 * 取附加字段的值
	 * @param mpData
	 * @return
	 */
	private String otherValue(Map<String, String> mpData) {
		if (mpData.size() <= 3) return "";
		
		StringBuilder sb = new StringBuilder();
		Iterator<String> itr = mpData.keySet().iterator();
		
		while(itr.hasNext()) {
			String key = itr.next();
			if (!key.equals("has_child") && 
				!key.equals("node_id") &&
				!key.equals("node_name")) {
				String value = mpData.get(key);
				
				sb.append("'"+ key +"':'"+ value +"', ");
			}
		}
		return sb.toString();
	}
	
	/**
	 * 取树型定义信息。
	 * 
	 * @param funcId -- 功能ID
	 * @return Map
	 */
	private Map<String,String> queryTree(String funcId) {
		StringBuilder sbsql = new StringBuilder();
		sbsql.append("select "+ _field_tree +" from fun_tree where fun_id = ? ");
		sbsql.append("order by tree_no");
		
		DaoParam param = _dao.createParam(sbsql.toString());
		param.addStringValue(funcId);
		return _dao.queryMap(param);
	}
}
