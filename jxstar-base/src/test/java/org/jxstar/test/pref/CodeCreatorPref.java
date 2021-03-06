/*
 * Copyright(c) 2012 Donghong Inc.
 */
package org.jxstar.test.pref;

import org.jxstar.dao.DaoParam;
import org.jxstar.test.base.TestBase;
import org.jxstar.util.DateUtil;
import org.jxstar.util.key.CodeCreator;

/**
 * 构建编码的性能测试类。需要在TestRunner中执行。
 * 测试是是否会创建重复的编码，是否会造成死锁；
 *
 * @author TonyTan
 * @version 1.0, 2012-4-30
 */
public class CodeCreatorPref extends TestBase {

	/* (non-Javadoc)
	 * @see org.jxstar.test.base.TestBase#exeTest()
	 */
	@SuppressWarnings("static-access")
	@Override
	protected boolean exeTest() {
		String funId = "sys_var";
		String threadId = Integer.toString(Thread.currentThread().hashCode());
		CodeCreator coder = CodeCreator.getInstance();
		String key = coder.createCode(funId);
		//_log.showDebug("----------thread id="+ threadId +";new key=" + key);
		
		if (!savePk(funId, key, threadId)) return false;
		
		//必须添加此时间间隔，否则会出现连接数不够的情况
		try {
			Thread.currentThread().sleep(100);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		return true;
	}
	
	private boolean savePk(String tableName, String pk, String threadId) {
		DaoParam param =_dao.createParam("insert into test1(table_name, pk, thread_id, add_date) values(?, ?, ?, ?)");
		param.addStringValue(tableName);
		param.addStringValue(pk);
		param.addStringValue(threadId);
		param.addDateValue(DateUtil.getTodaySec());
		return _dao.update(param);
	}

}
