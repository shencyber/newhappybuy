// 从URL获取weidian_id参数
const getWeidianIdFromUrl = () => new URLSearchParams(window.location.search).get('weidian_id');

// 发送跟踪数据（每次都生成新指纹）
const sendTrack = async (data) => {
    try {
        const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v3/esm.min.js');
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        
        window.trackApi.sendTrack({
            ...data,
            visitor_id: result.visitorId
        });
    } catch (error) {
        console.error('跟踪失败:', error);
    }
};

// 页面浏览跟踪
sendTrack({ event_type: 'view', weidian_id: getWeidianIdFromUrl() });

// 点击事件跟踪
document.addEventListener('click', (e) => {
    if (e.target.id === 'buy-btn' || e.target.closest('#buy-btn')) {
        sendTrack({ event_type: 'click', weidian_id: getWeidianIdFromUrl() });
    }
});