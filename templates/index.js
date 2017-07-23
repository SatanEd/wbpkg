'use strict';

let loc = location.pathname.slice(1);

let route;
try {
    if (loc !== "") {
        let context = require.context('bundle-loader!./routes/', false);
        route = context('./' + loc);
    }
} catch (err) {
    console.log("There was an error found \n" + err);
}

if (route) {
    route();
} else {
    console.log('No such module');
}

// document.getElementById('login_bth').onclick = function (e) {
//   let $this = this;
//   require.ensure(['./login'], function (require) {
//     let login = require('./login');
//
//     login($this);
//   });
// };
