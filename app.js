const Koa = require('koa');
const Controller = require('koa-router');
const mount = require('koa-mount');
const querystring = require('querystring');
const app = new Koa();
const controller = new Controller();

var views = require('koa-views');
app.use(views('./view', {
    map: {
        html: 'ejs'
    }
}));

const serve = require('koa-static');

const service = require('./service/webAppService');

app.use(mount('/ss', serve('./static' ,{maxage:0})))

controller.get('/hello', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = 'Hello again!';
})

controller.get('/ejs_test', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    return ctx.render('test', {title: 'test_title'});
})

controller.get('/ajax/index', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = service.get_index_data();
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

controller.get('/ajax/channel', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    let params = querystring.parse(ctx.req._parsedUrl.query) ;
    let gender = params.gender;
    if (!gender)  gender='';
    ctx.body = service.get_channel_data(gender);
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

controller.all('*', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = 'You hit the wrong url';
})

app.use(controller.routes());

app.listen(3001);