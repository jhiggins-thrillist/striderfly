(function () {

	var creeds = [
			'THROUGH HIM ALL IS POSSIBLE',
			'TAKE US AWAY STRIDERFLY',
			'IN HIS NAME WE PRAY',
			'HE IS RISEN',
			'TAKE US HIGHER',
			'GLORY TO THE HIGHEST',
			'JOHN 3:16',
			'PSALMS 23:4'
		],
		index = parseInt(Math.floor(creeds.length * Math.random()));

	document.getElementById('hisGrandCreed').innerText = creeds[index];

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
