# create-issue-by-lables
使用actions-toolkit创建的action.根据lables创建问题,如果和lables相关的问题不存在的话,要创建的问题在json文件中.
在使用评论插件(Gittalk、Vssue等)的时候,需要手动创建问题.此action可以在提交新文章的时候自动创建相关问题.
问题模板在json文件中.timezone时区.issues.json默认在项目的根目录下.格式如下
```
{
	"timezone": "Asia/Shanghai",
	"2019-05-08": [{
		"title": "dd",
		"labels": ["测试1"]
	}, {
		"title": "dd1",
		"labels": ["测试"]
	}],
	"2019-05-07": {
		"title": "dd",
		"labels": ["测试","测试1"],
		"body": "此问题是由actions自动创建,url"
	}
}
```
使用时需要 GITHUB_TOKEN secrets,可以自定义json路径,在使用时加入 args = ".github/other.json"
