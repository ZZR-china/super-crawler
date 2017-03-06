import url from 'url';
import qr from 'qr-image';
/**
 * create qr with qr-image, that's awesome
 */
function createQrByUrl(req, res, next) {
    try {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        const str = res.params;
        const query = req.query;
        console.log(query);
        const qr_svg = qr.image('I love QR!', { type: 'png' });
        qr_svg.pipe(res);
    } catch(e){
    	next(e)
    };
}

export default {createQrByUrl}