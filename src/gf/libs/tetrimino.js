/**
 * 
 */
const mino_none = 0;
const mino_i = 1;
const mino_o = 2;
const mino_s = 3;
const mino_z = 4;
const mino_j = 5;
const mino_l = 6;
const mino_t = 7;

/**
 * テトリスミノclass
 */
class tetrimino {
	/**
	 * 生成されたオリジナルテトリスミノデータ
	 */
	block = null;

	/**
	 * 描画に使用するテトリスミノデータ
	 */
	buff = null;

	/**
	 * ブロックの回転角度
	 */
	rotate = 0;

	/**
	 * 画面のX座標
	 */
	x = 0;

	/**
	 * 画面のY座標 
	 */
	y = 0;

	offset_x = 0;

	offset_y = 0;

	img = null;

	type = 0;

	constructor() {
		this.block = null;
		this.buff =  null;
		this.x = 0;
		this.y = 0;
		this.offset_x = 0;
		this.offset_y = 0;
		this.type = 0;
	}

	getWidth() {
		return this.buff.width;
	}

	getHeight() {
		return this.buff.height;
	}

	/**
	 * tetriminoクラスのコピー
	 */
	copy(){
		let ret = new tetrimino();
		if( this.block ) ret.block = this.block.copy();
		if( this.buff ) ret.buff = this.buff.copy();
		ret.rotate = this.rotate;
		ret.x = this.x;
		ret.y = this.y;
		ret.offset_x = this.x;
		ret.offset_y = this.y;
		ret.type = this.type;
		ret.img = this.img;
		return ret;
	}

	/**
	 * 次のブロックデータを作成
	 */
	createNext(){
		this.type = Math.floor( Math.random() * 6 ) + 1;
		this.block = tetrimino.factory( this.type );
		this.buff = this.block.copy();
	}

	setBlockBuff( block, buff, type ) {
		this.block = block;
		this.buff = buff;
		this.type = type;
	}

	/**
	 * ブロックの右回転
	 */
	turnLeft(){
		// x = (x * cos) - ( y * sin )  y = (x * sin) + ( y * cos )
		// x = - y * sin   				y = x * sin 
		// x = y						y = - x
		let tmp = new block( this.buff.height, this.buff.width );
		for( let x = 0; x < this.buff.width; x ++ ) {
			for( let y = 0; y < this.buff.height; y ++ ) {

				//回転後の座標計算
				let xa = y;
				let ya = -1 * x + (tmp.height - 1 );

				let pix = xa + ( ya * tmp.width );

				tmp.node[ xa + ( ya * tmp.width ) ] = this.buff.node[ x + ( y * this.buff.width ) ];
			}
		}

		this.buff = tmp ;
	}

	/**
	 * ブロックの左回転
	 */
	turnRight(){
		// x = (x * cos) - ( y * sin )	y = (x * sin) + ( y * cos )
		// x = - y			y = x
		let tmp = new block( this.buff.height, this.buff.width );
		for( let x = 0; x < this.buff.width; x ++ ) {
			for( let y = 0; y < this.buff.height; y ++ ) {
				//回転後の座標計算
				let xa = ( -1 * y ) + (tmp.width - 1);
				let ya = x;

				tmp.node[ xa + ya * tmp.width ] = this.buff.node[ x + y * this.buff.width ];
			}
		}

		this.buff = tmp ;
	}
	
	/**
	 * テトリスミノ生成関数
	 * @param block type 
	 */
	static factory( type ) {
		let ret = null;
		if( !type ) {
			type = Math.floor( Math.random() * 6 ) + 1;
		}

		let n = 0;
		switch( type ) {
			case mino_i :
				ret = new block( 1, 4 );
				ret.fill( mino_i );
				break;

			case mino_o:
				ret = new block( 2, 2 );
				ret.fill( mino_o );
				break;

			case mino_s:
				ret = new block( 3, 2 );
				n = mino_s;
				ret.setArray( [
					0, n, n,
					n, n, 0
				] );
				break;

			case mino_z:
				ret = new block( 3, 2 );
				n = mino_z;
				ret.setArray( [
					n, n, 0,
					0, n, n
				] );
				break;

			case mino_j:
				ret = new block( 3, 2 );
				n = mino_j;
				ret.setArray( [
					n, 0, 0,
					n, n, n
				] );
				break;

			case mino_l:
				ret = new block( 3, 2 );
				n = mino_l;
				ret.setArray( [
					0, 0, n,
					n, n, n
				] );
				break;

			case mino_t:
				ret = new block( 3, 2 );
				n = mino_t;
				ret.setArray( [
					0, n, 0,
					n, n, n
				] );
				break;
		}
		return ret;
	}

	/**
	 * テトリスミノ描画処理
	 * @param {context} handle 
	 * @param {Image} img 
	 */
	draw( handle, img ) {
		let wi = 20;
		let hi = 20;
		let dx = 20;
		let dy = ( this.type - 1 ) * hi;

		if( this.buff == null ) return;

		for( let y = 0; y < this.buff.height; y ++ ){
			for( let x = 0; x < this.buff.width; x ++ ) {
				if( this.buff.node[ x + ( y * this.buff.width)] ) {
					handle.drawImage( img, dx, dy, wi, hi,
						this.offset_x + this.x + ( x * wi ),
						this.offset_y + this.y + ( y * hi ),
						wi, hi
					);
				}
			}
		}
		
	}
}