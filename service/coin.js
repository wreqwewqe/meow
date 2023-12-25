export async function query_amount(data) {
    // console.log("dddddddddddddddddddddd", data.address)
    let result = await fetch("/api/query_amount", {
        headers: {
            Accept: 'application/vnd.dpexpo.v1+json' //设置请求头
        },
        body: JSON.stringify(data),
        method: 'post',
    })
    return await result.json() //必须通过此方法才可返回数据
}

export async function update_invite_by(data) {
    let result = await fetch("/api/update_invite_by", {
        headers: {
            Accept: 'application/vnd.dpexpo.v1+json' //设置请求头
        },
        body: JSON.stringify(data),
        method: 'post',
    })
    return await result.json() //必须通过此方法才可返回数据
}
