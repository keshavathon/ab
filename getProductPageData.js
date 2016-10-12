//FETCH HTML, LINKS, IMAGES OF PRODUCT PAGES
phantom.casperPath = 'bin/';
phantom.injectJs('bin/bootstrap.js');
var casper = require('casper').create();
var casper = require('casper').create();
var selecpath = require('casper').selectXPath;
var links = '';
var imgURL;
var pageURL = 'https://www.alibaba.com/Agricultural-Growing-Media_pid144';
var count = 1
    , exitF = false;
var categoryFolder = 'Agriculture';
var subCategoryFolder = 'Agricultural Growing Media';
var fs = require('fs');
var myfile = 'dataFiles/categoryURL.json';
var fileData = fs.read(myfile);
var exitFHTML = '';
//console.log(fileData);
fileData = JSON.parse(fileData);
//console.log(fileData[0].url);
casper.start('https://login.alibaba.com');
casper.on('error', function (err) {
    console.log(err);
});
casper.then(function () {
    console.log(casper.currentUrl);
});
/*
casper.then(function () {
    //console.log(casper.);
    casper.capture('captcha.png');
    this.page.switchToChildFrame(0);
    casper.sendKeys('#fm-login-id', 'krish.flipk@gmail.com');
    casper.sendKeys('#fm-login-password', 'alibaba@123');
    casper.thenClick(selecpath('//*[@id="fm-login-submit"]'), function () {
        console.log('Logged In');
    });
    casper.capture('Login1.png');
    casper.wait(5000, function () {
        casper.capture('Login2.png');
    });
});
*/
casper.wait(5000, function () {});
//casper.then(fileData[0].url);
var primIndex = 0;
var urlPrefix = fileData[primIndex].url.substr(fileData[primIndex].url.indexOf('_') + 4);
console.log(urlPrefix);

function categoryScrap() {
    if (primIndex == fileData.length) {}
    else {
        urlPrefix = fileData[primIndex].url.substr(fileData[primIndex].url.indexOf('_') + 4);
        casper.thenOpen(fileData[primIndex].url);
        categoryFolder = fileData[primIndex].category;
        subCategoryFolder = fileData[primIndex].textContent;
        console.log('Started for category ' + categoryFolder + ' / ' + subCategoryFolder);
        var exitF = true;
        count = 1;
        casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

        function scrap() {
            casper.then(function () {
                if (this.currentUrl.indexOf('login') > 0) {
                    casper.thenOpen('https://www.alibaba.com/catalogs/products/CID' + urlPrefix + '----------------------------G/' + count);
                }
                if (this.currentUrl.indexOf('login') > 0) {
                    casper.thenOpen('https://www.alibaba.com/catalogs/products/CID' + urlPrefix + '----------------------------G/' + count);
                }
                if (this.currentUrl.indexOf('login') > 0) {
                    casper.thenOpen('https://www.alibaba.com/catalogs/products/CID' + urlPrefix + '----------------------------G/' + count);
                }
                if (this.currentUrl.indexOf('login') > 0) {
                    casper.capture('Login.png');
                    console.log('CURRENT url IS :-  ' + this.currentUrl);
                    this.page.switchToChildFrame(0);
                    casper.sendKeys('#fm-login-id', 'krish.flipk@gmail.com');
                    casper.sendKeys('#fm-login-password', 'alibaba@123');
                    casper.thenClick(selecpath('//*[@id="fm-login-submit"]'), function () {
                        console.log('Logged In');
                    });
                    casper.capture('Login1.png');
                    casper.wait(5000, function () {
                        casper.capture('Login2.png');
                    });
                    //console.log('return value is '+t);
                    //this.page.switchToParentFrame();
                }
            });
            casper.wait(100, function () {
                //    console.log(this.currentUrl);
                exitF += this.evaluate(function () {
                        var text = document.querySelector('body > div.l-page > div.l-page-main > div.l-main-content > div.l-grid.l-grid-sub > div.l-col-main > div > div:nth-child(1) > div > div > div.right > div');
                        if (text != null) {
                            if (text.textContent.indexOf('Your browsing did not match any products') > 0) return false;
                        }
                        else {
                            return true;
                        }
                    })
                    //console.log(' :-' + exitF);
                casper.wait(200, function () {
                    casper.scrollTo(10, 300);
                });
                casper.wait(200, function () {
                    casper.scrollTo(10, 600);
                });
                casper.wait(200, function () {
                    casper.scrollTo(10, 900);
                });
                casper.wait(200, function () {
                    casper.scrollTo(10, 1300);
                });
                casper.wait(200, function () {
                    casper.scrollTo(10, 1700);
                });
                casper.wait(200, function () {
                    casper.scrollTo(10, 2100);
                });
                casper.wait(200, function () {
                    casper.scrollTo(10, 2500);
                });
                casper.wait(200, function () {
                    casper.scrollTo(10, 2900);
                });
            });
            if (exitF != false) {
                casper.wait(5000, function () {
                    console.log('working');
                    casper.capture('temp.png');
                    imgURL = this.evaluate(function (subCategoryFolder,categoryFolder) {
                        var tempArr = '';
                        var breadCrumb = document.querySelector('div.l-grid.l-grid-sub.l-grid-extra > div.l-col-main > div > div:nth-child(1) > div > div');
                        var temp = document.querySelectorAll('.m-gallery-product-item img');
                        for (var iterate = 0; iterate < temp.length; iterate++) {
                            tempArr += '{"folder":"' + categoryFolder + '","subfolder":"' + subCategoryFolder + '","url":"' + temp[iterate].parentElement.getAttribute('href') + '","src":"' + temp[iterate].getAttribute('src') + '","breadCrumb":"' + 'breadCrumb.textContent' + '","done":"false"}';
                            if (iterate != temp.length - 1) tempArr += ',';
						//	if(iterate==temp.length-1)
								//return tempArr;		
                        }
                        return tempArr;
                    });
                    console.log(this.currentUrl);
                    console.log('source ' + imgURL);
                })
                casper.wait(1000, function () {
                    var fs = require('fs');
                    var myfile = 'dataFiles/' + categoryFolder + '/' + subCategoryFolder + '/Page' + count + '.json';
					if(imgURL!=null)
                    	fs.write(myfile, imgURL, 'a');
                    console.log(count);
                    casper.capture('screebshot/secondpage' + count + '.png');
                    count++;
                })
                casper.wait(10000, function () {});
                casper.thenOpen('https://www.alibaba.com/catalogs/products/CID' + urlPrefix + '----------------------------G/' + count);
            }
            casper.run(function () {
                //console.log('Exiting scrap method :-' + exitF);
                if (exitF == false) {
                    exitF = false;
                    primIndex++;
                    categoryScrap();
                }
                else if (exitF == true) {
                    console.log('Continue in same category.');
                    scrap();
                }
            });
        }
        if (fileData[primIndex].started == 'false' || fileData[primIndex].ended == 'false' || fileData[primIndex].continueURL == 'true') scrap();
    }
}
categoryScrap();
