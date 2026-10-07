---
cover: 'https://gitee.com/lacsgf/img/raw/master/OIP-C.S8kbDtSRUlR60KgcDAbJogHaDU'
categories: 玩机教程
tags:
  - adb
  - fastboot
date: '2025-02-23 00:00:00'
catalog:
  - 玩机教程
permalink: adb_fastboot/
title: adb_fastboot
updated: '2025-02-24 10:19:00'
---

# ADB（Android Debug Bridge）相关


## 1.ADB简介


`adb`（Android Debug Bridge 直译为**安卓调试桥**）是一个功能强大的命令行工具，主要用于与Android设备进行交互。它可以在多种情况下使用，但是否可以用于关机操作取决于设备的系统权限和当前状态。


## 2.**ADB 使用方法**

1. **设备连接状态**
	- `adb` 需要设备通过 USB 连接或通过网络连接到计算机或其他移到设备。
	- 设备必须启用“开发者选项”中的“USB 调试”功能。
	- 如果设备已连接到网络，也可以通过 `adb tcpip` 命令进行无线调试。
2. **设备状态**
	- 设备必须处于正常启动状态，即系统已经加载并运行。
	- 如果设备处于 Recovery 模式或 Fastboot 模式，`adb` 的功能会受到限制。

## 3.ADB 常用指令


### 1. **设备连接与状态**

- `adb devices`：列出已连接的设备。
- `adb get-state`：获取设备状态（如 `device`、`offline`）。
- `adb connect <IP:端口>`：远程连接设备。
- `adb disconnect <IP:端口>`：断开设备连接。

### 2. **设备操作**

- `adb reboot`：重启设备至系统。
- `adb reboot bootloader`：重启设备至 Fastboot 模式。
- `adb reboot recovery`：重启设备至 Recovery 模式。
- `adb reboot edl`：重启设备至 EDL 模式（高通）。
- `adb reboot fastboot`: 重启设备至fastbootd模式。

### 3. **文件传输**

- `adb push <电脑文件路径> <设备目录>`：将文件从电脑传输到设备。
- `adb pull <设备文件路径> <电脑目录>`：将文件从设备传输到电脑。

### 4. **应用管理**

- `adb install <APK路径>`：安装 APK。
- `adb install -r <APK路径>`：覆盖安装 APK。
- `adb uninstall <包名>`：卸载应用。
- `adb uninstall -k <包名>`：卸载应用但保留数据。
- `adb shell pm list packages`：列出所有应用包名。
- `adb shell pm list packages -3`：列出第三方应用包名。

### 5. **系统信息**

- `adb shell getprop` ：获取设备的全部信息。
- `adb shell getprop ro.product.model`：获取设备型号。
- `adb get-serialno`：获取设备序列号。
- `adb shell dumpsys meminfo <包名>`：查看应用内存使用情况。
- `adb shell cat /proc/cpuinfo`：获取 CPU 信息。

### 6. **其他**

- `adb logcat`：查看设备日志。
- `adb shell`：进入设备 Shell。
- `adb root`：以 root 权限运行。
- `adb remount`：重新挂载文件系统。

---


# Fastboot 相关


## 1.FASTBOOT简介


Fastboot 是一个功能强大的工具，主要用于 Android 设备的低级别操作，如刷机、解锁 Bootloader、分区管理等。它通过命令行与设备的 Bootloader 交互，广泛应用于系统更新、故障排除和自定义 ROM 安装。


## 2.FASTBOOT使用方法

- **通过命令**：使用 `adb reboot bootloader`。
- **通过按键**：根据设备型号，通常按住音量减键（Vol-）+ 电源键开机。

	​ 小米设备为音量-和电源。


## 3.FASTBOOT常用指令


### 1. **设备连接与状态**

- `fastboot devices`：列出已连接的 Fastboot 设备。
- `fastboot getvar all`：获取设备详细信息。

### 2. **设备操作**

- `fastboot reboot`：重启设备。
- `fastboot reboot-bootloader`：重启到 Bootloader 模式。

