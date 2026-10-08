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

	/**
	 * Browsers only autoplay with sound once the visitor has interacted with
	 * the site, so if YouTube reports autoplay was blocked, play muted and
	 * unmute on the first click or keypress.
	 */
	var player,
		blocked = false,
		unmute = document.getElementById('unmute');

	function goHigher() {
		player.unMute();
		player.playVideo();
		unmute.style.display = 'none';
		document.removeEventListener('keydown', goHigher);
	}

	function playMuted() {
		if (blocked) {
			return;
		}

		blocked = true;
		player.mute();
		player.playVideo();
		unmute.style.display = 'block';
		unmute.addEventListener('click', goHigher);
		document.addEventListener('keydown', goHigher);
	}

	window.onYouTubeIframeAPIReady = function () {
		player = new YT.Player('creed', {
			events: {
				onReady: function () {
					player.playVideo();

					// The iframe tries to autoplay before the API is listening, so
					// onAutoplayBlocked can be missed. Check that it really started.
					setTimeout(function () {
						var state = player.getPlayerState();

						if (state !== YT.PlayerState.PLAYING && state !== YT.PlayerState.BUFFERING) {
							playMuted();
						}
					}, 1500);
				},
				onAutoplayBlocked: playMuted
			}
		});
	};

	var api = document.createElement('script');
	api.src = 'https://www.youtube.com/iframe_api';
	document.body.appendChild(api);

})();
