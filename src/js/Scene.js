/**
 * シーン基本クラス1
 */
class Scene {
	resource = null;
	context = null;
	width = 640;
	height=480;

	constructor()
	{
		this.resource = { "image" : [], "audio" : [] };
	}

	/**
	 * 初期化処理
	 */
	init( con ){
		this.context = con;
	}

	/**
	 * シーンの構成情報読込
	 * @param string path 
	 */
	loadSceneJson( path ){
		//TODO:ロード完了するまで何か処理入れる？
	}

	/**
	 * name要素から画像ハンドルを取得
	 * @param string name 
	 */
	getResImage( idx ){
		return this.resource.image[idx];
	}

	addResImage( path ) {
		let index  = null;
		let res = new Image();
		res.src = path;
		this.resource.image.push( res );
		index = this.resource.image.length - 1;
		return index;
	}

	/**
	 * name要素からオーディオハンドルを取得
	 * @param string name
	 */
	getResAudio( name ) {

	}

	/**
	 * 描画処理
	 * @param 2DContext context 
	 */
	render( context ){

	}

	/**
	 * 1ms秒ごとに呼び出される処理
	 */
	timerProc(){

	}

	keydown() {

	}

}