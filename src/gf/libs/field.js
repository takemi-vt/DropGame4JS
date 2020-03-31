/**
 * フィールドコントロールクラス
 */
class field extends block {
	offset_x = 0;
	offset_y = 0;

	constructor() {
		super( 10, 20 );

		this.offset_x = 224;
		this.offset_y = 61;
	}

	/**
	 * プレイヤーのブロックをフィールドにセット
	 * @param {player} player 
	 */
	setPlayer( player ) {
		for( let y = 0; y < player.mino.getHeight(); y ++ ) {
			for( let x = 0; x < player.mino.getWidth(); x ++  ) {
				let val = player.mino.buff.node[ x + ( y * player.mino.getWidth() ) ];
				if( val > 0) {
					this.node[ (player.x + x )+ ( (player.y + y ) * this.width ) ] = val;
				}
			}
		}

		//消す行検出、行を消す
		let lines = this.checkLine();
		this.removeLine( lines );

		return lines;
	}

	/**
	 * 移動先にフィールドブロックが有るかを判定
	 * @param {player} player 
	 * @param {Number} moveType 
	 */
	checkMove( player, moveType ) {
		let px = player.x;
		let py = player.y;
		switch( moveType ) {
			case 0: //down
				py ++;
				break;

			case 1: //left
				px --;
				if( px <= 0 ) return true;
				break;

			case 2: //right
				px ++ ;
				if( px >= this.width ) return true;
				break;

			case 3: //turnRight
				player = player.copy();
				player.turnRight();
				break;

			case 4: //turnLeft
				player = player.copy();
				player.turnLeft();
				break;
			
			case 5: //create
				break;
		}

		for( let y = 0 ; y < player.mino.getHeight(); y ++ ) {
			for( let x = 0; x < player.mino.getWidth(); x ++ ) {

				if( player.mino.buff.node[x + (y*player.mino.getWidth())] == 0 ) continue;

				let val = this.node[ (px + x ) + ( (py + y) * this.width ) ];
				if( val != 0 ) return false;
			}
		}

		return true;
	}

	/**
	 * 消える行を確認して、消える行数を配列で返却
	 */
	checkLine() {
		let ret = [];
		for( let y = 0; y < this.height; y ++ ) {
			let cnt = 0;
			for( let x = 0; x < this.width; x ++ ) {
				if( this.node[ x + ( y * this.width )] > 0 ) cnt ++;
			}
			if( cnt == this.width ) {
				ret.push( y );
			}
		}
		return ret;
	}

	/**
	 * 指定された行を消し、消えた行を下に詰める
	 * @param {array} lines 
	 */
	removeLine( lines ) {
		if( lines.length == 0 ) return;
		for( let n = 0; n < lines.length; n ++ ) {
			let line = lines[n];
			//行を消す
			for( let x = 0; x < this.width; x ++ ) {
				this.node[ x + (line * this.width )] = mino_none;
			}
			//行を詰める
			for( let y = line; y > 0; y -- ) {
				for( let x = 0; x < this.width; x ++ ) {
					this.node[ x + ( y * this.width) ] = this.node[ x + ( (y-1) * this.width)];
				}
			}
		}

		//一番上の行を0クリアする
		for( let n = 0; n < this.width; n ++ ){
			this.node[ n ] = mino_none;
		}
	}

	/**
	 * 
	 * @param {context} handle 
	 * @param {Image} img 
	 */
	draw( handle, img ) {
		let wi = 20;
		let hi = 20;
		let dx = 20;
		let dy = 0;

		for( let y = 0; y < this.height; y ++ ){
			for( let x = 0; x < this.width; x ++ ) {
				let type = this.node[ x + ( y * this.width) ];
				if( type ) {
					dy = (type - 1) * hi;
					handle.drawImage( img,
						dx, dy, wi, hi,
						this.offset_x + ( x * wi ), this.offset_y + ( y * hi ), wi, hi
					);
				}
			}
		}
	}
}