const FS = require('fs');
var readlineSync = require('readline-sync');
const PATH = '../src/containers/';// 创建组件文件路径，根据实际项目调整

// 读取模板文件，替换相应内容，创建新模块文件
let replaceFile = function( filePath, sourceRegx){
    var componentName = readlineSync.question('Input the component name: ');
    FS.readFile(filePath, function(err, data){
        if(err){
            return err;
        }
        let arg = [componentName];// process.argv.splice(2);
        if(!componentName){
            console.log('Please input the component name!\n');
            return;
        }
        let str = data.toString();
        let nameArr = componentName.split('');
        // 组件文件夹首字母小写
        let lowerName = !(/^[A-Z][A-z]*$/).test(componentName) ? componentName : nameArr[0].toLowerCase() + nameArr.map((v, k)=>{return k !== 0 ? v : '';}).join('');
        let upperName = !(/^[A-Z][A-z]*$/).test(componentName) ? nameArr[0].toUpperCase() + nameArr.map((v, k)=>{return k !== 0 ? v : '';}).join('') : componentName;

        str = str.replace(sourceRegx, upperName);
        str = str.replace(/CSSNAME/g, lowerName);
        FS.mkdir(PATH + lowerName, (e)=>{
            if(!e){
                FS.mkdir(PATH + lowerName + '/children', e=>{
                    //
                });
                FS.writeFile(PATH + lowerName + '/' + upperName + '.jsx', str, function (err) {
                    if (err) {console.log( 'erro:', err );}
                });
                FS.writeFile(PATH + lowerName + '/' + lowerName + '.scss', '.' + lowerName + '{\n\n}', (err)=>{
                    if (err) {console.log( 'erro:', err );}
                });
            }else{
                console.log('erro:', e);
            }
        });
        console.log('Component of ' + upperName + ' has completed!\n');
    });
    setTimeout(() => {
        replaceFile('../tmp/tmp.jsx', /FILENAME/g);
    }, 300);
    
};

replaceFile('../tmp/tmp.jsx', /FILENAME/g);

// var readlineSync = require('readline-sync');

// // Wait for user's response.
// var userName = readlineSync.question('May I have your name? ');
// console.log('Hi ' + userName + '!');

// // Handle the secret text (e.g. password).
// var favFood = readlineSync.question('What is your favorite food? ', {
//   hideEchoBack: true // The typed text on screen is hidden by `*` (default).
// });
// console.log('Oh, ' + userName + ' loves ' + favFood + '!');