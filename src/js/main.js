/**
 * miniPaint - https://github.com/viliusle/miniPaint
 * author: Vilius L.
 */

//css
import './../css/reset.css';
import './../css/utility.css';
import './../css/component.css';
import './../css/layout.css';
import './../css/menu.css';
import './../css/print.css';
import './../../node_modules/alertifyjs/build/css/alertify.min.css';
//js
import app from './app.js';
import config from './config.js';
import './core/components/index.js';
import Base_gui_class from './core/base-gui.js';
import Base_layers_class from './core/base-layers.js';
import Base_tools_class from './core/base-tools.js';
import Base_state_class from './core/base-state.js';
import Base_search_class from './core/base-search.js';
import File_open_class from './modules/file/open.js';
import File_save_class from './modules/file/save.js';
import * as Actions from './actions/index.js';

window.addEventListener('load', function (e) {
	// Initiate app
	var Layers = new Base_layers_class();
	var Base_tools = new Base_tools_class(true);
	var GUI = new Base_gui_class();
	var Base_state = new Base_state_class();
	var File_open = new File_open_class();
	var File_save = new File_save_class();
	var Base_search = new Base_search_class();

	// Register singletons in app module
	app.Actions = Actions;
	app.Config = config;
	app.FileOpen = File_open;
	app.FileSave = File_save;
	app.GUI = GUI;
	app.Layers = Layers;
	app.State = Base_state;
	app.Tools = Base_tools;

	// Register as global for quick or external access
	window.Layers = Layers;
	window.AppConfig = config;
	window.State = Base_state;
	window.FileOpen = File_open;
	window.FileSave = File_save;

	// Render all
	GUI.init();
	Layers.init();
	setTimeout(() => {
		addImageOnInit(Layers)
	}, 300);
	// 在这里调用addImageOnInit函数
}, false);
function addImageOnInit(Layers, imageData) {
	try {
		window.addEventListener('message', async (event) => {
      console.log('event', event);

			// 检查消息来源以提高安全性
			// if (event.origin !== 'http://192.168.0.105:8080/') return;

			if (event.data && event.data.type === 'imageData') {
				const imageData = event.data.data;
				console.log('Received image data in iframe:', imageData);
				// 在这里处理接收到的图片数据，例如显示在 <img> 标签中
				// 创建一个新的图片图层
				var params = {
					type: 'image',
					data: imageData || './src/js/image.png',  // 修改为正确的路径
					x: 0,
					y: 0,
					width: 270,             // 可选
					height: 129             // 可选
				};
				await Layers.insert(params);
				// await window.Layers.insert(params);
				console.log('图片已成功添加到画布');
			}
		});

	} catch (error) {
		console.error('添加图片失败:', error);
		// 可以在这里添加备用方案
	}
}
// 在window.addEventListener('load', function (e) {...})函数后添加
window.addImageOnInit = addImageOnInit;