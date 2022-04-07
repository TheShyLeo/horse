import { request, connect, authenticate } from 'league-connect'
import requestHttp2 from './http2'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
export default class client {
    constructor(credentials) {
        this.credentials = credentials;
    }
    async getWs(){
        return await connect(this.credentials);
    }
    async getConversationMessages(conversationId) {
        let response = await request({
            method: 'GET',
            url: `/lol-chat/v1/conversations/${conversationId}/messages`
        }, this.credentials);
        if (response.ok) {
            let messages = await response.json();
            return messages;
        }
        return [];
    }
    async getCurConversation() {
        let response = await request({
            method: 'GET',
            url: '/lol-chat/v1/conversations'
        }, this.credentials);
        if (response.ok) {
            let conversation = await response.json();
            return conversation;
        }
        return [];
    }
    async getMatchList(accountId, begIndex, endIndex) {
        let response = await requestHttp2({
            method: 'GET',
            url: `/lol-match-history/v3/matchlist/account/${accountId}?begIndex=${begIndex}&endIndex=${endIndex}`,
            headers: {
                'ContentType': "application/json"
            }
        }, this.credentials);
        if (response.ok) {
            let matchlist = await response.data;
            return matchlist;
        }
        return [];
    }
    async ChampSelectPatchAction(championId, actionId, ChampSelectPatchTypePick, completed) {
        let body = {
            "championId": championId,
            "completed": completed,
            "type": ChampSelectPatchTypePick
        };
        let response = await request({
            method: 'PATCH',
            url: `/lol-champ-select/v1/session/actions/${actionId}`,
            body: body
        }, this.credentials);
        let data = await response.text();
        console.log('data: ', data);
        return data;
    }
    async getSummonerByName(summonerName) {
        let response = await request({
            method: 'GET',
            url: `/lol-summoner/v1/summoners/by-name/${summonerName}`
        }, this.credentials);
        if (response.ok) {
            let summoner = await response.json();
            return summoner;
        }
        return [];
    }
    async getSummonerByAccountId(accountId) {
        let response = await request({
            method: 'GET',
            url: `/lol-summoner/v1/summoners/by-account/${accountId}`
        }, this.credentials);
        if (response.ok) {
            let summoner = await response.json();
            return summoner;
        }
        return [];
    }
    async getSummonerBySummonerId(summonerId) {
        let response = await request({
            method: 'GET',
            url: `/lol-summoner/v1/summoners/${summonerId}`
        }, this.credentials);
        if (response.ok) {
            let summoner = await response.json();
            return summoner;
        }
        return [];
    }
    async getSummonerByPuuid(puuid) {
        let response = await request({
            method: 'GET',
            url: `/lol-summoner/v1/summoners/by-puuid/${puuid}`
        }, this.credentials);
        if (response.ok) {
            let summoner = await response.json();
            return summoner;
        }
        return [];
    }
    async getSummonerBySummonerIds(summonerIds) {
        let response = await request({
            method: 'GET',
            url: `/lol-summoner/v1/summoners/by-summoner-ids/${summonerIds}`
        }, this.credentials);
        if (response.ok) {
            let summoner = await response.json();
            return summoner;
        }
        return [];
    }
    async acceptGame() {
        console.log("接受对局")
        let response = await requestHttp2({
            method: 'POST',
            url: '/lol-matchmaking/v1/ready-check/accept'
        })
    }
}
