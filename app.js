const path = require('path');
const Koa = require('koa');
const Controller = require('koa-router');
const service = require('./service/webAppService');
const mount = require('koa-mount');
const querystring = require('querystring');
const app = new Koa();
const controller = new Controller();

var views = require('koa-views');
app.use(views(path.join(__dirname,'/view'), {
    map: {
        html: 'ejs'
    }
}));

const serve = require('koa-static');
app.use(mount('/static', serve(path.join(__dirname, '/static'))));

controller.get('/hello', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = 'Hello again!';
})

controller.get('/ejs_test', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('test', {title: 'test_title'});
})

controller.get('/', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('index', {title: 'index'});
})

controller.get('/rank', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('rank', {title: 'rank'});
})

controller.get('/mchannel/', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('male-channel', {title: 'male-channel'});
})

controller.get('/fchannel/', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('female-channel', {title: 'female-channel'});
})

controller.get('/category/', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('category', {title: 'category'});
})

controller.get('/book', ctx=> {
    ctx.set('Cache-Control', 'no-cache');
    var params = querystring.parse(ctx.req._parsedUrl.query) ;
    let bookId = params.id;
    return ctx.render('book', {bookId:bookId});
})

controller.get('/bookbacket', ctx=> {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('bookbacket');
})

controller.get('/search', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('search', {title: 'search'});
})

//The rest is for ajax calls
controller.get('/ajax/index', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = service.get_index_data();
})

controller.get('/ajax/rank', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = service.get_rank_data();
})

controller.get('/ajax/channel', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    let params = querystring.parse(ctx.req._parsedUrl.query) ;
    let gender = params.gender;
    if (gender.toLowerCase() != 'male' && gender.toLowerCase() != 'female')  gender='male';
    ctx.body = service.get_channel_data(gender);
})

controller.get('/ajax/category', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = service.get_category_data();
})

controller.get('/ajax/book', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    let params = querystring.parse(ctx.req._parsedUrl.query) ;
    let id = params.id;
    if (!id)  id='';
    ctx.body = service.get_book_data(id);
})

controller.get('/ajax/bookbacket', ctx=> {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = service.get_bookbacket_data();
})

controller.get('/ajax/search', async ctx => {
    ctx.set('Cache-Control', 'no-cache');
    let queryString = require('querystring');
    let params = queryString.parse(ctx.req._parsedUrl.query) ;
    let start = params.start;
    let end = params.end;
    let keyword = params.keyword;
    ctx.body = await service.get_search_data(start, end, keyword);
})

app.use(controller.routes());

app.listen(3001);