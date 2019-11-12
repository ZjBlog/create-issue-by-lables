const { Toolkit } = require('actions-toolkit')
const moment = require('moment-timezone')
// Run your GitHub Action!
Toolkit.run(async tools => {

    const path = tools.arguments._[0] || 'issues.json'
    const contents = tools.getFile(path)
    const obj = JSON.parse(contents)
    let timezone = obj['timezone'] || 'Asia/Shanghai'

    moment.tz.setDefault("Asia/Shanghai")
    let date = moment(new Date()).format('YYYY-MM-DD')
    tools.log.info(date)

    if (!obj[date]) {
        tools.exit.success('今天没有问题创建')
    }
    let arr = obj[date]
    if (Array.isArray(arr)) {
        tools.log('共'+arr.length+'个问题')
        for (let i = 0; i < arr.length; i++) {
            let { status, data } = await tools.github.issues.listForRepo({
                ...tools.context.owner,
                ...tools.context.repo,
                labels: arr[i].labels.join(',')
            })
            if (status === 200 && data.length > 0) {
                tools.log('第'+(i+1)+'个问题已存在,不用创建')
            } else {
                tools.log('创建第'+(i+1)+'个问题')
                try {
                    const issue = await tools.github.issues.create({
                        ...tools.context.repo,
                        title: arr[i].title,
                        labels: arr[i].labels,
                        body: arr[i].body
                    })
                } catch (err) {
                    tools.log('创建第'+(i+1)+'个问题出错')
                    tools.log.error(err)
                    if (err.errors) {
                        tools.log.error(err.errors)
                    }
                }
            }
        }

    } else {
        tools.log('一个问题')
        let { status, data } = await tools.github.issues.listForRepo({
            ...tools.context.owner,
            ...tools.context.repo,
            labels: obj[date].labels.join(',')
        })
        if (status === 200 && data.length > 0) {
            tools.exit.success('该问题已存在,不用创建')
        } else {
            tools.log('创建问题')
            try {
                const issue = await tools.github.issues.create({
                    ...tools.context.repo,
                    title: obj[date].title,
                    labels: obj[date].labels,
                    body: obj[date].body
                })
            } catch (err) {
                tools.log.error(err)
                if (err.errors) {
                    tools.log.error(err.errors)
                    tools.exit.failure()
                }
            }
        }
    }
    tools.log.success('创建完成')
}, {
    event: ['push'],
    secrets: ['GITHUB_TOKEN']
})