/**
 * ブロッククラス
 */

class block {
	node = [];
	width = 0;
	height= 0;

	constructor(wi, hi) {
		this.width = wi;
		this.height = hi;
		this.node = new Array(wi*hi);
		this.fill( 0 );
	}

	/**
	 * ブロック要素をtypeで埋める
	 * @param Number type 
	 */
	fill( type ) {
		for( let n = 0; n < this.width*this.height; n ++ ) this.node[n] = type;
	}

	/**
	 * ブロック要素を配列でセットする
	 * @param Array node 必ずwidth*heightと同じ要素数であること
	 */
	setArray( node ) {
		for( let n = 0; n < this.width * this.height; n ++ ) this.node[n] = node[n];
	}

	/**
	 * blockクラスのコピーを生成
	 */
	copy(){
		let ret = new block(this.width, this.height);
		ret.setArray( this.node );
		return ret;
	}
}