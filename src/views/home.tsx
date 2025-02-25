import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import type { Viewer } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css'; // 引入Cesium的CSS样式

const CesiumComponent = () => {
    const cesiumRef = useRef(null);
    const viewerRef = useRef<Viewer | null>(null);

    useEffect(() => {
        if (!viewerRef.current) {
            // 初始化Cesium Viewer
            viewerRef.current = new Cesium.Viewer('cesiumContainer', {
                selectionIndicator: false,
                animation: false,
                baseLayerPicker: false,
                geocoder: false,
                timeline: false,
                sceneModePicker: false,
                navigationHelpButton: false,
                infoBox: false,
                fullscreenButton: false,
                homeButton: false,
            });
            const gdRoadProvider = new Cesium.UrlTemplateImageryProvider({
                url: 'https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}&scl=1<ype=2',
            });
            const gdRoadLayer = new Cesium.ImageryLayer(gdRoadProvider);
            viewerRef.current.imageryLayers.add(gdRoadLayer);
            viewerRef.current.scene.globe.depthTestAgainstTerrain = true;
            viewerRef.current.scene.debugShowFramesPerSecond = true;
            const center = Cesium.Cartesian3.fromDegrees(116.273487, 40.047305, 2000);
            viewerRef.current.camera.setView({
                // flyTo
                destination: center,
                orientation: {
                    heading: Cesium.Math.toRadians(0),
                    pitch: Cesium.Math.toRadians(-60),
                    roll: Cesium.Math.toRadians(0),
                },
                // duration: 3
            });
        }
        return () => {
            if (viewerRef.current) {
        // 组件卸载时销毁Viewer
        viewerRef.current!.destroy();
        viewerRef.current = null;
            }
        };
    }, []); // 空依赖数组表示只在组件挂载时运行一次
    return (
        <div ref={cesiumRef} className="w-full h-full" id="cesiumContainer" />
    );
};

export default CesiumComponent;
