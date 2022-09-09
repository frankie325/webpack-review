// 文件操作

console.log('*************文件操作***************');

// 1.Blob的
let data1 = 'a';
let data2 = 'b';
let data3 = "<div style='color:red;'>This is a blob</div>";
let data4 = { name: 'abc' };

/*
Blob的第一个参数为数组对象 BlobParts[] <==> (ArrayBufferView | ArrayBuffer | Blob | string)[];
Blob的第二个参数为是一个可选的BlobPropertyBag字典
interface BlobPropertyBag {
    endings?: EndingType; //（值为native | transparent） 行结束符\n的字符串如何被写入，native：表示结束符更改为操作系统文件系统的换行符。transparent：保持不变
    type?: string; // 默认值为 ""，它代表了将会被放入到 blob 中的数组内容的 MIME 类型
}
*/

var blob1 = new Blob([data1]);
var blob2 = new Blob([data1, data2]);
var blob3 = new Blob([data3]);
var blob4 = new Blob([JSON.stringify(data4)]);
// var blob5 = new Blob([data4]);
// var blob6 = new Blob([data3, data4]);

// size表示字节数
console.log(blob1); //输出：Blob {size: 1, type: ""}
console.log(blob2); //输出：Blob {size: 2, type: ""}
console.log(blob3); //输出：Blob {size: 44, type: ""}
console.log(blob4); //输出：Blob {size: 14, type: ""}

// 通过slice方法可以从blob中创建出一个新的blob对象，因此我们可以调用slice方法对大文件进行分片上传
let str = 'abcdef';
let blob5 = new Blob([str]);
let blob6 = blob5.slice(0, 3);

console.log(blob5); //输出：Blob {size: 6, type: ""}
console.log(blob6); //输出：Blob {size: 3, type: ""}


// 使用场景
let blob = new Blob(['Hello world'], {
  type: 'text/xml',
});
let a = document.createElement('a');
a.href = window.URL.createObjectURL(blob);
a.download = 'hello-world.txt';
a.textContent = '点击我，可以生产一个hello-word.txt的文件';
document.body.appendChild(a);

console.log('*************文件操作***************');
