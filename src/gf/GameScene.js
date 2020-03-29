/**
 * ゲームシーン
 */
const game_mode_first = 0;
const game_mode_wait = 1;
const game_mode_countdown = 2;
const game_mode_play = 3;
class GameScene extends Scene {
	step = 0;
	mode = 0;
	img_bg = -1;

	constructor() {
		super();
		this.img_bg = this.addResImage('./img/gamelayer.png');
		this.img_btnSpace = this.addResImage('./img/btnSpace.png');
		this.img_block = this.addResImage('./img/block.png');
		this.step = 0;
		this.mode = 0;
	}

	timerProc() {
		switch( this.mode ) {
			case game_mode_first:
				this.step ++;
				if( this.step > 500 ) {
					this.setMode( game_mode_wait );
				}
				break;

			case 1:
				this.step ++;
				if( this.step > 250 ) {
					this.step -= 250;
				}
				break;
		}
	}

	render( context ) {
		switch( this.mode ) {
			case 0:
				this.start_fede( context );
				break;

			case 1:
				this.button_wait( context );
				break;
		}
	}

	keydown( event ) {
		console.log( event );
		if( this.mode == 1 ) {

		}
	}

	setMode( mode ) {
		this.mode = mode;
		this.step = 0;
	}

	/**
	 * mode = 0 の描画処理
	 * @param {*} context 
	 */
	start_fede( context ) {
		//白塗り初期化
		context.fillStyle = "white";
		context.fillRect(0,0,this.width,this.height);

		context.globalAlpha =  (1.0/500) * this.step;
		context.drawImage( this.getResImage( this.img_bg ), 0, 0 );
	}

		/**
	 * mode = 1の描画処理
	 * @param {*} context 
	 */
	button_wait( context ) {
		context.fillStyle = "white";
		context.fillRect( 0, 0, this.width, this.height );

		context.globalAlpha = 1.0;
		context.drawImage( this.getResImage( this.img_bg ), 0, 0 );

		if( this.step < 125  ) {
			context.drawImage( this.getResImage( this.img_btnSpace ), 320-50, 240 );
		}
	}
}