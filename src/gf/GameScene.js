/**
 * ゲームシーン
 * TODO:ゲームーオーバー処理
 * TODO:LINE消し判定に違和感あり
 * TODO:LINE消し処理時に両端の描画に残像が残る(特に上の箇所)
 * TODO:LINE消し処理後に両端のブロック移動判定にブロックがめり込む不具合あり
 */
const game_mode_first = 0;
const game_mode_wait = 1;
const game_mode_countdown = 2;
const game_mode_play = 3;
const game_mode_gameover = 4;
class GameScene extends Scene {
	step = 0;
	mode = 0;
	img_bg = -1;

	/**
	 * 次のブロック
	 */
	next = null;

	/**
	 * ストックのブロック
	 */
	stock = null;

	/**
	 * Playerがコントロールするブロック
	 */
	player = null;

	/**
	 * フィールド
	 */
	field = null;

	constructor() {
		super();
		this.img_bg = this.addResImage('./img/gamelayer.png');
		this.img_btnSpace = this.addResImage('./img/btnSpace.png');
		this.img_block = this.addResImage('./img/block.png');
		this.step = 0;
		this.mode = 0;
		this.field = new field();

		this.next = new tetrimino();
		this.next.offset_x = 462;
		this.next.offset_y = 81 + 20;
		this.next.createNext();

		this.stock = new tetrimino();
		this.stock.offset_x = 102;
		this.stock.offset_y = 81 + 20;

		this.player = new player();
		this.player.offset_x = 222;
		this.player.offset_y = 61;
		this.player.setMino( this.next.copy() );
		this.next.createNext();
	}

	timerProc() {
		switch( this.mode ) {
			case game_mode_first:
				this.step ++;
				if( this.step > 500 ) {
					this.setMode( game_mode_wait );
				}
				break;

			case game_mode_wait:
				this.step ++;
				if( this.player.autoDown( this.field ) == false ) {
					this.setNextMino();
				}
				if( this.step > 250 ) {
					this.step -= 250;
				}
				break;

			case game_mode_countdown:
				break;

			case game_mode_play:
				break;
		}
	}

	setNextMino() {
		//プレイヤーブロックをフィールドにセット
		let lines = this.field.setPlayer( this.player );
		//TODO:得点加算
		//次のブロックをプレイヤーにセット
		this.player.setMino( this.next.copy() );
		this.player.clearDown();
		//ゲームオーバチェック
		if( this.field.checkMove(this.player,5) == false ){
			//TODO:ゲームオーバー処理
			this.setMode( game_mode_gameover );
			alert('game over');
		}

		this.next.createNext();
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
			switch( event.code ) {
				case "ArrowLeft":
					this.player.moveLeft( this.field );
					break;

				case "ArrowRight":
					this.player.moveRight( this.field );
					break;

				case "ArrowUp":
					this.player.turnRight( this.field );
					break;

				case "ArrowDown":
					if( this.player.moveDown( this.field ) == false ) {
						this.setNextMino();
					}
					break;

				case "Space":
					this.player.dropDown( this.field );
					this.setNextMino();
					break;
			}
		}
	}

	setMode( mode ) {
		this.mode = mode;
		this.step = 0;
	}

	/**
	 * mode = 0 の描画処理
	 * @param {context} context 
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

		let img_bock = this.getResImage( this.img_block);
		this.next.draw( context, img_bock );
		this.player.draw( context, img_bock );
		this.field.draw( context, img_bock );

		if( this.step < 125  ) {
			context.drawImage( this.getResImage( this.img_btnSpace ), 320-50, 240 );
		}
	}
}