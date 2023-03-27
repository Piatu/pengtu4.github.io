import trade from '@/store/modules/trade';
import ajax from './ajax';
import mockAjax from './mockAjax';
//左边导航的接口
export const reqCategoryListData = () => ajax.get('/product/getBaseCategoryList');
//轮播图接口
export const reqCateBannerListData = () => mockAjax.get('/bannerList');
//楼层Floor接口
export const reqGetFloorsListData = () => mockAjax.get('/floor');
//搜索接口，是个对象,数据是后台给的且请求时代参获取具体哪个数据
export const reqCateSearchListData = searchParams => ajax.post('/list', searchParams);
//详情页面的接口,给它传递上id知道是那个的详情
export const reqGoodDetailData = skuid => ajax.get(`/item/${skuid}`);
//添加商品到购物车或是更新购物车
export const reqAddUpdateCart = (skuId,skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);
//购物车详情
export const reqshopCart = () => ajax.get('/cart/cartList');
//更新选中状态的请求
export const reqcheckShopCartInfo = (skuID, isChecked) => ajax.get(`/cart/checkCart/${skuID}/${isChecked}`);
//批量更新数据的状态
export const reqAllChangeState = (isChecked, skuIdList) =>
  ajax({
    url: `/cart/batchCheckCart/${isChecked}`,
    method: 'post',
    data: skuIdList
  });
//删除一条商品数据
export const reqDeletOnShop = skuId => ajax.delete(`/cart/deleteCart/${skuId}`);
//批量删除数据
export const reqDeletAllShop = skuIdList => ajax.post('/cart/batchDeleteCart', skuIdList);
//获取验证码
export const reqVerifyCode = phone => ajax.get(`/user/passport/sendCode/${phone}`);
//注册
export const reqUserRegister = user => ajax.post('/user/passport/register', user);
//实现登录
export const reqUserLogin = (user) => ajax.post(`/user/passport/login`, user);
//登出
export const reqLogout = () => ajax.get(`/user/passport/logout`);
//获取邮寄地址
export const reqUerAddressList = () => ajax.get('/user/userAddress/auth/findUserAddressList');
//获取订单交易页数据
export const reqTradeInfoData = () => ajax.get('/order/auth/trade');
//订单提交
export const reqSubmitTradeOrder = (tradeNo, params) => ajax.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, params);
//获取订单支付信息，也就是获取支付二维码
export const reGetPayQRcode = (orderId) => ajax.get(`/payment/weixin/createNative/${orderId}`);
//查询支付的订单状态，是否支付成功
export const reQueryPayState = (orderId) => ajax.get(`/payment/weixin/queryPayStatus/${orderId}`);
//获取订单中心的数据
export const reGetCenterListData=(page,limit)=>ajax.get(`/order/auth/${page}/${limit}`)