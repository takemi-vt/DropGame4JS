/**
 * 
 */
const mino_i = 0;
const mino_o = 1;
const mino_s = 2;
const mino_z = 3;
const mino_j = 4;
const mino_l = 5;
const mino_t = 6;

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

	constructor() {
		this.block = null;
		this.buff =  null;
	}

	/**
	 * tetriminoクラスのコピー
	 */
	copy(){
		let ret = new tetrimino();
		ret.block = this.block.copy();
		ret.buff = this.buff.copy();
		ret.rotate = this.rotate;
	}

	/**
	 * 次のブロックデータを作成
	 */
	createNext(){
		this.block = factory();
		this.buff = this.block;
	}

	/**
	 * ブロックの右回転
	 */
	turnRight(){
		// x = (x * cos) - ( y * sin )  y = (x * sin) + ( y * cos )
		// x = - y * sin   				y = x * sin 
		// x = y						y = - x
		let tmp = new block( this.buff.height, this.buff.width );
		for( let x = 0; x < this.buff.width; x ++ ) {
			for( let y = 0; y < this.buff.height; y ++ ) {
				let xa = y;
				let ya = -1 * x + tmp.height;
				tmp.block[ xa + ya * tmp.width ] = this.buff[ x + y * this.buff.width ];
			}
		}

		this.buff = tmp ;
	}

	/**
	 * ブロックの左回転
	 */
	turnLeft(){
		// x = (x * cos) - ( y * sin )	y = (x * sin) + ( y * cos )
		// x = - y			y = x
		let tmp = new block( this.buff.height, this.buff.width );
		for( let x = 0; x < this.buff.width; x ++ ) {
			for( let y = 0; y < this.buff.height; y ++ ) {
				let xa = ( -1 * y ) + tmp.width;
				let ya = x;
				tmp.block[ xa + ya * tmp.width ] = this.buff[ x + y * this.buff.width ];
			}
		}

		this.buff = tmp ;
	}
	
	static factory( type ) {
		let block = null;
		if( !type ) {
			type = Math.floor( Math.random() * 6 );
		}

		switch( type ) {
			case mino_i :
				block = new block( 1, 4 );
				block.fill( mino_i );
				break;

			case mino_o:
				block = new block( 2, 2 );
				block.fill( mino_o );
				break;

			case mino_s:
				block = new block( 3, 2 );
				let n = mino_s;
				block.setArray( [
					0, n, n,
					n, n, 0
				] );
				break;

			case mino_z:
				block = new block( 3, 2 );
				let n = mino_z;
				block.setArray( [
					n, n, 0,
					0, n, n
				] );
				break;

			case mino_j:
				block = new block( 3, 2 );
				let n = mino_j;
				block.setArray( [
					n, 0, 0,
					n, n, n
				] );
				break;

			case mino_l:
				block = new block( 3, 2 );
				let n = mino_l;
				block.setArray( [
					0, 0, n,
					n, n, n
				] );
				break;

			case mino_t:
				block = new block( 3, 2 );
				let n = mino_t;
				block.setArray( [
					0, n, 0,
					n, n, n
				] );
				break;
		}
		return block;
	}

}