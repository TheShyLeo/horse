import _ from 'lodash'
import http2 from 'http2'
import { request, connect, authenticate } from 'league-connect'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const prefix = '[8, "OnJsonApiEvent",'
const prefixLen = prefix.length
const gameFlowChangedEvt = "/lol-gameflow/v1/gameflow-phase"
const champSelectUpdateSessionEvt = "/lol-champ-select/v1/session"
const autoAcceptGame = true
const autoPickChampId = 2
const autoBanChampId = 1
var credentials = null



async function getCredentials() {
    console.log("等待客户端启动...")
    credentials = await authenticate({ awaitConnection: true })
    if (credentials) {
        console.log("已经连接到客户端")
        // await sleep(1000)
    }
    return credentials
}

async function getws() {
    console.log("等待客户端启动...")
    credentials = await authenticate({ awaitConnection: true })
    if (credentials) {
        console.log("已经连接到客户端")
        // await sleep(1000)
    }
    let baseUrl = `https://riot:${credentials.password}@127.0.0.1:${credentials.port}`
    console.log("baseUrl: ", baseUrl)
    const ws = await connect(credentials)
    ws.on('message', async (message) => {
        if (message.length > prefixLen) {
            let strObj = message.substring(prefixLen - 1, message.length - 1)
            let msg = JSON.parse(strObj)
            if (msg.uri === gameFlowChangedEvt) {
                await onGameFlowChange(msg.data)
            } else if (msg.uri === champSelectUpdateSessionEvt) {
                // await onChampSelectSessionChange(msg.data)
            }
        }
    })
}

async function onGameFlowChange(gameFlow) {
    console.log("切换状态:" + gameFlow)
    switch (gameFlow) {
        case "ChampSelect":
            console.log("切换到选择英雄界面")
            let summoners = await getTeamSummoners();    // 获取队伍信息
            console.log("进入英雄选择阶段,正在计算用户分数")
            break;
        case "InProgress":
            console.log("切换到游戏界面")
            break;
        case "ReadyCheck":
            console.log("等待接受对局")
            await acceptGame();
            break;
        case "None":
            console.log("无状态")
            break;
        case "Lobby":
            console.log("房间")
            break;
        case "Matchmaking":
            console.log("匹配对局中...")
            break;
        default:
            console.log("未知状态")
            break;
    }
}
async function onChampSelectSessionChange(data) {
    if (data.actions && data.actions.length > 0) {
        let actions = _.flatten(data.actions)
        let localPlayerCellId = data.localPlayerCellId
        console.log("开始处理ban pick")
        for (const action of actions) {
            let { id, type, completed, championId, actorCellId, isInProgress } = action
            if (localPlayerCellId === actorCellId && !completed && isInProgress && championId === 0) {
                let championId = type === "pick" ? autoPickChampId : autoBanChampId
                if (championId > 0) {
                    await ChampSelectPatchAction(championId, id, type, true);
                }
            }
        }
    }
    return
}
async function getTeamSummoners() {
    console.log("获取队伍信息")
    let conversation = await getCurConversation()
    if (conversation.length > 0) {
        let conversationId = conversation[0].id
        let messages = await getConversationMessages(conversationId)
        for (const v of messages) {
            let matchlist = await getMatchList(v.fromSummonerId, 0, 10)
            let a = '1'
        }
    }
    return []
}
async function acceptGame() {
    console.log("接受对局")
    let response = await requestHttp2({
        method: 'POST',
        url: '/lol-matchmaking/v1/ready-check/accept'
    })
}

async function ChampSelectPatchAction(championId, actionId, ChampSelectPatchTypePick, completed) {
    let body = {
        "championId": championId,
        "completed": completed,
        "type": ChampSelectPatchTypePick
    }
    let response = await request({
        method: 'PATCH',
        url: `/lol-champ-select/v1/session/actions/${actionId}`,
        body: body
    }, credentials)
    let data = await response.text()
    console.log('data: ', data)
    return data
}

async function getConversationMessages(conversationId) {
    let response = await request({
        method: 'GET',
        url: `/lol-chat/v1/conversations/${conversationId}/messages`
    }, credentials)
    if (response.ok) {
        let messages = await response.json()
        return messages
    }
    return []
}

async function getCurConversation() {
    let response = await request({
        method: 'GET',
        url: '/lol-chat/v1/conversations'
    }, credentials)
    if (response.ok) {
        let conversation = await response.json()
        return conversation
    }
    return []
}

async function getMatchList(accountId, begIndex, endIndex) {
    let response = await requestHttp2({
        method: 'GET',
        url: `/lol-match-history/v3/matchlist/account/${accountId}?begIndex=${begIndex}&endIndex=${endIndex}`,
        headers: {
            'ContentType': "application/json"
        }
    })
    if (response.ok) {
        let matchlist = await response.data
        return matchlist
    }
    return []
}

async function requestHttp2(options) {
    let method = options.method || 'GET';
    let url = options.url;
    let port = credentials.port;
    let username = 'riot';
    let password = credentials.password;
    let authorization = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    let status;
    const client = http2.connect('https://127.0.0.1:' + port);
    client.on('error', (err) => console.error(err));

    const req = client.request({
        ':path': url,
        ':method': method,
        "authorization": authorization
    });

    req.on('response', (headers, flags) => {
        status = headers[':status'];
    });
    req.setEncoding('utf8');
    let data = "";
    req.on('data', (chunk) => { data += chunk; });
    req.end();
    return new Promise((resolve, reject) => {
        req.on('end', () => {
            let response = {}
            response.data = data === "" ? data : JSON.parse(data)
            response.ok = status === '200'
            resolve(response)
            client.close();
        });
    })
}


export default {
    getCredentials,
    onGameFlowChange,
    onChampSelectSessionChange,
    getTeamSummoners,
    acceptGame,
    ChampSelectPatchAction,
    getConversationMessages,
    getCurConversation,
    getMatchList,
    requestHttp2
}

