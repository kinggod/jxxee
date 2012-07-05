/*
 * DesignTempletLoader.java 2009-10-31
 * 
 * Copyright 2010 Guangzhou Donghong Software Technology Inc.
 * Licensed under the www.jxstar.org
 */
package org.jxstar.task.load;


import org.jxstar.fun.design.templet.ElementTemplet;
import org.jxstar.fun.design.templet.PageTemplet;
import org.jxstar.security.LicenseVar;
import org.jxstar.security.SafeManager;
import org.jxstar.task.SystemLoader;
import org.jxstar.util.config.SystemVar;
import org.jxstar.util.resource.JsParam;

/**
 * 加载设计模板文件的任务。
 *
 * @author TonyTan
 * @version 1.0, 2009-10-31
 */
public class DesignTempletLoader extends SystemLoader {
	private SafeManager _safe = SafeManager.getInstance();
	
	//许可检测，并启动时间检测线程
	private boolean copyright() {
		//设置许可路径
		String createPath = SystemVar.getValue(LicenseVar.CREATE_PATH, "d:/");
		LicenseVar.setValue(LicenseVar.CREATE_PATH, createPath);
		LicenseVar.setValue(LicenseVar.REAL_PATH, SystemVar.REALPATH);
		
		//启动许可检测线程，意义不大
		//CheckLicThread thread = new CheckLicThread();
		//thread.start();
		
		//获取许可试用期结束时间
		String endTime = _safe.getEndTime();
		if (endTime == null || endTime.length() == 0) {
			_safe.setTmpValid("0");
			return false;
		} else {
			_log.showDebug("jxstar load " + endTime);
		}
		
		//获取许可文件中的版本类型
		_safe.updateEE();
		
		//检查许可是否合法，学习版不检测
		String verType = LicenseVar.getValue(LicenseVar.VERSION_TYPE, "SE");
		if (!verType.equals("SE")) {
			int code = _safe.validCode();
			if (code > 0) {
				LicenseVar.setValue(LicenseVar.INVALID, "1");
				return false;
			}
		}
		
		LicenseVar.setValue(LicenseVar.INVALID, "0");
		return true;
	}

	protected void load() {
		if (!copyright()) return;
		
		String realPath = _initParam.get(JsParam.REALPATH);
		String filePath = realPath + "conf/tpl/";
		
		String fileName = "";
		String logHead = "loaded design file templet ";
		
		PageTemplet page = PageTemplet.getInstance();
		fileName = filePath + "grid-page-tpl.txt";
		page.read(fileName, "grid");
		_log.showDebug(logHead + fileName);
		
		fileName = filePath+"form-page-tpl.txt";
		page.read(fileName, "form");
		_log.showDebug(logHead + fileName);
		
		ElementTemplet element = ElementTemplet.getInstance();
		fileName = filePath+"grid-element-tpl.xml";
		element.read(fileName, "grid");
		_log.showDebug(logHead + fileName);;
		
		fileName = filePath+"form-element-tpl.xml";
		element.read(fileName, "form");
		_log.showDebug(logHead + fileName);
	}

}
