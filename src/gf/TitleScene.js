/**
 * タイトル処理シーン
 */
class TitleScene extends Scene {
	add = 0;
	step = 0;
	mode = 0;

	/**
	 * ボタンのイメージリソースハンドル番号
	 */
	btn  = -1;

	/**
	 * ロゴのイメージのリソースハンドル番号
	 */
	logo  = -1;

	constructor() {
		super();
		this.add = 1.0 / 500;
		this.btn = this.addResImage('./img/btnSpace.png');
		this.logo = this.addResImage('./img/title_logo.png');
	}

	timerProc() {
		switch( this.mode ) {
			case 0:
				this.step ++;
				if( this.step > 500 ) {
					this.mode = 1;
					this.step = 0;
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
		if( this.mode == 1 ) {
			if( event.code == "Space" ) {
				//次のシーンへ移動
				gf.setScene( new GameScene() );
			}
		}
	}

	/**
	 * mode = 0 の描画処理
	 * @param {*} context 
	 */
	start_fede( context ) {
		//白塗り初期化
		context.fillStyle = "white";
		context.fillRect(0,0,this.width,this.height);

		context.globalAlpha =  this.add * this.step;
		let logo = this.getResImage( this.logo );
		context.drawImage( logo, 320-161, 25 );

	}

	/**
	 * mode = 1の描画処理
	 * @param {*} context 
	 */
	button_wait( context ) {
		context.fillStyle = "white";
		context.fillRect( 0, 0, this.width, this.height );

		context.globalAlpha = 1.0;
		context.drawImage( this.getResImage( this.logo ), 320-161, 25 );

		context.font = "16px MeirioUi";
		context.fillStyle = "rgb(80,80,80)";
		context.fillText("©2020 Vtuber 健巳", 30, 460);

		if( this.step < 125  ) {
			let imt = this.getResImage( this.btn );
			context.drawImage( imt, 320-50, 240 );
		}
	}

}