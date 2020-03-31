/**
 * 
 */
const minoType_none = 0;
const minoType_i = 1;
const minoType_o = 2;
const minoType_s = 3;
const minoType_z = 4;
const minoType_j = 5;
const minoType_l = 6;
const minoType_t = 7;

class tetromino  {
	/**
	 * テトリスミノデータ
	 */
	block = null;

	/**
	 * 描画用データ:回転とかかけるのでバッファを活用
	 */
	buff = null;

	rotate = 0;

	constructor() {
		this.block = null;
		this.buff = null;
		this.rotate = rotate_none;
	}

	/**
	 * テトリスミノを生成
	 */
	static factory( type ) {
		let block = null;
		if( type == null || type == undefined ) {
			type = Math.floor( Math.random() * 7 );
		}

		switch( tyep ) {
			case minoType_i:
				block = new block( 1, 4);
				block.fill( minoType_i );
				break;

			case minoType_o:
				block = new block( 2, 2);
				block.fill( minoType_o );
				break;

			case minoType_s:
				block = new block( 3, 2);
				let n = minoType_s;
				block.setArray( [
					 0, n, n,
					 n, n, 0
				 ] );
				break;

			case minoType_z:
				block = new block( 3, 2);
				let n = minoType_z;
				block.setArray( [
					 n, n, 0,
					 0, n, n
				 ] );
				break;

			case minoType_j:
				block = new block( 3, 2);
				let n = minoType_j;
				block.setArray( [
					 n, 0, 0,
					 n, n, n
				 ] );
				break;

			case minoType_l:
				block = new block( 3, 2);
				let n = minoType_l;
				block.setArray( [
					 0, 0, n,
					 n, n, n
				 ] );
				break;

			case minoType_t:
				block = new block( 3, 2);
				let n = minoType_t;
				block.setArray( [
					 0, n, 0,
					 n, n, n
				 ] );
				break;
		}

		return block;
	}
}