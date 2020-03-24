class Time {
	count = 0;
	Clear() {
		count = 0;
	}
	Add() {
		count ++;
	}

	GetMSec() {
		return count;
	}

	GetSec() {
		return intval( count / 1000 );
	}

	GetMini() {
		return intval( this.GetSec() / 60 );
	}

	SetSec( val ) {
		count = val * 1000;
	}
}