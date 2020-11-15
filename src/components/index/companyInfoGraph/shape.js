import zrender from 'zrender';
export function getRect(param) {
    let rect = new zrender.Rect({
        silent: param.silent || false,
        style: {
            text: param.text || '',
            textFill: param.textFill || null,
            fontStyle: param.fontStyle || 'normal',
            fontSize: param.fontSize || 12,
            fontFamily: param.fontFamily || 'Microsoft YaHei',
            fontWeight: param.fontWeight || null,
            textAlign: param.textAlign,
            textVerticalAlign: param.textVerticalAlign || null,
            textOffset: param.textOffset || null,
            fill: param.fill || '#000',
            opacity: param.opacity || 1,
            stroke: param.stroke || null
        },
        shape: {
            r: param.r || 0,
            x: param.x || 0,
            y: param.y || 0,
            width: param.width || 0,
            height: param.height || 0
        }
    });
    return rect;
}
export function getLine(param) {
    let line = new zrender.Line({
        style: {
            opacity: param.opacity || 1,
            stroke: param.stroke || null,
            lineDash: param.lineDash || []
        },
        shape: {
            x1: param.x1 || 0,
            y1: param.y1 || 0,
            x2: param.x2 || 0,
            y2: param.y2 || 0
        }
    });
    return line;
}
export function getSector(param) {
    let circle = new zrender.Sector({
        silent: param.silent || false,
        style: {
            fill: param.fill || '#C3DFE9',
            opacity: 0.1,
            stroke: param.stroke || null,
            lineDash: param.lineDash || []
        },
        shape: {
            cx: param.cx || 0,
            cy: param.cy || 0,
            r: param.r || 0,
            r0: param.r0 || 0
        }
    });
    return circle;
}
export function getCircle(param) {
    let circle = new zrender.Circle({
        silent: param.silent || false,
        style: {
            fill: param.fill || '#fff',
            stroke: param.stroke || '#00baff',
            lineDash: param.lineDash || []
        },
        shape: {
            cx: param.cx || 0,
            cy: param.cy || 0,
            r: param.r || 0
        }
    });
    return circle;
}
export function getText(param) {
    let text = new zrender.Text({
        silent: param.silent || false,
        position: param.position,
        rectHover: param.rectHover || false,
        style: {
            text: param.text || '',
            fontStyle: param.fontStyle || 'normal',
            fontSize: param.fontSize || 12,
            fontFamily: param.fontFamily || 'Microsoft YaHei',
            textAlign: param.textAlign,
            textFill: param.textFill || '#000'
        }
    });
    return text;
}
export function getImg(param) {
    let img = new zrender.Image({
        silent: param.silent || false,
        position: param.position,
        rectHover: param.rectHover || false,
        style: {
            text: param.text || null,
            fontStyle: param.fontStyle || null,
            fontSize: param.fontSize || 12,
            fontFamily: param.fontFamily || 'Microsoft YaHei',
            textAlign: param.textAlign || null,
            textOffset: param.textOffset || null,
            image: param.image,
            width: param.width || 20,
            height: param.height || 20,
            x: param.x || 0,
            y: param.y || 0
        }
    });
    return img;
}
