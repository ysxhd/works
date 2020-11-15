// import { bind, clear } from 'size-sensor';
import { getRect, getCircle, getLine, getSector, getImg, getText } from './shape';
import zrender from 'zrender';

import oneDegreeCircle from 'images/companyInfoGraph/oneDegreeCircle.png';
import companyLogo from 'images/companyInfoGraph/companyLogo.png';
import credit from 'images/companyInfoGraph/credit.png';
import plusCircle from 'images/companyInfoGraph/plusCircle.png';
import plusCircleActive from 'images/companyInfoGraph/plusCircleActive.png';
import minusCircle from 'images/companyInfoGraph/minusCircle.png';

import icon0 from 'images/companyInfoGraph/icon0.png';
import icon1 from 'images/companyInfoGraph/icon1.png';
import icon2 from 'images/companyInfoGraph/icon2.png';
import icon3 from 'images/companyInfoGraph/icon3.png';
import icon4 from 'images/companyInfoGraph/icon4.png';
import icon5 from 'images/companyInfoGraph/icon5.png';
import icon6 from 'images/companyInfoGraph/icon6.png';
import icon7 from 'images/companyInfoGraph/icon7.png';
import icon8 from 'images/companyInfoGraph/icon8.png';
const iconArr = [icon0, icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];

