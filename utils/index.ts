import utfx from "./utfx.js";
class FileStreamFileReader {
    private fs: FileReader
    constructor() {
        this.fs = new FileReader()
        this.fs.readAsArrayBuffer
        this.fs.readAsDataURL
        this.fs.readAsText
        this.fs.readAsBinaryString
    }

    async readAsArrayBuffer(file: File | Blob) {
        return new Promise<ArrayBuffer>(ok => {
            this.fs.onload = () => ok(this.fs.result as ArrayBuffer);
            this.fs.readAsArrayBuffer(file);
        })
    }

    async readAsDataURL(file: File | Blob) {
        return new Promise<string>(ok => {
            this.fs.onload = () => ok(this.fs.result as string);
            this.fs.readAsDataURL(file);
        })
    }

    async readAsText(file: File | Blob) {
        return new Promise<string>(ok => {
            this.fs.onload = () => ok(this.fs.result as string);
            this.fs.readAsText(file);
        })
    }

    async readAsBinaryString(file: File | Blob) {
        return new Promise<string>(ok => {
            this.fs.onload = () => ok(this.fs.result as string);
            this.fs.readAsBinaryString(file);
        })
    }

}
export default class FileStream {
    static FileReader = FileStreamFileReader

    static StringSource(str: string) {
        let i = 0;
        return () => i < str.length ? str.charCodeAt(i++) : null;
    }

    static StringToBase64(str: string) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    static Base64ToString(str: string) {
        return decodeURIComponent(escape(atob(str)));
    }

    /** Base64转Blod */
    static Base64ToBlob(dataurl: string) {
        let arr = dataurl.split(',');
        //注意base64的最后面中括号和引号是不转译的   
        let _arr = arr[1].substring(0, arr[1].length - 2);
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = FileStream.Base64ToString(_arr)
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    /** 将二进制文件流转成字符串 */
    static ArrayBuffterToString(buffer: ArrayBuffer): string {
        let view = new DataView(buffer)
        let Strlength = view.getUint32(0);
        let offset = 4;
        let result = []; // Unicode编码字符
        let end = offset + Strlength;
        utfx.decodeUTF8toUTF16(() => offset < end ? view.getUint8(offset++) : null, (char: string) => {
            result.push(char);
        });
        return result.reduce((prev, next) => prev + String.fromCharCode(next), '');
    }
    /** 字符串转二进制流 */
    static StringToArrayBuffter(str: string) {
        let strCodes = FileStream.StringSource(str);
        let length = utfx.calculateUTF16asUTF8(strCodes)[1];
        let buffer = new ArrayBuffer(length + 4); // 初始化长度为UTF8编码后字符串长度+4个Byte的二进制缓冲区
        let view = new DataView(buffer);
        let offset = 4;
        view.setUint32(0, length); // 将长度放置在字符串的头部
        utfx.encodeUTF16toUTF8(FileStream.StringSource(str), (b: number) => {
            view.setUint8(offset++, b);
        });
        return buffer;
    }

    /** 打开文件 */
    static async OpenFileList(opt?: IC<{ accept: string, type: string[] }>) {
        opt = opt || {}
        let _opt = { accept: '*', type: [] };
        for (let i in opt) {
            _opt[i] = opt[i];
        }
        return new Promise<File[]>(ok => {
            let input = document.createElement("input");
            input.type = "file";
            input.accept = _opt.accept;
            input.multiple = true;
            input.style.display = 'none';
            input.addEventListener('change', () => {
                ok(Array.from(input.files))
                document.body.removeChild(input);
            });
            document.body.appendChild(input);
            input.click();
        })
    }


    /** 打开文件 */
    static async OpenFile<T extends keyof FileStreamOpenType>(openType: T, opt?: IC<{ accept: string, type: string[] }>) {
        opt = opt || {}
        let _opt = { accept: '*', type: [] };
        for (let i in opt) {
            _opt[i] = opt[i];
        }
        return new Promise<FileStreamOpenType[T]>(ok => {
            let input = document.createElement("input");
            input.type = "file";
            input.accept = _opt.accept
            input.style.display = 'none';
            input.addEventListener('change', () => {
                if (openType !== "Blob") {
                    let fs = new FileReader() as any;
                    fs.onload = () => ok(fs.result);
                    fs[openType](input.files[0]);
                }
                else
                    ok(input.files[0] as any)
                document.body.removeChild(input);
            });
            document.body.appendChild(input);
            input.click();
        })
    }

    /** 读取二进制文件文件 */
    static async OpenArrayBuffterFileAsText() {
        let buffer = await FileStream.OpenFile("readAsArrayBuffer");
        return FileStream.ArrayBuffterToString(buffer);
    }

    /**保存文件流*/
    static async SaveAsStream(string: string, name = "文件.bin") {
        let buffer = FileStream.StringToArrayBuffter(string);
        FileStream.SaveAs(name, buffer, ApplicationDataType.bin);
    }
    /** 保存文件 */
    static SaveAs(name: string, buffer: string | ArrayBuffer | Blob, type?: ApplicationDataType) {
        let bool = buffer instanceof Blob;
        let data: Blob = bool ? buffer as Blob : new Blob([buffer], { type });
        let URL = window.URL || (<any>window).webkitURL;
        let downloadUrl = URL.createObjectURL(data);
        let anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = name;
        anchor.click();
        URL.revokeObjectURL(data);
    }
}

export const FileTypeMap = {
    'application/zip': 'zip',
    'audio/mpeg': 'mp3',
    'audio/x-wav': 'wav',
    'image/bmp': 'bmp',
    'image/gif': 'gif',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'text/plain': 'txt',
    'video/mpeg': 'mpg',
    'video/x-msvideo': 'avi',
    'video/x-sgi-movie': 'movie',
    'video/mp4': 'mp4',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
}

export enum ApplicationDataType {
    doc = 'application/msword',
    bin = 'application/octet-stream',
    exe = 'application/octet-stream',
    so = 'application/octet-stream',
    dll = 'application/octet-stream',
    pdf = 'application/pdf',
    ai = 'application/postscript',
    xls = 'application/vnd.ms-excel',
    ppt = 'application/vnd.ms-powerpoint',
    dir = 'application/x-director',
    js = 'application/x-javascript',
    swf = 'application/x-shockwave-flash',
    xhtml = 'application/xhtml+xml',
    xht = 'application/xhtml+xml',
    zip = 'application/zip',
    mid = 'audio/midi',
    midi = 'audio/midi',
    mp3 = 'audio/mpeg',
    rm = 'audio/x-pn-realaudio',
    rpm = 'audio/x-pn-realaudio-plugin',
    wav = 'audio/x-wav',
    bmp = 'image/bmp',
    gif = 'image/gif',
    jpeg = 'image/jpeg',
    jpg = 'image/jpeg',
    png = 'image/png',
    css = 'text/css',
    html = 'text/html',
    htm = 'text/html',
    txt = 'text/plain',
    xsl = 'text/xml',
    xml = 'text/xml',
    mpeg = 'video/mpeg',
    mpg = 'video/mpeg',
    avi = 'video/x-msvideo',
    movie = 'video/x-sgi-movie'
}

export interface FileStreamOpenType {
    readAsText: string
    readAsDataURL: string
    readAsBinaryString: string
    readAsArrayBuffer: ArrayBuffer
    Blob: Blob | File
}
