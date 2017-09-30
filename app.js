const Koa = require('koa');
const Controller = require('koa-router');
const mount = require('koa-mount');
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

controller.get('/ajax/search', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    var queryString = require('querystring');
    var params = queryString.parse(ctx.req._parsedUrl.query) ;
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    ctx.body = service.get_search_data(start, end, keyword);
})

controller.all('*', ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = 'You hit the wrong url';
})

app.use(controller.routes());

app.listen(3001);