export default class CompanyInfoGraph {
    constructor(param) {
        this.twoDegreeTarget = null;
        this.threeDegreeGroup = new zrender.Group();
        this.threeDegreeLineGroup = new zrender.Group();

        let tdr = 335;
        this.oneDegreeR = 160; // 一度点半径
        this.twoDegreeR = tdr; // 二度点半径

        // 二度扇形背景
        this.sectorR0 = tdr - 115; // 内半径
        this.sectorR = tdr + 10; // 外半径

        this.id = param.id;
        this.data = param.data;
        this.clickBack = param.clickBack;
        this.twoDegreeSelect = {};
        this.zr = this.init();
        this.cp = this.getCenterPoint();
        this.formatData = this.countPoint(); // 获得处理后的数据
        this.drawBg();
        this.drawPoint();
    }
    init() {
        let zr = zrender.init(document.getElementById(this.id));
        return zr;
    }
    getCenterPoint() {
        let painter = this.zr.painter;
        let width = painter._width;
        let height = painter._height;
        let cp = { x: width / 2, y: height / 2 };
        return cp;
    }
    /**
     * @desc 绘制背景
     */
    drawBg() {
        let zr = this.zr;
        let cp = this.cp;

        let sectorR0 = this.sectorR0;
        let sectorR = this.sectorR;
        // 绘制最外层扇形
        let sector = getSector({
            fill: 'aqua',
            silent: true,
            cx: cp.x,
            cy: cp.y,
            r: sectorR,
            r0: sectorR0
        });
        zr.add(sector);

        // 最外层扇形的内边
        let sectorDash = getCircle({
            silent: true,
            cx: cp.x,
            cy: cp.y,
            r: sectorR0,
            lineDash: [2]
        });
        zr.add(sectorDash);

        // 一度背景图
        let rp = 90;
        let oneDegreeBgImgWidth = this.oneDegreeR * 2 + rp;
        let oneDegreeBgImgHeight = this.oneDegreeR * 2 + rp;
        let oneDegreeBgImg = getImg({
            silent: true,
            position: [cp.x - oneDegreeBgImgWidth / 2, cp.y - oneDegreeBgImgHeight / 2],
            image: oneDegreeCircle,
            width: oneDegreeBgImgWidth,
            height: oneDegreeBgImgHeight
        });
        zr.add(oneDegreeBgImg);

        // 零度实线圆
        let zeroDegreeCircleR = 100;
        let zeroDegreeCircleSolid = getCircle({
            silent: true,
            cx: cp.x,
            cy: cp.y,
            r: zeroDegreeCircleR + 10
        });
        zr.add(zeroDegreeCircleSolid);

        // 零度虚线圆
        let zeroDegreeCircleDash = getCircle({
            silent: true,
            cx: cp.x,
            cy: cp.y,
            r: zeroDegreeCircleR,
            lineDash: [2]
        });
        zr.add(zeroDegreeCircleDash);

    }
    /**
     * @desc 计算点的位置
     */
    countPoint() {
        let countPointData = JSON.parse(JSON.stringify(this.data)); // 拷贝一分数据用于计算位置
        let cp = this.cp;
        countPointData['x'] = cp.x;
        countPointData['y'] = cp.y;

        let oneDegree = countPointData.child;
        let oneDegreeLength = oneDegree.length;
        let PI = Math.PI;
        let radian = PI / 180; // 1弧度
        let intervalRadian = 2 * PI / oneDegreeLength; // 每个点之间的间隔弧度
        let oneDegreeR = this.oneDegreeR;

        let twoDegreeR = this.twoDegreeR;

        let sectorR0 = this.sectorR0; // 二度区域扇形的内半径
        let sectorR = this.sectorR; // 二度区域扇形的外半径
        for (let i = 0; i < oneDegreeLength; i++) {
            let twoDegreeDashLineRadian = 0; // 二度区域间隔虚线的弧度
            let onePointRadian = 0; // 一度点的弧度
            let offsetRadio = radian * 20; // 20°
            switch (i) {
                case 5:
                    twoDegreeDashLineRadian = intervalRadian * i;
                    onePointRadian = intervalRadian * i + offsetRadio - radian * 15;
                    break;
                case 6:
                    twoDegreeDashLineRadian = intervalRadian * i - radian * 15;
                    onePointRadian = intervalRadian * i + offsetRadio - radian * 25;
                    break;
                case 7:
                    twoDegreeDashLineRadian = intervalRadian * i - radian * 32;
                    onePointRadian = intervalRadian * i + offsetRadio - radian * 28;
                    break;
                case 8:
                    twoDegreeDashLineRadian = intervalRadian * i - radian * 30;
                    onePointRadian = intervalRadian * i + offsetRadio - radian * 19;
                    break;
                default:
                    twoDegreeDashLineRadian = intervalRadian * i;
                    onePointRadian = intervalRadian * i + offsetRadio;
            }
            // 计算二度区域虚线起点
            let sectorR0X = Math.sin(twoDegreeDashLineRadian) * sectorR0 + cp.x;
            let sectorR0Y = cp.y - Math.cos(twoDegreeDashLineRadian) * sectorR0;
            // 计算二度区域虚线终点
            let sectorRX = Math.sin(twoDegreeDashLineRadian) * sectorR + cp.x;
            let sectorRY = cp.y - Math.cos(twoDegreeDashLineRadian) * sectorR;
            oneDegree[i]['line'] = { x1: sectorR0X, y1: sectorR0Y, x2: sectorRX, y2: sectorRY };

            // 计算一度位置
            let oneDegreeX = Math.sin(onePointRadian) * oneDegreeR + cp.x;
            let oneDegreeY = cp.y - Math.cos(onePointRadian) * oneDegreeR;
            oneDegree[i]['x'] = oneDegreeX;
            oneDegree[i]['y'] = oneDegreeY;
            let twoDegree = oneDegree[i].child;
            let twoDegreeLength = twoDegree.length;
            for (let j = 0; j < twoDegreeLength; j++) {
                let twoPointRadian = onePointRadian + (j - parseInt(twoDegreeLength / 2, 10)) * radian * 5.5;
                if (i === 0) {
                    if (j === 0) {
                        twoPointRadian = twoPointRadian + radian * 5;
                    } else if (j === 1) {
                        twoPointRadian = twoPointRadian + radian * 10;
                    }
                } else if (i === 1) {
                    twoPointRadian = twoPointRadian + radian * 2;
                } else if (i === 3) {
                    twoPointRadian = twoPointRadian - radian * 5;
                } else if (i === 4) {
                    if (j < 3) {
                        twoPointRadian = onePointRadian + (0 - parseInt(twoDegreeLength / 2, 10)) * radian * 5.5 - radian * 2;
                    } else {
                        twoPointRadian = onePointRadian + (3 - parseInt(twoDegreeLength / 2, 10)) * radian * 5.5 - radian * 1;
                    }
                } else if (i === 5) {
                    twoPointRadian = twoPointRadian + radian * 12;
                } else if (i === 6) {
                    twoPointRadian = twoPointRadian + radian * 10;
                } else if (i === 8) {
                    twoPointRadian = twoPointRadian - radian * 2;
                    if (j > 0) {
                        twoPointRadian = twoPointRadian - radian * 0.3;
                    }
                    if (j === 10) {
                        twoPointRadian = twoPointRadian + radian * 4;
                    }
                }
                let twoDegreeX = Math.sin(twoPointRadian) * twoDegreeR + cp.x;
                let twoDegreeY = cp.y - Math.cos(twoPointRadian) * twoDegreeR;
                if (i === 4) {
                    if (j < 3) {
                        twoDegreeY = twoDegreeY - j * 20 - 10;
                    } else {
                        twoDegreeY = twoDegreeY - (j - 3) * 20 - 15;
                    }
                }
                twoDegree[j]['x'] = twoDegreeX;
                twoDegree[j]['y'] = twoDegreeY;
            }
        }
        return countPointData;
    }
    /**
     * @desc 绘制点
     */
    drawPoint() {
        let zr = this.zr;
        let formatData = this.formatData;
        let zeroDegreeGroup = new zrender.Group();
        // 绘制0度
        let centerImgWidth = 44;
        let centerImgHeight = 44;
        let centerImg = getImg({
            silent: true,
            position: [formatData.x - centerImgWidth / 2, formatData.y - centerImgHeight - 10],
            image: companyLogo,
            width: centerImgWidth,
            height: centerImgHeight
        });
        zeroDegreeGroup.add(centerImg);
        let companyNameText = getText({
            silent: true,
            text: formatData.companyName,
            fontSize: 14,
            textAlign: 'center',
            position: [formatData.x, formatData.y]
        });
        zeroDegreeGroup.add(companyNameText);

        let creditCodeIconWidth = 12;
        let creditCodeIconHeight = 12;
        let creditCodeName = getImg({
            silent: true,
            image: credit,
            width: creditCodeIconWidth,
            height: creditCodeIconHeight,
            text: '统一社会信用代码',
            fontSize: 12,
            textAlign: 'left',
            position: [formatData.x - 55, formatData.y + 20],
            textOffset: [10, 1]
        });
        zeroDegreeGroup.add(creditCodeName);
        let creditCode = getText({
            silent: true,
            text: formatData.creditCode,
            fontSize: 12,
            textAlign: 'center',
            position: [formatData.x, formatData.y + 40]
        });
        zeroDegreeGroup.add(creditCode);

        // let rectWidth = 60;
        // let rectHeight = 26;
        // let focuse = getRect({
        //     stroke: '#0075BC',
        //     text: '关注',
        //     fontSize: 14,
        //     fontWeight: 'bold',
        //     textFill: '#0075BC',
        //     textOffset: [0, 1],
        //     r: [4],
        //     fill: '#fff',
        //     x: formatData.x - rectWidth / 2,
        //     y: formatData.y + 60,
        //     width: rectWidth,
        //     height: rectHeight
        // });

        // zeroDegreeGroup.add(focuse);

        zr.add(zeroDegreeGroup);

        // console.log(formatData, 'formateData');
        // 绘制1 2度
        let oneDegreeChild = formatData.child;
        let oneDegreeLength = oneDegreeChild.length;
        let halfLength = oneDegreeLength / 2;
        let oneDegreeImgWidth = 32;
        let oneDegreeImgHeight = 32;

        let twoDegreeImgWidth = 16;
        let twoDegreeImgHeight = 16;
        let oneDegreeGroup = new zrender.Group();
        let twoDegreeDashLineGroup = new zrender.Group();
        let twoDegreeGroup = new zrender.Group();

        for (let i = 0; i < oneDegreeLength; i++) {
            let textAlign = i < halfLength ? 'right' : 'left';
            let twoDegreeTextOffsetX = i < halfLength ? -10 : 10;
            let twoDegreeTextOffsetY = i < halfLength ? 4 : 5;

            let oneDegreeImg = getImg({
                silent: true,
                position: [oneDegreeChild[i].x - oneDegreeImgWidth / 2, oneDegreeChild[i].y - oneDegreeImgHeight / 2 - 11],
                image: iconArr[i],
                width: oneDegreeImgWidth,
                height: oneDegreeImgHeight,
                text: oneDegreeChild[i].name,
                fontSize: 12,
                textAlign: 'center',
                textOffset: [0, 25]
            });
            oneDegreeGroup.add(oneDegreeImg);

            let linePos = oneDegreeChild[i].line;
            let twoDegreeDashLine = getLine({
                stroke: '#00BAFF',
                lineDash: [2],
                x1: linePos.x1,
                y1: linePos.y1,
                x2: linePos.x2,
                y2: linePos.y2
            });
            twoDegreeDashLineGroup.add(twoDegreeDashLine);

            let twoDegreeChild = oneDegreeChild[i].child;
            let twoDegreeLength = twoDegreeChild.length;
            let subTwoDegreeGroup = new zrender.Group();
            for (let j = 0; j < twoDegreeLength; j++) {
                let itGroup = new zrender.Group();
                let hasChild = twoDegreeChild[j].child.length > 0 ? true : false;
                let eName = twoDegreeChild[j].hasOwnProperty('eName') ? twoDegreeChild[j].eName : null;
                let silent = hasChild || eName ? false : true;
                let icon = hasChild ? plusCircle : minusCircle; //  
                let textFill = hasChild || eName ? '#000' : '#B8C1CC';
                let twoDegreeImg = getImg({
                    silent: silent,
                    position: [twoDegreeChild[j].x - twoDegreeImgWidth / 2, twoDegreeChild[j].y - twoDegreeImgHeight / 2],
                    image: icon,
                    width: twoDegreeImgWidth,
                    height: twoDegreeImgHeight
                });
                itGroup.add(twoDegreeImg);
                let twoDegreeText = getText({
                    silent: silent,
                    text: twoDegreeChild[j].name,
                    fontSize: 12,
                    textAlign: textAlign,
                    textFill: textFill,
                    position: [twoDegreeChild[j].x + twoDegreeTextOffsetX, twoDegreeChild[j].y - twoDegreeTextOffsetY]
                });
                itGroup.add(twoDegreeText);
                let key = i + '' + j;
                if (twoDegreeChild[j].child) {
                    this.twoDegreeSelect[key] = twoDegreeChild[j].child;
                }
                twoDegreeImg.key = key;
                twoDegreeText.key = key;

                twoDegreeImg.hasChild = hasChild;
                twoDegreeText.hasChild = hasChild;

                twoDegreeImg.eName = eName;
                twoDegreeText.eName = eName;

                twoDegreeImg.twoDegreeIndex = i;
                twoDegreeText.twoDegreeIndex = i;

                subTwoDegreeGroup.add(itGroup);
            }
            twoDegreeGroup.add(subTwoDegreeGroup);
        }
        // 解决zrender图片引用bug
        let hideImg = getImg({
            position: [0, 0],
            image: plusCircleActive,
            width: 1,
            height: 1,
            invisible: true
        });
        zr.add(hideImg);
        zr.add(oneDegreeGroup);
        zr.add(twoDegreeGroup);
        zr.add(twoDegreeDashLineGroup);
        this.on('click', this._clickTwoDegree);
    }
    _clickTwoDegree = (e) => {
        let target = e.target;

        // 没有点击事件的元素
        if (target === undefined) {
            return false;
        }
        // target.hasChild为true或者 false 判断2度是否有子集  没有子集跳转到详情页  有子集显示出子集
        if (!target.hasChild) {
            if (target.hasOwnProperty('eName') && target.eName) {
                let eName = target.eName; // type 标记当前点 例： 工商基本信息
                this.clickBack(eName);
            }
            return false;
        }
        let cp = this.cp; // 中心点
        let sectorR = this.sectorR; // 二度扇形的外半径
        let key = target.key;
        let twoDegreeIndex = target.twoDegreeIndex;  // 第几个第二级child
        let list = this.twoDegreeSelect[key];
        if (!list.length) {
            return false;
        }

        this.threeDegreeGroup.removeAll();
        this.threeDegreeLineGroup.removeAll();
        // 改变有子集的颜色
        if (this.twoDegreeTarget) {
            let tempChildren = this.twoDegreeTarget.parent._children;
            tempChildren[0].attr({
                style: {
                    image: plusCircle
                }
            });
            tempChildren[1].attr({
                style: {
                    textFill: '#333333'
                }
            });
        }
        if (this.threeDegreeGroup.key === key) {
            this.threeDegreeGroup.key = '';
            return false;
        }

        let children = target.parent && target.parent._children;

        children[0].attr({
            style: {
                image: plusCircleActive
            }
        });
        children[1].attr({
            style: {
                textFill: '#00BAFF'
            }
        });

        this.twoDegreeTarget = target;

        let pos = children[0].position;
        let rectWidth = 100;
        let rectHeight = 26;

        let offsetX = 200;
        let offsetY = 0;

        if (twoDegreeIndex > 5) {
            offsetX = -(sectorR - (cp.x - pos[0]) + offsetX);
        } else {
            offsetX = sectorR - (pos[0] - cp.x) + offsetX - rectWidth;
        }
        let listLength = list.length;
        let linePointSmall = [];
        for (let i = 0; i < listLength; i++) {
            if (i > 0) {
                offsetY = offsetY + rectHeight + 10;
            }
            let x = pos[0] + offsetX;
            let y = pos[1] + offsetY;
            let eName = list[i].hasOwnProperty('eName') ? list[i].eName : null; // 有type才跳转到详情页
            let rect = getRect({
                silent: eName ? false : true,
                text: list[i].name,
                textFill: '#fff',
                r: [4],
                fill: '#00BAFF',
                x: x,
                y: y,
                width: rectWidth,
                height: rectHeight
            });
            rect.hasChild = false;
            rect.eName = eName;
            this.threeDegreeGroup.key = key;
            this.threeDegreeGroup.add(rect);

            let x1 = twoDegreeIndex > 5 ? x + rectWidth : x;
            let y1 = y + rectHeight / 2;
            let x2 = twoDegreeIndex > 5 ? x1 + 20 : x1 - 20;
            linePointSmall.push({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y1
            });
        }
        let midPointX = linePointSmall[0].x2;
        let midPointY = (linePointSmall[0].y2 + linePointSmall[listLength - 1].y2) / 2;

        let l2Length = twoDegreeIndex < 5 ? midPointX - 20 : midPointX + 20; // 从挨着圆的方向开始算 第二根线
        let posX = twoDegreeIndex < 5 ? pos[0] + 14 : pos[0];
        let posY = pos[1] + 7;
        let linePoint = [
            { x1: l2Length, y1: posY, x2: posX, y2: posY },
            { x1: l2Length, y1: posY, x2: l2Length, y2: midPointY },
            { x1: l2Length, y1: midPointY, x2: midPointX, y2: midPointY },
            { x1: linePointSmall[0].x2, y1: linePointSmall[0].y2, x2: linePointSmall[listLength - 1].x2, y2: linePointSmall[listLength - 1].y2 }
        ];

        let linePointConcat = linePointSmall.concat(linePoint);
        let linePointConcatLength = linePointConcat.length;
        for (let j = 0; j < linePointConcatLength; j++) {
            let line = getLine({
                lineDash: [2],
                stroke: '#00BAFF',
                x1: linePointConcat[j].x1,
                y1: linePointConcat[j].y1,
                x2: linePointConcat[j].x2,
                y2: linePointConcat[j].y2
            });
            this.threeDegreeLineGroup.add(line);
        }

        this.zr.add(this.threeDegreeGroup);
        this.zr.add(this.threeDegreeLineGroup);
    }
    on(eventName, fun) {
        this.zr.on(eventName, (e) => {
            fun(e);
        });
    }
    destory() {
        this.zr.clear();
        this.zr.dispose();
    }
}