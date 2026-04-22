    // 常量
    var ANDROID_PACKAGE = 'com.yek.android.kfc.activitys';
    var IOS_APP_ID = '587238847';
	var IOS_APP_STORE_URL = 'https://itunes.apple.com/cn/app/id587238847?l=zh&ls=1&mt=8';
    var APP_SCHEME = 'kfcapplinkurl://menu?action=';
    var WEB_DOWNLOAD_URL = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.yek.android.kfc.activitys';
	
    // 优化后的应用商店映射（已验证的URL格式）
    var storeMap = {
        'huawei': 'hiapplink://com.huawei.appmarket?appId=C10640835',
        'harmony': 'hiapplink://com.huawei.appmarket?appId=C10640835',
        'honor': 'hiapplink://com.huawei.appmarket?appId=C10640835',
        'vivo': 'vivomarket://details?id=' + ANDROID_PACKAGE,
        'oppo': 'oppomarket://details?id=' + ANDROID_PACKAGE,
        'realme': 'oppomarket://details?id=' + ANDROID_PACKAGE,
        'xiaomi': 'mimarket://details?id=' + ANDROID_PACKAGE,
        'redmi': 'mimarket://details?id=' + ANDROID_PACKAGE,
        'samsung': 'samsungapps://ProductDetail/' + ANDROID_PACKAGE,
        'oneplus': 'market://details?id=' + ANDROID_PACKAGE,
        'meizu': 'mstore://details?package_name=' + ANDROID_PACKAGE,
        'other': 'market://details?id=' + ANDROID_PACKAGE
    };

    // 如果应用商店不可用，备选的直接下载链接
    var directStoreMap = {
        'huawei': 'https://appgallery.huawei.com/app/detail?id=com.yumc.kfc.superapp',
        'vivo': 'https://h5.appstore.vivo.com.cn/#/details?pkgname=' + ANDROID_PACKAGE,
        'oppo': 'market://details?id=' + ANDROID_PACKAGE,
        'realme': 'market://details?id=' + ANDROID_PACKAGE,
        'xiaomi': 'https://app.mi.com/details?id=' + ANDROID_PACKAGE,
        'samsung': 'http://apps.samsung.com/appquery/appDetail.as?appId=' + ANDROID_PACKAGE,
        'other': 'https://a.app.qq.com/o/simple.jsp?pkgname=' + ANDROID_PACKAGE
    };

// 导出（支持多种环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { storeMap, directStoreMap, ANDROID_PACKAGE };
}
if (typeof window !== 'undefined') {
    window.storeMap = storeMap;
    window.directStoreMap = directStoreMap;
    window.ANDROID_PACKAGE = ANDROID_PACKAGE;
}
