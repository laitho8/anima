var Decoder = {
    'request': function (url, configGson) {
        var config = JSON.parse(configGson);
        var newUrl = url
        if (url.includes("ok.ru")) {
            newUrl = url.replace(/\s+/g, '');
            var id = newUrl.substring(newUrl.lastIndexOf('/') + 1);
            newUrl = 'https://ok.ru/dk?cmd=videoPlayerMetadata&mid=' + id;
        }
        // headers are set from android side
        if (config.rq == 0) {
            AndroidNetwork.getRequest(newUrl);
        } else if (config.rq == 1) {
            AndroidNetwork.postRequest(newUrl);
        } else {
            AndroidNetwork.webViewRequest(newUrl);
        }
    },
    'decode': function (url , content) {
        var server = getServer(url,content);
        return JSON.stringify(server);
    }, 'isEnabled': function () {
        return true;
    }
};

var DeServers = {
    /**
     * @return {string}
     */
    'deServers': function () {

        // rq=0 get rq=1 post rq=3 webview

        var servers = [];
	    var jawcloud_header ={'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'};
        servers.push({'name': "mp4upload", 'shorten': "MD", 'v': 15, 'optional': true});
        servers.push({'name': "vidlox", 'shorten': "VL", 'v': 15, 'optional': true});
        servers.push({'name': "vidoza", 'shorten': "VA", 'v': 15, 'optional': true});
        servers.push({'name': "onlystream", 'shorten': "OS", 'v': 15, 'optional': true});
		servers.push({'name': "vk.com", 'shorten': "RK", 'v': 15, 'optional': true});
        servers.push({'name': "cloudvideo", 'shorten': "CV", 'hls': 1, 'v': 18, 'optional': true});
        servers.push({'name': "fembed", 'shorten': "FD", 'rq': 1, 'v': 18, 'optional': true});
	   servers.push({'name': "mixdrop", 'shorten': "MP", 'v': 18, 'optional': true});
        servers.push({'name': "jawcloud", 'shorten': "JC", 'hls': 1, 'headers': jawcloud_header, 'v': 18, 'optional': true});
        servers.push({'name': "clipwatching", 'shorten': "CL", 'v': 18, 'optional': true});
        servers.push({'name': "mediafire", 'shorten': "MF", 'headers': jawcloud_header, 'v': 19, 'optional': false});
        servers.push({'name': "fastplay", 'shorten': "FP", 'hls': 1, 'v': 19, 'optional': true});
        servers.push({'name': "mystream", 'shorten': "MS" , 'rq': 2 , 'v': 28, 'optional': true});
		
        //  servers.push({'name': "vidfast", 'shorten': "VF", 'hls': 1, 'v': 18});
      //  servers.push({'name': "vidsat", 'shorten': "VS", 'hls': 1, 'v': 18});
        servers.push({'name': "streamvid", 'shorten': "SV", 'hls': 1, 'headers': jawcloud_header, 'v': 19, 'optional': true});
        servers.push({'name': "streamhub", 'shorten': "SH", 'hls': 1, 'headers': jawcloud_header, 'v': 19, 'optional': true});
     //  servers.push({'name': "filemoon", 'shorten': "FMS", 'hls': 1, 'headers': jawcloud_header, 'v': 19, 'optional': true});
        servers.push({'name': "anonfiles", 'shorten': "AN", 'v': 15, 'optional': true});
        servers.push({'name': "wolfstream", 'shorten': "WS", 'hls': 1, 'headers': jawcloud_header, 'v': 19, 'optional': true});
     //   servers.push({'name': "guccihide", 'shorten': "GH", 'hls': 1, 'headers': jawcloud_header, 'v': 19, 'optional': true}); // same ip as ahvsh
        servers.push({'name': "ahvsh", 'shorten': "GH", 'hls': 1, 'headers': jawcloud_header, 'v': 19, 'optional': true});
        servers.push({'name': "streamtape", 'shorten': "ST", 'rq': 3, 'headers': jawcloud_header, 'v': 19, 'optional': true});//webview
        servers.push({'name': "highstream", 'shorten': "HS", 'hls': 1, 'headers': jawcloud_header, 'v': 19, 'optional': true});
        servers.push({'name': "videahu", 'shorten': "VH", 'rq': 3, 'headers': jawcloud_header, 'v': 19, 'optional': true});//webview
        servers.push({'name': "ok.ru", 'shorten': "OU" , 'rq': 1 , 'v': 39, 'optional': true, 'append_title_to_url': true});//append_title_to_url added in v39
        //external added in v39 when set it will only open the url in browser and do not extract direct urls
        servers.push({'name': "t.me", 'shorten': "TG" , 'v': 39, 'optional': true, 'external': true});
        //webview_player added in v39 when set it will open the video in webview player
        //min_sdk_required added in v39
        servers.push({'name': "uptostream", 'shorten': "UP" , 'v': 39, 'optional': true, 'webview_player': true, 'min_sdk_required': 29});

        return JSON.stringify(servers);
    }
};

