/**
 * タイトル処理シーン
 */
class TitleScene extends Scene {
	add = 0;
	step = 0;
	mode = 0;
	btn  = 0;

	constructor() {
		super();
		this.add = 255 / 1000;
		this.btn = this.addResImage('./img/btnSpace.png');
	}

	timerProc() {
		this.step ++;
		switch( this.mode ) {
			case 0:
				if( this.step > 1000 ) {
					this.mode = 1;
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

	start_fede( context ) {
		let cl = Number( this.add * this.step );
		context.fillStyle = "rgb( " + cl + "," + cl + "," + cl + " )";
		context.fillRect(0,0,this.width,this.height);

		context.font = "50px MeirioUi";
		context.fillStyle = "black";
		context.fillText("落ちゲー", 50, 80);
	}

	button_wait( context ) {
		context.fillStyle = "white";
		context.fillRect( 0, 0, this.width, this.height );

		context.font = "50px MeirioUi";
		context.fillStyle = "black";
		context.fillText("落ちゲー", 50, 80);
	
		let imt = this.getResImage( this.btn );
		context.drawImage( imt, 50, 90 );
	}
}