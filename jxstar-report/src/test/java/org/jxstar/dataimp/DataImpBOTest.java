/*
 * Copyright(c) 2012 Donghong Inc.
 */
package org.jxstar.dataimp;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Map;

import org.jxstar.test.AbstractTest;
import org.jxstar.util.factory.FactoryUtil;

/**
 * 数据导入测试类。
 *
 * @author TonyTan
 * @version 1.0, 2012-6-12
 */
public class DataImpBOTest extends AbstractTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		init("d:/tomcat6/webapps/jxstar_ee");
		
		dataImp();
	}

	public static void dataImp() {
		DataImpBO impbo = new DataImpBO();
		String funId = "mat_app";
		String fkValue = "";
		Map<String,String> userInfo = FactoryUtil.newMap(); 
		userInfo.put("user_id", "tanh007");
		userInfo.put("user_name", "谭浩");
		
		FileInputStream ins = null;
		try {
			ins = new FileInputStream(new File("d:/imp_mat_app.xls"));
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		List<String> lsKeys = impbo.dataImp(ins, funId, null, fkValue, userInfo);
		System.out.println(".............error:" + impbo.getMessage());
		System.out.println(".............success imp:" + lsKeys);
		System.out.println("..........all valid info:" + impbo.getValidInfo());
	}
}
