const fs = require('fs');
const axios = require('axios');

exports.get_test_data = function () {
    let content = fs.readFileSync('./mock/test.json', 'utf-8');
    return content;
}

exports.get_index_data = function() {
    let content = fs.readFileSync('./mock/home.json', 'utf-8');
    return content;
}

exports.get_rank_data = function() {
    let content = fs.readFileSync('./mock/rank.json', 'utf-8');
    return content;
}

exports.get_book_data = function(id) {
    if (!id)  id = '18218';
    let content = fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    return content;
}

exports.get_bookbacket_data = function() {
    let content = fs.readFileSync('./mock/bookbacket.json', 'utf-8');
    return content;
}

exports.get_channel_data = function(gender) {
    let content = fs.readFileSync('./mock/channel/' + gender + '.json', 'utf-8');
    return content;
}

exports.get_category_data = function() {
    let content = fs.readFileSync('./mock/category.json', 'utf-8');
    return content;
}

exports.get_search_data = function(start, end, keyword) {
    return axios.get('http://dushu.xiaomi.com:80/store/v0/lib/query/onebox?', {
            params: {
                s: keyword,
                start: start,
                end: end
            }
        })
        .then(function(response) {
            return JSON.stringify(response.data);
        })
        .catch(function(error) {
            console.log(error);
        });
}