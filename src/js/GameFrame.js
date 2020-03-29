/**
 * ゲームフレーム
 */
class GameFrame {
	screen = null;
	buf = null;
	disp_width = 640;
	disp_height = 480;
	scene = null;

	constructor( scene ) {
		//const dpr = window.devicePixelRatio || 1;
		this.screen = document.getElementById('game_display');
		this.buf = document.getElementById('buff');
		this.setScene( scene );
	}

	/**
	 * レンダリング関数
	 */
	render() {
		let buf_con = this.buf.getContext('2d');
		if( this.scene ) {
			this.scene.render( buf_con );
		}

		//ダブルバッファ処理
		//http://k5.hatenablog.com/entry/20111014/1318558535
		let img = buf_con.getImageData( 0, 0, this.disp_width, this.disp_height );
		this.screen.getContext('2d').putImageData( img, 0, 0 );
	}

	keydown( event ){
		if( this.scene ) {
			this.scene.keydown( event );
		}
	}

	timerProc() {
		if( this.scene ) {
			this.scene.timerProc();
		}
	}

	setScene( scene ) {
		this.scene = scene;
		scene.init();
	}
}

var gf = new GameFrame( new TitleScene() );
//var gf = new GameFrame( new GameScene() );

/**
 * GameFrameタイマーイベントトリガー関数
 */
function TimerEvent(){
	if( gf ) { gf.timerProc(); }
	setTimeout( TimerEvent, 1 );
}

/**
 * アニメイベントトリガー
 */
function AnimeEvent() {
	if( gf ) { gf.render(); }
	requestAnimationFrame( AnimeEvent );
}

function KeyDown( event ) {
	if( gf ) {
		gf.keydown( event );
	}
}

//タイマーイベントスタート
TimerEvent();
AnimeEvent();

//キーボードイベント
document.onkeydown = KeyDown;