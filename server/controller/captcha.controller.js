import svgCaptcha from 'svg-captcha';
/**
 * creat image with svg-captcha, that's awesome
 */
function captchaImage (req, res, next) {
    try {
        var captcha = svgCaptcha.create({
            size: 4, // 验证码长度
            ignoreChars: '0o1ilL', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#cc9966' // 验证码图片背景颜色
        });
        const text = captcha.text;
        res.set({
        	'Content-Type':'image/svg+xml',
        	'image-text':text
        })
        res.status(200).send(captcha.data);
    } catch (e) {
        next(e)
    }   
}

export default {captchaImage}