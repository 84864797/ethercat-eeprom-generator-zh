# EtherCAT EEPROM 生成器

这是 MetalMusings 离线版生成器的中文界面，基于上游提交 `9cc9a41ea295`。它可以配置 EtherCAT 从站控制器（ESC）、对象字典（OD）、PDO 映射和分布式时钟（DC）。[MetalMusings 源码](https://github.com/MetalMusings/MyOwnEtherCATDevice/tree/9cc9a41ea295bb15ffc30a4ed8659df9139244d0/Utils/EEPROM_generator)

2026-11-26 汉化了网页界面、提示、报错和使用说明，并修正了深色模式下的表格文字。项目许可见 [LICENSE](LICENSE) 和 [GPL 第 2 版正文](COPYING)。

## 离线使用

1. 下载本仓库并解压，保留目录结构。
2. 用浏览器打开 [index.html](index.html)。
3. 在页面底部点击「打开项目」选择已有的 `esi.json`，或直接填写配置。
4. 核对配置后点击「下载全部文件」。压缩包包含 ESI XML、EEPROM 的 `.bin` 和 `.hex`、`objectlist.c`、`utypes.h`、`ecat_options.h` 及项目备份 `esi.json`。

「保存项目」可以单独下载 JSON 备份。生成器也会在浏览器本地保存最近使用的配置。

## 限制

- TxPDO 和 RxPDO 各支持一个固定映射表。
- 部分数据类型不受支持。

## 开发与测试

生成器由 HTML、CSS 和 JavaScript 组成，可以直接在浏览器运行。可在「设置」中打开 [单元测试](tests.html)，由随附的 Jasmine 执行。

## 对象字典结构

对象字典用 JSON 对象表示。格式示例如下。

```js
{
    '1000': { otype: OTYPE.VAR, dtype: DTYPE.UNSIGNED32, name: 'Device Type', value: 0x1389 },
    '1008': { otype: OTYPE.VAR, dtype: DTYPE.VISIBLE_STRING, name: 'Device Name', data: '' },
    '1009': { otype: OTYPE.VAR, dtype: DTYPE.VISIBLE_STRING, name: 'Hardware Version', data: '' },
    '100A': { otype: OTYPE.VAR, dtype: DTYPE.VISIBLE_STRING, name: 'Software Version', data: '' },
    '1018': { otype: OTYPE.RECORD, name: 'Identity Object', items: [
        { name: 'Max SubIndex' },
        { name: 'Vendor ID', dtype: DTYPE.UNSIGNED32, value: 600 },
        { name: 'Product Code', dtype: DTYPE.UNSIGNED32 },
        { name: 'Revision Number', dtype: DTYPE.UNSIGNED32 },
        { name: 'Serial Number', dtype: DTYPE.UNSIGNED32, data: '&Obj.serial' },
    ]},
    '1C00': { otype: OTYPE.ARRAY, dtype: DTYPE.UNSIGNED8, name: 'Sync Manager Communication Type', items: [
        { name: 'Max SubIndex' },
        { name: 'Communications Type SM0', value: 1 },
        { name: 'Communications Type SM1', value: 2 },
        { name: 'Communications Type SM2', value: 3 },
        { name: 'Communications Type SM3', value: 4 },
    ]},
}   
```

生成器的对象字典包含四部分。

- `sdo` 保存未映射到 PDO 的对象。
- `txpdo` 映射到 TxPDO（SM3）。以下是 VAR 对象格式。
```js
{
    '6000': { otype: OTYPE.VAR, dtype: DTYPE.UNSIGNED32, name: 'TXPDO', value: 0x1389, pdo_mappings: ['tx'] },
}
```
- `rxpdo` 格式相同，`pdo_mappings` 使用 `['rx']`。
- 必需对象在生成时添加，其值来自表单。

生成时会合并对象字典并添加 PDO 映射及同步管理器分配。

## PDO 映射

TxPDO 和 RxPDO 各使用一个固定映射表。

## Windows 二进制文件比较工具 [VBinDiff](https://www.cjmweb.net/vbindiff/VBinDiff-Win32)

```cmd
VBinDiff et1100.bin  lan9252.bin
```


## 上游待办事项

- 支持 64 位数值类型
- 生成 EEPROM 仿真用的头文件
- 支持 LAN9253 Direct、XMC4300 和 XMC4800
- 检查布尔数组的输出
- 检查可见字符串数组的输出
- 检查记录中可见字符串子项的输出
- 支持动态 PDO 和多个 PDO
- 补充单元测试
- SDK 始终以 SDO 0x1600 生成 RxPDO 映射。SM2 偏移会影响以下输出。
    - `ecat_options.h` #define SM2_sma, MAX_TXPDO_SIZE and MAX_RXPDO_SIZE
    - `esi.xml` `<Sm ControlByte="#x24" Enable="1" StartAddress="#x1600">Outputs</Sm>`
    生成器目前沿用 SDK 的行为。仍需确认这一点是否必要。
- 根据所选 SM2 偏移计算 `MAX_RXPDO_SIZE` 和 `MAX_TXPDO_SIZE`
- 支持模块化设备行规
- 从设备名称设置项目名称
- 在 EEPROM 二进制镜像中配置分布式时钟

- 使用 XML API 构建 ESI XML
- 支持读取已有的 ESI XML
- 在对象字典模型中添加索引列表，减少参数传递
- CiA DS301 要求提供 `0x1001` 的 UINT8 错误寄存器
- 0x1C12/0x1C13 `PdoAssign` and 0x1608/0x1A08 `PdoMapping` [应支持读写](https://infosys.beckhoff.com/english.php?content=../content/1033/el6695/1317558667.html&id=)

### 代码优化

- 验证复用对象字典的名称字符串能否减少产物尺寸，并检查编译器是否已合并相同的常量

## 商标声明

EtherCAT 技术、EtherCAT 商号及标识属于 Beckhoff Automation GmbH 的知识产权，受相关法律保护。