### 3. **分区操作**

- `fastboot flash <分区名> <文件路径>`：烧录/刷入分区（如 `boot`、`system`、`recovery`）。
- `fastboot erase <分区名>`：擦除分区。
- `fastboot format <分区名>`：格式化分区。

### 4. **解锁与安全（不要乱用，每个品牌都有不同的方式）**

- `fastboot flashing unlock` 或 `fastboot oem unlock`：解锁 Bootloader。
- `fastboot flashing lock` 或 `fastboot oem lock`：锁定 Bootloader。

# 如何在 Windows、macOS 、Linux 系统中使用 ADB 和 Fastboot指令


## **注意事项**

1. **设备兼容性**：不同设备可能需要特定的 USB 驱动程序或配置。
2. **备份数据**：在进行刷机或解锁操作前，建议备份设备数据。
3. **权限问题**：在 Linux 和 macOS 上，可能需要使用 `sudo` 来运行某些命令。

## **1. Windows 系统**


### **1.1 安装 ADB 和 Fastboot**

1. **下载平台工具**：
	- 访问 [Android SDK Platform-Tools](https://developer.android.google.cn/tools/releases/platform-tools?hl=zh-cn) 页面，下载最新版本的 `platform-tools.zip`。
	- 或点击https://pan.quark.cn/s/e8b98954568a，快速下载。
	- 解压下载的文件到一个方便访问的目录，例如 `C:\adb`。
2. **安装驱动程序**：
	- 对于某些设备，可能需要安装额外的 USB 驱动程序。可以从设备制造商的官方网站下载。
3. **配置环境变量（可选）**：
	- 将 ADB 和 Fastboot 的路径（例如 `C:\adb`）添加到系统的环境变量中，这样可以在任何位置运行命令。

### **1.2 使用 ADB 和 Fastboot**

1. **打开命令提示符或 PowerShell**：
	- 在文件夹中按 `Shift + 右键`，选择“在此处打开 PowerShell 窗口”。
	- 如果未添加环境变量，需要在命令前加上路径，例如 `.\adb devices`。

---


## **2. macOS 系统**


### **2.1 安装 ADB 和 Fastboot**

1. **使用 Homebrew 安装**：
	- 安装 Homebrew（如果尚未安装）。
	- 在终端中运行以下命令安装 ADB 和 Fastboot：

		bash复制


		```shell
		brew install --cask android-platform-tools
		```

	- 安装完成后，ADB 和 Fastboot 工具将位于 `/usr/local/bin`。
2. **验证安装**：
	- 检查 ADB 版本：`adb version`。
	- 检查 Fastboot 版本：`fastboot version`。

### **2.2 使用 ADB 和 Fastboot**

1. **检查设备连接**：
	- 启用设备的 USB 调试模式，然后运行 `adb devices`。
	- 进入 Fastboot 模式：`adb reboot bootloader`。
	- 在 Fastboot 模式下检查设备：`fastboot devices`。

---


## **3. Linux 系统**


### **3.1 安装 ADB 和 Fastboot**

1. **下载平台工具**：
	- 访问 [Android SDK Platform-Tools](https://developer.android.com/studio/releases/platform-tools) 页面，下载最新版本的 `platform-tools.zip`。
	- 解压文件到一个目录，例如 `~/Android/Sdk/platform-tools`。
2. **配置 udev 规则（可选）**：
	- 创建或编辑 `/etc/udev/rules.d/70-android.rules` 文件，添加设备的 USB 规则：

		bash复制


		```shell
		SUBSYSTEM=="usb", ATTR{idVendor}=="0e8d", MODE="0666"
		```

	- 重新加载 udev 规则：`sudo udevadm control --reload-rules`。

### **3.2 使用 ADB 和 Fastboot**

1. **检查设备连接**：
	- 启用设备的 USB 调试模式，然后运行 `./adb devices`。
	- 进入 Fastboot 模式：`./adb reboot bootloader`。
	- 在 Fastboot 模式下检查设备：`./fastboot devices`。
2. **刷机操作**：
