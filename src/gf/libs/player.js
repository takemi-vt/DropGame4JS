/**
 * プレイヤー
 */
class player {
	x = 0;
	y = 0;
	max_x = 10;
	max_y = 20;
	offset_x = 0;
	offset_y = 0;
	limit = 0;

	mino = null;

	constructor() {
		this.mino = null;
		this.offset_x = 222;
		this.offset_y = 61;
		this.limit = 500;
		this.limit_now = 500;
	}

	copy(){
		let ret = new player();
		ret.x = this.x;
		ret.y = this.y;
		ret.max_x = this.max_x;
		ret.max_y = this.max_y;
		ret.offset_x = this.offset_x;
		ret.offset_y = this.offset_y;
		ret.limit = this.limit;
		ret.mino = this.mino.copy();
		return ret;
	}

	draw( handle, img ) {
		this.mino.x = this.x * 20;
		this.mino.y = this.y * 20;
		this.mino.draw( handle, img );
	}

	setMino(mino) {
		this.mino = mino;
		//センター位置を決める
		this.mino.offset_x = this.offset_x;
		this.mino.offset_y = this.offset_y;
		this.x =  Math.floor( Number( this.max_x / 2 ) - Number( this.mino.getWidth() / 2 ) );
	}

	/**
	 * 
	 * @param {field} field 
	 */
	moveLeft( field ) {
		if( field.checkMove( this, 1) == false ) return false;
		if( this.x <= 0 ) return;
		this.x --;
	}

	/**
	 * 
	 * @param {field} field 
	 */
	moveRight( field ) {
		if( field.checkMove( this, 2) == false ) return false;
		if( this.x + this.mino.getWidth() >= this.max_x ) return;
		this.x ++;
	}

	/**
	 * ブロックを1行落とす
	 * @param {field} field 
	 */
	moveDown( field ) {
		if( field.checkMove( this, 0) == false ) return false;
		if( this.y + this.mino.getHeight() > this.max_y ) return false;
		this.y ++;
		return true;
	}

	/**
	 * ブロックを落とす
	 * @param {field} filed 
	 */
	dropDown( filed ) {
		for( let y = this.y; y < this.max_y; y ++ ) {
			if( this.moveDown(filed) != false ) continue;
		}
		return false;
	}

	/**
	 * 
	 * @param {field} field 
	 */
	autoDown( field ) {
		this.limit --;
		if( this.limit <= 0 ) {
			this.limit = this.limit_now;
			return this.moveDown(field);
		}
		return true;
	}

	clearDown() {
		this.y = 0;
	}

	turnLeft( field ) {
		if( field && field.checkMove( this, 4 ) == false ) return;
		this.mino.turnLeft();
		//端で回転した場合、回転ではみ出る分を左に移動
		if( this.x + this.mino.getWidth() > this.max_x ) {
			this.x = ( this.x + this.mino.getWidth() ) - this.max_x;
		}
	}

	turnRight( field ) {
		if( field && field.checkMove( this, 3 ) == false ) return;
		this.mino.turnRight();
		//端で回転した場合、回転ではみ出る分を左に移動
		if( this.x + this.mino.getWidth() > this.max_x ) {
			this.x -= ( this.x + this.mino.getWidth() ) - this.max_x;
		}
	}
}