const adjectives = ['배고픈 ', '심심한 ', '재밌는 ', '부자가 되고싶은 ', '우울한 ', '비범한 ', '즐거운 '];
const nouns = ['김밥', '책', '장난감', '산타클로스', '아이언맨', '초콜렛', '커피속에 모카치노', '아메리카노'];
const verbs = [' 보고싶다', ' 되고싶다', ' 해보고싶다', ' 먹고싶다', ' 만져보고싶다'];

export function generateRandom(num) {
	num = Math.floor(num);
	return Math.floor(Math.random() * num);
}

export function generateMemo() {
	return (
		adjectives[generateRandom(adjectives.length)] + nouns[generateRandom(nouns.length)] + verbs[generateRandom(verbs.length)]
	);
}