var OkCallback = {
    'onSuccess': function (url,content) {
        var server = getServer(url,content);
        return JSON.stringify(server);
    }, 'onError': function (url) {
        var lo = getLocation(url);
        var str = {"type": 996,"url": url,"host": lo.hostname,"urls": [] };
        return JSON.stringify(str);
    }
};

function getServer(url , content){
   if(url.includes("mixdrop")){
        return mixdrop(url,content);
    }
    if(url.includes("mp4upload")){
        return mp4upload(url,content);
    }
    if(url.includes("vidlox")){
        return vidlox(url,content);
    }
    if(url.includes("vidoza")){
        return vidoza(url,content);
    }
    if(url.includes("onlystream")){
        return Onlystream(url,content);
    }
	if(url.includes("vk.com")){
        return vk(url,content);
    }
    if(url.includes("cloudvideo")){
        return cloudvideo(url,content);
    }
    if(url.includes("fembed")){
        return fembed(url,content);
    }
    if(url.includes("jawcloud")){
        return jawcloud(url,content);
    }
    if(url.includes("clipwatching")){
        return clipwatching(url,content);
    }
    if(url.includes("mediafire")){
        return Mediafire(url,content);
    }
    if(url.includes("fastplay")){
        return fasttoplay(url,content);
    }
	if(url.includes("mystream")){
        return MyStream(url,content);
    }
   /* if(url.includes("vidfast")){
        return vidfast(url,content);
    }
    if(url.includes("vidsat")){
        return vidsat(url,content);
    }*/
    if(url.includes("streamvid")){
        return streamvid(url,content);
    }
    if(url.includes("streamhub")){
        return streamhub(url,content);
    }
    if(url.includes("filemoon")){
        return filemoon(url,content);
    }
    if(url.includes("anonfiles")){
        return anonfiles(url,content);
    }
    if(url.includes("highstream")){
        return highstream(url,content);
    }
    if(url.includes("wolfstream")){
        return wolfstream(url,content);
    }
    if(url.includes("guccihide") || url.includes("ahvsh") || url.includes("streamhide")  ){
        return guccihide(url,content);
    }
    if(url.includes("videahu")){
        return videahu(url,content);
    }
    if(url.includes("streamtape")){
        return streamtape(url,content);
    }
    if(url.includes("ok.ru")) {
        return ok(url,content);
    }
}

