# EtherCAT EEPROM 生成器

这是 MetalMusings 离线生成器的中文版本，可配置 EtherCAT 从站控制器（ESC）、对象字典、PDO 映射和同步模式。[上游源码](https://github.com/MetalMusings/MyOwnEtherCATDevice/tree/9cc9a41ea295bb15ffc30a4ed8659df9139244d0/Utils/EEPROM_generator)

## 离线使用

1. 下载并解压整个仓库，用浏览器打开 [index.html](index.html)。
2. 填写设备配置，或点击「打开项目」导入 `esi.json`。
3. 核对对象字典、PDO 和同步模式，然后点击「下载全部文件」。

| 文件 | 用途 |
| --- | --- |
| ESI XML | 导入 EtherCAT 主站 |
| `eeprom.bin`、`eeprom.hex` | 按所选 ESC 的方式写入 EEPROM |
| `objectlist.c`、`utypes.h`、`ecat_options.h` | 编译 SOES 固件 |
| `esi.json` | 下次打开项目时恢复配置 |

生成器会为 TxPDO 和 RxPDO 生成固定映射及同步管理器分配。调整配置后，从同一个项目导出整套文件，避免主站、EEPROM 和固件的配置混用。

「保存项目」可单独下载 JSON。生成器也会在浏览器本地保存最近使用的配置。

## 项目备份

当前版本用布尔值记录 CoE 复选框。旧版 JSON 也可以导入，其 CoE 复选框使用默认值。打开旧项目后可在页面上核对这些选项，再保存一份新备份。

## 开发与测试

生成器使用 HTML、CSS 和 JavaScript，所需库随仓库分发。在浏览器打开 [tests.html](tests.html) 即可运行 Jasmine 测试。

对象字典分为 `sdo`、`txpdo` 和 `rxpdo`。生成时会根据设备配置补齐必需对象以及 PDO 映射和分配。可在页面中编辑变量、数组和记录，并核对导出结果中的数据类型与位宽。

## 许可

本项目沿用上游的 [GPL v2 许可及其例外条款](LICENSE)。EtherCAT 技术、商号及标识归 Beckhoff Automation GmbH 所有。
