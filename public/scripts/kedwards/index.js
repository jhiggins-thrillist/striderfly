(function () {
	var inspirations = [
		'THROUGH HIM ALL IS POSSIBLE',
		'I BELIEVE',
		'TAKE US AWAY, O STRIDERFLY',
		'IN HIS NAME WE PRAY',
		'HE IS RISEN',
		'TAKE US HIGHER',
		'HE FLIES SO THAT WE MAY BE FREE',
		'TRYNA CATCH ME STRIDIN DIRTY',
		'GLORY TO THE HIGHEST',
		'JOHN 3:16',
		'PSALMS 23:4',
		'CARRIED BY HIS WINGS',
		'HEAR MY PRAYERS, O WYNGED ONE'
	];
	document.getElementById('hisGrandMotto').innerText = inspirations[parseInt(Math.floor(inspirations.length * Math.random()))];
	setInterval(function () {
		var img = document.createElement('img');
		img.src = '/striderfly.png';
		img.style.left = (10 + Math.random() * 80) + '%';
		img.style.top = '2000px';
		document.body.appendChild(img);
		setTimeout(function () {
			img.style.marginTop = '-3000px';
		}, 500);
		setTimeout(function () {
			document.body.removeChild(img);
		}, 20000);
	}, 7000);
})();