function ok(url, content) {
    var urls = [];
    var myArr = JSON.parse(content);
    for (i = 0; i < myArr['videos'].length; i++) {
        var link = myArr['videos'][i]['url'];
        if(link) {
            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {
        "type": 996,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}

function Solidfiles(url,content) {
    var urls = [];

    var myRegEx = /streamUrl":"(.*.)","nodeName/g;
    var matches = getMatches(content, myRegEx, 1);
    var  link = matches[0];
    urls.push(link);

    var lo = getLocation(url);
    return {

        "type": 10,
        "url": url,
        "host": lo.hostname,
        "urls": urls

    }
}

function MyStream(url,content) {
    var urls = [];

    var myRegEx = /src="(https:\/\/.*.mstreamcdn\.com.*?\.mp4)">/g;
    var matches = getMatches(content, myRegEx, 1);
    for ( i = 0; i < matches.length; i++) {
        if (matches[i] !== undefined){

            var  link = matches[i];

            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 10,
        "url": url,
        "host": lo.hostname,
        "urls": urls

    }
}

function Mediafire(url,content) {
    var urls = [];

    var myRegEx = /href\s?=\s?.(https?:\/\/download\d{1,6}\.mediafire\.com.*?\.mp4)./g;
    var matches = getMatches(content, myRegEx, 1);
    for ( i = 0; i < matches.length; i++) {
        if (matches[i] !== undefined){

            var  link = matches[i];

            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 0,
        "url": url,
        "host": lo.hostname,
        "urls": urls

    }
}

function fasttoplay(url,content) {
    var urls = [];
    var myRegEx = /file:"(https.*?),.urlset\/master.m3u8"/g;
    var matches = getMatches(content, myRegEx, 1)[0].replace('\\', '');
    var matches2 = matches.split(",")

    for (i = 1; i < matches2.length; i++) {
        var links = matches2[0] + matches2[i] + '/index-v1-a1.m3u8';
        if (links[i] !== undefined && !links.includes("window.jawplayer")) {
            urls.push(links);
            }
        }

    var lo = getLocation(url);

    return {
        "type": 10,
        "url": url,
        "host":lo.hostname,
        "urls": urls

    }
}

function mixdrop(url,content) {
    var urls = [];
    var myRegEx = /\s+?(eval\(function\(p,a,c,k,e,d\).+)\s+?/g;
    var matches = getMatches(content, myRegEx, 1);
    if (detect(matches[0])) {
        var unpacked = unpack(matches[0]);
        var link = "https:" + getMatches(unpacked, /wurl=\"([^\"]+)/g, 1)[0].replace('\\', '');
        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}

function mp4upload(url,content) {
    var urls = [];
    var myRegEx = /script'>(eval.*?).split/g;
    var matches = getMatches(content, myRegEx, 1);
    var m = matches[0] + ".split('|')))";
    if (detect(m)) {
        var unpacked = unpack(m);
        var link = getMatches(unpacked, /src\("([^"]+)/g, 1)[0].replace('\\', '');
        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}
function vidlox(url,content) {
    var urls = [];
    var myRegEx = /sources\s*:\s*\[(.+?)\]/g;
    var matches = getMatches(content, myRegEx, 1);
    var res = matches[0].split("\",\"");
    for (i = 0; i < res.length; i++) {
        var link = res[i].replace("\"","");
        if (link.includes(".mp4")){
            urls.push(link);
        }
    }
    var lo = getLocation(url);
    return {
        "type": 5,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}

function vidoza(url,content) {
    var urls = [];
    var myRegEx = /sourcesCode\s*:\s*\[(.+?)\]/g;
    var matches1 = getMatches(content, myRegEx, 1);
    var matches2 = getMatches(matches1[0], /(["'].*v.mp4)/g, 1);
    var link = matches2[0].replace("\"", "");
    if (link.includes(".mp4")) {
        urls.push(link);
    }

    var lo = getLocation(url);
    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}
function Onlystream(url,content) {
    var urls = [];
    var myRegEx = /(?:updateSrc(?:.*?\"))(.*v.mp4)/g;
    var matches = getMatches(content, myRegEx, 1);
    var link = matches[0];
    if (link.includes(".mp4")) {
        urls.push(link);
    }

    var lo = getLocation(url);
    return {
        "type": 5,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    }
}

function vk(url,content) {
    var urls = [];
    var myRegEx = /<source\s*src=\\"(.*?)\\"/g;
    var matches = getMatches(content, myRegEx, 1);
    for (i = 0; i < matches.length; i++) {
        var link = matches[i].replace(/[\\]/g, '');
        if (link.includes(".mp4")){
            urls.push(link);
        }
    }
    var lo = getLocation(url);
    return {
        "type": 1,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}
function cloudvideo(url,content) {

    var urls = [];
    var myRegEx = /source\ssrc="(https:.*?),(.*?),(.*?),[^"]*|source src="([^"]*)/g;
    var matches = myRegEx.exec(content);
    if (matches[4]){
        if (matches[4].includes("v.mp4")){
            var link = matches[4] ;
            urls.push(link);
            var lo = getLocation(url);
            return {

                "type": 5,
                "url": url,
                "host": lo.hostname,
                "urls": urls
            }
        }else if (matches[4].includes("m3u8")){
            link = matches[4].replace(/,/g,'') ;
            urls.push(link);
            var lo = getLocation(url);
            return {

                "type": 5,
                "url": url,
                "host": lo.hostname,
                "urls": urls
            }
        }

    }else {
        for (i = 2; i < matches.length; i++) {
            link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
            if (!link.includes("undefined")) {
                urls.push(link);
            }
        }
        var lo = getLocation(url);
        return {

            "type": 4,
            "url": url,
            "host": lo.hostname,
            "urls": urls.reverse()
        }
    }
}
function fembed(url,content) {
    var urls = [];
    var myArr = JSON.parse(content);
    for (i = 0; i < myArr['data'].length; i++) {
        var link = myArr['data'][i]['file'];
        if(link) {
            urls.push(link);
        }
    }
    var lo = getLocation(url);
    return {

        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls":  urls.reverse()
    }

}
function jawcloud(url,content) {
    var urls = [];
    var myRegEx = /source\ssrc="(https:.*?),(.*?),(.*?),[^"]*|source src="([^"]*)/g;
    var matches = myRegEx.exec(content);
    if (matches[4]&& matches[4].includes("m3u8")){
       var link = matches[4].replace(/,/g,'') ;
        if (!link.includes("window.jawplayer")) {
            urls.push(link);
        }
    }else {
        for (i = 2; i < matches.length; i++) {
            link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
            if (!link.includes("undefined") && !link.includes("window.jawplayer")) {
                urls.push(link);
            }
        }

    }
    var lo = getLocation(url);
    return {

        "type": 11,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()
    }
}
function clipwatching(url,content) {
    var urls = [];
    var myRegEx =/"(http.*?\/v\.mp4)"/g;
    var matches = getMatches(content, myRegEx, 1);
    for (i = 0; i < matches.length; i++) {
        var link = matches[i];
        urls.push(link);
    }
    var lo = getLocation(url);
    return {
        "type": 4,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}
function vidfast(url,content) {
    var urls = [];

    var myRegEx = /sources:\s\[{file:"(https:.*?),(.*?),(.*?),\.urlset\/master\.m3u8"/g;
    var matches = myRegEx.exec(content);
    for ( i = 2; i < matches.length; i++) {
        var  link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
        if (!link.includes("undefined") && !link.includes("window.jawplayer")) {
            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()

    }
}
function vidsat(url,content) {
    var urls = [];

    var myRegEx = /sources:\s\[{file:"(https:.*?),(.*?),(.*?),\.urlset\/master\.m3u8"/g;
    var matches = myRegEx.exec(content);
    for ( i = 2; i < matches.length; i++) {
        var  link = matches[1] + matches[i] + '/index-v1-a1.m3u8';
        if (!link.includes("undefined") && !link.includes("window.jawplayer")) {
            urls.push(link);
        }
    }

    var lo = getLocation(url);
    return {

        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()

    }
}

function streamvid(url,content) {
    var urls = [];
    var myRegEx = /(eval.*?).split/g;
    var matches = getMatches(content, myRegEx, 1);
    var m = matches[0] + ".split('|')))";
    if (detect(m)) {
        var unpacked = unpack(m);
        const partial = getMatches(unpacked, /src:"([^"]+)/g, 1)[0].replace('\\', '');

        const parts = partial.split(",");
        const link = parts[0] + parts[1] + '/index-v1-a1.m3u8';

        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}

function streamhub(url,content) {
    var urls = [];
    var myRegEx = /script'>(eval.*?).split/g;
    var matches = getMatches(content, myRegEx, 1);
    var m = matches[0] + ".split('|')))";
    if (detect(m)) {
        var unpacked = unpack(m);
        const link = getMatches(unpacked, /src:"([^"]+)/g, 1)[0].replace('\\', '');
        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}

function filemoon(url,content) {
    var urls = [];
    var myRegEx = /script'>(eval.*?).split/g;
    var matches = getMatches(content, myRegEx, 1);
    var m = matches[0] + ".split('|')))";
    if (detect(m)) {
        var unpacked = unpack(m);
        var link = getMatches(unpacked, /file:"(https:.*?)"/g, 1)[0].replace('\\', '');
        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 0,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}

function anonfiles(url, content) {
    var urls = [];

    var myRegEx = /<a\s+[^>]*id="download-url"[^>]*\s+href="([^"]+)"/i;
    var match = content.match(myRegEx);

    if (match) {
        var link = match[1];
        urls.push(link);
    }

    var lo = getLocation(url);
    return {
        "type": 0,
        "url": url,
        "host": lo.hostname,
        "urls": urls
    };
}

function wolfstream(url, content) {
    var urls = [];

    var myRegEx = /file:"(https:\/\/.*?\.m3u8.*?)"/g;
    var match = myRegEx.exec(content);

    if (match) {
        var link = match[1];
        urls.push(link);
    }

    var lo = getLocation(url);
    return {
        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()
    };
}

function guccihide(url,content) {
    var urls = [];
    var myRegEx = /(eval.*?).split/g;
    var matches = getMatches(content, myRegEx, 1);
    var m = matches[0] + ".split('|')))";

    if (detect(m)) {
        var unpacked = unpack(m);
        console.log(unpacked);

        const partial = getMatches(unpacked, /file:"([^"]+)/g, 1)[0].replace('\\', '');

        const parts = partial.split(",");
        const link = parts[0];

        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}

function streamtape(url, content) {
    var urls = [];

    var myRegEx = /streamtape\.com\/get_video\?id=.(.*?)."/g;
    var match = myRegEx.exec(content);

    if (match) {
        var link = match[1];
        link = link.replace(/"/g, '');
        link = "https://streamtape.com/" + link;
        link = link.replace(/&amp;/g, '&');
        urls.push(link);
    }

    var lo = getLocation(url);
    return {
        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": urls.reverse()
    };
}
function highstream(url,content) {
    var urls = [];
    var myRegEx = /(eval.*?).split/g;
    var matches = getMatches(content, myRegEx, 1);
    var m = matches[0] + ".split('|')))";

    if (detect(m)) {
        var unpacked = unpack(m);
        const partial = getMatches(unpacked, /file:\s?"([^"]+)/g, 1)[0].replace('\\', '');

        const parts = partial.split(",");
        const link = parts[0];

        urls.push(link);
    }
    var lo = getLocation(url);

    return {
        "type": 5,
        "url": url,
        "host":lo.hostname,
        "urls": urls
    }
}

function videahu(url, content) {
    var myRegEx = /<video.+?src="([^"]+)"/g;
    var match = myRegEx.exec(content);
    var link = match ? match[1] : null;

    if (link) {
        link = link.replace(/&amp;/g, '&');
        link = link.replace(/<\/?video[^>]*>/g, '');
    }

    var lo = getLocation(url);
    return {
        "type": 7,
        "url": url,
        "host": lo.hostname,
        "urls": link ? [link] : []
    };
}

function getMatches(string,regex,index) {
    index || (index = 1);
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }
    return matches;
}

function getLocation(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        href: href,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    }
}

function detect(str) {
    return (get_chunks(str).length > 0);
}

function get_chunks(str) {
    var chunks = str.match(/eval\(\(?function\(.*?(,0,\{\}\)\)|split\('\|'\)\)\))($|\n)/g);
    return chunks ? chunks : [];
}

function unpack(str) {
    var chunks = get_chunks(str),
        chunk;
    for (var i = 0; i < chunks.length; i++) {
        chunk = chunks[i].replace(/\n$/, '');
        str = str.split(chunk).join(unpack_chunk(chunk));
    }
    return str;
}

function unpack_chunk(str) {
    var unpacked_source = '';
    var __eval = eval;
    if (detect(str)) {
        try {
            eval = function(s) { // jshint ignore:line
                unpacked_source += s;
                return unpacked_source;
            }; // jshint ignore:line
            __eval(str);
            if (typeof unpacked_source === 'string' && unpacked_source) {
                str = unpacked_source;
            }
        } catch (e) {
            // well, it failed. we'll just return the original, instead of crashing on user.
        }
    }
    eval = __eval; // jshint ignore:line
    return str;
}