window.onload = function() {

    let getJSON = function(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            let status = xhr.status;
            if (status == 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    }

    getJSON("https://spreadsheets.google.com/feeds/list/18aIuAMG8EAW1yWqB8qeu9TaVl0bYSHwJx4jaHHjaEOk/od6/public/values?alt=json", function(err, data) {
        console.log(data);
        if (err !== null) {
            console.log('Error: ', err);
        } else {
            data = data['feed']['entry'];
            console.log(data);
            document.querySelector('.shop-field').innerHTML = showGoods(data);
        }

    });

    function showGoods(data) {
        let out = '';

        for (var i = 0; i < data.length; i++) {
            if (data[i]['gsx$show']['$t'] != 0) {
                out += `<div class="col-lg-3 col-md col-sm-2 text-center">`;
                out += `<div class="goods">`;
                out += `<h5>${data[i]['gsx$name']['$t']}</h5>`;
                out += `<img src="${data[i]['gsx$image']['$t']}" alt="fruit">`;
                out += `<p class="cost">Цена: ${data[i]['gsx$cost']['$t']}</p>`;
                out += `<p><button type='button' class='btn btn-success' data="${data[i]['gsx$id']['$t']}">Купить</button></p>`;
                out += `</div>`;
                out += `</div>`;
            }
        }
        return out;
    };

}

// $(document).ready(function() {
//     $.getJSON("https://spreadsheets.google.com/feeds/list/18aIuAMG8EAW1yWqB8qeu9TaVl0bYSHwJx4jaHHjaEOk/od6/public/values?alt=json",
//         function(data) {
//             data = data['feed']['entry'];
//             console.log(data);
//             showGoods(data);
//         });

//     function showGoods(data) {
//         var out = '';

//         for (var i = 0; i < data.length; i++) {
//             if (data[i]['gsx$show']['$t'] != 0) {
//                 out += `<div class="col-lg-3 col-md col-sm-2 test-center">`;
//                 out += `<div class="goods">`;
//                 out += `<h5>${data[i]['gsx$name']['$t']}</h5>`;
//                 out += `<img src="${data[i]['gsx$image']['$t']}" alt="fruit">`;
//                 out += `<p class="cost">Цена: ${data[i]['gsx$cost']['$t']}</p>`;
//                 out += `</div>`;
//                 out += `</div>`;
//             }

//         }



//         $('.shop-field').html(out);
//     }
// })