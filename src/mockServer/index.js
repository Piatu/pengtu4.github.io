//1.引入下载的mock.js
import Mock from 'mockjs';
//2.引入bannerList
import bannerList from './bannerList.json';
//4.引入foolrs数据
import floorsList from './floorsList.json';
//3.配置mock服务器
Mock.mock('/mock/bannerList', { code: 200, data: bannerList });
//5.foors也要配置服务
Mock.mock('/mock/floor', { code: 200, data: floorsList });
