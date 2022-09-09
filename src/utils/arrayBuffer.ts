console.log('*************ArrayBuffer***************');

// 参数是所需要的内存大小（单位字节）
// 生成了一段 32 字节的内存区域，每个字节的值默认都是 0，也就是32位二进制都为0 ,
const buf = new ArrayBuffer(32);
console.log(buf.byteLength)  //分配的内存区域的字节长度

const dataview = new DataView(buf);

// 建立DataView视图，然后以不带符号的 8 位整数格式，从头读取 8 位二进制数据
// getUint8为偏移量，0表示从第一位开始读取
dataview.getUint8(0);

/*
TypedArray视图，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。

下面建立了两种视图：
32 位带符号整数（Int32Array构造函数）
8 位不带符号整数（Uint8Array构造函数）。

由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图
*/
const x1 = new Int32Array(buf);
x1[0] = 1;
const x2 = new Uint8Array(buf);
x1[0] = 2;

console.log(x1[0]); //输出2
console.log(dataview.getUint8(0));

console.log('*************ArrayBuffer***************');
